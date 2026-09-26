import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, FolderKanban, Layers, User, Phone, Mail, MessageCircle } from "lucide-react";

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

const BottomNav = ({ onOpenChat }: { onOpenChat: () => void }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const goToContact = () => {
    setExpanded(false);
    navigate("/contact");
  };

  const openChatAndCollapse = () => {
    setExpanded(false);
    onOpenChat();
  };

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-20">
      {/* 👈 Backdrop — only rendered while expanded, so tapping anywhere outside the two popped-up
          icons collapses them back. Sits below the nav pill (z-20 on <nav>, this is inside it so
          it naturally layers under the pill/buttons that come after it in the DOM). */}
      {expanded && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setExpanded(false)}
          aria-hidden="true"
        />
      )}

      {/* 👈 pb-[env(...)] clears the phone's home-swipe gesture bar; mb-4 lifts the pill off the
          very bottom edge so it doesn't feel glued to the screen edge. */}
      <div className="relative z-10 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
        <div className="mx-4 flex items-center justify-between rounded-full border border-border bg-card/95 backdrop-blur-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] px-2 py-2 transition-colors duration-300">
          {ITEMS.slice(0, 2).map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setExpanded(false)}
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

          {/* 👈 Center button group — w-14 h-14 = size of the main circle, -mt-7 = how far it floats
              above the pill's top edge (adjust both together to keep it centered on the pill).
              Tapping it toggles `expanded`, popping the Mail/Chat buttons out above it rather than
              navigating straight to Contact like before. */}
          <div className="relative -mt-7 shrink-0">
            {/* Envelope — pops up-left. translate/opacity/scale are what animate; duration/delay
                control the pop timing. Second button (chat) has a slightly longer delay so they
                stagger instead of appearing at the exact same instant. */}
            {/* 👈 Positioned at ~115° on an imaginary circle around the main button (0°=right,
                90°=straight up) — mostly-vertical fan, tilted slightly left. -translate-x-[1.9rem]
                -translate-y-[4.1rem] is that angle at a ~4.5rem radius; increase the radius (scale
                both numbers together) to detach it further from the center button. */}
            <button
              onClick={goToContact}
              aria-label="Contact page"
              className={`absolute bottom-0 left-1/2 w-11 h-11 rounded-full bg-card border border-border text-foreground flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all duration-200 ${
                expanded
                  ? "opacity-100 scale-100 translate-x-[calc(-50%-1.7rem)] -translate-y-[3.5rem]"
                  : "opacity-0 scale-50 translate-x-[-50%] translate-y-0 pointer-events-none"
              }`}

            >
              <Mail size={18} />
            </button>

            {/* Chat bubble — mirrored at ~65° */}
            <button
              onClick={openChatAndCollapse}
              aria-label="Open chat"
              className={`absolute bottom-0 left-1/2 w-11 h-11 rounded-full bg-card border border-border text-foreground flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all duration-200 delay-75 ${
                expanded
                  ? "opacity-100 scale-100 translate-x-[calc(-50%+1.7rem)] -translate-y-[3.5rem]"
                  : "opacity-0 scale-50 translate-x-[-50%] translate-y-0 pointer-events-none"
              }`}

            >
              <MessageCircle size={18} />
            </button>

            {/* Main phone button — rotates 45deg when expanded as a subtle "opened" cue */}
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-label={expanded ? "Close contact options" : "Contact options"}
              aria-expanded={expanded}
              className={`relative z-[1] w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-transform duration-200 ${
                expanded ? "rotate-45" : "rotate-0"
              }`}
            >
              <Phone size={20} />
            </button>
          </div>

          {ITEMS.slice(2, 4).map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setExpanded(false)}
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
