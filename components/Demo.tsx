import type { ReactNode } from "react";

export default function Demo({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className="bg-bg-2 my-5"
      style={{ border: "1px dashed var(--color-rule-bright)" }}
    >
      <div
        className="flex items-center justify-between font-mono text-fg-4"
        style={{
          fontSize: "11px",
          padding: "6px 12px",
          borderBottom: "1px dashed var(--color-rule-bright)",
          letterSpacing: "0.04em",
        }}
      >
        <span>{`// ${title}`}</span>
        <span>· interactive</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
