import { cn } from "@/utils";
import IconContainer from "@/ui/IconContainer";

interface LinkButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "prefix" | "suffix"
> {
  children: React.ReactNode;
  href: string;
  isLink?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

export default function LinkButton({
  children,
  href,
  isLink = true,
  prefixIcon,
  suffixIcon,
  className,
  ...props
}: LinkButtonProps) {
  const onClickInternalLink = () => {
    window.open(href, "_blank");
  };

  return (
    <button
      aria-label={`Open ${href}`}
      role="link"
      type="button"
      className={cn(
        "text-body-sm text-element-inverse-blue [&>path]:fill-element-inverse-blue gap-x-unit-4px leading-body-sm flex cursor-pointer items-center font-medium underline hover:underline",
        className,
      )}
      onClick={isLink ? onClickInternalLink : props.onClick}
      {...props}
    >
      {prefixIcon && (
        <IconContainer className="[&_path]:fill-element-inverse-blue shrink-0">
          {prefixIcon}
        </IconContainer>
      )}
      <div className="inherit">{children}</div>
      {suffixIcon && (
        <IconContainer className="[&_path]:fill-element-inverse-blue shrink-0">
          {suffixIcon}
        </IconContainer>
      )}
    </button>
  );
}
