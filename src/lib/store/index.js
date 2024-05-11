import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "../slice/ModeSlice";
import diceReducer from "../slice/DiceSlice";
import pauseReducer from "../slice/PauseSlice";
import moveReducer from "../slice/MoveSlice";
import boxFillReducer from "../slice/BoxFillSlice";
import turnReducer from "../slice/TurnSlice";
import winnerReducer from "../slice/WinnerSlice";
import playerReducer from "../slice/PlayerSlice";
import gameReducer from "../slice/GameSlice";
import storeGameReducer from "../slice/StoreGameSlice";
import updateGameReducer from "../slice/UpdateGameSlice";

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    dice: diceReducer,
    pause: pauseReducer,
    move: moveReducer,
    turn: turnReducer,
    winner: winnerReducer,
    boxFill: boxFillReducer,
    player: playerReducer,
    game: gameReducer,
    storeGame: storeGameReducer,
    updateGame: updateGameReducer,
  },
});
