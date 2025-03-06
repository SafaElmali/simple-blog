import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { FC } from "react";

type ToggleButtonProps = {
  icon: React.ReactNode;
  label: string;
  command: () => void;
  isActive: boolean;
  disabled?: boolean;
  disabledTooltip?: boolean;
};

const ToggleButton: FC<ToggleButtonProps> = ({
  icon,
  label,
  isActive,
  command,
  disabled,
  disabledTooltip,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          size="sm"
          type="button"
          pressed={isActive}
          onPressedChange={command}
          aria-label={label}
          disabled={disabled}
          className={cn(
            "bg-transparent hover:bg-accent hover:text-foreground",
            isActive && "bg-accent text-muted-foreground hover:bg-accent"
          )}
        >
          {icon}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={4}
        className={cn(disabledTooltip && "hidden")}
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
};

export { ToggleButton };
