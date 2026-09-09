import { HueFitSelection } from "@/types";
import { getGarmentRegions } from "@/data/garmentRegions";

// ── Color naming ──────────────────────────────────────────────────────────────
function hexToColorName(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (l > 230) return "crisp white";
  if (l < 25) return "jet black";
  if (l < 50) return "very dark charcoal";

  const sat =
    max === min
      ? 0
      : (max - min) / (l > 127 ? 510 - max - min : max + min);

  if (sat < 0.08) {
    if (l < 80) return "dark charcoal grey";
    if (l < 140) return "medium grey";
    if (l < 200) return "light grey";
    return "light silver grey";
  }

  const h = (() => {
    if (max === min) return 0;

    let h = 0;

    if (max === r) {
      h = ((g - b) / (max - min) + 6) % 6;
    } else if (max === g) {
      h = (b - r) / (max - min) + 2;
    } else {
      h = (r - g) / (max - min) + 4;
    }

    return h * 60;
  })();

  const pre =
    l > 180 ? "light " :
    l < 70 ? "deep " :
    l < 110 ? "dark " :
    "";

  if (h < 15 || h >= 345) return `${pre}red`.trim();
  if (h < 30) return `${pre}red-orange`.trim();
  if (h < 45) return `${pre}orange`.trim();
  if (h < 65) return `${pre}amber`.trim();
  if (h < 80) return `${pre}golden yellow`.trim();
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

// ── Per-template garment structure description ────────────────────────────────
// These descriptions describe the garment construction only.
// The supplied dataset image remains the visual authority.
function getOutfitDescription(
  templateId: string,
  outfitName: string
): string {
  const map: Record<string, string> = {
    formal_m01:
      "a crisp formal dress shirt with a spread collar and long sleeves, paired with well-tailored formal trousers with a sharp centre crease",

    formal_m02:
      "a structured single-breasted blazer with notch lapels and a pocket square, worn over a pressed dress shirt, paired with tailored trousers with a sharp crease",

    formal_m03:
      "a formal dress shirt with a fitted five-button waistcoat with welted pockets and a back strap, paired with tailored trousers",

    formal_f01:
      "a formal blouse with a relaxed neckline and long sleeves, paired with high-waist tailored trousers",

    formal_f02:
      "a structured blazer with padded shoulders and peak lapels over a formal blouse, paired with tailored trousers",

    formal_f03:
      "an elegant knee-length formal midi dress with a fitted bodice and subtle A-line silhouette",

    casual_m01:
      "a clean crew-neck cotton t-shirt, paired with slim-fit jeans with faint stitching and slight distressing at the knee",

    casual_m02:
      "a piqué polo shirt with ribbed collar and two-button placket, paired with slim-fit chino trousers with a slight taper",

    casual_m03:
      "an open linen overshirt layered over a plain fitted t-shirt, paired with relaxed-fit trousers",

    casual_f01:
      "a fitted crew-neck cotton t-shirt paired with slim-fit jeans with subtle distressing and rolled cuffs",

    casual_f02:
      "a relaxed linen blouse with a V-neckline and soft draping, paired with wide-leg casual trousers with a paper-bag waist",

    casual_f03:
      "a flowing cotton midi dress with a relaxed fit",

    ethnic_m01:
      "a traditional cotton veshti neatly wrapped around the waist and tucked, paired with a crisp formal cotton shirt",

    ethnic_m02:
      "a long collarless kurta with border embroidery at the hem and cuffs, paired with a traditional veshti draped properly",

    ethnic_m03:
      "a traditional dhoti worn in the traditional style, paired with a formal cotton shirt",

    ethnic_f01:
      "a traditional South Indian Kanjivaram-style saree with an embroidered pallu draped over the shoulder and pleated at the front, paired with a matching short-sleeved blouse",

    ethnic_f02:
      "a fitted salwar kameez with embroidered neckline and three-quarter sleeves, straight-cut salwar trousers, and a dupatta draped across the shoulder",

    ethnic_f03:
      "a pavadai dhavani with a pleated pavadai skirt and dhavani fabric draped diagonally across, paired with a fitted blouse with embroidered borders",

    party_m01:
      "a slim-fit party blazer with a satin lapel worn over a plain satin shirt, paired with coordinated slim trousers",

    party_m02:
      "a richly textured or patterned statement dress shirt with French cuffs and cufflinks, paired with tailored slim trousers",

    party_m03:
      "an embroidered silk kurta with Mandarin collar and tone-on-tone embroidery, paired with slim tailored trousers and a short Nehru jacket",

    party_f01:
      "an elegant velvet or satin knee-length midi dress with a fitted wrap bodice and subtle flare",

    party_f02:
      "a luxurious sequinned or embellished statement blouse with plunging neckline, paired with matching wide-leg flowing trousers",

    party_f03:
      "a contemporary silk georgette saree with an embroidered scalloped border and statement pallu, paired with a sleeveless designer blouse",

    suit_m01:
      "a sharp single-breasted two-piece suit with notch lapels, matching jacket and trousers, and a dress shirt with a tie",

    suit_m02:
      "a classic three-piece suit with a single-breasted jacket, button-front waistcoat, matching trousers, dress shirt, and tie",

    suit_m03:
      "a double-breasted six-button suit with peak lapels, matching trousers, dress shirt, and pocket square",

    suit_f01:
      "a tailored women's two-piece suit with a structured single-breasted jacket, high-waist matching trousers, and a blouse underneath",

    suit_f02:
      "a women's three-piece suit with a structured jacket, fitted waistcoat, matching high-waist trousers, and a blouse underneath",

    suit_f03:
      "a classic skirt suit with a structured single-breasted blazer, matching knee-length pencil skirt, and a blouse",
  };

  return (
    map[templateId] ??
    `${outfitName} with realistic garment construction, proper seams, fabric texture, and natural draping`
  );
}

// ── Main prompt builder ───────────────────────────────────────────────────────
export function buildOutfitPrompt(
  selection: HueFitSelection
): string {
  const regions = getGarmentRegions(selection.template_id);
  const colors = selection.color_palette.colors;

  let colorInstructions = "";

  if (regions && regions.regions && regions.regions.length > 0) {
    colorInstructions = regions.regions
      .map((region) => {
        const idx = Math.min(
          region.colorIndex,
          colors.length - 1
        );

        const color = colors[idx] ?? colors[0];

        return `${region.label}: ${hexToColorName(color)} (EXACT HEX ${color})`;
      })
      .join("\n");
  } else {
    const c1 = colors[0]
      ? `${hexToColorName(colors[0])} (${colors[0]})`
      : "navy blue";

    const c2 = colors[1]
      ? `${hexToColorName(colors[1])} (${colors[1]})`
      : "charcoal grey";

    colorInstructions =
      `Primary garment colour: ${c1}\n` +
      `Secondary garment colour: ${c2}`;
  }

  const gender =
    selection.gender === "male" ? "male" : "female";

  const skinToneHex = selection.skin_tone.selected_hex;
  const skinToneName = selection.skin_tone.label;

  const outfit = getOutfitDescription(
    selection.template_id,
    selection.outfit_name
  );

  return `
EDIT THE PROVIDED DATASET IMAGE.

The supplied image is the AUTHORITATIVE BASE IMAGE for this generation.

DO NOT create a new person.
DO NOT redesign the outfit.
DO NOT replace the mannequin.
DO NOT generate a new pose.
DO NOT generate a different camera angle.
DO NOT change the composition.

The goal is to take the supplied HueFit dataset template image and make a controlled fashion color edit based on the user's selections.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BASE IMAGE PRESERVATION — CRITICAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Preserve the supplied dataset image as closely as possible.

Keep EXACTLY the same:

- mannequin body
- mannequin proportions
- mannequin pose
- head shape
- faceless appearance
- arms
- hands
- legs
- feet
- garment silhouettes
- garment shapes
- garment layering
- garment construction
- collars
- lapels
- sleeves
- cuffs
- waistbands
- pockets
- seams
- hems
- draping
- footwear
- camera position
- camera angle
- framing
- image composition
- studio background
- lighting direction
- shadows
- overall image structure

The supplied dataset image is more important than the textual outfit description.

The text description exists only to help identify garment regions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MANNEQUIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The mannequin represents a ${gender} fashion mannequin.

Apply the requested mannequin skin/surface tone:

Skin tone:
${skinToneName}

Reference HEX:
${skinToneHex}

Change ONLY the mannequin surface tone if necessary.

The mannequin must remain:

- completely faceless
- featureless
- without eyes
- without nose
- without mouth
- without ears
- without hair
- without facial expression

Do not turn the mannequin into a real identifiable human.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTFIT TEMPLATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Template ID:
${selection.template_id}

Outfit:
${selection.outfit_name}

Garment structure:
${outfit}

IMPORTANT:

The garment structure already exists in the supplied dataset image.

DO NOT invent additional garments.
DO NOT remove existing garments.
DO NOT change the garment design.
DO NOT change the garment proportions.
DO NOT change the garment silhouette.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXACT USER COLOR SELECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Apply these exact colors to the corresponding garment regions:

${colorInstructions}

These HEX values are the user's selected colors.

The HEX values have priority over generic color names.

Use the exact selected color on the corresponding garment.

Preserve realistic:

- fabric texture
- folds
- highlights
- shadows
- seams
- stitching
- wrinkles
- material response

The selected color must naturally follow the existing lighting and fabric shading.

Do NOT make the garments look like flat digital color blocks.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COLOR EDITING RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is a COLOR EDIT of an existing dataset image.

The original garment's geometry must remain unchanged.

Replace the original garment color with the requested color while preserving:

- fabric texture
- natural highlights
- natural shadows
- folds
- wrinkles
- seams
- stitching
- depth
- realistic material appearance

Do not recolor:

- background
- floor
- shadows outside the garments
- mannequin body
- face/head surface
- hands
- arms
- legs
- shoes unless explicitly specified as a garment region

Only the requested garment regions should receive the selected colors.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VISUAL CONSISTENCY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The final image must look like the SAME dataset mannequin photographed in the SAME studio.

It should appear that the clothing was originally manufactured in the selected colors.

Do NOT make it look like:

- AI generated redesign
- a different mannequin
- a different photograph
- a different fashion model
- a different pose
- a different outfit
- a pasted color layer
- a flat recolor
- a cartoon
- an illustration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRICT NEGATIVE INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DO NOT:

- create a new mannequin
- create a human face
- add eyes
- add a nose
- add a mouth
- add hair
- add ears
- change the pose
- change body proportions
- change camera angle
- change framing
- change background
- change garment design
- change garment silhouette
- add garments
- remove garments
- add accessories not already present
- add text
- add logos
- add watermarks
- add props
- add scenery
- crop the image
- distort hands
- create extra limbs
- change the dataset composition
- replace the dataset image with a newly generated fashion photograph

FINAL PRIORITY:

1. Preserve the supplied dataset image.
2. Preserve the existing outfit structure.
3. Apply the selected mannequin skin tone.
4. Apply the exact selected HEX colors to the correct garment regions.
5. Preserve realistic fabric lighting, shadows and texture.

The final result must look like the original HueFit dataset template after a precise professional color customization.
`;
}