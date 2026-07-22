import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/store/use-game-state';
import { ChevronLeft, Info, Star, X } from 'lucide-react';
import { DogIllustration } from '@/components/dogs';

const TRICKS = [
  { id: 'sit',   label: 'Sit',   emoji: '🦴', color: 'bg-blue-400',   ring: 'ring-blue-400' },
  { id: 'spin',  label: 'Spin',  emoji: '🌀', color: 'bg-green-400',  ring: 'ring-green-400' },
  { id: 'shake', label: 'Shake', emoji: '🤝', color: 'bg-yellow-400', ring: 'ring-yellow-400' },
  { id: 'roll',  label: 'Roll',  emoji: '🎲', color: 'bg-purple-400', ring: 'ring-purple-400' },
];

function HowToModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="bg-white rounded-3xl border-4 border-secondary p-8 max-w-sm w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-display text-secondary">How to Play Tricks</h2>
          <button onClick={onClose}><X size={20} className="text-muted-foreground" /></button>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground font-medium mb-6">
          <p>👁️ Watch your pup perform a <strong>sequence of tricks</strong> — pay close attention!</p>
          <p>🎮 After the sequence ends, <strong>repeat it back</strong> by pressing the trick buttons in order.</p>
          <p>➕ Each round <strong>adds one more trick</strong> to the sequence. How long can you go?</p>
          <p>❌ One wrong button = game over. No pressure! (okay, a little pressure.)</p>
          <p>💡 <strong>Tip:</strong> Say trick names aloud as you watch — it locks the order in memory.</p>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {TRICKS.map(t => (
            <div key={t.id} className={`rounded-xl py-2 text-center text-white font-bold font-display text-sm ${t.color}`}>
              {t.emoji} {t.label}
            </div>
          ))}
        </div>
        <Button className="w-full" onClick={onClose}>Got it!</Button>
      </motion.div>
    </motion.div>
  );
}

export default function TricksGame() {
  const { puppy, interact, updateLeaderboard, leaderboard } = useGameState();
  const [, setLocation] = useLocation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerStep, setPlayerStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showingSequence, setShowingSequence] = useState(false);
  const [activeTrick, setActiveTrick] = useState<string | null>(null);
  const [highlightedButton, setHighlightedButton] = useState<string | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);
  const [wrongButton, setWrongButton] = useState<string | null>(null);
  const [lastScore, setLastScore] = useState<number | null>(null);

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
    setLastScore(null);
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
    await new Promise(r => setTimeout(r, 800));

    for (let i = 0; i < seq.length; i++) {
      setActiveTrick(seq[i]);
      setHighlightedButton(seq[i]);
      await new Promise(r => setTimeout(r, 700));
      setActiveTrick(null);
      setHighlightedButton(null);
      await new Promise(r => setTimeout(r, 300));
    }

    setShowingSequence(false);
  };

  const handlePlayerInput = (trickId: string) => {
    if (showingSequence || !isPlaying || gameOver) return;

    setActiveTrick(trickId);
    setTimeout(() => setActiveTrick(null), 400);

    if (trickId === sequence[playerStep]) {
      if (playerStep + 1 === sequence.length) {
        const newScore = score + 1;
        setScore(newScore);
        updateLeaderboard('tricks', newScore);
        setTimeout(() => nextRound(sequence), 900);
      } else {
        setPlayerStep(playerStep + 1);
      }
    } else {
      setWrongButton(trickId);
      setTimeout(() => setWrongButton(null), 600);
      setTimeout(() => {
        setGameOver(true);
        setIsPlaying(false);
        setLastScore(score);
      }, 700);
    }
  };

  let animProps: Record<string, unknown> = { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } };
  switch (activeTrick) {
    case 'sit':   animProps = { y: 18, scaleY: 0.9, transition: { type: 'spring', bounce: 0.4 } }; break;
    case 'spin':  animProps = { rotate: 360, transition: { duration: 0.6, ease: 'easeInOut' } }; break;
    case 'shake': animProps = { rotate: [-12, 12, -12, 12, 0], transition: { duration: 0.5 } }; break;
    case 'roll':  animProps = { rotate: 180, x: [0, 40, -40, 0], transition: { duration: 0.6 } }; break;
  }

  const isNewBest = lastScore !== null && lastScore > 0 && lastScore >= leaderboard.tricks;

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] min-h-[600px] max-w-4xl mx-auto w-full">
      <AnimatePresence>{showHowTo && <HowToModal onClose={() => setShowHowTo(false)} />}</AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-3 shrink-0">
        <Link href="/minigames">
          <Button variant="ghost" className="pl-0 gap-2"><ChevronLeft /> Back</Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="font-display text-xl font-bold text-primary">Combo: {score}</div>
          {leaderboard.tricks > 0 && (
            <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
              <Star size={11} className="text-accent" /> Best: {leaderboard.tricks}
            </div>
          )}
        </div>
        {!isPlaying && (
          <button onClick={() => setShowHowTo(true)} className="text-muted-foreground hover:text-primary transition-colors">
            <Info size={20} />
          </button>
        )}
        {isPlaying && <div className="w-8" />}
      </div>

      {/* Play area */}
      <div className="flex-1 bg-blue-50 rounded-3xl border-4 border-blue-200 relative overflow-hidden chunky-shadow flex flex-col p-5">

        {/* Stage */}
        <div className="flex-1 flex flex-col items-center justify-center relative">

          {/* Start screen */}
          {!isPlaying && !gameOver && (
            <div className="text-center p-8 bg-white/95 rounded-3xl z-20 absolute max-w-sm shadow-lg border-4 border-blue-200">
              <div className="text-4xl mb-2">🧠</div>
              <h2 className="text-3xl font-display font-bold text-secondary mb-2">Simon Says!</h2>
              <p className="mb-2 font-medium text-muted-foreground text-sm">
                Watch the trick sequence, then repeat it back in order. One more trick is added each round!
              </p>
              {leaderboard.tricks > 0 && (
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-accent mb-4">
                  <Star size={14} /> Personal Best: {leaderboard.tricks} combo
                </div>
              )}
              <Button size="lg" onClick={startGame} className="w-full text-xl py-6 mb-3">
                Start Game
              </Button>
              <button onClick={() => setShowHowTo(true)} className="text-secondary text-sm font-bold underline underline-offset-2">
                How to play?
              </button>
            </div>
          )}

          {/* Game over screen */}
          {gameOver && (
            <div className="text-center p-8 bg-white/95 rounded-3xl z-20 absolute max-w-sm shadow-lg border-4 border-blue-200">
              <div className="text-4xl mb-2">{isNewBest ? '🏆' : '😅'}</div>
              <h2 className="text-3xl font-display font-bold text-destructive mb-1">Oops!</h2>
              {isNewBest && <div className="text-sm font-bold text-accent mb-2">New Personal Best!</div>}
              <p className="text-5xl font-display font-black text-secondary mb-1">{lastScore}</p>
              <p className="text-sm text-muted-foreground mb-1">trick combo</p>
              {leaderboard.tricks > 0 && lastScore !== null && lastScore < leaderboard.tricks && (
                <p className="text-xs text-muted-foreground mb-3">Best: {leaderboard.tricks} · Keep going!</p>
              )}
              <p className="mb-5 font-medium text-muted-foreground text-sm">{puppy?.name} got confused — try again!</p>
              <Button size="lg" onClick={startGame} className="w-full text-xl py-5 mb-2">Try Again</Button>
              <Link href="/minigames" className="block">
                <Button variant="outline" className="w-full border-2">Back to Games</Button>
              </Link>
            </div>
          )}

          {/* Dog */}
          <div className="w-44 h-44 relative z-10 mb-6">
            <motion.div
              animate={animProps}
              className="w-full h-full origin-bottom"
            >
              {puppy && <DogIllustration breed={puppy.breed} />}
            </motion.div>

            {/* Status label */}
            <AnimatePresence>
              {showingSequence && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-blue-100 border-2 border-blue-300 px-4 py-1 rounded-full font-bold text-sm text-blue-600 whitespace-nowrap"
                >
                  Watch carefully...
                </motion.div>
              )}
              {isPlaying && !showingSequence && !gameOver && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-green-100 border-2 border-green-300 px-4 py-1 rounded-full font-bold text-sm text-green-700 whitespace-nowrap"
                >
                  Your turn! {playerStep + 1}/{sequence.length}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sequence indicator dots */}
          {isPlaying && !gameOver && (
            <div className="flex gap-2 mb-2">
              {sequence.map((trickId, i) => {
                const trick = TRICKS.find(t => t.id === trickId)!;
                return (
                  <motion.div
                    key={i}
                    className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs ${
                      i < playerStep ? 'bg-green-400' :
                      i === playerStep && !showingSequence ? `${trick.color} ring-2 ${trick.ring}` :
                      'bg-muted'
                    }`}
                  >
                    {i < playerStep ? '✓' : ''}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Trick buttons */}
        <div className="grid grid-cols-2 gap-3 shrink-0">
          {TRICKS.map(trick => (
            <motion.button
              key={trick.id}
              onClick={() => handlePlayerInput(trick.id)}
              disabled={showingSequence || !isPlaying || gameOver}
              animate={
                highlightedButton === trick.id ? { scale: 1.1 } :
                wrongButton === trick.id ? { x: [-6, 6, -6, 0] } :
                {}
              }
              className={`h-20 text-xl font-display font-bold text-white rounded-2xl border-b-4 border-black/20 transition-all
                hover:brightness-110 active:border-b-0 active:translate-y-[4px]
                disabled:opacity-40 disabled:cursor-not-allowed
                ${trick.color}
                ${highlightedButton === trick.id ? 'ring-4 ring-white/80 brightness-125' : ''}
                ${wrongButton === trick.id ? 'brightness-75' : ''}
              `}
            >
              <span className="block text-2xl mb-1">{trick.emoji}</span>
              {trick.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
