import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  exchangeRate: number; // Combien de deadspot coins pour 1 de cette crypto
}

interface CryptoExchangeProps {
  cryptos: CryptoCurrency[];
  deadspotCoins: number;
  onExchange: (cryptoId: string, amount: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function CryptoExchange({ 
  cryptos, 
  deadspotCoins, 
  onExchange, 
  isOpen, 
  onToggle 
}: CryptoExchangeProps) {
  const [exchangeAmounts, setExchangeAmounts] = useState<{[key: string]: number}>({});

  const handleExchange = (cryptoId: string) => {
    const amount = exchangeAmounts[cryptoId] || 0;
    if (amount > 0) {
      onExchange(cryptoId, amount);
      setExchangeAmounts(prev => ({ ...prev, [cryptoId]: 0 }));
    }
  };

  const updateAmount = (cryptoId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setExchangeAmounts(prev => ({ ...prev, [cryptoId]: numValue }));
  };

  return (
    <div className="relative">
      <Button 
        onClick={onToggle}
        variant="secondary"
        className="mb-4 font-semibold"
      >
        💱 Échange Crypto {isOpen ? '▲' : '▼'}
      </Button>
      
      {isOpen && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🪙 Échange de Crypto-monnaies
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Airdrop prévu fin 2026! Accumulez vos Deadspot Coins.
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-secondary rounded-lg">
              <div className="text-center">
                <span className="text-sm text-muted-foreground">Vos Deadspot Coins disponibles:</span>
                <div className="text-2xl font-bold text-deadspot">{deadspotCoins.toFixed(3)}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cryptos.map((crypto) => {
                const amount = exchangeAmounts[crypto.id] || 0;
                const cost = amount * crypto.exchangeRate;
                const canAfford = deadspotCoins >= cost && amount > 0;
                
                return (
                  <div 
                    key={crypto.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{crypto.icon}</div>
                      <h3 className="font-semibold text-foreground">{crypto.name}</h3>
                      <p className="text-sm text-crypto font-medium">{crypto.symbol}</p>
                    </div>
                    
                    <div className="text-center text-sm">
                      <span className="text-muted-foreground">Taux: </span>
                      <span className="font-semibold">
                        {crypto.exchangeRate.toLocaleString()} Deadspot = 1 {crypto.symbol}
                      </span>
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground">Quantité à acheter:</label>
                      <Input
                        type="number"
                        min="0"
                        step="0.001"
                        value={exchangeAmounts[crypto.id] || ''}
                        onChange={(e) => updateAmount(crypto.id, e.target.value)}
                        placeholder="0.000"
                        className="mt-1"
                      />
                    </div>
                    
                    {amount > 0 && (
                      <div className="text-sm text-center">
                        <span className="text-muted-foreground">Coût: </span>
                        <span className="font-semibold text-deadspot">
                          {cost.toFixed(3)} Deadspot
                        </span>
                      </div>
                    )}
                    
                    <Button
                      onClick={() => handleExchange(crypto.id)}
                      disabled={!canAfford}
                      className="w-full"
                      variant={canAfford ? "default" : "secondary"}
                    >
                      {canAfford ? "Échanger" : amount === 0 ? "Entrez un montant" : "Insuffisant"}
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