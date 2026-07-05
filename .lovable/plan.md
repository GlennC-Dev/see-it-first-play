Plan: Hero section update

1. **Create a CDN asset for the uploaded portrait**
   - Source: `/mnt/user-uploads/Messenger_creation_EE70FF50-8E74-4A67-B404-87A6F82150B9.jpeg`
   - Generate: `src/assets/glenn-profile-4.jpg.asset.json` via `lovable-assets create --file /mnt/user-uploads/Messenger_creation_EE70FF50-8E74-4A67-B404-87A6F82150B9.jpeg --filename glenn-profile-4.jpg > src/assets/glenn-profile-4.jpg.asset.json`

2. **Update `src/components/Hero.tsx`**
   - Import the new asset: `import glennProfile from "@/assets/glenn-profile-4.jpg.asset.json";`
   - Change the hero section background to black: `style={{ backgroundColor: "#000000" }}`
   - Remove the two gradient overlay divs so the photo has no fade/blend effects
   - Keep the photo constrained to the right half (`absolute top-0 right-0 h-full w-full md:w-1/2`, hidden on mobile)
   - Keep `objectFit: "contain"` so the full portrait stays visible, and center it vertically with `objectPosition: "50% 50%"`
   - Leave the left-half content and existing text animations unchanged

3. **Clean up the old asset**
   - The existing `src/assets/glenn-profile-3.jpg.asset.json` will no longer be referenced
   - Delete it and its CDN object via `lovable-assets delete --file src/assets/glenn-profile-3.jpg.asset.json`

4. **Verify the preview**
   - Confirm the hero has a black background and the new portrait appears on the right half without gradient overlays