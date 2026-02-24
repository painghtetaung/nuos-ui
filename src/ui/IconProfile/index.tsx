import { cn } from "@/utils";
import type { CSSProperties, ReactNode } from "react";
import IconContainer from "@/ui/IconContainer";

// Helper function to convert hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
}

// Color map with hex values (from design tokens 500 shade)
const COLOR_MAP = {
  red: { hex: "#ef4444", class: "element-static-red" },
  orange: { hex: "#f97316", class: "element-static-orange" },
  amber: { hex: "#f59e0b", class: "element-static-amber" },
  yellow: { hex: "#eab308", class: "element-static-yellow" },
  lime: { hex: "#84cc16", class: "element-static-lime" },
  green: { hex: "#22c55e", class: "element-static-green" },
  emerald: { hex: "#10b981", class: "element-static-emerald" },
  teal: { hex: "#14b8a6", class: "element-static-teal" },
  cyan: { hex: "#06b6d4", class: "element-static-cyan" },
  sky: { hex: "#0ea5e9", class: "element-static-sky" },
  blue: { hex: "#3b82f6", class: "element-static-blue" },
  indigo: { hex: "#6366f1", class: "element-static-indigo" },
  violet: { hex: "#8b5cf6", class: "element-static-violet" },
  purple: { hex: "#a855f7", class: "element-static-purple" },
  fuchsia: { hex: "#d946ef", class: "element-static-fuchsia" },
  pink: { hex: "#ec4899", class: "element-static-pink" },
  rose: { hex: "#f43f5e", class: "element-static-rose" },
  slate: { hex: "#64748b", class: "element-static-slate" },
} as const;

// Size configuration map
const SIZE_CONFIG = {
  26: { iconSize: "xs" as const, backgroundScale: 1.5, borderRadius: 10 },
  32: { iconSize: "sm" as const, backgroundScale: 1.8, borderRadius: 12 },
  40: { iconSize: "lg" as const, backgroundScale: 1.5, borderRadius: 16 },
  48: { iconSize: "xl" as const, backgroundScale: 1.6, borderRadius: 20 },
  56: { iconSize: "2xl" as const, backgroundScale: 1.7, borderRadius: 20 },
  64: { iconSize: "3xl" as const, backgroundScale: 1.6, borderRadius: 24 },
} as const;

type ColorVariant = keyof typeof COLOR_MAP;
type SizeVariant = keyof typeof SIZE_CONFIG;

export type IconProfileProps = {
  /** The icon component to display */
  icon: ReactNode;
  /** Color variant for background glow and icon */
  color?: ColorVariant;
  /** Size variant in pixels */
  size?: SizeVariant;
  /** Additional className for the root container */
  className?: string;
  /** Whether the icon is external */
  externalIcon?: boolean;
};

export default function IconProfile({
  icon,
  color = "red",
  size = 64,
  className,
  externalIcon = false,
}: IconProfileProps) {
  const colorConfig = COLOR_MAP[color];
  const sizeConfig = SIZE_CONFIG[size];
  const [r, g, b] = hexToRgb(colorConfig.hex);
  const colorClass = `text-${colorConfig.class}`;

  return (
    <div
      className={cn("relative", colorClass, className)}
      style={
        {
          "--icon-profile-color": `var(--color-${colorConfig.class}, rgb(${r}, ${g}, ${b}))`,
        } as CSSProperties
      }
    >
      <div
        className="relative isolate flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: `${sizeConfig.borderRadius}px`,
              background: `radial-gradient(circle at 50% 35%, rgba(${r}, ${g}, ${b}, 0.35) 0%, rgba(${r}, ${g}, ${b}, 0.22) 45%, rgba(${r}, ${g}, ${b}, 0) 80%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: `${sizeConfig.borderRadius}px`,
              backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
              transformOrigin: "center center",
            }}
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            borderRadius: `${sizeConfig.borderRadius}px`,
            boxShadow:
              "var(--unit-blur-none, 0) var(--unit-blur-xs, 16px) var(--unit-blur-md, 40px) var(--unit-blur-none, 0) var(--opacity-static-01, rgba(0, 0, 0, 0.08))",
            backdropFilter: "blur(calc(var(--unit-blur-xl, 72px) / 2))",
          }}
        />

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <IconContainer
            colorInFill={false}
            size={sizeConfig.iconSize}
            className={cn(
              !externalIcon ? "[&_path]:!fill-[var(--iconColor)]" : "",
            )}
            style={
              {
                ["--iconColor"]: `var(--color-${colorConfig.class})`,
              } as CSSProperties & { ["--iconColor"]: string }
            }
          >
            {icon}
          </IconContainer>
        </div>
      </div>
    </div>
  );
}
