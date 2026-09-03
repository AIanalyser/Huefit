# HUEFIT — AI Color & Outfit Analyzer

> Discover the colors that look best on you.

HueFit is a production-quality MVP web application that analyzes a user's skin tone from an uploaded photo, recommends suitable color palettes, lets the user choose an outfit style, and generates a personalized outfit preview.

---

## Architecture

```
/app
  /page.tsx               ← Premium homepage
  /analyze/page.tsx       ← 6-step analysis flow
  /results/page.tsx       ← 3-column result page
  /api
    /color-analysis/      ← POST: skin tone AI analysis
    /generate-outfit/     ← POST: outfit generation

/components
  /layout/                ← Header, Footer
  /home/                  ← HeroSection, HowItWorks, FeaturesSection
  /analysis/              ← ProgressSteps, StepNavigation
  /upload/                ← PhotoUploader (drag & drop)
  /skin-tone/             ← SkinToneSelector, SkinToneCard
  /outfit/                ← GenderSelector, CategorySelector, OutfitGrid, OutfitCard
  /palette/               ← PaletteSelector, PaletteCard, ColorSwatch, MixMatchSelector
  /results/               ← ResultLeftPanel, ResultCenterPanel, ResultRightPanel, DemoMannequin
  /ui/                    ← StatusBadge, LoadingState

/data
  skinTones.ts            ← 6 tones × 4 HEX values
  outfits.ts              ← 30 outfits × 5 categories × 2 genders
  palettes.ts             ← 12 palettes (2 per skin tone)
  garmentRegions.ts       ← Color-to-garment region mappings

/lib
  /ai/
    provider.ts           ← AIProvider interface + factory
    gemini-provider.ts    ← Gemini vision + image generation
    demo-provider.ts      ← Demo mode (no API key required)
    buildOutfitPrompt.ts  ← Dynamic prompt construction
  /color-analysis/
    analyzer.ts           ← Skin tone mapping, confidence scoring
  /utils/
    helpers.ts            ← Image compress, download, share
  /validation/
    schemas.ts            ← Zod schemas for all API routes
  store.ts                ← Zustand global state

/types
  index.ts                ← All TypeScript types

/__tests__
  data.test.ts            ← Data integrity + logic tests
```

---

## Installation

```bash
git clone <repo>
cd huefit
npm install
```

---

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_APP_NAME` | App name | No |
| `GEMINI_API_KEY` | Google Gemini API key | No (demo works without) |
| `GEMINI_MODEL` | Gemini model name | No |
| `DEMO_MODE` | `true` to force demo mode | No |

> **API keys are never exposed to the browser.** All AI calls are server-side in API routes.

---

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Demo Mode

HueFit works **without any API key** in demo mode.

When `DEMO_MODE=true` (or `GEMINI_API_KEY` is empty):
- Photo analysis uses deterministic tone selection based on image size
- Outfit generation builds the prompt but returns a demo result
- The SVG mannequin preview renders with selected colors applied
- The complete workflow is demonstrable end-to-end

---

## AI Configuration

### Skin Tone Analysis
- Uses `gemini-2.0-flash` with vision capabilities
- Maps response to one of 6 predefined tone IDs
- Falls back to demo provider on error

### Outfit Generation
- Uses `gemini-2.0-flash-exp-image-generation`
- Dynamically builds prompt from: skin tone + gender + outfit + colors
- Falls back gracefully if image generation is unavailable

---

## Dataset Structure

### Skin Tones (6 records)
```ts
{ id: "TONE_01", label: "Very Light", hex: ["#F7E7D3", "#F3D9C0", "#EFCFB3", "#E8C19F"] }
// ...TONE_02 through TONE_06
```

### Outfits (30 records)
- 5 categories: formal, casual, ethnic, party, suits
- 3 male + 3 female per category = 30 total
- Runtime-filtered by gender + category

### Palettes (12 records)
- 2 per skin tone: `soft-natural` + `vibrant-rich`
- Each has 10 colors (2 rows of 5)

---

## Adding New Outfits

1. Add entry to `/data/outfits.ts` following the exact schema
2. Add garment region mapping to `/data/garmentRegions.ts`
3. Add a template asset to `/public/templates/`

```ts
{ id: "FORMAL_M04", gender: "male", category: "formal",
  name: "...", dressType: "...", template: "formal_m04" }
```

---

## Adding New Palettes

1. Add entry to `/data/palettes.ts`
2. Assign to a `toneId` and `setId`

---

## Adding New Templates

1. Add SVG/PNG to `/public/templates/<template_id>.png`
2. Add garment region mapping in `garmentRegions.ts`

---

## Running Tests

```bash
npm test
```

Tests verify:
- Exactly 6 skin tones with 4 HEX each
- Exactly 30 outfits with 3 per gender/category
- Exactly 12 palettes with 2 per tone
- All garment region mappings present
- Runtime merge produces correct shape
- Invalid IDs return undefined

---

## Deployment

```bash
npm run build
npm start
```

Or deploy to Vercel:
```bash
npx vercel --prod
```

Set environment variables in Vercel project settings.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank page on `/results` | No selection in state — start from `/analyze` |
| AI analysis fails | Check `GEMINI_API_KEY` or set `DEMO_MODE=true` |
| Image too large | Compress before upload; limit is 10MB |
| Outfit not filtering | Ensure gender and category are both selected |
| TypeScript errors | Run `npx tsc --noEmit` to diagnose |
