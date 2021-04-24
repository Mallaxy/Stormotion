import React from "react";
import { FormLabel, RadioGroup, TextField } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import s from "./HomePage.module.css";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import { NavLink } from "react-router-dom";
import { gameRules } from "../../common/constants";
import { ValuesState } from "../../redusers/gameReducer";

type InputProps = {
  dispatch: any;
};

export const HomePage: React.FC<InputProps> = ({ dispatch }) => {
  const initialState: ValuesState = {
    beginner: "player",
    count: 12,
    maxPick: 3,
  };

  const [values, setValue] = React.useState(initialState);

  const beginnerHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...values, beginner: (event.target as HTMLInputElement).value });
  };

  return (
    <div className={s.homePage}>
      <div className={s.inputBlock}>
        <div>
          <TextField
            id="outlined-name"
            label="Quantity of Donuts * 2 + 1"
            value={values.count}
            onChange={(event) =>
              setValue({ ...values, count: +event.target.value })
            }
            variant="outlined"
            type="number"
            size="small"
            InputProps={{ inputProps: { min: 2 } }}
          />
          <div className={s.quantity}>{values.count * 2 + 1 + " Donuts"}</div>
        </div>
        <TextField
          id="outlined-name"
          label="Max Donuts by pick"
          value={values.maxPick}
          onChange={(event) =>
            setValue({ ...values, maxPick: +event.target.value })
          }
          variant="outlined"
          type="number"
          size="small"
          InputProps={{ inputProps: { min: 1, max: values.count } }}
          fullWidth={true}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Who will start?</FormLabel>
          <RadioGroup
            aria-label="beginner"
            name="beginner"
            value={values.beginner}
            onChange={beginnerHandleChange}
          >
            <FormControlLabel
              value="player"
              control={<Radio />}
              label="Player"
            />
            <FormControlLabel value="ai" control={<Radio />} label="Bot" />
          </RadioGroup>
        </FormControl>
        <NavLink to="/classic">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch({ type: "SET_STATE", values });
            }}
          >
            Start Game
          </Button>
        </NavLink>
      </div>
      <div className={s.rules}>
        <h1>Rules</h1>
        {gameRules}
      </div>
    </div>
  );
};
