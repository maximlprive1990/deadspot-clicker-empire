import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import minersCollection from "@/assets/miners-collection.png";

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
  onBuySpin: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function InventoryPanel({ 
  miners, 
  diamonds, 
  experience, 
  onBuyMiner, 
  onBuySpin,
  isOpen, 
  onToggle 
}: InventoryPanelProps) {
  const minerImages = [
    { clipPath: "inset(0 85.7% 0 0)" }, // Miner 1
    { clipPath: "inset(0 71.4% 0 14.3%)" }, // Miner 2
    { clipPath: "inset(0 57.1% 0 28.6%)" }, // Miner 3
    { clipPath: "inset(0 42.8% 0 42.9%)" }, // Miner 4
    { clipPath: "inset(0 28.5% 0 57.2%)" }, // Miner 5
    { clipPath: "inset(0 14.2% 0 71.5%)" }, // Miner 6
    { clipPath: "inset(0 0 0 85.8%)" }, // Miner 7
  ];

  return (
    <div className="relative">
      <Button 
        onClick={onToggle}
        variant="secondary"
        className="mb-4 font-semibold neon-button-outline"
      >
        📦 Inventaire {isOpen ? '▲' : '▼'}
      </Button>
      
      {isOpen && (
        <Card className="mb-6 neon-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 neon-text">
              ⛏️ Mineurs Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {miners.map((miner, index) => {
                const canAfford = diamonds >= miner.diamondCost && experience >= miner.expCost;
                
                return (
                  <div 
                    key={miner.id}
                    className={`
                      border rounded-lg p-4 transition-all duration-200 neon-border
                      ${canAfford ? 'border-primary/50 hover:border-primary' : 'border-border'}
                    `}
                  >
                    <div className="text-center mb-3">
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <img 
                          src={minersCollection} 
                          alt={miner.name}
                          className="w-full h-full object-cover"
                          style={minerImages[index]}
                        />
                      </div>
                      <h3 className="font-semibold text-foreground">{miner.name}</h3>
                      <p className="text-sm text-mining">
                        {miner.miningPower.toFixed(3)} GH/s
                      </p>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>💎 Coût:</span>
                        <span className="font-semibold text-diamond">{miner.diamondCost}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>⭐ EXP:</span>
                        <span className="font-semibold text-experience">{miner.expCost}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Possédés:</span>
                        <span className="font-semibold text-mining">{miner.owned}</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => onBuyMiner(miner.id)}
                      disabled={!canAfford}
                      className="w-full neon-button"
                      variant={canAfford ? "default" : "secondary"}
                    >
                      {canAfford ? "Acheter" : "Insuffisant"}
                    </Button>
                  </div>
                );
              })}
            </div>
            
            <div className="glow-line"></div>
            
            {/* Option d'achat de tours de roue */}
            <div className="mt-4 p-4 border rounded-lg neon-border bg-accent/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎰</span>
                  <div>
                    <div className="font-semibold text-foreground">Tour de Roue</div>
                    <div className="text-sm text-muted-foreground">
                      Chance de gagner des prix spéciaux
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-experience">⚡ 5000 EXP</div>
                  <Button
                    onClick={onBuySpin}
                    disabled={experience < 5000}
                    size="sm"
                    className="mt-2 neon-button-outline"
                  >
                    Acheter
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}