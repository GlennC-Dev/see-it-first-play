import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import ProjectsSection from "@/components/ProjectsSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget, { type ChatWidgetHandle } from "@/components/ChatWidget";

const Index = () => {
  const chatRef = useRef<ChatWidgetHandle>(null);

  const openChat = () => chatRef.current?.open();

  return (
    <>
      <Navbar />
      <div className="bg-background transition-colors duration-300">
        <Hero onOpenChat={openChat} />
        <Stats />
      </div>
      <Skills />
      <Experience />
      <ProjectsSection />
      <Contact onOpenChat={openChat} />
      <Footer />
      <ChatWidget ref={chatRef} />
    </>
  );
};

export default Index;
