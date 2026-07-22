import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, Play, Trophy, Heart, HelpCircle } from 'lucide-react';
import { useGameState } from '@/store/use-game-state';

export function Navigation() {
  const { puppy } = useGameState();
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  const navItem = (href: string, icon: React.ReactNode, label: string) => (
    <Link href={href}>
      <div className={`flex flex-col items-center gap-1 transition-colors cursor-pointer px-2 ${isActive(href) ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
        {icon}
        <span className="text-xs font-bold font-display">{label}</span>
      </div>
    </Link>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-border p-3 pb-safe z-50 chunky-shadow lg:top-0 lg:bottom-auto lg:border-t-0 lg:border-b-4">
      <div className="max-w-4xl mx-auto flex justify-around items-center">
        {navItem('/', <Home size={22} strokeWidth={2.5} />, 'Home')}

        {navItem(
          puppy ? '/play' : '/adopt',
          <Heart size={22} strokeWidth={2.5} />,
          puppy ? 'My Pup' : 'Adopt'
        )}

        {puppy && navItem('/minigames', <Play size={22} strokeWidth={2.5} />, 'Games')}

        {navItem('/leaderboard', <Trophy size={22} strokeWidth={2.5} />, 'Ranks')}

        {navItem('/how-to-play', <HelpCircle size={22} strokeWidth={2.5} />, 'Guide')}
      </div>
    </nav>
  );
}
