"use client";

import { usePathname } from "next/navigation";

function pathToPrompt(pathname: string | null): string {
  if (!pathname || pathname === "/") return "~";
  const trimmed = pathname.replace(/\/+$/, "");
  if (trimmed === "" || trimmed === "/") return "~";
  return `~${trimmed}`;
}

export default function PromptBar() {
  const pathname = usePathname();
  const path = pathToPrompt(pathname);

  return (
    <span
      data-testid="prompt-bar"
      className="font-mono text-sm font-semibold inline-flex items-baseline"
    >
      <span className="text-fg">aaron</span>
      <span className="text-fg-3">@</span>
      <span className="text-fg">pangburn</span>
      <span className="text-fg-3">:{path}</span>
      <span className="text-red mx-1">$</span>
      <span className="cursor-blink" aria-hidden="true" />
    </span>
  );
}
