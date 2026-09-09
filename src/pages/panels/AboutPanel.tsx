import ScrollReveal from "@/components/ScrollReveal";

const AboutPanel = () => {
  return (
    <div className="bg-background transition-colors duration-300">
      <section className="pt-16 pb-24 px-[5vw]">
        <ScrollReveal>
          <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-4">
            // about
          </div>
          <h1 className="font-serif-dm text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] mb-6 text-foreground">
            Hi, I'm Glenn.
          </h1>
          <p className="text-base text-ink-soft font-light max-w-[60ch] leading-[1.7] mb-4">
            {/* TODO: replace with your own words — this is a first draft based on your Hero copy */}
            I design the systems that turn messy processes into pipelines —
            then make sure what comes out the other end is actually right.
            10+ years in support, escalations, and data work, now focused
            on BI development and workflow automation.
          </p>
          <p className="text-base text-ink-soft font-light max-w-[60ch] leading-[1.7]">
            Based in Manila, Philippines — open to remote and international
            opportunities.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-16 border-t border-border pt-10">
            <div className="font-mono-dm text-[0.7rem] tracking-[0.14em] uppercase text-ink-muted mb-4">
              What people say
            </div>
            <div className="rounded-[4px] border border-dashed border-border p-8 text-ink-muted text-sm font-light">
              No testimonials yet — add client or manager quotes here once
              you have a few. (Placeholder slot — safe to build the layout
              around this now and fill it in later.)
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default AboutPanel;
