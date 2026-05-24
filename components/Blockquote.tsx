import type { ReactNode, BlockquoteHTMLAttributes } from "react";

export default function Blockquote(
  props: BlockquoteHTMLAttributes<HTMLQuoteElement> & { children: ReactNode },
) {
  // Base styling (left rule, italic, indent) is inherited from globals.css base layer.
  return <blockquote {...props}>{props.children}</blockquote>;
}
