import { useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  FolderKanban,
  Layers,
  User,
  Mail,
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
          {/* 👈 Avatar + name + positioning + theme toggle. Social icons (LinkedIn/GitHub) were
              removed from here — socials live on the Contact page. w-11 h-11 = avatar size;
              gap-3 = space between avatar and text. In collapsed-icon mode only the avatar shows. */}
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <div className="w-11 h-11 rounded-full bg-blue-dim overflow-hidden shrink-0 border border-border">
              <img
                src="/avatar.png"
                alt="Glenn Charifa"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <span className="font-semibold text-sm text-foreground truncate">
                Glenn Charifa
              </span>
              <span className="text-xs text-ink-muted truncate">
                Data and Automation
              </span>
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <ThemeToggle />
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
