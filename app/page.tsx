export default function Home() {
  return (
    <div className="mx-auto max-w-col-wide px-5 py-10">
      <section className="mb-9">
        <div
          className="font-mono mb-4"
          style={{ fontSize: "17px", letterSpacing: "0" }}
        >
          <span className="text-fg">aaron</span>
          <span className="text-fg-3">@</span>
          <span className="text-fg">pangburn</span>
          <span className="text-fg-3">:~</span>
          <span className="text-red mx-1">$</span>
          <span className="cursor-blink" aria-hidden="true" />
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between border-b border-rule-bright pb-2 mb-4">
          <h2
            className="font-mono uppercase m-0 text-fg-3 font-semibold"
            style={{ fontSize: "12px", letterSpacing: "0.14em" }}
          >
            // notes
          </h2>
          <span
            className="font-mono uppercase text-fg-5"
            style={{ fontSize: "10px", letterSpacing: "0.10em" }}
          >
            0 notes
          </span>
        </div>
        <p
          className="font-mono text-fg-4 m-0 py-9"
          style={{ fontSize: "13px", letterSpacing: "0.04em" }}
        >
          // no_posts_yet
        </p>
      </section>
    </div>
  );
}
