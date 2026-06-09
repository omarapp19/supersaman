import { Aisle, Product, OrderItem } from './types';

export const mockAisles: Aisle[] = [
  {
    "id": "a_1",
    "number": 1,
    "name": "Mascotas",
    "status": "unassigned",
    "progress": 0,
    "productsCount": 82
  },
  {
    "id": "a_2",
    "number": 2,
    "name": "Cuidado Personal e Higiene",
    "status": "unassigned",
    "progress": 0,
    "productsCount": 582
  },
  {
    "id": "a_3",
    "number": 3,
    "name": "Alimentos y confitería",
    "status": "unassigned",
    "progress": 0,
    "productsCount": 195
  },
  {
    "id": "a_4",
    "number": 4,
    "name": "Salsas, condimentos y pastas",
    "status": "unassigned",
    "progress": 0,
    "productsCount": 165
  },
  {
    "id": "a_5",
    "number": 5,
    "name": "Pastelería",
    "status": "unassigned",
    "progress": 0,
    "productsCount": 72
  },
  {
    "id": "a_6",
    "number": 6,
    "name": "Harinas, Arroz y Cafés",
    "status": "unassigned",
    "progress": 0,
    "productsCount": 67
  },
  {
    "id": "a_7",
    "number": 7,
    "name": "Aceites, Salsas, Enlatados y granos",
    "status": "unassigned",
    "progress": 0,
    "productsCount": 188
  },
  {
    "id": "a_8",
    "number": 8,
    "name": "Nevera Pepsi y Malta",
    "status": "unassigned",
    "progress": 0,
    "productsCount": 20
  },
  {
    "id": "a_9",
    "number": 9,
    "name": "Nevera Coca-Cola y Sabores",
    "status": "unassigned",
    "progress": 0,
    "productsCount": 24
  },
  {
    "id": "a_10",
    "number": 10,
    "name": "Nevera lácteos, yogures y jugos",
    "status": "unassigned",
    "progress": 0,
    "productsCount": 66
  },
  {
    "id": "a_11",
    "number": 11,
    "name": "Cabezales / Promociones",
    "status": "unassigned",
    "progress": 0,
    "productsCount": 84
  },
  {
    "id": "a_12",
    "number": 12,
    "name": "Repuestos y Automotriz",
    "status": "unassigned",
    "progress": 0,
    "productsCount": 115
  }
];

export const mockProductsByAisle: Record<number, Product[]> = {
  "1": [
    {
      "id": "p_1_1",
      "name": "ALIM. P/PERRO DOGOURMET CARNE 1KG",
      "brand": "Dogourmet",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_2",
      "name": "ALIM. P/PERRO DOGOURMET CARNE 2KG",
      "brand": "Dogourmet",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_3",
      "name": "DOGOURMET POLLO A LA BRASA  4KG",
      "brand": "Dogourmet",
      "sku": "",
      "status": "normal",
      "initials": "DP"
    },
    {
      "id": "p_1_4",
      "name": "DOGOURMET CACHORRO CARNE 2KG",
      "brand": "Dogourmet",
      "sku": "",
      "status": "normal",
      "initials": "DC"
    },
    {
      "id": "p_1_5",
      "name": "DOGOURMET PARRILLA MIXTA 4KG",
      "brand": "Dogourmet",
      "sku": "",
      "status": "normal",
      "initials": "DP"
    },
    {
      "id": "p_1_6",
      "name": "ALIM. P/PERRO SUPERCAN CARNE 2KG",
      "brand": "Supercan",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_7",
      "name": "SUPERCAN CACHORRO CARNE 2KG",
      "brand": "Supercan",
      "sku": "",
      "status": "normal",
      "initials": "SC"
    },
    {
      "id": "p_1_8",
      "name": "RINGO CACHORRO 1KG",
      "brand": "Ringo",
      "sku": "",
      "status": "normal",
      "initials": "RC"
    },
    {
      "id": "p_1_9",
      "name": "RINGO ADULTO 1KG",
      "brand": "Ringo",
      "sku": "",
      "status": "normal",
      "initials": "RA"
    },
    {
      "id": "p_1_10",
      "name": "KANTAL PARRILLA 2KG",
      "brand": "Kantal",
      "sku": "",
      "status": "normal",
      "initials": "KP"
    },
    {
      "id": "p_1_11",
      "name": "ALIM. P/PERRO TOP DOG PET ADULTO 1KG",
      "brand": "ALIM",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_12",
      "name": "DOG CHOW CARNE Y POLLO 2KG",
      "brand": "Dog Chow",
      "sku": "",
      "status": "normal",
      "initials": "DC"
    },
    {
      "id": "p_1_13",
      "name": "DOG CHOW CONTROL DE PESO 2KG",
      "brand": "Dog Chow",
      "sku": "",
      "status": "normal",
      "initials": "DC"
    },
    {
      "id": "p_1_14",
      "name": "DOG CHOW LONGEVIDAD 2KG",
      "brand": "Dog Chow",
      "sku": "",
      "status": "normal",
      "initials": "DC"
    },
    {
      "id": "p_1_15",
      "name": "DOG CHOW TRIPLE PROTEINA 2KG",
      "brand": "Dog Chow",
      "sku": "",
      "status": "normal",
      "initials": "DC"
    },
    {
      "id": "p_1_16",
      "name": "ALPISTE PANTERA",
      "brand": "ALPISTE",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_17",
      "name": "CAT CHOW COMIDA HUMEDA POLLO 85G",
      "brand": "Cat Chow",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_1_18",
      "name": "DOG CHOW COMIDA HUMEDA CARNE 100",
      "brand": "Dog Chow",
      "sku": "",
      "status": "normal",
      "initials": "DC"
    },
    {
      "id": "p_1_19",
      "name": "DOG CHOW COMIDA HUMED. POLLO 100G",
      "brand": "Dog Chow",
      "sku": "",
      "status": "normal",
      "initials": "DC"
    },
    {
      "id": "p_1_20",
      "name": "OH MAIGAT 500G",
      "brand": "OH",
      "sku": "",
      "status": "normal",
      "initials": "OM"
    },
    {
      "id": "p_1_21",
      "name": "OH MAIGAT 1.5KG",
      "brand": "OH",
      "sku": "",
      "status": "normal",
      "initials": "OM"
    },
    {
      "id": "p_1_22",
      "name": "GATSY CARNE 500G",
      "brand": "Gatsy",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_1_23",
      "name": "GATSY DE PESCADO 500G",
      "brand": "Gatsy",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_1_24",
      "name": "GATSY DE POLLO 1KG",
      "brand": "Gatsy",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_1_25",
      "name": "GATSY DE CARNE 1KG",
      "brand": "Gatsy",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_1_26",
      "name": "GATSY DE PESCADO 1KG",
      "brand": "Gatsy",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_1_27",
      "name": "GATSY DE CARNE 3KG",
      "brand": "Gatsy",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_1_28",
      "name": "GATSY DE PESCADO 3KG",
      "brand": "Gatsy",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_1_29",
      "name": "CAT CHOW PESCADO 8KG",
      "brand": "Cat Chow",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_1_30",
      "name": "GATSY CARNE 20KG",
      "brand": "Gatsy",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_1_31",
      "name": "GATSY PESCADO 20KG",
      "brand": "Gatsy",
      "sku": "",
      "status": "normal",
      "initials": "GP"
    },
    {
      "id": "p_1_32",
      "name": "LEPECIP EN SPRAY 263G",
      "brand": "Lepecip",
      "sku": "",
      "status": "normal",
      "initials": "LE"
    },
    {
      "id": "p_1_33",
      "name": "GALLETA PARA PERROS KANTAL",
      "brand": "Kantal",
      "sku": "",
      "status": "normal",
      "initials": "GP"
    },
    {
      "id": "p_1_34",
      "name": "CHAMPU SECO KANTAL 120G",
      "brand": "Kantal",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_1_35",
      "name": "COMIDA PARA PECES KANTAL",
      "brand": "Kantal",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_1_36",
      "name": "PROBIOTICOS PARA MASCOTA 150G BIOM.",
      "brand": "PROBIOTICOS",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_1_37",
      "name": "COMIDA PARA TORTUGA 10G",
      "brand": "COMIDA",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_1_38",
      "name": "SEMILLAS DE GIRASOL PANTERA 400G",
      "brand": "SEMILLAS",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_1_39",
      "name": "ALIMENTO FILPO ADULTO 8KG",
      "brand": "Filpo",
      "sku": "",
      "status": "normal",
      "initials": "AF"
    },
    {
      "id": "p_1_40",
      "name": "MULTIVITAMINICO FARMAGRO 125G",
      "brand": "Farmagro",
      "sku": "",
      "status": "normal",
      "initials": "MF"
    },
    {
      "id": "p_1_41",
      "name": "MATA GUSANO KANTAL",
      "brand": "Kantal",
      "sku": "",
      "status": "normal",
      "initials": "MG"
    },
    {
      "id": "p_1_42",
      "name": "MAXICUAJO 1LTS LIQUIDO",
      "brand": "MAXICUAJO",
      "sku": "",
      "status": "normal",
      "initials": "M1"
    },
    {
      "id": "p_1_43",
      "name": "MAXICUAJO 500ML LIQUIDO",
      "brand": "MAXICUAJO",
      "sku": "",
      "status": "normal",
      "initials": "M5"
    },
    {
      "id": "p_1_44",
      "name": "MAXICUAJO 500ML STANDARD",
      "brand": "MAXICUAJO",
      "sku": "",
      "status": "normal",
      "initials": "M5"
    },
    {
      "id": "p_1_45",
      "name": "ALBENDEX 200ML",
      "brand": "Albendex",
      "sku": "",
      "status": "normal",
      "initials": "A2"
    },
    {
      "id": "p_1_46",
      "name": "COLIJET 200ML",
      "brand": "Colijet",
      "sku": "",
      "status": "normal",
      "initials": "C2"
    },
    {
      "id": "p_1_47",
      "name": "SNACKS CALABAZA LATA",
      "brand": "SNACKS",
      "sku": "",
      "status": "normal",
      "initials": "SC"
    },
    {
      "id": "p_1_48",
      "name": "COMEDERO MEDIANO KANTAL",
      "brand": "Kantal",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_1_49",
      "name": "COMEDERO DOBLE PEQUEÑO",
      "brand": "COMEDERO",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_1_50",
      "name": "COMEDERO INDIVIDUAL",
      "brand": "COMEDERO",
      "sku": "",
      "status": "normal",
      "initials": "CI"
    },
    {
      "id": "p_1_51",
      "name": "PALITO DE CARNAZA KANTAL",
      "brand": "Kantal",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_1_52",
      "name": "NIDO DE PERICO GRANDE",
      "brand": "Nido",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_1_53",
      "name": "NIDO DE PERICO PEQUEÑO",
      "brand": "Nido",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_1_54",
      "name": "COMEDERO PEGABLE KANTAL",
      "brand": "Kantal",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_1_55",
      "name": "PALA PLASTICA CARA DE GATO",
      "brand": "PALA",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_1_56",
      "name": "COMEDERO COLGANTE ARSUS VERDE 2KG",
      "brand": "Arsus",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_1_57",
      "name": "COMEDERO COLGANTE ARSUS VERDE 4KG",
      "brand": "Arsus",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_1_58",
      "name": "BEBEDERO PARA POLLO 3LTS ARSUS",
      "brand": "Arsus",
      "sku": "",
      "status": "normal",
      "initials": "BP"
    },
    {
      "id": "p_1_59",
      "name": "BEBEDERO PARA POLLO 5LTS ARSUS",
      "brand": "Arsus",
      "sku": "",
      "status": "normal",
      "initials": "BP"
    },
    {
      "id": "p_1_60",
      "name": "BEBEDERO COLGANTE 15LTS ARSUS",
      "brand": "Arsus",
      "sku": "",
      "status": "normal",
      "initials": "BC"
    },
    {
      "id": "p_1_61",
      "name": "KIT DE TETERO P/MASCOTAS",
      "brand": "KIT",
      "sku": "",
      "status": "normal",
      "initials": "KD"
    },
    {
      "id": "p_1_62",
      "name": "TORTUGUERA OASIS",
      "brand": "TORTUGUERA",
      "sku": "",
      "status": "normal",
      "initials": "TO"
    },
    {
      "id": "p_1_63",
      "name": "TAZA DE MASCOTAS EXCALIBUR",
      "brand": "Excalibur",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_1_64",
      "name": "COMEDERO ANTI-REFLUJOS",
      "brand": "COMEDERO",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_1_65",
      "name": "PLATO PLASTICO PARA MASCOTA",
      "brand": "PLATO",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_1_66",
      "name": "ARENERO PARA GATOS MASCOTIK",
      "brand": "Mascotik",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_67",
      "name": "TETERO PARA GANADO ARSUS",
      "brand": "Arsus",
      "sku": "",
      "status": "normal",
      "initials": "TP"
    },
    {
      "id": "p_1_68",
      "name": "COMEDERO DE ACERO INOXIDABLE",
      "brand": "COMEDERO",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_1_69",
      "name": "FUMIGADORA MANUAL 2LTS",
      "brand": "FUMIGADORA",
      "sku": "",
      "status": "normal",
      "initials": "FM"
    },
    {
      "id": "p_1_70",
      "name": "ALIMENTO PARA GATO MIRRINGO 1KG",
      "brand": "Ringo",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_71",
      "name": "ALIMENTO PARA GATO DONKAT 1KG",
      "brand": "Donkat",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_72",
      "name": "ALIMENTO PARA GATO DONKAT 1.1KG",
      "brand": "Donkat",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_73",
      "name": "ALIMENTO P/ GATO CAT CHOW 1.5 CARNE",
      "brand": "Cat Chow",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_74",
      "name": "ALIMENTO P/ GATO CAT CHOW 1.5 ESTERILIZADO",
      "brand": "Cat Chow",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_75",
      "name": "ALIMENTO P/GATO CAT CHOW 1.5 PESCAD",
      "brand": "Cat Chow",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_76",
      "name": "CAT CHOW 500 GR PESCADO, CARNE Y LECHE",
      "brand": "Cat Chow",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_1_77",
      "name": "CAT CHOW 500GR CARNE",
      "brand": "Cat Chow",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_1_78",
      "name": "ALIMENTO P/GATO CAT CHOW 1.5 HOGAREÑOS",
      "brand": "Cat Chow",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_79",
      "name": "COMEDERO P/PERRO HUELLA GRANDE MISTER CAN",
      "brand": "Mister Can",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_1_80",
      "name": "DOW CHOW ALTA PROTEINA  2KG",
      "brand": "Dow Chow",
      "sku": "",
      "status": "normal",
      "initials": "DC"
    },
    {
      "id": "p_1_81",
      "name": "ALIM. P/PERRO TOP DOG PET ADULTO 2KG",
      "brand": "ALIM",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_1_82",
      "name": "ARENA P/GATOS  CALABAZA  4.5KG",
      "brand": "ARENA",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    }
  ],
  "2": [
    {
      "id": "p_2_1",
      "name": "PAPEL HIGIENICO ROSAL PLUS VINO 2UND",
      "brand": "Rosal Plus",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_2",
      "name": "PAPEL HIGIENICO ROSAL PLUS VERDE 2UND",
      "brand": "Rosal Plus",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_3",
      "name": "PAPEL HIGIENICO ROSAL PLUS VERDE 4UND",
      "brand": "Rosal Plus",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_4",
      "name": "PAPEL HIGIENICO ROSAL PLUS ROJO 4UND",
      "brand": "Rosal Plus",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_5",
      "name": "PAPEL HIGIENICO ROSAL PLUS NARANJA 4UND",
      "brand": "Rosal Plus",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_6",
      "name": "PAPEL HIGIENICO ROSAL PLUS AMARILLO 4UND",
      "brand": "Rosal Plus",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_7",
      "name": "PAPEL HIGIENICO SUTIL 500H 4UND",
      "brand": "Sutil",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_8",
      "name": "PAPEL HIGIENICO SUTIL 400H 4UND",
      "brand": "Sutil",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_9",
      "name": "PAPEL HIGIENICO SUTIL 500H 12UND",
      "brand": "Sutil",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_10",
      "name": "PAPEL HIGIENICO SUTIL 300H 4UND",
      "brand": "Sutil",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_11",
      "name": "PAPEL HIGIENICO SUTIL 200H 4UND",
      "brand": "Sutil",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_12",
      "name": "PAPEL HIGIENICO JAZMIN 400H 4UND",
      "brand": "Jazmin",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_13",
      "name": "PAPEL HIGIENICO JAZMIN 300H 4UND",
      "brand": "Jazmin",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_14",
      "name": "PAPEL HIGIENICO EXTRA FAMILIAR 4 UND",
      "brand": "PAPEL",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_15",
      "name": "PAPEL HIGIENICO 3B 600H 4UND",
      "brand": "3b",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_16",
      "name": "PAPEL HIGIENICO 3B 215H 4UND",
      "brand": "3b",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_17",
      "name": "PAPEL HIGIENICO 3B 300H 4UND",
      "brand": "3b",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_18",
      "name": "PAPEL HIGIENICO 3B 180H 4UND",
      "brand": "3b",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_19",
      "name": "PAPEL HIGIENICO ALISOFT 400H",
      "brand": "Alisoft",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_20",
      "name": "PAPEL HIGIENICO ALISOFT 300H",
      "brand": "Alisoft",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_21",
      "name": "PAPEL HIGIENICO ALISOFT 215H",
      "brand": "Alisoft",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_22",
      "name": "PAPEL HIGIENICO MIMLOT 600H",
      "brand": "Mimlot",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_23",
      "name": "PAPEL HIGIENICO MIMLOT 300H",
      "brand": "Mimlot",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_24",
      "name": "PAPEL HIGIENICO MIMLOT 400H",
      "brand": "Mimlot",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_25",
      "name": "PAPEL HIGIENICO MIMLOT 215H",
      "brand": "Mimlot",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_26",
      "name": "PAÑALES BABY FINGER M",
      "brand": "PAALES",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_2_27",
      "name": "PAÑALES BABY FINGER G",
      "brand": "PAALES",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_2_28",
      "name": "PAÑALES BEBEX M",
      "brand": "Bebex",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_2_29",
      "name": "PAÑALES BEBEX XG",
      "brand": "Bebex",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_2_30",
      "name": "PAÑALES BEBEX G",
      "brand": "Bebex",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_2_31",
      "name": "PAÑALES BEBEX P",
      "brand": "Bebex",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_2_32",
      "name": "PAÑALES WINNY M",
      "brand": "Winny",
      "sku": "",
      "status": "normal",
      "initials": "PW"
    },
    {
      "id": "p_2_33",
      "name": "PAÑALES WINNY P",
      "brand": "Winny",
      "sku": "",
      "status": "normal",
      "initials": "PW"
    },
    {
      "id": "p_2_34",
      "name": "PAÑALES WINNY XXG",
      "brand": "Winny",
      "sku": "",
      "status": "normal",
      "initials": "PW"
    },
    {
      "id": "p_2_35",
      "name": "PAÑALES BABY DREAMS P",
      "brand": "PAALES",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_2_36",
      "name": "PAÑALES BABY DREAMS M",
      "brand": "PAALES",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_2_37",
      "name": "PAÑALES HUGGIES XXG",
      "brand": "Huggies",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_38",
      "name": "PAÑALES HUGGIES G",
      "brand": "Huggies",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_39",
      "name": "PAÑALES HUGGIES TRIPLE PROT. XG",
      "brand": "Huggies",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_40",
      "name": "PAÑALES HUGGIES TRIPLE PROT. G",
      "brand": "Huggies",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_41",
      "name": "PAÑALES HUGGIES P 25UND",
      "brand": "Huggies",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_42",
      "name": "PAÑAL TENA L",
      "brand": "Tena",
      "sku": "",
      "status": "normal",
      "initials": "PT"
    },
    {
      "id": "p_2_43",
      "name": "PAÑAL TENA L CLASICO",
      "brand": "Tena",
      "sku": "",
      "status": "normal",
      "initials": "PT"
    },
    {
      "id": "p_2_44",
      "name": "PAÑAL TENA M SLIM",
      "brand": "Tena",
      "sku": "",
      "status": "normal",
      "initials": "PT"
    },
    {
      "id": "p_2_45",
      "name": "PAÑAL 3B M CLASICO ROJO",
      "brand": "3b",
      "sku": "",
      "status": "normal",
      "initials": "P3"
    },
    {
      "id": "p_2_46",
      "name": "PAÑAL 3B G CLASICO ROJO",
      "brand": "3b",
      "sku": "",
      "status": "normal",
      "initials": "P3"
    },
    {
      "id": "p_2_47",
      "name": "PAÑAL 3B XG CLASICO ROJO",
      "brand": "3b",
      "sku": "",
      "status": "normal",
      "initials": "P3"
    },
    {
      "id": "p_2_48",
      "name": "PAÑAL 3B G AZUL PREMIUN MALETA",
      "brand": "3b",
      "sku": "",
      "status": "normal",
      "initials": "P3"
    },
    {
      "id": "p_2_49",
      "name": "PAÑAL 3B XG AZUL PREMIUM MALETA",
      "brand": "3b",
      "sku": "",
      "status": "normal",
      "initials": "P3"
    },
    {
      "id": "p_2_50",
      "name": "PAÑAL 3B XL",
      "brand": "3b",
      "sku": "",
      "status": "normal",
      "initials": "P3"
    },
    {
      "id": "p_2_51",
      "name": "PAÑAL MIMLOT G",
      "brand": "Mimlot",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_2_52",
      "name": "PROTECTOR DE CAMA 3B",
      "brand": "3b",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_53",
      "name": "PAÑAL PREDO 1 NEWBORNY",
      "brand": "Predo",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_2_54",
      "name": "PAÑAL PREDO 2 MINI",
      "brand": "Predo",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_2_55",
      "name": "PAÑAL BUMBLE 1",
      "brand": "Bumble",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_2_56",
      "name": "PAÑAL BUMBLE 2",
      "brand": "Bumble",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_2_57",
      "name": "PAÑAL BUMBLE 6",
      "brand": "Bumble",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_2_58",
      "name": "PAÑAL BUMBLE 3",
      "brand": "Bumble",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_2_59",
      "name": "PROTECTOR DE CAMA DANNA ADULTO",
      "brand": "Danna",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_60",
      "name": "PAPEL HIGIENICO ARBORA",
      "brand": "Arbora",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_61",
      "name": "DISPENSADOR DE TOALLAS ELLAS DIA 40UND",
      "brand": "DISPENSADOR",
      "sku": "",
      "status": "normal",
      "initials": "DD"
    },
    {
      "id": "p_2_62",
      "name": "DISPENSADOR DE TOALLAS ELLAS NOCHE 30UND",
      "brand": "DISPENSADOR",
      "sku": "",
      "status": "normal",
      "initials": "DD"
    },
    {
      "id": "p_2_63",
      "name": "TRATAMIENTO NUTRIBELA 180ML REPARARACIÓN INTENSIVA",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_64",
      "name": "TRATAMIENTO NUTRIBELA 180ML ENZIMIOTERAPIA",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_65",
      "name": "TRATAMIENTO NUTRIBELA 300ML CELULAS MADRES",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_66",
      "name": "TRATAMIENTO NUTRIBELA 300ML TERMOPROTECCIÓN",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_67",
      "name": "TRATAMIENTO NUTRIBELA 300ML ENZIMIOTERAPIA",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_68",
      "name": "TRATAMIENTO NUTRIBELA 300ML REPARACIÓN INTENSIVA",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_69",
      "name": "ACONDICIONADOR NUTRIBELA 370ML REPARACIÓN INTENSIVA",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "AN"
    },
    {
      "id": "p_2_70",
      "name": "ACONDICIONADOR NUTRIBELA 370ML CELULAS MADRES",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "AN"
    },
    {
      "id": "p_2_71",
      "name": "ACONDICIONADOR NUTRIBELA 370ML HIALURÓNICO",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "AN"
    },
    {
      "id": "p_2_72",
      "name": "ACONDICIONADOR NUTRIBELA 370ML ENZIMIOTERAPIA",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "AN"
    },
    {
      "id": "p_2_73",
      "name": "SHAMPOO UNO MANZANILLA 500ML",
      "brand": "SHAMPOO",
      "sku": "",
      "status": "normal",
      "initials": "SU"
    },
    {
      "id": "p_2_74",
      "name": "SHAMPOO UNO ALOE VERA 500ML",
      "brand": "SHAMPOO",
      "sku": "",
      "status": "normal",
      "initials": "SU"
    },
    {
      "id": "p_2_75",
      "name": "SHAMPOO UNO MENTA 500ML",
      "brand": "SHAMPOO",
      "sku": "",
      "status": "normal",
      "initials": "SU"
    },
    {
      "id": "p_2_76",
      "name": "ACONDICIONADOR UNO LECHE 500L",
      "brand": "ACONDICIONADOR",
      "sku": "",
      "status": "normal",
      "initials": "AU"
    },
    {
      "id": "p_2_77",
      "name": "ACONDICIONADOR ALIVE COCO",
      "brand": "ACONDICIONADOR",
      "sku": "",
      "status": "normal",
      "initials": "AA"
    },
    {
      "id": "p_2_78",
      "name": "TRATAMIENTO NK ALMENDRA 300G",
      "brand": "Nk",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_79",
      "name": "TRATAMIENTO NK RESTAURACIÓN",
      "brand": "Nk",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_80",
      "name": "TRATAMIENTO NUTRICOM. FRANCHELL",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_81",
      "name": "SHAMPOO PANTENE RESTAURACIÓN 400ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_2_82",
      "name": "SHAMPOO PANTENE RESTAURACIÓN 200ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_2_83",
      "name": "ACONDICIONADOR PANTENE RESTAURACIÓN  400ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_2_84",
      "name": "ACONDICIONADOR PANTENE RESTAURACIÓN  200ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_2_85",
      "name": "CREMA DE PEINAR BIO.PANTENE 300ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_86",
      "name": "ACONDICIONADOR PANTENE BIO ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_2_87",
      "name": "SHAMPOO PANTENE BIO 300ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_2_88",
      "name": "CREMA DE PEINAR PANTENE KERATINA 300ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_89",
      "name": "SHAMPOO PANTENE KERATINA 300ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_2_90",
      "name": "ACONDICIONADOR PANTENE KERATINA 250ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_2_91",
      "name": "CREMA DE PEINAR PANTENE COLAGENO 300ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_92",
      "name": "ACONDICIONADOR PANTENE COLAGENO 250ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_2_93",
      "name": "SHAMPOO PANTENE COLAGENO 300ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_2_94",
      "name": "ACONDICIONADOR PANTENE BAMBU 100ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_2_95",
      "name": "SHAMPOO PANTENE BAMBU 200ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_2_96",
      "name": "ACONDICIONADOR PANTENE 3MIN. 170ML NUTRICIÓN",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_2_97",
      "name": "ACONDICIONADOR PANTENE 3MIN.170ML HIDRATACIÓN",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_2_98",
      "name": "ACONDICIONADOR PANTENE 3 MIN.170ML REPARACIÓN",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_2_99",
      "name": "SELLADOR DE PUNTA PANTENE 90ML",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_2_100",
      "name": "MASCARILLA CAPILAR PANTENE 300ML REPARACIÓN",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "MC"
    },
    {
      "id": "p_2_101",
      "name": "MASCARILLA CAPILAR PANTENE 300ML HIDRATACIÓN",
      "brand": "Pantene",
      "sku": "",
      "status": "normal",
      "initials": "MC"
    },
    {
      "id": "p_2_102",
      "name": "ACOND. EVERY NIGHT 365ML TE VERDE",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_2_103",
      "name": "ACOND. EVERY NIGHT 210ML TE VERDE",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_2_104",
      "name": "CHAMPÚ EVERY NIGHT 365ML TE VERDE",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "CE"
    },
    {
      "id": "p_2_105",
      "name": "CHAMPÚ  EVERY NIGHT 210ML TE VERDE",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "CE"
    },
    {
      "id": "p_2_106",
      "name": "CREMA D/PEINAR  EVERY NIGHT 300ML COCO",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_107",
      "name": "TRATAMIENTO EVERY NIGHT 350ML COCO",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "TE"
    },
    {
      "id": "p_2_108",
      "name": "ACOND. EVERY NIGHT 365ML COCO",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_2_109",
      "name": "CHAMPÚ EVERY NIGHT 365ML COCO",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "CE"
    },
    {
      "id": "p_2_110",
      "name": "CHAMPÚ  EVERY NIGHT 210ML COCO",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "CE"
    },
    {
      "id": "p_2_111",
      "name": "ACOND. EVERY NIGHT 210ML COCO",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_2_112",
      "name": "TRATAMIENTO CAPILAR  EVERY NIGHT 350ML FRUTOS ROJOS",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "TC"
    },
    {
      "id": "p_2_113",
      "name": "CREMA P/PEINAR  EVERY NIGHT 300ML FRUTOS ROJOS",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_2_114",
      "name": "CHAMPÚ EVERY NIGHT 365ML FRUTOS R.",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "CE"
    },
    {
      "id": "p_2_115",
      "name": "CHAMPÚ  EVERY NIGHT 210ML FRUTOS R.",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "CE"
    },
    {
      "id": "p_2_116",
      "name": "TRATAMIENTO CAPILAR  EVERY NIGHT 350ML CEREALES",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "TC"
    },
    {
      "id": "p_2_117",
      "name": "ACOND. EVERY NIGHT 365ML CEREALES M.",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_2_118",
      "name": "CHAMPÚ EVERY NIGHT 210ML CEREALES",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "CE"
    },
    {
      "id": "p_2_119",
      "name": "ACOND.  EVERY NIGHT 365ML EXTRACTO DE FRUTA",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_2_120",
      "name": "ACOND. EVERY NIGHT 210ML EXTRACTO DE FRUTA",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_2_121",
      "name": "CHAMPÚ  EVERY NIGHT 365ML EXTRACTO DE FRUTA",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "CE"
    },
    {
      "id": "p_2_122",
      "name": "CHAMPÚ EVERY NIGHT 210ML EXTRACTO DE FRUTA",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "CE"
    },
    {
      "id": "p_2_123",
      "name": "TRATAMIENTO CAPILAR DRENE 350ML SECO M.",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "TC"
    },
    {
      "id": "p_2_124",
      "name": "ACOND. DRENE 200ML SECO M.",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_2_125",
      "name": "CHAMPÚ DRENE 370ML SECO M.",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_126",
      "name": "CHAMPÚ DRENE 200ML SECO M.",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_127",
      "name": "CREMA P/PEINAR 240ML RIZADO",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_2_128",
      "name": "ACOND. DRENE 370ML RIZADO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_2_129",
      "name": "ACOND. DRENE 200ML RIZADO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_2_130",
      "name": "CHAMPÚ DRENE 200ML RIZADO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_131",
      "name": "CHAMPÚ DRENE 370ML PROH HIALURÓNICO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_132",
      "name": "TRATAMIENTO DRENE 350ML LISO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_2_133",
      "name": "CREMA P/PEINAR DRENE 240ML LISO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_2_134",
      "name": "ACOND. DRENE 370ML LISO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_2_135",
      "name": "ACOND. DRENE 200ML LISO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_2_136",
      "name": "CHAMPU DRENE 200ML LISO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_137",
      "name": "ACOND. DRENE 3MIN 200ML",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_2_138",
      "name": "ACOND. DRENE 200ML QUEBRADIZO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_2_139",
      "name": "CHAMPÚ DRENE 370ML QUEBRADIZO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_140",
      "name": "CHAMPU DRENE 370ML ANTICASPA SECO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_141",
      "name": "CHAMPU DRENE 370ML ANTICASPA GRAS",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_142",
      "name": "CHAMPÚ DRENE 200ML ANTICASPA GRAS",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_143",
      "name": "CHAMPU DRENE 370ML ANTICAIDA",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_144",
      "name": "CHAMPU DRENE 200ML ANTICAIDA",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_145",
      "name": "ACOND. ELVIVE 370ML GLOSS",
      "brand": "Elvive",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_2_146",
      "name": "ACOND. ELVIVE 370ML HIALURÓNICO",
      "brand": "Elvive",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_2_147",
      "name": "TRATAMIENTO CAPILAR ELVIVE 300G GLOS",
      "brand": "Elvive",
      "sku": "",
      "status": "normal",
      "initials": "TC"
    },
    {
      "id": "p_2_148",
      "name": "TRATAMIENTO CAPILAR ELVIVE 300G CAIDA RESISTENTE",
      "brand": "Elvive",
      "sku": "",
      "status": "normal",
      "initials": "TC"
    },
    {
      "id": "p_2_149",
      "name": "TRATAMIENTO CAPILAR ELVIVE 300G PURE",
      "brand": "Elvive",
      "sku": "",
      "status": "normal",
      "initials": "TC"
    },
    {
      "id": "p_2_150",
      "name": "TRATAMIENTO C/ENJUAGUE ELVIVE 200G GLOSS",
      "brand": "Elvive",
      "sku": "",
      "status": "normal",
      "initials": "TC"
    },
    {
      "id": "p_2_151",
      "name": "TRATAMIENTO CAPILAR ELVIVE 300G HIALURÓNICO",
      "brand": "Elvive",
      "sku": "",
      "status": "normal",
      "initials": "TC"
    },
    {
      "id": "p_2_152",
      "name": "CREMA P/PEINAR ELVIVE 300G CAIDA",
      "brand": "Elvive",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_2_153",
      "name": "ACOND.ELVIVE 370ML CAIDA RESISTEN.",
      "brand": "Elvive",
      "sku": "",
      "status": "normal",
      "initials": "A3"
    },
    {
      "id": "p_2_154",
      "name": "ACOND.ELVIVE 370ML HIALURÓNICO PURE",
      "brand": "Elvive",
      "sku": "",
      "status": "normal",
      "initials": "A3"
    },
    {
      "id": "p_2_155",
      "name": "CIRUJIA CAPILAR CON KERATINA NK 450ML",
      "brand": "Nk",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_156",
      "name": "SHAMPOO POST TRATAMIENTO NK 450ML",
      "brand": "Nk",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_2_157",
      "name": "ACOND. GODAN 400ML REP. MOLECULAR",
      "brand": "ACOND",
      "sku": "",
      "status": "normal",
      "initials": "AG"
    },
    {
      "id": "p_2_158",
      "name": "MASCARILLA D/TRAT.NOVEX BAMBU 200M",
      "brand": "MASCARILLA",
      "sku": "",
      "status": "normal",
      "initials": "MD"
    },
    {
      "id": "p_2_159",
      "name": "MASCARILLA D/TRAT.NOVEX  HIALURÓNICO 200ML",
      "brand": "MASCARILLA",
      "sku": "",
      "status": "normal",
      "initials": "MD"
    },
    {
      "id": "p_2_160",
      "name": "DUO KIT ALISADOR DG GODAN 2LT",
      "brand": "DUO",
      "sku": "",
      "status": "normal",
      "initials": "DK"
    },
    {
      "id": "p_2_161",
      "name": "COOL BLANDE NOVEX 400ML",
      "brand": "COOL",
      "sku": "",
      "status": "normal",
      "initials": "CB"
    },
    {
      "id": "p_2_162",
      "name": "SHAMPOO ANTI/ANARANJADO KATIVA 355ML",
      "brand": "Kativa",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_2_163",
      "name": "SHAMPOO NOVEX KERATINA 300ML",
      "brand": "SHAMPOO",
      "sku": "",
      "status": "normal",
      "initials": "SN"
    },
    {
      "id": "p_2_164",
      "name": "SHAMPOO REVITAY MEUS CACHOS 300ML",
      "brand": "SHAMPOO",
      "sku": "",
      "status": "normal",
      "initials": "SR"
    },
    {
      "id": "p_2_165",
      "name": "DUO KERA TEENS 1100ML GODAN",
      "brand": "DUO",
      "sku": "",
      "status": "normal",
      "initials": "DK"
    },
    {
      "id": "p_2_166",
      "name": "SHAMPOO SEDAL 340ML CONTROL CASPA",
      "brand": "Sedal",
      "sku": "",
      "status": "normal",
      "initials": "SS"
    },
    {
      "id": "p_2_167",
      "name": "SHAMPOO SEDAL 340ML LISO PERFECTO",
      "brand": "Sedal",
      "sku": "",
      "status": "normal",
      "initials": "SS"
    },
    {
      "id": "p_2_168",
      "name": "SHAMPOO SEDAL 340ML RIZOS DEFINIDOS",
      "brand": "Sedal",
      "sku": "",
      "status": "normal",
      "initials": "SS"
    },
    {
      "id": "p_2_169",
      "name": "SHAMPOO SEDAL 340ML CERAMIDAS",
      "brand": "Sedal",
      "sku": "",
      "status": "normal",
      "initials": "SS"
    },
    {
      "id": "p_2_170",
      "name": "SHAMPOO SEDAL 340ML CELULAS M.",
      "brand": "Sedal",
      "sku": "",
      "status": "normal",
      "initials": "SS"
    },
    {
      "id": "p_2_171",
      "name": "CREMAP/PEINAR SEDAL 300ML CELULAS M",
      "brand": "Sedal",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_2_172",
      "name": "CREMA P/PEINAR SEDAL 300ML RIZOS D",
      "brand": "Sedal",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_2_173",
      "name": "CREMA P/PEINAR SEDAL 300ML CERAMIDAS",
      "brand": "Sedal",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_2_174",
      "name": "ACOND. SEDAL 340ML RIZOS DEFINIDOS",
      "brand": "Sedal",
      "sku": "",
      "status": "normal",
      "initials": "AS"
    },
    {
      "id": "p_2_175",
      "name": "SHAMPOO PALMOLIVE OPTIMS  HIALURÓNICO 400ML",
      "brand": "Palmolive",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_2_176",
      "name": "SHAMPOO PALMOLIVE OPTIMS V/KERA 400ML",
      "brand": "Palmolive",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_2_177",
      "name": "SHAMPOO AVISPA 200ML",
      "brand": "SHAMPOO",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_2_178",
      "name": "SHAMPOO DOVE 370ML RECONSTRUC.",
      "brand": "Dove",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_2_179",
      "name": "SHAMPOO DOVE 370ML NUTRICIÓN",
      "brand": "Dove",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_2_180",
      "name": "ACOND. DOVE 370ML RECONSTRUCCIÓN",
      "brand": "Dove",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_2_181",
      "name": "ACOND. DOVE 370ML NUTRICIÓN",
      "brand": "Dove",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_2_182",
      "name": "ACOND. DOVE 370ML REGENERACIÓN",
      "brand": "Dove",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_2_183",
      "name": "GEL FIJADOR EVERY NIGHT 500G WINNER",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_184",
      "name": "GEL FIJADOR EVERY NIGHT 500G POWER",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_185",
      "name": "GEL FIJADOR EVERY NIGHT250G WINNER",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_186",
      "name": "GEL FIJADOR EVERY NIGHT 250G POWER",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_187",
      "name": "GEL FIJADOR EVERY NIGHT 250G STRONG",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_188",
      "name": "GEL FIJADOR EVERY NIGHT 250G FRESH",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_189",
      "name": "GEL FIJADOR EVERY NIGHT 120G FRESH",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_190",
      "name": "GEL FIJADOR EVERY NIGHT120G WINNER",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_191",
      "name": "GEL FIJADOR EVERY NIGHT 120G POWER",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_192",
      "name": "GEL FIJADOR EVERY NIGHT NEGRA 250G",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_193",
      "name": "GEL FIJADOR EVERY NIGHT NEGRA 100G",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_194",
      "name": "GEL FIJADOR EVERY NIGHT NEGRA 500ML",
      "brand": "Every Night",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_195",
      "name": "MASCARILLA CAPILAR ROLDA 300G CERA DE ABEJA",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "MC"
    },
    {
      "id": "p_2_196",
      "name": "MASCARILLA CAPILAR ROLDA 300G PLACENTA",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "MC"
    },
    {
      "id": "p_2_197",
      "name": "CREMA P/PEINAR ROLDA 300G PLACENTA",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_2_198",
      "name": "CREMA P/PEINAR ROLDA 300G COLAGENO",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_2_199",
      "name": "CREMA P/PEINAR ROLDA 300G C/ABEJA",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_2_200",
      "name": "BRILLANTINA  ROLDA 100G",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "BR"
    },
    {
      "id": "p_2_201",
      "name": "MASCARILLA CAPILAR ROLDA CURLY AFRO",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "MC"
    },
    {
      "id": "p_2_202",
      "name": "CERA GEL FIJADOR  ROLDA COCO MAX 115G",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "CG"
    },
    {
      "id": "p_2_203",
      "name": "GEL FIJADOR ROLDA BLACK STYLING 120G",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_204",
      "name": "GEL FIJADOR ROLDA AZUL 120G",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_205",
      "name": "GEL FIJADOR ROLDA BLANCO 120G",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_206",
      "name": "GEL FIJADOR ROLDA MORADO 120G",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_207",
      "name": "GEL FIJADOR ROLDA 250G NEGRO",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_208",
      "name": "GEL FIJADOR ROLDA AZUL 250G",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_209",
      "name": "GEL FIJADOR ROLDA MORADO 250G",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_210",
      "name": "GEL FIJADOR ROLDA BLANCO 250G",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_211",
      "name": "GEL FIJADOR ROLDA AZUL 500G",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_212",
      "name": "GEL FIJADOR ROLDA BLANCO 500G",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_2_213",
      "name": "SHAMPOO   ACEITE DE COCO HEAD & SHOULDERS 375ML",
      "brand": "Head & Shoulders",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_2_214",
      "name": "SHAMPOO   HEAD & SHOULDERS OLD SPICE 375ML",
      "brand": "Head & Shoulders",
      "sku": "",
      "status": "normal",
      "initials": "SH"
    },
    {
      "id": "p_2_215",
      "name": "SHAMPOO  HEAD & SHOULDERS 200ML SUAVE MANEJABLE",
      "brand": "Head & Shoulders",
      "sku": "",
      "status": "normal",
      "initials": "SH"
    },
    {
      "id": "p_2_216",
      "name": "SHAMPOO  HEAD & SHOULDERS 375ML SUAVE MANEJABLE",
      "brand": "Head & Shoulders",
      "sku": "",
      "status": "normal",
      "initials": "SH"
    },
    {
      "id": "p_2_217",
      "name": "ACOND.  HEAD & SHOULDERS 300ML PROTECCIÓN CAIDA",
      "brand": "Head & Shoulders",
      "sku": "",
      "status": "normal",
      "initials": "AH"
    },
    {
      "id": "p_2_218",
      "name": "SHAMPOO  HEAD & SHOULDERS 180ML  PROTECCIÓN CAIDA",
      "brand": "Head & Shoulders",
      "sku": "",
      "status": "normal",
      "initials": "SH"
    },
    {
      "id": "p_2_219",
      "name": "SHAMPOO  HEAD & SHOULDERS 375ML  PROTECCIÓN CAIDA",
      "brand": "Head & Shoulders",
      "sku": "",
      "status": "normal",
      "initials": "SH"
    },
    {
      "id": "p_2_220",
      "name": "SHAMPOO  HEAD & SHOULDERS180ML ANTI/COMEZÓN",
      "brand": "Head & Shoulders",
      "sku": "",
      "status": "normal",
      "initials": "SH"
    },
    {
      "id": "p_2_221",
      "name": "SHAMPOO  HEAD & SHOULDERS 375ML  ANTI/COMEZÓN",
      "brand": "Head & Shoulders",
      "sku": "",
      "status": "normal",
      "initials": "SH"
    },
    {
      "id": "p_2_222",
      "name": "SHAMPOO  HEAD & SHOULDERS 180ML  ANTI/RESEQUEDA",
      "brand": "Head & Shoulders",
      "sku": "",
      "status": "normal",
      "initials": "SH"
    },
    {
      "id": "p_2_223",
      "name": "SHAMPOO  HEAD & SHOULDERS 375ML ANTI/RESEQUEDA",
      "brand": "Head & Shoulders",
      "sku": "",
      "status": "normal",
      "initials": "SH"
    },
    {
      "id": "p_2_224",
      "name": "SHAMPOO  HEAD & SHOULDERS  180ML LIMPIEZA",
      "brand": "Head & Shoulders",
      "sku": "",
      "status": "normal",
      "initials": "SH"
    },
    {
      "id": "p_2_225",
      "name": "SHAMPOO  HEAD & SHOULDERS 375ML LIMPIEZA RENOVADORA",
      "brand": "Head & Shoulders",
      "sku": "",
      "status": "normal",
      "initials": "SH"
    },
    {
      "id": "p_2_226",
      "name": "TOALLITAS HUMEDAS MIMLOT 25PC CREM",
      "brand": "Mimlot",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_227",
      "name": "TOALLITAS HUMEDAS MIMLOT 25PC FRESH",
      "brand": "Mimlot",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_228",
      "name": "TOALLITAS HUMEDAS MIMLOT 25PC ALOE VERA",
      "brand": "Mimlot",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_229",
      "name": "TOALLITAS HUMEDAS MIMLOT 72PC CREM",
      "brand": "Mimlot",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_230",
      "name": "TOALLITAS HUMEDAS MIMLOT 72PC ALOE",
      "brand": "Mimlot",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_231",
      "name": "TOALLITAS HUMEDAS MIMLOT 100PC FRESH",
      "brand": "Mimlot",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_232",
      "name": "TOALLITAS HUMEDAS UNO 100PC ROSADO",
      "brand": "TOALLITAS",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_233",
      "name": "TOALLITAS HUMEDAS UNO 100PC AZUL",
      "brand": "TOALLITAS",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_234",
      "name": "TOALLITAS HUMEDAS UNO 100PC VERDE",
      "brand": "TOALLITAS",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_235",
      "name": "TOALLITAS HUMEDAS INTIMAS UNO 25PC",
      "brand": "TOALLITAS",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_236",
      "name": "TOALLITAS HUMEDAS MIMADITO 48PC",
      "brand": "Mimadito",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_237",
      "name": "TOALLITAS HUMEDAS BABY FINGER 50PC ROSADO",
      "brand": "TOALLITAS",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_238",
      "name": "TOALLITAS HUMEDAS BABY FINGER 50PC AZUL",
      "brand": "TOALLITAS",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_239",
      "name": "TOALLITAS HUMEDAS CHICCO 24PC",
      "brand": "Chicco",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_240",
      "name": "TOALLITAS HUMEDAS CHICCO 48PC",
      "brand": "Chicco",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_241",
      "name": "TOALLITAS HUMEDAS CHICCO 72PC",
      "brand": "Chicco",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_242",
      "name": "TOALLITAS HUMEDAS AMY 24PC",
      "brand": "Amy",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_243",
      "name": "TOALLITAS HUMEDAS AMY 72PC",
      "brand": "Amy",
      "sku": "",
      "status": "normal",
      "initials": "TH"
    },
    {
      "id": "p_2_244",
      "name": "TRATAMIENTO NUTRIBELA 180ML PRO/ HIALURÓNICO",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_245",
      "name": "TRATAMIENTO NUTRIBELA 300ML NUTRICIÓN",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_246",
      "name": "TRATAMIENTO NUTRIBELA 300ML PRO/ HIALURÓNICO",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_247",
      "name": "SHAMPOO NUTRIBELA 400ML RESTAURA",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "SN"
    },
    {
      "id": "p_2_248",
      "name": "TOALLAS NOSOTRAS NOCTURNA CLASICA 10UND",
      "brand": "Nosotras",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_249",
      "name": "TOALLAS NOSOTRAS LARGAS DIA Y NOCHE 8UND",
      "brand": "Nosotras",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_250",
      "name": "TOALLAS NOSOTRAS MATERNIDAD 10UND",
      "brand": "Nosotras",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_251",
      "name": "TAMPONES NOSOTRAS CON APLICADOR 8UND",
      "brand": "Nosotras",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_252",
      "name": "TOALLAS ELLAS PRECIO ESPECIAL",
      "brand": "TOALLAS",
      "sku": "",
      "status": "normal",
      "initials": "TE"
    },
    {
      "id": "p_2_253",
      "name": "NIVEA CREMA CORPORAL NUTRITIVA 100ML",
      "brand": "Nivea",
      "sku": "",
      "status": "normal",
      "initials": "NC"
    },
    {
      "id": "p_2_254",
      "name": "CREMA CORPORAL NUVEL COCO 750ML",
      "brand": "Nuvel",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_255",
      "name": "CREMA CORPORAL NUVEL ACLARADO IDEAL 750ML",
      "brand": "Nuvel",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_256",
      "name": "CREMA CORPORAL NUVEL MANTECA CARITE 750ML",
      "brand": "Nuvel",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_257",
      "name": "CREMA CORPORAL NUVEL ARANDANO 750ML",
      "brand": "Nuvel",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_258",
      "name": "CREMA CORPORAL NUVEL MIEL Y AVENA 750ML",
      "brand": "Nuvel",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_259",
      "name": "CREMA CORPORAL NUVEL ADVANCED PEPINO 315ML",
      "brand": "Nuvel",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_260",
      "name": "CREMA CORPORAL NUVEL ADVANCED ANTIOXIDANTES 315ML",
      "brand": "Nuvel",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_261",
      "name": "CREMA CORPORAL NUVEL ADVANCED ALMENDRAS 315ML",
      "brand": "Nuvel",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_262",
      "name": "CREMA CORPORAL NUVEL ADVANCED COLAGENO 315ML",
      "brand": "Nuvel",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_263",
      "name": "CREMA DE  MANOS HIDRATANTE SPALINE ORQUIDEA 250ML",
      "brand": "Spaline",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_2_264",
      "name": "GEL DE BAÑO EXFOLIANTE SPALINE BLUBERRY 250ML",
      "brand": "Spaline",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_2_265",
      "name": "GEL MANOS Y CUERPO SPALINE COCONUT 250ML",
      "brand": "Spaline",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_2_266",
      "name": "GEL DE BAÑO EXFOLIANTE CUERPO  SPALINE CHERRY 250ML",
      "brand": "Spaline",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_2_267",
      "name": "SHAMPOO NUTRIBELA 400ML PRO/ HIALURÓNICO",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "SN"
    },
    {
      "id": "p_2_268",
      "name": "SHAMPOO NUTRIBELA 400ML CELULAS MADRES",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "SN"
    },
    {
      "id": "p_2_269",
      "name": "SHAMPOO NUTRIBELA 400ML ENZIMIOTERAPIA",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "SN"
    },
    {
      "id": "p_2_270",
      "name": "SHAMPOO NUTRIBELA 200ML PRO/ HIALURÓNICO",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "SN"
    },
    {
      "id": "p_2_271",
      "name": "SHAMPOO NUTRIBELA 200ML REPARA",
      "brand": "Nutribela",
      "sku": "",
      "status": "normal",
      "initials": "SN"
    },
    {
      "id": "p_2_272",
      "name": "COLGATE SENSITIVE 140G",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_2_273",
      "name": "COLGATE NATURAL CARBÓN ACT. 140G",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CN"
    },
    {
      "id": "p_2_274",
      "name": "COLGATE TOTAL PREVENCIÓN A. 75ML",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CT"
    },
    {
      "id": "p_2_275",
      "name": "COLGATE TOTAL WHITENING 150ML",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CT"
    },
    {
      "id": "p_2_276",
      "name": "COLGATE TOTAL WHITENING 75ML",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CT"
    },
    {
      "id": "p_2_277",
      "name": "COLGATE TRIPLE ACCIÓN 150ML",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CT"
    },
    {
      "id": "p_2_278",
      "name": "COLGATE TRIPLE ACCIÓN 100ML",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CT"
    },
    {
      "id": "p_2_279",
      "name": "COLGATE TRIPLE ACCIÓN 75ML",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CT"
    },
    {
      "id": "p_2_280",
      "name": "COLGATE TRIPLE ACCIÓN 620ML",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CT"
    },
    {
      "id": "p_2_281",
      "name": "COLGATE MAXFRESH 90ML",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_2_282",
      "name": "COLGATE LUMINOUS WHITE 75ML",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_2_283",
      "name": "COLGATE PLAX 100ML",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_2_284",
      "name": "COLGATE T/ACCIÓN ESXTRA BLANCO 75ML",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CT"
    },
    {
      "id": "p_2_285",
      "name": "COLGATE MAXIMA PROTECCIÓN 180G",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_2_286",
      "name": "COLGATE MAXIMA PROTECCIÓN 90G",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_2_287",
      "name": "COLGATE KIDS 50G",
      "brand": "Colgate",
      "sku": "",
      "status": "normal",
      "initials": "CK"
    },
    {
      "id": "p_2_288",
      "name": "CLOSEUP RED HOT 90G",
      "brand": "Closeup",
      "sku": "",
      "status": "normal",
      "initials": "CR"
    },
    {
      "id": "p_2_289",
      "name": "CLOSEUP ALOE FRESH 90G",
      "brand": "Closeup",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_2_290",
      "name": "CLOSEUP EUCALYTUS 90G",
      "brand": "Closeup",
      "sku": "",
      "status": "normal",
      "initials": "CE"
    },
    {
      "id": "p_2_291",
      "name": "GALACTIC TRIPLE MAX 100G",
      "brand": "Galactic",
      "sku": "",
      "status": "normal",
      "initials": "GT"
    },
    {
      "id": "p_2_292",
      "name": "GALACTIC TRIPLE MAX 75G",
      "brand": "Galactic",
      "sku": "",
      "status": "normal",
      "initials": "GT"
    },
    {
      "id": "p_2_293",
      "name": "GALACTIC CLASSIC XL 180G",
      "brand": "Galactic",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_2_294",
      "name": "GALACTIC CLASSIC ICE XXL 220G",
      "brand": "Galactic",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_2_295",
      "name": "GALACTIC KIDS 100G AZUL",
      "brand": "Galactic",
      "sku": "",
      "status": "normal",
      "initials": "GK"
    },
    {
      "id": "p_2_296",
      "name": "GALACTIC KIDS 100G ROSA",
      "brand": "Galactic",
      "sku": "",
      "status": "normal",
      "initials": "GK"
    },
    {
      "id": "p_2_297",
      "name": "ORAL B BICARBONATO 120G",
      "brand": "Oral B",
      "sku": "",
      "status": "normal",
      "initials": "OB"
    },
    {
      "id": "p_2_298",
      "name": "ORAL B 100% 70G",
      "brand": "Oral B",
      "sku": "",
      "status": "normal",
      "initials": "OB"
    },
    {
      "id": "p_2_299",
      "name": "ORAL B 3D WHITE 70G",
      "brand": "Oral B",
      "sku": "",
      "status": "normal",
      "initials": "OB"
    },
    {
      "id": "p_2_300",
      "name": "ORAL B ENCIAS DETOX 102G",
      "brand": "Oral B",
      "sku": "",
      "status": "normal",
      "initials": "OB"
    },
    {
      "id": "p_2_301",
      "name": "ORAL B STAGES 100G",
      "brand": "Oral B",
      "sku": "",
      "status": "normal",
      "initials": "OB"
    },
    {
      "id": "p_2_302",
      "name": "ALIDENT GEL VERDE 100G",
      "brand": "Alident",
      "sku": "",
      "status": "normal",
      "initials": "AG"
    },
    {
      "id": "p_2_303",
      "name": "ALIDENT GEL AZUL 100G",
      "brand": "Alident",
      "sku": "",
      "status": "normal",
      "initials": "AG"
    },
    {
      "id": "p_2_304",
      "name": "ALIDENT TRIPLE ACCIÓN 100G",
      "brand": "Alident",
      "sku": "",
      "status": "normal",
      "initials": "AT"
    },
    {
      "id": "p_2_305",
      "name": "ALIDENT KIDS NIÑOS 100G",
      "brand": "Alident",
      "sku": "",
      "status": "normal",
      "initials": "AK"
    },
    {
      "id": "p_2_306",
      "name": "ALIDENT KIDS NIÑAS 100G",
      "brand": "Alident",
      "sku": "",
      "status": "normal",
      "initials": "AK"
    },
    {
      "id": "p_2_307",
      "name": "PROTECTORES DIARIOS NOSOTRAS 60UND",
      "brand": "Nosotras",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_308",
      "name": "PROTECTORES DIARIOS NOSOTRAS LARGOS 50UND",
      "brand": "Nosotras",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_309",
      "name": "PROTECTORES DIARIOS NOSOTRAS ALAS 30UND",
      "brand": "Nosotras",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_310",
      "name": "PROTECTORES DIARIOS NOSOTRAS LARGOS 15UND",
      "brand": "Nosotras",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_311",
      "name": "PROTECTORES DIARIOS NOSOTRAS 15UND",
      "brand": "Nosotras",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_312",
      "name": "PROTECTORES DIARIOS  NOSOTRAS MULTIESTILO 15UND",
      "brand": "Nosotras",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_313",
      "name": "PROTECTORES DIARIOS  ELLAS 10UND",
      "brand": "PROTECTORES",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_314",
      "name": "PROTECTORES DIARIOS  FRIENDS 20UND",
      "brand": "Friends",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_315",
      "name": "PROTECTORES DIARIOS  FRIENDS 60UND",
      "brand": "Friends",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_316",
      "name": "PROTECTORES DIARIOS  FRIENDS MANZANILLA 40UND",
      "brand": "Friends",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_317",
      "name": "PROTECTORES DIARIOS  KOTEX DAILY CARA 15UND",
      "brand": "Kotex",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_318",
      "name": "PROTECTORES DIARIOS DIVA 50UND",
      "brand": "Diva",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_319",
      "name": "PROTECTORES DIARIOS  ALWAYS LARGOS 50UND",
      "brand": "Always",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_320",
      "name": "PROTECTORES DIARIOS ALWAYS REGULAR CON A. 40UND",
      "brand": "Always",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_321",
      "name": "TOALLAS ALWAYS LARGAS ULTRAFINA SUAVE 8UND",
      "brand": "Always",
      "sku": "",
      "status": "normal",
      "initials": "TA"
    },
    {
      "id": "p_2_322",
      "name": "TOALLAS ALWAYSPADS MALLA 8UND",
      "brand": "Always",
      "sku": "",
      "status": "normal",
      "initials": "TA"
    },
    {
      "id": "p_2_323",
      "name": "TOALLAS NUBES IURNA 10UND",
      "brand": "TOALLAS",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_324",
      "name": "TOALLAS FRIENDS ULTRAGELGADA 10UND",
      "brand": "Friends",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_325",
      "name": "TOALLAS FRIENDS NOTURNA 10UND",
      "brand": "Friends",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_326",
      "name": "TOALLAS FRIENDS TELA SUAVE 14UND",
      "brand": "Friends",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_327",
      "name": "TOALLAS FRIENDS NOCTURNA MAXI 10UND",
      "brand": "Friends",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_328",
      "name": "TOALLAS FRIENDS SUPER OFERTA",
      "brand": "Friends",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_329",
      "name": "TOALLAS NOSOTRAS INVISIBLE 10UND",
      "brand": "Nosotras",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_330",
      "name": "TOALLAS NOCTURNAS 4UND",
      "brand": "TOALLAS",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_331",
      "name": "GEL DE MANOS Y CUERPO SPALINE ORQUIDEA 250ML",
      "brand": "Spaline",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_2_332",
      "name": "GEL EXFOLIANTE MANO Y CUERPO SPALINE 250ML COCONUT",
      "brand": "Spaline",
      "sku": "",
      "status": "normal",
      "initials": "GE"
    },
    {
      "id": "p_2_333",
      "name": "GEL DE BAÑO EXFOLIANTE CUERPO  SPALINE CHERRY 250ML",
      "brand": "Spaline",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_2_334",
      "name": "EXFOLIANTE EN CREMA SIN ENJUAGAR  SPALINE 250ML",
      "brand": "Spaline",
      "sku": "",
      "status": "normal",
      "initials": "EE"
    },
    {
      "id": "p_2_335",
      "name": "CREMA HIDRATANTE MANOS Y CUERPO SPALINE  BLUBERRY 250ML",
      "brand": "Spaline",
      "sku": "",
      "status": "normal",
      "initials": "CH"
    },
    {
      "id": "p_2_336",
      "name": "LOCIÓN MANOS Y CUERPO DG SAVILA 400CM",
      "brand": "LOCIN",
      "sku": "",
      "status": "normal",
      "initials": "LM"
    },
    {
      "id": "p_2_337",
      "name": "CREMA CORPORAL DERMOX PROTEINA DE LECHE 365ML",
      "brand": "Dermox",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_338",
      "name": "CREMA CORPORAL DERMOX PROTEINA DE LECHE 200ML",
      "brand": "Dermox",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_339",
      "name": "CREMA CORPORAL DERMOX GLICERINA 200ML",
      "brand": "Dermox",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_340",
      "name": "CREMA CORPORAL DERMOX GLICERINA 365ML",
      "brand": "Dermox",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_341",
      "name": "CREMA CORPORAL DERMOX COCO 200ML",
      "brand": "Dermox",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_342",
      "name": "CREMA CORPORAL DERMOX COLAGENO 200ML",
      "brand": "Dermox",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_343",
      "name": "CREMA CORPORAL DERMOX COLAGENO 365ML",
      "brand": "Dermox",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_344",
      "name": "CREMA CORPORAL EVERY NIGTH COCO Y AVENA 365ML",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_345",
      "name": "CREMA CORPORAL EVERY NIGTH COCO Y AVENA 200ML",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_346",
      "name": "CREMA CORPORAL EVERY NIGTH CACAO 200ML",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_347",
      "name": "CREMA CORPORAL EVERY NIGTH CACAO 365ML",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_348",
      "name": "CREMA CORPORAL EVERY NIGTH ALOE VERA 365ML",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_349",
      "name": "CREMA CORPORAL EVERY NIGTH MILK 200ML",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_350",
      "name": "CREMA OXIGENADA FRANCHELL V.10",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "CO"
    },
    {
      "id": "p_2_351",
      "name": "CREMA CORPORAL EVERY NIGTH MILK 365ML",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_352",
      "name": "CREMA CORPORAL ALOE VERA BOTANIKA 250ML",
      "brand": "Botanika",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_353",
      "name": "DETERGENTE INTIMO ALOE VERA  BOTANIKA 250ML",
      "brand": "Botanika",
      "sku": "",
      "status": "normal",
      "initials": "DI"
    },
    {
      "id": "p_2_354",
      "name": "DETERGENTE INTIMO AVENA  BOTANIKA 250ML",
      "brand": "Botanika",
      "sku": "",
      "status": "normal",
      "initials": "DI"
    },
    {
      "id": "p_2_355",
      "name": "GEL DE DUCHA UNO COOL MEN 500ML",
      "brand": "GEL",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_2_356",
      "name": "JABÓN ESPUMA P/MANOS AMATISTA UNO 400ML",
      "brand": "JABN",
      "sku": "",
      "status": "normal",
      "initials": "JE"
    },
    {
      "id": "p_2_357",
      "name": "JABÓN ESPUMA P/MANOS UNO CITRINO 400ML",
      "brand": "JABN",
      "sku": "",
      "status": "normal",
      "initials": "JE"
    },
    {
      "id": "p_2_358",
      "name": "JABÓN ESPUMA P/MANOS UNO TOPICO 400ML",
      "brand": "JABN",
      "sku": "",
      "status": "normal",
      "initials": "JE"
    },
    {
      "id": "p_2_359",
      "name": "JABÓN ESPUMA P/MANOS UNO ESMERALDA 400ML",
      "brand": "JABN",
      "sku": "",
      "status": "normal",
      "initials": "JE"
    },
    {
      "id": "p_2_360",
      "name": "JABÓN ESPUMA P/MANOS UNO RUBY 400ML",
      "brand": "JABN",
      "sku": "",
      "status": "normal",
      "initials": "JE"
    },
    {
      "id": "p_2_361",
      "name": "JABÓN LIQUIDO P/MANOS UNO LIMÓN 500ML",
      "brand": "JABN",
      "sku": "",
      "status": "normal",
      "initials": "JL"
    },
    {
      "id": "p_2_362",
      "name": "JABÓN LIQUIDO P/MANOS UNO LAVANDA 500ML",
      "brand": "JABN",
      "sku": "",
      "status": "normal",
      "initials": "JL"
    },
    {
      "id": "p_2_363",
      "name": "JABÓN LIQUIDO P/ MANOS UNO FRESA 500ML",
      "brand": "JABN",
      "sku": "",
      "status": "normal",
      "initials": "JL"
    },
    {
      "id": "p_2_364",
      "name": "JABÓN LIQUIDO P/ MANOS MIMLOT MANGO 500ML",
      "brand": "Mimlot",
      "sku": "",
      "status": "normal",
      "initials": "JL"
    },
    {
      "id": "p_2_365",
      "name": "JABÓN LIQUIDO P/ MANOS MIMLOT PLUM 500ML",
      "brand": "Mimlot",
      "sku": "",
      "status": "normal",
      "initials": "JL"
    },
    {
      "id": "p_2_366",
      "name": "JABÓN LIQUIDO P/ MANOS PROTEX ALOE V 221ML",
      "brand": "JABN",
      "sku": "",
      "status": "normal",
      "initials": "JL"
    },
    {
      "id": "p_2_367",
      "name": "JABÓN LIQUIDO P/ MANOS PROTEX AVENA 221ML",
      "brand": "JABN",
      "sku": "",
      "status": "normal",
      "initials": "JL"
    },
    {
      "id": "p_2_368",
      "name": "JABÓN LIQUIDO P/ MANOS PALMOLIVE SANDIA 390ML",
      "brand": "Palmolive",
      "sku": "",
      "status": "normal",
      "initials": "JL"
    },
    {
      "id": "p_2_369",
      "name": "CREMA OXIGENADA HELLOWEL V.20 60ML",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CO"
    },
    {
      "id": "p_2_370",
      "name": "AGUA OXIGENADA LOVIA V.20 100ML",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "AO"
    },
    {
      "id": "p_2_371",
      "name": "AGUA OXIGENADA ROLDA V.40 120ML",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "AO"
    },
    {
      "id": "p_2_372",
      "name": "AGUA OXIGENADA ROLDA V30 120ML",
      "brand": "Rolda",
      "sku": "",
      "status": "normal",
      "initials": "AO"
    },
    {
      "id": "p_2_373",
      "name": "DESODORANTE CREMA LADY SPEED CLINICAL 70G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DC"
    },
    {
      "id": "p_2_374",
      "name": "DESODORANTE CREMA LADY SPEED 30G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DC"
    },
    {
      "id": "p_2_375",
      "name": "ANTITRANS. LADY PRO 5 ROLLON 50ML",
      "brand": "ANTITRANS",
      "sku": "",
      "status": "normal",
      "initials": "AL"
    },
    {
      "id": "p_2_376",
      "name": "DESODORANTE LADY OMEGA3 ROLLON 50ML",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DL"
    },
    {
      "id": "p_2_377",
      "name": "DESODORANTE LADY PRO 5 BARRA 45G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DL"
    },
    {
      "id": "p_2_378",
      "name": "DESODORANTE LADY CARBÓN BARRA 45G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DL"
    },
    {
      "id": "p_2_379",
      "name": "DESODORANTE LADY CLINICAL BARRA 45G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DL"
    },
    {
      "id": "p_2_380",
      "name": "DESODORANTE LADY AEROSOL OMEGA 150ML",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DL"
    },
    {
      "id": "p_2_381",
      "name": "DESODORANTE LADY PRO 5 AEROSOL 150ML",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DL"
    },
    {
      "id": "p_2_382",
      "name": "DESODORANTE DOVE AEROSOL INVISIBLE 150ML",
      "brand": "Dove",
      "sku": "",
      "status": "normal",
      "initials": "DD"
    },
    {
      "id": "p_2_383",
      "name": "DESODORANTE DOVE AEROSOL MEN",
      "brand": "Dove",
      "sku": "",
      "status": "normal",
      "initials": "DD"
    },
    {
      "id": "p_2_384",
      "name": "DESODORANTE DOVE BARRA ORIG.50G",
      "brand": "Dove",
      "sku": "",
      "status": "normal",
      "initials": "DD"
    },
    {
      "id": "p_2_385",
      "name": "DESODORANTE DOVE BARRA INVI. 50G",
      "brand": "Dove",
      "sku": "",
      "status": "normal",
      "initials": "DD"
    },
    {
      "id": "p_2_386",
      "name": "DESODORANTE DOVE BARRA MEN 45G",
      "brand": "Dove",
      "sku": "",
      "status": "normal",
      "initials": "DD"
    },
    {
      "id": "p_2_387",
      "name": "DESODORANTE REXONA AEROSOL CLINICAL 150G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DR"
    },
    {
      "id": "p_2_388",
      "name": "DESODORANTE REXONA AEROSOL BAMBU 150ML",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DR"
    },
    {
      "id": "p_2_389",
      "name": "DESODORANTE REXONA ANTIBACTERIAL ROLLON 50G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DR"
    },
    {
      "id": "p_2_390",
      "name": "DESODORANTE REXONA ANTIBACTERIAL ROLLON 50G DAMA",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DR"
    },
    {
      "id": "p_2_391",
      "name": "DESODORANTE REXONA BARRA ANTIBACTERIAL 45G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DR"
    },
    {
      "id": "p_2_392",
      "name": "DESODORANTE REXONA BARRA EMOTIÓN 45G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DR"
    },
    {
      "id": "p_2_393",
      "name": "DESODORANTE REXONA BARRA V-8 50G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DR"
    },
    {
      "id": "p_2_394",
      "name": "DESODORANTE REXONA BARRA XTRA COOL 50G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DR"
    },
    {
      "id": "p_2_395",
      "name": "DESODORANTE EVERY N. BARRA MEN FRESH 50G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_396",
      "name": "DESODORANTE EVERY N. BARRA BABY",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_397",
      "name": "DESODORANTE EVERY N. BARRA POWER",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_398",
      "name": "DESODORANTE EVERY N. ROLLON MEN FRESH 90G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_399",
      "name": "DESODORANTE EVERY N. ROLLON NATURELLE 90G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_400",
      "name": "DESODORANTE EVERY N. ROLLON COLONIA 90G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_401",
      "name": "DESODORANTE EVERY N. ROLLON FRESH 90G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_402",
      "name": "DESODORANTE EVERY N. ROLLON POWER 90G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_403",
      "name": "DESODORANTE EVERY N.ROLLON PURE 90G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_404",
      "name": "DESODORANTE EVERY N. ROLLON HAPPY 90G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_405",
      "name": "DESODORANTE AEROSOL SPEED STAIN 150ML",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DA"
    },
    {
      "id": "p_2_406",
      "name": "DESODORANTE AEROSOL SPEED 5UND 150ML",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DA"
    },
    {
      "id": "p_2_407",
      "name": "DESODORANTE BARRA SPEED CARBÓN 50G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DB"
    },
    {
      "id": "p_2_408",
      "name": "DESODORANTE BARRA SPEED CLINICAL 50G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DB"
    },
    {
      "id": "p_2_409",
      "name": "DESODORANTE BARRA SPEED X5 50G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DB"
    },
    {
      "id": "p_2_410",
      "name": "DESODORANTE ROLLON SPEED X5 50ML",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DR"
    },
    {
      "id": "p_2_411",
      "name": "DESODORANTE CREMA SPEED CLINICAL 70G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DC"
    },
    {
      "id": "p_2_412",
      "name": "DESODORANTE CREMA SPEED 30G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DC"
    },
    {
      "id": "p_2_413",
      "name": "DESODORANTE EN GEL GILLETTE COOL WAVE 82G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_414",
      "name": "DESODORANTE EN GEL GILLETTE COOL WAVE 45G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_415",
      "name": "DESODORANTE EN GEL GILLETTE HYDRA 82G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_416",
      "name": "DESODORANTE EN GEL GILLETTE POWER RUSH 82G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_417",
      "name": "DESODORANTE EN GEL GILLETTE HYDRA 45G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DE"
    },
    {
      "id": "p_2_418",
      "name": "DESODORANTE GILLETTE ROLLON COOL WAVE 150ML",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DG"
    },
    {
      "id": "p_2_419",
      "name": "DESODORANTE GILLETTE ROLLON COOL WAVE 60G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DG"
    },
    {
      "id": "p_2_420",
      "name": "DESODORANTE GILLETTE ROLLON POWER RUSH 60G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DG"
    },
    {
      "id": "p_2_421",
      "name": "DESODORANTE GEL OLD SPICE 80G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DG"
    },
    {
      "id": "p_2_422",
      "name": "DESODORANTE BARRA OLD SPICE 50G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DB"
    },
    {
      "id": "p_2_423",
      "name": "DESODORANTE AEROSOL OLD SPICE LEÑA 150ML",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DA"
    },
    {
      "id": "p_2_424",
      "name": "DESODORANTE  ROLLON OLD SPICE LEÑA 52G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DR"
    },
    {
      "id": "p_2_425",
      "name": "DESODORANTE BARRA SECRET 45G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DB"
    },
    {
      "id": "p_2_426",
      "name": "DESODORANTE GEL SECRET COTTON 45G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DG"
    },
    {
      "id": "p_2_427",
      "name": "DESODORANTE GEL SECRET COCONUT 45G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DG"
    },
    {
      "id": "p_2_428",
      "name": "DESODORANTE GEL SECRET LAVANDA 45G",
      "brand": "DESODORANTE",
      "sku": "",
      "status": "normal",
      "initials": "DG"
    },
    {
      "id": "p_2_429",
      "name": "ESPUMA P/AFEITAR APEX 414ML KAOS",
      "brand": "ESPUMA",
      "sku": "",
      "status": "normal",
      "initials": "EP"
    },
    {
      "id": "p_2_430",
      "name": "ESPUMA P/AFEITAR APEX 414ML LEGACY",
      "brand": "ESPUMA",
      "sku": "",
      "status": "normal",
      "initials": "EP"
    },
    {
      "id": "p_2_431",
      "name": "ESPUMA P/AFEITAR GILLETTE CARBON 450G",
      "brand": "ESPUMA",
      "sku": "",
      "status": "normal",
      "initials": "EP"
    },
    {
      "id": "p_2_432",
      "name": "TALCO P/PIES BORIFOR 120G",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TP"
    },
    {
      "id": "p_2_433",
      "name": "TALCO P/PIES BORIFOR 60G",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TP"
    },
    {
      "id": "p_2_434",
      "name": "TALCO P/PIES BORIFOR 90G",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TP"
    },
    {
      "id": "p_2_435",
      "name": "TALCO P/PIES BORIFOR 35G",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TP"
    },
    {
      "id": "p_2_436",
      "name": "TALCO BOROCANFOR 120G ORIGINAL",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TB"
    },
    {
      "id": "p_2_437",
      "name": "TALCO BOROCANFOR 60G ORIGINAL",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TB"
    },
    {
      "id": "p_2_438",
      "name": "TALCO BOROCANFOR 35G ORIGINAL",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TB"
    },
    {
      "id": "p_2_439",
      "name": "TALCO BOROCANFOR 60G COOL",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TB"
    },
    {
      "id": "p_2_440",
      "name": "TALCO P/PIES EVERY NIGH 30G",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TP"
    },
    {
      "id": "p_2_441",
      "name": "TALCO P/PIES EVERY NIGH 85G",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TP"
    },
    {
      "id": "p_2_442",
      "name": "LOCIÓN HUMECTANTE REPELENTE 190ML OSI",
      "brand": "LOCIN",
      "sku": "",
      "status": "normal",
      "initials": "LH"
    },
    {
      "id": "p_2_443",
      "name": "REPELENTE OFF AEROSOL 170ML",
      "brand": "REPELENTE",
      "sku": "",
      "status": "normal",
      "initials": "RO"
    },
    {
      "id": "p_2_444",
      "name": "CREMA REPELENTE OFF FAMILY 200G",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CR"
    },
    {
      "id": "p_2_445",
      "name": "TALCO BABY FINGER 100G",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TB"
    },
    {
      "id": "p_2_446",
      "name": "TALCO BABY CARE STUDIO 113G",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TB"
    },
    {
      "id": "p_2_447",
      "name": "COLONIA BABY FINGER 200ML",
      "brand": "COLONIA",
      "sku": "",
      "status": "normal",
      "initials": "CB"
    },
    {
      "id": "p_2_448",
      "name": "COTONCITOS CHICCO 100ML",
      "brand": "Chicco",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_449",
      "name": "HISOPOS UNO 100UND",
      "brand": "HISOPOS",
      "sku": "",
      "status": "normal",
      "initials": "HU"
    },
    {
      "id": "p_2_450",
      "name": "LOCIÓN CORPORAL CHICCO 100ML",
      "brand": "Chicco",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_2_451",
      "name": "LOCIÓN CORPORAL CHICCO 200ML",
      "brand": "Chicco",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_2_452",
      "name": "ACEITE P/NIÑOS CHICCO 220ML",
      "brand": "Chicco",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_2_453",
      "name": "TINTE MAXTON 50ML CASTAÑO OSCURO",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_2_454",
      "name": "TINTE MAXTON 50MLRUBIO OSCURO",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_2_455",
      "name": "TINTE MAXTON RUBIO 50ML CENIZA OSC.",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_2_456",
      "name": "CHAMPÚ CHICO 200ML ORIGINAL",
      "brand": "CHAMP",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_457",
      "name": "COLONIA P/NIÑOS CHICCO 100ML",
      "brand": "Chicco",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_2_458",
      "name": "COLONIA P/NIÑOS CHICCO 200ML",
      "brand": "Chicco",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_2_459",
      "name": "TALCO CHICO 100G",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TC"
    },
    {
      "id": "p_2_460",
      "name": "TALCO CHICCO",
      "brand": "Chicco",
      "sku": "",
      "status": "normal",
      "initials": "TC"
    },
    {
      "id": "p_2_461",
      "name": "HISOPOS AMY 60UND",
      "brand": "Amy",
      "sku": "",
      "status": "normal",
      "initials": "HA"
    },
    {
      "id": "p_2_462",
      "name": "COLONIA AMY 200ML",
      "brand": "Amy",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_2_463",
      "name": "LOCIÓN 200ML",
      "brand": "LOCIN",
      "sku": "",
      "status": "normal",
      "initials": "L2"
    },
    {
      "id": "p_2_464",
      "name": "CHAMPÚ AMY 200ML",
      "brand": "Amy",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_2_465",
      "name": "TALCO AMY 200G",
      "brand": "Amy",
      "sku": "",
      "status": "normal",
      "initials": "TA"
    },
    {
      "id": "p_2_466",
      "name": "COLONIA MELODY ROSADO 100ML",
      "brand": "Melody",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_2_467",
      "name": "COLONIA MELODY AZUL 100ML",
      "brand": "Melody",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_2_468",
      "name": "COLONIA MELODY AMARILLA 100ML",
      "brand": "Melody",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_2_469",
      "name": "COLONIA MELODY AMARILLA 200ML",
      "brand": "Melody",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_2_470",
      "name": "COLONIA MELODY AZUL 200ML",
      "brand": "Melody",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_2_471",
      "name": "TALCO P/PIES CARE STUDIO 142G",
      "brand": "TALCO",
      "sku": "",
      "status": "normal",
      "initials": "TP"
    },
    {
      "id": "p_2_472",
      "name": "CHAMPÚ EVERY N. PROTEINA CHISPPANTE 365ML",
      "brand": "CHAMP",
      "sku": "",
      "status": "normal",
      "initials": "CE"
    },
    {
      "id": "p_2_473",
      "name": "SHAMPOO UNO P/BEBES ROSADOS 500ML",
      "brand": "SHAMPOO",
      "sku": "",
      "status": "normal",
      "initials": "SU"
    },
    {
      "id": "p_2_474",
      "name": "SHAMPOO MIMADITOS 200ML",
      "brand": "Mimadito",
      "sku": "",
      "status": "normal",
      "initials": "SM"
    },
    {
      "id": "p_2_475",
      "name": "GEL DE BAÑO MIMADITO 200ML",
      "brand": "Mimadito",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_2_476",
      "name": "CREMA CORPORAL MIMADITOS 200ML",
      "brand": "Mimadito",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_2_477",
      "name": "SHAMPOO BABY CARE STUDIO 200ML",
      "brand": "SHAMPOO",
      "sku": "",
      "status": "normal",
      "initials": "SB"
    },
    {
      "id": "p_2_478",
      "name": "ACEITE P/BEBES CARE STUDIO 192ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_2_479",
      "name": "TINTE LOVIA 60ML RUBIO OSCURO N°3",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_480",
      "name": "TINTE LOVIA 60ML CASTAÑO ROJO N°9/1",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_481",
      "name": "TINTE LOVIA 60ML RUBIO COBRIZO N°6/4",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_482",
      "name": "TINTE LOVIA 60ML RUBIO MEDIO  N°6",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_483",
      "name": "TINTE LOVIA 60ML RUBIO MEDIO CLARO  N°7",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_484",
      "name": "TINTE LOVIA 60ML CASTAÑO MEDIO N°3",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_485",
      "name": "TINTE LOVIA 60ML CHOCOLATE  N°5/1",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_486",
      "name": "TINTE LOVIA 60ML CAPUCCINO N°6/30",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_487",
      "name": "TINTE LOVIA 60ML AVELLANA N°7/13",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_488",
      "name": "TINTE LOVIA 60ML PLATA  N°10",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_489",
      "name": "TINTE LOVIA 60ML CASTAÑO CLARO N°4",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_490",
      "name": "TINTE LOVIA 60ML RUBIO CENIZA N°7/1",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_491",
      "name": "TINTE LOVIA 60ML MIEL  N°5/02",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_492",
      "name": "TINTE LOVIA 60ML RUBIO DORADO N°8/1",
      "brand": "Lovia",
      "sku": "",
      "status": "normal",
      "initials": "TL"
    },
    {
      "id": "p_2_493",
      "name": "TINTE NEVADA 60ML RUBIO MEDIO N°7",
      "brand": "Nevada",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_494",
      "name": "TINTE NEVADA 60ML RUBIO DORADO  N°6/3",
      "brand": "Nevada",
      "sku": "",
      "status": "normal",
      "initials": "TN"
    },
    {
      "id": "p_2_495",
      "name": "TINTE DRENE 50ML NEGRO  N°1",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_2_496",
      "name": "TINTE DRENE 50ML CASTAÑO MEDIO N°4",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_2_497",
      "name": "TINTE DRENE 50ML RUBIO OSCURO N°6",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_2_498",
      "name": "TINTE DRENE 50ML RUBIO MEDIO N°7",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_2_499",
      "name": "TINTE DRENE 50MLRUBIO CLARO N°8",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_2_500",
      "name": "TINTE DRENE 50ML RUBIO M CLARO N°9",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_2_501",
      "name": "TINTE DRENE 50ML RUBIO E/CLARO N°10",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_2_502",
      "name": "TINTE DRENE 50MLRUBIO 0.ROJO INTENSO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_2_503",
      "name": "TINTE DRENE 50ML RUBIO M.VIOLETA",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_2_504",
      "name": "TINTE DRENE 50ML RUBIO M.MARRÓN INT",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_2_505",
      "name": "TINTE DRENE 50ML CASTAÑO CLARO",
      "brand": "Drene",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_2_506",
      "name": "TINTE MAXTON 50ML BORGOÑA",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_2_507",
      "name": "TINTE MAXTON 50ML CEREZA",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_2_508",
      "name": "TINTE FRANCHELL 100ML NEGRO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_509",
      "name": "TINTE FRANCHELL 100ML CASTAÑO OSCURO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_510",
      "name": "TINTE FRANCHELL 100ML RUBIO OSCURO INTENSO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_511",
      "name": "TINTE FRANCHELL 100ML RUBIO MEDIO INTENSO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_512",
      "name": "TINTE FRANCHELL 100ML RUBIO CLARO INTENSO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_513",
      "name": "TINTE FRANCHELL 100ML CIRUELO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_514",
      "name": "TINTE FRANCHELL 100ML CASTAÑO VIOLETA CALIDO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_515",
      "name": "TINTE FRANCHELL 100ML CASTAÑO CLARO INTENSO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_516",
      "name": "TINTE FRANCHELL 100ML CENIZA",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_517",
      "name": "TINTE FRANCHELL 100ML ROJO CLARO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_518",
      "name": "TINTE FRANCHELL 100ML ROJO OTOÑO INT",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_519",
      "name": "TINTE FRANCHELL 100ML ROJO OSCURO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_520",
      "name": "TINTE FRANCHELL 100ML CASTAÑO DORADO CLARO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_521",
      "name": "TINTE FRANCHELL 100ML RUBIO DORADO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_522",
      "name": "TINTE FRANCHELL 100ML RUBIO E/CLARO INTENSO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_523",
      "name": "TINTE FRANCHELL 100ML RUBIO CLARO CENIZO INTENSO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_524",
      "name": "TINTE FRANCHELL 100ML RUBIO OSCURO CENIZO INTENSO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_525",
      "name": "TINTE FRANCHELL 100ML ROJO ANARANJADO INTENSO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_526",
      "name": "TINTE FRANCHELL 100ML ROJO OTOÑO",
      "brand": "Franchell",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_2_527",
      "name": "TINTE SENSATIONS 50G RUBIO MEDIO NATURAL",
      "brand": "Sensations",
      "sku": "",
      "status": "normal",
      "initials": "TS"
    },
    {
      "id": "p_2_528",
      "name": "TINTE SENSATIONS 50G RUBIO MEDIO CENIZA",
      "brand": "Sensations",
      "sku": "",
      "status": "normal",
      "initials": "TS"
    },
    {
      "id": "p_2_529",
      "name": "TINTE SENSATIONS 50G ROJO COBRE",
      "brand": "Sensations",
      "sku": "",
      "status": "normal",
      "initials": "TS"
    },
    {
      "id": "p_2_530",
      "name": "TINTE SENSATIONS 50G RUBIO MEDIO COBRIZO",
      "brand": "Sensations",
      "sku": "",
      "status": "normal",
      "initials": "TS"
    },
    {
      "id": "p_2_531",
      "name": "TINTE SENSATIONS 50G RUBIO OSCURO N",
      "brand": "Sensations",
      "sku": "",
      "status": "normal",
      "initials": "TS"
    },
    {
      "id": "p_2_532",
      "name": "TINTE SENSATIONS 50G RUBIO OSCURO CENIZA",
      "brand": "Sensations",
      "sku": "",
      "status": "normal",
      "initials": "TS"
    },
    {
      "id": "p_2_533",
      "name": "TINTE SENSATIONS 50G NEGRO",
      "brand": "Sensations",
      "sku": "",
      "status": "normal",
      "initials": "TS"
    },
    {
      "id": "p_2_534",
      "name": "PAÑELES HUGGIES N/CARE P 30UND",
      "brand": "Huggies",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_535",
      "name": "PAÑALES HUGGIES TALLA O",
      "brand": "Huggies",
      "sku": "",
      "status": "normal",
      "initials": "PH"
    },
    {
      "id": "p_2_536",
      "name": "PAÑALES 3B PREMIUN XG 9UND",
      "brand": "3b",
      "sku": "",
      "status": "normal",
      "initials": "P3"
    },
    {
      "id": "p_2_537",
      "name": "PROTECTORES DIARIOS  ELLAS 180UND",
      "brand": "PROTECTORES",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_2_538",
      "name": "LOCIÓN MANOS Y CUERPO DG  NIACINAMIDA  400CM",
      "brand": "LOCIN",
      "sku": "",
      "status": "normal",
      "initials": "LM"
    },
    {
      "id": "p_2_539",
      "name": "DESODORANTE DOVE AEROSOL ORIGINAL 150ML",
      "brand": "Dove",
      "sku": "",
      "status": "normal",
      "initials": "DD"
    },
    {
      "id": "p_2_540",
      "name": "TINTE ILUMINIUS HELLAWELL 2.0 NEGRO",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_541",
      "name": "TINTE ILUMINIUS HELLAWELL CASTAÑO OSCURO",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_542",
      "name": "TINTE ILUMINIUS HELLAWELL CASTAÑO",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_543",
      "name": "TINTE ILUMINIUS HELLAWELL CASTAÑO CLARO",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_544",
      "name": "TINTE ILUMINIUS HELLAWELL RUBIO OSCURO",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_545",
      "name": "TINTE ILUMINIUS HELLAWELL RUBIO",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_546",
      "name": "TINTE ILUMINIUS HELLAWELL RUBIO CLARO",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_547",
      "name": "TINTE ILUMINIUS HELLAWELL RUBIO ULTRACLARO",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_548",
      "name": "TINTE ILUMINIUS HELLAWELL RUBIO ULTRAPERLA",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_549",
      "name": "TINTE ILUMINIUS HELLAWELL RUBIO 0 MARRON",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_550",
      "name": "TINTE ILUMINIUS HELLAWELL RUBIO MARRON CENIZA",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_551",
      "name": "TINTE ILUMINIUS HELLAWELL RUBIA C MARRON C",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_552",
      "name": "TINTE ILUMINIUS HELLAWELL MARRON INT. PERLA",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_553",
      "name": "TINTE ILUMINIUS HELLAWELL RUBIO COBRE CAOBA",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_554",
      "name": "TINTE ILUMINIUS HELLAWELL CASTAÑO COBRE ROJIZO",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_555",
      "name": "TINTE ILUMINIUS HELLAWELL RUBIO COBRE ROJIZO",
      "brand": "TINTE",
      "sku": "",
      "status": "normal",
      "initials": "TI"
    },
    {
      "id": "p_2_556",
      "name": "TINTE KOLESTON 50 GR TUBO NEGRO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_557",
      "name": "TINTE KOLESTON 50 GR TUBO NEGRO AZULADO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_558",
      "name": "TINTE KOLESTON 50 GR TUBO CASTAÑO OSCURO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_559",
      "name": "TINTE KOLESTON 50 GR TUBO CASTAÑO MEDIO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_560",
      "name": "TINTE KOLESTON 50 GR TUBO CASTAÑO CLARO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_561",
      "name": "TINTE KOLESTON 50 GR TUBO RUBIO OSCURO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_562",
      "name": "TINTE KOLESTON 50 GR RUBIOP EXTRA CLARO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_563",
      "name": "TINTE KOLESTON 50 GR CASTAÑO BAMB",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_564",
      "name": "TINTE KOLESTON 50 GR CHOCOLATE",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_565",
      "name": "TINTE KOLESTON 50 GR RUBIO CENIZA",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_566",
      "name": "TINTE KOLESTON 50 GR ROJO CEREZA",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_567",
      "name": "TINTE KOLESTON 50 GR KIT NEGRO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_568",
      "name": "TINTE KOLESTON 50 GR KIT CASTAÑO OSCURO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_569",
      "name": "TINTE KOLESTON 50 GR KIT CASTAÑO MEDIO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_570",
      "name": "TINTE KOLESTON 50 GR KITCHOCOLATE",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_571",
      "name": "TINTE KOLESTON 50 GR KIT CASTAÑO CLARO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_572",
      "name": "TINTE KOLESTON 50 GR KIT CASTAÑO BOMB",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_573",
      "name": "TINTE KOLESTON 50 GR KIT CASTAÑO ATERCIOPELADO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_574",
      "name": "TINTE KOLESTON 50 GR KIT CHOCOLATE OBSECION",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_575",
      "name": "TINTE KOLESTON 50 GR KIT ARMONIA",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_576",
      "name": "TINTE KOLESTON 50 GR KIT CAOBA COBRIZO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_577",
      "name": "TINTE KOLESTON 50 GR KIT RUBIO OSCURO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_578",
      "name": "TINTE KOLESTON 50 GR KIT RUBIO CENIZO OSCURO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_579",
      "name": "TINTE KOLESTON 50 GR KIT RUBIO MATE MEDIO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_580",
      "name": "TINTE KOLESTON 50 GR KIT RUBIO CENIZO CLARO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_581",
      "name": "TINTE KOLESTON 50 GR KIT RUBIO CENIZO EXTRA CLARO",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    },
    {
      "id": "p_2_582",
      "name": "TINTE KOLESTON 50 GR KIT RUBIO CLARO ESPECIAL",
      "brand": "Koleston",
      "sku": "",
      "status": "normal",
      "initials": "TK"
    }
  ],
  "3": [
    {
      "id": "p_3_1",
      "name": "LECHE SVELTY 400G",
      "brand": "Svelty",
      "sku": "",
      "status": "normal",
      "initials": "LS"
    },
    {
      "id": "p_3_2",
      "name": "LECHE EL TIO 900G",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LE"
    },
    {
      "id": "p_3_3",
      "name": "LECHE PARMALAT MAX 750G",
      "brand": "Parmalat",
      "sku": "",
      "status": "normal",
      "initials": "LP"
    },
    {
      "id": "p_3_4",
      "name": "LECHE SAN SIMON 900G",
      "brand": "San Simon",
      "sku": "",
      "status": "normal",
      "initials": "LS"
    },
    {
      "id": "p_3_5",
      "name": "LECHE MONTAÑA FRESCA 900G",
      "brand": "Montaña Fresca",
      "sku": "",
      "status": "normal",
      "initials": "LM"
    },
    {
      "id": "p_3_6",
      "name": "LECHE CAMPESTRE 900G",
      "brand": "Campestre",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_3_7",
      "name": "LECHE CAMPESTRE 400G",
      "brand": "Campestre",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_3_8",
      "name": "LECHE CAMPESTRE SEMI DESCRE. 400G",
      "brand": "Campestre",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_3_9",
      "name": "LECHE CAMPESTRE SEMI DESCRE. 900G",
      "brand": "Campestre",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_3_10",
      "name": "LECHE CAMPESTRE DESCREMADA 400G",
      "brand": "Campestre",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_3_11",
      "name": "LECHE CAMPESTRE DESCREMADA 900G",
      "brand": "Campestre",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_3_12",
      "name": "LECHE LA CAMPIÑA SEMI DESCRE. 900G",
      "brand": "La Campiña",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_3_13",
      "name": "LECHE LA CAMPESINA NUTRIRINDE 400G",
      "brand": "La Campesina",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_3_14",
      "name": "LECHE LOS ANDES 900G",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_3_15",
      "name": "LECHE LA CAMPESINA 400G",
      "brand": "La Campesina",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_3_16",
      "name": "LECHE NIDO DESLACTOSADA",
      "brand": "Nido",
      "sku": "",
      "status": "normal",
      "initials": "LN"
    },
    {
      "id": "p_3_17",
      "name": "CREMA  DE ARROZ 450G POTE PRIMOR",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_3_18",
      "name": "CREMA DE ARROZ 900G POTE PRIMOR",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_3_19",
      "name": "CREMA DE ARROZ 225G PRIMOR",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_3_20",
      "name": "CREMA DE ARROZ 450G PRIMOR",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_3_21",
      "name": "TODDY 400G POTE",
      "brand": "Toddy",
      "sku": "",
      "status": "normal",
      "initials": "T4"
    },
    {
      "id": "p_3_22",
      "name": "TODDY 200G POTE",
      "brand": "Toddy",
      "sku": "",
      "status": "normal",
      "initials": "T2"
    },
    {
      "id": "p_3_23",
      "name": "TODDY 400G",
      "brand": "Toddy",
      "sku": "",
      "status": "normal",
      "initials": "T4"
    },
    {
      "id": "p_3_24",
      "name": "TODDY 1KG",
      "brand": "Toddy",
      "sku": "",
      "status": "normal",
      "initials": "T1"
    },
    {
      "id": "p_3_25",
      "name": "TODDY 2KG",
      "brand": "Toddy",
      "sku": "",
      "status": "normal",
      "initials": "T2"
    },
    {
      "id": "p_3_26",
      "name": "CERELAC 400G",
      "brand": "Cerelac",
      "sku": "",
      "status": "normal",
      "initials": "C4"
    },
    {
      "id": "p_3_27",
      "name": "MERENGADA VAINILLA AGUA BLACA",
      "brand": "MERENGADA",
      "sku": "",
      "status": "normal",
      "initials": "MV"
    },
    {
      "id": "p_3_28",
      "name": "MERENGADA CHOCOLATE AGUA BLACA",
      "brand": "MERENGADA",
      "sku": "",
      "status": "normal",
      "initials": "MC"
    },
    {
      "id": "p_3_29",
      "name": "RIKA CHICHA 400G",
      "brand": "RIKA",
      "sku": "",
      "status": "normal",
      "initials": "RC"
    },
    {
      "id": "p_3_30",
      "name": "CREMA DE ARROZ AGUA BLANCA",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_3_31",
      "name": "AVENA PANTERA 200G",
      "brand": "Avena Pantera",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_3_32",
      "name": "AVENA PANTERA 400G",
      "brand": "Avena Pantera",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_3_33",
      "name": "AVENA PANTERA 800G",
      "brand": "Avena Pantera",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_3_34",
      "name": "HARINA DE AVENA QUAKER",
      "brand": "Quaker",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_3_35",
      "name": "AVENA QUAKER 200G",
      "brand": "Quaker",
      "sku": "",
      "status": "normal",
      "initials": "AQ"
    },
    {
      "id": "p_3_36",
      "name": "AVENA QUAKER 800G",
      "brand": "Quaker",
      "sku": "",
      "status": "normal",
      "initials": "AQ"
    },
    {
      "id": "p_3_37",
      "name": "AVENA ROBIN HOOD 400G",
      "brand": "Robin Hood",
      "sku": "",
      "status": "normal",
      "initials": "AR"
    },
    {
      "id": "p_3_38",
      "name": "AVENA ROBIN HOOD 800G",
      "brand": "Robin Hood",
      "sku": "",
      "status": "normal",
      "initials": "AR"
    },
    {
      "id": "p_3_39",
      "name": "AVENA ALVARIGUA 400G",
      "brand": "Alvarigua",
      "sku": "",
      "status": "normal",
      "initials": "AA"
    },
    {
      "id": "p_3_40",
      "name": "AVENA EL MOLINO 400G",
      "brand": "El Molino",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_3_41",
      "name": "FORORO C/ CANELA LA ECONOMICA 400G",
      "brand": "La Economica",
      "sku": "",
      "status": "normal",
      "initials": "FC"
    },
    {
      "id": "p_3_42",
      "name": "FORORO C/ CANELA LA ECONOMICA 700G",
      "brand": "La Economica",
      "sku": "",
      "status": "normal",
      "initials": "FC"
    },
    {
      "id": "p_3_43",
      "name": "FORORO NATURAL LA ECONOMICA 400G",
      "brand": "La Economica",
      "sku": "",
      "status": "normal",
      "initials": "FN"
    },
    {
      "id": "p_3_44",
      "name": "FORORO CON CANELA EL MOLINO 500G",
      "brand": "El Molino",
      "sku": "",
      "status": "normal",
      "initials": "FC"
    },
    {
      "id": "p_3_45",
      "name": "FORORO MI GOCHITA 400G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "FM"
    },
    {
      "id": "p_3_46",
      "name": "FORORO MI GOCHITA 800G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "FM"
    },
    {
      "id": "p_3_47",
      "name": "FORORO CARIAKITO",
      "brand": "Cariakito",
      "sku": "",
      "status": "normal",
      "initials": "FC"
    },
    {
      "id": "p_3_48",
      "name": "MAIZINA AMERICANA 800G",
      "brand": "Maizina Americana",
      "sku": "",
      "status": "normal",
      "initials": "MA"
    },
    {
      "id": "p_3_49",
      "name": "MAIZINA AMERICANA 400G",
      "brand": "Maizina Americana",
      "sku": "",
      "status": "normal",
      "initials": "MA"
    },
    {
      "id": "p_3_50",
      "name": "ENDULZANTE SPLENDA 25G",
      "brand": "Splenda",
      "sku": "",
      "status": "normal",
      "initials": "ES"
    },
    {
      "id": "p_3_51",
      "name": "ENDULZANTE SPLENDA 50G",
      "brand": "Splenda",
      "sku": "",
      "status": "normal",
      "initials": "ES"
    },
    {
      "id": "p_3_52",
      "name": "ENDULZANTE SPLENDA 100G",
      "brand": "Splenda",
      "sku": "",
      "status": "normal",
      "initials": "ES"
    },
    {
      "id": "p_3_53",
      "name": "COMPOTA GERBER PERA",
      "brand": "Gerber",
      "sku": "",
      "status": "normal",
      "initials": "CG"
    },
    {
      "id": "p_3_54",
      "name": "COMPOTA TIGO FRUTA MIXTA",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "CT"
    },
    {
      "id": "p_3_55",
      "name": "COMPOTA TIGO MANZANA",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "CT"
    },
    {
      "id": "p_3_56",
      "name": "COMPOTA HEINZ FRUTAS TROPICALES",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "CH"
    },
    {
      "id": "p_3_57",
      "name": "COMPOTA HEINZ MELOCOTON",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "CH"
    },
    {
      "id": "p_3_58",
      "name": "COMPOTA HEINZ PERA",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "CH"
    },
    {
      "id": "p_3_59",
      "name": "COMPOTA POLLY BANANA",
      "brand": "Polly",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_3_60",
      "name": "COMPOTA POLLY MELOCOTON",
      "brand": "Polly",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_3_61",
      "name": "COMPOTA NATULAC PERA 113G",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "CN"
    },
    {
      "id": "p_3_62",
      "name": "COMPOTA NATULAC PERA 186G",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "CN"
    },
    {
      "id": "p_3_63",
      "name": "COMPOTA NATULAC DURAZNO 186G",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "CN"
    },
    {
      "id": "p_3_64",
      "name": "COMPOTA NATULAC MANZANA 186G",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "CN"
    },
    {
      "id": "p_3_65",
      "name": "COMPOTA NATULAC MANZANA 113G",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "CN"
    },
    {
      "id": "p_3_66",
      "name": "COMPOTA SOBRE TIGO MANZANA",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_67",
      "name": "COMPOTA SOBRE TIGO PERA",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_68",
      "name": "COMPOTA SOBRE TIGO FRUTAS MIXTAS",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_69",
      "name": "COMPOTA S/ OSOLE MANZANA AVENA",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_70",
      "name": "COMPOTAS S/OSOLE MANZANA FRESA Y PERA",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_71",
      "name": "COMPOTA SOBRE OSOLE PERA",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_72",
      "name": "COMPOTA SOBRE OSOLE DURAZNO",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_73",
      "name": "COMPOTA SOBRE OSOLE BANANA",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_74",
      "name": "COMPOTA SOBRE OSOLE FRUTAS MIXTAS",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_75",
      "name": "COMPOTA SOBRE OSOLE MANZANA",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_76",
      "name": "COMPOTA SOBRE HEINZ MANZANA",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_77",
      "name": "COMPOTA SOBRE HEINZ PERA",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_78",
      "name": "COMPOTA SOBRE HEINZ FRUTAS MIXTAS",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_79",
      "name": "COMPOTA SOBRE HEINZ MELOCOTON",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_80",
      "name": "COMPOTA SOBRE HEINZ BANANA",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_81",
      "name": "NESTEA DURAZNO 90G",
      "brand": "Nestea",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_3_82",
      "name": "NESTEA 240G LIMÓN",
      "brand": "Nestea",
      "sku": "",
      "status": "normal",
      "initials": "N2"
    },
    {
      "id": "p_3_83",
      "name": "NESTEA LIMÓN 90G",
      "brand": "Nestea",
      "sku": "",
      "status": "normal",
      "initials": "NL"
    },
    {
      "id": "p_3_84",
      "name": "BOKA FRESA",
      "brand": "Boka",
      "sku": "",
      "status": "normal",
      "initials": "BF"
    },
    {
      "id": "p_3_85",
      "name": "BOKA TAMARINDO",
      "brand": "Boka",
      "sku": "",
      "status": "normal",
      "initials": "BT"
    },
    {
      "id": "p_3_86",
      "name": "BOKA GUANABANA",
      "brand": "Boka",
      "sku": "",
      "status": "normal",
      "initials": "BG"
    },
    {
      "id": "p_3_87",
      "name": "BOKA MARACUYA",
      "brand": "Boka",
      "sku": "",
      "status": "normal",
      "initials": "BM"
    },
    {
      "id": "p_3_88",
      "name": "BOKA PANELA CON LIMÓN",
      "brand": "Boka",
      "sku": "",
      "status": "normal",
      "initials": "BP"
    },
    {
      "id": "p_3_89",
      "name": "PANELADA",
      "brand": "Panelada",
      "sku": "",
      "status": "normal",
      "initials": "PA"
    },
    {
      "id": "p_3_90",
      "name": "CARAMELO RIKATO",
      "brand": "Rikato",
      "sku": "",
      "status": "normal",
      "initials": "CR"
    },
    {
      "id": "p_3_91",
      "name": "TRULULU 50UND",
      "brand": "Trululu",
      "sku": "",
      "status": "normal",
      "initials": "T5"
    },
    {
      "id": "p_3_92",
      "name": "CARAMELO LOKIÑO",
      "brand": "Lokiño",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_3_93",
      "name": "CHUPETA GOX BOOM",
      "brand": "Gox Boom",
      "sku": "",
      "status": "normal",
      "initials": "CG"
    },
    {
      "id": "p_3_94",
      "name": "CARAMELO LIKIÑO",
      "brand": "Likiño",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_3_95",
      "name": "CARAMELO CHAO",
      "brand": "CARAMELO",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_3_96",
      "name": "CARAMELO MENTA HELADA",
      "brand": "CARAMELO",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_3_97",
      "name": "BIANCHI CHOCOLATE BLANCO",
      "brand": "Bianchi",
      "sku": "",
      "status": "normal",
      "initials": "BC"
    },
    {
      "id": "p_3_98",
      "name": "BIANCHI CHOCOLATE",
      "brand": "Bianchi",
      "sku": "",
      "status": "normal",
      "initials": "BC"
    },
    {
      "id": "p_3_99",
      "name": "CARAMELO SURTIDO",
      "brand": "CARAMELO",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_3_100",
      "name": "TANG MARACUYA",
      "brand": "Tang",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_3_101",
      "name": "CARAMELO CHAO XTREME",
      "brand": "CARAMELO",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_3_102",
      "name": "CHOCO BALL",
      "brand": "Choco Ball",
      "sku": "",
      "status": "normal",
      "initials": "CB"
    },
    {
      "id": "p_3_103",
      "name": "GALLETA MUU",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_104",
      "name": "CARAMELO FRUTICAS",
      "brand": "Frutica",
      "sku": "",
      "status": "normal",
      "initials": "CF"
    },
    {
      "id": "p_3_105",
      "name": "OREO TUBO 96G  AMERICANA",
      "brand": "Oreo",
      "sku": "",
      "status": "normal",
      "initials": "OT"
    },
    {
      "id": "p_3_106",
      "name": "OREO TUBO 96G CHOCOLATE",
      "brand": "Oreo",
      "sku": "",
      "status": "normal",
      "initials": "OT"
    },
    {
      "id": "p_3_107",
      "name": "OREO TUBO 96G VAINILLA",
      "brand": "Oreo",
      "sku": "",
      "status": "normal",
      "initials": "OT"
    },
    {
      "id": "p_3_108",
      "name": "OREO FUDGE",
      "brand": "Oreo",
      "sku": "",
      "status": "normal",
      "initials": "OF"
    },
    {
      "id": "p_3_109",
      "name": "GALLETAS MINI CHIPS",
      "brand": "Mini Chips",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_110",
      "name": "SORBETICOS VAINILLA FAMILIAR",
      "brand": "Sorbeticos",
      "sku": "",
      "status": "normal",
      "initials": "SV"
    },
    {
      "id": "p_3_111",
      "name": "SORBETICOS FRESA FAMILIAR",
      "brand": "Sorbeticos",
      "sku": "",
      "status": "normal",
      "initials": "SF"
    },
    {
      "id": "p_3_112",
      "name": "SORBETICOS FRESA LONCHERA",
      "brand": "Sorbeticos",
      "sku": "",
      "status": "normal",
      "initials": "SF"
    },
    {
      "id": "p_3_113",
      "name": "OREO AMERICANA 6UND",
      "brand": "Oreo",
      "sku": "",
      "status": "normal",
      "initials": "OA"
    },
    {
      "id": "p_3_114",
      "name": "OREO CHOCOLATE 6UND",
      "brand": "Oreo",
      "sku": "",
      "status": "normal",
      "initials": "OC"
    },
    {
      "id": "p_3_115",
      "name": "OREO VAINILLA 6UND",
      "brand": "Oreo",
      "sku": "",
      "status": "normal",
      "initials": "OV"
    },
    {
      "id": "p_3_116",
      "name": "GALLETA CLUB SOCIAL ORIGINAL",
      "brand": "Club Social",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_3_117",
      "name": "GALLETA CLUB SOCIAL INTEGRAL",
      "brand": "Club Social",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_3_118",
      "name": "GALLETA BELVITA KRAKER",
      "brand": "Belvita",
      "sku": "",
      "status": "normal",
      "initials": "GB"
    },
    {
      "id": "p_3_119",
      "name": "GALLETA BELVITA HONEY",
      "brand": "Belvita",
      "sku": "",
      "status": "normal",
      "initials": "GB"
    },
    {
      "id": "p_3_120",
      "name": "GALLETA DE SODA PREMIUN",
      "brand": "Soda Premiun",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_3_121",
      "name": "GALLETA  SALTITACO",
      "brand": "Saltitaco",
      "sku": "",
      "status": "normal",
      "initials": "GS"
    },
    {
      "id": "p_3_122",
      "name": "PIRULIN 300G",
      "brand": "Pirulin",
      "sku": "",
      "status": "normal",
      "initials": "P3"
    },
    {
      "id": "p_3_123",
      "name": "PIRULIN 155G",
      "brand": "Pirulin",
      "sku": "",
      "status": "normal",
      "initials": "P1"
    },
    {
      "id": "p_3_124",
      "name": "CEREAL KELLOGGS CORN FLAKES 250G",
      "brand": "Kelloggs",
      "sku": "",
      "status": "normal",
      "initials": "CK"
    },
    {
      "id": "p_3_125",
      "name": "CEREAL KELLOGGS CORN POP 250G",
      "brand": "Kelloggs",
      "sku": "",
      "status": "normal",
      "initials": "CK"
    },
    {
      "id": "p_3_126",
      "name": "CEREAL KELLOGGS CHOCO ZUCARITA 250G",
      "brand": "Kelloggs",
      "sku": "",
      "status": "normal",
      "initials": "CK"
    },
    {
      "id": "p_3_127",
      "name": "CEREAL KELLOGGS ZUCARITA",
      "brand": "Kelloggs",
      "sku": "",
      "status": "normal",
      "initials": "CK"
    },
    {
      "id": "p_3_128",
      "name": "GALLETA DE SODA PUIG",
      "brand": "Puig",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_3_129",
      "name": "GALLETA DE SODA INTEGRAL PUIG",
      "brand": "Puig",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_3_130",
      "name": "GALLETA DE SODA EL SOL PUIG",
      "brand": "Puig",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_3_131",
      "name": "GALLETA FESTIVAL VAINILLA 12UND",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_3_132",
      "name": "GALLETA CHOCO FUDGE TRIGO DE ORO",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_3_133",
      "name": "GALLETA MARIA TENTACIONE NARANJA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_134",
      "name": "GALLETA TENTACIONE SIN AZUCAR",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GT"
    },
    {
      "id": "p_3_135",
      "name": "GALLETA MARIA TENTACIONE CHOCOLATE",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_136",
      "name": "GALLETA MARIA TENTACIONE",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_137",
      "name": "GALLETA COOKY CHIPS PUIG",
      "brand": "Puig",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_3_138",
      "name": "GALLETA CHOCO CHIPS TRIGO DE ORO",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_3_139",
      "name": "GALLETA MARILU VAINILLA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_140",
      "name": "GALLETA CHOCO CRUNCH",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_3_141",
      "name": "GALLETA COOKIES",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_3_142",
      "name": "GALLETA MARIA LA PAMPA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_143",
      "name": "GALLETA DE SODA MANTEQUILLA LA PAMPA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_3_144",
      "name": "GALLETA DE SODA CON SAL LA PAMPA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GD"
    },
    {
      "id": "p_3_145",
      "name": "GALLETA MARILU VAINILLA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_146",
      "name": "GALLETA MARILU FRESA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_147",
      "name": "GALLETA MARILU CHOCOLATE",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_148",
      "name": "GALLETA MARILU CHOCO VAINILLA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_149",
      "name": "GALLETA MARIA CALEDONIA SIN AZUCAR",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_150",
      "name": "GALLETA MARIA CALEDONIA LIMÓN",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_151",
      "name": "GALLETA MARIA CALEDONIA CACAO",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_152",
      "name": "GALLETA MARIA CALEDONIA CANELA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_153",
      "name": "GALLETA MARIA CALEDONIA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_154",
      "name": "GALLETA CHARMY BOMBON",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_3_155",
      "name": "GALLETA CHARMY MOKA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_3_156",
      "name": "GALLETA CHARMY VAINILLA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_3_157",
      "name": "GALLETA CHARMY FRESA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_3_158",
      "name": "GALLETA MARIA INDEPENDENCIA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_3_159",
      "name": "GALLETA PEGADA INDEPENDENCIA",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GP"
    },
    {
      "id": "p_3_160",
      "name": "GALLETA TIP TOP MANI  96G",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GT"
    },
    {
      "id": "p_3_161",
      "name": "GALLETA TIP TOP VAINILLA 96G",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GT"
    },
    {
      "id": "p_3_162",
      "name": "GALLETA TIP TOP COCO  96G",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GT"
    },
    {
      "id": "p_3_163",
      "name": "GALLETA TIP TOP CHOCOLATE  96G",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GT"
    },
    {
      "id": "p_3_164",
      "name": "GALLETA TIP TOP CHOCOMANI 96G",
      "brand": "GALLETA",
      "sku": "",
      "status": "normal",
      "initials": "GT"
    },
    {
      "id": "p_3_165",
      "name": "PEPITO BOLI KRUNCH XXL",
      "brand": "PEPITO",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_3_166",
      "name": "AROS DE HARINA C/ CEBOLLA RINGOS XXL",
      "brand": "Ringo",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_3_167",
      "name": "PLATANITO CRUTISSIMO 270G",
      "brand": "PLATANITO",
      "sku": "",
      "status": "normal",
      "initials": "PC"
    },
    {
      "id": "p_3_168",
      "name": "PAPAS DE QUESO CRUTISSIMO 115G",
      "brand": "PAPAS",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_3_169",
      "name": "PAPAS BBQ CRUTISSIMO 115G",
      "brand": "PAPAS",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_3_170",
      "name": "TOCINETAS ORIGINAL MUNCHY 40G",
      "brand": "TOCINETAS",
      "sku": "",
      "status": "normal",
      "initials": "TO"
    },
    {
      "id": "p_3_171",
      "name": "TRIPLE PLAY 200G XXL",
      "brand": "TRIPLE",
      "sku": "",
      "status": "normal",
      "initials": "TP"
    },
    {
      "id": "p_3_172",
      "name": "CHEESE TRIS 450G",
      "brand": "CHEESE",
      "sku": "",
      "status": "normal",
      "initials": "CT"
    },
    {
      "id": "p_3_173",
      "name": "AROS DE HARINA C/CEBOLLA RINGOS 62G",
      "brand": "Ringo",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_3_174",
      "name": "TOSTONES SALSERITOS 80G",
      "brand": "TOSTONES",
      "sku": "",
      "status": "normal",
      "initials": "TS"
    },
    {
      "id": "p_3_175",
      "name": "ISELELITAS PLATANO CHIPS CON SAL 85G",
      "brand": "ISELELITAS",
      "sku": "",
      "status": "normal",
      "initials": "IP"
    },
    {
      "id": "p_3_176",
      "name": "ISELITAS PLATANO CHIPS LIMÓN 85G",
      "brand": "ISELITAS",
      "sku": "",
      "status": "normal",
      "initials": "IP"
    },
    {
      "id": "p_3_177",
      "name": "ISELITA YUCA CHIPS LIMÓN 70G",
      "brand": "ISELITA",
      "sku": "",
      "status": "normal",
      "initials": "IY"
    },
    {
      "id": "p_3_178",
      "name": "ISELITA YUCA CHIPS CEBOLLA 70G",
      "brand": "ISELITA",
      "sku": "",
      "status": "normal",
      "initials": "IY"
    },
    {
      "id": "p_3_179",
      "name": "SALSERITO PALITOS DE QUESO 18G",
      "brand": "SALSERITO",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_3_180",
      "name": "SALSERITO PALITOS DE QUESO 75G",
      "brand": "SALSERITO",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_3_181",
      "name": "PEPITO KESITOS 85G",
      "brand": "PEPITO",
      "sku": "",
      "status": "normal",
      "initials": "PK"
    },
    {
      "id": "p_3_182",
      "name": "PEPITO BOLI KRUNCH 85G",
      "brand": "PEPITO",
      "sku": "",
      "status": "normal",
      "initials": "PB"
    },
    {
      "id": "p_3_183",
      "name": "CHIS KESITOS 145G",
      "brand": "CHIS",
      "sku": "",
      "status": "normal",
      "initials": "CK"
    },
    {
      "id": "p_3_184",
      "name": "DORITO DINAMITA 150G",
      "brand": "DORITO",
      "sku": "",
      "status": "normal",
      "initials": "DD"
    },
    {
      "id": "p_3_185",
      "name": "PALITOS DE MAIZ TOM 60G",
      "brand": "PALITOS",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_3_186",
      "name": "AROS DE CEBOLLA TOM 50G",
      "brand": "AROS",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_3_187",
      "name": "TOSTONES CON SAL TOM 140G",
      "brand": "TOSTONES",
      "sku": "",
      "status": "normal",
      "initials": "TC"
    },
    {
      "id": "p_3_188",
      "name": "ISELITA YUCA CHIPS CON SAL 70G",
      "brand": "ISELITA",
      "sku": "",
      "status": "normal",
      "initials": "IY"
    },
    {
      "id": "p_3_189",
      "name": "TOSTONES SALSERITOS 270G",
      "brand": "TOSTONES",
      "sku": "",
      "status": "normal",
      "initials": "TS"
    },
    {
      "id": "p_3_190",
      "name": "TOCINETA PICANTE MUNCHY 40G",
      "brand": "TOCINETA",
      "sku": "",
      "status": "normal",
      "initials": "TP"
    },
    {
      "id": "p_3_191",
      "name": "CHIS KESITOS TOCINETA PICANTE",
      "brand": "CHIS",
      "sku": "",
      "status": "normal",
      "initials": "CK"
    },
    {
      "id": "p_3_192",
      "name": "TRIPLE PLAY",
      "brand": "TRIPLE",
      "sku": "",
      "status": "normal",
      "initials": "TP"
    },
    {
      "id": "p_3_193",
      "name": "ISELITAS MIX YUCA, PLATANO Y MADURITO 220G",
      "brand": "ISELITAS",
      "sku": "",
      "status": "normal",
      "initials": "IM"
    },
    {
      "id": "p_3_194",
      "name": "PEPITO PEDRITO 40G",
      "brand": "PEPITO",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_3_195",
      "name": "GALLETAS SALTI NOEL 5 TACO",
      "brand": "GALLETAS",
      "sku": "",
      "status": "normal",
      "initials": "GS"
    }
  ],
  "4": [
    {
      "id": "p_4_1",
      "name": "ADOBO MAGGI POTE",
      "brand": "ADOBO",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_4_2",
      "name": "SAZONATODO MAGGI POTE",
      "brand": "SAZONATODO",
      "sku": "",
      "status": "normal",
      "initials": "SM"
    },
    {
      "id": "p_4_3",
      "name": "SOPA DE ARROZ CON POLLLO MAGGI",
      "brand": "SOPA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_4_4",
      "name": "SOPA CASERA POLLO MAGGI",
      "brand": "SOPA",
      "sku": "",
      "status": "normal",
      "initials": "SC"
    },
    {
      "id": "p_4_5",
      "name": "SOPA CRUZADO DE POLLO MAGGI",
      "brand": "SOPA",
      "sku": "",
      "status": "normal",
      "initials": "SC"
    },
    {
      "id": "p_4_6",
      "name": "SAZONADOR ARROZ CON POLLO MAGGI",
      "brand": "SAZONADOR",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_4_7",
      "name": "CREMA DE CHAMPIÑONES MAGGI",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_4_8",
      "name": "SOPA DE POLLO CON FIDEOS MAGGI",
      "brand": "SOPA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_4_9",
      "name": "BASE SALSA BECHAMEL MAGGI",
      "brand": "BASE",
      "sku": "",
      "status": "normal",
      "initials": "BS"
    },
    {
      "id": "p_4_10",
      "name": "CUBITO MAGGI  ARROZ CON POLLO 8UND",
      "brand": "CUBITO",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_4_11",
      "name": "CUBITO MAGGI POLLO 12UND",
      "brand": "CUBITO",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_4_12",
      "name": "CUBITO MAGGI POLLO 8UND",
      "brand": "CUBITO",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_4_13",
      "name": "SOPA DE POLLO CON ARROZ IBERIA",
      "brand": "SOPA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_4_14",
      "name": "ALIÑO DEL CAMPO 500G",
      "brand": "ALIO",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_4_15",
      "name": "ALIÑO DEL CAMPO 200G",
      "brand": "ALIO",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_4_16",
      "name": "ADOBO DE CAMPO 200G",
      "brand": "ADOBO",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_4_17",
      "name": "ADOBO DEL CAMPO 490G",
      "brand": "ADOBO",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_4_18",
      "name": "ADOBO DEL CAMPO 190G",
      "brand": "ADOBO",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_4_19",
      "name": "ADOBO MONTE BLANCO",
      "brand": "ADOBO",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_4_20",
      "name": "ADOBO PRIMALCA",
      "brand": "ADOBO",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_4_21",
      "name": "ADOBO HEDA",
      "brand": "ADOBO",
      "sku": "",
      "status": "normal",
      "initials": "AH"
    },
    {
      "id": "p_4_22",
      "name": "ADOBO LA CHINA",
      "brand": "ADOBO",
      "sku": "",
      "status": "normal",
      "initials": "AL"
    },
    {
      "id": "p_4_23",
      "name": "OREGANO IBERIA",
      "brand": "OREGANO",
      "sku": "",
      "status": "normal",
      "initials": "OI"
    },
    {
      "id": "p_4_24",
      "name": "CANELA IBERIA",
      "brand": "CANELA",
      "sku": "",
      "status": "normal",
      "initials": "CI"
    },
    {
      "id": "p_4_25",
      "name": "JENJIBRE IBERIA",
      "brand": "JENJIBRE",
      "sku": "",
      "status": "normal",
      "initials": "JI"
    },
    {
      "id": "p_4_26",
      "name": "ALIÑO MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_4_27",
      "name": "AJO EN PASTA MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_4_28",
      "name": "OREGANO MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "OM"
    },
    {
      "id": "p_4_29",
      "name": "CANELA MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_4_30",
      "name": "ADOBO MI GOCHIA",
      "brand": "ADOBO",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_4_31",
      "name": "MANZANILLA MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_4_32",
      "name": "PEREJIL MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_4_33",
      "name": "CALDO MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_4_34",
      "name": "CARMENCITA MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_4_35",
      "name": "MALAGUETA MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_4_36",
      "name": "COMINO MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_4_37",
      "name": "AL GRILL DE CARNE MC CORMICK",
      "brand": "AL",
      "sku": "",
      "status": "normal",
      "initials": "AG"
    },
    {
      "id": "p_4_38",
      "name": "AJO MOLIDO  MC CORMICK",
      "brand": "AJO",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_4_39",
      "name": "OREGANO ENTERO  MC CORMICK",
      "brand": "OREGANO",
      "sku": "",
      "status": "normal",
      "initials": "OE"
    },
    {
      "id": "p_4_40",
      "name": "OREGANO MOLIDO  MC CORMICK",
      "brand": "OREGANO",
      "sku": "",
      "status": "normal",
      "initials": "OM"
    },
    {
      "id": "p_4_41",
      "name": "ALL GRILL DE POLLO MC CORMICK",
      "brand": "ALL",
      "sku": "",
      "status": "normal",
      "initials": "AG"
    },
    {
      "id": "p_4_42",
      "name": "CANELA MC CORMICK",
      "brand": "CANELA",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_4_43",
      "name": "CEBOLLA MOLIDA MC CORMICK",
      "brand": "CEBOLLA",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_4_44",
      "name": "PALMITO ENTEROS MARY",
      "brand": "PALMITO",
      "sku": "",
      "status": "normal",
      "initials": "PE"
    },
    {
      "id": "p_4_45",
      "name": "SALSA PASSATA FRITZ",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_4_46",
      "name": "SALSA HIERBA FINA OSOLE",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "SH"
    },
    {
      "id": "p_4_47",
      "name": "SALSA PIZZA OSOLE",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_4_48",
      "name": "SALSA ALBAHACA OSOLE",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_4_49",
      "name": "SALSA ACEITUNAS OSOLE",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_4_50",
      "name": "SALSA MEDITERRANEA OSOLE",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "SM"
    },
    {
      "id": "p_4_51",
      "name": "SALSA AL VODKA",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_4_52",
      "name": "SALSA CARNE ESMECHADA OSOLE",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "SC"
    },
    {
      "id": "p_4_53",
      "name": "SALSA KETCHUP LA PAMPA 320G",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SK"
    },
    {
      "id": "p_4_54",
      "name": "SALSA KETCHUT LA PAMPA 200G",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SK"
    },
    {
      "id": "p_4_55",
      "name": "PASTA SINDONI VERMICHELLI 1KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PS"
    },
    {
      "id": "p_4_56",
      "name": "PASTA SINDONI VERMICHELLI 500G",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PS"
    },
    {
      "id": "p_4_57",
      "name": "PASTA SINDONI DINTALI 1KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PS"
    },
    {
      "id": "p_4_58",
      "name": "PASTA SINDONI PLUMA 1KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PS"
    },
    {
      "id": "p_4_59",
      "name": "PASTA SINDONI TORNILLO 1KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PS"
    },
    {
      "id": "p_4_60",
      "name": "PASTA SINDONI MACARRONES 500G",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PS"
    },
    {
      "id": "p_4_61",
      "name": "PASTA  MARY TORNILLO SUPERIOR 500G",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_4_62",
      "name": "PASTA  MARY MACARRON PREMIUM 500G",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_4_63",
      "name": "PASTA  MARY DEDAL PREMIUN 500G",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_4_64",
      "name": "PASTA  MARY LINGUINI PREMIUN 500G",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_4_65",
      "name": "PASTA  MARY VERMICHELLI SUPER.500G",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_4_66",
      "name": "PASTA MARY VERMICELLI TRADICIONAL,1 KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_4_67",
      "name": "PASTA CODOS HORIZONTE 1 KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PC"
    },
    {
      "id": "p_4_68",
      "name": "PASTA TUBITO LISO HORIZONTE 1 KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PT"
    },
    {
      "id": "p_4_69",
      "name": "PASTA TORNILLO HORIZONTE 1 KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PT"
    },
    {
      "id": "p_4_70",
      "name": "PASTA ESPIRALES ALLEGRI 1 KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PE"
    },
    {
      "id": "p_4_71",
      "name": "PASTA CODOS ALLEGRI 1 KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PC"
    },
    {
      "id": "p_4_72",
      "name": "PASTA PLUMITA ALLEGRI 1 KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_4_73",
      "name": "PASTA TORNILLO ALLEGRI 1 KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PT"
    },
    {
      "id": "p_4_74",
      "name": "PASTA TUBITO LISO ALLEGRI 1 KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PT"
    },
    {
      "id": "p_4_75",
      "name": "FIDEO EXPRESS GALLINA RENATA 85 GR",
      "brand": "FIDEO",
      "sku": "",
      "status": "normal",
      "initials": "FE"
    },
    {
      "id": "p_4_76",
      "name": "FIDEO EXPRESS CARNE RENATA 85 GR",
      "brand": "FIDEO",
      "sku": "",
      "status": "normal",
      "initials": "FE"
    },
    {
      "id": "p_4_77",
      "name": "FIDEO EXPRESS VEGETALES RENATA 85 GR",
      "brand": "FIDEO",
      "sku": "",
      "status": "normal",
      "initials": "FE"
    },
    {
      "id": "p_4_78",
      "name": "PASTA CAPRI DEDAL 500 GR 3 VEGETALES",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PC"
    },
    {
      "id": "p_4_79",
      "name": "PASTA CAPRI DEDAL EXTRA ESPECIAL 1 KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PC"
    },
    {
      "id": "p_4_80",
      "name": "PASTA 3 VEGETAL CAPRI TORNILLO 500 GR",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "P3"
    },
    {
      "id": "p_4_81",
      "name": "PASTA CAPRI RUEDA 3 VEGETALES 500 GR",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PC"
    },
    {
      "id": "p_4_82",
      "name": "PASTA DELLA NONNA PREMIUN DEDAL, 1 KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_4_83",
      "name": "PASTA DELLA NONNA PREMIUN TORNILLO 1 KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_4_84",
      "name": "PASTA DELLA NONNA PREMIUN VERMICELLI 1 KG",
      "brand": "PASTA",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_4_85",
      "name": "PASTA PRIMOR PLUMITA EXTRA ESPECIAL 1 KG",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_4_86",
      "name": "PASTA PRIMOR DEDAL EXTRA ESPECIAL 1 KG",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_4_87",
      "name": "PASTA PRIMOR TORNILLO EXTRA ESPECIAL 1 KG",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_4_88",
      "name": "PASTA PRIMOR VERMICELLI EXTRA ESPECIAL 1 KG",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_4_89",
      "name": "PASTA PRIMOR DEDAL 1 KG",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_4_90",
      "name": "PASTA PRIMOR TORNILLO 1 KG",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_4_91",
      "name": "PASTA PRIMOR VERMICELLI 1 KG",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_4_92",
      "name": "PASTA PRIMOR LINGUINI 1 KG",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_4_93",
      "name": "PASTA PRIMOR VERMICELLI 500 GR",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_4_94",
      "name": "PASTA PRIMOR DEDAL 500 GR",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "PP"
    },
    {
      "id": "p_4_95",
      "name": "PASTICHO RONCO",
      "brand": "PASTICHO",
      "sku": "",
      "status": "normal",
      "initials": "PR"
    },
    {
      "id": "p_4_96",
      "name": "PASTICHO SINDONI",
      "brand": "PASTICHO",
      "sku": "",
      "status": "normal",
      "initials": "PS"
    },
    {
      "id": "p_4_97",
      "name": "MAYONESA MAVESA 910 GR",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_4_98",
      "name": "MAYONESA MAVESA 175 GR",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_4_99",
      "name": "MAYONESA MAVESA 445 GR",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_4_100",
      "name": "MAYONESA AMERICANA 910 GR",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MA"
    },
    {
      "id": "p_4_101",
      "name": "MAYONESA AMERICANA 175 GR",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MA"
    },
    {
      "id": "p_4_102",
      "name": "MAYONESA AMERICANA 445 GR",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MA"
    },
    {
      "id": "p_4_103",
      "name": "MAYONESA D”BERACAH 200 GR",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MD"
    },
    {
      "id": "p_4_104",
      "name": "MAYONESA D”BERACAH 445 GR",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MD"
    },
    {
      "id": "p_4_105",
      "name": "MAYONESA KRAFT 445 GR",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MK"
    },
    {
      "id": "p_4_106",
      "name": "MAYONESA KRAFT 175 GR",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MK"
    },
    {
      "id": "p_4_107",
      "name": "MAYONESA LA PAMPA 460 GR",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "ML"
    },
    {
      "id": "p_4_108",
      "name": "MAYONESA LA PAMPA 175 GR",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "ML"
    },
    {
      "id": "p_4_109",
      "name": "MAYONESA OLE 340 GR",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MO"
    },
    {
      "id": "p_4_110",
      "name": "PURE DE TOMATE MARY",
      "brand": "PURE",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_4_111",
      "name": "PASTA DE TOMATE TIGO",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_4_112",
      "name": "TOMATE TRITURADO LA FRAGUA",
      "brand": "TOMATE",
      "sku": "",
      "status": "normal",
      "initials": "TT"
    },
    {
      "id": "p_4_113",
      "name": "QUESO FUNDIDO DALVITO 200 GR",
      "brand": "QUESO",
      "sku": "",
      "status": "normal",
      "initials": "QF"
    },
    {
      "id": "p_4_114",
      "name": "TWISTI QUESO",
      "brand": "TWISTI",
      "sku": "",
      "status": "normal",
      "initials": "TQ"
    },
    {
      "id": "p_4_115",
      "name": "QUESO FUNDIDO RIKESA 200 GR",
      "brand": "QUESO",
      "sku": "",
      "status": "normal",
      "initials": "QF"
    },
    {
      "id": "p_4_116",
      "name": "QUESO FUNDIDO RIKESA 300 GR",
      "brand": "QUESO",
      "sku": "",
      "status": "normal",
      "initials": "QF"
    },
    {
      "id": "p_4_117",
      "name": "QUESO FUNDIDO RIKESA TOCINETA 200 GR",
      "brand": "QUESO",
      "sku": "",
      "status": "normal",
      "initials": "QF"
    },
    {
      "id": "p_4_118",
      "name": "QUESO FUNDIDO RIKESA 330 GR",
      "brand": "QUESO",
      "sku": "",
      "status": "normal",
      "initials": "QF"
    },
    {
      "id": "p_4_119",
      "name": "DIABLITO UNDER WOOD 115 GR",
      "brand": "DIABLITO",
      "sku": "",
      "status": "normal",
      "initials": "DU"
    },
    {
      "id": "p_4_120",
      "name": "DIABLITO UNDER WOOD 50 GR ABRE FACIL",
      "brand": "DIABLITO",
      "sku": "",
      "status": "normal",
      "initials": "DU"
    },
    {
      "id": "p_4_121",
      "name": "JAMON ENDIABLADO PLUMROSE 110 GR",
      "brand": "JAMON",
      "sku": "",
      "status": "normal",
      "initials": "JE"
    },
    {
      "id": "p_4_122",
      "name": "JAMON ENDIABLADO PLUMROSE 60 GR",
      "brand": "SperSamn",
      "sku": "",
      "status": "normal",
      "initials": "JE"
    },
    {
      "id": "p_4_123",
      "name": "SALSA AHUMADITA FRITZ",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_4_124",
      "name": "SALSA BBQ MC CORMICK",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SB"
    },
    {
      "id": "p_4_125",
      "name": "SALSA MOSTAZA MIEL MC CORMICK",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SM"
    },
    {
      "id": "p_4_126",
      "name": "SALSA AGRIDULCE MC CORMICK",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_4_127",
      "name": "MOSTAZA MIEL FRITZ",
      "brand": "MOSTAZA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_4_128",
      "name": "TARTARA FRITZ",
      "brand": "TARTARA",
      "sku": "",
      "status": "normal",
      "initials": "TF"
    },
    {
      "id": "p_4_129",
      "name": "SALSA DE MIEL LA CHINA",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_4_130",
      "name": "MEZCLA PARA SALSA TOCINETA FRITZ",
      "brand": "MEZCLA",
      "sku": "",
      "status": "normal",
      "initials": "MP"
    },
    {
      "id": "p_4_131",
      "name": "MEZCLA PARA SALSA AJO Y PEREJIL FRITZ",
      "brand": "MEZCLA",
      "sku": "",
      "status": "normal",
      "initials": "MP"
    },
    {
      "id": "p_4_132",
      "name": "MEZCLA PARA SALSA CHEDDAR FRITZ",
      "brand": "MEZCLA",
      "sku": "",
      "status": "normal",
      "initials": "MP"
    },
    {
      "id": "p_4_133",
      "name": "MEZCLA PARA SALSA MAIZ FRITZ",
      "brand": "MEZCLA",
      "sku": "",
      "status": "normal",
      "initials": "MP"
    },
    {
      "id": "p_4_134",
      "name": "PAPAS RALLADAS FRITZ",
      "brand": "PAPAS",
      "sku": "",
      "status": "normal",
      "initials": "PR"
    },
    {
      "id": "p_4_135",
      "name": "MOSTAZA MC CORMICK 185 GR",
      "brand": "MOSTAZA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_4_136",
      "name": "MOSTAZA OSOLE",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "MO"
    },
    {
      "id": "p_4_137",
      "name": "MOSTAZA HEINZ 195 GR",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "MH"
    },
    {
      "id": "p_4_138",
      "name": "MOSTAZA HEINZ 490 GR",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "MH"
    },
    {
      "id": "p_4_139",
      "name": "MOSTAZA MI GOCHITA 500 GR",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_4_140",
      "name": "MOSTAZA MI GOCHITA 190 GR",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_4_141",
      "name": "MOSTAZA DEL CAMPO 200 GR",
      "brand": "MOSTAZA",
      "sku": "",
      "status": "normal",
      "initials": "MD"
    },
    {
      "id": "p_4_142",
      "name": "MOSTAZA DEL CAMPO 500 GR",
      "brand": "MOSTAZA",
      "sku": "",
      "status": "normal",
      "initials": "MD"
    },
    {
      "id": "p_4_143",
      "name": "SALSA FRESCARINI BOLOGNESA 190 GR",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SF"
    },
    {
      "id": "p_4_144",
      "name": "SALSA FRESCARINI BOLOGNESA 490 GR",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SF"
    },
    {
      "id": "p_4_145",
      "name": "SALSA FRESCARINI PIZZA 190 GR",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SF"
    },
    {
      "id": "p_4_146",
      "name": "SALSA FRESCARINI PIZZA 490 GR",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SF"
    },
    {
      "id": "p_4_147",
      "name": "SALSA SINDONI NAPOLITANA 490 GR",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SS"
    },
    {
      "id": "p_4_148",
      "name": "SALSA SINDONI PASSATA 490 GR",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SS"
    },
    {
      "id": "p_4_149",
      "name": "SALSA UNDER WOOD NAPOLITANA 490 GR",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SU"
    },
    {
      "id": "p_4_150",
      "name": "SALSA UNDER WOOD NAPOLITANA 190 GR",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SU"
    },
    {
      "id": "p_4_151",
      "name": "SALSA UNDER WOOD BOLOGNESA 490 GR",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SU"
    },
    {
      "id": "p_4_152",
      "name": "SALSA UNDER WOOD BOLOGNESA 190 GR",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SU"
    },
    {
      "id": "p_4_153",
      "name": "KETCHUP FRITZ 397 GR",
      "brand": "KETCHUP",
      "sku": "",
      "status": "normal",
      "initials": "KF"
    },
    {
      "id": "p_4_154",
      "name": "KETCHUP KIERO 198 GR",
      "brand": "KETCHUP",
      "sku": "",
      "status": "normal",
      "initials": "KK"
    },
    {
      "id": "p_4_155",
      "name": "KETCHUP UNDER WOOD 397 GR",
      "brand": "KETCHUP",
      "sku": "",
      "status": "normal",
      "initials": "KU"
    },
    {
      "id": "p_4_156",
      "name": "KETCHUP CON DIABLITO UNDER WOOD 397 GR",
      "brand": "KETCHUP",
      "sku": "",
      "status": "normal",
      "initials": "KC"
    },
    {
      "id": "p_4_157",
      "name": "KETCHUP CON IBERIA 397 GR",
      "brand": "KETCHUP",
      "sku": "",
      "status": "normal",
      "initials": "KC"
    },
    {
      "id": "p_4_158",
      "name": "SALSA 57 HEINZ 378 GR",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "S5"
    },
    {
      "id": "p_4_159",
      "name": "SALSA 57 HEINZ 194 GR",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "S5"
    },
    {
      "id": "p_4_160",
      "name": "SALSA DE TOMATE HEINZ 378 GR",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_4_161",
      "name": "SALSA DE TOMATE HEINZ 198 GR",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_4_162",
      "name": "SALSA BBQ HEINZ 397 GR",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "SB"
    },
    {
      "id": "p_4_163",
      "name": "SALSA DE TOMATE PAMPERO 198 GR",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_4_164",
      "name": "SALSA DE TOMATE PAMPERO 397 GR",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_4_165",
      "name": "SALSA DE TOMATE PAMPERO 4.2 KG",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    }
  ],
  "5": [
    {
      "id": "p_5_1",
      "name": "HARINA DE TRIGO MARY TODO USO 900 GR",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_5_2",
      "name": "HARINA DE TRIGO MARY LEUDANTE 900 GR",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_5_3",
      "name": "HARINA DE TRIGO DOÑA MARA LEUDANTE",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_5_4",
      "name": "HARINA DE TRIGO DOÑA MARA TODO USO",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_5_5",
      "name": "HARINA DE TRIGO SINDONI",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_5_6",
      "name": "HARINA DE TRIGO LA PAMPA LEUDANTE 500 GR",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_5_7",
      "name": "HARINA DE TRIGO LA PAMPA TODO USO 500 GR",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_5_8",
      "name": "HARINA DE TRIGO LA PAMPA LEUDANTE 920 GR",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_5_9",
      "name": "HARINA DE TRIGO LA PAMPA TODO USO 920 GR",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_5_10",
      "name": "MARGARINA MAVESA 500 GR",
      "brand": "MARGARINA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_5_11",
      "name": "MARGARINA MAVESA 250 GR",
      "brand": "MARGARINA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_5_12",
      "name": "MARGARINA MAVESA 1 KG",
      "brand": "MARGARINA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_5_13",
      "name": "MARGARINA MAVESA LIGERA 500 GR",
      "brand": "MARGARINA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_5_14",
      "name": "MARGARINA NELLY 250 GR",
      "brand": "MARGARINA",
      "sku": "",
      "status": "normal",
      "initials": "MN"
    },
    {
      "id": "p_5_15",
      "name": "MARGARINA NELLY 500 GR",
      "brand": "MARGARINA",
      "sku": "",
      "status": "normal",
      "initials": "MN"
    },
    {
      "id": "p_5_16",
      "name": "MARGARINA MIRASOL 227 GR",
      "brand": "MARGARINA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_5_17",
      "name": "MARGARINA MIRASOL 454 GR",
      "brand": "MARGARINA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_5_18",
      "name": "MARAGARINA LA PAMPA 225 GR",
      "brand": "MARAGARINA",
      "sku": "",
      "status": "normal",
      "initials": "ML"
    },
    {
      "id": "p_5_19",
      "name": "LECHE LIQ. CAMPESTRE BOLSA 1 LT",
      "brand": "Campestre",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_5_20",
      "name": "LECHE LIQ. LA PASTOREÑA DESCREMADA DESLACTOSADA",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_5_21",
      "name": "LECHE LIQ. LA PASTOREÑA DESCREMADA",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_5_22",
      "name": "LECHE LIQ. LA PASTOREÑA COMPLETA",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_5_23",
      "name": "LECHE LIQ. CARABOBO DESCREMADA",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_5_24",
      "name": "LECHE LIQ. CARABOBO DESCREMADA DESLACTOSADA",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_5_25",
      "name": "LECHE LIQ. CARABOBO COMPLETA",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_5_26",
      "name": "LECHE LIQ. PARMALAT COMPLETA",
      "brand": "Parmalat",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_5_27",
      "name": "LECHE LIQ. PARMALAT DESCREMADA",
      "brand": "Parmalat",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_5_28",
      "name": "UVAS PASAS 200 GR MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "UP"
    },
    {
      "id": "p_5_29",
      "name": "UVAS PASAS 100 GR MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "UP"
    },
    {
      "id": "p_5_30",
      "name": "BEBIDA CLIGHT SABORES VARIOS",
      "brand": "BEBIDA",
      "sku": "",
      "status": "normal",
      "initials": "BC"
    },
    {
      "id": "p_5_31",
      "name": "GELATINA KIERO FRESA",
      "brand": "GELATINA",
      "sku": "",
      "status": "normal",
      "initials": "GK"
    },
    {
      "id": "p_5_32",
      "name": "GELATINA KIERO CEREZA",
      "brand": "GELATINA",
      "sku": "",
      "status": "normal",
      "initials": "GK"
    },
    {
      "id": "p_5_33",
      "name": "GELATINA KIERO KOLITA",
      "brand": "GELATINA",
      "sku": "",
      "status": "normal",
      "initials": "GK"
    },
    {
      "id": "p_5_34",
      "name": "GELATINA KIERO MANZANA",
      "brand": "GELATINA",
      "sku": "",
      "status": "normal",
      "initials": "GK"
    },
    {
      "id": "p_5_35",
      "name": "GELATINA KIERO NARANJA",
      "brand": "GELATINA",
      "sku": "",
      "status": "normal",
      "initials": "GK"
    },
    {
      "id": "p_5_36",
      "name": "GELATINA KIERO UVA",
      "brand": "GELATINA",
      "sku": "",
      "status": "normal",
      "initials": "GK"
    },
    {
      "id": "p_5_37",
      "name": "GELATINA SONRISSA LIMON 132 GR",
      "brand": "GELATINA",
      "sku": "",
      "status": "normal",
      "initials": "GS"
    },
    {
      "id": "p_5_38",
      "name": "GELATINA SONRISSA 66 GR",
      "brand": "GELATINA",
      "sku": "",
      "status": "normal",
      "initials": "GS"
    },
    {
      "id": "p_5_39",
      "name": "FLAN SONRISSA 46 GR",
      "brand": "FLAN",
      "sku": "",
      "status": "normal",
      "initials": "FS"
    },
    {
      "id": "p_5_40",
      "name": "PUDIN MONTALBAN FRESA",
      "brand": "PUDIN",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_5_41",
      "name": "PUDIN MONTALBAN VAINILLA",
      "brand": "PUDIN",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_5_42",
      "name": "PUDIN MONTALBAN CHOCOLATE",
      "brand": "PUDIN",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_5_43",
      "name": "CHOCOLATE OSCURO 40% SAVOY",
      "brand": "CHOCOLATE",
      "sku": "",
      "status": "normal",
      "initials": "CO"
    },
    {
      "id": "p_5_44",
      "name": "CHOCOLATE OSCURO 55% SAVOY",
      "brand": "CHOCOLATE",
      "sku": "",
      "status": "normal",
      "initials": "CO"
    },
    {
      "id": "p_5_45",
      "name": "MIEL FLORANDINA 460 GR",
      "brand": "MIEL",
      "sku": "",
      "status": "normal",
      "initials": "MF"
    },
    {
      "id": "p_5_46",
      "name": "MIEL FLORANDINA 180 GR",
      "brand": "MIEL",
      "sku": "",
      "status": "normal",
      "initials": "MF"
    },
    {
      "id": "p_5_47",
      "name": "JARABE MIEL EUCALIPTO",
      "brand": "JARABE",
      "sku": "",
      "status": "normal",
      "initials": "JM"
    },
    {
      "id": "p_5_48",
      "name": "JARABE MIEL JENGIBRE",
      "brand": "JARABE",
      "sku": "",
      "status": "normal",
      "initials": "JM"
    },
    {
      "id": "p_5_49",
      "name": "JARABE MIEL MALOJILLO",
      "brand": "JARABE",
      "sku": "",
      "status": "normal",
      "initials": "JM"
    },
    {
      "id": "p_5_50",
      "name": "LEVADURA INSTANT SUCCESS 500 GR",
      "brand": "LEVADURA",
      "sku": "",
      "status": "normal",
      "initials": "LI"
    },
    {
      "id": "p_5_51",
      "name": "VAINILLA TASTY 450 ML",
      "brand": "VAINILLA",
      "sku": "",
      "status": "normal",
      "initials": "VT"
    },
    {
      "id": "p_5_52",
      "name": "VAINILLA TASTY 212 ML",
      "brand": "VAINILLA",
      "sku": "",
      "status": "normal",
      "initials": "VT"
    },
    {
      "id": "p_5_53",
      "name": "VAINILLA VANICOL 250 ML",
      "brand": "VAINILLA",
      "sku": "",
      "status": "normal",
      "initials": "VV"
    },
    {
      "id": "p_5_54",
      "name": "LECHE CONDENSADA NESTLE",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_5_55",
      "name": "CREMA PARA COCINAR MASTER TOP",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_5_56",
      "name": "LECHE CONDENSADA NATULAC",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_5_57",
      "name": "CREMA DE LECHE LA PARISIENNE",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_5_58",
      "name": "LECHE CONDENSADA CONDYLAC",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_5_59",
      "name": "LECHE CONDENSADA MAITA",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_5_60",
      "name": "LECHE CONDENSADA  WEPA",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_5_61",
      "name": "LECHE CONDENSADA PARMALAT",
      "brand": "Parmalat",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_5_62",
      "name": "AZUCAR GLASS MONTALBAN 500 GR",
      "brand": "AZUCAR",
      "sku": "",
      "status": "normal",
      "initials": "AG"
    },
    {
      "id": "p_5_63",
      "name": "CREMA CHANTILLY 200 GR",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_5_64",
      "name": "CREMA CHANTILLY 400 GR",
      "brand": "CREMA",
      "sku": "",
      "status": "normal",
      "initials": "CC"
    },
    {
      "id": "p_5_65",
      "name": "MEZCLA PARA TORTA TIGO VAINILLA",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "MP"
    },
    {
      "id": "p_5_66",
      "name": "AZUCAR ALVARIGUA 800 GR",
      "brand": "Alvarigua",
      "sku": "",
      "status": "normal",
      "initials": "AA"
    },
    {
      "id": "p_5_67",
      "name": "AZUCAR ALVARIGUA 1 KG",
      "brand": "Alvarigua",
      "sku": "",
      "status": "normal",
      "initials": "AA"
    },
    {
      "id": "p_5_68",
      "name": "AZUCAR LA PASTORA 1 KG",
      "brand": "AZUCAR",
      "sku": "",
      "status": "normal",
      "initials": "AL"
    },
    {
      "id": "p_5_69",
      "name": "AZUCAR AURORA 1 KG",
      "brand": "AZUCAR",
      "sku": "",
      "status": "normal",
      "initials": "AA"
    },
    {
      "id": "p_5_70",
      "name": "AZUCAR KONFIT 1 KG",
      "brand": "AZUCAR",
      "sku": "",
      "status": "normal",
      "initials": "AK"
    },
    {
      "id": "p_5_71",
      "name": "AZUCAR MONTALBAN 1 KG",
      "brand": "AZUCAR",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_5_72",
      "name": "AZUCAR MORENA MONTALBAN 1 KG Q",
      "brand": "AZUCAR",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    }
  ],
  "6": [
    {
      "id": "p_6_1",
      "name": "NESCAFE GOLD 100G",
      "brand": "NESCAFE",
      "sku": "",
      "status": "normal",
      "initials": "NG"
    },
    {
      "id": "p_6_2",
      "name": "NESCAFE GOLD 200G",
      "brand": "NESCAFE",
      "sku": "",
      "status": "normal",
      "initials": "NG"
    },
    {
      "id": "p_6_3",
      "name": "NESCAFE CON LECHE 300",
      "brand": "NESCAFE",
      "sku": "",
      "status": "normal",
      "initials": "NC"
    },
    {
      "id": "p_6_4",
      "name": "NESCAFE TRADICIONAL 170G",
      "brand": "NESCAFE",
      "sku": "",
      "status": "normal",
      "initials": "NT"
    },
    {
      "id": "p_6_5",
      "name": "NESCAFE TRADICIONA 85G",
      "brand": "NESCAFE",
      "sku": "",
      "status": "normal",
      "initials": "NT"
    },
    {
      "id": "p_6_6",
      "name": "CAFÉ LA PROTECTORA 200G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_6_7",
      "name": "CAFÉ LA PROTECTORA 250G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_6_8",
      "name": "CAFÉ LA PROTECTORA 500G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_6_9",
      "name": "CAFÉ LOS ANDES 175G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_6_10",
      "name": "CAFÉ LOS ANDES 200G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_6_11",
      "name": "CAFÉ LOS ANDES 500G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_6_12",
      "name": "CAFÉ DE LA NONNA 200G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_6_13",
      "name": "CAFÉ DE LA NONNA 500G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_6_14",
      "name": "CAFÉ AMANECER 500G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_6_15",
      "name": "CAFÉ AMANECER 100G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_6_16",
      "name": "CAFÉ ANZOATEGUI 200G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_6_17",
      "name": "CAFÉ ALVARIGUA 500G",
      "brand": "Alvarigua",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_6_18",
      "name": "CAFÉ ALVARIGUA 200G",
      "brand": "Alvarigua",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_6_19",
      "name": "CAFÉ ANZOATEGUI 500G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_6_20",
      "name": "CAFÉ ANZOATEGUI 200G DESCAFEINADO",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_6_21",
      "name": "CAFÉ BUEN CAFÉ 200G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CB"
    },
    {
      "id": "p_6_22",
      "name": "CAFÉ BUEN CAFÉ 500G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CB"
    },
    {
      "id": "p_6_23",
      "name": "CAFÉ BUEN CAFÉ 100G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CB"
    },
    {
      "id": "p_6_24",
      "name": "VERO CAFÉ 100G",
      "brand": "VERO",
      "sku": "",
      "status": "normal",
      "initials": "VC"
    },
    {
      "id": "p_6_25",
      "name": "VERO CAFÉ 200G",
      "brand": "VERO",
      "sku": "",
      "status": "normal",
      "initials": "VC"
    },
    {
      "id": "p_6_26",
      "name": "CAFÉ AURORA 200",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_6_27",
      "name": "CAFÉ AURORA 500G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_6_28",
      "name": "CAFÉ GRANO DE ORO 200G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CG"
    },
    {
      "id": "p_6_29",
      "name": "CAFÉ GRANO DE ORO 250G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CG"
    },
    {
      "id": "p_6_30",
      "name": "CAFÉ GRANO DE ORO 500G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CG"
    },
    {
      "id": "p_6_31",
      "name": "CAFÉ FAVORITO 200G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CF"
    },
    {
      "id": "p_6_32",
      "name": "CAFÉ PARAISO 200G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_6_33",
      "name": "CAFÉ PARAISO 500G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_6_34",
      "name": "TE MC CORMICK FRUTOS ROJOS X10",
      "brand": "TE",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_6_35",
      "name": "TE MC CORMICK FRUTOS DEL BOSQUE X10",
      "brand": "TE",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_6_36",
      "name": "TE MC CORMICK FRUTOS DEL BOSQUE X20",
      "brand": "TE",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_6_37",
      "name": "TE MC CORMICK NEGRO X10",
      "brand": "TE",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_6_38",
      "name": "TE MC CORMICK ROSA JAMAICA X20",
      "brand": "TE",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_6_39",
      "name": "TE MC CORMICK LIMÓN Y MIEL X20",
      "brand": "TE",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_6_40",
      "name": "TE MC CORMICK MALOJILLO 20UND",
      "brand": "TE",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_6_41",
      "name": "TE MC CORMICK CURCUMA 20UND",
      "brand": "TE",
      "sku": "",
      "status": "normal",
      "initials": "TM"
    },
    {
      "id": "p_6_42",
      "name": "ARROZ PANTERA 900G",
      "brand": "ARROZ",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_6_43",
      "name": "ARROZ AURORA 900G",
      "brand": "ARROZ",
      "sku": "",
      "status": "normal",
      "initials": "AA"
    },
    {
      "id": "p_6_44",
      "name": "ARROZ AGUA BLANCA DIAMANTE 900G",
      "brand": "ARROZ",
      "sku": "",
      "status": "normal",
      "initials": "AA"
    },
    {
      "id": "p_6_45",
      "name": "ARROZ AGUA BLANCA 1KG",
      "brand": "ARROZ",
      "sku": "",
      "status": "normal",
      "initials": "AA"
    },
    {
      "id": "p_6_46",
      "name": "ARROZ MONICA 900G",
      "brand": "ARROZ",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_6_47",
      "name": "ARROZ GRAN MARQUEZ 1KG",
      "brand": "ARROZ",
      "sku": "",
      "status": "normal",
      "initials": "AG"
    },
    {
      "id": "p_6_48",
      "name": "ARROZ MARY MOÑITO 900G",
      "brand": "ARROZ",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_6_49",
      "name": "ARROZ MARY ESMERALDA 900G",
      "brand": "ARROZ",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_6_50",
      "name": "ARROZ MARY TRADICIONAL 900G",
      "brand": "ARROZ",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_6_51",
      "name": "ARROZ MARY SUPERIOR 900G",
      "brand": "ARROZ",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_6_52",
      "name": "ARROZ MARY INTEGRAL 900G",
      "brand": "ARROZ",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_6_53",
      "name": "ARROZ PRIMOR SUPERIOR 900G",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_6_54",
      "name": "ARROZ PRIMOR TRADICIONAL 900G",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_6_55",
      "name": "ARROZ PRIMOR PERLADO 900G",
      "brand": "Primor",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_6_56",
      "name": "ARROZ ALVARIGUA 900G",
      "brand": "Alvarigua",
      "sku": "",
      "status": "normal",
      "initials": "AA"
    },
    {
      "id": "p_6_57",
      "name": "HARINA DE MAIZ JUANA 900G",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_6_58",
      "name": "HARINA DE MAIZ JUANA 1KG",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_6_59",
      "name": "HARINA DE MAIZ PANTERA 900G",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_6_60",
      "name": "HARINA DE MAIZ MARY 2KG",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_6_61",
      "name": "HARINA DE MAIZ MARY 900G",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_6_62",
      "name": "HARINA DE MAIZ KALY 1KG",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_6_63",
      "name": "HARINA DE MAIZ AMARILLA KALY 1KG",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_6_64",
      "name": "HARINA DE MAIZ PAN CON ARROZ 1KG",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_6_65",
      "name": "HARINA DE MAIZ PAN AMARILLA",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_6_66",
      "name": "HARINA DE MAIZ PAN TRADICIONAL",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_6_67",
      "name": "CAFÉ LA CIMA 200G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    }
  ],
  "7": [
    {
      "id": "p_7_1",
      "name": "SALSA INGLESA HEINZ 150ML",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_2",
      "name": "SALSA INGLESA HEINZ 300ML",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_3",
      "name": "SALSA DE AJO HEINZ 150ML",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_4",
      "name": "SALSA DE AJO HEINZ 300ML",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_5",
      "name": "ACEITUNA VERDE ENTERA OSOLE 240G",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "AV"
    },
    {
      "id": "p_7_6",
      "name": "ACEITUNA VERDE RODAJA OSOLE 240G",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "AV"
    },
    {
      "id": "p_7_7",
      "name": "ACEITUNA VERDE RELLENA OSOLE 240G",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "AV"
    },
    {
      "id": "p_7_8",
      "name": "ACEITUNA VERDE  RELLENA OSOLE 340G",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "AV"
    },
    {
      "id": "p_7_9",
      "name": "SARDINA EN ACEITE CAYUCO 170G",
      "brand": "SARDINA",
      "sku": "",
      "status": "normal",
      "initials": "SE"
    },
    {
      "id": "p_7_10",
      "name": "SARDINA EN S/DE TOMATE CAYUCO 170G",
      "brand": "SARDINA",
      "sku": "",
      "status": "normal",
      "initials": "SE"
    },
    {
      "id": "p_7_11",
      "name": "SARDINA LOS ROQUES 170G",
      "brand": "SARDINA",
      "sku": "",
      "status": "normal",
      "initials": "SL"
    },
    {
      "id": "p_7_12",
      "name": "SARDINA TIGO EN ACEITE 170G",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "ST"
    },
    {
      "id": "p_7_13",
      "name": "SARDINA TIGO EN S/DE TOMATE 170G",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "ST"
    },
    {
      "id": "p_7_14",
      "name": "SARDINA TIGO AL NATURAL 170G",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "ST"
    },
    {
      "id": "p_7_15",
      "name": "SARDINA ALVARIGUA EN ACEITE 170G",
      "brand": "Alvarigua",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_7_16",
      "name": "SARDINA ALVARIGUA EN S/TOMATE 170G",
      "brand": "Alvarigua",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_7_17",
      "name": "SARDINA VIZMAR NATURAL 170G",
      "brand": "SARDINA",
      "sku": "",
      "status": "normal",
      "initials": "SV"
    },
    {
      "id": "p_7_18",
      "name": "SARDINA VIZMAR ENS/DE TOMATE 170G",
      "brand": "SARDINA",
      "sku": "",
      "status": "normal",
      "initials": "SV"
    },
    {
      "id": "p_7_19",
      "name": "SARDINA VIVALDI EN S/DE TOMATE 170G",
      "brand": "SARDINA",
      "sku": "",
      "status": "normal",
      "initials": "SV"
    },
    {
      "id": "p_7_20",
      "name": "ATUN EN ACEITE ALVARIGUA 98G",
      "brand": "Alvarigua",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_21",
      "name": "ATUN BJ ENTERO EN ACEITE 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AB"
    },
    {
      "id": "p_7_22",
      "name": "ATUN TIGO EN ACEITE 160G",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "AT"
    },
    {
      "id": "p_7_23",
      "name": "ATUN BEEN EN ACEITE 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AB"
    },
    {
      "id": "p_7_24",
      "name": "ATUN WILLENGER EN ACEITE 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AW"
    },
    {
      "id": "p_7_25",
      "name": "ATUN EN AGUA OCEAN 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_26",
      "name": "ATUN EN AGUA VIVALDI 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_27",
      "name": "ATUN EN AGUA BUBBA 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_28",
      "name": "ATUN EN ACEITE BUBBA 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_29",
      "name": "ATUN EN AGUA LA FRAGUA  170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_30",
      "name": "ATUN EN ACEITE LA FRAGUA 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_31",
      "name": "ATUN SECRETOS DE LA ABUELA NATURAL 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AS"
    },
    {
      "id": "p_7_32",
      "name": "ATUN SECRETOS D ELA ABUELA EN ACEITE 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AS"
    },
    {
      "id": "p_7_33",
      "name": "ATUN EVEBA EN AGUA 140G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_34",
      "name": "ATUN EVEBA EN AGUA 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_35",
      "name": "ATUN EVEBA EN ACEITE 140G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_36",
      "name": "ATUN EVEBA EN ACEITE 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_37",
      "name": "ATUN CALIFORNIA EN ACEITE 140",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AC"
    },
    {
      "id": "p_7_38",
      "name": "ATUN NATURAL MARGARITA 140G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AN"
    },
    {
      "id": "p_7_39",
      "name": "ATUN NATURAL MARGARITA 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AN"
    },
    {
      "id": "p_7_40",
      "name": "ENCURTIDO MI GOCHITA 500G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "EM"
    },
    {
      "id": "p_7_41",
      "name": "COMBO DE SALSA MI GOCHITA 150ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_7_42",
      "name": "SALSA DE SOYA LA MARACUCHITA 150ML",
      "brand": "Hit",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_43",
      "name": "SALSA DE SOYA LA MARACUCHITA 300ML",
      "brand": "Hit",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_44",
      "name": "SALSA INGLESA LA MARACUCHITA 150ML",
      "brand": "Hit",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_45",
      "name": "SALSA INGLESA LA MARACUCHITA 300ML",
      "brand": "Hit",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_46",
      "name": "COMBO DE SALSA LA MARACUCHITA 150ML",
      "brand": "Hit",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_7_47",
      "name": "COMBO DE SALSA LA MARACUCHITA 300ML",
      "brand": "Hit",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_7_48",
      "name": "SALSA DE SOYA GALÓN LA MARACUCHITA",
      "brand": "Hit",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_49",
      "name": "SALSA DE AJO GALÓN LA MARACUCHITA",
      "brand": "Hit",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_50",
      "name": "SALSA INGLESA GALÓN LA MARACUCHITA",
      "brand": "Hit",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_51",
      "name": "SALSA DE SOYA MC CORMICK 150ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_52",
      "name": "SALSA DE SOYA MC CORMICK 300ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_53",
      "name": "SALSA INGLESA MC CORMICK 150ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_54",
      "name": "SALSA INGLESA MC CORMICK 300ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_55",
      "name": "SALSA AJO MC CORMICK 150ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_7_56",
      "name": "SALSA AJO MC CORMICK 300ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_7_57",
      "name": "SALSA AJO MIX MC CORMICK 150ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_7_58",
      "name": "SALSA VINO BLANCO MC CORMICK 150ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SV"
    },
    {
      "id": "p_7_59",
      "name": "SALSA VINO BLANCO MC CORMICK 300ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SV"
    },
    {
      "id": "p_7_60",
      "name": "SALSA VINO TINTO MC CORMICK 150ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SV"
    },
    {
      "id": "p_7_61",
      "name": "SALSA VINO TINTO MC CORMICK 300ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SV"
    },
    {
      "id": "p_7_62",
      "name": "SALSA DE SOYA AJOLISTO 150ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_63",
      "name": "SALSA DE SOYA AJOLISTO 300ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_64",
      "name": "SALSA INGLESA AJOLISTO 150ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_65",
      "name": "SALSA INGLESA AJOLISTO 350ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_66",
      "name": "SALSA DE AJO AJOLISTO 150ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_67",
      "name": "SALSA DE AJO AJOLISTO 300ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_68",
      "name": "SALSA DE AJO LA CHINA 150ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_69",
      "name": "SALSA DE AJO LA CHINA 300ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_70",
      "name": "SALSA INGLESA LA CHINA 150ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_71",
      "name": "SALSA INGLESA LA CHINA 300ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_72",
      "name": "SALSA DE SOYA  LA CHINA 150ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_73",
      "name": "SALSA DE SOYA LA CHINA 300ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_74",
      "name": "SALSA DE SOYA HEINZ 150ML",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_75",
      "name": "SALSA DE SOYA HEINZ 300ML",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_76",
      "name": "ACEITE DE OLIVA MARY 500ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_77",
      "name": "ACEITE DE OLIVA MARY  750ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_78",
      "name": "ACEITE DE OLIVA JANNAT AL JAVAL 1L",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_79",
      "name": "ACEITE DE OLIVA CARBONEL 500ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_80",
      "name": "ACEITE DE OLIVA ALFUNSA 250ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_81",
      "name": "ACEITE DE OLIVA DIANA 250ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_82",
      "name": "ACEITE DE COCO 200ML COCOPLUS",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_83",
      "name": "ACEITE DE COCO 440ML COCOPLUS",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_84",
      "name": "ACEITE DE COCO LA FRAGUA 500ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_85",
      "name": "ACEITE DE COCO LA FRAGUA 170ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_86",
      "name": "ACEITE DE SOYA BERACA 900ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_87",
      "name": "ACEITE VEGETAL LA VIUDA 900ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AV"
    },
    {
      "id": "p_7_88",
      "name": "ACEITE LA COMADRE 800ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AL"
    },
    {
      "id": "p_7_89",
      "name": "ACEITE AMANECER 800ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AA"
    },
    {
      "id": "p_7_90",
      "name": "ACEITE NATUROIL 800 ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AN"
    },
    {
      "id": "p_7_91",
      "name": "ACEITE DE MAIZ MAZEITE 1L",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_92",
      "name": "ACEITE LA PAMPA SOYA 500ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AL"
    },
    {
      "id": "p_7_93",
      "name": "ACEITE DE SOYA LA PAMPA 850ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_94",
      "name": "ACEITE DE SOYA AURORA 500ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_95",
      "name": "ACEITE DE SOYA AURORA 828ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_7_96",
      "name": "SALSA DE SOYA MI GOCHITA 150ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_97",
      "name": "SALSA DE SOYA MI GOCHITA 300ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_98",
      "name": "SALSA DE SOYA MI GOCHITA 700ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_99",
      "name": "SALSA DE SOYA MI GOCHITA GALÓN",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_100",
      "name": "SALSA DE AJO MI GOCHITA 150ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_101",
      "name": "SALSA DE AJO MI GOCHITA 700ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_102",
      "name": "SALSA DE AJO MI GOCHITA GALÓN",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_103",
      "name": "SALSA DE AJO CON PEREJIL MI GOCHITA 150ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_104",
      "name": "SALSA DE AJO CON PEREJIL MI GOCHITA 700ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_105",
      "name": "SALSA INGLESA MI GOCHITA 150ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_106",
      "name": "SALSA INGLESA MI GOCHITA 300ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_107",
      "name": "SALSA INGLESA MI GOCHITA 700ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_7_108",
      "name": "ACEITUNAS RELLENAS MI GOCHITA 200G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "AR"
    },
    {
      "id": "p_7_109",
      "name": "ACEITUNAS RELLENAS MI GOCHITA 500G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "AR"
    },
    {
      "id": "p_7_110",
      "name": "ALCAPARRAS MI GOCHITA 200G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_7_111",
      "name": "ENCURTIDO CON MOSTAZA MI GOCHITA 200G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "EC"
    },
    {
      "id": "p_7_112",
      "name": "ENCURTIDO MI GOCHITA 200G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "EM"
    },
    {
      "id": "p_7_113",
      "name": "ATUN  EN ACEITE MARGARITA 140G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_114",
      "name": "ATUN EN ACEITE MARGARITA 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_115",
      "name": "ATUN ENSALADA MARGARITA 170G",
      "brand": "ATUN",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_7_116",
      "name": "ACEITUNAS NEGRAS FRAGUA 390G",
      "brand": "ACEITUNAS",
      "sku": "",
      "status": "normal",
      "initials": "AN"
    },
    {
      "id": "p_7_117",
      "name": "CHAMPIÑONES TIGO 425G",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "CT"
    },
    {
      "id": "p_7_118",
      "name": "CHAMPIÑONES VIVALDI 290G",
      "brand": "CHAMPIONES",
      "sku": "",
      "status": "normal",
      "initials": "CV"
    },
    {
      "id": "p_7_119",
      "name": "GUISANTE FRAGUA 390G",
      "brand": "GUISANTE",
      "sku": "",
      "status": "normal",
      "initials": "GF"
    },
    {
      "id": "p_7_120",
      "name": "CHAMPIÑONES FRAGUA 370G",
      "brand": "CHAMPIONES",
      "sku": "",
      "status": "normal",
      "initials": "CF"
    },
    {
      "id": "p_7_121",
      "name": "MAIZ DULCE FRAGUA 150G",
      "brand": "MAIZ",
      "sku": "",
      "status": "normal",
      "initials": "MD"
    },
    {
      "id": "p_7_122",
      "name": "MAIZ DULCE OSOLE 280G",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "MD"
    },
    {
      "id": "p_7_123",
      "name": "GUISANTES OSOLE 280G",
      "brand": "Osole",
      "sku": "",
      "status": "normal",
      "initials": "GO"
    },
    {
      "id": "p_7_124",
      "name": "MAIZ DULCE TIGO 300G",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "MD"
    },
    {
      "id": "p_7_125",
      "name": "GUSANTES TIGO 300G",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "GT"
    },
    {
      "id": "p_7_126",
      "name": "VEGETALES JARDINERA TIGO 300G",
      "brand": "Tigo",
      "sku": "",
      "status": "normal",
      "initials": "VJ"
    },
    {
      "id": "p_7_127",
      "name": "GUISANTES CON ZANAHORIA DEL MONTE 411G",
      "brand": "GUISANTES",
      "sku": "",
      "status": "normal",
      "initials": "GC"
    },
    {
      "id": "p_7_128",
      "name": "MAIZ TIERNO DEL MONTE 190G",
      "brand": "MAIZ",
      "sku": "",
      "status": "normal",
      "initials": "MT"
    },
    {
      "id": "p_7_129",
      "name": "SAL CRUZ DE ORO 500G",
      "brand": "SAL",
      "sku": "",
      "status": "normal",
      "initials": "SC"
    },
    {
      "id": "p_7_130",
      "name": "SAL CRUZ DE ORO 1KG",
      "brand": "SAL",
      "sku": "",
      "status": "normal",
      "initials": "SC"
    },
    {
      "id": "p_7_131",
      "name": "SAL CORONA 500G",
      "brand": "SAL",
      "sku": "",
      "status": "normal",
      "initials": "SC"
    },
    {
      "id": "p_7_132",
      "name": "SAL CORONA 1KG",
      "brand": "SAL",
      "sku": "",
      "status": "normal",
      "initials": "SC"
    },
    {
      "id": "p_7_133",
      "name": "SAL PENINSULA 1KG",
      "brand": "SAL",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_7_134",
      "name": "SAL SAN BENITO 1KG",
      "brand": "SAL",
      "sku": "",
      "status": "normal",
      "initials": "SS"
    },
    {
      "id": "p_7_135",
      "name": "SAL BAHIA 1KG",
      "brand": "SAL",
      "sku": "",
      "status": "normal",
      "initials": "SB"
    },
    {
      "id": "p_7_136",
      "name": "MAIZ PARA COTUFAS MARY 400G",
      "brand": "MAIZ",
      "sku": "",
      "status": "normal",
      "initials": "MP"
    },
    {
      "id": "p_7_137",
      "name": "CARAOTA ROJA MARY 400G",
      "brand": "CARAOTA",
      "sku": "",
      "status": "normal",
      "initials": "CR"
    },
    {
      "id": "p_7_138",
      "name": "ARVEJA VERDE MARY 400G",
      "brand": "ARVEJA",
      "sku": "",
      "status": "normal",
      "initials": "AV"
    },
    {
      "id": "p_7_139",
      "name": "LENTEJA MARY 400G",
      "brand": "LENTEJA",
      "sku": "",
      "status": "normal",
      "initials": "LM"
    },
    {
      "id": "p_7_140",
      "name": "CARAOTA NEGRA MARY 400G",
      "brand": "CARAOTA",
      "sku": "",
      "status": "normal",
      "initials": "CN"
    },
    {
      "id": "p_7_141",
      "name": "ARVEJA VERDE MI GOCHITA 400G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "AV"
    },
    {
      "id": "p_7_142",
      "name": "LENTEJA MI GOCHITA 400G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "LM"
    },
    {
      "id": "p_7_143",
      "name": "MAIZ PARA COTUFA MI GOCHITA 400G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "MP"
    },
    {
      "id": "p_7_144",
      "name": "GARBANZO MI GOCHITA 400G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "GM"
    },
    {
      "id": "p_7_145",
      "name": "CARAOTA NEGRA MI GOCHITA 400G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "CN"
    },
    {
      "id": "p_7_146",
      "name": "FRIJOL PICO NEGRO MI GOCHITA 400G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "FP"
    },
    {
      "id": "p_7_147",
      "name": "ARVEJA VERDE AMANECER 400G",
      "brand": "ARVEJA",
      "sku": "",
      "status": "normal",
      "initials": "AV"
    },
    {
      "id": "p_7_148",
      "name": "CARAOTA NEGRA AMANECER 400G",
      "brand": "CARAOTA",
      "sku": "",
      "status": "normal",
      "initials": "CN"
    },
    {
      "id": "p_7_149",
      "name": "LENTEJA AMANECER 400G",
      "brand": "LENTEJA",
      "sku": "",
      "status": "normal",
      "initials": "LA"
    },
    {
      "id": "p_7_150",
      "name": "LENTEJA PANTERA 400G",
      "brand": "LENTEJA",
      "sku": "",
      "status": "normal",
      "initials": "LP"
    },
    {
      "id": "p_7_151",
      "name": "CARAOTA NEGRA PANTERA  400G",
      "brand": "CARAOTA",
      "sku": "",
      "status": "normal",
      "initials": "CN"
    },
    {
      "id": "p_7_152",
      "name": "CARAOTA ROJA PANTERA 400G",
      "brand": "CARAOTA",
      "sku": "",
      "status": "normal",
      "initials": "CR"
    },
    {
      "id": "p_7_153",
      "name": "FRIJOL PICO NEGRO PANTERA 400G",
      "brand": "FRIJOL",
      "sku": "",
      "status": "normal",
      "initials": "FP"
    },
    {
      "id": "p_7_154",
      "name": "MAIZ PARA COTUFA PANTERA 500G",
      "brand": "MAIZ",
      "sku": "",
      "status": "normal",
      "initials": "MP"
    },
    {
      "id": "p_7_155",
      "name": "MAIZ PARA COTUFA PANTERA 250G",
      "brand": "MAIZ",
      "sku": "",
      "status": "normal",
      "initials": "MP"
    },
    {
      "id": "p_7_156",
      "name": "MAIZ PARA COTUFA ALVARIGUA 400G",
      "brand": "Alvarigua",
      "sku": "",
      "status": "normal",
      "initials": "MP"
    },
    {
      "id": "p_7_157",
      "name": "LENTEJA ALVARIGUA 400G",
      "brand": "Alvarigua",
      "sku": "",
      "status": "normal",
      "initials": "LA"
    },
    {
      "id": "p_7_158",
      "name": "ARVEJA VERDE ALVARIGUA 400G",
      "brand": "Alvarigua",
      "sku": "",
      "status": "normal",
      "initials": "AV"
    },
    {
      "id": "p_7_159",
      "name": "CARAOTA NEGRA ALVARIGUA 400G",
      "brand": "Alvarigua",
      "sku": "",
      "status": "normal",
      "initials": "CN"
    },
    {
      "id": "p_7_160",
      "name": "CARAOTA NEGRA EL MOLINO 400G",
      "brand": "El Molino",
      "sku": "",
      "status": "normal",
      "initials": "CN"
    },
    {
      "id": "p_7_161",
      "name": "FIJOL PICO NEGRO EL MOLINO 400G",
      "brand": "El Molino",
      "sku": "",
      "status": "normal",
      "initials": "FP"
    },
    {
      "id": "p_7_162",
      "name": "ARVEJA VERDE EL MOLINO 400G",
      "brand": "El Molino",
      "sku": "",
      "status": "normal",
      "initials": "AV"
    },
    {
      "id": "p_7_163",
      "name": "LENTEJA EL MOLINO 400G",
      "brand": "El Molino",
      "sku": "",
      "status": "normal",
      "initials": "LE"
    },
    {
      "id": "p_7_164",
      "name": "MAIZ PARA COTUFAS EL MOLINO 400G",
      "brand": "El Molino",
      "sku": "",
      "status": "normal",
      "initials": "MP"
    },
    {
      "id": "p_7_165",
      "name": "CARAOTA AURORA 1KG",
      "brand": "CARAOTA",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_7_166",
      "name": "CARAOTA AURORA 500G",
      "brand": "CARAOTA",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_7_167",
      "name": "MAIZ PARA COTUFA AURORA 400G",
      "brand": "MAIZ",
      "sku": "",
      "status": "normal",
      "initials": "MP"
    },
    {
      "id": "p_7_168",
      "name": "LENTEJA AURORA 400G",
      "brand": "LENTEJA",
      "sku": "",
      "status": "normal",
      "initials": "LA"
    },
    {
      "id": "p_7_169",
      "name": "VINAGRE DE MANZANA 750ML SEASONS",
      "brand": "VINAGRE",
      "sku": "",
      "status": "normal",
      "initials": "VD"
    },
    {
      "id": "p_7_170",
      "name": "VINAGRE DE MANZANA HEINZ 500ML",
      "brand": "Heinz",
      "sku": "",
      "status": "normal",
      "initials": "VD"
    },
    {
      "id": "p_7_171",
      "name": "VINAGRE PRIMALCA 500ML",
      "brand": "VINAGRE",
      "sku": "",
      "status": "normal",
      "initials": "VP"
    },
    {
      "id": "p_7_172",
      "name": "VINAGRE LA CHINA 1LT",
      "brand": "VINAGRE",
      "sku": "",
      "status": "normal",
      "initials": "VL"
    },
    {
      "id": "p_7_173",
      "name": "VINAGRE MI GOCHITA 500ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "VM"
    },
    {
      "id": "p_7_174",
      "name": "VINAGRE MI GOCHITA 1LT",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "VM"
    },
    {
      "id": "p_7_175",
      "name": "VINAGRE MI GOCHITA GALÓN",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "VM"
    },
    {
      "id": "p_7_176",
      "name": "VINAGRE INSAVE 250ML",
      "brand": "VINAGRE",
      "sku": "",
      "status": "normal",
      "initials": "VI"
    },
    {
      "id": "p_7_177",
      "name": "VINAGRE INSAVE 500ML",
      "brand": "VINAGRE",
      "sku": "",
      "status": "normal",
      "initials": "VI"
    },
    {
      "id": "p_7_178",
      "name": "VINAGRE INSAVE 1LT",
      "brand": "VINAGRE",
      "sku": "",
      "status": "normal",
      "initials": "VI"
    },
    {
      "id": "p_7_179",
      "name": "VINAGRE MAVESA 500ML",
      "brand": "VINAGRE",
      "sku": "",
      "status": "normal",
      "initials": "VM"
    },
    {
      "id": "p_7_180",
      "name": "VINAGRE MAVESA 1LT",
      "brand": "VINAGRE",
      "sku": "",
      "status": "normal",
      "initials": "VM"
    },
    {
      "id": "p_7_181",
      "name": "VINAGRE MAVESA GALÓN",
      "brand": "VINAGRE",
      "sku": "",
      "status": "normal",
      "initials": "VM"
    },
    {
      "id": "p_7_182",
      "name": "SALSA DE SOYA DOÑA TITA 150ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_183",
      "name": "SALSA DE SOYA DOÑA TITA 300ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_7_184",
      "name": "ACEITE COPOSA 500ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AC"
    },
    {
      "id": "p_7_185",
      "name": "PEPITONAS EN SALSA PICANTE  140G",
      "brand": "PEPITONAS",
      "sku": "",
      "status": "normal",
      "initials": "PE"
    },
    {
      "id": "p_7_186",
      "name": "SALSA AGRIDULCE LA CHINA 300G",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_7_187",
      "name": "SALSA AJI PICANTE LA CHINA 300G",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SA"
    },
    {
      "id": "p_7_188",
      "name": "SALSA LA VIÑA RIKOSTILLA",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SL"
    }
  ],
  "8": [
    {
      "id": "p_8_1",
      "name": "PEPSI COLA 1.5LT",
      "brand": "Pepsi",
      "sku": "",
      "status": "normal",
      "initials": "PC"
    },
    {
      "id": "p_8_2",
      "name": "PEPSI COLA 2LT",
      "brand": "Pepsi",
      "sku": "",
      "status": "normal",
      "initials": "PC"
    },
    {
      "id": "p_8_3",
      "name": "PEPSI 350ML",
      "brand": "Pepsi",
      "sku": "",
      "status": "normal",
      "initials": "P3"
    },
    {
      "id": "p_8_4",
      "name": "PEPSI RETORNABLE 1.25LT",
      "brand": "Pepsi",
      "sku": "",
      "status": "normal",
      "initials": "PR"
    },
    {
      "id": "p_8_5",
      "name": "PEPSI 1LT",
      "brand": "Pepsi",
      "sku": "",
      "status": "normal",
      "initials": "P1"
    },
    {
      "id": "p_8_6",
      "name": "PEPESI ZERO AZUCAR 350ML",
      "brand": "PEPESI",
      "sku": "",
      "status": "normal",
      "initials": "PZ"
    },
    {
      "id": "p_8_7",
      "name": "REFRESCO GOLDEN KOLITA 2LT",
      "brand": "Golden",
      "sku": "",
      "status": "normal",
      "initials": "RG"
    },
    {
      "id": "p_8_8",
      "name": "REFRESCO GOLDEN KOLITA 1.5LT",
      "brand": "Golden",
      "sku": "",
      "status": "normal",
      "initials": "RG"
    },
    {
      "id": "p_8_9",
      "name": "REFRESCO GOLDEN PIÑA 1LT",
      "brand": "Golden",
      "sku": "",
      "status": "normal",
      "initials": "RG"
    },
    {
      "id": "p_8_10",
      "name": "REFRESCO 7UP 1LT",
      "brand": "7up",
      "sku": "",
      "status": "normal",
      "initials": "R7"
    },
    {
      "id": "p_8_11",
      "name": "REFRESCO GOLDEN MANZANA",
      "brand": "Golden",
      "sku": "",
      "status": "normal",
      "initials": "RG"
    },
    {
      "id": "p_8_12",
      "name": "AGUA MINERAL MINALBA 355ML",
      "brand": "AGUA",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_8_13",
      "name": "MALTA MALTIN LATA 355ML",
      "brand": "Maltin",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_8_14",
      "name": "MALTA MALTIN LATA 250ML",
      "brand": "Maltin",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_8_15",
      "name": "AGUA MINERAL MINLABA 600ML",
      "brand": "AGUA",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_8_16",
      "name": "AGUA MINERAL MINALBA 1.5LT",
      "brand": "AGUA",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_8_17",
      "name": "REFRESCO PEPSI DE LATA 355ML",
      "brand": "Pepsi",
      "sku": "",
      "status": "normal",
      "initials": "RP"
    },
    {
      "id": "p_8_18",
      "name": "REFRESCO PEPSI LIGHT 355 LATA",
      "brand": "Pepsi",
      "sku": "",
      "status": "normal",
      "initials": "RP"
    },
    {
      "id": "p_8_19",
      "name": "MINALBA SODA SPARKLING 355ML",
      "brand": "MINALBA",
      "sku": "",
      "status": "normal",
      "initials": "MS"
    },
    {
      "id": "p_8_20",
      "name": "ROCK STAR 355ML",
      "brand": "ROCK",
      "sku": "",
      "status": "normal",
      "initials": "RS"
    }
  ],
  "9": [
    {
      "id": "p_9_1",
      "name": "COCACOLA 1.5LT",
      "brand": "Cocacola",
      "sku": "",
      "status": "normal",
      "initials": "C1"
    },
    {
      "id": "p_9_2",
      "name": "COCACOLA  2LTS",
      "brand": "Cocacola",
      "sku": "",
      "status": "normal",
      "initials": "C2"
    },
    {
      "id": "p_9_3",
      "name": "COCACOLA 350ML",
      "brand": "Cocacola",
      "sku": "",
      "status": "normal",
      "initials": "C3"
    },
    {
      "id": "p_9_4",
      "name": "COCACOLA 355 LATA",
      "brand": "Cocacola",
      "sku": "",
      "status": "normal",
      "initials": "C3"
    },
    {
      "id": "p_9_5",
      "name": "FRESCOLITA 350ML",
      "brand": "FRESCOLITA",
      "sku": "",
      "status": "normal",
      "initials": "F3"
    },
    {
      "id": "p_9_6",
      "name": "HIT NARANJA 350ML",
      "brand": "Hit",
      "sku": "",
      "status": "normal",
      "initials": "HN"
    },
    {
      "id": "p_9_7",
      "name": "FRESCOLITA 355ML LATA",
      "brand": "FRESCOLITA",
      "sku": "",
      "status": "normal",
      "initials": "F3"
    },
    {
      "id": "p_9_8",
      "name": "FANTA NARANJA 355ML LATA",
      "brand": "FANTA",
      "sku": "",
      "status": "normal",
      "initials": "FN"
    },
    {
      "id": "p_9_9",
      "name": "FANTA UVA 355ML LATA",
      "brand": "FANTA",
      "sku": "",
      "status": "normal",
      "initials": "FU"
    },
    {
      "id": "p_9_10",
      "name": "FANTA TORONJA 355ML",
      "brand": "FANTA",
      "sku": "",
      "status": "normal",
      "initials": "FT"
    },
    {
      "id": "p_9_11",
      "name": "FRESCOLITA 355ML",
      "brand": "FRESCOLITA",
      "sku": "",
      "status": "normal",
      "initials": "F3"
    },
    {
      "id": "p_9_12",
      "name": "FRESCOLITA 1.5LT",
      "brand": "FRESCOLITA",
      "sku": "",
      "status": "normal",
      "initials": "F1"
    },
    {
      "id": "p_9_13",
      "name": "FRESCOLITA 2LT",
      "brand": "FRESCOLITA",
      "sku": "",
      "status": "normal",
      "initials": "F2"
    },
    {
      "id": "p_9_14",
      "name": "FANTA UVA 1.5LT",
      "brand": "FANTA",
      "sku": "",
      "status": "normal",
      "initials": "FU"
    },
    {
      "id": "p_9_15",
      "name": "FANTA UVA 2LT",
      "brand": "FANTA",
      "sku": "",
      "status": "normal",
      "initials": "FU"
    },
    {
      "id": "p_9_16",
      "name": "FANTA TORONJA 2LT",
      "brand": "FANTA",
      "sku": "",
      "status": "normal",
      "initials": "FT"
    },
    {
      "id": "p_9_17",
      "name": "JUGO DEL VALLE 500ML",
      "brand": "JUGO",
      "sku": "",
      "status": "normal",
      "initials": "JD"
    },
    {
      "id": "p_9_18",
      "name": "POWERADE FRUTO TROPICAL",
      "brand": "POWERADE",
      "sku": "",
      "status": "normal",
      "initials": "PF"
    },
    {
      "id": "p_9_19",
      "name": "POWERADE MORA AZUL",
      "brand": "POWERADE",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_9_20",
      "name": "POWERADE MANDARINA",
      "brand": "POWERADE",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_9_21",
      "name": "CLUB SODA SCHWEPPES 355ML",
      "brand": "CLUB",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_9_22",
      "name": "AGUA NEVADA 600ML",
      "brand": "Nevada",
      "sku": "",
      "status": "normal",
      "initials": "AN"
    },
    {
      "id": "p_9_23",
      "name": "AGUA NEVADA 1.5ML",
      "brand": "Nevada",
      "sku": "",
      "status": "normal",
      "initials": "AN"
    },
    {
      "id": "p_9_24",
      "name": "AGUA NEVADA 5LT",
      "brand": "Nevada",
      "sku": "",
      "status": "normal",
      "initials": "AN"
    }
  ],
  "10": [
    {
      "id": "p_10_1",
      "name": "YOGURT YOLO 150G PLAIM",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_2",
      "name": "YOGURT YOLO 150G PATILLA",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_3",
      "name": "YOGURT YOLO 150G DURAZNO",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_4",
      "name": "YOGURT YOLO 150G MANTECADO",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_5",
      "name": "YOGURT YOLO 150G COCO",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_6",
      "name": "YOGURT YOLO 150G FRESA",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_7",
      "name": "YOGURT YOLO 150G PIE DE LIMÓN",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_8",
      "name": "YOGURT YOLO 150G CREMA NARANJA",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_9",
      "name": "YOGURT YOLO 150G CHOCO AVELLANAS",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_10",
      "name": "YOGURT YOLO 150G TIRAMISU",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_11",
      "name": "YOGURT YOLO 680G MANTECADO",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_12",
      "name": "YOGURT YOLO 680G FRESA",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_13",
      "name": "YOGURT YOLO 680G PLAIN",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_14",
      "name": "YOGURT YOLO 200ML BLUEBERRY COCO",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_15",
      "name": "YOGURT YOLO 200ML PARCHITA",
      "brand": "Hit",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_16",
      "name": "YOGURT YOLO 200ML FRESA",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_17",
      "name": "YOGURT YOLO 200ML MANTECADO",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_18",
      "name": "YOGURT YOLO FIT BANANA Y PEANUT",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_19",
      "name": "YOGURT YOLO FIT MIXED BERRIES",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_20",
      "name": "YOGURT YOLO FIT VAINILLA LATTE",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_21",
      "name": "YOGURT YOLO 750G MANTECADO",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_22",
      "name": "YOGURT YOLO 750G KEFIR PLAIN",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_23",
      "name": "YOGURT YOLO 750G KEFIR GOLDEN MILK",
      "brand": "Golden",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_24",
      "name": "YOGURT YOLO 750G KEFIR MORA",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_25",
      "name": "YOGURT YOLO 110G FRESA /BANANA",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_26",
      "name": "YOGURT YOLO 110G MANZANA VRD",
      "brand": "YOGURT",
      "sku": "",
      "status": "normal",
      "initials": "YY"
    },
    {
      "id": "p_10_27",
      "name": "BEBIDA LACTEA HUESITOS FRESA 200ML",
      "brand": "BEBIDA",
      "sku": "",
      "status": "normal",
      "initials": "BL"
    },
    {
      "id": "p_10_28",
      "name": "BEBIDA LACTEA HUESTOS VAINILLA 200ML",
      "brand": "BEBIDA",
      "sku": "",
      "status": "normal",
      "initials": "BL"
    },
    {
      "id": "p_10_29",
      "name": "CHICHA HUESITOS 200ML",
      "brand": "CHICHA",
      "sku": "",
      "status": "normal",
      "initials": "CH"
    },
    {
      "id": "p_10_30",
      "name": "FRICAJITA MANZANA 250ML",
      "brand": "FRICAJITA",
      "sku": "",
      "status": "normal",
      "initials": "FM"
    },
    {
      "id": "p_10_31",
      "name": "NECTAR DE MANZANA PULP 250ML",
      "brand": "NECTAR",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_10_32",
      "name": "NECTAR DE PERA PULP 250ML",
      "brand": "NECTAR",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_10_33",
      "name": "NECTAR DE MANZANA FRICO 1LT",
      "brand": "NECTAR",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_10_34",
      "name": "BEBIDA EL CHICHERO 250ML",
      "brand": "BEBIDA",
      "sku": "",
      "status": "normal",
      "initials": "BE"
    },
    {
      "id": "p_10_35",
      "name": "BEBIDA ACHOCOLATADA RIKO MALT 250ML",
      "brand": "BEBIDA",
      "sku": "",
      "status": "normal",
      "initials": "BA"
    },
    {
      "id": "p_10_36",
      "name": "NECTAR DE PERA TUNOL 1LT",
      "brand": "NECTAR",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_10_37",
      "name": "NECTAR DE DURAZNO EL TUNOL 1LT",
      "brand": "NECTAR",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_10_38",
      "name": "NECTAR DE DURAZNO LA PASTOREÑA 1LT",
      "brand": "NECTAR",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_10_39",
      "name": "NECTAR DE PERA LA PASTOREÑA 1LT",
      "brand": "NECTAR",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_10_40",
      "name": "NECTAR DE MANZANA LA PASTOREÑA 1LT",
      "brand": "NECTAR",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_10_41",
      "name": "JUGO DE NARANJA 1.5LT LOS ANGELES",
      "brand": "JUGO",
      "sku": "",
      "status": "normal",
      "initials": "JD"
    },
    {
      "id": "p_10_42",
      "name": "JUGO DE NARANJA FRUGY 1.5LT",
      "brand": "JUGO",
      "sku": "",
      "status": "normal",
      "initials": "JD"
    },
    {
      "id": "p_10_43",
      "name": "JUGO DE NARANJA 5LT LOS ANGELES",
      "brand": "JUGO",
      "sku": "",
      "status": "normal",
      "initials": "JD"
    },
    {
      "id": "p_10_44",
      "name": "JUGO DE NARANJA 250ML LOS ANGELES",
      "brand": "JUGO",
      "sku": "",
      "status": "normal",
      "initials": "JD"
    },
    {
      "id": "p_10_45",
      "name": "JUGO FRUGY DURAZNO 500ML",
      "brand": "JUGO",
      "sku": "",
      "status": "normal",
      "initials": "JF"
    },
    {
      "id": "p_10_46",
      "name": "JUGO FRUGY NARANJA 500ML",
      "brand": "JUGO",
      "sku": "",
      "status": "normal",
      "initials": "JF"
    },
    {
      "id": "p_10_47",
      "name": "AGUA NACHO 600ML AGUA VIDA",
      "brand": "AGUA",
      "sku": "",
      "status": "normal",
      "initials": "AN"
    },
    {
      "id": "p_10_48",
      "name": "AGUA MOYA 500ML",
      "brand": "AGUA",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_10_49",
      "name": "MALTA MORENA 222ML BOTELLA",
      "brand": "MALTA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_10_50",
      "name": "MALTA MORENA 207ML SIN ALCOHOL",
      "brand": "MALTA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_10_51",
      "name": "MALTA REGIONAL 207ML",
      "brand": "MALTA",
      "sku": "",
      "status": "normal",
      "initials": "MR"
    },
    {
      "id": "p_10_52",
      "name": "MALTA MORENA 250ML LATA",
      "brand": "MALTA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_10_53",
      "name": "SPEEDMAX LATA",
      "brand": "SPEEDMAX",
      "sku": "",
      "status": "normal",
      "initials": "SL"
    },
    {
      "id": "p_10_54",
      "name": "GATORADE 500CM FRUTAS TROPICALES",
      "brand": "Gatorade",
      "sku": "",
      "status": "normal",
      "initials": "G5"
    },
    {
      "id": "p_10_55",
      "name": "GATORADE 500CM MANDARINA",
      "brand": "Gatorade",
      "sku": "",
      "status": "normal",
      "initials": "G5"
    },
    {
      "id": "p_10_56",
      "name": "LIPTON LIMÓN 500ML",
      "brand": "Lipton",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_10_57",
      "name": "LIPTON LIMÓN 1.5LT",
      "brand": "Lipton",
      "sku": "",
      "status": "normal",
      "initials": "LL"
    },
    {
      "id": "p_10_58",
      "name": "LIPTON TE VERDE 500ML",
      "brand": "Lipton",
      "sku": "",
      "status": "normal",
      "initials": "LT"
    },
    {
      "id": "p_10_59",
      "name": "LIPTON TE VERDE 1.5ML",
      "brand": "Lipton",
      "sku": "",
      "status": "normal",
      "initials": "LT"
    },
    {
      "id": "p_10_60",
      "name": "NECTAR NARANJA/MANGO YUKERY 1.5LT",
      "brand": "Yukery",
      "sku": "",
      "status": "normal",
      "initials": "NN"
    },
    {
      "id": "p_10_61",
      "name": "NECTAR DE PERA YUKERY 250ML BOTELLA",
      "brand": "Yukery",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_10_62",
      "name": "NECTAR DE NARANJA YUKERY 250ML BOTELLA",
      "brand": "Yukery",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_10_63",
      "name": "TÉ YOLO FRESH 473ML PEACH GRANADA",
      "brand": "T",
      "sku": "",
      "status": "normal",
      "initials": "TY"
    },
    {
      "id": "p_10_64",
      "name": "TÉ YOLO FRESH 473ML RASPBERRY LEMONADE",
      "brand": "T",
      "sku": "",
      "status": "normal",
      "initials": "TY"
    },
    {
      "id": "p_10_65",
      "name": "TÉ YOLO FRESH 473ML APPLE MORA",
      "brand": "T",
      "sku": "",
      "status": "normal",
      "initials": "TY"
    },
    {
      "id": "p_10_66",
      "name": "TÉ YOLO FRESH 473ML TROPICAL",
      "brand": "T",
      "sku": "",
      "status": "normal",
      "initials": "TY"
    }
  ],
  "11": [
    {
      "id": "p_11_1",
      "name": "NECTAR DE PERA NATULAC 1LT",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_11_2",
      "name": "NECTAR DE DURAZNO NATULAC 1LT",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_11_3",
      "name": "NECTAR DE PERA NATULAC 330ML",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_11_4",
      "name": "NECTAR DE NARANJA NATULAC 330ML",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_11_5",
      "name": "NECTAR DE DURAZNO NATULAC 330ML",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_11_6",
      "name": "NECTAR DE MANZANA NATULAC 250ML",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_11_7",
      "name": "NECTAR DE NARANJA  NATULAC 250ML",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_11_8",
      "name": "NECTAR DE DURAZNO NATULAC 250ML",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_11_9",
      "name": "BEBIDA ALMENDRA NATULAC 473ML",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "BA"
    },
    {
      "id": "p_11_10",
      "name": "CREMA DE LECHE NATULAC 473ML",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_11_11",
      "name": "LECHE CONDENSADA NATULAC 397G",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_11_12",
      "name": "LECHE CONDENSADA MAITA 390G",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_11_13",
      "name": "LECHE CONDENSADA NATULAC 340G",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_11_14",
      "name": "LECHE CONDENSADA MAITA CREAMER 340G",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_11_15",
      "name": "LECHE CONDENSADA NATULAC SEMI DESCREMADA 340G",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "LC"
    },
    {
      "id": "p_11_16",
      "name": "COLADO PERA NATULAC 186G",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_11_17",
      "name": "COLADO DE DURAZNO NATULAC 186G",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_11_18",
      "name": "COLADO DE MANZANA NATULAC 113G",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_11_19",
      "name": "COLADO DE PERA NATULAC 113G",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_11_20",
      "name": "NECTAR DE MANZANA NATULAC 1LT",
      "brand": "Natulac",
      "sku": "",
      "status": "normal",
      "initials": "ND"
    },
    {
      "id": "p_11_21",
      "name": "CAFÉ FLOR DE ARAUCA 200G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CF"
    },
    {
      "id": "p_11_22",
      "name": "CAFÉ FLOR DE ARAUCA 500G",
      "brand": "CAF",
      "sku": "",
      "status": "normal",
      "initials": "CF"
    },
    {
      "id": "p_11_23",
      "name": "LECHE DESCREMADA LA PASTOREÑA 1LT",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LD"
    },
    {
      "id": "p_11_24",
      "name": "LECHE DESLACTOSADA LA PASTOREÑA 1LT",
      "brand": "LECHE",
      "sku": "",
      "status": "normal",
      "initials": "LD"
    },
    {
      "id": "p_11_25",
      "name": "MAYONESA KRAFT 445G",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MK"
    },
    {
      "id": "p_11_26",
      "name": "MAYONESA KRAFT 175G",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MK"
    },
    {
      "id": "p_11_27",
      "name": "DIABLITO UNDERWOOD 115G",
      "brand": "DIABLITO",
      "sku": "",
      "status": "normal",
      "initials": "DU"
    },
    {
      "id": "p_11_28",
      "name": "MAYONESA LA AMERICANA 175G",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "ML"
    },
    {
      "id": "p_11_29",
      "name": "MAYONESA LA AMERICANA 445 G",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "ML"
    },
    {
      "id": "p_11_30",
      "name": "MAYONESA LA AMERICANA 910G",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "ML"
    },
    {
      "id": "p_11_31",
      "name": "HARINA DE MAIZ PAN 1 TRADICIONAL",
      "brand": "HARINA",
      "sku": "",
      "status": "normal",
      "initials": "HD"
    },
    {
      "id": "p_11_32",
      "name": "MEZCLA AREPITAS DULCES 500G",
      "brand": "MEZCLA",
      "sku": "",
      "status": "normal",
      "initials": "MA"
    },
    {
      "id": "p_11_33",
      "name": "MEZCLA SEMILLA NUTRITIVAS",
      "brand": "MEZCLA",
      "sku": "",
      "status": "normal",
      "initials": "MS"
    },
    {
      "id": "p_11_34",
      "name": "MEZCLA PARA CACHAPA 500G",
      "brand": "MEZCLA",
      "sku": "",
      "status": "normal",
      "initials": "MP"
    },
    {
      "id": "p_11_35",
      "name": "MAYONESA MAVESA 175G",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_11_36",
      "name": "MAYONESA MAVESA 910G",
      "brand": "MAYONESA",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_11_37",
      "name": "SALSA DE TOMATE PAMPERO 198G",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_11_38",
      "name": "SALSA DE TOMATE PAMPERO 397G",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_11_39",
      "name": "RIKESA CHEDDAR 200G",
      "brand": "RIKESA",
      "sku": "",
      "status": "normal",
      "initials": "RC"
    },
    {
      "id": "p_11_40",
      "name": "SALSA DE TOMATE PAMPERO 4.2KG",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_11_41",
      "name": "PEPSI 1.5LT",
      "brand": "Pepsi",
      "sku": "",
      "status": "normal",
      "initials": "P1"
    },
    {
      "id": "p_11_42",
      "name": "PEPSI 2LT",
      "brand": "Pepsi",
      "sku": "",
      "status": "normal",
      "initials": "P2"
    },
    {
      "id": "p_11_43",
      "name": "REFRESCO GOLDE KOLITA 2LT",
      "brand": "REFRESCO",
      "sku": "",
      "status": "normal",
      "initials": "RG"
    },
    {
      "id": "p_11_44",
      "name": "REFRESCO 7UP 2LT",
      "brand": "7up",
      "sku": "",
      "status": "normal",
      "initials": "R7"
    },
    {
      "id": "p_11_45",
      "name": "PASAS DESHIDRATADAS 200G",
      "brand": "PASAS",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_11_46",
      "name": "ESCURTIDO EN MOZTAZA 500G",
      "brand": "ESCURTIDO",
      "sku": "",
      "status": "normal",
      "initials": "EE"
    },
    {
      "id": "p_11_47",
      "name": "ESCURTIDO EN VINAGRE 480G",
      "brand": "ESCURTIDO",
      "sku": "",
      "status": "normal",
      "initials": "EE"
    },
    {
      "id": "p_11_48",
      "name": "ALIÑO PREPARADO 500G",
      "brand": "ALIO",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_11_49",
      "name": "ENCURTIDO EN VINAGRE 200G",
      "brand": "ENCURTIDO",
      "sku": "",
      "status": "normal",
      "initials": "EE"
    },
    {
      "id": "p_11_50",
      "name": "ACEITUNA RELLENA 190G",
      "brand": "ACEITUNA",
      "sku": "",
      "status": "normal",
      "initials": "AR"
    },
    {
      "id": "p_11_51",
      "name": "ENCURTIDO EN MOSTAZA 190G",
      "brand": "ENCURTIDO",
      "sku": "",
      "status": "normal",
      "initials": "EE"
    },
    {
      "id": "p_11_52",
      "name": "MOSTAZA MI GOCHITA 500G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_11_53",
      "name": "CONFITE SURTIDOS MI GOCHITA 169G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_11_54",
      "name": "CONFITE AZUCAR ESCARCHADA 169G",
      "brand": "CONFITE",
      "sku": "",
      "status": "normal",
      "initials": "CA"
    },
    {
      "id": "p_11_55",
      "name": "SALSA INGLESA MI GOCHITA 150ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_11_56",
      "name": "SALSA DE SOYA MI GOCHITA 150ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_11_57",
      "name": "SALSA INGLESA MI GOCHITA 300ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_11_58",
      "name": "SALSA SOYA MI GOCHITA 300ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SS"
    },
    {
      "id": "p_11_59",
      "name": "COMBO SALSA MI GOCHITA 150ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "CS"
    },
    {
      "id": "p_11_60",
      "name": "SALSA DE SOYA 0.70 MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_11_61",
      "name": "SALSA DE SOYA 3.71LT MI GOCHITA",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_11_62",
      "name": "MOSTAZA MI GOCHITA 190G",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "MM"
    },
    {
      "id": "p_11_63",
      "name": "ALIÑO PREPARADO 190G",
      "brand": "ALIO",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_11_64",
      "name": "ANIS ESTRELLADO FRASCO 30G",
      "brand": "ANIS",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_11_65",
      "name": "ANIS DULCE FRASCO 90G",
      "brand": "ANIS",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_11_66",
      "name": "MANZANILLA FRASCO 150G",
      "brand": "MANZANILLA",
      "sku": "",
      "status": "normal",
      "initials": "MF"
    },
    {
      "id": "p_11_67",
      "name": "CANELA MOLIDA FRASCO 120G",
      "brand": "CANELA",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_11_68",
      "name": "CURRY FRASCO 120G",
      "brand": "CURRY",
      "sku": "",
      "status": "normal",
      "initials": "CF"
    },
    {
      "id": "p_11_69",
      "name": "CARMENCITA FRASCO 150G",
      "brand": "CARMENCITA",
      "sku": "",
      "status": "normal",
      "initials": "CF"
    },
    {
      "id": "p_11_70",
      "name": "CALDO DE POLLO FRASCO 150G",
      "brand": "CALDO",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_11_71",
      "name": "COMINO MOLIDO FRASCO 100G",
      "brand": "COMINO",
      "sku": "",
      "status": "normal",
      "initials": "CM"
    },
    {
      "id": "p_11_72",
      "name": "PIMIENTA MOLIDA FRASCO 90G",
      "brand": "PIMIENTA",
      "sku": "",
      "status": "normal",
      "initials": "PM"
    },
    {
      "id": "p_11_73",
      "name": "OREGANO MOLIDO FRASCO 100G",
      "brand": "OREGANO",
      "sku": "",
      "status": "normal",
      "initials": "OM"
    },
    {
      "id": "p_11_74",
      "name": "ALBAHACA FRASCO 50G",
      "brand": "ALBAHACA",
      "sku": "",
      "status": "normal",
      "initials": "AF"
    },
    {
      "id": "p_11_75",
      "name": "PEREJIL FRASCO 20G",
      "brand": "PEREJIL",
      "sku": "",
      "status": "normal",
      "initials": "PF"
    },
    {
      "id": "p_11_76",
      "name": "SALSA DE AJO 300ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_11_77",
      "name": "MOSTAZA GALÓN 3.7KG",
      "brand": "MOSTAZA",
      "sku": "",
      "status": "normal",
      "initials": "MG"
    },
    {
      "id": "p_11_78",
      "name": "SALSA INGLESA 700ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SI"
    },
    {
      "id": "p_11_79",
      "name": "SALSA DE AJO 700ML",
      "brand": "SALSA",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_11_80",
      "name": "ALCAPARRAS FRASCOS 200G",
      "brand": "ALCAPARRAS",
      "sku": "",
      "status": "normal",
      "initials": "AF"
    },
    {
      "id": "p_11_81",
      "name": "AJO EN PASTA 190G",
      "brand": "AJO",
      "sku": "",
      "status": "normal",
      "initials": "AE"
    },
    {
      "id": "p_11_82",
      "name": "ADOBO COMPLETO FRASCO 200G",
      "brand": "ADOBO",
      "sku": "",
      "status": "normal",
      "initials": "AC"
    },
    {
      "id": "p_11_83",
      "name": "ALIÑO ROJO FRASCO 120G",
      "brand": "ALIO",
      "sku": "",
      "status": "normal",
      "initials": "AR"
    },
    {
      "id": "p_11_84",
      "name": "VAINILLA MI GOCHITA 150ML",
      "brand": "Mi Gochita",
      "sku": "",
      "status": "normal",
      "initials": "VM"
    }
  ],
  "12": [
    {
      "id": "p_12_1",
      "name": "BOMBILLOS T20",
      "brand": "BOMBILLOS",
      "sku": "",
      "status": "normal",
      "initials": "BT"
    },
    {
      "id": "p_12_2",
      "name": "BOMBILLO MODERNO 1 CONTACTO 3156",
      "brand": "BOMBILLO",
      "sku": "",
      "status": "normal",
      "initials": "BM"
    },
    {
      "id": "p_12_3",
      "name": "BOMBILLO H4 12V100/130W P437",
      "brand": "BOMBILLO",
      "sku": "",
      "status": "normal",
      "initials": "BH"
    },
    {
      "id": "p_12_4",
      "name": "BOMBILLO 900512V130W",
      "brand": "BOMBILLO",
      "sku": "",
      "status": "normal",
      "initials": "B9"
    },
    {
      "id": "p_12_5",
      "name": "FLASHER 2 PATAS ELECTRONICO",
      "brand": "FLASHER",
      "sku": "",
      "status": "normal",
      "initials": "F2"
    },
    {
      "id": "p_12_6",
      "name": "BOMBILLO H4 130/100W 24V",
      "brand": "BOMBILLO",
      "sku": "",
      "status": "normal",
      "initials": "BH"
    },
    {
      "id": "p_12_7",
      "name": "FUSIBLE MUELA 30 AMP.",
      "brand": "FUSIBLE",
      "sku": "",
      "status": "normal",
      "initials": "FM"
    },
    {
      "id": "p_12_8",
      "name": "FUSIBLE MUELA 35 AMP.",
      "brand": "FUSIBLE",
      "sku": "",
      "status": "normal",
      "initials": "FM"
    },
    {
      "id": "p_12_9",
      "name": "FUSIBLE MUELA 40 AMP.",
      "brand": "FUSIBLE",
      "sku": "",
      "status": "normal",
      "initials": "FM"
    },
    {
      "id": "p_12_10",
      "name": "FUSIBLE MUELA 25 AMP.",
      "brand": "FUSIBLE",
      "sku": "",
      "status": "normal",
      "initials": "FM"
    },
    {
      "id": "p_12_11",
      "name": "FUSIBLE MINI MUELA 30 AMP.",
      "brand": "FUSIBLE",
      "sku": "",
      "status": "normal",
      "initials": "FM"
    },
    {
      "id": "p_12_12",
      "name": "FUSIBLE MINI MUELA 25 AMP.",
      "brand": "FUSIBLE",
      "sku": "",
      "status": "normal",
      "initials": "FM"
    },
    {
      "id": "p_12_13",
      "name": "ACEITE 3 EN 1 30ML",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "A3"
    },
    {
      "id": "p_12_14",
      "name": "SOCATE BOMBILLO 1 CONTACTO CHEV PLASTIC",
      "brand": "SOCATE",
      "sku": "",
      "status": "normal",
      "initials": "SB"
    },
    {
      "id": "p_12_15",
      "name": "SOCATE DE MUELITA BOMB 158",
      "brand": "SOCATE",
      "sku": "",
      "status": "normal",
      "initials": "SD"
    },
    {
      "id": "p_12_16",
      "name": "SOCATE BOMBILLO H1 PORCELANA",
      "brand": "SOCATE",
      "sku": "",
      "status": "normal",
      "initials": "SB"
    },
    {
      "id": "p_12_17",
      "name": "SOCATE BOMBILLO H7",
      "brand": "SOCATE",
      "sku": "",
      "status": "normal",
      "initials": "SB"
    },
    {
      "id": "p_12_18",
      "name": "SOCATE BOMBILLO 9006 SEPRATH",
      "brand": "SOCATE",
      "sku": "",
      "status": "normal",
      "initials": "SB"
    },
    {
      "id": "p_12_19",
      "name": "BOMBILLO 9005",
      "brand": "BOMBILLO",
      "sku": "",
      "status": "normal",
      "initials": "B9"
    },
    {
      "id": "p_12_20",
      "name": "BOMBILLO HALOGENO 9004",
      "brand": "BOMBILLO",
      "sku": "",
      "status": "normal",
      "initials": "BH"
    },
    {
      "id": "p_12_21",
      "name": "CINTA LED 5050 6000K LUZ BLANCA 5MT",
      "brand": "CINTA",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_12_22",
      "name": "BORNE DE PLOMO AUTOMOVIL PESADO",
      "brand": "BORNE",
      "sku": "",
      "status": "normal",
      "initials": "BD"
    },
    {
      "id": "p_12_23",
      "name": "BORNE DE PLOMO CAMION PESADO",
      "brand": "BORNE",
      "sku": "",
      "status": "normal",
      "initials": "BD"
    },
    {
      "id": "p_12_24",
      "name": "TORRE BUJIA B1-15 CHEVROLET",
      "brand": "TORRE",
      "sku": "",
      "status": "normal",
      "initials": "TB"
    },
    {
      "id": "p_12_25",
      "name": "TORRE BUJIA 5/8 ROSCA LARGA",
      "brand": "TORRE",
      "sku": "",
      "status": "normal",
      "initials": "TB"
    },
    {
      "id": "p_12_26",
      "name": "RELOJ TEMPERATURA 6P",
      "brand": "RELOJ",
      "sku": "",
      "status": "normal",
      "initials": "RT"
    },
    {
      "id": "p_12_27",
      "name": "RELOJ TRIPLE TEMP/ACEITE/BATERIA",
      "brand": "RELOJ",
      "sku": "",
      "status": "normal",
      "initials": "RT"
    },
    {
      "id": "p_12_28",
      "name": "MODULO ENCENDIDO DE FORD NIEHOFF",
      "brand": "MODULO",
      "sku": "",
      "status": "normal",
      "initials": "ME"
    },
    {
      "id": "p_12_29",
      "name": "CORNETA PITO PAR 4512-6 GP",
      "brand": "CORNETA",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_12_30",
      "name": "CORNETA PITO TIPO PLATO F1-160-P",
      "brand": "CORNETA",
      "sku": "",
      "status": "normal",
      "initials": "CP"
    },
    {
      "id": "p_12_31",
      "name": "CORNETA T-MERCEDEZ CROMADA MEGA SONY",
      "brand": "CORNETA",
      "sku": "",
      "status": "normal",
      "initials": "CT"
    },
    {
      "id": "p_12_32",
      "name": "BOMBA GASOLINA ELECTRICA TUBULAR",
      "brand": "BOMBA",
      "sku": "",
      "status": "normal",
      "initials": "BG"
    },
    {
      "id": "p_12_33",
      "name": "BOMBA GASOLINA CON RELAY EP-500",
      "brand": "BOMBA",
      "sku": "",
      "status": "normal",
      "initials": "BG"
    },
    {
      "id": "p_12_34",
      "name": "BOMBA GASOLINA ELECTRICA CUADRADA",
      "brand": "BOMBA",
      "sku": "",
      "status": "normal",
      "initials": "BG"
    },
    {
      "id": "p_12_35",
      "name": "BOMBA GASOLINA ELECTRICA NORMAL HEP-02A",
      "brand": "BOMBA",
      "sku": "",
      "status": "normal",
      "initials": "BG"
    },
    {
      "id": "p_12_36",
      "name": "PILA GASOLINA 5-12011 CRUCE",
      "brand": "PILA",
      "sku": "",
      "status": "normal",
      "initials": "PG"
    },
    {
      "id": "p_12_37",
      "name": "PILA GASOLINA 23220-0P010 TOYOTA",
      "brand": "PILA",
      "sku": "",
      "status": "normal",
      "initials": "PG"
    },
    {
      "id": "p_12_38",
      "name": "PILA GASOLINA DA15010A SILVERADO/CAMION",
      "brand": "PILA",
      "sku": "",
      "status": "normal",
      "initials": "PG"
    },
    {
      "id": "p_12_39",
      "name": "PILA GASOLINA S-12028 NISSAN VERSA MARCH",
      "brand": "PILA",
      "sku": "",
      "status": "normal",
      "initials": "PG"
    },
    {
      "id": "p_12_40",
      "name": "PILA GASOLINA S-12003 YARIS/KAVAK/4RUNNER",
      "brand": "PILA",
      "sku": "",
      "status": "normal",
      "initials": "PG"
    },
    {
      "id": "p_12_41",
      "name": "PILA GASOLINA 2068-SE UNIVERSAL AVE OPTR/SPAR/COR+ADITIVO",
      "brand": "PILA",
      "sku": "",
      "status": "normal",
      "initials": "PG"
    },
    {
      "id": "p_12_42",
      "name": "PILA GASOLINA CHEV BLAZER TBI",
      "brand": "PILA",
      "sku": "",
      "status": "normal",
      "initials": "PG"
    },
    {
      "id": "p_12_43",
      "name": "TAPA RADIADOR 1.1",
      "brand": "TAPA",
      "sku": "",
      "status": "normal",
      "initials": "TR"
    },
    {
      "id": "p_12_44",
      "name": "TAPA RADIADOR 0.9",
      "brand": "TAPA",
      "sku": "",
      "status": "normal",
      "initials": "TR"
    },
    {
      "id": "p_12_45",
      "name": "CRUCETA DE CARDAN CAMION 350 FORD",
      "brand": "CRUCETA",
      "sku": "",
      "status": "normal",
      "initials": "CD"
    },
    {
      "id": "p_12_46",
      "name": "CRUCETA UNIVERSAL REFORZADA ALLOY",
      "brand": "CRUCETA",
      "sku": "",
      "status": "normal",
      "initials": "CU"
    },
    {
      "id": "p_12_47",
      "name": "BENDIX ARRANQUE FORD BRONCO 10D (0520)",
      "brand": "BENDIX",
      "sku": "",
      "status": "normal",
      "initials": "BA"
    },
    {
      "id": "p_12_48",
      "name": "BENDIX ARRANQUE FIESTA FOCUS 1597",
      "brand": "BENDIX",
      "sku": "",
      "status": "normal",
      "initials": "BA"
    },
    {
      "id": "p_12_49",
      "name": "BENDIX ARRANQUE OPTRA/CORSA/AVEO 0770-S",
      "brand": "BENDIX",
      "sku": "",
      "status": "normal",
      "initials": "BA"
    },
    {
      "id": "p_12_50",
      "name": "BENDIX ARRANQUE TOROTA COROLLA NEW SENSATION 1547",
      "brand": "BENDIX",
      "sku": "",
      "status": "normal",
      "initials": "BA"
    },
    {
      "id": "p_12_51",
      "name": "SILICON GRIS 35 GR SUPER STRONGH",
      "brand": "SILICON",
      "sku": "",
      "status": "normal",
      "initials": "SG"
    },
    {
      "id": "p_12_52",
      "name": "SILICON GRIS 85 GR SUPER STRONGH",
      "brand": "SILICON",
      "sku": "",
      "status": "normal",
      "initials": "SG"
    },
    {
      "id": "p_12_53",
      "name": "SILICON GRIS POMO 85 GR MEGA GREY",
      "brand": "SILICON",
      "sku": "",
      "status": "normal",
      "initials": "SG"
    },
    {
      "id": "p_12_54",
      "name": "ACERO PLASTICO 3 TONELADAS GRIS GREY",
      "brand": "ACERO",
      "sku": "",
      "status": "normal",
      "initials": "AP"
    },
    {
      "id": "p_12_55",
      "name": "CUERO KAMEBO GRANDE",
      "brand": "CUERO",
      "sku": "",
      "status": "normal",
      "initials": "CK"
    },
    {
      "id": "p_12_56",
      "name": "CUERO KAMEBO PEQUEÑO",
      "brand": "CUERO",
      "sku": "",
      "status": "normal",
      "initials": "CK"
    },
    {
      "id": "p_12_57",
      "name": "SUPER PEGA 1000 SOLDADURA AL FRIO",
      "brand": "SUPER",
      "sku": "",
      "status": "normal",
      "initials": "SP"
    },
    {
      "id": "p_12_58",
      "name": "SOLDADURA EN FRIO 67/70 GR PEGA TAMKE/PEGAMIX",
      "brand": "SOLDADURA",
      "sku": "",
      "status": "normal",
      "initials": "SE"
    },
    {
      "id": "p_12_59",
      "name": "REMACHE ALUMINIO N° 66",
      "brand": "REMACHE",
      "sku": "",
      "status": "normal",
      "initials": "RA"
    },
    {
      "id": "p_12_60",
      "name": "REMACHE ALUMINIO N° 68",
      "brand": "REMACHE",
      "sku": "",
      "status": "normal",
      "initials": "RA"
    },
    {
      "id": "p_12_61",
      "name": "REMACHE ALUMINIO N° 58",
      "brand": "REMACHE",
      "sku": "",
      "status": "normal",
      "initials": "RA"
    },
    {
      "id": "p_12_62",
      "name": "TORNILLO DRYWALL 6-9X1.1/2",
      "brand": "TORNILLO",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_12_63",
      "name": "TORNILLO DRYWALL 6-9X1/4",
      "brand": "TORNILLO",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_12_64",
      "name": "TORNILLO DRYWALL 8-8X1-1/2",
      "brand": "TORNILLO",
      "sku": "",
      "status": "normal",
      "initials": "TD"
    },
    {
      "id": "p_12_65",
      "name": "TORNILLO AUTOROSC.+REMPLUG 12X1",
      "brand": "TORNILLO",
      "sku": "",
      "status": "normal",
      "initials": "TA"
    },
    {
      "id": "p_12_66",
      "name": "TORNILLO AUTOROSC.+REMPLUG 10X1",
      "brand": "TORNILLO",
      "sku": "",
      "status": "normal",
      "initials": "TA"
    },
    {
      "id": "p_12_67",
      "name": "TORNILLO AUTOROSC.+REMPLUG 8X1",
      "brand": "TORNILLO",
      "sku": "",
      "status": "normal",
      "initials": "TA"
    },
    {
      "id": "p_12_68",
      "name": "TORNILLO AUTOROSC.PAN PHILLIPS 12-14",
      "brand": "TORNILLO",
      "sku": "",
      "status": "normal",
      "initials": "TA"
    },
    {
      "id": "p_12_69",
      "name": "TORNILLO AUTOROSC.PAN PHILLIPS 12X2",
      "brand": "TORNILLO",
      "sku": "",
      "status": "normal",
      "initials": "TA"
    },
    {
      "id": "p_12_70",
      "name": "TORNILLO AUTOROSC.PAN PHILLIPS 8-18X1",
      "brand": "TORNILLO",
      "sku": "",
      "status": "normal",
      "initials": "TA"
    },
    {
      "id": "p_12_71",
      "name": "TORNILLO AUTOROSC.PAN PHILLIPS 10X2",
      "brand": "TORNILLO",
      "sku": "",
      "status": "normal",
      "initials": "TA"
    },
    {
      "id": "p_12_72",
      "name": "TORNILLO AUTOROSC.PAN PHILLIPS 10-16X1.1/2",
      "brand": "TORNILLO",
      "sku": "",
      "status": "normal",
      "initials": "TA"
    },
    {
      "id": "p_12_73",
      "name": "TORNILLO AUTOROSC.PAN PHILLIPS 10-16X1",
      "brand": "TORNILLO",
      "sku": "",
      "status": "normal",
      "initials": "TA"
    },
    {
      "id": "p_12_74",
      "name": "CEPILLO L/P BOOMERANG 14” WATERPOO",
      "brand": "CEPILLO",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_12_75",
      "name": "CEPILLO L/P BOOMERANG 16” WATERPOO",
      "brand": "CEPILLO",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_12_76",
      "name": "CEPILLO L/P BOOMERANG 18” WATERPOO",
      "brand": "CEPILLO",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_12_77",
      "name": "CEPILLO L/P BOOMERANG 19” WATERPOO",
      "brand": "CEPILLO",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_12_78",
      "name": "CEPILLO L/P BOOMERANG 20” WATERPOO",
      "brand": "CEPILLO",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_12_79",
      "name": "CEPILLO L/P BOOMERANG 21” WATERPOO",
      "brand": "CEPILLO",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_12_80",
      "name": "CEPILLO L/P BOOMERANG 22” WATERPOO",
      "brand": "CEPILLO",
      "sku": "",
      "status": "normal",
      "initials": "CL"
    },
    {
      "id": "p_12_81",
      "name": "CEPILLO BOOMERANG IBIZA 14”",
      "brand": "CEPILLO",
      "sku": "",
      "status": "normal",
      "initials": "CB"
    },
    {
      "id": "p_12_82",
      "name": "CEPILLO BOOMERANG IBIZA 18”",
      "brand": "CEPILLO",
      "sku": "",
      "status": "normal",
      "initials": "CB"
    },
    {
      "id": "p_12_83",
      "name": "CEPILLO BOOMERANG IBIZA 19”",
      "brand": "CEPILLO",
      "sku": "",
      "status": "normal",
      "initials": "CB"
    },
    {
      "id": "p_12_84",
      "name": "CEPILLO BOOMERANG IBIZA 21”",
      "brand": "CEPILLO",
      "sku": "",
      "status": "normal",
      "initials": "CB"
    },
    {
      "id": "p_12_85",
      "name": "ACEITE MINERAL 15W-40 VOLTEX",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_12_86",
      "name": "ACEITE MINERAL 20W-50 VOLTEX",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_12_87",
      "name": "ACEITE SEMISINTETICO 20W-50 VOLTEX",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AS"
    },
    {
      "id": "p_12_88",
      "name": "ACEITE SEMISINTETICO 15W-40 VOLTEX",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AS"
    },
    {
      "id": "p_12_89",
      "name": "ACEITE 2 TIEMPOS MOTO VOLTEX",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "A2"
    },
    {
      "id": "p_12_90",
      "name": "ACEITE HIDROMATICO DIII VOLTEX",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AH"
    },
    {
      "id": "p_12_91",
      "name": "ACEITE MINERAL 20W-50 4T MOTO VOLTEX",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_12_92",
      "name": "ACEITE SINTETICO 5-20 VOLTEX",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AS"
    },
    {
      "id": "p_12_93",
      "name": "ACEITE TRANSMICION SAE 85W-140 VOLTEX",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AT"
    },
    {
      "id": "p_12_94",
      "name": "ACEITE 15W-40 MINERAL BRAVA",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "A1"
    },
    {
      "id": "p_12_95",
      "name": "ACEITE TRANSMICION SAE 80W-90 VOLTEX",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AT"
    },
    {
      "id": "p_12_96",
      "name": "ACEITE SINTETICO 5W-30 VOLTEX",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AS"
    },
    {
      "id": "p_12_97",
      "name": "ACEITE 20W-50 MINERAL BRAVA",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "A2"
    },
    {
      "id": "p_12_98",
      "name": "ACEITE ATF DEX III BRAVA",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AA"
    },
    {
      "id": "p_12_99",
      "name": "PAILA DE ACEITE DIESEL 50 BRAVA OPTIMUN",
      "brand": "PAILA",
      "sku": "",
      "status": "normal",
      "initials": "PD"
    },
    {
      "id": "p_12_100",
      "name": "ACEITE 15W40 AURUM BRAVA SEMI SINTETICO",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "A1"
    },
    {
      "id": "p_12_101",
      "name": "ACEITE 20W50 AURUM BRAVA SEMI SINTETICO",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "A2"
    },
    {
      "id": "p_12_102",
      "name": "ACEITE 15W40 SEMI SINTETICO CASTROL",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "A1"
    },
    {
      "id": "p_12_103",
      "name": "ACEITE 20W50 SEMI SINTETICO CASTROL",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "A2"
    },
    {
      "id": "p_12_104",
      "name": "ACEITE DVI HIDROMATICO DIII CASTROL",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_12_105",
      "name": "ACEITE MINERAL 15W-40 CASTROL",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_12_106",
      "name": "ACEITE MINERAL 20W-50 CASTROL",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AM"
    },
    {
      "id": "p_12_107",
      "name": "ACEITE VALVULINA 140 CASTROL",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AV"
    },
    {
      "id": "p_12_108",
      "name": "ACEITE VALVULINA 85W-90 CASTROL",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AV"
    },
    {
      "id": "p_12_109",
      "name": "ACEITE 10W-30 SINTETICO CASTROL",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "A1"
    },
    {
      "id": "p_12_110",
      "name": "ACEITE 5W-20 SINTETICO CASTROL",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "A5"
    },
    {
      "id": "p_12_111",
      "name": "ACEITE DIESEL 50 HYUNDAI XTEER HD 3000 6LT",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    },
    {
      "id": "p_12_112",
      "name": "ACEITE 15W-40 6 LT HYUNDAI XTEER HD 7000",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "A1"
    },
    {
      "id": "p_12_113",
      "name": "ACEITE 20W-50 X-TRIM MINERAL SLYNG 3.785 LT",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "A2"
    },
    {
      "id": "p_12_114",
      "name": "ACEITE 2 TIEMPOS PARA MOTOR 946CM INCA",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "A2"
    },
    {
      "id": "p_12_115",
      "name": "ACEITE DEXRON VI INCA",
      "brand": "ACEITE",
      "sku": "",
      "status": "normal",
      "initials": "AD"
    }
  ]
};

export const mockOrders: OrderItem[] = [
  {
    "id": "o_1",
    "productName": "SALSA BBQ HEINZ 397 GR",
    "brand": "Heinz",
    "sku": "",
    "suggestedQty": 7,
    "unit": "und",
    "aisle": 4,
    "user": "Juan Pérez",
    "status": "bajo",
    "lastUpdated": "2026-06-09T17:52:49.275Z"
  },
  {
    "id": "o_2",
    "productName": "REFRESCO GOLDEN PIÑA 1LT",
    "brand": "Golden",
    "sku": "",
    "suggestedQty": 7,
    "unit": "und",
    "aisle": 8,
    "user": "María García",
    "status": "crítico",
    "lastUpdated": "2026-06-09T17:52:49.276Z"
  },
  {
    "id": "o_3",
    "productName": "COMEDERO ANTI-REFLUJOS",
    "brand": "COMEDERO",
    "sku": "",
    "suggestedQty": 23,
    "unit": "cajas",
    "aisle": 1,
    "user": "Omar (Admin)",
    "status": "bajo",
    "lastUpdated": "2026-06-09T17:52:49.276Z"
  }
];
