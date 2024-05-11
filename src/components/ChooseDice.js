import { useDispatch, useSelector } from "react-redux";
import { selectDice } from "../lib/slice/DiceSlice";
import { setTurn } from "../lib/slice/TurnSlice";
import ChoosePlayer from "./ChoosePlayer";
import { useEffect, useState } from "react";
import { setPlayer } from "../lib/slice/PlayerSlice";

export default function ChooseDice() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [p1, setP1] = useState();
  const [p2, setP2] = useState();
  const [scores, setScores] = useState([]);
  const mode = useSelector((state) => state.mode);
  useEffect(() => {
    // localStorage.setItem("scores", JSON.stringify([{ p: "hem" }]));
    let score = JSON.parse(localStorage.getItem("scores"));
    if (score?.length) {
      setScores(score);
    }
  }, []);
  const storePlayer = (p) => {
    let score = JSON.parse(localStorage.getItem("scores")) || [];
    if (score) {
      setScores(score);
    }
    console.log("score", score);
    let player;
    if (score) {
      player = score.find((player) => p === player.p);
    }
    if (!player) {
      localStorage.setItem(
        "scores",
        JSON.stringify([...score, { p: p, s: 0 }]),
      );
    }
    console.log(p, player);
  };

  return (
    <>
      {/* {p1} */}
      {step === 1 && (
        <>
          <ChoosePlayer
            step={step}
            onChange={(e) => {
              console.log(e);
              setP1(e.target.value);
            }}
            selectPlayer={(player) => {
              if (mode.value === 2) {
                setP1(player);
                setP2("AI");
                setStep(3);
              } else {
                setP1(player);
                setStep(2);
              }
            }}
          />
          <div className="flex justify-center">
            <button
              onClick={() => {
                if (mode.value === 2) {
                  console.log("mode", mode.value);
                  setStep(3);
                  setP2("AI");
                  storePlayer(p1);
                } else {
                  if (step <= 2) {
                    storePlayer(p1);
                  }
                  setStep(step + 1);
                }
              }}
              className="flex gap-2  rounded-lg bg-gray-900 p-2 px-5 text-xl font-bold text-white transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-900 disabled:bg-gray-100 disabled:text-gray-900"
              disabled={step === 3 || !p1}
            >
              Next
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <ChoosePlayer
            step={step}
            playerOne={p1}
            onChange={(e) => {
              console.log(e);
              setP2(e.target.value);
            }}
            selectPlayer={(player) => {
              setP2(player);
              setStep(3);
            }}
            // onChange={(e) => setP2(e.target.value)}
            // selectPlayer={(player) => setP2(player)}
          />
          <div className="flex justify-center">
            <button
              onClick={() => {
                console.log(p2);
                storePlayer(p2);

                setStep(step + 1);
              }}
              className="flex gap-2  rounded-lg bg-gray-900 p-2 px-5 text-xl font-bold text-white transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-900 disabled:bg-gray-100 disabled:text-gray-900"
              disabled={step === 3 || !p2}
            >
              Next
            </button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <div className="my-10">
            <div>
              <div className="pb-5 text-center text-5xl font-bold text-primary">
                P1 Select Dice
              </div>
              <div className="my-5 flex justify-center gap-4">
                <button
                  onClick={() => {
                    console.log("clicked");
                    dispatch(selectDice({ one: "O", two: "X" }));
                    dispatch(setTurn("O"));
                    dispatch(setPlayer({ one: p1, two: p2 }));
                  }}
                  className="flex gap-2  rounded-lg bg-gray-900 p-2 px-5 text-2xl font-bold text-white transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-900"
                >
                  O
                </button>
                <button
                  onClick={() => {
                    dispatch(selectDice({ one: "X", two: "O" }));
                    dispatch(setTurn("O"));
                    dispatch(setPlayer({ one: p1, two: p2 }));
                  }}
                  className="text-gary-900 flex  gap-2 rounded-lg bg-gray-300 p-2 px-5 text-2xl font-bold transition-all duration-300 ease-in-out hover:bg-gray-900 hover:text-gray-200"
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
