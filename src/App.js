import "./App.css";
import Box from "./components/Box";
import { useDispatch, useSelector } from "react-redux";
import Mode from "./components/Mode";
import ChooseDice from "./components/ChooseDice";
import { CpuChipIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";
import { pauseMode } from "./lib/slice/PauseSlice";
import Pause from "./components/Pause";
import { indexValue, setClear } from "./lib/slice/MoveSlice";
import Winner from "./components/Winner";
import { checkFill } from "./lib/slice/BoxFillSlice";
import calculateMove from "./utils/calculateMove";
import minMax from "./utils/minmax";
import { setTurn } from "./lib/slice/TurnSlice";
import { setWinner } from "./lib/slice/WinnerSlice";
import { gameAsync } from "./lib/slice/GameSlice";
import { selectDice } from "./lib/slice/DiceSlice";
import { selectMode } from "./lib/slice/ModeSlice";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const dice = useSelector((state) => state.dice);
  const pause = useSelector((state) => state.pause);
  const move = useSelector((state) => state.move);
  const boxFill = useSelector((state) => state.boxFill.value);
  const turn = useSelector((state) => state.turn.value);
  const winner = useSelector((state) => state.winner.value);
  const player = useSelector((state) => state.player.value);

  console.log(move, boxFill);

  useEffect(() => {
    console.log("call Game");
    dispatch(gameAsync());
  }, []);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape" && mode.value) {
        event.preventDefault();
        dispatch(pauseMode(true));
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [mode]);

  const boxClick = (index) => {
    console.log("boxClick", index, turn);
    dispatch(indexValue({ index, value: turn }));
    if (turn === "X") {
      dispatch(setTurn("O"));
    } else {
      dispatch(setTurn("X"));
    }
  };

  useEffect(() => {
    const win = calculateMove(move.index);
    dispatch(checkFill(move.index));
    if (win) {
      dispatch(setWinner(win));
    } else if (mode.value === 2 && turn === dice.value.two) {
      console.log(mode.value);
      let index = minMax(
        dice.value.one,
        dice.value.two,
        dice.value.two,
        move.index,
      );
      boxClick(index.index);

      console.log("CO", index);
    }
  }, [move, dice]);

  return (
    <>
      <div className="mx-auto flex h-lvh max-w-sm flex-col items-center justify-center px-3 py-20">
        <div>
          {pause.value ? (
            <>
              <Pause />
            </>
          ) : (
            <>
              <div className=" flex flex-col gap-10">
                {mode.value && dice.value.one && dice.value.two && (
                  <>
                    <div className="text-center text-5xl font-bold text-primary">
                      Tic Tac Toe
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex justify-center">
                        <div className="flex items-center rounded bg-gray-300 px-3 text-center text-xl font-bold text-gray-900">
                          P1 {player.one}{" "}
                          <span className="ps-3 !text-3xl">
                            {dice.value.one}
                          </span>
                        </div>
                      </div>
                      {mode.value == 1 && (
                        <>
                          <div className="flex justify-center">
                            <div className="flex items-center rounded bg-gray-900 px-3 text-center text-xl font-bold text-white">
                              P2 {player.two}{" "}
                              <span className="ps-3 !text-3xl">
                                {dice.value.two}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      {mode.value == 2 && (
                        <>
                          <div className="flex items-center justify-center">
                            <div className="flex items-center gap-1 rounded bg-gray-900 px-3 text-center text-xl font-bold text-white">
                              <span>P</span> <CpuChipIcon className="size-5 " />
                              <span className="ps-3 !text-3xl">
                                {dice.value.two}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className=" mx-auto">
                      <div className="flex items-center">
                        <Box
                          value={move.index[0]}
                          onClick={() => {
                            boxClick(0);
                          }}
                        />
                        <Box
                          value={move.index[1]}
                          onClick={() => {
                            boxClick(1);
                          }}
                        />
                        <Box
                          value={move.index[2]}
                          onClick={() => {
                            boxClick(2);
                          }}
                        />
                      </div>
                      <div className="flex items-center">
                        <Box
                          value={move.index[3]}
                          onClick={() => {
                            boxClick(3);
                          }}
                        />
                        <Box
                          value={move.index[4]}
                          onClick={() => {
                            boxClick(4);
                          }}
                        />
                        <Box
                          value={move.index[5]}
                          onClick={() => {
                            boxClick(5);
                          }}
                        />
                      </div>
                      <div className="flex items-center">
                        <Box
                          value={move.index[6]}
                          onClick={() => {
                            boxClick(6);
                          }}
                        />
                        <Box
                          value={move.index[7]}
                          onClick={() => {
                            boxClick(7);
                          }}
                        />
                        <Box
                          value={move.index[8]}
                          onClick={() => {
                            boxClick(8);
                          }}
                        />
                      </div>
                    </div>
                    {(winner || boxFill) && <Winner />}
                  </>
                )}
              </div>
              {!mode.value && (
                <>
                  <Mode />
                </>
              )}

              {!dice.value.one && !dice.value.two && mode.value && (
                <>
                  <ChooseDice />
                </>
              )}
            </>
          )}
          {mode.value && !pause.value ? (
            <>
              <div className="mt-5 text-center font-semibold">
                <span className="">Esc to Pause</span>{" "}
                <span
                  onClick={() => {
                    dispatch(selectDice({ one: "", two: "" }));
                    dispatch(selectMode(null));
                    dispatch(pauseMode(false));
                    dispatch(setClear());
                    dispatch(setTurn(null));
                  }}
                  className="cursor-pointer text-sky-900"
                >
                  Home
                </span>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default App;
