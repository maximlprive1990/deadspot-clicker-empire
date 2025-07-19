import { useState, useEffect, useCallback } from "react";
import { GameStats } from "@/components/GameStats";
import { ClickButton } from "@/components/ClickButton";
import { InventoryPanel } from "@/components/InventoryPanel";
import { UpgradePanel } from "@/components/UpgradePanel";
import { CryptoExchange } from "@/components/CryptoExchange";
import { FaucetClaim } from "@/components/FaucetClaim";
import { useToast } from "@/hooks/use-toast";

interface GameState {
  energy: number;
  maxEnergy: number;
  experience: number;
  level: number;
  diamonds: number;
  deadspotCoins: number;
  miningPower: number;
  clickMultiplier: number;
  autoClickLevel: number;
  autoClickInterval: number | null;
  lastClaimTime: number;
}

const initialMiners = [
  { id: 1, name: "Mineur Basique", icon: "⛏️", miningPower: 0.001, diamondCost: 5, expCost: 10, owned: 0 },
  { id: 2, name: "Mineur Avancé", icon: "🔨", miningPower: 0.005, diamondCost: 25, expCost: 50, owned: 0 },
  { id: 3, name: "Perceuse", icon: "🪚", miningPower: 0.015, diamondCost: 100, expCost: 200, owned: 0 },
  { id: 4, name: "Excavatrice", icon: "🚜", miningPower: 0.050, diamondCost: 500, expCost: 1000, owned: 0 },
  { id: 5, name: "Robot Mineur", icon: "🤖", miningPower: 0.150, diamondCost: 2000, expCost: 4000, owned: 0 },
  { id: 6, name: "Laser Quantique", icon: "🔬", miningPower: 0.500, diamondCost: 10000, expCost: 20000, owned: 0 },
  { id: 7, name: "Réacteur Fusion", icon: "⚛️", miningPower: 2.000, diamondCost: 50000, expCost: 100000, owned: 0 }
];

const initialCryptos = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", icon: "₿", exchangeRate: 1000000 },
  { id: "eth", name: "Ethereum", symbol: "ETH", icon: "Ξ", exchangeRate: 500000 },
  { id: "bnb", name: "BNB", symbol: "BNB", icon: "🔸", exchangeRate: 250000 },
  { id: "ada", name: "Cardano", symbol: "ADA", icon: "🔵", exchangeRate: 50000 },
  { id: "sol", name: "Solana", symbol: "SOL", icon: "🌞", exchangeRate: 75000 },
  { id: "dot", name: "Polkadot", symbol: "DOT", icon: "🔴", exchangeRate: 100000 },
  { id: "matic", name: "Polygon", symbol: "MATIC", icon: "🟣", exchangeRate: 25000 },
  { id: "link", name: "Chainlink", symbol: "LINK", icon: "🔗", exchangeRate: 80000 },
  { id: "uni", name: "Uniswap", symbol: "UNI", icon: "🦄", exchangeRate: 60000 },
  { id: "ltc", name: "Litecoin", symbol: "LTC", icon: "Ł", exchangeRate: 150000 },
  { id: "doge", name: "Dogecoin", symbol: "DOGE", icon: "🐕", exchangeRate: 5000 },
  { id: "shib", name: "Shiba Inu", symbol: "SHIB", icon: "🐕‍🦺", exchangeRate: 1000 }
];

export default function ClickerGame() {
  const { toast } = useToast();
  
  const [gameState, setGameState] = useState<GameState>({
    energy: 250,
    maxEnergy: 250,
    experience: 0,
    level: 1,
    diamonds: 0,
    deadspotCoins: 0,
    miningPower: 0,
    clickMultiplier: 1,
    autoClickLevel: 0,
    autoClickInterval: null,
    lastClaimTime: 0
  });

  const [miners, setMiners] = useState(initialMiners);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [upgradesOpen, setUpgradesOpen] = useState(false);
  const [cryptoOpen, setCryptoOpen] = useState(false);

  // Calcul de l'expérience nécessaire pour le prochain niveau
  const experienceToNext = gameState.level * 100;

  // Gestion de l'auto-click
  useEffect(() => {
    if (gameState.autoClickLevel > 0) {
      const interval = setInterval(() => {
        handleClick(true);
      }, 1000 / gameState.autoClickLevel);
      
      return () => clearInterval(interval);
    }
  }, [gameState.autoClickLevel, gameState.energy]);

  // Régénération d'énergie
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        energy: Math.min(prev.maxEnergy, prev.energy + 1)
      }));
    }, 2000);
    
    return () => clearInterval(interval);
  }, [gameState.maxEnergy]);

  // Gain de minage passif
  useEffect(() => {
    if (gameState.miningPower > 0) {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          experience: prev.experience + gameState.miningPower * 0.1,
          deadspotCoins: prev.deadspotCoins + gameState.miningPower * 0.05
        }));
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [gameState.miningPower]);

  // Vérification de montée de niveau
  useEffect(() => {
    if (gameState.experience >= experienceToNext) {
      setGameState(prev => ({
        ...prev,
        level: prev.level + 1,
        experience: prev.experience - experienceToNext,
        diamonds: prev.diamonds + 1.275
      }));
      
      toast({
        title: "🎉 Niveau supérieur!",
        description: `Niveau ${gameState.level + 1} atteint! +1.275 diamants`,
      });
    }
  }, [gameState.experience, experienceToNext, gameState.level, toast]);

  const handleClick = useCallback((isAutoClick = false) => {
    if (gameState.energy >= 1) {
      setGameState(prev => ({
        ...prev,
        energy: prev.energy - 1,
        experience: prev.experience + (0.175 * prev.clickMultiplier),
        deadspotCoins: prev.deadspotCoins + 0.674
      }));

      if (!isAutoClick) {
        toast({
          title: "⛏️ Minage!",
          description: `+${(0.175 * gameState.clickMultiplier).toFixed(3)} EXP, +0.674 Deadspot`,
        });
      }
    }
  }, [gameState.energy, gameState.clickMultiplier, toast]);

  const handleBuyMiner = (minerId: number) => {
    const miner = miners.find(m => m.id === minerId);
    if (!miner) return;

    if (gameState.diamonds >= miner.diamondCost && gameState.experience >= miner.expCost) {
      setGameState(prev => ({
        ...prev,
        diamonds: prev.diamonds - miner.diamondCost,
        experience: prev.experience - miner.expCost,
        miningPower: prev.miningPower + miner.miningPower
      }));

      setMiners(prev => prev.map(m => 
        m.id === minerId 
          ? { ...m, owned: m.owned + 1, diamondCost: Math.floor(m.diamondCost * 1.5), expCost: Math.floor(m.expCost * 1.5) }
          : m
      ));

      toast({
        title: "✅ Mineur acheté!",
        description: `${miner.name} ajouté! +${miner.miningPower.toFixed(3)} GH/s`,
      });
    }
  };

  const upgrades = [
    {
      id: "clickPower",
      name: "Force de Click",
      description: "+1 multiplicateur de click",
      cost: 10000 * Math.pow(2, gameState.clickMultiplier - 1),
      level: gameState.clickMultiplier,
      icon: "💪"
    },
    {
      id: "energyCapacity",
      name: "Capacité d'Énergie",
      description: "+250 énergie maximum",
      cost: 12000 * Math.pow(1.8, Math.floor((gameState.maxEnergy - 250) / 250)),
      level: Math.floor((gameState.maxEnergy - 250) / 250) + 1,
      icon: "🔋"
    },
    {
      id: "autoClick",
      name: "Auto-Click",
      description: "Click automatique",
      cost: 50000 * Math.pow(3, gameState.autoClickLevel),
      level: gameState.autoClickLevel,
      maxLevel: 5,
      icon: "🤖"
    }
  ];

  const handleBuyUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || gameState.experience < upgrade.cost) return;

    setGameState(prev => ({
      ...prev,
      experience: prev.experience - upgrade.cost,
      ...(upgradeId === "clickPower" && { clickMultiplier: prev.clickMultiplier + 1 }),
      ...(upgradeId === "energyCapacity" && { maxEnergy: prev.maxEnergy + 250 }),
      ...(upgradeId === "autoClick" && { autoClickLevel: prev.autoClickLevel + 1 })
    }));

    toast({
      title: "⚡ Amélioration achetée!",
      description: upgrade.name,
    });
  };

  const handleCryptoExchange = (cryptoId: string, amount: number) => {
    const crypto = initialCryptos.find(c => c.id === cryptoId);
    if (!crypto) return;

    const cost = amount * crypto.exchangeRate;
    if (gameState.deadspotCoins >= cost) {
      setGameState(prev => ({
        ...prev,
        deadspotCoins: prev.deadspotCoins - cost
      }));

      toast({
        title: "💱 Échange effectué!",
        description: `${amount} ${crypto.symbol} acquis pour ${cost.toFixed(3)} Deadspot`,
      });
    }
  };

  const handleFaucetClaim = () => {
    const now = Date.now();
    if (now - gameState.lastClaimTime >= 300000) { // 5 minutes
      setGameState(prev => ({
        ...prev,
        experience: prev.experience + 0.02,
        miningPower: prev.miningPower + 0.002,
        diamonds: prev.diamonds + 1.275,
        deadspotCoins: prev.deadspotCoins + 0.674,
        lastClaimTime: now
      }));

      toast({
        title: "🎁 Faucet réclamé!",
        description: "Récompenses ajoutées à votre compte!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            ⛏️ DeadSpot Miner
          </h1>
          <p className="text-muted-foreground">
            Le mini-jeu de clicker ultime avec crypto-récompenses!
          </p>
        </header>

        <GameStats
          energy={gameState.energy}
          maxEnergy={gameState.maxEnergy}
          experience={gameState.experience}
          level={gameState.level}
          experienceToNext={experienceToNext}
          diamonds={gameState.diamonds}
          deadspotCoins={gameState.deadspotCoins}
          miningPower={gameState.miningPower}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="text-center mb-8">
              <ClickButton
                onClick={() => handleClick()}
                disabled={gameState.energy < 1}
                clickMultiplier={gameState.clickMultiplier}
              />
            </div>

            <FaucetClaim
              onClaim={handleFaucetClaim}
              lastClaimTime={gameState.lastClaimTime}
              claimCooldown={300}
            />
          </div>

          <div>
            <InventoryPanel
              miners={miners}
              diamonds={gameState.diamonds}
              experience={gameState.experience}
              onBuyMiner={handleBuyMiner}
              isOpen={inventoryOpen}
              onToggle={() => setInventoryOpen(!inventoryOpen)}
            />

            <UpgradePanel
              upgrades={upgrades}
              experience={gameState.experience}
              onBuyUpgrade={handleBuyUpgrade}
              isOpen={upgradesOpen}
              onToggle={() => setUpgradesOpen(!upgradesOpen)}
            />

            <CryptoExchange
              cryptos={initialCryptos}
              deadspotCoins={gameState.deadspotCoins}
              onExchange={handleCryptoExchange}
              isOpen={cryptoOpen}
              onToggle={() => setCryptoOpen(!cryptoOpen)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}