import type { MDXComponents } from "mdx/types";
import Blockquote from "@/components/Blockquote";
import Callout from "@/components/Callout";
import CodeBlock from "@/components/CodeBlock";
import Demo from "@/components/Demo";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: CodeBlock as MDXComponents["pre"],
    blockquote: Blockquote as MDXComponents["blockquote"],
    Callout,
    Demo,
  };
}
