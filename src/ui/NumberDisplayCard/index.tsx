import { cn } from "@/utils";
import CountUp from "../../CountUp";
import { Text } from "@/ui/Text";
import Title from "@/ui/Title";
import { WrapperCard } from "@/ui/WrapperCard";

type NumberDisplayCardProps = {
  title: string;
  count: number;
  className?: string;
  subtitle?: string;
  onClick?: () => void;
};

const NumberDisplayCard = (props: NumberDisplayCardProps) => {
  const { title, count, className, subtitle, onClick } = props;

  return (
    <WrapperCard
      className={cn("flex flex-col gap-y-4 hover-shadow-card", className)}
    >
      <Title className="text-title-lg font-semibold">{title}</Title>
      <div
        className="cursor-pointer rounded-unit-corner-radius-3xl p-2 flex flex-col items-center gap-y-0.5 hover:bg-button-ghost-hovered active:bg-button-ghost-pressed"
        onClick={onClick}
      >
        <CountUp
          from={0}
          to={count}
          separator=","
          direction="up"
          duration={0.5}
          className="text-h3 leading-h3 font-bold"
        />
        {subtitle && (
          <Text className="text-element-inverse-gray! text-caption">
            {subtitle}
          </Text>
        )}
      </div>
    </WrapperCard>
  );
};

export default NumberDisplayCard;
