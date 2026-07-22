import React from 'react';
import { Navigation } from './Navigation';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground pb-24 lg:pt-24 lg:pb-0">
      <Navigation />
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 flex flex-col">
        {children}
      </main>
    </div>
  );
}
