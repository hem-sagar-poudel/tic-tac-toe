import { CpuChipIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { setClear } from "../lib/slice/MoveSlice";
import { setTurn } from "../lib/slice/TurnSlice";
import { setWinner } from "../lib/slice/WinnerSlice";
import { useEffect, useState } from "react";
import { storeGameAsync } from "../lib/slice/StoreGameSlice";
import { updateGameAsync } from "../lib/slice/UpdateGameSlice";
import { gameAsync } from "../lib/slice/GameSlice";

export default function Winner() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const dice = useSelector((state) => state.dice);
  const boxFill = useSelector((state) => state.boxFill.value);
  const winner = useSelector((state) => state.winner.value);
  const player = useSelector((state) => state.player.value);
  const updateGame = useSelector((state) => state.updateGame);

  useEffect(() => {
    let scores = JSON.parse(localStorage.getItem("scores"));
    let id = localStorage.getItem("scoresId");
    let newScore = [];
    scores.map((score) => {
      console.log("scores", score, winner, player.one, score.p);
      if (dice.value.one == winner && player.one == score.p) {
        newScore = [...newScore, { ...score, s: score.s + 10 }];
        // console.log("newScore", newScore);
      } else if (dice.value.two == winner && player.two == score.p) {
        newScore = [...newScore, { ...score, s: score.s + 10 }];
      } else {
        newScore = [...newScore, score];
      }
    });
    if (id == null) {
      console.log("newScore", newScore);
      dispatch(storeGameAsync({ data: { player: newScore } }));
    } else {
      dispatch(updateGameAsync({ data: { player: newScore }, id }));
    }
    localStorage.setItem("scores", JSON.stringify(newScore));
    // console.log("newScore", newScore, scores);
  }, [winner]);

  useEffect(() => {
    dispatch(gameAsync());
  }, [updateGame]);

  const Player = () => {
    if (dice.value.one == winner) {
      return (
        <>
          <div className="flex justify-center">
            <div className="flex items-center rounded bg-gray-300 px-3 text-center text-xl font-bold text-gray-900">
              P1 {player.one}
              <span className="ps-3 !text-3xl">{dice.value.one}</span>
            </div>
          </div>
        </>
      );
    }
    if (dice.value.two == winner) {
      if (mode.value == 1) {
        return (
          <>
            <div className="flex justify-center">
              <div className="flex items-center rounded bg-gray-900 px-3 text-center text-xl font-bold text-white">
                P2 {player.two}
                <span className="ps-3 !text-3xl"> {dice.value.two}</span>
              </div>
            </div>
          </>
        );
      }
      return (
        <>
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-1 rounded bg-gray-900 px-3 text-center text-xl font-bold text-white">
              <span>P</span> <CpuChipIcon className="size-5 " />
              <span className="ps-3 !text-3xl">{dice.value.two}</span>
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <div className="text-center text-2xl font-bold">
        {boxFill && winner === null ? (
          <>
            <span>Draw</span>
          </>
        ) : (
          <>
            <span>Winner</span>
            <Player />
          </>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            dispatch(setClear());
            dispatch(setWinner(null));
            dispatch(setTurn("O"));
            // dispatch(setTurn(null));
          }}
          className="text-gary-900 flex  gap-2 rounded-lg bg-gray-300 p-2 px-5 text-lg font-bold transition-all duration-300 ease-in-out hover:bg-gray-900 hover:text-gray-200"
        >
          Play Again
        </button>
      </div>
    </>
  );
}
