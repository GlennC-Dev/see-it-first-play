import ScrollReveal from "./ScrollReveal";

const Contact = ({ onOpenChat }: { onOpenChat: () => void }) => (
  <section id="contact" className="py-24 px-[5vw] bg-foreground text-background transition-colors duration-300 dark:bg-[#0a0a09]">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <ScrollReveal>
        <div className="font-mono-dm text-[0.72rem] tracking-[0.18em] uppercase text-[#6699ff] mb-4">// get in touch</div>
        <h2 className="font-serif-dm text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] mb-4 text-[#f0f0ee]">Let's build something that runs itself.</h2>
        <p className="text-[0.95rem] text-[#aaa] font-light leading-[1.7] mb-10">
          Open to automation consulting, BI projects, and full-time opportunities. Based in Manila, Philippines — available for remote collaboration worldwide.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] rounded-sm flex items-center justify-center text-base flex-shrink-0">📍</div>
            <div className="text-[0.9rem] text-[#ccc]">Manila, Philippines</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] rounded-sm flex items-center justify-center text-base flex-shrink-0">📞</div>
            <div className="text-[0.9rem] text-[#ccc]">(+63) 123-456-7890</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] rounded-sm flex items-center justify-center text-base flex-shrink-0">✉️</div>
            <div className="text-[0.9rem] text-[#ccc]">
              <a href="mailto:12345@gmail.com" className="text-[#6699ff] no-underline hover:underline">12345@gmail.com</a>
            </div>
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-[4px] p-10">
          <h3 className="font-serif-dm text-[1.6rem] text-[#f0f0ee] mb-3">Ready to automate?</h3>
          <p className="text-[0.85rem] text-[#aaa] leading-[1.65] font-light mb-8">Whether it's a reporting bottleneck, a data pipeline, or a full workflow overhaul — let's talk about what we can build together.</p>
          <button onClick={onOpenChat} className="w-full bg-primary text-primary-foreground border-none py-4 text-[0.9rem] font-medium cursor-pointer rounded-sm hover:brightness-110 transition-all duration-200 text-center">
            Open chat assistant →
          </button>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Contact;
