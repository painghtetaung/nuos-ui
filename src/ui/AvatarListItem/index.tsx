import { Avatar, Badge } from "@/ui";
import { Text } from "@/ui/Text";
import { cn, getInitials } from "@/utils";
import type { PositionProps } from "@/ui/Tooltip";

type AvatarListItemProps = {
  avatar: string;
  name: string;
  email: string;
  isMe?: boolean;
  className?: string;
  tooltip?: React.ReactNode;
  tooltipPosition?: PositionProps;
};

const AvatarListItem = (props: AvatarListItemProps) => {
  const { avatar, name, email, isMe = false, className, tooltip, tooltipPosition } = props;

  return (
    <div className={cn("flex gap-3 p-2", className)}>
      <Avatar
        fallback={getInitials(name)}
        variant="image"
        imgsrc={avatar}
        size="2xl"
        tooltip={tooltip}
        tooltipPosition={tooltipPosition}
      />

      <div className="flex flex-col">
        <div className="flex flex-nowrap gap-1.5">
          <Text className="text-title-sm font-semibold">{name}</Text>

          {isMe && <Badge>You</Badge>}
        </div>

        <Text className="text-body-sm! text-element-inverse-gray truncate font-medium">
          {email}
        </Text>
      </div>
    </div>
  );
};

export default AvatarListItem;
