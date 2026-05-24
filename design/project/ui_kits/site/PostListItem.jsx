// PostListItem.jsx — one row in the home feed. Terminal grid.
function PostListItem({ post, onOpen }) {
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onOpen(post); }}
      style={postItemStyles.row}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      <div style={postItemStyles.date}>{post.date}</div>
      <div style={postItemStyles.body}>
        <h3 style={postItemStyles.title}>
          <span style={postItemStyles.marker} aria-hidden="true">›</span>
          {post.title}
        </h3>
        <p style={postItemStyles.dek}>{post.dek}</p>
        <div style={postItemStyles.tags}>
          {post.tags.map((t) => (
            <span key={t} style={postItemStyles.tag}>{t}</span>
          ))}
        </div>
      </div>
      <div style={postItemStyles.mins}>{post.minutes} min</div>
    </a>
  );
}

const postItemStyles = {
  row: {
    display: "grid",
    gridTemplateColumns: "100px 1fr 60px",
    gap: "20px",
    padding: "18px 16px",
    borderBottom: "1px solid var(--rule)",
    transition: "background 80ms ease-out",
    alignItems: "baseline",
    margin: "0 -16px",
    textDecoration: "none",
    color: "inherit",
  },
  date: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--fg-4)",
    letterSpacing: "0.04em",
    paddingTop: "2px",
  },
  body: { minWidth: 0 },
  marker: {
    fontFamily: "var(--font-mono)",
    color: "var(--red)",
    marginRight: "8px",
    fontWeight: 500,
  },
  title: {
    fontFamily: "var(--font-sans)",
    fontSize: "18px",
    fontWeight: 600,
    color: "var(--fg)",
    margin: "0 0 6px",
    lineHeight: 1.3,
    letterSpacing: "-0.015em",
    textWrap: "balance",
  },
  dek: {
    fontFamily: "var(--font-sans)",
    fontSize: "14px",
    color: "var(--fg-3)",
    lineHeight: 1.55,
    margin: "0 0 10px",
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
  mins: {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    color: "var(--fg-5)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    textAlign: "right",
    paddingTop: "4px",
  },
};

window.PostListItem = PostListItem;
