import { HueFitSelection } from "@/types";
import { getGarmentRegions } from "@/data/garmentRegions";

// ── Color naming ──────────────────────────────────────────────────────────────
function hexToColorName(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (l > 230) return "crisp white";
  if (l < 25)  return "jet black";
  if (l < 50)  return "very dark charcoal";

  const sat = max === min ? 0 : (max - min) / (l > 127 ? 510 - max - min : max + min);
  if (sat < 0.08) {
    if (l < 80)  return "dark charcoal grey";
    if (l < 140) return "medium grey";
    if (l < 200) return "light grey";
    return "light silver grey";
  }

  const h = (() => {
    if (max === min) return 0;
    let h = 0;
    if (max === r)      h = ((g - b) / (max - min) + 6) % 6;
    else if (max === g) h = (b - r) / (max - min) + 2;
    else                h = (r - g) / (max - min) + 4;
    return h * 60;
  })();

  const pre = l > 180 ? "light " : l < 70 ? "deep " : l < 110 ? "dark " : "";
  if (h < 15 || h >= 345) return `${pre}red`.trim();
  if (h < 30)  return `${pre}red-orange`.trim();
  if (h < 45)  return `${pre}orange`.trim();
  if (h < 65)  return `${pre}amber`.trim();
  if (h < 80)  return `${pre}golden yellow`.trim();
  if (h < 100) return `${pre}yellow-green`.trim();
  if (h < 140) return `${pre}green`.trim();
  if (h < 160) return `${pre}teal green`.trim();
  if (h < 185) return `${pre}teal`.trim();
  if (h < 215) return `${pre}sky blue`.trim();
  if (h < 245) return `${pre}blue`.trim();
  if (h < 265) return `${pre}indigo`.trim();
  if (h < 285) return `${pre}violet`.trim();
  if (h < 310) return `${pre}purple`.trim();
  if (h < 330) return `${pre}magenta`.trim();
  return `${pre}rose`.trim();
}

// ── Per-template garment description ─────────────────────────────────────────
function getOutfitDescription(templateId: string, outfitName: string): string {
  const map: Record<string, string> = {
    formal_m01: "a crisp formal dress shirt with a spread collar and long sleeves, paired with well-tailored formal trousers showing a sharp centre crease, and polished leather oxford dress shoes",
    formal_m02: "a structured single-breasted blazer with notch lapels and a pocket square, over a pressed dress shirt, paired with tailored trousers with a sharp crease and leather oxford shoes",
    formal_m03: "a formal dress shirt with a fitted five-button waistcoat showing welted pockets and a back strap, paired with tailored trousers and leather brogues",
    formal_f01: "a silk formal blouse with a relaxed neckline and long sleeves, paired with high-waist tailored trousers and pointed-toe heels",
    formal_f02: "a structured blazer with padded shoulders and peak lapels over a formal blouse, paired with tailored trousers and pointed-toe heels",
    formal_f03: "an elegant knee-length formal midi dress with a fitted bodice, subtle A-line silhouette, and pointed-toe block heels",
    casual_m01: "a clean crew-neck cotton t-shirt with minimal graphics, slim-fit jeans with faint stitching and slight distressing at the knee, and white leather low-top sneakers",
    casual_m02: "a piqué polo shirt with ribbed collar and two-button placket, slim-fit chino trousers with a slight taper, and clean leather loafers",
    casual_m03: "an open linen overshirt layered over a plain fitted t-shirt, relaxed-fit trousers, and canvas sneakers",
    casual_f01: "a fitted crew-neck cotton t-shirt, slim-fit jeans with subtle distressing and rolled cuffs, and clean white leather sneakers",
    casual_f02: "a relaxed linen blouse with a V-neckline and soft draping, wide-leg casual trousers with a paper-bag waist, and flat strappy sandals",
    casual_f03: "a flowing cotton midi dress with a relaxed fit, subtle floral or striped pattern, and flat slide sandals",
    ethnic_m01: "a traditional white cotton veshti with a gold zari border neatly wrapped around the waist and tucked, paired with a formal crisp cotton shirt with front placket and kolhapuri leather sandals",
    ethnic_m02: "a long collarless kurta with intricate border embroidery at the hem and cuffs, paired with a traditional white veshti with gold zari border draped properly, and ethnic leather jutis",
    ethnic_m03: "a traditional dhoti with thick gold zari border worn in the traditional style, paired with a formal cotton shirt with front placket and kolhapuri sandals",
    ethnic_f01: "a traditional South Indian Kanjivaram silk saree with a richly embroidered pallu draped over the shoulder and pleated at the front, a matching short-sleeved silk blouse with gold border, and gold temple jewellery",
    ethnic_f02: "a fitted salwar kameez with embroidered neckline and three-quarter sleeves, straight-cut salwar trousers, a dupatta draped across the shoulder, and mojari embroidered flats",
    ethnic_f03: "a pavadai dhavani with a pleated silk pavadai skirt and a dhavani fabric draped diagonally across, a fitted blouse with embroidered borders, and flat ethnic sandals",
    party_m01: "a slim-fit party blazer with a satin lapel over a plain satin shirt, coordinated slim trousers, and leather dressy loafers",
    party_m02: "a richly textured or patterned statement dress shirt with French cuffs and cufflinks, tailored slim trousers, and leather derby shoes",
    party_m03: "an embroidered silk kurta with Mandarin collar and tone-on-tone embroidery, paired with slim tailored trousers and a short Nehru jacket in matching fabric, and embroidered jutis",
    party_f01: "an elegant velvet or satin knee-length midi dress with a fitted wrap bodice, subtle flare, and strappy stiletto heels",
    party_f02: "a luxurious sequinned or embellished statement blouse with plunging neckline, matching wide-leg flowing trousers, and strappy heeled sandals",
    party_f03: "a contemporary silk georgette saree with a heavily embroidered scalloped border and statement pallu, paired with a sleeveless designer blouse and stiletto heels",
    suit_m01: "a sharp single-breasted two-piece suit with notch lapels, a matching jacket and trousers, a white dress shirt, a silk tie with a Windsor knot, and leather oxford shoes",
    suit_m02: "a classic three-piece suit with a single-breasted jacket, a button-front waistcoat, matching trousers, a white dress shirt, silk tie, and leather cap-toe dress shoes",
    suit_m03: "a double-breasted six-button suit with peak lapels, matching trousers, a white dress shirt, a silk pocket square, and leather derby shoes",
    suit_f01: "a tailored women's two-piece suit with a structured single-breasted jacket, high-waist matching trousers, a silk blouse underneath, and pointed-toe heels",
    suit_f02: "a women's three-piece suit with a structured jacket, a fitted waistcoat, matching high-waist trousers, a blouse underneath, and block-heel pointed-toe shoes",
    suit_f03: "a classic skirt suit with a structured single-breasted blazer, a matching knee-length pencil skirt, a silk blouse, and pointed-toe stiletto heels",
  };
  return map[templateId] ?? `${outfitName} with realistic garment construction, proper seams, fabric texture, and natural draping`;
}

// ── Main prompt builder ───────────────────────────────────────────────────────
export function buildOutfitPrompt(selection: HueFitSelection): string {
  const regions = getGarmentRegions(selection.template_id);
  const colors  = selection.color_palette.colors;

  let colorInstructions = "";
  if (regions && regions.regions && regions.regions.length > 0) {
    colorInstructions = regions.regions.map((region) => {
      const idx   = Math.min(region.colorIndex, colors.length - 1);
      const color = colors[idx] ?? colors[0];
      return `${region.label}: ${hexToColorName(color)} (HEX ${color})`;
    }).join("\n");
  } else {
    const c1 = colors[0] ? `${hexToColorName(colors[0])} (${colors[0]})` : "navy blue";
    const c2 = colors[1] ? `${hexToColorName(colors[1])} (${colors[1]})` : "charcoal grey";
    colorInstructions = `Primary garment colour: ${c1}\nSecondary garment colour: ${c2}`;
  }

  const gender       = selection.gender === "male" ? "male" : "female";
  const skinToneHex  = selection.skin_tone.selected_hex;
  const skinToneName = selection.skin_tone.label;
  const outfit       = getOutfitDescription(selection.template_id, selection.outfit_name);

  return `Create a premium fashion lookbook photograph.

SUBJECT:
A completely FACELESS, FEATURELESS fashion mannequin.

The mannequin MUST have:
- Realistic human body proportions
- Smooth, featureless head — absolutely no eyes, no nose, no mouth, no hair, no ears, no facial expression
- Realistic ${gender} torso, arms, hands, legs, and feet
- A physical mannequin material with a subtle ${skinToneName} tone (reference ${skinToneHex}) — matte, slightly warm, realistic mannequin surface
- The mannequin should look like a high-end physical shop display mannequin photographed in a studio

THE MANNEQUIN IS NOT A CARTOON. NOT AN ILLUSTRATION. NOT A HUMAN FACE. NOT A GAME CHARACTER.

OUTFIT — "${selection.outfit_name.toUpperCase()}":
The mannequin is wearing: ${outfit}.

This outfit MUST be physically present on the mannequin.
The clothing is NOT painted on — it is garments actually worn.

COLOUR INSTRUCTIONS (apply precisely):
${colorInstructions}

These exact colours MUST appear on the clothing.
The colours are on the garments, NOT the background.

GARMENT REALISM (critical):
- Realistic fabric texture appropriate to the garment (silk, cotton, wool, linen, velvet)
- Visible and realistic seams, stitching, hemlines
- Natural fabric fold and drape under gravity
- Properly fitted — not baggy, not skin-tight
- Realistic closures: buttons, zippers, hooks as appropriate
- All specified garment elements visible: collars, lapels, cuffs, waistbands, pockets
- Shoes or footwear clearly visible and appropriate to the outfit

PHOTOGRAPHY STYLE:
- Professional high-end fashion lookbook studio
- Full body from head to feet — do NOT crop below the knees
- Front-facing, upright natural fashion pose
- Soft directional studio lighting with a subtle ground shadow
- Clean seamless neutral background — warm ivory, light beige, or pure white
- Sharp focus from head to toe
- Photorealistic rendering quality
- The result should look like a photograph from a luxury fashion brand catalogue

ABSOLUTELY DO NOT:
- No human face, eyes, nose, mouth, or hair on the mannequin
- No cartoon style
- No flat 2D illustration
- No vector art
- No sketch
- No coloured blocks representing clothing
- No missing feet or legs
- No cropping above the ankles
- No text, logos, watermarks
- No distorted hands
- No extra limbs
- No background patterns or props`;
}
