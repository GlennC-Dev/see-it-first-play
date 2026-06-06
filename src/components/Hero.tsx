import glennProfile from "@/assets/glenn-profile.jpeg.asset.json";

const Hero = ({ onOpenChat }: { onOpenChat: () => void }) => {
  return (
    <section id="hero" className="px-[5vw] grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16 pt-24 pb-12 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 80% at 70% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 70% 50%, black 30%, transparent 100%)",
        }}
      />
      <div className="relative z-[1]">
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
<div className="relative z-[1] animate-fade-up-delay-2 hidden md:block">
  <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-[4px] overflow-hidden ml-auto">
    <img src={glennProfile.url} alt="Glenn Charifa" className="w-full h-full object-cover object-top" />
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "linear-gradient(to left, transparent 60%, hsl(var(--background)) 100%)" }}
    />
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 30%)" }}
    />
  </div>
</div>
    </section>
  );
};

export default Hero;
