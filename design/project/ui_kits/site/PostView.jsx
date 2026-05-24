// PostView.jsx — the post-detail layout. Sans body, mono accents, terminal feel.
function PostView({ post, onBack, posts }) {
  const idx = posts.findIndex((p) => p.id === post.id);
  const next = idx > 0 ? posts[idx - 1] : null;
  const prev = idx < posts.length - 1 ? posts[idx + 1] : null;

  return (
    <article style={postStyles.wrap}>
      <button onClick={() => onBack()} style={postStyles.back}>
        <span style={{color:"var(--red)"}}>←</span> cd ..
      </button>

      <header style={postStyles.head}>
        <div style={postStyles.meta}>
          <span style={postStyles.num}>note_{post.id}</span>
          <span style={postStyles.sep}>·</span>
          <span>{post.date}</span>
          <span style={postStyles.sep}>·</span>
          <span>{post.minutes} min read</span>
        </div>
        <h1 style={postStyles.title}>{post.title}</h1>
        <p style={postStyles.dek}>{post.dek}</p>
        <div style={postStyles.tags}>
          {post.tags.map((t) => <span key={t} style={postStyles.tag}>{t}</span>)}
        </div>
      </header>

      <div style={postStyles.body}>
        {(post.body || fallbackBody).map((b, i) => <PostBlock key={i} block={b} />)}
      </div>

      <footer style={postStyles.foot}>
        <div style={postStyles.share}>
          <span style={postStyles.shareLbl}>// share</span>
          <a href="#" style={postStyles.shareLink}>x</a>
          <a href="#" style={postStyles.shareLink}>linkedin</a>
          <a href="#" style={postStyles.shareLink}>copy link</a>
        </div>
        <nav style={postStyles.nav}>
          {prev && (
            <a href="#" onClick={(e) => { e.preventDefault(); onBack(prev); }} style={postStyles.navItem}>
              <div style={postStyles.navDir}>← previous</div>
              <div style={postStyles.navTitle}>note_{prev.id} · {prev.title}</div>
            </a>
          )}
          {next && (
            <a href="#" onClick={(e) => { e.preventDefault(); onBack(next); }} style={{...postStyles.navItem, textAlign:"right"}}>
              <div style={postStyles.navDir}>next →</div>
              <div style={postStyles.navTitle}>note_{next.id} · {next.title}</div>
            </a>
          )}
        </nav>
      </footer>
    </article>
  );
}

function PostBlock({ block }) {
  if (block.type === "p")     return <p style={postStyles.p}>{renderInline(block.text)}</p>;
  if (block.type === "h2")    return <h2 style={postStyles.h2}>{block.text}</h2>;
  if (block.type === "h3")    return <h3 style={postStyles.h3}>{block.text}</h3>;
  if (block.type === "code")  return (
    <pre style={postStyles.pre}>
      <div style={postStyles.preHead}>
        <span>orchestrator/retry.ts</span>
        <span style={{marginLeft:"auto", color:"var(--fg-4)"}}>{block.lang || "ts"}</span>
      </div>
      <code style={postStyles.code}>{highlight(block.text, block.lang)}</code>
    </pre>
  );
  if (block.type === "ul")    return (
    <ul style={postStyles.ul}>
      {block.items.map((it, i) => <li key={i} style={postStyles.li}>{renderInline(it)}</li>)}
    </ul>
  );
  if (block.type === "quote") return <blockquote style={postStyles.bq}>{block.text}</blockquote>;
  if (block.type === "callout") return (
    <aside style={postStyles.callout}>
      <div style={postStyles.calloutLabel}>{block.label || "note"}</div>
      <div style={postStyles.calloutBody}>{renderInline(block.text)}</div>
    </aside>
  );
  return null;
}

function renderInline(text) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("`") && p.endsWith("`")) {
      return <code key={i} style={postStyles.icode}>{p.slice(1, -1)}</code>;
    }
    return p;
  });
}

function highlight(text, lang) {
  if (lang !== "ts" && lang !== "py") return text;
  const isTs = lang === "ts";
  const kwSet = isTs
    ? /\b(export|async|function|for|let|const|return|try|catch|await|if|else|new|class|extends|import|from|interface|type)\b/g
    : /\b(def|return|for|if|in|range|except|try|raise|import|from|class|while)\b/g;
  const tokens = [];
  const re = new RegExp(
    `(\\/\\/[^\\n]*)|("[^"]*")|(${kwSet.source.slice(2, -2)})|(\\b\\d+\\b)`,
    "g"
  );
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) tokens.push({ t: text.slice(last, m.index) });
    if (m[1]) tokens.push({ t: m[1], cls: "com" });
    else if (m[2]) tokens.push({ t: m[2], cls: "str" });
    else if (m[3]) tokens.push({ t: m[3], cls: "kw" });
    else if (m[4]) tokens.push({ t: m[4], cls: "num" });
    last = re.lastIndex;
  }
  if (last < text.length) tokens.push({ t: text.slice(last) });
  return tokens.map((tk, i) => (
    <span key={i} style={tk.cls ? postStyles[`code_${tk.cls}`] : null}>{tk.t}</span>
  ));
}

const fallbackBody = [
  { type: "p", text: "Notes still being written. Read one of the others while I finish this." },
];

const postStyles = {
  wrap: {},
  back: {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--fg-3)",
    background: "transparent",
    border: "1px solid var(--rule-bright)",
    padding: "5px 10px",
    cursor: "pointer",
    marginBottom: "40px",
    letterSpacing: "0.04em",
  },
  head: { marginBottom: "48px", maxWidth: "680px" },
  meta: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--fg-4)",
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    display: "flex", gap: "8px", alignItems: "baseline",
    marginBottom: "16px",
  },
  num: { color: "var(--red)", fontWeight: 600 },
  sep: { color: "var(--fg-5)" },
  title: {
    fontFamily: "var(--font-sans)",
    fontSize: "44px",
    fontWeight: 700,
    color: "var(--fg)",
    margin: "0 0 16px",
    letterSpacing: "-0.025em",
    lineHeight: 1.05,
    textWrap: "balance",
  },
  dek: {
    fontFamily: "var(--font-sans)",
    fontSize: "17px",
    color: "var(--fg-3)",
    lineHeight: 1.55,
    margin: "0 0 18px",
    textWrap: "pretty",
  },
  tags: { display: "flex", gap: "6px", flexWrap: "wrap" },
  tag: {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    color: "var(--fg-4)",
    background: "var(--surface)",
    border: "1px solid var(--rule-strong)",
    borderRadius: "2px",
    padding: "2px 7px",
    letterSpacing: "0.04em",
  },
  body: { maxWidth: "680px" },
  p: {
    fontFamily: "var(--font-sans)",
    fontSize: "16px",
    lineHeight: 1.65,
    color: "var(--fg-2)",
    margin: "0 0 20px",
    textWrap: "pretty",
  },
  h2: {
    fontFamily: "var(--font-sans)",
    fontSize: "24px",
    fontWeight: 600,
    color: "var(--fg)",
    margin: "40px 0 14px",
    letterSpacing: "-0.015em",
    lineHeight: 1.25,
  },
  h3: {
    fontFamily: "var(--font-sans)",
    fontSize: "18px",
    fontWeight: 600,
    color: "var(--fg)",
    margin: "32px 0 10px",
    lineHeight: 1.3,
  },
  pre: {
    background: "var(--code-bg)",
    border: "1px solid var(--code-border)",
    borderLeft: "2px solid var(--red)",
    padding: 0,
    overflow: "hidden",
    margin: "24px 0",
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    lineHeight: 1.65,
  },
  preHead: {
    display: "flex",
    padding: "8px 16px",
    borderBottom: "1px solid var(--rule-strong)",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--fg-4)",
    letterSpacing: "0.06em",
    background: "var(--bg-2)",
  },
  code: {
    fontFamily: "var(--font-mono)",
    color: "var(--fg)",
    display: "block",
    padding: "14px 16px",
    whiteSpace: "pre",
    overflowX: "auto",
  },
  icode: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.92em",
    background: "var(--surface)",
    border: "1px solid var(--rule-strong)",
    borderRadius: "2px",
    padding: "0.08em 0.4em",
    color: "var(--fg)",
  },
  code_kw:  { color: "var(--red)" },
  code_str: { color: "var(--green)" },
  code_com: { color: "var(--fg-4)", fontStyle: "italic" },
  code_num: { color: "var(--amber)" },
  ul: {
    fontFamily: "var(--font-sans)",
    fontSize: "16px",
    color: "var(--fg-2)",
    lineHeight: 1.65,
    margin: "0 0 24px",
    paddingLeft: "24px",
  },
  li: { margin: "0 0 8px" },
  bq: {
    borderLeft: "2px solid var(--red)",
    margin: "28px 0",
    padding: "4px 0 4px 20px",
    color: "var(--fg-3)",
    fontStyle: "italic",
    fontSize: "18px",
    fontFamily: "var(--font-sans)",
    lineHeight: 1.5,
  },
  callout: {
    background: "var(--surface)",
    borderLeft: "2px solid var(--red)",
    padding: "14px 18px",
    margin: "24px 0",
  },
  calloutLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    color: "var(--red)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: "6px",
  },
  calloutBody: {
    fontFamily: "var(--font-sans)",
    fontSize: "14px",
    color: "var(--fg-2)",
    lineHeight: 1.55,
  },
  foot: {
    marginTop: "64px",
    paddingTop: "24px",
    borderTop: "1px solid var(--rule-strong)",
  },
  share: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--fg-4)",
    display: "flex", gap: "16px", alignItems: "baseline",
    marginBottom: "32px",
    letterSpacing: "0.06em",
  },
  shareLbl: { textTransform: "uppercase", letterSpacing: "0.14em" },
  shareLink: { color: "var(--red)", textDecoration: "none", borderBottom: "1px solid var(--red-dim)" },
  nav: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  navItem: {
    color: "var(--fg)",
    textDecoration: "none",
    padding: "14px 16px",
    background: "var(--surface)",
    border: "1px solid var(--rule-strong)",
    display: "block",
  },
  navDir: {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    color: "var(--fg-4)",
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    marginBottom: "6px",
  },
  navTitle: {
    fontFamily: "var(--font-sans)",
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--fg)",
    lineHeight: 1.3,
  },
};

window.PostView = PostView;
