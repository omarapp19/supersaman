const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, getDocs, writeBatch } = require('firebase/firestore');

// Load env variables
require('dotenv').config();

const apiKey = process.env.VITE_FIREBASE_API_KEY;
if (!apiKey || apiKey.includes('placeholder')) {
  console.log("Firebase is not configured with real credentials in .env. Skipping Firestore synchronization.");
  process.exit(0);
}

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const datosPath = path.join(__dirname, '../public/datos.json');
const rawData = JSON.parse(fs.readFileSync(datosPath, 'utf8'));

const aisleMapping = {
  "pasillo_1": { number: 1, id: "a_1", name: "Mascotas" },
  "pasillo_2": { number: 2, id: "a_2", name: "Cuidado Personal e Higiene" },
  "pasillo_3": { number: 3, id: "a_3", name: "Alimentos y confitería" },
  "pasillo_4": { number: 4, id: "a_4", name: "Salsas, condimentos y pastas" },
  "pasillo_5": { number: 5, id: "a_5", name: "Pastelería" },
  "pasillo_6": { number: 6, id: "a_6", name: "Harinas, Arroz y Cafés" },
  "pasillo_7": { number: 7, id: "a_7", name: "Aceites, Salsas, Enlatados y granos" },
  "nevera_pepsi_malta": { number: 8, id: "a_8", name: "Nevera Pepsi y Malta" },
  "nevera_cocacola": { number: 9, id: "a_9", name: "Nevera Coca-Cola y Sabores" },
  "nevera_jugos": { number: 10, id: "a_10", name: "Nevera lácteos, yogures y jugos" },
  "cabezales": { number: 11, id: "a_11", name: "Cabezales / Promociones" },
  "repuestos": { number: 12, id: "a_12", name: "Repuestos y Automotriz" }
};

const KNOWN_BRANDS = [
  "DOGOURMET", "SUPERCAN", "RINGO", "KANTAL", "DOG CHOW", "CAT CHOW", "GATSY", "LEPECIP", "FILPO",
  "FARMAGRO", "ALBENDEX", "COLIJET", "ARSUS", "EXCALIBUR", "MASCOTIK", "DONKAT", "MISTER CAN",
  "ROSAL PLUS", "ROSAL", "SUTIL", "JAZMIN", "3B", "ALISOFT", "MIMLOT", "WINNY", "BEBEX", "HUGGIES",
  "TENA", "PREDO", "BUMBLE", "DANNA", "ARBORA", "NUTRIBELA", "PANTENE", "EVERY NIGHT", "DRENE",
  "ELVIVE", "NK", "KATIVA", "SEDAL", "PALMOLIVE", "DOVE", "ROLDA", "HEAD & SHOULDERS", "MIMADITO",
  "CHICCO", "AMY", "MELODY", "COLGATE", "CLOSEUP", "GALACTIC", "ORAL B", "ALIDENT", "ALWAYS",
  "NOSOTRAS", "FRIENDS", "KOTEX", "DIVA", "NIVEA", "NUVEL", "SPALINE", "DERMOX", "BOTANIKA",
  "LOVIA", "NEVADA", "FRANCHELL", "SENSATIONS", "KOLESTON", "SVELTY", "SAN SIMON", "PARMALAT",
  "MONTAÑA FRESCA", "CAMPESTRE", "LA CAMPIÑA", "LA CAMPESINA", "NIDO", "PRIMOR", "TODDY",
  "CERELAC", "AVENA PANTERA", "QUAKER", "ROBIN HOOD", "ALVARIGUA", "EL MOLINO", "LA ECONOMICA",
  "MI GOCHITA", "CARIAKITO", "MAIZINA AMERICANA", "SPLENDA", "GERBER", "TIGO", "HEINZ", "POLLY",
  "NATULAC", "OSOLE", "NESTEA", "BOKA", "PANELADA", "RIKATO", "TRULULU", "LOKIÑO", "GOX BOOM",
  "LIKIÑO", "BIANCHI", "TANG", "CHOCO BALL", "OREO", "MINI CHIPS", "SORBETICOS", "CLUB SOCIAL",
  "BELVITA", "SODA PREMIUN", "SALTITACO", "PIRULIN", "KELLOGGS", "PUIG", "SOL PUIG", "SODA PUIG",
  "MAIZINA", "PEPSI", "COCA-COLA", "COCA COLA", "COCACOLA", "7UP", "CHINOTTO", "GOLDEN", "HIT",
  "GATORADE", "LIPTON", "MALTIN POLAR", "MALTIN", "POLAR", "JUGOS YUKERY", "YUKERY", "FRUTICA",
  "DOGOURMET", "MIRRINGO", "DOW CHOW"
];

function extractBrand(name) {
  const upperName = name.toUpperCase();
  for (const brand of KNOWN_BRANDS) {
    if (upperName.includes(brand)) {
      return brand.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(' ');
    }
  }
  const firstWord = name.split(' ')[0] || "Súper Samán";
  return firstWord.replace(/[^A-Za-z0-9]/g, '');
}

function getInitials(name) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, '').split(' ').filter(w => w.length > 0);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return "SS";
}

async function syncToFirestore() {
  try {
    console.log("1. Clearing existing Firestore data...");
    
    // Clear orders
    const ordersSnap = await getDocs(collection(db, 'orders'));
    let batch = writeBatch(db);
    let count = 0;
    ordersSnap.forEach((doc) => {
      batch.delete(doc.ref);
      count++;
      if (count >= 400) {
        batch.commit();
        batch = writeBatch(db);
        count = 0;
      }
    });
    if (count > 0) {
      await batch.commit();
      console.log("   Cleared existing orders.");
    }

    // Clear aisles and products
    const aislesSnap = await getDocs(collection(db, 'aisles'));
    for (const aisleDoc of aislesSnap.docs) {
      const productsSnap = await getDocs(collection(db, 'aisles', aisleDoc.id, 'products'));
      batch = writeBatch(db);
      count = 0;
      productsSnap.forEach((productDoc) => {
        batch.delete(productDoc.ref);
        count++;
        if (count >= 400) {
          batch.commit();
          batch = writeBatch(db);
          count = 0;
        }
      });
      if (count > 0) {
        await batch.commit();
      }
      
      batch = writeBatch(db);
      batch.delete(aisleDoc.ref);
      await batch.commit();
    }
    console.log("   Cleared existing aisles and products.");

    console.log("2. Uploading new aisles and products to Firestore...");
    batch = writeBatch(db);
    count = 0;

    for (const key of Object.keys(rawData)) {
      const mapping = aisleMapping[key];
      if (!mapping) continue;

      const rawProducts = rawData[key];
      const aisleData = {
        id: mapping.id,
        number: mapping.number,
        name: mapping.name,
        status: 'unassigned',
        progress: 0,
        productsCount: rawProducts.length
      };

      // Add Aisle document
      const aisleDocRef = doc(db, 'aisles', mapping.id);
      batch.set(aisleDocRef, aisleData);
      count++;

      if (count >= 400) {
        await batch.commit();
        batch = writeBatch(db);
        count = 0;
      }

      // Add Product documents in batches
      for (let index = 0; index < rawProducts.length; index++) {
        const pName = rawProducts[index];
        const brand = extractBrand(pName);
        const initials = getInitials(pName);
        const id = `p_${mapping.number}_${index + 1}`;

        const productData = {
          id: id,
          name: pName.trim(),
          brand: brand,
          sku: "",
          status: "normal",
          initials: initials
        };

        const productDocRef = doc(db, `aisles/${mapping.id}/products`, id);
        batch.set(productDocRef, productData);
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
    console.log("   Upload complete!");
    console.log("Firestore synchronization succeeded!");
    process.exit(0);

  } catch (error) {
    console.error("Firestore synchronization failed with error:", error);
    process.exit(1);
  }
}

syncToFirestore();
