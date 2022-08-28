import { NavList } from '../Navigation/NavList';
import { monsters } from '../../utils/monsters';

import STYLES from './styles.module.css';

export const Monsters = () => {
  return (
    <section>
      <header className="App-header">
        <h1>Monsters!</h1>
      </header>
      <NavList />

      <section className={STYLES.items}>
        {monsters.map((monster, index) => {
          return (
            <div key={index} className={STYLES.item}>
              {monster.component}
            </div>
          );
        })}
      </section>
    </section>
  );
};
