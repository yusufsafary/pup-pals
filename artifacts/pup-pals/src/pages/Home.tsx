import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { DogIllustration } from '@/components/dogs';
import { useGameState } from '@/store/use-game-state';

export default function HomePage() {
  const { puppy } = useGameState();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-8 py-12">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="w-48 h-48 md:w-64 md:h-64 relative"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <DogIllustration breed="Corgi" />
        </motion.div>
        
        {/* Floating Hearts */}
        <motion.div
          animate={{ y: -50, opacity: [0, 1, 0], scale: [0.5, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          className="absolute top-0 right-0 text-primary text-2xl"
        >
          ❤
        </motion.div>
        <motion.div
          animate={{ y: -40, opacity: [0, 1, 0], scale: [0.5, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
          className="absolute top-10 -left-4 text-accent text-xl"
        >
          ❤
        </motion.div>
      </motion.div>

      <div className="space-y-4 max-w-xl">
        <h1 className="text-5xl md:text-7xl font-bold font-display text-primary drop-shadow-sm">
          Pup Pals
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-semibold">
          Your virtual best friend, right in your browser.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        {puppy ? (
          <Link href="/play" className="block">
            <Button size="lg" className="w-full sm:w-auto text-xl px-12 py-8 rounded-3xl">
              Play with {puppy.name}
            </Button>
          </Link>
        ) : (
          <Link href="/adopt" className="block">
            <Button size="lg" className="w-full sm:w-auto text-xl px-12 py-8 rounded-3xl">
              Adopt a Puppy
            </Button>
          </Link>
        )}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left w-full">
        <div className="bg-white p-6 rounded-3xl border-4 border-border chunky-shadow">
          <div className="bg-primary/20 w-12 h-12 rounded-2xl flex items-center justify-center text-primary text-2xl mb-4 font-display">
            1
          </div>
          <h3 className="text-xl font-bold font-display mb-2">Adopt</h3>
          <p className="text-muted-foreground font-medium">Choose from 6 adorable breeds, each with their own unique personality and style.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border-4 border-border chunky-shadow">
          <div className="bg-secondary/20 w-12 h-12 rounded-2xl flex items-center justify-center text-secondary text-2xl mb-4 font-display">
            2
          </div>
          <h3 className="text-xl font-bold font-display mb-2">Care</h3>
          <p className="text-muted-foreground font-medium">Feed, pet, and groom your pup to keep their happiness, hunger, and energy meters full.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border-4 border-border chunky-shadow">
          <div className="bg-accent/20 w-12 h-12 rounded-2xl flex items-center justify-center text-accent text-2xl mb-4 font-display">
            3
          </div>
          <h3 className="text-xl font-bold font-display mb-2">Play</h3>
          <p className="text-muted-foreground font-medium">Play fetch, teach tricks, and climb the local leaderboards to become the best pup parent.</p>
        </div>
      </section>
    </div>
  );
}
