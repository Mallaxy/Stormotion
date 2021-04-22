import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

type buttonProps = {
    handleClick: any,
    stateLength: number,
    myTurn: boolean
}

export const ButtonBlock:React.FC<buttonProps> = ({handleClick, stateLength, myTurn}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" size="large">
                <Button onClick={() => handleClick(1)} disabled={stateLength < 1 || !myTurn }>One</Button>
                <Button onClick={() => handleClick(2)} disabled={stateLength < 2 || !myTurn }>Two</Button>
                <Button onClick={() => handleClick(3)} disabled={stateLength < 3 || !myTurn}>Three</Button>
            </ButtonGroup>
        </div>
    );
}
