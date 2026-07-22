import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { GameStateProvider } from '@/store/use-game-state';
import { Layout } from '@/components/layout/Layout';

import HomePage from '@/pages/Home';
import AdoptPage from '@/pages/Adopt';
import PlayPage from '@/pages/Play';
import MinigamesHub from '@/pages/MinigamesHub';
import MinigameFetch from '@/pages/MinigameFetch';
import MinigameTricks from '@/pages/MinigameTricks';
import MinigameGrooming from '@/pages/MinigameGrooming';
import LeaderboardPage from '@/pages/Leaderboard';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/adopt" component={AdoptPage} />
      <Route path="/play" component={PlayPage} />
      <Route path="/minigames" component={MinigamesHub} />
      <Route path="/minigames/fetch" component={MinigameFetch} />
      <Route path="/minigames/tricks" component={MinigameTricks} />
      <Route path="/minigames/grooming" component={MinigameGrooming} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameStateProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
      </GameStateProvider>
    </QueryClientProvider>
  );
}

export default App;
