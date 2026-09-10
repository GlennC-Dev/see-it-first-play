const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-7 pb-7 bg-background transition-colors duration-300"
    >
      <div className="px-[5vw] grid grid-cols-1 items-center gap-10 md:gap-16 relative z-[1]">
        <div className="max-w-[75%] md:max-w-[75%]">
          <h1 className="animate-fade-up-delay-1 font-serif-dm text-[clamp(2.4rem,3.6vw,3.2rem)] leading-[1.05] text-foreground mb-4 transition-colors duration-300 whitespace-nowrap">
            Automate the Build. <em className="italic text-primary">Trust</em> the Output.
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
