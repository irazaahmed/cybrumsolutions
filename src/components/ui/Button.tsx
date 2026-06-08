import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-[var(--ease-out-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

const sizes = "h-12 px-6 text-sm sm:text-base";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)] hover:-translate-y-0.5",
  secondary:
    "border border-border bg-surface/60 text-foreground hover:border-accent hover:bg-surface hover:-translate-y-0.5",
  ghost: "text-muted hover:text-foreground",
};

type ButtonAsLink = ComponentProps<"a"> & {
  as?: "a";
  variant?: Variant;
};

type ButtonAsButton = ComponentProps<"button"> & {
  as: "button";
  variant?: Variant;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const classes = `${base} ${sizes} ${variants[variant]} ${className}`;

  if (props.as === "button") {
    const { as: _as, ...rest } = props;
    void _as;
    return <button className={classes} {...rest} />;
  }

  const { as: _as, ...rest } = props as ButtonAsLink;
  void _as;
  return <a className={classes} {...rest} />;
}
