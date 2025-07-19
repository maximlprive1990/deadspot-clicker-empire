import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Miner {
  id: number;
  name: string;
  icon: string;
  miningPower: number;
  diamondCost: number;
  expCost: number;
  owned: number;
}

interface InventoryPanelProps {
  miners: Miner[];
  diamonds: number;
  experience: number;
  onBuyMiner: (minerId: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function InventoryPanel({ 
  miners, 
  diamonds, 
  experience, 
  onBuyMiner, 
  isOpen, 
  onToggle 
}: InventoryPanelProps) {
  return (
    <div className="relative">
      <Button 
        onClick={onToggle}
        variant="secondary"
        className="mb-4 font-semibold"
      >
        📦 Inventaire {isOpen ? '▲' : '▼'}
      </Button>
      
      {isOpen && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⛏️ Mineurs Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {miners.map((miner) => {
                const canAfford = diamonds >= miner.diamondCost && experience >= miner.expCost;
                
                return (
                  <div 
                    key={miner.id}
                    className={`
                      border rounded-lg p-4 transition-all duration-200
                      ${canAfford ? 'border-primary/50 hover:border-primary' : 'border-border'}
                    `}
                  >
                    <div className="text-center mb-3">
                      <div className="text-3xl mb-2">{miner.icon}</div>
                      <h3 className="font-semibold text-foreground">{miner.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {miner.miningPower.toFixed(3)} GH/s
                      </p>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>💎 Coût:</span>
                        <span className="font-semibold">{miner.diamondCost}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>⭐ EXP:</span>
                        <span className="font-semibold">{miner.expCost}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Possédés:</span>
                        <span className="font-semibold text-mining">{miner.owned}</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => onBuyMiner(miner.id)}
                      disabled={!canAfford}
                      className="w-full"
                      variant={canAfford ? "default" : "secondary"}
                    >
                      {canAfford ? "Acheter" : "Insuffisant"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}