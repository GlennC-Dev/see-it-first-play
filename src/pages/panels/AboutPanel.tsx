import ScrollReveal from "@/components/ScrollReveal";
import { siN8n, siClaude, siGooglegemini, siGoogleappsscript } from "simple-icons";
import { BarChart3, Cloud, Filter, Award, MapPin } from "lucide-react";
import aboutIllustration from "@/assets/about-illustration.png.asset.json";

const BrandIcon = ({ hex, path }: { hex: string; path: string }) => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill={`#${hex}`}>
    <path d={path} />
  </svg>
);

// 👈 Icon sourcing note: Tableau, Power BI, Salesforce, and Power Query have no real marks in
// simple-icons (same trademark-exclusion situation as the Home tools bar) — those four are
// generic lucide stand-ins below. n8n, Google Apps Script, Claude, and Gemini DO have real
// logos and use them. Swap any stand-in for a real asset later if you source one.
const HIGHLIGHTS = [
  {
    title: "BI Developer",
    icons: [
      { name: "Tableau", node: <BarChart3 className="w-3.5 h-3.5 text-ink-soft" /> },
      { name: "Power BI", node: <BarChart3 className="w-3.5 h-3.5 text-ink-soft scale-x-[-1]" /> },
      { name: "Salesforce", node: <Cloud className="w-3.5 h-3.5 text-ink-soft" /> },
    ],
  },
  {
    title: "Automation Specialist",
    icons: [
      { name: "n8n", node: <BrandIcon hex={siN8n.hex} path={siN8n.path} /> },
      { name: "Apps Script", node: <BrandIcon hex={siGoogleappsscript.hex} path={siGoogleappsscript.path} /> },
      { name: "Power Query", node: <Filter className="w-3.5 h-3.5 text-ink-soft" /> },
    ],
  },
  {
    title: "AI-Enabled LSS Practitioner",
    icons: [
      { name: "Claude", node: <BrandIcon hex={siClaude.hex} path={siClaude.path} /> },
      { name: "Gemini", node: <BrandIcon hex={siGooglegemini.hex} path={siGooglegemini.path} /> },
      { name: "LSS", node: <Award className="w-3.5 h-3.5 text-ink-soft" /> },
    ],
  },
];

const AboutPanel = () => {
  return (
    <div className="bg-background transition-colors duration-300">
      <ScrollReveal>
        {/* 👈 Page header banner — same treatment as Skills & Experience / Projects (bg-card, border-b, mono label + headline + subhead). */}
        <div className="pt-5 pb-5 px-[5vw] border-b border-border bg-card transition-colors duration-300">
          <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-3">
            // about
          </div>
          <h1 className="font-serif-dm text-[clamp(1.9rem,3vw,2.5rem)] leading-[1.05] mb-3 text-foreground transition-colors duration-300">
            Hi, I'm Glenn.
          </h1>
          <p className="text-sm text-ink-soft font-light max-w-[65ch] leading-[1.7]">
            I find what's broken before it breaks everyone else's day.
          </p>
        </div>
      </ScrollReveal>

      <section className="py-14 px-[5vw]">
        <ScrollReveal>
          {/* 👈 Card split: grid-cols-8 on desktop gives 5 cols to text, 3 to the photo (the 5/8 : 3/8
              split requested). Collapses to a single stacked column on mobile — no room to split it there,
              so the photo slot is hidden below md rather than squeezed. */}
          <div className="rounded-xl border border-border bg-card overflow-hidden grid grid-cols-1 md:grid-cols-8">
            <div className="md:col-span-5 p-6 md:p-8">
              <p className="text-base text-foreground font-light leading-[1.7] mb-5">
                <span className="font-semibold">I came up through the phones.</span> That's
                where I learned that bad data costs more than no data. Everything
                I've built since has been an attempt to fix that.
              </p>
              <p className="text-base text-ink-soft font-light leading-[1.7] mb-8">
                Data work taught me that the number everyone trusts is often the
                number nobody questions. I'm the one who checks it — then builds
                something so it doesn't need checking again.
              </p>

              <div className="flex flex-col divide-y divide-border border-t border-border">
                {HIGHLIGHTS.map((h) => (
                  <div key={h.title} className="flex items-center gap-3 py-3.5">
                    {/* 👈 Overlapping icon cluster — -ml-2 on all but the first pulls each icon under
                        the one before it. w-7 h-7 = size of each circle; bump both together to resize
                        the whole cluster without breaking the overlap math. */}
                    <div className="flex items-center shrink-0">
                      {h.icons.map((ic, i) => (
                        <div
                          key={ic.name}
                          title={ic.name}
                          className={`w-7 h-7 rounded-full bg-blue-dim border border-primary/30 flex items-center justify-center ${i > 0 ? "-ml-2" : ""}`}
                          style={{ zIndex: h.icons.length - i }}
                        >
                          {ic.node}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{h.title}</span>
                  </div>
                ))}
              </div>

              {/* 👈 Placeholder credential pills — 3 slots for real credential IDs (LSSGB, etc.)
                  you'll fill in later, same pill styling as the location badge below. Swap the
                  "CREDENTIAL ID" text in each for the real ID/name once you have them, or delete
                  any you don't end up needing. */}
              <div className="mt-8 flex flex-wrap items-center gap-2 mb-3">
                {["CREDENTIAL ID", "CREDENTIAL ID", "CREDENTIAL ID"].map((label, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 font-mono-dm text-[0.68rem] tracking-[0.1em] uppercase px-3 py-2 rounded-sm bg-blue-dim text-primary"
                  >
                    <Award className="w-3.5 h-3.5" />
                    {label}
                  </div>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 font-mono-dm text-[0.68rem] tracking-[0.1em] uppercase px-3 py-2 rounded-sm bg-blue-dim text-primary">
                <MapPin className="w-3.5 h-3.5" />
                Based in Manila, Philippines · GMT+8
              </div>
            </div>

            {/* 👈 Right 3/8 illustration slot. Transparent PNG served from the CDN asset pointer —
                the card's bg-card color shows through the transparent areas, so it follows the
                light/dark toggle automatically. The dark: utilities below soften brightness/contrast
                slightly in dark mode so the flat-vector art doesn't glare against the dark card.
                Hidden below md since there's no room to split the card on mobile. */}
            <div className="hidden md:flex md:col-span-3 items-end justify-center p-6">
              <img
                src={aboutIllustration.url}
                alt="Illustration of Glenn at a laptop surrounded by dashboards, charts and AI panels"
                className="w-full h-auto max-h-[22rem] object-contain object-bottom transition-all duration-300 dark:brightness-90 dark:contrast-[0.95] dark:saturate-[0.9]"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default AboutPanel;
