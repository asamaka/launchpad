export interface City {
  id: string;
  name: string;
  nameAr: string;
}

export interface CarCategory {
  id: string;
  name: string;
  description: string;
  maxPassengers: number;
  maxLuggage: number;
  petsAllowed: boolean;
  image: string;
  priceMultiplier: number;
}

export interface Route {
  from: string;
  to: string;
  basePrice: number;
  distanceKm: number;
  estimatedMinutes: number;
}

export interface BookingDetails {
  from: City;
  to: City;
  carCategory: CarCategory;
  passengers: number;
  luggage: number;
  hasPet: boolean;
  date: string;
  time: string;
  price: number;
}

export const cities: City[] = [
  { id: "cairo", name: "Cairo", nameAr: "القاهرة" },
  { id: "alexandria", name: "Alexandria", nameAr: "الإسكندرية" },
  { id: "giza", name: "Giza", nameAr: "الجيزة" },
  { id: "sharm", name: "Sharm El Sheikh", nameAr: "شرم الشيخ" },
  { id: "hurghada", name: "Hurghada", nameAr: "الغردقة" },
  { id: "luxor", name: "Luxor", nameAr: "الأقصر" },
  { id: "aswan", name: "Aswan", nameAr: "أسوان" },
  { id: "mansoura", name: "Mansoura", nameAr: "المنصورة" },
  { id: "tanta", name: "Tanta", nameAr: "طنطا" },
  { id: "ismailia", name: "Ismailia", nameAr: "الإسماعيلية" },
  { id: "portSaid", name: "Port Said", nameAr: "بورسعيد" },
  { id: "suez", name: "Suez", nameAr: "السويس" },
  { id: "fayoum", name: "Fayoum", nameAr: "الفيوم" },
  { id: "ainSokhna", name: "Ain Sokhna", nameAr: "العين السخنة" },
  { id: "marsa", name: "Marsa Matrouh", nameAr: "مرسى مطروح" },
  { id: "dahab", name: "Dahab", nameAr: "دهب" },
  { id: "gouna", name: "El Gouna", nameAr: "الجونة" },
  { id: "newCairo", name: "New Cairo", nameAr: "القاهرة الجديدة" },
  { id: "6october", name: "6th of October", nameAr: "السادس من أكتوبر" },
  { id: "newAlamein", name: "New Alamein", nameAr: "العلمين الجديدة" },
];

export const carCategories: CarCategory[] = [
  {
    id: "economy",
    name: "Economy",
    description: "Comfortable sedan for budget-friendly travel",
    maxPassengers: 3,
    maxLuggage: 2,
    petsAllowed: false,
    image: "🚗",
    priceMultiplier: 1.0,
  },
  {
    id: "business",
    name: "Business",
    description: "Premium sedan with leather seats and extra legroom",
    maxPassengers: 3,
    maxLuggage: 3,
    petsAllowed: false,
    image: "🚘",
    priceMultiplier: 1.5,
  },
  {
    id: "firstClass",
    name: "First Class",
    description: "Luxury vehicle with premium amenities and refreshments",
    maxPassengers: 3,
    maxLuggage: 3,
    petsAllowed: true,
    image: "🏎️",
    priceMultiplier: 2.2,
  },
  {
    id: "suv",
    name: "SUV",
    description: "Spacious SUV perfect for families and groups",
    maxPassengers: 6,
    maxLuggage: 5,
    petsAllowed: true,
    image: "🚙",
    priceMultiplier: 1.8,
  },
  {
    id: "van",
    name: "VIP Van",
    description: "Luxury van with captain seats for ultimate comfort",
    maxPassengers: 7,
    maxLuggage: 7,
    petsAllowed: true,
    image: "🚐",
    priceMultiplier: 2.5,
  },
  {
    id: "sprinter",
    name: "Sprinter",
    description: "Mercedes Sprinter for large groups and events",
    maxPassengers: 12,
    maxLuggage: 12,
    petsAllowed: true,
    image: "🚌",
    priceMultiplier: 3.5,
  },
];

const routeMatrix: Record<string, Record<string, { basePrice: number; distanceKm: number; estimatedMinutes: number }>> = {
  cairo: {
    alexandria: { basePrice: 2500, distanceKm: 220, estimatedMinutes: 165 },
    giza: { basePrice: 350, distanceKm: 20, estimatedMinutes: 35 },
    sharm: { basePrice: 4500, distanceKm: 480, estimatedMinutes: 360 },
    hurghada: { basePrice: 5000, distanceKm: 460, estimatedMinutes: 330 },
    luxor: { basePrice: 6500, distanceKm: 660, estimatedMinutes: 480 },
    aswan: { basePrice: 8000, distanceKm: 880, estimatedMinutes: 600 },
    mansoura: { basePrice: 1800, distanceKm: 130, estimatedMinutes: 120 },
    tanta: { basePrice: 1200, distanceKm: 94, estimatedMinutes: 90 },
    ismailia: { basePrice: 1500, distanceKm: 130, estimatedMinutes: 105 },
    portSaid: { basePrice: 2200, distanceKm: 220, estimatedMinutes: 150 },
    suez: { basePrice: 1400, distanceKm: 134, estimatedMinutes: 100 },
    fayoum: { basePrice: 1200, distanceKm: 100, estimatedMinutes: 90 },
    ainSokhna: { basePrice: 1500, distanceKm: 130, estimatedMinutes: 100 },
    marsa: { basePrice: 5500, distanceKm: 490, estimatedMinutes: 360 },
    dahab: { basePrice: 5000, distanceKm: 530, estimatedMinutes: 390 },
    gouna: { basePrice: 5200, distanceKm: 470, estimatedMinutes: 340 },
    newCairo: { basePrice: 300, distanceKm: 15, estimatedMinutes: 25 },
    "6october": { basePrice: 400, distanceKm: 30, estimatedMinutes: 40 },
    newAlamein: { basePrice: 3500, distanceKm: 300, estimatedMinutes: 210 },
  },
  alexandria: {
    marsa: { basePrice: 3500, distanceKm: 290, estimatedMinutes: 210 },
    tanta: { basePrice: 1500, distanceKm: 120, estimatedMinutes: 90 },
    mansoura: { basePrice: 2500, distanceKm: 200, estimatedMinutes: 150 },
    newAlamein: { basePrice: 1800, distanceKm: 107, estimatedMinutes: 90 },
  },
  sharm: {
    dahab: { basePrice: 1200, distanceKm: 90, estimatedMinutes: 60 },
    hurghada: { basePrice: 3500, distanceKm: 320, estimatedMinutes: 260 },
  },
  hurghada: {
    luxor: { basePrice: 3000, distanceKm: 280, estimatedMinutes: 210 },
    gouna: { basePrice: 400, distanceKm: 25, estimatedMinutes: 20 },
  },
  luxor: {
    aswan: { basePrice: 2500, distanceKm: 240, estimatedMinutes: 180 },
  },
  newCairo: {
    ainSokhna: { basePrice: 1200, distanceKm: 110, estimatedMinutes: 80 },
    suez: { basePrice: 1300, distanceKm: 120, estimatedMinutes: 90 },
  },
};

export function getRouteInfo(
  fromId: string,
  toId: string
): { basePrice: number; distanceKm: number; estimatedMinutes: number } | null {
  if (fromId === toId) return null;

  const forward = routeMatrix[fromId]?.[toId];
  if (forward) return forward;

  const reverse = routeMatrix[toId]?.[fromId];
  if (reverse) return reverse;

  const fromCity = cities.find((c) => c.id === fromId);
  const toCity = cities.find((c) => c.id === toId);
  if (!fromCity || !toCity) return null;

  const estimatedDistance = 300;
  return {
    basePrice: Math.round(estimatedDistance * 12),
    distanceKm: estimatedDistance,
    estimatedMinutes: Math.round(estimatedDistance * 0.8),
  };
}

export function calculatePrice(
  fromId: string,
  toId: string,
  categoryId: string,
  hasPet: boolean
): number | null {
  const route = getRouteInfo(fromId, toId);
  if (!route) return null;

  const category = carCategories.find((c) => c.id === categoryId);
  if (!category) return null;

  let price = route.basePrice * category.priceMultiplier;

  if (hasPet) {
    price += 200;
  }

  return Math.round(price / 50) * 50;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-EG", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}
