import { useState } from "react";
import Hero from "@/components/Hero";
import HomeDesktop from "./HomeDesktop";
import HomeMobile from "./HomeMobile";
import { useIsPhone } from "@/hooks/useMediaQuery";

type ViewOverride = "auto" | "mobile" | "desktop";

// 👈 TEMPORARY testing widget — lets you force Mobile/Desktop regardless of what the browser
// actually reports, which matters specifically because Lovable's own preview pane runs your site
// inside an iframe: the iframe's width isn't necessarily your phone's real screen width, so
// useIsPhone() can report the wrong thing there even though it'd be correct on the real deployed
// URL. "Auto" (default) uses the real matchMedia check as before. Delete this whole component
// (and its one usage below) once you're done testing — it's not meant to ship.
const ViewDebugWidget = ({
  override,
  setOverride,
}: {
  override: ViewOverride;
  setOverride: (v: ViewOverride) => void;
}) => (
  <div className="fixed top-3 right-3 z-30 flex items-center gap-1 rounded-full border border-dashed border-primary bg-card/95 backdrop-blur-[8px] p-1 text-[0.65rem] font-mono-dm uppercase shadow-md">
    {(["auto", "mobile", "desktop"] as ViewOverride[]).map((v) => (
      <button
        key={v}
        onClick={() => setOverride(v)}
        className={`px-2.5 py-1 rounded-full transition-colors duration-150 ${
          override === v ? "bg-primary text-primary-foreground" : "text-ink-soft"
        }`}
      >
        {v}
      </button>
    ))}
  </div>
);

const HomePanel = () => {
  const isPhoneReal = useIsPhone();
  const [override, setOverride] = useState<ViewOverride>("auto");
  const isPhone = override === "auto" ? isPhoneReal : override === "mobile";

  return (
    <div className="bg-background transition-colors duration-300">
      <ViewDebugWidget override={override} setOverride={setOverride} />
      <Hero />
      {isPhone ? <HomeMobile /> : <HomeDesktop />}
    </div>
  );
};

export default HomePanel;
