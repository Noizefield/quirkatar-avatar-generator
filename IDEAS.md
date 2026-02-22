# Ideas for Future Features

## 1. Download & Export Button ⬇️
Allow users to download the avatar directly.
- **How to do it in Vanilla JS:** Create a `Blob` from the SVG string and create an invisible `<a href="...">` link. For PNG downloads, draw the SVG onto an invisible HTML5 `<canvas>` and then extract the image data as a PNG URL.

## 2. Live REST API for `<img>` tags 🌐
Provide a serverless edge function (e.g., Cloudflare Workers, Vercel Edge Functions) that takes a seed and returns the raw `image/svg+xml` content.
- **Why it's cool:** Users could use Quirkatar anywhere on the internet (like forum signatures, GitHub readmes, or WordPress comments) just by writing: `<img src="https://quirkatar.com/api?seed=Noizefield" />`

## 3. Animated "Breathing" Avatars ✨
Since the avatars are pure SVG, embed CSS animations directly inside `.avatar-js` to make them come alive!
- **Ideas:** Add `<style>` blocks inside the generated SVG that cause the eyes to blink every few seconds, the ears to twitch, or add a slow floating "breathing" effect on the blob shapes.

## 4. "Build Your Own" Customizer Mode 🛠️
Instead of just randomizing via a seed string, allow users to manually pick their traits (Eyes, Mouth, Head, Accessories) from a few dropdown menus or buttons below the preview.
- **The twist:** As they manually pick the traits, map their choices into a custom `seed_string` or a base64 encoded string so they can still share it!

## 5. Expandable "Theme" Packs 👽
Categorize traits and add a slider or toggle:
- **Robot Mode:** Square heads, antenna ears, glowing LED eyes.
- **Fantasy Mode:** Elf ears, cyclops eyes, wizard hats.
- **Animal Mode:** Dog snouts, cat ears, whiskers.
- **Implementation:** Add a new `theme` parameter to `generateAvatarSvg(seed, size, theme)` and filter the array choices based on the theme!
