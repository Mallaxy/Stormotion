import React from 'react';
import './Modal.css'

type TypesModal = {
    active: boolean,
    setActive: any
}

export const Modal:React.FC<TypesModal> = ({active, setActive, children}) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modalContent active" : "modalContent"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}