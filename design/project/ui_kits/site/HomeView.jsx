// HomeView.jsx — the feed. Header lives outside.
function HomeView({ posts, onOpenPost }) {
  const byYear = posts.reduce((acc, p) => {
    (acc[p.year] = acc[p.year] || []).push(p);
    return acc;
  }, {});
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  return (
    <div>
      <section style={homeStyles.hero}>
        <div style={homeStyles.avatar}>
          <span style={homeStyles.avatarText}>ap</span>
          <span style={homeStyles.avatarDot} />
        </div>
        <div style={homeStyles.bio}>
          <div style={homeStyles.label}>// whoami · enterprise · 15+ years</div>
          <h1 style={homeStyles.h1}>
            Notes from inside<br/>the regulated stack.
          </h1>
          <p style={homeStyles.lead}>
            I'm Aaron. Fifteen years building production systems, the last few of
            those wiring LLMs into enterprises where "move fast" gets you fired. I
            write down what's actually working — and what isn't — for HITL
            multi-agent setups in places that take audit logs seriously.
          </p>
          <div style={homeStyles.socials}>
            {["github", "x", "linkedin", "youtube", "email"].map((s) => (
              <a key={s} href="#" style={homeStyles.social}>{s}</a>
            ))}
          </div>
        </div>
      </section>

      <YouTubeStrip video={window.LATEST_VIDEO} />

      {years.map((year) => (
        <section key={year} style={homeStyles.yearSection}>
          <div style={homeStyles.yearHeadRow}>
            <h2 style={homeStyles.yearHead}>// {year}</h2>
            <span style={homeStyles.yearCount}>{byYear[year].length} notes</span>
          </div>
          <div>
            {byYear[year].map((p) => (
              <PostListItem key={p.id} post={p} onOpen={onOpenPost} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const homeStyles = {
  hero: {
    display: "flex", gap: "32px", alignItems: "flex-start",
    marginBottom: "56px",
  },
  avatar: {
    width: 80, height: 80, flexShrink: 0,
    background: "var(--surface-2)",
    border: "1px solid var(--rule-bright)",
    display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative",
    fontFamily: "var(--font-mono)",
  },
  avatarText: {
    fontSize: "26px", fontWeight: 700,
    color: "var(--fg-3)",
    letterSpacing: "-0.02em",
  },
  avatarDot: {
    position: "absolute",
    bottom: 0, right: 0,
    width: "14px", height: "14px",
    background: "var(--red)",
    border: "2px solid var(--bg)",
  },
  bio: { flex: 1, maxWidth: "640px" },
  label: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--fg-4)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: "16px",
    fontWeight: 600,
  },
  h1: {
    fontFamily: "var(--font-sans)",
    fontSize: "44px",
    fontWeight: 700,
    color: "var(--fg)",
    margin: "0 0 20px",
    letterSpacing: "-0.025em",
    lineHeight: 1.05,
    textWrap: "balance",
  },
  lead: {
    fontFamily: "var(--font-sans)",
    fontSize: "16px",
    color: "var(--fg-3)",
    lineHeight: 1.6,
    margin: "0 0 20px",
    textWrap: "pretty",
  },
  socials: {
    display: "flex", gap: "16px", alignItems: "baseline", flexWrap: "wrap",
  },
  social: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--fg-3)",
    textDecoration: "none",
    letterSpacing: "0.06em",
    borderBottom: "1px solid var(--rule-bright)",
    paddingBottom: "2px",
  },
  yearSection: { marginBottom: "56px" },
  yearHeadRow: {
    display: "flex", justifyContent: "space-between", alignItems: "baseline",
    paddingBottom: "10px",
    borderBottom: "1px solid var(--rule-bright)",
    marginBottom: "4px",
  },
  yearHead: {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--fg-3)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    margin: 0,
    fontWeight: 600,
  },
  yearCount: {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    color: "var(--fg-5)",
    letterSpacing: "0.10em",
    textTransform: "uppercase",
  },
};

window.HomeView = HomeView;
