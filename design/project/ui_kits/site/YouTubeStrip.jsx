// YouTubeStrip.jsx — companion video module on the home page.
function YouTubeStrip({ video }) {
  return (
    <aside style={ytStyles.box}>
      <div style={ytStyles.thumb}>
        <div style={ytStyles.scanline} />
        <div style={ytStyles.thumbInner}>
          <div style={ytStyles.thumbMeta}>// note_017 · video companion</div>
          <div style={ytStyles.thumbTitle}>retry.ts</div>
          <div style={ytStyles.thumbSub}>
            <span style={{color:"var(--red)"}}>$</span> walkthrough
            <span style={ytStyles.cursor} />
          </div>
        </div>
        <div style={ytStyles.duration}>{video.duration}</div>
      </div>
      <div style={ytStyles.meta}>
        <div style={ytStyles.label}>// latest_video &nbsp; {video.date}</div>
        <h4 style={ytStyles.title}>{video.title}</h4>
        <p style={ytStyles.desc}>Walks through the actual commit. No slides, no script.</p>
        <a href={video.href} style={ytStyles.link}>watch on youtube →</a>
      </div>
    </aside>
  );
}

const ytStyles = {
  box: {
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    gap: "24px",
    padding: "20px",
    background: "var(--surface)",
    border: "1px solid var(--rule-strong)",
    borderLeft: "2px solid var(--red)",
    marginBottom: "56px",
    alignItems: "center",
  },
  thumb: {
    aspectRatio: "16 / 9",
    background: "var(--bg)",
    position: "relative",
    overflow: "hidden",
    color: "var(--fg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid var(--rule-bright)",
  },
  scanline: {
    position: "absolute", inset: 0,
    background: "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
    pointerEvents: "none",
  },
  thumbInner: { textAlign: "center", fontFamily: "var(--font-mono)" },
  thumbMeta: {
    fontSize: "9px",
    color: "var(--fg-4)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  thumbTitle: {
    fontSize: "32px",
    fontWeight: 700,
    color: "var(--fg)",
    letterSpacing: "-0.02em",
    marginBottom: "6px",
  },
  thumbSub: {
    fontSize: "11px",
    color: "var(--fg-3)",
    letterSpacing: "0.04em",
  },
  cursor: {
    display: "inline-block",
    width: "6px", height: "10px",
    background: "var(--red)",
    marginLeft: "3px",
    verticalAlign: "text-bottom",
  },
  duration: {
    position: "absolute",
    bottom: 8, right: 8,
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    color: "var(--fg)",
    background: "rgba(0,0,0,0.85)",
    padding: "2px 6px",
    border: "1px solid var(--rule-bright)",
    letterSpacing: "0.04em",
  },
  meta: {},
  label: {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    color: "var(--fg-4)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: "8px",
    fontWeight: 600,
  },
  title: {
    fontFamily: "var(--font-sans)",
    fontSize: "20px",
    fontWeight: 600,
    color: "var(--fg)",
    margin: "0 0 8px",
    lineHeight: 1.3,
    letterSpacing: "-0.015em",
  },
  desc: {
    fontFamily: "var(--font-sans)",
    fontSize: "14px",
    color: "var(--fg-3)",
    margin: "0 0 12px",
    lineHeight: 1.5,
  },
  link: {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--red)",
    textDecoration: "none",
    borderBottom: "1px solid var(--red-dim)",
    paddingBottom: "2px",
    letterSpacing: "0.04em",
  },
};

window.YouTubeStrip = YouTubeStrip;
