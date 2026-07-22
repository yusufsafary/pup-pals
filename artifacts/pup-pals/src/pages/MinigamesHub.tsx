import React from 'react';
import { Link, useLocation } from 'wouter';
import { Trophy, Activity, Target, Scissors, ChevronLeft, HelpCircle, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/store/use-game-state';

export default function MinigamesHub() {
  const { puppy, leaderboard } = useGameState();
  const [, setLocation] = useLocation();

  if (!puppy) {
    setLocation('/adopt');
    return null;
  }

  const GAMES = [
    {
      id: 'fetch',
      title: 'Fetch!',
      icon: <Target className="w-10 h-10 text-primary" />,
      description: 'Click the tennis ball before it bounces away. It gets smaller and faster as your score climbs!',
      howTo: '30 sec · Reflex',
      color: 'border-primary',
      bg: 'bg-primary/10',
      badge: 'bg-primary text-white',
      highScore: leaderboard.fetch,
      scoreLabel: 'balls caught',
    },
    {
      id: 'tricks',
      title: 'Simon Says',
      icon: <Activity className="w-10 h-10 text-secondary" />,
      description: 'Watch the trick sequence your pup performs, then repeat it back in the correct order.',
      howTo: 'Endless · Memory',
      color: 'border-secondary',
      bg: 'bg-secondary/10',
      badge: 'bg-secondary text-white',
      highScore: leaderboard.tricks,
      scoreLabel: 'tricks combo',
    },
    {
      id: 'grooming',
      title: 'Speed Groom',
      icon: <Scissors className="w-10 h-10 text-accent-foreground" />,
      description: 'Your pup rolled in the mud! Clean every dirt spot as fast as you can before time runs out.',
      howTo: '20 sec · Speed',
      color: 'border-accent',
      bg: 'bg-accent/10',
      badge: 'bg-accent text-accent-foreground',
      highScore: leaderboard.grooming,
      scoreLabel: 'spots cleaned',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 w-full">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/play">
          <Button variant="ghost" className="pl-0 gap-2 font-bold text-muted-foreground hover:text-foreground">
            <ChevronLeft /> Back to {puppy.name}
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link href="/how-to-play">
            <Button variant="outline" size="sm" className="gap-2 border-2">
              <HelpCircle size={15} /> Guide
            </Button>
          </Link>
          <Link href="/leaderboard">
            <Button variant="outline" size="sm" className="gap-2 border-2">
              <Trophy size={15} className="text-accent" /> Scores
            </Button>
          </Link>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-display text-foreground mb-2">Playtime!</h1>
        <p className="text-muted-foreground font-medium">
          Games use energy but boost happiness. Beat your personal bests!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GAMES.map(game => (
          <Card key={game.id} className={`border-4 ${game.color} hover:-translate-y-2 transition-transform duration-300 overflow-hidden`}>
            <div className="p-6 flex flex-col items-center text-center h-full">

              {/* Icon */}
              <div className={`w-20 h-20 rounded-full ${game.bg} flex items-center justify-center mb-4 border-4 ${game.color}`}>
                {game.icon}
              </div>

              {/* Title & type badge */}
              <h2 className="text-2xl font-bold font-display mb-1">{game.title}</h2>
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${game.badge} mb-4`}>
                {game.howTo}
              </span>

              {/* Description */}
              <p className="text-muted-foreground font-medium mb-4 flex-1 text-sm leading-relaxed">
                {game.description}
              </p>

              {/* Personal Best */}
              {game.highScore > 0 && (
                <div className="w-full bg-muted/50 rounded-2xl p-3 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <Star size={14} className="text-accent" />
                    Personal Best
                  </div>
                  <div className="font-black font-display text-foreground">
                    {game.highScore} <span className="text-xs font-medium text-muted-foreground">{game.scoreLabel}</span>
                  </div>
                </div>
              )}

              <Link href={`/minigames/${game.id}`} className="w-full">
                <Button className="w-full text-lg">Play Now</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick tips */}
      <div className="mt-8 bg-white border-4 border-border rounded-3xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <HelpCircle size={18} className="text-primary" />
          <h3 className="font-bold font-display text-lg">Quick Tips</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground font-medium">
          <p><strong>Fetch:</strong> Keep cursor near center — less distance to each ball spawn.</p>
          <p><strong>Tricks:</strong> Say trick names aloud as you watch to lock the sequence in memory.</p>
          <p><strong>Groom:</strong> Tap rapidly — each clean spawns more spots, so speed is everything.</p>
        </div>
        <div className="mt-3 pt-3 border-t border-border">
          <Link href="/how-to-play">
            <span className="text-primary font-bold text-sm underline underline-offset-2 hover:opacity-80">
              Read the full game guide →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
