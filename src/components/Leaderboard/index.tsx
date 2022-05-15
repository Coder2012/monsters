import { NavList } from '../Navigation';
import { Status } from '../Status';

export const Leaderboard = () => {
  return (
    <section>
      <header className="App-header">
        <h1>Monsters Rewards!</h1>
        <Status />
      </header>
      <NavList />
    </section>
  );
};
