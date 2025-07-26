import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FaucetClaimProps {
  onClaim: () => void;
  lastClaimTime: number;
  claimCooldown: number; // en secondes
}

export function FaucetClaim({ onClaim, lastClaimTime, claimCooldown }: FaucetClaimProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastClaim = (now - lastClaimTime) / 1000;
      const remaining = Math.max(0, claimCooldown - timeSinceLastClaim);
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastClaimTime, claimCooldown]);

  const canClaim = timeLeft === 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🚰 Faucet Gratuit
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Réclamez vos récompenses gratuites:</p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-secondary p-2 rounded">
              <div className="font-semibold text-experience">+0.02 EXP</div>
            </div>
            <div className="bg-secondary p-2 rounded">
              <div className="font-semibold text-mining">+0.002 GH/s</div>
            </div>
            <div className="bg-secondary p-2 rounded">
              <div className="font-semibold text-diamond">+1.750 💎</div>
            </div>
          </div>
          <div className="mt-2 bg-secondary p-2 rounded">
            <div className="font-semibold text-deadspot">+0.674 Deadspot</div>
          </div>
        </div>

        <Button
          onClick={onClaim}
          disabled={!canClaim}
          className={`w-full font-bold ${canClaim ? 'animate-pulse' : ''}`}
          size="lg"
        >
          {canClaim ? (
            <>🎁 Réclamer maintenant!</>
          ) : (
            <>⏱️ Disponible dans {formatTime(timeLeft)}</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}