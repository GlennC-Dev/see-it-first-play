const Hero = () => {
  return (
    <section
      id="hero"
      /* bg-card (not bg-background) is deliberate — matches the Projects page's banner-vs-body
         two-tone effect: bg-card is a slightly lighter shade than the bg-background used below
         (in HomePanel's wrapping div), creating the same visible step/banding Projects has.
         👈 pt-9 pb-8 on mobile (more room since the headline now wraps to 2-3 lines there) vs the
         original pt-7 pb-7 kept for desktop where it stays on one line. */
      className="relative overflow-hidden pt-9 pb-8 md:pt-7 md:pb-7 border-b border-border bg-card transition-colors duration-300"
    >
      <div className="px-[5vw] grid grid-cols-1 items-center gap-10 md:gap-16 relative z-[1]">
        {/* 👈 max-w-full on mobile (was max-w-[75%] on all sizes — that's what was forcing the
            headline into a too-narrow column on phones); md:max-w-[75%] restores the original
            desktop proportion untouched. */}
        <div className="max-w-full md:max-w-[75%]">
          {/* "// home" LABEL — matches the "// project gallery" label style on the Projects page.
              Change the text here, or the classes below, to adjust size/color/spacing. */}
          <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-3">
            // home
          </div>
          {/* HEADLINE — two-toned to match the Projects page's "Real Builds. Fully Documented." style:
              1) bright/foreground segment  2) italic primary-color highlight  3) muted (text-ink-soft) segment
              Swap text-ink-soft for text-foreground if you want the last segment full-bright instead.
              👈 Mobile: smaller clamp (was hitting its 2.4rem floor and still overflowing) + wrapping
              allowed (whitespace-normal) so it reads as 2-3 natural lines instead of one clipped line.
              md:whitespace-nowrap + the larger clamp restore the original one-line desktop look exactly. */}
          <h1 className="animate-fade-up-delay-1 font-serif-dm text-[clamp(1.9rem,7.5vw,2.6rem)] md:text-[clamp(2.4rem,3.6vw,3.2rem)] leading-[1.15] md:leading-[1.05] whitespace-normal md:whitespace-nowrap text-foreground mb-4 transition-colors duration-300">
            Automate the Build. <em className="italic text-primary">Trust</em>{" "}
            <span className="text-ink-soft">the Output.</span>
          </h1>
          {/* 👈 text-[0.95rem] on mobile (was text-base=1rem but max-w-[65ch] was letting lines run
              nearly full-width on a narrow screen, reading dense) — bumped leading slightly too. */}
          <p className="animate-fade-up-delay-2 text-[0.95rem] md:text-base leading-[1.75] md:leading-[1.7] text-ink-soft max-w-[65ch] font-light">
            I design the systems that turn messy processes into pipelines — then make sure what comes out the other end is actually right.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
