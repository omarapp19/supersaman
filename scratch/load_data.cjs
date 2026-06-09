const fs = require('fs');
const path = require('path');

const datosPath = path.join(__dirname, '../public/datos.json');
const outputPath = path.join(__dirname, '../src/data.ts');

const rawData = JSON.parse(fs.readFileSync(datosPath, 'utf8'));

// Custom mapping for aisles
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

// Known brands to match in Venezuelan/Latin American supermarket products
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
      // Return formatted brand
      return brand.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(' ');
    }
  }
  // Fallback: take the first word (sanitizing alphanumeric characters)
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

const mockAisles = [];
const mockProductsByAisle = {};
const allProductsForOrders = [];

Object.keys(rawData).forEach(key => {
  const mapping = aisleMapping[key];
  if (!mapping) return;

  const rawProducts = rawData[key];
  const productsCount = rawProducts.length;

  mockAisles.push({
    id: mapping.id,
    number: mapping.number,
    name: mapping.name,
    status: 'unassigned', // all unassigned initially
    progress: 0,
    productsCount: productsCount
  });

  const productsList = rawProducts.map((pName, index) => {
    const brand = extractBrand(pName);
    const initials = getInitials(pName);
    const id = `p_${mapping.number}_${index + 1}`;
    const product = {
      id: id,
      name: pName.trim(),
      brand: brand,
      sku: "", // empty SKU as requested
      status: "normal", // all normal stock status as requested
      initials: initials
    };
    allProductsForOrders.push({ ...product, aisle: mapping.number });
    return product;
  });

  mockProductsByAisle[mapping.number] = productsList;
});

// Generate 3 mock orders based on the imported products
const mockOrders = [];
const orderUsers = ["Juan Pérez", "María García", "Omar (Admin)"];
const orderStatuses = ["bajo", "crítico", "bajo"];

for (let i = 0; i < 3; i++) {
  // pick a random product from all imported products
  const randomIndex = Math.floor(Math.random() * allProductsForOrders.length);
  const prod = allProductsForOrders[randomIndex];
  
  mockOrders.push({
    id: `o_${i + 1}`,
    productName: prod.name,
    brand: prod.brand,
    sku: prod.sku,
    suggestedQty: Math.floor(Math.random() * 20) + 5,
    unit: Math.random() > 0.5 ? "cajas" : "und",
    aisle: prod.aisle,
    user: orderUsers[i],
    status: orderStatuses[i],
    lastUpdated: new Date().toISOString()
  });
}

// Generate the TypeScript file content
const fileContent = `import { Aisle, Product, OrderItem } from './types';

export const mockAisles: Aisle[] = ${JSON.stringify(mockAisles, null, 2)};

export const mockProductsByAisle: Record<number, Product[]> = ${JSON.stringify(mockProductsByAisle, null, 2)};

export const mockOrders: OrderItem[] = ${JSON.stringify(mockOrders, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Successfully generated data.ts with ${mockAisles.length} aisles and ${allProductsForOrders.length} products!`);
