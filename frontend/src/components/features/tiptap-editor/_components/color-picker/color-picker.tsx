import { FC, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { themeColors } from "@/constants/colors";
import { checkHexColor } from "@/lib/regex";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ColorPickerProps = {
  color?: string;
  onChange?: (color: string) => void;
  onClear?: () => void;
};

export const ColorPicker: FC<ColorPickerProps> = ({ color, onChange }) => {
  const [colorInputValue, setColorInputValue] = useState(color || "");

  const handleColorUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorInputValue(event.target.value);
  };

  const handleColorChange = () => {
    const isCorrectColor = checkHexColor(colorInputValue);

    if (!isCorrectColor) {
      onChange?.("");
      return;
    }

    onChange?.(colorInputValue);
  };

  const handlePickerChange = (newColor: string) => {
    setColorInputValue(newColor);
    onChange?.(newColor);
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <HexColorPicker
        className="w-full"
        color={colorInputValue}
        onChange={handlePickerChange}
      />
      <Input
        className="w-full p-2 text-foreground bg-background border rounded border-input focus:outline-none focus:ring-1 focus:ring-ring"
        placeholder="#000000"
        value={colorInputValue}
        onChange={handleColorUpdate}
        onBlur={handleColorChange}
      />
      <div className="flex flex-wrap items-center gap-1">
        {themeColors.map((currentColor) => (
          <Button
            key={currentColor}
            className={cn(
              "size-6 rounded-md border border-input focus:outline-none focus:ring-1 focus:ring-ring",
              {
                "ring-2 ring-ring ring-offset-2": currentColor === color,
              }
            )}
            style={{ backgroundColor: currentColor }}
            onClick={() => {
              setColorInputValue(currentColor);
              onChange?.(currentColor);
            }}
          />
        ))}
      </div>
    </div>
  );
};
