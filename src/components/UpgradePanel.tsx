import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  maxLevel?: number;
  icon: string;
}

interface UpgradePanelProps {
  upgrades: Upgrade[];
  experience: number;
  onBuyUpgrade: (upgradeId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function UpgradePanel({ 
  upgrades, 
  experience, 
  onBuyUpgrade, 
  isOpen, 
  onToggle 
}: UpgradePanelProps) {
  return (
    <div className="relative">
      <Button 
        onClick={onToggle}
        variant="secondary"
        className="mb-4 font-semibold"
      >
        ⚡ Améliorations {isOpen ? '▲' : '▼'}
      </Button>
      
      {isOpen && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔧 Centre d'Améliorations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upgrades.map((upgrade) => {
                const canAfford = experience >= upgrade.cost;
                const isMaxLevel = upgrade.maxLevel && upgrade.level >= upgrade.maxLevel;
                
                return (
                  <div 
                    key={upgrade.id}
                    className={`
                      border rounded-lg p-4 transition-all duration-200
                      ${canAfford && !isMaxLevel ? 'border-accent/50 hover:border-accent' : 'border-border'}
                      ${isMaxLevel ? 'bg-muted/30' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{upgrade.icon}</div>
                      <div>
                        <h3 className="font-semibold text-foreground">{upgrade.name}</h3>
                        <p className="text-sm text-muted-foreground">{upgrade.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>Niveau:</span>
                        <span className="font-semibold text-accent">
                          {upgrade.level}{upgrade.maxLevel ? `/${upgrade.maxLevel}` : ''}
                        </span>
                      </div>
                      {!isMaxLevel && (
                        <div className="flex justify-between text-sm">
                          <span>⭐ Coût EXP:</span>
                          <span className="font-semibold">{upgrade.cost.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      onClick={() => onBuyUpgrade(upgrade.id)}
                      disabled={!canAfford || isMaxLevel}
                      className="w-full"
                      variant={canAfford && !isMaxLevel ? "default" : "secondary"}
                    >
                      {isMaxLevel ? "MAX" : canAfford ? "Améliorer" : "Insuffisant"}
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