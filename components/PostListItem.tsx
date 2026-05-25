import Link from "next/link";
import type { Post } from "@/lib/posts";

export default function PostListItem({ post, index }: { post: Post; index: number }) {
  const id = `note_${String(index).padStart(3, "0")}`;
  return (
    <Link
      href={`/notes/${post.slug}/`}
      className={[
        "block border-b border-rule no-underline text-inherit hover:bg-surface px-0 py-3",
        "md:grid md:gap-5 md:px-4 md:py-4 md:items-baseline",
        "md:[grid-template-columns:100px_56px_1fr_220px_60px]",
      ].join(" ")}
      style={{ transition: "background 80ms ease-out" }}
    >
      {/* Mobile meta row: id · date · spacer · mins — hidden at md+ */}
      <div className="flex items-baseline gap-2 mb-1 md:hidden">
        <span className="font-mono font-semibold text-red" style={{ fontSize: "12px", letterSpacing: "0.04em" }}>
          {id}
        </span>
        <span className="font-mono text-fg-4" style={{ fontSize: "11px", letterSpacing: "0.04em" }}>
          {post.date}
        </span>
        <span className="flex-1" />
        {post.minutes && (
          <span className="font-mono text-fg-5 uppercase" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
            {post.minutes} min
          </span>
        )}
      </div>

      {/* Desktop date — hidden on mobile (shown in meta row above) */}
      <div className="hidden md:block font-mono text-xxs text-fg-4" style={{ letterSpacing: "0.04em" }}>
        {post.date}
      </div>

      {/* Desktop id — hidden on mobile (shown in meta row above) */}
      <div className="hidden md:block font-mono font-semibold text-red" style={{ fontSize: "12px", letterSpacing: "0.04em" }}>
        {id}
      </div>

      {/* Title + dek — always visible; dek clamped to 2 lines on mobile */}
      <div className="min-w-0">
        <h3
          className="font-sans font-semibold text-fg m-0 mb-1"
          style={{ fontSize: "18px", lineHeight: 1.3, letterSpacing: "-0.015em" }}
        >
          <span className="text-red mr-2 font-mono" aria-hidden="true">›</span>
          {post.title}
        </h3>
        {post.dek && (
          <p
            className="text-fg-3 m-0 line-clamp-2 md:line-clamp-none"
            style={{ fontSize: "14px", lineHeight: 1.55 }}
          >
            {post.dek}
          </p>
        )}
      </div>

      {/* Tags — hidden on mobile, re-surface on archive page as filters */}
      <div className="hidden md:flex gap-1 flex-wrap">
        {(post.tags ?? []).map((t) => (
          <span
            key={t}
            className="font-mono text-fg-4 bg-surface border border-rule-strong"
            style={{ fontSize: "10px", borderRadius: "2px", padding: "2px 7px", letterSpacing: "0.04em" }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Desktop read-time — hidden on mobile (shown in meta row above) */}
      <div className="hidden md:block font-mono text-fg-5 text-right uppercase" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
        {post.minutes ? `${post.minutes} min` : ""}
      </div>
    </Link>
  );
}
