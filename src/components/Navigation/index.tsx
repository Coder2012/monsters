import { NavLink } from 'react-router-dom';

import STYLES from './styles.module.css';

export const NavList = () => {
  return (
    <nav className={STYLES.container}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? STYLES.active : STYLES.link
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/monsters"
            className={({ isActive }) =>
              isActive ? STYLES.active : STYLES.link
            }
          >
            Monsters
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/kids"
            className={({ isActive }) =>
              isActive ? STYLES.active : STYLES.link
            }
          >
            Kids
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? STYLES.active : STYLES.link
            }
          >
            Tasks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
