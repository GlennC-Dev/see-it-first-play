import glennProfile from "@/assets/glenn-profile-4.jpg.asset.json";

const Hero = ({ onOpenChat }: { onOpenChat: () => void }) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-24 pb-12"
      style={{ backgroundColor: "#131311" }}
    >
      {/* Full-bleed right-side photo */}
      <div className="absolute top-0 right-0 h-full w-full md:w-1/2 pointer-events-none hidden md:block">
        <img
          src={glennProfile.url}
          alt="Glenn Charifa"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "contain", objectPosition: "50% 20%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #131311 0%, #131311 15%, rgba(19,19,17,0.6) 35%, transparent 55%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #131311 0%, transparent 25%)" }}
        />
      </div>

      <div className="px-[5vw] grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16 relative z-[1]">
        <div>
          <div className="animate-fade-up inline-flex items-center gap-2 font-mono-dm text-[0.75rem] tracking-[0.12em] uppercase text-primary border border-primary rounded-sm px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" />
            DATA VISUALIZATION & AUTOMATION SPECIALIST
          </div>
          <h1 className="animate-fade-up-delay-1 font-serif-dm text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.05] text-foreground mb-6 transition-colors duration-300">
            I don't just<br />analyze data —<br /><em className="italic text-primary">I automate</em><br />the work behind it.
          </h1>
          <p className="animate-fade-up-delay-2 text-base leading-[1.7] text-ink-soft max-w-[42ch] mb-10 font-light">
            I design the systems behind the insights — and I make sure those insights are real. Based in Manila, Philippines — open to remote and international opportunities.
          </p>
          <div className="animate-fade-up-delay-3 flex gap-4 flex-wrap">
            <button onClick={onOpenChat} className="bg-primary text-primary-foreground border-none py-3.5 px-7 text-[0.85rem] font-medium tracking-[0.05em] cursor-pointer inline-block transition-all duration-200 rounded-sm hover:brightness-110 hover:-translate-y-px">
              Let's automate something
            </button>
            <a href="#projects" className="bg-transparent text-foreground border-[1.5px] border-border py-3.5 px-7 text-[0.85rem] font-medium tracking-[0.05em] cursor-pointer inline-block no-underline transition-all duration-200 rounded-sm hover:border-primary hover:text-primary hover:-translate-y-px">
              View my work
            </a>
          </div>
        </div>
        <div className="hidden md:block" />
      </div>
    </section>
  );
};

export default Hero;
