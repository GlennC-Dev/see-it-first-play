import { Link } from "react-router-dom";
import { BarChart3, FileText, Code2, Workflow, LayoutGrid } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { CATEGORIES, PROJECTS, type Category } from "@/data/projects";

const CATEGORY_ICONS: Record<string, typeof BarChart3> = {
  "Data Visualizations": BarChart3,
  "Case Study & Technical Writing": FileText,
  "Apps Script": Code2,
  "Workflow Automations": Workflow,
  "Web Apps": LayoutGrid,
};

// ── DIAGONAL CARD IMAGE TUNABLES (only used by categories that set cardImage in projects.ts) ──
const IMG_WIDTH = "w-[40%] md:w-[40%]"; // 👈 how much of the card the image layer covers: first = phone, second = md and up
const TEXT_MAX_W = "max-w-[56%] md:max-w-[56%]"; // 👈 caps the text column so it doesn't run under the image (phone / md and up)
const IMG_OPACITY = "opacity-[0.9] dark:opacity-[0.55]"; // 👈 image strength: light theme / dark theme (white screenshots glare on dark cards, so dark is lower)
const FADE_ANGLE = "90deg"; // 👈 direction of the fade edge. 90deg = straight vertical edge; higher = more slanted
const FADE_FULL_LIGHT = "45%"; // 👈 LIGHT theme: where the image reaches full strength (0% = fully transparent at the layer's left edge). Lower = harder edge, higher = softer, longer fade
const FADE_FULL_DARK = "80%"; // 👈 DARK theme: same idea, but longer/softer so the bright screenshot melts into the dark card. Raise for more fade, lower for less
const FADE_MASK_LIGHT = `linear-gradient(${FADE_ANGLE}, transparent 0%, black ${FADE_FULL_LIGHT})`;
const FADE_MASK_DARK = `linear-gradient(${FADE_ANGLE}, transparent 0%, black ${FADE_FULL_DARK})`;

const ProjectsHome = () => {
  return (
    <>
      <ScrollReveal>
        {/* ── HEADER BANNER ─────────────────────────────────────────────
            pt-5 / pb-5  = vertical padding of the whole banner (was pt-7/pb-7)
            Adjust these two together to make the whole red-boxed area taller/shorter. */}
        <div className="pt-5 pb-5 px-[5vw] border-b border-border bg-card transition-colors duration-300">
          <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-3">
            // project gallery
          </div>
          {/* HEADLINE SIZE — clamp(MIN, PREFERRED, MAX). Was clamp(2.4rem,3.6vw,3.2rem).
              Lower all three numbers to shrink further, raise to grow. */}
          <h1 className="font-serif-dm text-[clamp(1.9rem,3vw,2.5rem)] leading-[1.05] mb-3 text-foreground transition-colors duration-300">
            Real Builds. <em className="italic text-primary">Fully</em> Documented.
          </h1>
          {/* SUBHEADLINE SIZE — text-sm (was text-base). Change to text-base/text-lg/etc. */}
          <p className="text-sm text-ink-soft font-light max-w-[65ch] leading-[1.7]">
            Every project here shipped — dashboards, automations, and the systems behind them, laid out build by build.
          </p>
        </div>
      </ScrollReveal>

      {/* py-16 pb-8 = vertical padding of the whole cards section.
          The pb-8 value specifically controls the gap before the Footer renders (Shell puts <Footer/> right after this).
          Lower pb-8 further (e.g. pb-4) to tighten that gap even more. */}
      <section className="px-[5vw] pt-10 pb-8">
        {/* Card grid: row 1 = 2 cards (grows UPWARD), row 2 = 3 cards (grows DOWNWARD) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {CATEGORIES.slice(0, 2).map((cat) => (
            <ProjectCard key={cat.key} cat={cat} grow="up" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CATEGORIES.slice(2, 5).map((cat) => (
            <ProjectCard key={cat.key} cat={cat} grow="down" />
          ))}
        </div>
      </section>
    </>
  );
};

const ProjectCard = ({ cat, grow }: { cat: Category; grow?: "up" | "down" }) => {
  const projects = PROJECTS.filter((p) => p.category === cat.key);
  const Icon = CATEGORY_ICONS[cat.key] ?? LayoutGrid;

  // ── ROW-1 / ROW-2 CARD HEIGHT ──────────────────────────────────────
  // grow="up"   (row 1, blue/violet): extra padding ABOVE the icon (pt) — grows the card upward
  // grow="down" (row 2, yellow):      extra padding BELOW the text (pb) — grows the card downward
  // Increase the 3.5rem values to make cards taller; decrease to make them shorter.
  const paddingClass =
    grow === "up"
      ? "pt-[3.5rem] pb-5 px-5" // 👈 raise 3.5rem to grow this card upward more
      : grow === "down"
      ? "pt-5 pb-[3.5rem] px-5" // 👈 raise 3.5rem to grow this card downward more
      : "p-5"; // fallback, currently unused (all 5 cards get up/down above)

  return (
    <Link
      to={`/projects/${cat.slug}`}
      className={`block relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary transition-colors duration-200 no-underline ${paddingClass}`}
    >
      {/* Diagonal image layer: absolute, so it can never change the card's height. Fades to transparent on its left edge,
          so the card's own background shows through (works in light + dark with no hardcoded colors). */}
      {cat.cardImage && (
        <div
          aria-hidden
          className={`card-fade pointer-events-none absolute inset-y-0 right-0 ${IMG_WIDTH}`}
          style={{ "--fade-light": FADE_MASK_LIGHT, "--fade-dark": FADE_MASK_DARK } as React.CSSProperties}
        >
          <img
            src={cat.cardImage}
            alt=""
            className={`w-full h-full object-cover ${IMG_OPACITY}`}
            style={{ objectPosition: cat.cardImagePosition ?? "50% 50%" }}
          />
        </div>
      )}
      <div className={`relative z-10 ${cat.cardImage ? TEXT_MAX_W : ""}`}>
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
        <Icon size={16} />
      </div>
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className="font-mono-dm text-[0.8rem] tracking-[0.08em] text-foreground uppercase">
          {cat.key}
        </h3>
        <span className="shrink-0 font-mono-dm text-[0.62rem] tracking-[0.1em] text-ink-muted px-2 py-0.5 border border-border rounded-sm">
          {projects.length}
        </span>
      </div>
      <p className="text-sm text-ink-soft font-light leading-[1.5]">{cat.desc}</p>
      </div>
    </Link>
  );
};

export default ProjectsHome;
