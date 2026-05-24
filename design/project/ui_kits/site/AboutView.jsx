// AboutView.jsx — short, in voice. Terminal vibe.
function AboutView() {
  return (
    <div style={aboutStyles.wrap}>
      <div style={aboutStyles.label}>// about · enterprise practitioner · 15+ yrs</div>
      <h1 style={aboutStyles.h1}>About.</h1>
      <p style={aboutStyles.lead}>
        I'm Aaron Pangburn. I've been writing software for 15 years and most of that
        has been deep inside regulated enterprises — the kind of place where every
        commit gets traced, every model output gets reviewed, and "we'll fix it in
        prod" is a sentence that ends careers.
      </p>
      <p style={aboutStyles.p}>
        These days the work is HITL multi-agent orchestration: getting LLMs to do
        real production work inside organizations that take audit logs, RBAC, and
        change windows seriously. This site is where I write down what's actually
        working — operational, not theoretical.
      </p>
      <p style={aboutStyles.p}>
        I cross-post short versions to <a href="https://x.com" style={aboutStyles.link}>x</a> and
        slightly longer ones to <a href="https://linkedin.com" style={aboutStyles.link}>linkedin</a>.
        The <a href="#" style={aboutStyles.link}>youtube channel</a> walks through
        real commits, no slides, no script.
      </p>

      <div style={aboutStyles.label2}>// shipping</div>
      <ul style={aboutStyles.list}>
        <li><b style={aboutStyles.b}>orchestrator</b> — HITL multi-agent runtime. Trace viewer first, prompt second.</li>
        <li><b style={aboutStyles.b}>familiar</b> — senior-engineer-in-a-box for SMBs. Learns the business's taste over time.</li>
        <li><b style={aboutStyles.b}>orchestrator-dashboard</b> — terminal-style monitor. The safety story, made visible.</li>
      </ul>

      <div style={aboutStyles.label2}>// stack</div>
      <ul style={aboutStyles.list}>
        <li>TypeScript · Python · Postgres · Cloudflare Workers · Next.js</li>
        <li>Claude · GPT-4 class · whatever else is in scope this quarter</li>
        <li>I'm not religious about tools. I'm religious about logs.</li>
      </ul>

      <div style={aboutStyles.label2}>// contact</div>
      <p style={aboutStyles.p}>
        <a href="mailto:aaron@pangburn.net" style={aboutStyles.link}>aaron@pangburn.net</a>.
        I read everything, reply to most.
      </p>
    </div>
  );
}

const aboutStyles = {
  wrap: { maxWidth: "680px" },
  label: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--fg-4)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: "16px",
    fontWeight: 600,
  },
  label2: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--fg-3)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginTop: "40px",
    marginBottom: "12px",
    fontWeight: 600,
    paddingBottom: "8px",
    borderBottom: "1px solid var(--rule-bright)",
  },
  h1: {
    fontFamily: "var(--font-sans)",
    fontSize: "48px",
    fontWeight: 700,
    color: "var(--fg)",
    margin: "0 0 24px",
    letterSpacing: "-0.025em",
    lineHeight: 1.05,
  },
  lead: {
    fontFamily: "var(--font-sans)",
    fontSize: "17px",
    color: "var(--fg)",
    lineHeight: 1.6,
    margin: "0 0 20px",
    textWrap: "pretty",
  },
  p: {
    fontFamily: "var(--font-sans)",
    fontSize: "15px",
    lineHeight: 1.65,
    color: "var(--fg-2)",
    margin: "0 0 16px",
    textWrap: "pretty",
  },
  b: { color: "var(--fg)", fontWeight: 600, fontFamily: "var(--font-mono)", fontSize: "0.92em" },
  list: {
    fontFamily: "var(--font-sans)",
    fontSize: "15px",
    lineHeight: 1.65,
    color: "var(--fg-2)",
    margin: "0 0 16px",
    paddingLeft: "20px",
  },
  link: {
    color: "var(--red)",
    textDecoration: "none",
    borderBottom: "1px solid var(--red-dim)",
  },
};

window.AboutView = AboutView;
