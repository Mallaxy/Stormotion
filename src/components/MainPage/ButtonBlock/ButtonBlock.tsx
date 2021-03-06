import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        inputCounter: {
            width: theme.spacing(10),
        },
    })
);

type buttonProps = {
    handleClick: any;
    stateLength: number;
    myTurn: boolean;
    maxPick: number;
};

export const ButtonBlock: React.FC<buttonProps> = ({
                                                       handleClick,
                                                       stateLength,
                                                       myTurn,
                                                       maxPick,
                                                   }) => {
    const classes = useStyles();
    const [quantity, setQuantity] = useState(1);
    return (
        <div className={classes.root}>
            <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
                size="large"
            >
                <Button
                    onClick={() => handleClick(1)}
                    disabled={stateLength < 1 || !myTurn}
                >
                    One
                </Button>
                <Button
                    onClick={() => handleClick(2)}
                    disabled={stateLength < 2 || !myTurn}
                >
                    Two
                </Button>
                <Button
                    onClick={() => handleClick(3)}
                    disabled={stateLength < 3 || !myTurn}
                >
                    Three
                </Button>
            </ButtonGroup>
            <div className={classes.inputCounter}>
                <TextField
                    id="outlined-name"
                    label="Quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(+event.target.value)}
                    variant="outlined"
                    type="number"
                    size="small"
                    InputProps={{inputProps: {min: 1, max: maxPick}}}
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleClick(quantity)}
                size="large"
                disabled={quantity > maxPick || stateLength < quantity || !myTurn}
            >
                Pick
            </Button>
        </div>
    );
};
