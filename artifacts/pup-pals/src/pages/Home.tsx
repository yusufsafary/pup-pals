import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { DogIllustration } from '@/components/dogs';
import { useGameState } from '@/store/use-game-state';
import { Target, Activity, Scissors, HelpCircle, Star, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  const { puppy } = useGameState();

  return (
    <div className="flex flex-col items-center justify-center text-center gap-10 py-10">

      {/* Hero */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="w-44 h-44 md:w-60 md:h-60 relative"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-full h-full"
        >
          <DogIllustration breed="Corgi" />
        </motion.div>
        <motion.div
          animate={{ y: -50, opacity: [0, 1, 0], scale: [0.5, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          className="absolute top-0 right-0 text-primary text-2xl"
        >❤</motion.div>
        <motion.div
          animate={{ y: -40, opacity: [0, 1, 0], scale: [0.5, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
          className="absolute top-10 -left-4 text-accent text-xl"
        >❤</motion.div>
      </motion.div>

      <div className="space-y-3 max-w-xl">
        <h1 className="text-5xl md:text-7xl font-bold font-display text-primary drop-shadow-sm">
          Nintendogs
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-semibold">
          Your virtual best friend, right in your browser.
        </p>
        <p className="text-base text-muted-foreground font-medium max-w-md mx-auto">
          Adopt from 6 adorable breeds, keep them happy with food and play, and compete in 3 fun minigames. Free — no download needed!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {puppy ? (
          <Link href="/play">
            <Button size="lg" className="w-full sm:w-auto text-xl px-12 py-8 rounded-3xl">
              Play with {puppy.name}
            </Button>
          </Link>
        ) : (
          <Link href="/adopt">
            <Button size="lg" className="w-full sm:w-auto text-xl px-12 py-8 rounded-3xl">
              Adopt a Puppy
            </Button>
          </Link>
        )}
        <Link href="/how-to-play">
          <Button size="lg" variant="outline" className="w-full sm:w-auto text-xl px-10 py-8 rounded-3xl border-4">
            <HelpCircle size={20} className="mr-2" /> How to Play
          </Button>
        </Link>
      </div>

      {/* How it works */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-left w-full max-w-3xl" aria-label="How Nintendogs works">
        <div className="bg-white p-6 rounded-3xl border-4 border-border chunky-shadow">
          <div className="bg-primary/20 w-12 h-12 rounded-2xl flex items-center justify-center text-primary text-2xl mb-4 font-display font-bold">1</div>
          <h2 className="text-xl font-bold font-display mb-2">Adopt</h2>
          <p className="text-muted-foreground font-medium">Choose from 6 adorable breeds — Shiba Inu, Corgi, Husky, and more. Give your pup a name!</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border-4 border-border chunky-shadow">
          <div className="bg-secondary/20 w-12 h-12 rounded-2xl flex items-center justify-center text-secondary text-2xl mb-4 font-display font-bold">2</div>
          <h2 className="text-xl font-bold font-display mb-2">Care</h2>
          <p className="text-muted-foreground font-medium">Feed, pet, and groom your pup to keep their happiness, hunger, and energy meters full.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border-4 border-border chunky-shadow">
          <div className="bg-accent/20 w-12 h-12 rounded-2xl flex items-center justify-center text-accent text-2xl mb-4 font-display font-bold">3</div>
          <h2 className="text-xl font-bold font-display mb-2">Play</h2>
          <p className="text-muted-foreground font-medium">Play fetch, teach tricks, and speed-groom to earn high scores and top the leaderboard.</p>
        </div>
      </section>

      {/* Minigames showcase */}
      <section className="w-full max-w-3xl text-left" aria-label="Minigames">
        <h2 className="text-3xl font-bold font-display text-center mb-6 text-foreground">3 Fun Minigames</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/10 border-4 border-primary/30 rounded-3xl p-5 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center chunky-shadow">
              <Target className="text-primary" size={28} />
            </div>
            <h3 className="text-lg font-bold font-display">Fetch!</h3>
            <p className="text-sm text-muted-foreground font-medium">Tap the tennis ball before it bounces away. Gets faster as you score!</p>
          </div>
          <div className="bg-secondary/10 border-4 border-secondary/30 rounded-3xl p-5 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center chunky-shadow">
              <Activity className="text-secondary" size={28} />
            </div>
            <h3 className="text-lg font-bold font-display">Simon Says</h3>
            <p className="text-sm text-muted-foreground font-medium">Watch your pup's trick sequence, then repeat it back perfectly!</p>
          </div>
          <div className="bg-accent/10 border-4 border-accent/30 rounded-3xl p-5 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center chunky-shadow">
              <Scissors size={28} />
            </div>
            <h3 className="text-lg font-bold font-display">Speed Groom</h3>
            <p className="text-sm text-muted-foreground font-medium">Clean mud spots off your pup as fast as you can in 20 seconds!</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link href="/how-to-play">
            <button className="text-primary font-bold underline underline-offset-2 hover:opacity-80 transition-opacity text-sm">
              Read the full game guide →
            </button>
          </Link>
        </div>
      </section>

      {/* Features / trust signals */}
      <section className="w-full max-w-3xl text-center" aria-label="Features">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <Zap className="text-green-600" size={24} />
            </div>
            <p className="text-sm font-bold font-display">Instant Play</p>
            <p className="text-xs text-muted-foreground font-medium">No download or sign-up needed</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Shield className="text-blue-600" size={24} />
            </div>
            <p className="text-sm font-bold font-display">Auto-Saved</p>
            <p className="text-xs text-muted-foreground font-medium">Your pup is saved in your browser</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
              <Star className="text-yellow-600" size={24} />
            </div>
            <p className="text-sm font-bold font-display">100% Free</p>
            <p className="text-xs text-muted-foreground font-medium">No ads, no in-app purchases</p>
          </div>
        </div>
      </section>

    </div>
  );
}
