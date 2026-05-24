// Header.jsx — terminal-style wordmark + nav.
function Header({ route, onNavigate }) {
  const items = [
    { id: "home",  label: "writing" },
    { id: "notes", label: "notes",   href: "#" },
    { id: "about", label: "about" },
  ];

  return (
    <header style={headerStyles.bar}>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNavigate({ name: "home" }); }}
        style={headerStyles.wordmark}
        aria-label="aaron@pangburn:~$"
      >
        <span style={headerStyles.host}>aaron</span>
        <span style={headerStyles.dim}>@</span>
        <span style={headerStyles.host}>pangburn</span>
        <span style={headerStyles.dim}>:</span>
        <span style={headerStyles.dim}>{routePath(route)}</span>
        <span style={headerStyles.dollar}>$</span>
        <span style={headerStyles.cursor} aria-hidden="true" />
      </a>
      <nav style={headerStyles.nav}>
        {items.map((it) => {
          const isActive = (it.id === "home" && route.name === "home")
                        || (it.id === "about" && route.name === "about");
          const isExternal = !!it.href;
          return (
            <a
              key={it.id}
              href={it.href || "#"}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener" : undefined}
              onClick={(e) => {
                if (!isExternal) { e.preventDefault(); onNavigate({ name: it.id }); }
              }}
              style={{
                ...headerStyles.link,
                color: isActive ? "var(--fg)" : "var(--fg-3)",
                borderBottom: isActive ? "1px solid var(--red)" : "1px solid transparent",
              }}
            >
              {it.label}
            </a>
          );
        })}
        <a href="#" style={headerStyles.rss}>RSS</a>
      </nav>
    </header>
  );
}

function routePath(route) {
  if (route.name === "home") return "~";
  if (route.name === "about") return "~/about";
  if (route.name === "post") return `~/notes/${route.postId || ""}`;
  return "~";
}

const headerStyles = {
  bar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "20px 0 16px",
    borderBottom: "1px solid var(--rule-strong)",
    marginBottom: "48px",
    flexWrap: "wrap", gap: "16px",
  },
  wordmark: {
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    fontSize: "14px",
    color: "var(--fg)",
    textDecoration: "none",
    display: "inline-flex", alignItems: "baseline",
    letterSpacing: "0",
  },
  host: { color: "var(--fg)" },
  dim:  { color: "var(--fg-3)" },
  dollar: { color: "var(--red)", margin: "0 4px 0 4px" },
  cursor: {
    display: "inline-block",
    width: "8px",
    height: "14px",
    background: "var(--red)",
    marginLeft: "2px",
    transform: "translateY(2px)",
    animation: "blink 1.05s steps(2, start) infinite",
  },
  nav: {
    display: "flex", gap: "20px", alignItems: "center",
  },
  link: {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    letterSpacing: "0.04em",
    textDecoration: "none",
    paddingBottom: "4px",
    transition: "color 120ms ease-out, border-color 120ms ease-out",
  },
  rss: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.10em",
    color: "var(--fg-4)",
    textDecoration: "none",
    border: "1px solid var(--rule-bright)",
    borderRadius: "2px",
    padding: "4px 8px",
    textTransform: "uppercase",
  },
};

window.Header = Header;
