import React from 'react';
import s from './GameField.module.css';

type FieldProps = {
    state: number;
};

export const GameField: React.FC<FieldProps> = ({state}) => {

    const arrayElements: Array<number> = [...Array(state).fill(1)];

    return (
        <div className={s.gameField}>
            <div className={s.matchElements}>
                {arrayElements.map((el, index) => (
                    <div key={index}>🍩</div>
                ))}
            </div>
            <div className={s.quantity}>{state}</div>
        </div>
    );
};
