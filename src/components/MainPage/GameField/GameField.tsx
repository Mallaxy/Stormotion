import React from 'react';
import s from './GameField.module.css'

const imgUrl: string = 'https://cdn1.iconfinder.com/data/icons/matchstick-emoji-cartoons/560/matchstick-matches-emoji-smiley-cartoon-032-512.png'

type FieldProps = {
    state: Array<string | undefined>
}

export const GameField:React.FC<FieldProps> = ({state}) => {

    return (
        <div className={s.gameField}>
            <div className={s.matchElements}>
                {state.map(el => <div>🍩</div>)}
            </div>
            <div className={s.quantity}>
                {state.length}
            </div>
        </div>
    );
}