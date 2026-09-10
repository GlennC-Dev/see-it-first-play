import { useOutletContext } from "react-router-dom";
import Contact from "@/components/Contact";
import ScrollReveal from "@/components/ScrollReveal";

type ShellContext = { openChat: () => void };

const ContactPanel = () => {
  const { openChat } = useOutletContext<ShellContext>();
  return (
    <div className="bg-background transition-colors duration-300">
      <Contact onOpenChat={openChat} />
      <section className="py-16 px-[5vw]">
        <ScrollReveal>
          <div className="font-mono-dm text-[0.7rem] tracking-[0.14em] uppercase text-ink-muted mb-4">
            FAQ
          </div>
          <div className="rounded-[4px] border border-dashed border-border p-8 text-ink-muted text-sm font-light">
            No FAQ content yet — add common questions here once you know
            what people tend to ask. (Placeholder slot.)
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default ContactPanel;
