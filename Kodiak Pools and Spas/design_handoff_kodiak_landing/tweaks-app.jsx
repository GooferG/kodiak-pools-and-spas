/* Kodiak — Tweaks panel app. Drives theme + type via CSS vars / data-attrs. */
const { useEffect } = React;

const HEAD_FONTS = {
  "Bodoni (card-faithful)": '"Bodoni Moda", Georgia, serif',
  "Playfair Display": '"Playfair Display", Georgia, serif',
  "Marcellus (refined)": '"Marcellus", Georgia, serif',
  "DM Serif Display": '"DM Serif Display", Georgia, serif',
};
const BODY_FONTS = {
  "Hanken Grotesk": '"Hanken Grotesk", system-ui, sans-serif',
  "Mulish": '"Mulish", system-ui, sans-serif',
  "Work Sans": '"Work Sans", system-ui, sans-serif',
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "colorway": "Faithful",
  "headline": "Bodoni (card-faithful)",
  "body": "Hanken Grotesk",
  "corners": "Sharp",
  "watermark": true
}/*EDITMODE-END*/;

const COLORWAY_MAP = { "Faithful": "faithful", "Steel": "steel", "Pool Water": "water" };

function KodiakTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const root = document.documentElement;

  useEffect(() => { root.setAttribute("data-theme", COLORWAY_MAP[t.colorway] || "faithful"); }, [t.colorway]);
  useEffect(() => { root.setAttribute("data-corners", (t.corners || "Sharp").toLowerCase()); }, [t.corners]);
  useEffect(() => { root.style.setProperty("--font-display", HEAD_FONTS[t.headline] || HEAD_FONTS["Bodoni (card-faithful)"]); }, [t.headline]);
  useEffect(() => { root.style.setProperty("--font-text", BODY_FONTS[t.body] || BODY_FONTS["Hanken Grotesk"]); }, [t.body]);
  useEffect(() => {
    const wm = document.querySelector(".hero-watermark");
    if (wm) wm.style.display = t.watermark ? "" : "none";
  }, [t.watermark]);

  return (
    <TweaksPanel>
      <TweakSection label="Color direction" />
      <TweakRadio label="Palette" value={t.colorway}
        options={["Faithful", "Steel", "Pool Water"]}
        onChange={(v) => setTweak("colorway", v)} />
      <TweakSection label="Typography" />
      <TweakSelect label="Headline font" value={t.headline}
        options={Object.keys(HEAD_FONTS)}
        onChange={(v) => setTweak("headline", v)} />
      <TweakSelect label="Body font" value={t.body}
        options={Object.keys(BODY_FONTS)}
        onChange={(v) => setTweak("body", v)} />
      <TweakSection label="Detailing" />
      <TweakRadio label="Corners" value={t.corners}
        options={["Sharp", "Soft"]}
        onChange={(v) => setTweak("corners", v)} />
      <TweakToggle label="Bear watermark in hero" value={t.watermark}
        onChange={(v) => setTweak("watermark", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<KodiakTweaks />);
