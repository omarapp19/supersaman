import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { mockAisles, mockProductsByAisle } from './data';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

// Check if Firebase is configured with real credentials
export const isFirebaseConfigured = !!apiKey && apiKey !== '' && !apiKey.includes('placeholder');

const firebaseConfig = {
  apiKey: apiKey || "mock-api-key-placeholder-saman",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock-auth-domain-saman",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock-project-id-saman",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock-storage-bucket-saman",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "mock-sender-id-saman",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "mock-app-id-saman"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

const FRIENDLY_ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'Usuario o contraseña incorrectos.',
  'auth/user-not-found': 'Usuario o contraseña incorrectos.',
  'auth/wrong-password': 'Usuario o contraseña incorrectos.',
  'auth/invalid-email': 'El usuario ingresado no tiene un formato válido.',
  'auth/too-many-requests': 'Demasiados intentos fallidos. Espera unos minutos e intenta de nuevo.',
  'auth/network-request-failed': 'Error de conexión. Verifica tu red e intenta de nuevo.',
  'auth/email-already-in-use': 'Ya existe un usuario con ese nombre de usuario.',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  'auth/configuration-not-found': 'El proveedor de Correo/Contraseña está inactivo en tu Firebase Console. Habilítalo en Authentication > Sign-in method.',
  'permission-denied': 'No tienes permisos suficientes para realizar esta acción.',
  'unavailable': 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
};

/**
 * Traduce códigos de error de Firebase a mensajes en español para el usuario final,
 * en vez de exponer el texto técnico crudo del SDK (ej. "Firebase: Error (auth/invalid-credential).").
 */
export function getFriendlyErrorMessage(error: unknown, fallback: string): string {
  const code = (error as { code?: string } | null)?.code;
  if (code && FRIENDLY_ERROR_MESSAGES[code]) {
    return FRIENDLY_ERROR_MESSAGES[code];
  }
  return fallback;
}

export async function bootstrapFirestore(force: boolean = false) {
  if (!isFirebaseConfigured) return;

  try {
    const aislesCol = collection(db, 'aisles');
    const aislesSnap = await getDocs(aislesCol);

    if (force || aislesSnap.empty) {
      console.log("Inicializando pasillos y productos de Super Saman...");
      let batch = writeBatch(db);
      let count = 0;

      // Bootstrap aisles
      for (const aisle of mockAisles) {
        const aisleDocRef = doc(db, 'aisles', aisle.id);
        batch.set(aisleDocRef, aisle);
        count++;

        if (count >= 400) {
          await batch.commit();
          batch = writeBatch(db);
          count = 0;
        }

        // Bootstrap products for this aisle
        const products = mockProductsByAisle[aisle.number] || [];
        for (const product of products) {
          const productDocRef = doc(db, `aisles/${aisle.id}/products`, product.id);
          batch.set(productDocRef, product);
          count++;

          if (count >= 400) {
            await batch.commit();
            batch = writeBatch(db);
            count = 0;
          }
        }
      }

      if (count > 0) {
        await batch.commit();
      }
      
      console.log("¡Inicialización de Firestore completada con éxito!");
    }
  } catch (error) {
    console.error("Error al inicializar Firestore:", error);
    throw error;
  }
}

export async function clearAllFirestoreData() {
  if (!isFirebaseConfigured) return;

  try {
    console.log("Iniciando vaciado de datos de Firestore...");
    
    // 1. Clear orders
    const ordersCol = collection(db, 'orders');
    const ordersSnap = await getDocs(ordersCol);
    const batch1 = writeBatch(db);
    ordersSnap.forEach((doc) => {
      batch1.delete(doc.ref);
    });
    await batch1.commit();

    // 2. Clear aisles and nested products
    const aislesCol = collection(db, 'aisles');
    const aislesSnap = await getDocs(aislesCol);
    
    for (const aisleDoc of aislesSnap.docs) {
      const productsCol = collection(db, 'aisles', aisleDoc.id, 'products');
      const productsSnap = await getDocs(productsCol);
      
      const batchProducts = writeBatch(db);
      productsSnap.forEach((productDoc) => {
        batchProducts.delete(productDoc.ref);
      });
      await batchProducts.commit();
      
      const batchAisle = writeBatch(db);
      batchAisle.delete(aisleDoc.ref);
      await batchAisle.commit();
    }
    
    console.log("¡Limpieza de Firestore completada!");
  } catch (error) {
    console.error("Error al limpiar Firestore:", error);
    throw error;
  }
}

/**
 * Crea un usuario en Firebase Authentication usando una app secundaria temporal
 * para no cerrar la sesión del administrador actual.
 * El email se construye como: {username}@supersaman.com
 */
export async function createFirebaseUser(username: string, password: string): Promise<void> {
  if (!isFirebaseConfigured) return;

  const secondaryApp = initializeApp(firebaseConfig, `secondary-${Date.now()}`);
  const secondaryAuth = getAuth(secondaryApp);

  try {
    const email = `${username.trim().toLowerCase()}@supersaman.com`;
    await createUserWithEmailAndPassword(secondaryAuth, email, password);
  } finally {
    // Siempre eliminar la app secundaria para no dejar instancias huérfanas
    await deleteApp(secondaryApp);
  }
}
