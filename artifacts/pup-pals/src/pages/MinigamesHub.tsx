import React from 'react';
import { Link, useLocation } from 'wouter';
import { Trophy, Activity, Target, Scissors, ChevronLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/store/use-game-state';

export default function MinigamesHub() {
  const { puppy } = useGameState();
  const [, setLocation] = useLocation();

  if (!puppy) {
    setLocation('/adopt');
    return null;
  }

  const GAMES = [
    {
      id: 'fetch',
      title: 'Fetch!',
      icon: <Target className="w-12 h-12 text-primary" />,
      description: 'Reflex game: click the ball before it bounces away.',
      color: 'border-primary',
      bg: 'bg-primary/10'
    },
    {
      id: 'tricks',
      title: 'Simon Says Tricks',
      icon: <Activity className="w-12 h-12 text-secondary" />,
      description: 'Memory game: repeat the trick sequence correctly.',
      color: 'border-secondary',
      bg: 'bg-secondary/10'
    },
    {
      id: 'grooming',
      title: 'Speed Grooming',
      icon: <Scissors className="w-12 h-12 text-accent" />,
      description: 'Speed game: clean the dirty spots fast!',
      color: 'border-accent',
      bg: 'bg-accent/10'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/play">
          <Button variant="ghost" className="pl-0 gap-2 font-bold text-muted-foreground hover:text-foreground">
            <ChevronLeft /> Back to {puppy.name}
          </Button>
        </Link>
        <Link href="/leaderboard">
          <Button variant="outline" className="gap-2">
            <Trophy size={18} className="text-accent" /> High Scores
          </Button>
        </Link>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-display text-foreground mb-4">
          Playtime!
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          Playing games uses energy but boosts happiness. Earn high scores!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GAMES.map(game => (
          <Card key={game.id} className={`border-4 ${game.color} hover:-translate-y-2 transition-transform duration-300`}>
            <div className="p-6 flex flex-col items-center text-center h-full">
              <div className={`w-24 h-24 rounded-full ${game.bg} flex items-center justify-center mb-6`}>
                {game.icon}
              </div>
              <h2 className="text-2xl font-bold font-display mb-2">{game.title}</h2>
              <p className="text-muted-foreground font-medium mb-6 flex-1">
                {game.description}
              </p>
              
              <Link href={`/minigames/${game.id}`} className="w-full">
                <Button className="w-full text-lg">Play Now</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
