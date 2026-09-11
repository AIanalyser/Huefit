import { HueFitSelection } from "@/types";
import { getGarmentRegions } from "@/data/garmentRegions";

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
      : (max - min) /
        (l > 127 ? 510 - max - min : max + min);

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
    l > 180
      ? "light "
      : l < 70
        ? "deep "
        : l < 110
          ? "dark "
          : "";

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
      "a pique polo shirt with ribbed collar and two-button placket, paired with slim-fit chino trousers with a slight taper",

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

export function buildOutfitPrompt(
  selection: HueFitSelection
): string {
  const regions = getGarmentRegions(selection.template_id);
  const colors = selection.color_palette.colors;

  let colorInstructions = "";

  if (regions?.regions?.length) {
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

  const skinToneName = selection.skin_tone.label;
  const skinToneHex = selection.skin_tone.selected_hex;

  const outfit = getOutfitDescription(
    selection.template_id,
    selection.outfit_name
  );

  return `
EDIT THE PROVIDED HUEFIT DATASET IMAGE.

SOURCE IMAGE:
The supplied image is the exact base image.
Edit the existing image. Do not create a new image composition.

PRIMARY EDIT:
1. Recolor the existing garment regions using the exact colors below.
2. Recolor the existing mannequin surface using the exact surface-tone HEX below.
3. Preserve the original mannequin, clothing structure, pose and composition.

GARMENT COLORS:
${colorInstructions}

IMPORTANT GARMENT RULE:
The HEX values above are the user's exact selected colors.
Apply each HEX color directly to its corresponding existing garment region.

Do not redesign the garments.
Do not change garment shapes.
Do not add garments.
Do not remove garments.

SURFACE TONE EDIT:
Target: EXISTING MANNEQUIN SURFACE ONLY.

Selected surface tone:
${skinToneName}

EXACT SURFACE-TONE HEX:
${skinToneHex}

Change the color of the existing mannequin material toward EXACT HEX ${skinToneHex}.

This is a MATERIAL COLOR EDIT of the existing mannequin surface.

Preserve:
- existing mannequin geometry
- existing head shape
- existing body proportions
- existing pose
- existing shading
- existing highlights
- existing shadows
- existing studio lighting

Do not replace the existing mannequin.

The head must remain completely smooth and featureless.
Do not add eyes.
Do not add a nose.
Do not add a mouth.
Do not add hair.
Do not add facial details.

The surface-tone edit must not affect the clothing colors.

EXISTING OUTFIT:
${selection.outfit_name}

EXISTING GARMENT STRUCTURE:
${outfit}

The garment structure shown in the supplied image is authoritative.
Use the image itself as the reference for garment shape and construction.

PRESERVE THE ORIGINAL:
- same mannequin
- same head
- same body
- same proportions
- same pose
- same arms
- same hands
- same legs
- same feet
- same garments
- same garment silhouettes
- same garment layering
- same garment construction
- same collars
- same sleeves
- same lapels
- same cuffs
- same waistbands
- same seams
- same folds
- same footwear
- same camera
- same framing
- same background
- same lighting
- same shadows
- same composition

COLOR EDITING:
Only perform the requested color changes.

Garments:
Apply the exact selected garment HEX values to the mapped garment regions.

Mannequin:
Apply the exact selected surface-tone HEX to the existing mannequin surface.

Preserve natural:
- fabric texture
- folds
- wrinkles
- highlights
- shadows
- seams
- stitching
- material depth

Do not make clothing look like flat digital blocks.

DO NOT:
- replace the mannequin
- change the mannequin geometry
- change the pose
- change body proportions
- change camera angle
- change framing
- change background
- redesign clothing
- add clothing
- remove clothing
- add accessories
- add text
- add logos
- add watermarks
- crop the image
- add facial details
- add hair

FINAL RESULT:
The output must look like the SAME HueFit dataset image after a precise color customization.

The clothing must use the selected garment colors.

The existing mannequin surface must use the selected surface-tone HEX.

Everything else should remain visually consistent with the supplied dataset image.
`;
}