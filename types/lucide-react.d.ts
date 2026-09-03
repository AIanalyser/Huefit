// Type declaration for lucide-react
declare module "lucide-react" {
  import * as React from "react";

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type LucideIcon = React.FC<LucideProps>;

  export const AlertCircle: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Briefcase: LucideIcon;
  export const Check: LucideIcon;
  export const Crown: LucideIcon;
  export const Download: LucideIcon;
  export const Eye: LucideIcon;
  export const Github: LucideIcon;
  export const ImagePlus: LucideIcon;
  export const Layers: LucideIcon;
  export const Menu: LucideIcon;
  export const Palette: LucideIcon;
  export const PartyPopper: LucideIcon;
  export const RefreshCw: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Share2: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Shirt: LucideIcon;
  export const Shuffle: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Upload: LucideIcon;
  export const User: LucideIcon;
  export const Wand2: LucideIcon;
  export const X: LucideIcon;
  export const Brain: LucideIcon;
  export const SlidersHorizontal: LucideIcon;
  export const Star: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Zap: LucideIcon;
  export const Lock: LucideIcon;
  export const Camera: LucideIcon;
  export const Heart: LucideIcon;
  export const Info: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Copy: LucideIcon;
}
