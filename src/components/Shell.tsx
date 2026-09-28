import { useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  FolderKanban,
  Layers,
  User,
  Mail,
  Facebook,
  Linkedin,
  Github,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import Footer from "@/components/Footer";
import ChatWidget, { type ChatWidgetHandle } from "@/components/ChatWidget";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import { SOCIAL_LINKS } from "@/data/socials";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/skills-experience", label: "Skills & Experience", icon: Layers },
  { to: "/about", label: "About", icon: User },
  { to: "/contact", label: "Contact", icon: Mail },
];

const Shell = () => {
  const chatRef = useRef<ChatWidgetHandle>(null);
  const openChat = () => chatRef.current?.open();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          {/* 👈 Expanded sidebar: large cutout avatar, name, positioning, then one row of round
              buttons (3 socials + theme toggle), then a divider above the nav. Modeled on the
              reference layout, with your own values. Hidden entirely when the sidebar collapses
              to icons — the small circle avatar below takes over there. */}
          <div className="flex flex-col items-center text-center group-data-[collapsible=icon]:hidden">
            {/* Avatar size: w-[clamp(120px,18vh,160px)] = min / preferred (18% of viewport height)
                / max. Tied to viewport height so it doesn't push the nav off short screens. */}
            <span className="relative block w-[clamp(120px,18vh,160px)] aspect-square">
              {/* Soft glow behind the figure — bg-primary/25 = glow strength, blur-2xl = spread */}
              <span className="absolute inset-x-[4%] top-[18%] bottom-0 rounded-full bg-primary/25 blur-2xl pointer-events-none" />
              {/* The mask fades the bottom edge and shoulders into the sidebar while the head stays
                  fully opaque. 50% = where the fade starts; raise it for a later/softer fade. */}
              <img
                src="/avatar.png"
                alt="Glenn Charifa"
                className="relative block w-full h-full object-contain object-bottom [mask-image:radial-gradient(ellipse_80%_86%_at_50%_24%,#000_50%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_80%_86%_at_50%_24%,#000_50%,transparent_100%)]"
              />
            </span>
            <span className="mt-4 font-semibold text-lg leading-tight text-foreground">Glenn Charifa</span>
            <span className="mt-1 text-[0.8rem] text-ink-muted">Data and Automation</span>

            {/* Round-button row. w-9 h-9 = button size (change here AND the size prop on
                ThemeToggle below together); gap-2.5 = spacing between buttons; mt-4 = space above. */}
            <div className="mt-4 flex items-center gap-2.5">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-ink-soft hover:border-primary hover:text-primary transition-colors duration-200">
                <Facebook size={15} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-ink-soft hover:border-primary hover:text-primary transition-colors duration-200">
                <Linkedin size={15} />
              </a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-ink-soft hover:border-primary hover:text-primary transition-colors duration-200">
                <Github size={15} />
              </a>
              <ThemeToggle size="w-9 h-9" />
            </div>
            {/* Divider above the nav — mt-4 = space between the buttons and the line */}
            <div className="mt-4 h-px w-full bg-border" />
          </div>

          {/* Collapsed (icon-only) sidebar: just a small round avatar */}
          <div className="hidden group-data-[collapsible=icon]:flex justify-center">
            <div className="w-8 h-8 rounded-full bg-blue-dim overflow-hidden border border-border">
              <img src="/avatar.png" alt="Glenn Charifa" className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                  <SidebarMenuItem key={to}>
                    <SidebarMenuButton asChild tooltip={label}>
                      <NavLink
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-blue-dim text-primary font-medium"
                            : "text-ink-soft"
                        }
                      >
                        <Icon />
                        <span>{label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 group-data-[collapsible=icon]:hidden">
          <p className="text-xs text-ink-muted">© 2026</p>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* 👈 pb-24 clears the fixed BottomNav on mobile so page content (and the Footer) never
            sits underneath it; md:pb-0 removes that padding on desktop where BottomNav is hidden
            and the sidebar is used instead. */}
        <main className="flex-1 bg-background pb-24 md:pb-0">
          <Outlet context={{ openChat }} />
        </main>
        <Footer />
      </SidebarInset>
      <ChatWidget ref={chatRef} />
      <BottomNav onOpenChat={openChat} />
    </SidebarProvider>
  );
};

export default Shell;
