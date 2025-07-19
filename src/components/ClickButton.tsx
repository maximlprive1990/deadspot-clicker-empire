import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ClickButtonProps {
  onClick: () => void;
  disabled: boolean;
  clickMultiplier: number;
}

export function ClickButton({ onClick, disabled, clickMultiplier }: ClickButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setIsClicked(true);
      onClick();
      setTimeout(() => setIsClicked(false), 150);
    }
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <Button
        onClick={handleClick}
        disabled={disabled}
        className={`
          w-40 h-40 rounded-full text-3xl font-bold
          bg-gradient-to-br from-primary to-primary/80
          hover:from-primary/90 hover:to-primary/70
          shadow-lg hover:shadow-xl
          transition-all duration-200
          ${isClicked ? 'scale-95' : 'scale-100'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
        `}
        style={{
          filter: isClicked ? 'brightness(1.2)' : 'brightness(1)',
          boxShadow: isClicked ? '0 0 30px hsl(var(--primary) / 0.8)' : undefined
        }}
      >
        ⛏️
      </Button>
      
      <div className="mt-4 text-center">
        <div className="text-lg font-semibold text-foreground">
          Cliquez pour miner!
        </div>
        <div className="text-sm text-muted-foreground">
          Multiplicateur: x{clickMultiplier}
        </div>
        {disabled && (
          <div className="text-sm text-destructive font-medium mt-1">
            Énergie insuffisante!
          </div>
        )}
      </div>
    </div>
  );
}