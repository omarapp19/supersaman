import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDocs, writeBatch } from 'firebase/firestore';
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
export const db = getFirestore(app);

export async function bootstrapFirestore(force: boolean = false) {
  if (!isFirebaseConfigured) return;

  try {
    const aislesCol = collection(db, 'aisles');
    const aislesSnap = await getDocs(aislesCol);

    if (force || aislesSnap.empty) {
      console.log("Inicializando pasillos y productos de Super Saman...");
      const batch = writeBatch(db);

      // Bootstrap aisles
      for (const aisle of mockAisles) {
        const aisleDocRef = doc(db, 'aisles', aisle.id);
        batch.set(aisleDocRef, aisle);

        // Bootstrap products for this aisle
        const products = mockProductsByAisle[aisle.number] || [];
        for (const product of products) {
          const productDocRef = doc(db, `aisles/${aisle.id}/products`, product.id);
          batch.set(productDocRef, product);
        }
      }

      await batch.commit();
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
