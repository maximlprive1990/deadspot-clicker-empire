import { Progress } from "@/components/ui/progress";

interface GameStatsProps {
  energy: number;
  maxEnergy: number;
  experience: number;
  level: number;
  experienceToNext: number;
  diamonds: number;
  deadspotCoins: number;
  miningPower: number;
}

export function GameStats({
  energy,
  maxEnergy,
  experience,
  level,
  experienceToNext,
  diamonds,
  deadspotCoins,
  miningPower
}: GameStatsProps) {
  const energyPercent = (energy / maxEnergy) * 100;
  const expPercent = (experience / experienceToNext) * 100;

  return (
    <div className="game-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Énergie */}
      <div className="bg-card border rounded-lg p-4 neon-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium neon-text">⚡ Énergie</span>
          <span className="text-sm text-energy font-bold">{energy}/{maxEnergy}</span>
        </div>
        <Progress value={energyPercent} className="h-3 bg-secondary border border-energy/30">
          <div 
            className="h-full bg-gradient-to-r from-energy to-energy/80 transition-all duration-300 rounded-full shadow-md"
            style={{ 
              width: `${energyPercent}%`,
              boxShadow: '0 0 10px hsl(var(--energy) / 0.5)'
            }}
          />
        </Progress>
      </div>

      {/* Expérience */}
      <div className="bg-card border rounded-lg p-4 neon-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium neon-text">🎓 Niveau {level}</span>
          <span className="text-sm text-experience font-bold">{experience.toFixed(1)}/{experienceToNext}</span>
        </div>
        <Progress value={expPercent} className="h-3 bg-secondary border border-experience/30">
          <div 
            className="h-full bg-gradient-to-r from-experience to-experience/80 transition-all duration-300 rounded-full shadow-md"
            style={{ 
              width: `${expPercent}%`,
              boxShadow: '0 0 10px hsl(var(--experience) / 0.5)'
            }}
          />
        </Progress>
      </div>

      {/* Diamants */}
      <div className="bg-card border rounded-lg p-4 neon-card">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium neon-text">💎 Diamants</span>
          <span className="text-lg text-diamond font-bold">{diamonds.toFixed(3)}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground">Force de minage</span>
          <span className="text-sm text-mining font-semibold">{miningPower.toFixed(3)} GH/s</span>
        </div>
        <div className="glow-line"></div>
      </div>

      {/* Deadspot Coins */}
      <div className="bg-card border rounded-lg p-4 neon-card">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium neon-text">🪙 Deadspot</span>
          <span className="text-lg text-deadspot font-bold">{deadspotCoins.toFixed(3)}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">Crypto du futur 2026!</div>
        <div className="glow-line"></div>
      </div>
    </div>
  );
}