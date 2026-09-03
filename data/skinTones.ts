import { SkinTone } from "@/types";

export const skinTones: SkinTone[] = [
  {
    id: "TONE_01",
    label: "Very Light",
    hex: ["#F7E7D3", "#F3D9C0", "#EFCFB3", "#E8C19F"],
  },
  {
    id: "TONE_02",
    label: "Light",
    hex: ["#E8C09E", "#DDB28D", "#D5A37D", "#CC9870"],
  },
  {
    id: "TONE_03",
    label: "Light Medium",
    hex: ["#C98F6B", "#C18460", "#B87856", "#AE6D4D"],
  },
  {
    id: "TONE_04",
    label: "Medium",
    hex: ["#A96B4A", "#9F6244", "#94593E", "#8A5138"],
  },
  {
    id: "TONE_05",
    label: "Deep",
    hex: ["#7E4933", "#74412F", "#6A3A2B", "#603326"],
  },
  {
    id: "TONE_06",
    label: "Very Deep",
    hex: ["#542C20", "#4C261C", "#432119", "#3A1C16"],
  },
];

export function getSkinTone(id: string): SkinTone | undefined {
  return skinTones.find((t) => t.id === id);
}

export function getSkinToneIndex(id: string): number {
  return skinTones.findIndex((t) => t.id === id);
}
