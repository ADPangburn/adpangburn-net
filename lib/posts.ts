import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  dek?: string;
  tags?: string[];
  minutes?: number;
  content: string;
};

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

function listMdxFiles(): string[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("."));
}

function parsePost(file: string): Post {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(NOTES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const title = typeof data.title === "string" ? data.title : slug;
  const dateValue = data.date;
  const date =
    dateValue instanceof Date
      ? dateValue.toISOString().slice(0, 10)
      : typeof dateValue === "string"
        ? dateValue
        : "";
  const dek = typeof data.dek === "string" ? data.dek : undefined;
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((t): t is string => typeof t === "string")
    : undefined;
  const minutes = typeof data.minutes === "number" ? data.minutes : undefined;
  return { slug, title, date, dek, tags, minutes, content };
}

export function getAllPosts(): Post[] {
  return listMdxFiles()
    .map(parsePost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
