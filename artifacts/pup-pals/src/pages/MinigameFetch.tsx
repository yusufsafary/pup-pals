import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/store/use-game-state';
import { ChevronLeft } from 'lucide-react';

export default function FetchGame() {
  const { puppy, interact, updateLeaderboard } = useGameState();
  const [, setLocation] = useLocation();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  
  // Ball state
  const [ballVisible, setBallVisible] = useState(false);
  const [ballPos, setBallPos] = useState({ x: 50, y: 50 });
  const [ballSize, setBallSize] = useState(40);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ballTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!puppy) setLocation('/adopt');
  }, [puppy, setLocation]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
    };
  }, []);

  const startGame = () => {
    if (puppy && puppy.energy < 10) {
      alert(`${puppy.name} is too tired to play fetch! Rest first.`);
      return;
    }
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    interact('fetch');
    
    // Start game timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    spawnBall();
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    setBallVisible(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
    
    updateLeaderboard('fetch', score);
  };

  const spawnBall = () => {
    setBallVisible(false);
    const delay = Math.random() * 1000 + 500; // 0.5s to 1.5s
    
    ballTimerRef.current = setTimeout(() => {
      setBallPos({
        x: Math.random() * 80 + 10, // 10% to 90%
        y: Math.random() * 80 + 10
      });
      // Ball gets smaller as score increases to make it harder
      setBallSize(Math.max(20, 60 - (score * 2)));
      setBallVisible(true);
      
      // Auto-hide if not clicked fast enough
      const hideDelay = Math.max(700, 2000 - (score * 100)); // Gets faster
      ballTimerRef.current = setTimeout(() => {
        spawnBall(); // missed it!
      }, hideDelay);
      
    }, delay);
  };

  const catchBall = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ballVisible) return;
    
    if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
    setBallVisible(false);
    setScore(prev => prev + 1);
    
    spawnBall();
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
          Score: {score}
        </div>
        <div className="font-display text-2xl font-bold text-destructive">
          Time: {timeLeft}s
        </div>
      </div>

      <div className="flex-1 bg-green-100 rounded-3xl border-4 border-green-300 relative overflow-hidden chunky-shadow flex flex-col items-center justify-center">
        
        {!isPlaying && !gameOver && (
          <div className="text-center p-8 bg-white/90 rounded-3xl z-10 max-w-sm">
            <h2 className="text-3xl font-display font-bold text-primary mb-2">Fetch!</h2>
            <p className="mb-6 font-medium text-muted-foreground">
              Click the tennis ball as fast as you can before it disappears. Gets harder over time!
            </p>
            <Button size="lg" onClick={startGame} className="w-full text-xl py-6">
              Start Game
            </Button>
          </div>
        )}

        {gameOver && (
          <div className="text-center p-8 bg-white/90 rounded-3xl z-10 max-w-sm">
            <h2 className="text-3xl font-display font-bold text-primary mb-2">Time's Up!</h2>
            <p className="text-5xl font-display text-secondary mb-6">{score}</p>
            <p className="mb-6 font-medium text-muted-foreground">
              Great job! {puppy?.name} had a blast.
            </p>
            <Button size="lg" onClick={startGame} className="w-full text-xl py-6">
              Play Again
            </Button>
          </div>
        )}

        {/* The Game Area */}
        {isPlaying && (
          <div className="absolute inset-0 cursor-crosshair" onClick={() => {/* Miss click penalty could go here */}}>
            <AnimatePresence>
              {ballVisible && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', bounce: 0.5, duration: 0.4 }}
                  onClick={catchBall}
                  className="absolute rounded-full bg-[#CCFF00] border-4 border-black/20 shadow-lg cursor-pointer flex items-center justify-center overflow-hidden"
                  style={{
                    left: `${ballPos.x}%`,
                    top: `${ballPos.y}%`,
                    width: ballSize,
                    height: ballSize,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Tennis ball curved line */}
                  <div className="absolute w-full h-full border-4 border-black/10 rounded-full scale-150 -translate-x-2 -translate-y-2" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
