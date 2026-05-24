// SiteMock.jsx — renders the same homepage in one of three palette variants.
// Variants: "tactical", "terminal", "editorial"

const PALETTES = {
  tactical: {
    bg: "#0F172A", surface: "#1E293B", surface2: "#27334A",
    text: "#F8FAFC", muted: "#94A3B8", subtle: "#64748B",
    accent: "#DC2626", accentSoft: "rgba(220,38,38,0.15)",
    rule: "#1E293B", ruleStrong: "#334155",
    sans: '"Inter Tight", "Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
    // syntax
    kw: "#DC2626", str: "#7DD3FC", num: "#FCD34D", com: "#64748B", fn: "#F8FAFC",
    headingTracking: "-0.02em",
    bodyTracking: "0",
    name: "Tactical / Slate",
    tag: "linear discipline · cool slate · sharp grid",
  },
  terminal: {
    bg: "#0A0A0A", surface: "#171717", surface2: "#1F1F1F",
    text: "#FAFAFA", muted: "#71717A", subtle: "#52525B",
    accent: "#EF4444", accentSoft: "rgba(239,68,68,0.12)",
    rule: "#1F1F1F", ruleStrong: "#3F3F46",
    sans: '"IBM Plex Sans", "Inter", system-ui, sans-serif',
    mono: '"IBM Plex Mono", "JetBrains Mono", monospace',
    kw: "#EF4444", str: "#A3E635", num: "#FCD34D", com: "#71717A", fn: "#FAFAFA",
    headingTracking: "-0.01em",
    bodyTracking: "0",
    name: "Terminal",
    tag: "developer-made · mono-forward · prompt cursor",
  },
  editorial: {
    bg: "#1A1A1A", surface: "#262626", surface2: "#303030",
    text: "#FAFAFA", muted: "#A3A3A3", subtle: "#737373",
    accent: "#991B1B", accentSoft: "rgba(153,27,27,0.18)",
    rule: "#262626", ruleStrong: "#404040",
    sans: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", "SF Mono", monospace',
    kw: "#991B1B", str: "#D6D3D1", num: "#E7E5E4", com: "#737373", fn: "#FAFAFA",
    headingTracking: "-0.025em",
    bodyTracking: "0",
    name: "Editorial / Oxblood",
    tag: "practitioner-as-writer · deep burgundy · loose grid",
  },
};

function SiteMock({ variant = "tactical" }) {
  const p = PALETTES[variant];

  // Terminal variant uses mono-dominant headings; editorial uses larger looser type
  const isTerm = variant === "terminal";
  const isEd   = variant === "editorial";

  const headlineFont = isTerm ? p.mono : p.sans;
  const sectionHeadCase = isTerm ? "uppercase" : isEd ? "none" : "uppercase";
  const sectionHeadFont = isTerm ? p.mono : p.mono; // both use mono — looks intentional

  return (
    <div style={{
      width: "100%", height: "100%",
      background: p.bg,
      color: p.text,
      fontFamily: p.sans,
      fontFeatureSettings: '"ss01", "cv11"',
      overflow: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 56px",
        borderBottom: `1px solid ${p.rule}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isTerm && <span style={{ fontFamily: p.mono, color: p.accent, fontSize: 16, lineHeight: 1 }}>▍</span>}
          <span style={{
            fontFamily: isTerm ? p.mono : p.sans,
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: isTerm ? "0" : "-0.01em",
            color: p.text,
          }}>
            {isTerm ? "aaron@pangburn" : "Aaron Pangburn"}
            {isTerm && <span style={{ color: p.muted }}>:~$</span>}
          </span>
        </div>
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["writing", "notes", "about"].map((it, i) => (
            <a key={it} href="#" style={{
              fontFamily: isTerm ? p.mono : p.sans,
              fontSize: 13, fontWeight: 500,
              color: i === 0 ? p.text : p.muted,
              textDecoration: "none",
              letterSpacing: isTerm ? "0.02em" : "-0.005em",
              borderBottom: i === 0 ? `1px solid ${p.accent}` : "1px solid transparent",
              paddingBottom: 4,
            }}>{it}</a>
          ))}
          <a href="#" style={{
            fontFamily: p.mono, fontSize: 12, fontWeight: 500,
            color: p.muted, textDecoration: "none",
            padding: "6px 12px",
            border: `1px solid ${p.ruleStrong}`,
            borderRadius: isTerm ? 0 : 4,
            letterSpacing: "0.04em",
          }}>RSS</a>
        </nav>
      </header>

      {/* Hero */}
      <section style={{
        padding: isEd ? "80px 56px 64px" : "64px 56px 56px",
        display: "flex", gap: 32, alignItems: "flex-start",
      }}>
        <Avatar palette={p} variant={variant} />
        <div style={{ maxWidth: 640 }}>
          <div style={{
            fontFamily: p.mono, fontSize: 11, color: p.muted,
            letterSpacing: "0.14em", textTransform: "uppercase",
            marginBottom: 14,
          }}>
            {isTerm ? "$ whoami" : "AI engineer · enterprise · 15 years"}
          </div>
          <h1 style={{
            fontFamily: headlineFont,
            fontSize: isEd ? 44 : 38,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: p.headingTracking,
            margin: "0 0 18px",
            color: p.text,
            textWrap: "balance",
          }}>
            {isEd && <em style={{ fontStyle: "italic", fontWeight: 600 }}>Notes</em>}
            {isEd ? " from inside the regulated stack." : "Notes from inside the regulated stack."}
          </h1>
          <p style={{
            fontFamily: p.sans, fontSize: 16, lineHeight: 1.6,
            color: p.muted, margin: 0, maxWidth: 560,
            textWrap: "pretty",
          }}>
            I'm Aaron. Fifteen years building production systems, the last few of those
            wiring LLMs into enterprises where "move fast" gets you fired. I write down
            what's actually working — and what isn't — for HITL multi-agent setups in
            places that take audit logs seriously.
          </p>
          <div style={{
            display: "flex", gap: 14, marginTop: 22, alignItems: "center",
          }}>
            {["github", "x", "linkedin", "youtube", "email"].map((s, i) => (
              <a key={s} href="#" style={{
                fontFamily: p.mono, fontSize: 11,
                color: p.muted, textDecoration: "none",
                letterSpacing: "0.06em",
                padding: "4px 0",
                borderBottom: `1px solid ${p.subtle}`,
              }}>{s}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Section: writing */}
      <section style={{ padding: "16px 56px 24px" }}>
        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "space-between",
          paddingBottom: 12,
          borderBottom: `1px solid ${p.ruleStrong}`,
          marginBottom: 4,
        }}>
          <div style={{
            fontFamily: sectionHeadFont,
            fontSize: 11,
            color: p.muted,
            letterSpacing: "0.18em",
            textTransform: sectionHeadCase,
            fontWeight: 600,
          }}>
            {isTerm ? "// recent_notes" : "Recent notes"}
          </div>
          <a href="#" style={{
            fontFamily: p.mono, fontSize: 11, color: p.accent,
            textDecoration: "none", letterSpacing: "0.04em",
          }}>view all →</a>
        </div>
        {POST_FIXTURES.map((post, i) => <PostRow key={i} post={post} palette={p} variant={variant} />)}
      </section>

      {/* Section: a code preview */}
      <section style={{ padding: "32px 56px 0" }}>
        <div style={{
          fontFamily: sectionHeadFont,
          fontSize: 11,
          color: p.muted,
          letterSpacing: "0.18em",
          textTransform: sectionHeadCase,
          fontWeight: 600,
          paddingBottom: 12,
          borderBottom: `1px solid ${p.ruleStrong}`,
          marginBottom: 16,
        }}>
          {isTerm ? "// inline_code" : "Inline code is a first-class affordance"}
        </div>
        <CodeBlock palette={p} variant={variant} />
      </section>

      {/* Footer */}
      <footer style={{
        marginTop: "auto",
        padding: "32px 56px 24px",
        borderTop: `1px solid ${p.rule}`,
        display: "flex", justifyContent: "space-between",
        fontFamily: p.mono, fontSize: 11, color: p.subtle,
        letterSpacing: "0.04em",
      }}>
        <div>© 2026 aaron pangburn · {isTerm ? "uname -a: practitioner" : "built in the field"}</div>
        <div style={{ display: "flex", gap: 16 }}>
          <span>{p.name.toLowerCase()}</span>
          <span style={{ color: p.accent }}>●</span>
        </div>
      </footer>
    </div>
  );
}

function Avatar({ palette: p, variant }) {
  const isTerm = variant === "terminal";
  return (
    <div style={{
      width: 88, height: 88, flexShrink: 0,
      borderRadius: isTerm ? 0 : "50%",
      background: `linear-gradient(135deg, ${p.surface2} 0%, ${p.surface} 100%)`,
      border: `1px solid ${p.ruleStrong}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: p.mono, fontSize: 28, fontWeight: 700,
      color: p.muted,
      position: "relative",
    }}>
      ap
      <div style={{
        position: "absolute",
        bottom: isTerm ? 0 : -2, right: isTerm ? 0 : -2,
        width: 14, height: 14,
        background: p.accent,
        borderRadius: isTerm ? 0 : "50%",
        border: `2px solid ${p.bg}`,
      }}/>
    </div>
  );
}

function PostRow({ post, palette: p, variant }) {
  const isTerm = variant === "terminal";
  const isEd = variant === "editorial";
  return (
    <a href="#" style={{
      display: "grid",
      gridTemplateColumns: "84px 1fr auto",
      gap: 24, alignItems: "baseline",
      padding: isEd ? "20px 0" : "16px 0",
      borderBottom: `1px solid ${p.rule}`,
      textDecoration: "none",
      color: "inherit",
    }}>
      <div style={{
        fontFamily: p.mono, fontSize: 11,
        color: p.muted,
        letterSpacing: "0.04em",
      }}>{post.date}</div>
      <div>
        <div style={{
          fontFamily: p.sans,
          fontSize: isEd ? 19 : 17,
          fontWeight: 600,
          color: p.text,
          letterSpacing: p.headingTracking,
          marginBottom: 4,
          lineHeight: 1.3,
        }}>
          {isTerm && <span style={{ color: p.accent, marginRight: 8, fontFamily: p.mono, fontWeight: 500 }}>›</span>}
          {post.title}
        </div>
        <div style={{
          fontFamily: p.sans, fontSize: 14, color: p.muted,
          lineHeight: 1.5,
        }}>{post.dek}</div>
      </div>
      <div style={{
        fontFamily: p.mono, fontSize: 10,
        color: p.subtle, letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}>{post.mins} min</div>
    </a>
  );
}

function CodeBlock({ palette: p, variant }) {
  const isTerm = variant === "terminal";
  return (
    <div style={{
      background: isTerm ? p.surface : p.surface,
      border: `1px solid ${p.ruleStrong}`,
      borderLeft: `2px solid ${p.accent}`,
      borderRadius: isTerm ? 0 : 4,
      padding: "16px 20px",
      fontFamily: p.mono,
      fontSize: 13,
      lineHeight: 1.65,
      overflow: "hidden",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        marginBottom: 12, paddingBottom: 10,
        borderBottom: `1px solid ${p.rule}`,
        fontSize: 11, color: p.subtle,
        letterSpacing: "0.06em",
      }}>
        <span>orchestrator/retry.ts</span>
        <span style={{ marginLeft: "auto", color: p.muted }}>typescript</span>
      </div>
      <pre style={{ margin: 0, color: p.text, whiteSpace: "pre", overflow: "hidden" }}>
<span style={{color:p.com}}>{`// retries bottom out in a human, not an exception`}</span>{`\n`}
<span style={{color:p.kw}}>export async function</span> <span style={{color:p.fn,fontWeight:600}}>retry</span>{`(task: Task, budget = `}<span style={{color:p.num}}>3</span>{`) {`}{`\n`}
{`  `}<span style={{color:p.kw}}>for</span>{` (`}<span style={{color:p.kw}}>let</span>{` attempt = `}<span style={{color:p.num}}>0</span>{`; attempt < budget; attempt++) {`}{`\n`}
{`    `}<span style={{color:p.kw}}>try</span>{` { `}<span style={{color:p.kw}}>return await</span>{` task.run() }`}{`\n`}
{`    `}<span style={{color:p.kw}}>catch</span>{` (e: ToolError) { logAttempt(e, attempt) }`}{`\n`}
{`  }`}{`\n`}
{`  `}<span style={{color:p.kw}}>return</span>{` askHuman(task, { reason: `}<span style={{color:p.str}}>"out of retries"</span>{` })`}{`\n`}
{`}`}
      </pre>
    </div>
  );
}

const POST_FIXTURES = [
  { date: "2026·03·12", title: "The retry loop is a human-in-the-loop loop", dek: "Every budget should bottom out in a question to a person, not a RETRY_EXHAUSTED.", mins: 8 },
  { date: "2026·03·04", title: "Audit logs are the only feature compliance cares about", dek: "What I had to add before any of this was allowed near production.", mins: 12 },
  { date: "2026·02·20", title: "Observability is the first feature, not the last", dek: "Why I now write the trace viewer before the first prompt.", mins: 6 },
  { date: "2026·02·06", title: "Running Claude Code like a team, not a CLI", dek: "Six months of treating one model as five coworkers.", mins: 14 },
];

window.SiteMock = SiteMock;
