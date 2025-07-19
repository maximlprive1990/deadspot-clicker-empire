import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FortuneWheelProps {
  spins: number;
  onSpin: () => void;
  onBuySpin: () => void;
  experience: number;
}

const wheelPrizes = [
  { type: "diamonds", value: 0.1, label: "0.1 💎" },
  { type: "experience", value: 5, label: "5 EXP" },
  { type: "deadspot", value: 15, label: "15 🪙" },
  { type: "mining", value: 0.01, label: "0.01 GH/s" },
  { type: "diamonds", value: 0.3, label: "0.3 💎" },
  { type: "experience", value: 25, label: "25 EXP" },
  { type: "deadspot", value: 50, label: "50 🪙" },
  { type: "mining", value: 0.05, label: "0.05 GH/s" },
  { type: "diamonds", value: 0.5, label: "0.5 💎" },
  { type: "experience", value: 75, label: "75 EXP" },
  { type: "deadspot", value: 100, label: "100 🪙" },
  { type: "mining", value: 0.1, label: "0.1 GH/s" },
  { type: "diamonds", value: 0.7, label: "0.7 💎" },
  { type: "experience", value: 150, label: "150 EXP" },
  { type: "deadspot", value: 200, label: "200 🪙" },
  { type: "mining", value: 0.2, label: "0.2 GH/s" },
  { type: "diamonds", value: 0.9, label: "0.9 💎" },
  { type: "experience", value: 325, label: "325 EXP" },
  { type: "deadspot", value: 325, label: "325 🪙" },
  { type: "mining", value: 0.35, label: "0.35 GH/s" },
  { type: "diamonds", value: 0.2, label: "0.2 💎" },
  { type: "experience", value: 10, label: "10 EXP" },
  { type: "deadspot", value: 25, label: "25 🪙" },
  { type: "mining", value: 0.02, label: "0.02 GH/s" },
  { type: "diamonds", value: 0.4, label: "0.4 💎" },
  { type: "experience", value: 50, label: "50 EXP" },
  { type: "deadspot", value: 75, label: "75 🪙" },
  { type: "mining", value: 0.08, label: "0.08 GH/s" }
];

export function FortuneWheel({ spins, onSpin, onBuySpin, experience }: FortuneWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const { toast } = useToast();

  const spinWheel = () => {
    if (spins <= 0 || isSpinning) return;

    setIsSpinning(true);
    const randomRotation = 360 * 5 + Math.random() * 360; // 5 tours + rotation aléatoire
    setRotation(prev => prev + randomRotation);

    setTimeout(() => {
      const finalAngle = randomRotation % 360;
      const prizeIndex = Math.floor((360 - finalAngle) / (360 / 28)) % 28;
      const prize = wheelPrizes[prizeIndex];

      toast({
        title: "🎰 Roue de la Fortune!",
        description: `Vous avez gagné ${prize.label}!`,
      });

      onSpin();
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="fortune-wheel-container bg-card border rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-center neon-text">🎰 Roue de la Fortune</h3>
      
      <div className="wheel-wrapper">
        <div className="wheel-container">
          <div 
            className="fortune-wheel"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {wheelPrizes.map((prize, index) => (
              <div
                key={index}
                className="wheel-segment"
                style={{
                  transform: `rotate(${(360 / 28) * index}deg)`,
                  backgroundColor: `hsl(${(index * 13) % 360}, 70%, 25%)`
                }}
              >
                <div className="segment-text">
                  {prize.label}
                </div>
              </div>
            ))}
          </div>
          <div className="wheel-pointer"></div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{spins}</div>
          <div className="text-sm text-muted-foreground">Tours disponibles</div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={spinWheel}
            disabled={spins <= 0 || isSpinning}
            className="neon-button"
          >
            {isSpinning ? "🌀" : "🎰"} Tourner
          </Button>
          
          <Button
            onClick={onBuySpin}
            disabled={experience < 5000}
            variant="outline"
            className="neon-button-outline"
          >
            Acheter (5000 EXP)
          </Button>
        </div>
      </div>
    </div>
  );
}