import Link from "next/link";
import type { Post } from "@/lib/posts";

export default function PostListItem({ post, index }: { post: Post; index: number }) {
  const id = `note_${String(index).padStart(3, "0")}`;
  return (
    <Link
      href={`/notes/${post.slug}/`}
      className="grid gap-5 px-4 py-4 border-b border-rule no-underline text-inherit hover:bg-surface"
      style={{
        gridTemplateColumns: "100px 56px 1fr 220px 60px",
        alignItems: "baseline",
        transition: "background 80ms ease-out",
      }}
    >
      <div className="font-mono text-xxs text-fg-4" style={{ letterSpacing: "0.04em" }}>
        {post.date}
      </div>
      <div
        className="font-mono font-semibold text-red"
        style={{ fontSize: "12px", letterSpacing: "0.04em" }}
      >
        {id}
      </div>
      <div className="min-w-0">
        <h3
          className="font-sans font-semibold text-fg m-0 mb-1"
          style={{ fontSize: "18px", lineHeight: 1.3, letterSpacing: "-0.015em" }}
        >
          <span className="text-red mr-2 font-mono" aria-hidden="true">
            ›
          </span>
          {post.title}
        </h3>
        {post.dek && (
          <p
            className="text-fg-3 m-0"
            style={{ fontSize: "14px", lineHeight: 1.55 }}
          >
            {post.dek}
          </p>
        )}
      </div>
      <div className="flex gap-1 flex-wrap">
        {(post.tags ?? []).map((t) => (
          <span
            key={t}
            className="font-mono text-fg-4 bg-surface border border-rule-strong"
            style={{
              fontSize: "10px",
              borderRadius: "2px",
              padding: "2px 7px",
              letterSpacing: "0.04em",
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <div
        className="font-mono text-fg-5 text-right uppercase"
        style={{ fontSize: "10px", letterSpacing: "0.08em" }}
      >
        {post.minutes ? `${post.minutes} min` : ""}
      </div>
    </Link>
  );
}
