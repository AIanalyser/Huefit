import { Outfit, Gender, OutfitCategory } from "@/types";

export const outfits: Outfit[] = [
  // FORMAL
  { id: "FORMAL_M01", gender: "male", category: "formal", name: "Classic Formal Shirt & Trousers", dressType: "shirt_trousers", template: "formal_m01" },
  { id: "FORMAL_M02", gender: "male", category: "formal", name: "Formal Blazer & Trousers", dressType: "blazer_shirt_trousers", template: "formal_m02" },
  { id: "FORMAL_M03", gender: "male", category: "formal", name: "Formal Waistcoat Set", dressType: "shirt_waistcoat_trousers", template: "formal_m03" },
  { id: "FORMAL_F01", gender: "female", category: "formal", name: "Formal Blouse & Trousers", dressType: "blouse_trousers", template: "formal_f01" },
  { id: "FORMAL_F02", gender: "female", category: "formal", name: "Formal Blazer & Trousers", dressType: "blazer_blouse_trousers", template: "formal_f02" },
  { id: "FORMAL_F03", gender: "female", category: "formal", name: "Formal Midi Dress", dressType: "midi_dress", template: "formal_f03" },
  // CASUAL
  { id: "CASUAL_M01", gender: "male", category: "casual", name: "Classic T-Shirt & Jeans", dressType: "tshirt_jeans", template: "casual_m01" },
  { id: "CASUAL_M02", gender: "male", category: "casual", name: "Polo Shirt & Chinos", dressType: "polo_chinos", template: "casual_m02" },
  { id: "CASUAL_M03", gender: "male", category: "casual", name: "Casual Overshirt Layer", dressType: "overshirt_tshirt_trousers", template: "casual_m03" },
  { id: "CASUAL_F01", gender: "female", category: "casual", name: "Classic T-Shirt & Jeans", dressType: "tshirt_jeans", template: "casual_f01" },
  { id: "CASUAL_F02", gender: "female", category: "casual", name: "Casual Blouse & Trousers", dressType: "blouse_trousers", template: "casual_f02" },
  { id: "CASUAL_F03", gender: "female", category: "casual", name: "Casual Midi Dress", dressType: "midi_dress", template: "casual_f03" },
  // ETHNIC
  { id: "ETHNIC_M01", gender: "male", category: "ethnic", name: "Veshti & Traditional Shirt", dressType: "veshti_shirt", template: "ethnic_m01" },
  { id: "ETHNIC_M02", gender: "male", category: "ethnic", name: "Kurta & Veshti", dressType: "kurta_veshti", template: "ethnic_m02" },
  { id: "ETHNIC_M03", gender: "male", category: "ethnic", name: "Tamil Traditional Dhoti Set", dressType: "traditional_shirt_dhoti", template: "ethnic_m03" },
  { id: "ETHNIC_F01", gender: "female", category: "ethnic", name: "Traditional South Indian Saree", dressType: "saree", template: "ethnic_f01" },
  { id: "ETHNIC_F02", gender: "female", category: "ethnic", name: "Traditional Salwar Kameez", dressType: "salwar_kameez", template: "ethnic_f02" },
  { id: "ETHNIC_F03", gender: "female", category: "ethnic", name: "Pavadai Dhavani", dressType: "pavadai_dhavani", template: "ethnic_f03" },
  // PARTY
  { id: "PARTY_M01", gender: "male", category: "party", name: "Party Blazer & Trousers", dressType: "blazer_shirt_trousers", template: "party_m01" },
  { id: "PARTY_M02", gender: "male", category: "party", name: "Statement Shirt & Trousers", dressType: "statement_shirt_trousers", template: "party_m02" },
  { id: "PARTY_M03", gender: "male", category: "party", name: "Ethnic Fusion Party Set", dressType: "kurta_trousers_jacket", template: "party_m03" },
  { id: "PARTY_F01", gender: "female", category: "party", name: "Elegant Midi Dress", dressType: "midi_dress", template: "party_f01" },
  { id: "PARTY_F02", gender: "female", category: "party", name: "Statement Blouse & Wide-Leg Trousers", dressType: "blouse_wide_leg_trousers", template: "party_f02" },
  { id: "PARTY_F03", gender: "female", category: "party", name: "Contemporary Party Saree", dressType: "party_saree", template: "party_f03" },
  // SUITS
  { id: "SUIT_M01", gender: "male", category: "suits", name: "Classic Two-Piece Suit", dressType: "two_piece_suit", template: "suit_m01" },
  { id: "SUIT_M02", gender: "male", category: "suits", name: "Classic Three-Piece Suit", dressType: "three_piece_suit", template: "suit_m02" },
  { id: "SUIT_M03", gender: "male", category: "suits", name: "Double-Breasted Suit", dressType: "double_breasted_suit", template: "suit_m03" },
  { id: "SUIT_F01", gender: "female", category: "suits", name: "Classic Women's Two-Piece Suit", dressType: "womens_two_piece_suit", template: "suit_f01" },
  { id: "SUIT_F02", gender: "female", category: "suits", name: "Women's Three-Piece Suit", dressType: "womens_three_piece_suit", template: "suit_f02" },
  { id: "SUIT_F03", gender: "female", category: "suits", name: "Classic Skirt Suit", dressType: "skirt_suit", template: "suit_f03" },
];

export function getOutfits(gender: Gender, category: OutfitCategory): Outfit[] {
  return outfits.filter((o) => o.gender === gender && o.category === category);
}

export function getOutfitById(id: string): Outfit | undefined {
  return outfits.find((o) => o.id === id);
}

export function getCategories(): { id: OutfitCategory; label: string; description: string; icon: string }[] {
  return [
    { id: "formal", label: "Formal", description: "Professional and polished outfits.", icon: "briefcase" },
    { id: "casual", label: "Casual", description: "Relaxed everyday styles.", icon: "shirt" },
    { id: "ethnic", label: "Ethnic", description: "Traditional and culturally inspired styles.", icon: "sparkles" },
    { id: "party", label: "Party / Special Occasion", description: "Statement looks for celebrations and events.", icon: "party-popper" },
    { id: "suits", label: "Suits", description: "Structured and sophisticated tailoring.", icon: "crown" },
  ];
}
