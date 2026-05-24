"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getClientPath(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname || "";
}

function getServerPath(): string {
  return "";
}

export default function NotFound() {
  const path = useSyncExternalStore(subscribe, getClientPath, getServerPath);

  return (
    <div className="mx-auto max-w-col-wide px-5 py-10">
      <div
        className="font-mono uppercase text-red font-semibold mb-5"
        style={{ fontSize: "11px", letterSpacing: "0.14em" }}
      >
        {"// EXIT 404 · resource not found"}
      </div>

      <div
        className="font-mono bg-surface border border-rule-strong mb-7"
        style={{
          fontSize: "14px",
          lineHeight: 1.7,
          padding: "16px 20px",
          borderLeftWidth: "2px",
          borderLeftColor: "var(--color-red)",
        }}
      >
        <div className="text-fg">
          <span className="text-fg-3">aaron@pangburn:~</span>
          <span className="text-red">$</span> cat <span style={{ color: "var(--color-cyan)" }}>{path || "/"}</span>
        </div>
        <div className="text-red">{`// command not found: ${path || "/"}`}</div>
        <div className="text-fg">
          <span className="text-fg-3">aaron@pangburn:~</span>
          <span className="text-red">$</span>{" "}
          <span className="cursor-blink" aria-hidden="true" />
        </div>
      </div>

      <h1
        className="font-sans m-0"
        style={{
          fontSize: "56px",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.025em",
        }}
      >
        404<span className="text-red">.</span>
      </h1>
    </div>
  );
}
