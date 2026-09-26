import { siN8n, siGoogle } from "simple-icons";
import { BarChart3, Grid3x3 } from "lucide-react";

const BrandIcon = ({ hex, path }: { hex: string; path: string }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill={`#${hex}`}>
    <path d={path} />
  </svg>
);

// Real brand marks (available in simple-icons)
const TOOLS_WITH_LOGOS = [
  { name: "n8n", icon: <BrandIcon hex={siN8n.hex} path={siN8n.path} /> },
  { name: "Google Workspace", icon: <BrandIcon hex={siGoogle.hex} path={siGoogle.path} /> },
];

// Generic stand-in icons — simple-icons excludes these three brands
// (trademark/brand-guideline policy), so these are NOT official logos.
// Swap in real assets from each vendor's brand-resources page if desired.
const TOOLS_GENERIC = [
  { name: "Tableau", icon: <BarChart3 className="w-5 h-5" /> },
  { name: "Microsoft 365", icon: <Grid3x3 className="w-5 h-5" /> },
  { name: "Power BI", icon: <BarChart3 className="w-5 h-5 scale-x-[-1]" /> },
];

export const TOOLS = [TOOLS_WITH_LOGOS[0], TOOLS_GENERIC[0], TOOLS_WITH_LOGOS[1], TOOLS_GENERIC[1], TOOLS_GENERIC[2]];

// Compact stats row (Kenneth's "11 yrs / #7009 / GMT+8" shape, adapted). LSSGB has no number
// attached yet — Glenn said he'd add the credential ID as a pill on the About page later.
export const STATS = [
  { value: "12 Yrs", caption: "In Ops" },
  { value: "LSSGB", caption: "Certified" },
  { value: "GMT+8", caption: "Manila" },
];
