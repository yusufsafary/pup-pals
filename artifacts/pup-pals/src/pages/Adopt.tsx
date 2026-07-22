import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DogIllustration } from '@/components/dogs';
import { useGameState, Breed } from '@/store/use-game-state';

const BREEDS: { name: Breed; description: string; trait: string }[] = [
  { name: 'Shiba Inu', trait: 'Independent & Bold', description: 'A spirited and good-natured companion with a curly tail and fox-like face.' },
  { name: 'Golden Retriever', trait: 'Friendly & Devoted', description: 'Eager to please and loves everyone they meet. The ultimate family friend.' },
  { name: 'Dalmatian', trait: 'Energetic & Smart', description: 'Famous for their spots and boundless energy. Ready for any adventure.' },
  { name: 'Poodle', trait: 'Proud & Clever', description: 'Highly intelligent and exceptionally trainable with a fluffy, elegant coat.' },
  { name: 'Corgi', trait: 'Affectionate & Alert', description: 'A big dog in a small package. Smart, strong, and loves to work.' },
  { name: 'Husky', trait: 'Loyal & Mischievous', description: 'A sled dog with stunning eyes and a thick coat. Loves to sing and play.' },
];

export default function AdoptPage() {
  const [, setLocation] = useLocation();
  const { adoptPuppy } = useGameState();
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [name, setName] = useState('');

  const handleAdopt = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBreed && name.trim()) {
      adoptPuppy(name.trim(), selectedBreed);
      setLocation('/play');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-4">
          Meet Your New Best Friend
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          Choose a puppy to bring home. They're all waiting for you!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {BREEDS.map((breed) => (
          <Card 
            key={breed.name}
            className={`cursor-pointer transition-all duration-300 ${
              selectedBreed === breed.name 
                ? 'border-primary ring-4 ring-primary/20 scale-105' 
                : 'hover:border-primary/50 hover:-translate-y-1'
            }`}
            onClick={() => setSelectedBreed(breed.name)}
          >
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-4 bg-muted/50 rounded-full flex items-center justify-center p-4">
                <DogIllustration breed={breed.name} />
              </div>
              <h3 className="text-2xl font-bold font-display mb-1">{breed.name}</h3>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary mb-3">
                {breed.trait}
              </span>
              <p className="text-sm text-muted-foreground font-medium">
                {breed.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {selectedBreed && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl border-4 border-primary chunky-shadow max-w-xl mx-auto"
        >
          <form onSubmit={handleAdopt} className="flex flex-col gap-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold font-display mb-2">
                Name your {selectedBreed}
              </h3>
            </div>
            
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Buster, Luna, Max..."
              className="w-full text-2xl p-4 border-4 border-border rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 font-bold text-center transition-all"
              maxLength={15}
              required
            />
            
            <Button 
              type="submit" 
              size="lg" 
              className="w-full text-xl py-6 rounded-2xl"
              disabled={!name.trim()}
            >
              Take {name.trim() || 'Them'} Home!
            </Button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
