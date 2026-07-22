import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/store/use-game-state';
import { ChevronLeft, Sparkles, Info, Star, X } from 'lucide-react';
import { DogIllustration } from '@/components/dogs';

function HowToModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="bg-white rounded-3xl border-4 border-accent p-8 max-w-sm w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-display">How to Groom</h2>
          <button onClick={onClose}><X size={20} className="text-muted-foreground" /></button>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground font-medium mb-6">
          <p>💧 Your pup rolled in the mud! <strong>Click the brown dirt spots</strong> to clean them off.</p>
          <p>🔄 Each spot you clean <strong>spawns 1-2 new spots</strong> — there's always more to do!</p>
          <p>⏱️ You have <strong>20 seconds</strong> — clean as many spots as possible.</p>
          <p>💡 <strong>Tip:</strong> Tap rapidly without stopping — speed is everything here!</p>
          <p>🏆 Your highest spot count is saved to the leaderboard.</p>
        </div>
        <Button className="w-full" onClick={onClose}>Got it, let's groom!</Button>
      </motion.div>
    </motion.div>
  );
}

export default function GroomingGame() {
  const { puppy, interact, updateLeaderboard, leaderboard } = useGameState();
  const [, setLocation] = useLocation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showHowTo, setShowHowTo] = useState(false);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [sparkles, setSparkles] = useState<{id: number; x: number; y: number}[]>([]);

  const [spots, setSpots] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const spotIdCounter = useRef(0);
  const sparkleIdCounter = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scoreRef = useRef(0);

  useEffect(() => {
    if (!puppy) setLocation('/adopt');
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [puppy, setLocation]);

  const startGame = () => {
    scoreRef.current = 0;
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(20);
    setSpots([]);
    setSparkles([]);
    setLastScore(null);
    interact('groom');

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { endGame(); return 0; }
        return prev - 1;
      });
    }, 1000);

    for (let i = 0; i < 4; i++) spawnSpot();
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    setSpots([]);
    if (timerRef.current) clearInterval(timerRef.current);
    const finalScore = scoreRef.current;
    setLastScore(finalScore);
    updateLeaderboard('grooming', finalScore);
  };

  const spawnSpot = () => {
    setSpots(prev => {
      if (prev.length >= 10) return prev;
      return [...prev, {
        id: spotIdCounter.current++,
        x: Math.random() * 58 + 21,
        y: Math.random() * 58 + 21,
        size: Math.random() * 16 + 28, // 28-44px
      }];
    });
  };

  const cleanSpot = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) return;

    const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Add sparkle
    const sid = sparkleIdCounter.current++;
    setSparkles(prev => [...prev, { id: sid, x, y }]);
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== sid)), 600);

    setSpots(prev => prev.filter(s => s.id !== id));
    const newScore = scoreRef.current + 1;
    scoreRef.current = newScore;
    setScore(newScore);

    spawnSpot();
    if (Math.random() > 0.4) spawnSpot();
  };

  const isNewBest = lastScore !== null && lastScore > 0 && lastScore >= leaderboard.grooming;

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] min-h-[500px] max-w-4xl mx-auto w-full">
      <AnimatePresence>{showHowTo && <HowToModal onClose={() => setShowHowTo(false)} />}</AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-3 shrink-0">
        <Link href="/minigames">
          <Button variant="ghost" className="pl-0 gap-2"><ChevronLeft /> Back</Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="font-display text-xl font-bold text-primary">Cleaned: {score}</div>
          {leaderboard.grooming > 0 && (
            <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
              <Star size={11} className="text-accent" /> Best: {leaderboard.grooming}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className={`font-display text-xl font-bold ${timeLeft <= 8 ? 'text-destructive' : 'text-foreground'}`}>
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
      <div className="flex-1 bg-pink-50 rounded-3xl border-4 border-pink-200 relative overflow-hidden chunky-shadow flex flex-col items-center justify-center p-4">

        {/* Timer bar */}
        {isPlaying && (
          <div className="absolute top-0 left-0 right-0 h-2 bg-pink-200 rounded-t-3xl overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-1000"
              style={{ width: `${(timeLeft / 20) * 100}%` }}
            />
          </div>
        )}

        {/* Start screen */}
        {!isPlaying && !gameOver && (
          <div className="text-center p-8 bg-white/95 rounded-3xl z-20 absolute max-w-sm shadow-lg border-4 border-pink-200">
            <div className="text-4xl mb-2">🛁</div>
            <h2 className="text-3xl font-display font-bold text-primary mb-2">Speed Groom!</h2>
            <p className="mb-2 font-medium text-muted-foreground text-sm">
              {puppy?.name} got into the mud! Click the dirt spots to clean them as fast as you can in 20 seconds.
            </p>
            {leaderboard.grooming > 0 && (
              <div className="flex items-center justify-center gap-2 text-sm font-bold text-accent mb-4">
                <Star size={14} /> Personal Best: {leaderboard.grooming} spots
              </div>
            )}
            <Button size="lg" onClick={startGame} className="w-full text-xl py-6 mb-3">
              Start Cleaning
            </Button>
            <button onClick={() => setShowHowTo(true)} className="text-primary text-sm font-bold underline underline-offset-2">
              How to play?
            </button>
          </div>
        )}

        {/* Game over */}
        {gameOver && (
          <div className="text-center p-8 bg-white/95 rounded-3xl z-20 absolute max-w-sm shadow-lg border-4 border-pink-200">
            <div className="text-4xl mb-2">{isNewBest ? '🏆' : '✨'}</div>
            <h2 className="text-3xl font-display font-bold text-primary mb-1">Sparkling Clean!</h2>
            {isNewBest && <div className="text-sm font-bold text-accent mb-2">New Personal Best!</div>}
            <p className="text-5xl font-display font-black text-secondary mb-1">{lastScore}</p>
            <p className="text-sm text-muted-foreground mb-2">spots cleaned</p>
            {leaderboard.grooming > 0 && lastScore !== null && lastScore < leaderboard.grooming && (
              <p className="text-xs text-muted-foreground mb-3">Best: {leaderboard.grooming} · Try again!</p>
            )}
            <Button size="lg" onClick={startGame} className="w-full text-xl py-5 mb-2">Play Again</Button>
            <Link href="/minigames" className="block">
              <Button variant="outline" className="w-full border-2">Back to Games</Button>
            </Link>
          </div>
        )}

        {/* Dog + Dirt Area */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 select-none">
          {puppy && <DogIllustration breed={puppy.breed} className="w-full h-full" />}

          {/* Dirt spots */}
          <AnimatePresence>
            {spots.map(spot => (
              <motion.div
                key={spot.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={(e) => cleanSpot(spot.id, e)}
                className="absolute bg-amber-800/65 rounded-full cursor-pointer hover:bg-amber-700/80 active:scale-90 transition-transform"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  width: spot.size,
                  height: spot.size,
                  transform: 'translate(-50%, -50%)',
                  filter: 'blur(1.5px)',
                }}
              >
                <div className="w-1/2 h-1/2 bg-amber-950/60 rounded-full m-auto mt-1 blur-[1px]" />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Sparkle effects */}
          <AnimatePresence>
            {sparkles.map(sp => (
              <motion.div
                key={sp.id}
                initial={{ opacity: 1, scale: 0.5, y: 0 }}
                animate={{ opacity: 0, scale: 1.5, y: -20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute pointer-events-none text-yellow-400"
                style={{ left: `${sp.x}%`, top: `${sp.y}%`, transform: 'translate(-50%,-50%)' }}
              >
                <Sparkles size={20} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Ongoing sparkle animation while playing */}
          {isPlaying && (
            <motion.div
              animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.3, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="absolute top-1 right-1 pointer-events-none text-yellow-400"
            >
              <Sparkles size={24} />
            </motion.div>
          )}
        </div>

        {/* Score counter shown during play */}
        {isPlaying && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 border-2 border-pink-200 rounded-full px-4 py-1 font-bold font-display text-primary text-sm">
            {score} spots cleaned ✨
          </div>
        )}
      </div>
    </div>
  );
}
