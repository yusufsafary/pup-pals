import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/store/use-game-state';
import { ChevronLeft } from 'lucide-react';
import { DogIllustration } from '@/components/dogs';

const TRICKS = [
  { id: 'sit', label: 'Sit', color: 'bg-blue-400' },
  { id: 'spin', label: 'Spin', color: 'bg-green-400' },
  { id: 'shake', label: 'Shake', color: 'bg-yellow-400' },
  { id: 'roll', label: 'Roll', color: 'bg-purple-400' },
];

export default function TricksGame() {
  const { puppy, interact, updateLeaderboard } = useGameState();
  const [, setLocation] = useLocation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerStep, setPlayerStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showingSequence, setShowingSequence] = useState(false);
  
  // Animation state for the dog
  const [activeTrick, setActiveTrick] = useState<string | null>(null);

  useEffect(() => {
    if (!puppy) setLocation('/adopt');
  }, [puppy, setLocation]);

  const startGame = () => {
    if (puppy && puppy.energy < 10) {
      alert(`${puppy.name} is too tired!`);
      return;
    }
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setSequence([]);
    setPlayerStep(0);
    interact('trick');
    nextRound([]);
  };

  const nextRound = (currentSeq: string[]) => {
    const nextTrick = TRICKS[Math.floor(Math.random() * TRICKS.length)].id;
    const newSeq = [...currentSeq, nextTrick];
    setSequence(newSeq);
    setPlayerStep(0);
    playSequence(newSeq);
  };

  const playSequence = async (seq: string[]) => {
    setShowingSequence(true);
    // Pause before showing
    await new Promise(r => setTimeout(r, 1000));
    
    for (let i = 0; i < seq.length; i++) {
      setActiveTrick(seq[i]);
      await new Promise(r => setTimeout(r, 800)); // trick duration
      setActiveTrick(null);
      await new Promise(r => setTimeout(r, 300)); // gap
    }
    
    setShowingSequence(false);
  };

  const handlePlayerInput = (trickId: string) => {
    if (showingSequence || !isPlaying || gameOver) return;

    setActiveTrick(trickId);
    setTimeout(() => setActiveTrick(null), 500);

    if (trickId === sequence[playerStep]) {
      // Correct step
      if (playerStep + 1 === sequence.length) {
        // Round complete!
        const newScore = score + 1;
        setScore(newScore);
        updateLeaderboard('tricks', newScore);
        setTimeout(() => nextRound(sequence), 1000);
      } else {
        setPlayerStep(playerStep + 1);
      }
    } else {
      // Wrong step - Game Over
      setGameOver(true);
      setIsPlaying(false);
    }
  };

  // Map tricks to animations
  let animProps = {};
  switch (activeTrick) {
    case 'sit':
      animProps = { y: 20, scaleY: 0.9 }; // squish down
      break;
    case 'spin':
      animProps = { rotate: 360 };
      break;
    case 'shake':
      animProps = { rotate: [-10, 10, -10, 10, 0] }; // wiggle
      break;
    case 'roll':
      animProps = { rotate: 180, x: [0, 50, -50, 0] }; // roll over
      break;
    default:
      animProps = { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } };
  }

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] min-h-[600px] max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <Link href="/minigames">
          <Button variant="ghost" className="pl-0 gap-2">
            <ChevronLeft /> Back
          </Button>
        </Link>
        <div className="font-display text-2xl font-bold text-primary">
          Combo: {score}
        </div>
      </div>

      <div className="flex-1 bg-blue-50 rounded-3xl border-4 border-blue-200 relative overflow-hidden chunky-shadow flex flex-col p-6">
        
        {/* Stage */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          
          {!isPlaying && !gameOver && (
            <div className="text-center p-8 bg-white/90 rounded-3xl z-20 absolute max-w-sm">
              <h2 className="text-3xl font-display font-bold text-primary mb-2">Tricks!</h2>
              <p className="mb-6 font-medium text-muted-foreground">
                Watch the sequence {puppy?.name} performs, then repeat it back!
              </p>
              <Button size="lg" onClick={startGame} className="w-full text-xl py-6">
                Start Game
              </Button>
            </div>
          )}

          {gameOver && (
            <div className="text-center p-8 bg-white/90 rounded-3xl z-20 absolute max-w-sm">
              <h2 className="text-3xl font-display font-bold text-destructive mb-2">Oops!</h2>
              <p className="text-5xl font-display text-primary mb-6">{score}</p>
              <p className="mb-6 font-medium text-muted-foreground">
                Wrong trick! {puppy?.name} got confused.
              </p>
              <Button size="lg" onClick={startGame} className="w-full text-xl py-6">
                Try Again
              </Button>
            </div>
          )}

          {/* Dog Graphic */}
          <div className="w-48 h-48 relative z-10 mb-8">
            <motion.div
              animate={animProps}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="w-full h-full origin-bottom"
            >
              {puppy && <DogIllustration breed={puppy.breed} />}
            </motion.div>
            
            {/* Status Text Indicator */}
            {showingSequence && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white/80 px-4 py-1 rounded-full font-bold text-sm text-blue-500 shadow-sm border border-blue-200">
                Watch...
              </div>
            )}
            {isPlaying && !showingSequence && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-green-100 px-4 py-1 rounded-full font-bold text-sm text-green-600 shadow-sm border border-green-300">
                Your turn! ({playerStep + 1}/{sequence.length})
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 shrink-0">
          {TRICKS.map(trick => (
            <Button
              key={trick.id}
              onClick={() => handlePlayerInput(trick.id)}
              disabled={showingSequence || !isPlaying}
              className={`h-20 text-2xl font-display ${trick.color} text-white border-b-4 border-black/20 hover:brightness-110 active:border-b-0 active:translate-y-[4px] disabled:opacity-50 transition-all`}
            >
              {trick.label}
            </Button>
          ))}
        </div>

      </div>
    </div>
  );
}
