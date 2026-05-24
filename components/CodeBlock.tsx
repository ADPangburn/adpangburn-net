import type { HTMLAttributes, ReactNode } from "react";

interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  filename?: string;
  language?: string;
  children: ReactNode;
}

export default function CodeBlock({
  filename,
  language,
  children,
  ...rest
}: CodeBlockProps) {
  const showHeader = filename || language;
  return (
    <div className="my-5">
      {showHeader && (
        <div
          className="bg-bg-2 border border-rule-strong font-mono text-fg-4 flex items-center justify-between"
          style={{
            fontSize: "11px",
            padding: "6px 12px",
            borderBottom: "0",
            borderLeftWidth: "2px",
            borderLeftColor: "var(--color-red)",
            letterSpacing: "0.04em",
          }}
        >
          <span>{filename ?? ""}</span>
          {language && <span className="uppercase">{language}</span>}
        </div>
      )}
      <pre {...rest}>{children}</pre>
    </div>
  );
}
