import React from 'react';
import {ReactComponent as Monster1} from '../../assets/monsters/kidaha-01.svg';
import {ReactComponent as Monster2} from '../../assets/monsters/kidaha-02.svg';
import {ReactComponent as Monster3} from '../../assets/monsters/kidaha-03.svg';
import {ReactComponent as Monster4} from '../../assets/monsters/kidaha-04.svg';
import {ReactComponent as Monster5} from '../../assets/monsters/kidaha-05.svg';
import {ReactComponent as Monster6} from '../../assets/monsters/kidaha-06.svg';
import {ReactComponent as Monster7} from '../../assets/monsters/kidaha-07.svg';
import {ReactComponent as Monster8} from '../../assets/monsters/kidaha-08.svg';
import {ReactComponent as Monster9} from '../../assets/monsters/kidaha-09.svg';
import {ReactComponent as Monster10} from '../../assets/monsters/kidaha-10.svg';
import {ReactComponent as Monster11} from '../../assets/monsters/kidaha-11.svg';
import {ReactComponent as Monster12} from '../../assets/monsters/kidaha-12.svg';

import STYLES from './styles.module.css';

export const Monsters = () => {
    return (
        <section className={STYLES.container}>
            <section className={STYLES.items}>
                <Monster1 className={STYLES.item}/>
                <Monster2 className={STYLES.item}/>
                <Monster3 className={STYLES.item}/>
                <Monster4 className={STYLES.item}/>
                <Monster5 className={STYLES.item}/>
                <Monster6 className={STYLES.item}/>
                <Monster7 className={STYLES.item}/>
                <Monster8 className={STYLES.item}/>
                <Monster9 className={STYLES.item}/>
                <Monster10 className={STYLES.item}/>
                <Monster11 className={STYLES.item}/>
                <Monster12 className={STYLES.item}/>
            </section>
        </section>
    )
}