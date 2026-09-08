import { useOutletContext } from "react-router-dom";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";

type ShellContext = { openChat: () => void };

const HomePanel = () => {
  const { openChat } = useOutletContext<ShellContext>();
  return (
    <div className="bg-background transition-colors duration-300">
      <Hero onOpenChat={openChat} />
      <Stats />
    </div>
  );
};

export default HomePanel;
