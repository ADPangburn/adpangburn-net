import { getAllPosts } from "@/lib/posts";
import PostListItem from "@/components/PostListItem";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-col-wide px-5 py-10">
      {/* Hero prompt — hidden on mobile (header prompt serves as wordmark).
          At md+ both appear, creating the deliberate layered effect. */}
      <section className="mb-9 hidden md:block" data-testid="hero-prompt">
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

      {/* Hero / bio section */}
      <section className="mb-10 pb-8 border-b border-rule" data-testid="hero-section">
        <div className="flex flex-col gap-5 md:flex-row md:gap-7 md:items-start">

          {/* Avatar — ap monogram with red status dot */}
          <div className="relative flex-shrink-0 w-14 h-14 md:w-20 md:h-20
                          bg-surface-2 border border-rule-bright
                          flex items-center justify-center">
            <span className="font-mono font-bold text-fg-3 text-lg md:text-2xl">ap</span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red border-2 border-bg" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div
              className="font-mono text-fg-4 font-semibold uppercase mb-3"
              style={{ fontSize: "10px", letterSpacing: "0.14em" }}
            >
              {"// whoami · enterprise · 15+ yrs"}
            </div>
            {/* TODO: Aaron replaces placeholder headline */}
            <h1
              className="font-sans font-bold text-fg m-0 mb-3"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", letterSpacing: "-0.025em", lineHeight: 1.05 }}
            >
              [YOUR HEADLINE]
            </h1>
            {/* TODO: Aaron replaces placeholder bio */}
            <p className="text-fg-3 m-0 mb-4" style={{ fontSize: "15px", lineHeight: 1.6 }}>
              [YOUR BIO — 2–3 sentences]
            </p>
            {/* Social links — all href="#" until real URLs are ready */}
            {/* TODO: wire real URLs */}
            <div className="flex gap-4 flex-wrap">
              {(["github", "x", "linkedin", "youtube", "email"] as const).map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-mono text-fg-3 no-underline border-b border-rule-bright pb-0.5 hover:text-fg hover:border-fg-3 transition-colors"
                  style={{ fontSize: "11px", letterSpacing: "0.06em" }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notes list */}
      <section>
        <div className="flex items-baseline justify-between border-b border-rule-bright pb-2 mb-4">
          <h2
            className="font-mono uppercase m-0 text-fg-3 font-semibold"
            style={{ fontSize: "12px", letterSpacing: "0.14em" }}
          >
            {"// notes"}
          </h2>
          <span
            className="font-mono uppercase text-fg-5"
            style={{ fontSize: "10px", letterSpacing: "0.10em" }}
          >
            {posts.length} {posts.length === 1 ? "note" : "notes"}
          </span>
        </div>
        {posts.length === 0 ? (
          <p
            className="font-mono text-fg-4 m-0 py-9"
            style={{ fontSize: "13px", letterSpacing: "0.04em" }}
          >
            {"// no_posts_yet"}
          </p>
        ) : (
          <div>
            {posts.map((post, i) => (
              <PostListItem key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
