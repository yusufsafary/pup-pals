import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Heart, Bone, Zap, Sparkles, Trophy, Target, Activity, Scissors,
  ChevronDown, ChevronRight, Home, Star, Info
} from 'lucide-react';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold font-display text-primary mb-6 flex items-center gap-3">
      {title}
    </h2>
    {children}
  </section>
);

const FAQ_ITEMS = [
  {
    q: 'Is Nintendogs free to play?',
    a: 'Yes! Nintendogs is completely free. No downloads, no sign-ups — just open it in your browser and start playing.',
  },
  {
    q: 'Will my puppy be saved if I close the browser?',
    a: "Your puppy is saved automatically in your browser's local storage. As long as you use the same browser on the same device, your pup will be there when you return.",
  },
  {
    q: "What happens to my puppy while I'm away?",
    a: "Over time, happiness and hunger slowly decrease while energy slowly recovers. Check in regularly to keep your pup happy and well-fed!",
  },
  {
    q: 'How do I get a high score in Fetch?',
    a: 'React quickly — the ball window shrinks as your score goes up. Keep your eyes on the whole play area and tap/click the moment it appears.',
  },
  {
    q: 'What does energy affect?',
    a: 'Low energy (below 10) prevents your pup from playing minigames. Feed your pup to restore hunger, and rest helps energy recover naturally over time.',
  },
  {
    q: 'Can I rename my puppy?',
    a: "You can adopt a new puppy anytime from the Adopt page, which lets you pick a new name and breed. Note that this resets your current pup's stats.",
  },
  {
    q: 'What is the Leaderboard?',
    a: 'The leaderboard shows your personal best scores for each minigame on this device. Beat your own records!',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-4 border-border rounded-2xl overflow-hidden mb-3 bg-white">
      <button
        className="w-full flex items-center justify-between p-5 text-left font-bold text-lg font-display hover:bg-muted/30 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={20} className="text-primary" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="px-5 pb-5 text-muted-foreground font-medium leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HowToPlayPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 w-full">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm mb-4">
          <Info size={16} /> Game Guide
        </div>
        <h1 className="text-5xl md:text-6xl font-bold font-display text-primary mb-4">
          How to Play
        </h1>
        <p className="text-xl text-muted-foreground font-medium max-w-xl mx-auto">
          Everything you need to know to raise the happiest pup on the block.
        </p>
      </motion.div>

      {/* Step 1 — Adopt */}
      <Section title="Step 1 — Adopt a Puppy">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {[
            { breed: 'Shiba Inu', trait: 'Independent & Bold', color: 'border-orange-300 bg-orange-50' },
            { breed: 'Golden Retriever', trait: 'Friendly & Devoted', color: 'border-yellow-300 bg-yellow-50' },
            { breed: 'Dalmatian', trait: 'Energetic & Smart', color: 'border-gray-300 bg-gray-50' },
            { breed: 'Poodle', trait: 'Clever & Elegant', color: 'border-pink-300 bg-pink-50' },
            { breed: 'Corgi', trait: 'Cheerful & Loyal', color: 'border-amber-300 bg-amber-50' },
            { breed: 'Husky', trait: 'Adventurous & Vocal', color: 'border-blue-300 bg-blue-50' },
          ].map(b => (
            <Card key={b.breed} className={`border-4 ${b.color} p-4 flex items-center gap-4`}>
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shrink-0">
                🐾
              </div>
              <div>
                <p className="font-bold font-display text-lg">{b.breed}</p>
                <p className="text-sm text-muted-foreground font-medium">{b.trait}</p>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-muted-foreground font-medium leading-relaxed">
          Head to the <strong>Adopt</strong> page, pick one of 6 adorable breeds, give your pup a name, and you're ready to go!
        </p>
      </Section>

      {/* Step 2 — Stats */}
      <Section title="Step 2 — Understand Your Pup's Stats">
        <div className="grid gap-4 mb-4">
          <Card className="border-4 border-red-200 bg-red-50 p-5 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 chunky-shadow">
              <Heart className="text-primary fill-primary" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-primary">Happiness</h3>
              <p className="text-muted-foreground font-medium">
                Increases when you <strong>pet</strong>, <strong>groom</strong>, or <strong>play games</strong>. Decreases slowly over time. Keep it above 60 for a cheerful pup!
              </p>
            </div>
          </Card>
          <Card className="border-4 border-orange-200 bg-orange-50 p-5 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 chunky-shadow">
              <Bone className="text-amber-600" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-amber-700">Hunger</h3>
              <p className="text-muted-foreground font-medium">
                Decreases the fastest over time. <strong>Feed</strong> your pup regularly to keep this full. A hungry pup is a sad pup!
              </p>
            </div>
          </Card>
          <Card className="border-4 border-blue-200 bg-blue-50 p-5 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 chunky-shadow">
              <Zap className="text-blue-500" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-blue-600">Energy</h3>
              <p className="text-muted-foreground font-medium">
                <strong>Recovers automatically</strong> over time. Playing minigames uses energy. Your pup needs at least 10 energy to play games.
              </p>
            </div>
          </Card>
        </div>
        <div className="bg-yellow-50 border-4 border-yellow-200 rounded-2xl p-4 flex gap-3">
          <Star className="text-yellow-500 shrink-0 mt-1" size={20} />
          <p className="text-sm font-medium text-muted-foreground">
            <strong>Pro Tip:</strong> Stats decay while you're away, but energy recovers. Come back daily to feed and pet your pup!
          </p>
        </div>
      </Section>

      {/* Step 3 — Minigames */}
      <Section title="Step 3 — Play Minigames">
        <div className="space-y-6">

          {/* Fetch */}
          <Card className="border-4 border-primary p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Target className="text-primary" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display text-primary">Fetch!</h3>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Reflex Game · 30 seconds</span>
              </div>
            </div>
            <div className="space-y-3 text-muted-foreground font-medium">
              <div className="flex items-start gap-3">
                <ChevronRight className="text-primary shrink-0 mt-0.5" size={18} />
                <p>A tennis ball appears randomly in the play area. <strong>Click or tap it</strong> before it disappears!</p>
              </div>
              <div className="flex items-start gap-3">
                <ChevronRight className="text-primary shrink-0 mt-0.5" size={18} />
                <p>The ball gets <strong>smaller and faster</strong> as your score increases — so it gets harder the better you do.</p>
              </div>
              <div className="flex items-start gap-3">
                <ChevronRight className="text-primary shrink-0 mt-0.5" size={18} />
                <p>You have <strong>30 seconds</strong>. Score as many catches as possible before time runs out.</p>
              </div>
              <div className="flex items-start gap-3">
                <ChevronRight className="text-primary shrink-0 mt-0.5" size={18} />
                <p><strong>Tip:</strong> Move your cursor to the center of the play area to minimize travel distance between clicks.</p>
              </div>
            </div>
          </Card>

          {/* Tricks */}
          <Card className="border-4 border-secondary p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                <Activity className="text-secondary" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display text-secondary">Simon Says Tricks</h3>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Memory Game · Endless</span>
              </div>
            </div>
            <div className="space-y-3 text-muted-foreground font-medium">
              <div className="flex items-start gap-3">
                <ChevronRight className="text-secondary shrink-0 mt-0.5" size={18} />
                <p>Your pup performs a <strong>sequence of tricks</strong> — Sit, Spin, Shake, Roll. Watch carefully!</p>
              </div>
              <div className="flex items-start gap-3">
                <ChevronRight className="text-secondary shrink-0 mt-0.5" size={18} />
                <p>After the sequence, <strong>repeat it back</strong> by pressing the trick buttons in the same order.</p>
              </div>
              <div className="flex items-start gap-3">
                <ChevronRight className="text-secondary shrink-0 mt-0.5" size={18} />
                <p>Each round <strong>adds one more trick</strong> to the sequence. How long can you remember?</p>
              </div>
              <div className="flex items-start gap-3">
                <ChevronRight className="text-secondary shrink-0 mt-0.5" size={18} />
                <p><strong>Tip:</strong> Say the trick names out loud as you watch — it helps lock the sequence in your memory.</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {['Sit', 'Spin', 'Shake', 'Roll'].map((t, i) => (
                <div key={t} className={`rounded-xl py-2 text-center text-white font-bold font-display text-sm ${['bg-blue-400','bg-green-400','bg-yellow-400','bg-purple-400'][i]}`}>
                  {t}
                </div>
              ))}
            </div>
          </Card>

          {/* Grooming */}
          <Card className="border-4 border-accent p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                <Scissors className="text-accent-foreground" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display">Speed Grooming</h3>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Speed Game · 20 seconds</span>
              </div>
            </div>
            <div className="space-y-3 text-muted-foreground font-medium">
              <div className="flex items-start gap-3">
                <ChevronRight className="text-accent-foreground shrink-0 mt-0.5" size={18} />
                <p>Your pup rolled in the mud! <strong>Click the brown dirt spots</strong> on the dog to clean them off.</p>
              </div>
              <div className="flex items-start gap-3">
                <ChevronRight className="text-accent-foreground shrink-0 mt-0.5" size={18} />
                <p>Each spot you clean <strong>spawns 1-2 new spots</strong> — there's always more mud to scrub!</p>
              </div>
              <div className="flex items-start gap-3">
                <ChevronRight className="text-accent-foreground shrink-0 mt-0.5" size={18} />
                <p>You have <strong>20 seconds</strong>. Clean as many spots as possible for a high score.</p>
              </div>
              <div className="flex items-start gap-3">
                <ChevronRight className="text-accent-foreground shrink-0 mt-0.5" size={18} />
                <p><strong>Tip:</strong> Click rapidly and don't stop — every tap counts. Aim for the center of the blobs.</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Scoring */}
      <Section title="Scoring & Leaderboard">
        <Card className="border-4 border-border p-6">
          <div className="flex items-center gap-4 mb-5">
            <Trophy className="text-accent" size={32} />
            <p className="text-muted-foreground font-medium">
              Your <strong>personal best score</strong> for each game is saved on the Leaderboard. Play again to beat your own record!
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-primary/10 rounded-2xl p-4">
              <div className="text-3xl font-black font-display text-primary mb-1">🎯</div>
              <p className="font-bold font-display text-sm">Fetch</p>
              <p className="text-xs text-muted-foreground font-medium">Balls caught</p>
            </div>
            <div className="bg-secondary/10 rounded-2xl p-4">
              <div className="text-3xl font-black font-display text-secondary mb-1">🧠</div>
              <p className="font-bold font-display text-sm">Tricks</p>
              <p className="text-xs text-muted-foreground font-medium">Combo length</p>
            </div>
            <div className="bg-accent/10 rounded-2xl p-4">
              <div className="text-3xl font-black font-display mb-1">✨</div>
              <p className="font-bold font-display text-sm">Grooming</p>
              <p className="text-xs text-muted-foreground font-medium">Spots cleaned</p>
            </div>
          </div>
        </Card>
      </Section>

      {/* Tips */}
      <Section title="Pro Tips">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: '⏰', tip: 'Check in daily — a few pets and a feeding only takes 30 seconds but keeps your pup at peak happiness.' },
            { icon: '🎮', tip: 'Play games when energy is full (100) to maximize how many rounds you can get through before needing a rest.' },
            { icon: '🍖', tip: 'Hunger drops the fastest. If you can only do one thing, feed your pup first.' },
            { icon: '🏆', tip: 'For Tricks, start slow — don\'t rush during your turn. Accuracy beats speed in the memory game.' },
            { icon: '🖱️', tip: 'For Fetch on desktop, keep your cursor near the center of the play area for faster reaction.' },
            { icon: '👆', tip: 'For Fetch on mobile, use both thumbs — it doubles your chance of being near the ball spawn.' },
          ].map((t, i) => (
            <Card key={i} className="border-4 border-border p-4 flex items-start gap-4 bg-white">
              <span className="text-2xl shrink-0">{t.icon}</span>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">{t.tip}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section title="Frequently Asked Questions">
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div className="text-center py-8">
        <p className="text-xl font-bold font-display mb-6 text-muted-foreground">Ready to start? Your pup is waiting!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/adopt">
            <Button size="lg" className="text-xl px-10 py-6 rounded-3xl w-full sm:w-auto">
              Adopt a Puppy
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline" className="text-xl px-10 py-6 rounded-3xl w-full sm:w-auto border-4">
              <Home size={20} className="mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
