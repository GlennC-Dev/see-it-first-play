import { useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  Home,
  FolderKanban,
  Layers,
  User,
  Mail,
  Moon,
  Sun,
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

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/skills-experience", label: "Skills & Experience", icon: Layers },
  { to: "/about", label: "About", icon: User },
  { to: "/contact", label: "Contact", icon: Mail },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-ink-soft hover:border-primary hover:text-primary transition-colors duration-200 ml-auto"
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
};

const Shell = () => {
  const chatRef = useRef<ChatWidgetHandle>(null);
  const openChat = () => chatRef.current?.open();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <div className="w-10 h-10 rounded-full bg-border shrink-0" />
            <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
              <span className="font-semibold text-sm text-foreground truncate">
                Glenn Charifa
              </span>
              <span className="text-xs text-ink-muted truncate">
                Data & Automation
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 group-data-[collapsible=icon]:hidden">
            <a
              href="https://linkedin.com/in/gdelacruz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-ink-soft hover:border-primary hover:text-primary transition-colors duration-200"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-ink-soft hover:border-primary hover:text-primary transition-colors duration-200"
            >
              <Github size={14} />
            </a>
            <ThemeToggle />
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
