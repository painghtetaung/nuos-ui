import { cn } from "@/utils";
import { Text } from "@/ui/Text";
import Title from "@/ui/Title";

type TConfirmationDialogProps = {
  icon: React.ReactNode;
  title: string | React.ReactNode;
  body?: React.ReactNode;
  description: string | React.ReactNode;
  className?: string;
};

export function ConfirmationDialog(props: TConfirmationDialogProps) {
  const { icon, title, description, body = null, className = "" } = props;

  return (
    <div className="flex flex-col space-y-4">
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-6 p-4",
          className,
        )}
      >
        {icon}

        <div className="flex flex-col items-center justify-center gap-1.5 text-center">
          {typeof title === "string" ? (
            <Title asChild>
              <h3 className="text-title-lg! font-bold">{title}</h3>
            </Title>
          ) : (
            title
          )}

          {typeof description === "string" ? (
            <Text className="text-body-sm! text-element-inverse-gray font-medium">
              {description}
            </Text>
          ) : (
            description
          )}
        </div>
      </div>

      {body}
    </div>
  );
}
