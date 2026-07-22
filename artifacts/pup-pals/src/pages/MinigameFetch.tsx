import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/store/use-game-state';
import { ChevronLeft, Info, Star, X } from 'lucide-react';

function HowToModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl border-4 border-primary p-8 max-w-sm w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-display text-primary">How to Play Fetch</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground font-medium mb-6">
          <p>🎯 A tennis ball appears randomly. <strong>Click or tap it</strong> before it disappears!</p>
          <p>⚡ The ball gets <strong>smaller and faster</strong> as your score increases.</p>
          <p>⏱️ You have <strong>30 seconds</strong> — catch as many as possible.</p>
          <p>💡 <strong>Tip:</strong> Keep your cursor/thumb near the center to reduce travel time.</p>
          <p>🏆 Score is saved if you beat your personal best!</p>
        </div>
        <Button className="w-full" onClick={onClose}>Got it!</Button>
      </motion.div>
    </motion.div>
  );
}

export default function FetchGame() {
  const { puppy, interact, updateLeaderboard, leaderboard } = useGameState();
  const [, setLocation] = useLocation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);
  const [missFlash, setMissFlash] = useState(false);
  const [lastScore, setLastScore] = useState<number | null>(null);

  const [ballVisible, setBallVisible] = useState(false);
  const [ballPos, setBallPos] = useState({ x: 50, y: 50 });
  const [ballSize, setBallSize] = useState(48);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ballTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scoreRef = useRef(0);

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
    scoreRef.current = 0;
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setMissFlash(false);
    interact('fetch');

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    spawnBall(0);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    setBallVisible(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
    const finalScore = scoreRef.current;
    setLastScore(finalScore);
    updateLeaderboard('fetch', finalScore);
  };

  const spawnBall = (currentScore: number) => {
    setBallVisible(false);
    const delay = Math.max(300, 1000 - currentScore * 20);

    ballTimerRef.current = setTimeout(() => {
      setBallPos({
        x: Math.random() * 78 + 11,
        y: Math.random() * 78 + 11,
      });
      const size = Math.max(24, 56 - currentScore * 1.5);
      setBallSize(size);
      setBallVisible(true);

      const hideDelay = Math.max(600, 2200 - currentScore * 80);
      ballTimerRef.current = setTimeout(() => {
        setMissFlash(true);
        setTimeout(() => setMissFlash(false), 300);
        spawnBall(scoreRef.current);
      }, hideDelay);
    }, delay);
  };

  const catchBall = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ballVisible) return;
    if (ballTimerRef.current) clearTimeout(ballTimerRef.current);
    setBallVisible(false);
    const newScore = scoreRef.current + 1;
    scoreRef.current = newScore;
    setScore(newScore);
    spawnBall(newScore);
  };

  const isNewBest = lastScore !== null && lastScore > 0 && lastScore >= leaderboard.fetch;

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] min-h-[500px] max-w-4xl mx-auto w-full">
      <AnimatePresence>
        {showHowTo && <HowToModal onClose={() => setShowHowTo(false)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-3 shrink-0">
        <Link href="/minigames">
          <Button variant="ghost" className="pl-0 gap-2">
            <ChevronLeft /> Back
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="font-display text-xl font-bold text-primary">Score: {score}</div>
          {leaderboard.fetch > 0 && (
            <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
              <Star size={11} className="text-accent" /> Best: {leaderboard.fetch}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className={`font-display text-xl font-bold ${timeLeft <= 10 ? 'text-destructive' : 'text-foreground'}`}>
            {timeLeft}s
          </div>
          {!isPlaying && (
            <button onClick={() => setShowHowTo(true)} className="text-muted-foreground hover:text-primary transition-colors">
              <Info size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Play area */}
      <div
        className={`flex-1 rounded-3xl border-4 relative overflow-hidden chunky-shadow flex flex-col items-center justify-center transition-colors duration-200 ${missFlash ? 'bg-red-100 border-red-300' : 'bg-green-100 border-green-300'}`}
      >
        {/* Timer bar */}
        {isPlaying && (
          <div className="absolute top-0 left-0 right-0 h-2 bg-green-200 rounded-t-3xl overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        {/* Start screen */}
        {!isPlaying && !gameOver && (
          <div className="text-center p-8 bg-white/95 rounded-3xl z-10 max-w-sm shadow-lg border-4 border-green-200">
            <div className="text-5xl mb-3">🎾</div>
            <h2 className="text-3xl font-display font-bold text-primary mb-2">Fetch!</h2>
            <p className="mb-2 font-medium text-muted-foreground text-sm">
              Click the tennis ball as fast as you can! It gets smaller and faster as your score goes up.
            </p>
            {leaderboard.fetch > 0 && (
              <div className="flex items-center justify-center gap-2 text-sm font-bold text-accent mb-4">
                <Star size={14} /> Personal Best: {leaderboard.fetch} catches
              </div>
            )}
            <Button size="lg" onClick={startGame} className="w-full text-xl py-6 mb-3">
              Start Game
            </Button>
            <button onClick={() => setShowHowTo(true)} className="text-primary text-sm font-bold underline underline-offset-2">
              How to play?
            </button>
          </div>
        )}

        {/* Game over screen */}
        {gameOver && (
          <div className="text-center p-8 bg-white/95 rounded-3xl z-10 max-w-sm shadow-lg border-4 border-green-200">
            <div className="text-5xl mb-2">{isNewBest ? '🏆' : '🎾'}</div>
            <h2 className="text-3xl font-display font-bold text-primary mb-1">Time's Up!</h2>
            {isNewBest && (
              <div className="text-sm font-bold text-accent mb-2">New Personal Best!</div>
            )}
            <p className="text-6xl font-display font-black text-secondary mb-1">{lastScore}</p>
            <p className="text-muted-foreground font-medium mb-1 text-sm">balls caught</p>
            {leaderboard.fetch > 0 && lastScore !== null && lastScore < leaderboard.fetch && (
              <p className="text-xs text-muted-foreground mb-3">Best: {leaderboard.fetch} · Try again to beat it!</p>
            )}
            <p className="mb-5 font-medium text-muted-foreground text-sm">{puppy?.name} had a blast! 🐾</p>
            <Button size="lg" onClick={startGame} className="w-full text-xl py-5 mb-2">
              Play Again
            </Button>
            <Link href="/minigames" className="block">
              <Button variant="outline" className="w-full border-2">Back to Games</Button>
            </Link>
          </div>
        )}

        {/* Game area */}
        {isPlaying && (
          <div className="absolute inset-0 cursor-crosshair select-none">
            <AnimatePresence>
              {ballVisible && (
                <motion.div
                  key={`ball-${ballPos.x}-${ballPos.y}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', bounce: 0.5, duration: 0.3 }}
                  onClick={catchBall}
                  className="absolute rounded-full bg-[#CCFF00] border-4 border-black/20 shadow-xl cursor-pointer select-none"
                  style={{
                    left: `${ballPos.x}%`,
                    top: `${ballPos.y}%`,
                    width: ballSize,
                    height: ballSize,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="absolute w-full h-full border-[3px] border-black/10 rounded-full scale-150 -translate-x-2 -translate-y-2" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Score popups */}
        {isPlaying && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
            <AnimatePresence>
              {score > 0 && (
                <motion.div
                  key={score}
                  initial={{ opacity: 1, y: 0, scale: 1.2 }}
                  animate={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="text-primary font-black font-display text-xl"
                >
                  +1
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
