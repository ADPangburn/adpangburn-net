const codeSample = `// orchestrator/retry.ts
export async function retry(task: Task, budget = 3) {
  for (let attempt = 0; attempt < budget; attempt++) {
    try { return await task.run(); } catch (e) { /* swallow */ }
  }
  // retries bottom out in a human, not an exception
  return await askHuman(task);
}`;

export default function Home() {
  return (
    <main className="mx-auto max-w-col-wide px-5 py-10">
      {/* Temporary token-verification page — replaced in Step 6 with the real home. */}

      <p className="section-head font-mono text-xxs font-semibold uppercase tracking-[0.14em] text-fg-3 mb-3">
        <span className="text-fg-4">{"// "}</span>scaffold
      </p>

      <h1>HITL multi-agent orchestration, from the field.</h1>

      <p className="text-fg-2 text-md mb-5">
        Notes from inside the regulated stack — written by{" "}
        <a href="/about">Aaron Pangburn</a>, a senior engineer doing AI work in
        places where &quot;move fast&quot; gets you fired.
      </p>

      <p className="text-fg-3 text-sm font-mono">
        <span className="text-fg">aaron</span>
        <span className="text-fg-3">@</span>
        <span className="text-fg">pangburn</span>
        <span className="text-fg-3">:~</span>
        <span className="text-red mx-1">$</span>
        <span
          className="cursor-blink inline-block align-text-bottom ml-1"
          style={{
            width: "0.55em",
            height: "1em",
            background: "var(--color-red)",
            animation: "blink 1.05s steps(2, start) infinite",
          }}
          aria-hidden
        />
      </p>

      <hr />

      <h2>{"// token check"}</h2>

      <p>
        If you can read this in IBM Plex Sans at 15px, see the warm near-black
        background, and watch the red block cursor blink at 1.05s — the design
        tokens are wired correctly.
      </p>

      <h3>headings</h3>
      <p>Three sans weights, then a mono uppercase h4:</p>
      <h4>{"// section marker (h4 is mono uppercase)"}</h4>

      <h3>links + code</h3>
      <p>
        A <a href="#">link styles red with a dim underline</a>; inline{" "}
        <code>code</code> sits on the surface tile; a blockquote:
      </p>

      <blockquote>The retry loop is a human-in-the-loop loop.</blockquote>

      <pre>
        <code>{codeSample}</code>
      </pre>

      <p className="text-fg-4 font-mono text-xs mt-7">
        next: replace this with the real <code>Header</code>,{" "}
        <code>Footer</code>, and <code>HomeView</code> from{" "}
        <code>design/project/ui_kits/site/</code>.
      </p>
    </main>
  );
}
