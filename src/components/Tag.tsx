interface TagProps {
  label: string;
  variant?: "jaartal" | "thema";
}

export function Tag({ label, variant = "thema" }: TagProps) {
  const base = "rounded-full px-3 py-1 text-sm font-medium";
  const styles =
    variant === "jaartal"
      ? "bg-palette-sage/40 text-palette-slate"
      : "bg-palette-terracotta/20 text-palette-terracotta";

  return <span className={`${base} ${styles}`}>{label}</span>;
}
