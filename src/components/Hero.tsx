const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-12 pb-12"
      style={{ backgroundColor: "#000201" }}
    >
      <div className="px-[5vw] grid grid-cols-1 items-center gap-10 md:gap-16 relative z-[1]">
        <div>
          <h1 className="animate-fade-up-delay-1 font-serif-dm text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.05] text-foreground mb-6 transition-colors duration-300">
            Automate the<br />Build. <em className="italic text-primary">Trust</em><br />the Output.
          </h1>
          <p className="animate-fade-up-delay-2 text-base leading-[1.7] text-ink-soft max-w-[42ch] font-light">
            I design the systems that turn messy processes into pipelines — then make sure what comes out the other end is actually right. Based in Manila, Philippines — open to remote and international opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
