import ThemeToggle from "@/components/ThemeToggle";

// 👈 Mobile-only profile header at the very top of Home: avatar, name, positioning line, theme
// toggle. No verified tick (dropped on purpose). Edit the two text lines below to change copy.
// w-14 h-14 = avatar size (bump both together); gap-3 = space between avatar and text;
// py-3.5 = header height; px-[5vw] matches the page margin used everywhere else.
const ProfileHeader = () => (
  <div className="flex items-center gap-3 px-[5vw] py-3.5 bg-card border-b border-border transition-colors duration-300">
    {/* Avatar: transparent cutout sits on bg-blue-dim inside the circle so it reads the same in
        light and dark mode. object-top keeps the face centered when the square is cropped round. */}
    <div className="w-14 h-14 rounded-full bg-blue-dim overflow-hidden shrink-0 border border-border">
      <img
        src="/avatar.png"
        alt="Glenn Charifa"
        className="w-full h-full object-cover object-top"
      />
    </div>
    <div className="flex flex-col min-w-0 flex-1">
      <span className="font-semibold text-[0.95rem] text-foreground truncate">Glenn Charifa</span>
      <span className="text-[0.8rem] text-ink-muted truncate">Data and Automation</span>
    </div>
    <ThemeToggle />
  </div>
);

export default ProfileHeader;
