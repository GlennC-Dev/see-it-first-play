const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-7 pb-7 bg-background transition-colors duration-300"
    >
      <div className="px-[5vw] grid grid-cols-1 items-center gap-10 md:gap-16 relative z-[1]">
        <div className="max-w-[75%] md:max-w-[75%]">
          {/* "// home" LABEL — matches the "// project gallery" label style on the Projects page.
              Change the text here, or the classes below, to adjust size/color/spacing. */}
          <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-3">
            // home
          </div>
          {/* HEADLINE — two-toned to match the Projects page's "Real Builds. Fully Documented." style:
              1) bright/foreground segment  2) italic primary-color highlight  3) muted (text-ink-soft) segment
              Swap text-ink-soft for text-foreground if you want the last segment full-bright instead. */}
          <h1 className="animate-fade-up-delay-1 font-serif-dm text-[clamp(2.4rem,3.6vw,3.2rem)] leading-[1.05] text-foreground mb-4 transition-colors duration-300 whitespace-nowrap">
            Automate the Build. <em className="italic text-primary">Trust</em>{" "}
            <span className="text-ink-soft">the Output.</span>
          </h1>
          <p className="animate-fade-up-delay-2 text-base leading-[1.7] text-ink-soft max-w-[65ch] font-light">
            I design the systems that turn messy processes into pipelines — then make sure what comes out the other end is actually right.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
