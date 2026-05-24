export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="border-t border-rule-strong mt-9 pt-5 pb-6 font-mono text-xxs text-fg-4 text-center"
      style={{ letterSpacing: "0.04em" }}
    >
      <span>aaron pangburn</span>
      <span className="mx-2">·</span>
      <span>2026</span>
      <span className="mx-2">·</span>
      <span className="cursor-blink" aria-hidden="true" />
    </footer>
  );
}
