import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, Medal, Crown } from 'lucide-react';
import { useGameState } from '@/store/use-game-state';

export default function LeaderboardPage() {
  const { leaderboard } = useGameState();
  const [, setLocation] = useLocation();

  const SCORES = [
    { title: 'Fetch High Score', score: leaderboard.fetch, icon: <Medal className="text-blue-500 w-8 h-8" />, suffix: 'balls' },
    { title: 'Tricks Combo', score: leaderboard.tricks, icon: <Crown className="text-yellow-500 w-8 h-8" />, suffix: 'tricks' },
    { title: 'Grooming Master', score: leaderboard.grooming, icon: <Trophy className="text-purple-500 w-8 h-8" />, suffix: 'spots' },
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 w-full text-center">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-4 flex items-center justify-center gap-4">
          <Trophy size={40} /> Local Hall of Fame
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          Your best records on this device.
        </p>
      </div>

      <div className="space-y-6 text-left">
        {SCORES.map((item, i) => (
          <Card key={i} className="p-6 flex items-center justify-between border-4 transition-transform hover:scale-[1.02]">
            <div className="flex items-center gap-6">
              <div className="bg-muted p-4 rounded-2xl">
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display text-foreground">{item.title}</h3>
                <p className="text-muted-foreground font-medium">Personal Best</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black font-display text-primary">
                {item.score}
              </div>
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {item.suffix}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-12">
        <Link href="/">
          <Button size="lg" variant="outline" className="text-xl px-12 border-4">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
