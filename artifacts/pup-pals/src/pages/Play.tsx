import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Bone, Zap, Sparkles, Activity, Scissors } from 'lucide-react';
import { useGameState } from '@/store/use-game-state';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { DogIllustration } from '@/components/dogs';

type ActionType = 'feed' | 'pet' | 'fetch' | 'trick' | 'groom' | null;

export default function PlayPage() {
  const { puppy, interact } = useGameState();
  const [location, setLocation] = useLocation();
  const [activeAction, setActiveAction] = useState<ActionType>(null);
  const [reactionMsg, setReactionMsg] = useState('');

  useEffect(() => {
    if (!puppy) {
      setLocation('/adopt');
    }
  }, [puppy, setLocation]);

  if (!puppy) return null;

  const handleInteract = (action: NonNullable<ActionType>) => {
    interact(action);
    setActiveAction(action);
    
    // Set reaction message
    const messages = {
      feed: 'Chomp chomp! Yum!',
      pet: 'Happy tails! ♥',
      fetch: 'Woosh! Got it!',
      trick: 'Ta-da! Good dog!',
      groom: 'So fresh and clean!'
    };
    setReactionMsg(messages[action]);

    setTimeout(() => {
      setActiveAction(null);
      setReactionMsg('');
    }, 2000);
  };

  // Determine dog animation state
  let animationProps = {};
  switch (activeAction) {
    case 'feed':
      animationProps = { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] };
      break;
    case 'pet':
      animationProps = { scale: [1, 0.95, 1.05, 1], y: [0, 5, -5, 0] };
      break;
    case 'fetch':
      animationProps = { x: [0, 100, 0], scaleX: [1, -1, 1] }; // run right and back
      break;
    case 'trick':
      animationProps = { rotate: [0, 360], scale: [1, 1.2, 1] }; // spin
      break;
    case 'groom':
      animationProps = { opacity: [1, 0.8, 1], rotate: [0, 5, -5, 0] };
      break;
    default:
      // Breathing idle animation
      animationProps = { y: [0, -5, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } };
  }

  // Get status color based on value
  const getStatusColor = (value: number) => {
    if (value > 60) return "bg-green-500";
    if (value > 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto w-full h-full gap-6">
      
      {/* Header Stats */}
      <Card className="p-6 bg-white shadow-sm border-b-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold font-display text-primary">{puppy.name}</h1>
            <p className="text-muted-foreground font-bold uppercase tracking-wider text-sm">{puppy.breed}</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-muted-foreground">Level</span>
            <div className="text-2xl font-bold font-display text-secondary">
              {Math.floor((puppy.happiness + puppy.energy) / 20) + 1}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 flex justify-center"><Heart className="text-primary fill-primary" size={24} /></div>
            <div className="flex-1">
              <Progress value={puppy.happiness} indicatorColor={getStatusColor(puppy.happiness)} />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 flex justify-center"><Bone className="text-amber-600 fill-amber-600" size={24} /></div>
            <div className="flex-1">
              <Progress value={puppy.hunger} indicatorColor={getStatusColor(puppy.hunger)} />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 flex justify-center"><Zap className="text-yellow-400 fill-yellow-400" size={24} /></div>
            <div className="flex-1">
              <Progress value={puppy.energy} indicatorColor={getStatusColor(puppy.energy)} />
            </div>
          </div>
        </div>
      </Card>

      {/* Main Stage */}
      <div className="flex-1 relative bg-gradient-to-b from-blue-50 to-green-100 rounded-3xl border-4 border-border overflow-hidden min-h-[300px] flex items-end justify-center pb-12">
        {/* Background elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-white rounded-full opacity-50 blur-xl" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-white rounded-full opacity-50 blur-xl" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-green-200/50 rounded-t-[100px]" />

        {/* Reaction Text */}
        <AnimatePresence>
          {reactionMsg && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: -80, scale: 1 }}
              exit={{ opacity: 0, y: -100 }}
              className="absolute top-1/3 bg-white px-4 py-2 rounded-2xl font-bold text-lg font-display text-primary shadow-lg border-2 border-primary z-20"
            >
              {reactionMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Puppy */}
        <motion.div 
          className="w-48 h-48 z-10 relative cursor-pointer"
          animate={animationProps}
          transition={{ duration: 0.5 }}
          onClick={() => handleInteract('pet')}
        >
          <DogIllustration breed={puppy.breed} />
          
          {/* Petting Sparkles */}
          <AnimatePresence>
            {activeAction === 'pet' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0 }}
                className="absolute -top-4 -right-4 text-primary"
              >
                <Heart className="fill-primary" size={32} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Action Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button 
          variant="outline" 
          className="flex flex-col gap-2 h-auto py-4 bg-white hover:bg-amber-50 hover:text-amber-700 hover:border-amber-400"
          onClick={() => handleInteract('feed')}
          disabled={puppy.hunger >= 100}
        >
          <Bone size={28} />
          <span>Feed</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex flex-col gap-2 h-auto py-4 bg-white hover:bg-primary/10 hover:text-primary hover:border-primary"
          onClick={() => handleInteract('pet')}
        >
          <Heart size={28} />
          <span>Pet</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex flex-col gap-2 h-auto py-4 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400"
          onClick={() => {
            setLocation('/minigames');
          }}
        >
          <Activity size={28} />
          <span>Games</span>
        </Button>

        <Button 
          variant="outline" 
          className="flex flex-col gap-2 h-auto py-4 bg-white hover:bg-teal-50 hover:text-teal-600 hover:border-teal-400"
          onClick={() => handleInteract('groom')}
          disabled={puppy.happiness >= 100}
        >
          <Scissors size={28} />
          <span>Groom</span>
        </Button>
      </div>

    </div>
  );
}
