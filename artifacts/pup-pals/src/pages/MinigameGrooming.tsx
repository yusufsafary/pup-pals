import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/store/use-game-state';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { DogIllustration } from '@/components/dogs';

export default function GroomingGame() {
  const { puppy, interact, updateLeaderboard } = useGameState();
  const [, setLocation] = useLocation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20); // Fast paced, 20s
  
  // Dirt spots
  const [spots, setSpots] = useState<{id: number, x: number, y: number}[]>([]);
  const spotIdCounter = useRef(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!puppy) setLocation('/adopt');
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [puppy, setLocation]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(20);
    setSpots([]);
    interact('groom');

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Initial spots
    for(let i=0; i<3; i++) spawnSpot();
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    setSpots([]);
    if (timerRef.current) clearInterval(timerRef.current);
    updateLeaderboard('grooming', score);
  };

  const spawnSpot = () => {
    // Generate inside a central bounding box over the dog
    setSpots(prev => {
      if (prev.length >= 8) return prev; // max 8 spots at a time
      
      const newSpot = {
        id: spotIdCounter.current++,
        x: Math.random() * 60 + 20, // 20% to 80% width
        y: Math.random() * 60 + 20, // 20% to 80% height
      };
      return [...prev, newSpot];
    });
  };

  const cleanSpot = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) return;
    
    setSpots(prev => prev.filter(s => s.id !== id));
    setScore(prev => prev + 1);
    
    // Spawn 1-2 new spots to replace it
    spawnSpot();
    if (Math.random() > 0.5) spawnSpot();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] min-h-[500px] max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <Link href="/minigames">
          <Button variant="ghost" className="pl-0 gap-2">
            <ChevronLeft /> Back
          </Button>
        </Link>
        <div className="font-display text-2xl font-bold text-primary">
          Cleaned: {score}
        </div>
        <div className="font-display text-2xl font-bold text-destructive">
          Time: {timeLeft}s
        </div>
      </div>

      <div className="flex-1 bg-pink-50 rounded-3xl border-4 border-pink-200 relative overflow-hidden chunky-shadow flex flex-col items-center justify-center p-4">
        
        {!isPlaying && !gameOver && (
          <div className="text-center p-8 bg-white/90 rounded-3xl z-20 absolute max-w-sm">
            <h2 className="text-3xl font-display font-bold text-primary mb-2">Grooming!</h2>
            <p className="mb-6 font-medium text-muted-foreground">
              {puppy?.name} got into the mud! Click the dirt spots to clean them as fast as you can.
            </p>
            <Button size="lg" onClick={startGame} className="w-full text-xl py-6">
              Start Cleaning
            </Button>
          </div>
        )}

        {gameOver && (
          <div className="text-center p-8 bg-white/90 rounded-3xl z-20 absolute max-w-sm">
            <h2 className="text-3xl font-display font-bold text-primary mb-2">Sparkling Clean!</h2>
            <p className="text-5xl font-display text-secondary mb-2">{score}</p>
            <p className="mb-6 font-medium text-muted-foreground">spots cleaned.</p>
            <Button size="lg" onClick={startGame} className="w-full text-xl py-6 mb-4">
              Play Again
            </Button>
            <Link href="/play" className="block w-full">
              <Button variant="outline" size="lg" className="w-full text-xl py-6">
                Back to {puppy?.name}
              </Button>
            </Link>
          </div>
        )}

        {/* The Dog Area */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 select-none">
          {puppy && <DogIllustration breed={puppy.breed} className="w-full h-full" />}
          
          {/* Dirt Spots Layer */}
          <AnimatePresence>
            {spots.map(spot => (
              <motion.div
                key={spot.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => cleanSpot(spot.id, e)}
                className="absolute w-12 h-12 bg-amber-900/60 rounded-full cursor-pointer blur-[2px] flex items-center justify-center hover:bg-amber-800/80"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Inner darker dirt */}
                <div className="w-6 h-6 bg-amber-950/70 rounded-full blur-[1px]" />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Ongoing sparkles while playing */}
          {isPlaying && (
            <motion.div 
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute top-0 right-0 pointer-events-none text-yellow-400"
            >
              <Sparkles size={32} />
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
