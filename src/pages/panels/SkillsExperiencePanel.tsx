import ScrollReveal from "@/components/ScrollReveal";
import Approach from "@/components/Approach";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";

const SkillsExperiencePanel = () => {
  return (
    <div className="bg-background transition-colors duration-300">
      <ScrollReveal>
        {/* 👈 Page header banner — same treatment as Home's Hero and the Projects gallery header (bg-card, border-b, mono label + headline + subhead). */}
        <div className="pt-5 pb-5 px-[5vw] border-b border-border bg-card transition-colors duration-300">
          <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-3">
            // skills & experience
          </div>
          <h1 className="font-serif-dm text-[clamp(1.9rem,3vw,2.5rem)] leading-[1.05] mb-3 text-foreground transition-colors duration-300">
            What I bring. <em className="italic text-primary">How</em> I've applied it.
          </h1>
          <p className="text-sm text-ink-soft font-light max-w-[65ch] leading-[1.7]">
            Practical capability, built through years of hands-on delivery — not theory.
          </p>
        </div>
      </ScrollReveal>

      <Approach />
      <Skills />
      <Experience />
    </div>
  );
};

export default SkillsExperiencePanel;
