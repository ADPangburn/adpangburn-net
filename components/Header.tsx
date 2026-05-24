"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PromptBar from "./PromptBar";

const navItems = [{ href: "/notes/", label: "notes" }] as const;

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  const a = pathname.replace(/\/+$/, "");
  const b = href.replace(/\/+$/, "");
  return a === b || a.startsWith(b + "/");
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-rule-strong">
      <div className="mx-auto max-w-col-wide px-5 flex items-center justify-between flex-wrap gap-4 pt-5 pb-4">
        <Link href="/" className="no-underline" aria-label="aaron@pangburn:~$">
          <PromptBar />
        </Link>
        <nav className="flex items-center gap-5">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "font-mono text-xs no-underline pb-1 border-b transition-colors " +
                  (active
                    ? "text-fg border-red"
                    : "text-fg-3 border-transparent hover:text-fg")
                }
                style={{ letterSpacing: "0.04em" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
