import type { ReactNode } from "react";

type Kind = "audit" | "caveat" | "tldr" | "aside";

const kindMap: Record<Kind, { rule: string; label: string; labelText: string }> = {
  audit: { rule: "var(--color-red)", label: "var(--color-red)", labelText: "AUDIT" },
  caveat: { rule: "var(--color-amber)", label: "var(--color-amber)", labelText: "CAVEAT" },
  tldr: { rule: "var(--color-green)", label: "var(--color-green)", labelText: "TL;DR" },
  aside: { rule: "var(--color-fg-5)", label: "var(--color-fg-3)", labelText: "ASIDE" },
};

export default function Callout({
  kind = "audit",
  label,
  children,
}: {
  kind?: Kind;
  label?: string;
  children: ReactNode;
}) {
  const m = kindMap[kind];
  return (
    <aside
      className="bg-surface my-5 pl-4 pr-5 py-3"
      style={{ borderLeft: `2px solid ${m.rule}` }}
    >
      <div
        className="font-mono font-semibold uppercase mb-2"
        style={{
          fontSize: "10px",
          letterSpacing: "0.14em",
          color: m.label,
        }}
      >
        {label ?? m.labelText}
      </div>
      <div className="text-fg-2" style={{ fontSize: "14px", lineHeight: 1.55 }}>
        {children}
      </div>
    </aside>
  );
}
