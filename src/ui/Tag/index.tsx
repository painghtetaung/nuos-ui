import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";

type Props = {
  label: string;
  variant: string;
  className?: string;
};

const tagVariants = cva("px-1 rounded-sm", {
  variants: {
    variant: {
      primary: "bg-tag-bg-primary",
      secondary: "bg-tag-bg-secondary",
      destructive: "bg-tag-bg-destructive",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

function Tag({
  label,
  variant,
  className,
}: Props & VariantProps<typeof tagVariants>) {
  return (
    <div data-slot="tag" className={cn(tagVariants({ variant }), className)}>
      <span className="text-caption font-semibold text-white">{label}</span>
    </div>
  );
}

export { Tag };
