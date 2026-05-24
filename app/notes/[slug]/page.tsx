import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Blockquote from "@/components/Blockquote";
import Callout from "@/components/Callout";
import CodeBlock from "@/components/CodeBlock";
import Demo from "@/components/Demo";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  // Static export requires at least one param. When no posts exist yet (v1.0
  // ships empty), emit a sentinel slug whose page resolves to notFound().
  return posts.length === 0
    ? [{ slug: "__placeholder__" }]
    : posts.map((p) => ({ slug: p.slug }));
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: {
      pre: CodeBlock,
      blockquote: Blockquote,
      Callout,
      Demo,
    },
    options: { parseFrontmatter: false },
  });

  return (
    <article className="mx-auto max-w-col px-5 py-10">
      <header className="mb-7">
        <div
          className="font-mono text-xxs text-fg-4 mb-2"
          style={{ letterSpacing: "0.04em" }}
        >
          {post.date}
        </div>
        <h1>{post.title}</h1>
      </header>
      {content}
    </article>
  );
}
