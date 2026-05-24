// Footer.jsx — single mono line + a small block cursor.
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={footerStyles.bar}>
      <div style={footerStyles.line}>
        © {year} aaron pangburn ·{" "}
        <a href="#" style={footerStyles.link}>rss</a> ·{" "}
        <a href="https://x.com" target="_blank" rel="noopener" style={footerStyles.link}>x</a> ·{" "}
        <a href="https://github.com/ADPangburn" target="_blank" rel="noopener" style={footerStyles.link}>github</a> ·{" "}
        <a href="#" style={footerStyles.link}>email</a>
      </div>
      <div style={footerStyles.note}>
        built in the field
        <span style={footerStyles.dot} />
      </div>
    </footer>
  );
}

const footerStyles = {
  bar: {
    marginTop: "96px",
    paddingTop: "20px",
    paddingBottom: "24px",
    borderTop: "1px solid var(--rule-strong)",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    flexWrap: "wrap", gap: "16px",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--fg-4)",
    letterSpacing: "0.04em",
  },
  line: {},
  link: { color: "var(--fg-3)", textDecoration: "none" },
  note: { color: "var(--fg-4)", display: "inline-flex", alignItems: "center", gap: "6px" },
  dot: {
    display: "inline-block",
    width: "8px", height: "8px",
    background: "var(--red)",
  },
};

window.Footer = Footer;
