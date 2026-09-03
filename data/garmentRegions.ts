import { GarmentRegionMapping } from "@/types";

export const garmentRegions: GarmentRegionMapping[] = [
  // FORMAL MALE
  { template: "formal_m01", regions: [
    { name: "shirt", label: "Shirt", colorIndex: 0 },
    { name: "trousers", label: "Trousers", colorIndex: 1 },
  ]},
  { template: "formal_m02", regions: [
    { name: "blazer", label: "Blazer", colorIndex: 0 },
    { name: "shirt", label: "Shirt", colorIndex: 1 },
    { name: "trousers", label: "Trousers", colorIndex: 2 },
  ]},
  { template: "formal_m03", regions: [
    { name: "shirt", label: "Shirt", colorIndex: 1 },
    { name: "waistcoat", label: "Waistcoat", colorIndex: 0 },
    { name: "trousers", label: "Trousers", colorIndex: 2 },
  ]},
  // FORMAL FEMALE
  { template: "formal_f01", regions: [
    { name: "blouse", label: "Blouse", colorIndex: 0 },
    { name: "trousers", label: "Trousers", colorIndex: 1 },
  ]},
  { template: "formal_f02", regions: [
    { name: "blazer", label: "Blazer", colorIndex: 0 },
    { name: "blouse", label: "Blouse", colorIndex: 1 },
    { name: "trousers", label: "Trousers", colorIndex: 2 },
  ]},
  { template: "formal_f03", regions: [
    { name: "dress", label: "Dress", colorIndex: 0 },
  ]},
  // CASUAL MALE
  { template: "casual_m01", regions: [
    { name: "tshirt", label: "T-Shirt", colorIndex: 0 },
    { name: "jeans", label: "Jeans", colorIndex: 1 },
  ]},
  { template: "casual_m02", regions: [
    { name: "polo", label: "Polo Shirt", colorIndex: 0 },
    { name: "chinos", label: "Chinos", colorIndex: 1 },
  ]},
  { template: "casual_m03", regions: [
    { name: "overshirt", label: "Overshirt", colorIndex: 0 },
    { name: "tshirt", label: "T-Shirt", colorIndex: 1 },
    { name: "trousers", label: "Trousers", colorIndex: 2 },
  ]},
  // CASUAL FEMALE
  { template: "casual_f01", regions: [
    { name: "tshirt", label: "T-Shirt", colorIndex: 0 },
    { name: "jeans", label: "Jeans", colorIndex: 1 },
  ]},
  { template: "casual_f02", regions: [
    { name: "blouse", label: "Blouse", colorIndex: 0 },
    { name: "trousers", label: "Trousers", colorIndex: 1 },
  ]},
  { template: "casual_f03", regions: [
    { name: "dress", label: "Dress", colorIndex: 0 },
  ]},
  // ETHNIC MALE
  { template: "ethnic_m01", regions: [
    { name: "shirt", label: "Shirt", colorIndex: 0 },
    { name: "veshti", label: "Veshti", colorIndex: 1 },
  ]},
  { template: "ethnic_m02", regions: [
    { name: "kurta", label: "Kurta", colorIndex: 0 },
    { name: "veshti", label: "Veshti", colorIndex: 1 },
  ]},
  { template: "ethnic_m03", regions: [
    { name: "shirt", label: "Shirt", colorIndex: 0 },
    { name: "dhoti", label: "Dhoti", colorIndex: 1 },
  ]},
  // ETHNIC FEMALE
  { template: "ethnic_f01", regions: [
    { name: "saree_body", label: "Saree Body", colorIndex: 0 },
    { name: "saree_border", label: "Saree Border", colorIndex: 1 },
    { name: "blouse", label: "Blouse", colorIndex: 2 },
  ]},
  { template: "ethnic_f02", regions: [
    { name: "kameez", label: "Kameez", colorIndex: 0 },
    { name: "salwar", label: "Salwar", colorIndex: 1 },
    { name: "dupatta", label: "Dupatta", colorIndex: 2 },
  ]},
  { template: "ethnic_f03", regions: [
    { name: "pavadai", label: "Pavadai", colorIndex: 0 },
    { name: "dhavani", label: "Dhavani", colorIndex: 1 },
  ]},
  // PARTY MALE
  { template: "party_m01", regions: [
    { name: "blazer", label: "Blazer", colorIndex: 0 },
    { name: "shirt", label: "Shirt", colorIndex: 1 },
    { name: "trousers", label: "Trousers", colorIndex: 2 },
  ]},
  { template: "party_m02", regions: [
    { name: "shirt", label: "Statement Shirt", colorIndex: 0 },
    { name: "trousers", label: "Trousers", colorIndex: 1 },
  ]},
  { template: "party_m03", regions: [
    { name: "kurta", label: "Kurta", colorIndex: 0 },
    { name: "jacket", label: "Jacket", colorIndex: 1 },
    { name: "trousers", label: "Trousers", colorIndex: 2 },
  ]},
  // PARTY FEMALE
  { template: "party_f01", regions: [
    { name: "dress", label: "Dress", colorIndex: 0 },
  ]},
  { template: "party_f02", regions: [
    { name: "blouse", label: "Blouse", colorIndex: 0 },
    { name: "trousers", label: "Wide-Leg Trousers", colorIndex: 1 },
  ]},
  { template: "party_f03", regions: [
    { name: "saree_body", label: "Saree Body", colorIndex: 0 },
    { name: "saree_border", label: "Saree Border", colorIndex: 1 },
    { name: "blouse", label: "Blouse", colorIndex: 2 },
  ]},
  // SUITS MALE
  { template: "suit_m01", regions: [
    { name: "jacket", label: "Jacket", colorIndex: 0 },
    { name: "shirt", label: "Shirt", colorIndex: 1 },
    { name: "trousers", label: "Trousers", colorIndex: 0 },
  ]},
  { template: "suit_m02", regions: [
    { name: "jacket", label: "Jacket", colorIndex: 0 },
    { name: "waistcoat", label: "Waistcoat", colorIndex: 2 },
    { name: "shirt", label: "Shirt", colorIndex: 1 },
    { name: "trousers", label: "Trousers", colorIndex: 0 },
  ]},
  { template: "suit_m03", regions: [
    { name: "jacket", label: "Jacket", colorIndex: 0 },
    { name: "shirt", label: "Shirt", colorIndex: 1 },
    { name: "trousers", label: "Trousers", colorIndex: 0 },
  ]},
  // SUITS FEMALE
  { template: "suit_f01", regions: [
    { name: "jacket", label: "Jacket", colorIndex: 0 },
    { name: "blouse", label: "Blouse", colorIndex: 1 },
    { name: "trousers", label: "Trousers", colorIndex: 0 },
  ]},
  { template: "suit_f02", regions: [
    { name: "jacket", label: "Jacket", colorIndex: 0 },
    { name: "waistcoat", label: "Waistcoat", colorIndex: 2 },
    { name: "blouse", label: "Blouse", colorIndex: 1 },
    { name: "trousers", label: "Trousers", colorIndex: 0 },
  ]},
  { template: "suit_f03", regions: [
    { name: "jacket", label: "Jacket", colorIndex: 0 },
    { name: "blouse", label: "Blouse", colorIndex: 1 },
    { name: "skirt", label: "Skirt", colorIndex: 0 },
  ]},
];

export function getGarmentRegions(template: string): GarmentRegionMapping | undefined {
  return garmentRegions.find((g) => g.template === template);
}
