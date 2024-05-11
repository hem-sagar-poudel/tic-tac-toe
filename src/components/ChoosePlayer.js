import { useDispatch } from "react-redux";
import { selectDice } from "../lib/slice/DiceSlice";
import { setTurn } from "../lib/slice/TurnSlice";
import { useEffect, useState } from "react";

export default function ChoosePlayer({ step, ...props }) {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    let scores = localStorage.getItem("scores");
    // if (JSON.parse(scores)?.length) {
    setScores(JSON.parse(scores));
    // }
  }, []);
  console.log("scores", props.playerOne);
  return (
    <>
      <div className="my-10">
        <div>
          <div className="pb-5 text-center text-5xl font-bold text-primary">
            Player {step}
          </div>
          <div className="mb-3 text-center">
            {/* <label htmlFor="player" className="mb-2 !text-start">
                Player {step}
              </label> */}
            <input
              id="player"
              type="text"
              name="player"
              onChange={(e) => {
                console.log(e);
                props.onChange(e);
              }}
              placeholder={`Player ${step}`}
              className="border-2 border-gray-900 px-3 py-2 text-2xl"
            />
          </div>
          <div className="">
            {scores?.length &&
              scores.map((player) => {
                if (props.playerOne !== player.p) {
                  return (
                    <>
                      <>
                        <button
                          onClick={() => {
                            props.selectPlayer(player.p);
                          }}
                          className=" mb-3  w-full gap-2 rounded-lg bg-gray-900 p-2 px-5 text-center text-xl font-bold text-white transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-900"
                        >
                          {player.p}
                        </button>
                      </>
                    </>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
}
