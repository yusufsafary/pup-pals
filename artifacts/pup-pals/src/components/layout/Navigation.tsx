import React from 'react';
import { Link } from 'wouter';
import { Home, Play, Trophy, Heart } from 'lucide-react';
import { useGameState } from '@/store/use-game-state';

export function Navigation() {
  const { puppy } = useGameState();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-border p-4 pb-safe z-50 chunky-shadow lg:top-0 lg:bottom-auto lg:border-t-0 lg:border-b-4">
      <div className="max-w-4xl mx-auto flex justify-around items-center">
        <Link href="/">
          <div className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            <Home size={24} strokeWidth={2.5} />
            <span className="text-xs font-bold font-display">Home</span>
          </div>
        </Link>
        
        <Link href={puppy ? "/play" : "/adopt"}>
          <div className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            <Heart size={24} strokeWidth={2.5} />
            <span className="text-xs font-bold font-display">{puppy ? 'My Pup' : 'Adopt'}</span>
          </div>
        </Link>
        
        {puppy && (
          <Link href="/minigames">
            <div className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              <Play size={24} strokeWidth={2.5} />
              <span className="text-xs font-bold font-display">Games</span>
            </div>
          </Link>
        )}
        
        <Link href="/leaderboard">
          <div className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            <Trophy size={24} strokeWidth={2.5} />
            <span className="text-xs font-bold font-display">Ranks</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
