import Hero from "@/components/Hero";
import HomeDesktop from "./HomeDesktop";
import HomeMobile from "./HomeMobile";
import { useIsPhone } from "@/hooks/useMediaQuery";

// 👈 Real component switch (useIsPhone, a JS matchMedia check) instead of one shared component
// with hidden/md:block CSS classes — only one of HomeDesktop/HomeMobile ever actually mounts,
// so there's no shared grid/flex tree for mobile and desktop content to fight over. This is the
// pattern change that came out of comparing notes against Kenneth's reference repo.
const HomePanel = () => {
  const isPhone = useIsPhone();

  return (
    <div className="bg-background transition-colors duration-300">
      <Hero />
      {isPhone ? <HomeMobile /> : <HomeDesktop />}
    </div>
  );
};

export default HomePanel;
