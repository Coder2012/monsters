import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <section>
      <header className="App-header">
        <h1>Monsters Rewards!</h1>
      </header>
      <nav>
        <Link to="/kids">Kids</Link> |<Link to="tasks">Tasks</Link> |
        <Link to="/monsters">Monsters</Link>
      </nav>
    </section>
  );
};
