import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isProjectsPage = location.pathname === "/projects";

  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-[5vw] py-5 bg-background/90 backdrop-blur-[12px] border-b border-border transition-colors duration-300">
      <Link to="/" className="font-mono-dm text-[0.8rem] tracking-[0.15em] uppercase text-foreground no-underline transition-colors duration-300">
        Glenn M. Dela Cruz
      </Link>
      <div className="flex items-center gap-6">
        {isProjectsPage ? (
          <Link to="/" className="font-mono-dm text-[0.75rem] tracking-[0.1em] uppercase text-primary no-underline flex items-center gap-1.5 hover:gap-3 transition-all duration-200">
            ← Back to portfolio
          </Link>
        ) : (
          <ul className="hidden md:flex gap-8 list-none">
            <li><a href="#skills" className="text-[0.8rem] tracking-[0.1em] uppercase text-ink-soft no-underline hover:text-primary transition-colors duration-200">Skills</a></li>
            <li><a href="#experience" className="text-[0.8rem] tracking-[0.1em] uppercase text-ink-soft no-underline hover:text-primary transition-colors duration-200">Experience</a></li>
            <li><a href="#projects" className="text-[0.8rem] tracking-[0.1em] uppercase text-ink-soft no-underline hover:text-primary transition-colors duration-200">Projects</a></li>
            <li><a href="#contact" className="text-[0.8rem] tracking-[0.1em] uppercase text-ink-soft no-underline hover:text-primary transition-colors duration-200">Contact</a></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
