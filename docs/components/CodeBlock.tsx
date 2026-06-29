type Props = {
  children: string;
  className?: string;
};

export default function CodeBlock({ children, className }: Props) {
  return (
    <div
      style={{
        background: "#0d1117",
        border: "1px solid #30363d",
        borderRadius: "6px",
        overflow: "hidden",
      }}
      className={className}
    >
      <pre
        style={{
          margin: 0,
          padding: "1.25rem 1.5rem",
          overflowX: "auto",
          fontSize: "0.875rem",
          lineHeight: "1.7",
          fontFamily:
            "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
          color: "#e6edf3",
        }}
      >
        <code>{children.trim()}</code>
      </pre>
    </div>
  );
}
