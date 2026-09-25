import { NavLink } from "react-router-dom";
import { Home, FolderKanban, Layers, User, Mail } from "lucide-react";

// 👈 Mobile-only bottom nav — replaces the sidebar entirely below md (sidebar itself stays
// mounted for desktop but never opens on mobile now that its trigger is gone, see Shell.tsx).
// "Skills & Experience" is shortened to "Services" here specifically, per your call — the full
// name is unchanged everywhere else on the site.
const ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/skills-experience", label: "Services", icon: Layers },
  { to: "/about", label: "About", icon: User },
];

const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-20">
      {/* 👈 pb-[env(...)] clears the phone's home-swipe gesture bar; mb-4 lifts the pill off the
          very bottom edge so it doesn't feel glued to the screen edge. */}
      <div className="pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
        <div className="mx-4 flex items-center justify-between rounded-full border border-border bg-card/95 backdrop-blur-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] px-2 py-2 transition-colors duration-300">
          {ITEMS.slice(0, 2).map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full no-underline ${
                  isActive ? "text-primary" : "text-ink-soft"
                }`
              }
            >
              <Icon size={18} />
              <span className="text-[0.62rem] font-medium">{label}</span>
            </NavLink>
          ))}

          {/* 👈 Center raised Contact button — w-14 h-14 = size of the circle, -mt-7 = how far it
              floats above the pill's top edge. Adjust both together to keep it centered on the pill. */}
          <NavLink
            to="/contact"
            aria-label="Contact"
            className={({ isActive }) =>
              `-mt-7 w-14 h-14 rounded-full flex items-center justify-center shrink-0 no-underline shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-colors duration-200 ${
                isActive ? "bg-primary text-primary-foreground" : "bg-primary/90 text-primary-foreground"
              }`
            }
          >
            <Mail size={20} />
          </NavLink>

          {ITEMS.slice(2, 4).map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full no-underline ${
                  isActive ? "text-primary" : "text-ink-soft"
                }`
              }
            >
              <Icon size={18} />
              <span className="text-[0.62rem] font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
