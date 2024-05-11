import { CpuChipIcon, UsersIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectMode } from "../lib/slice/ModeSlice";
import { useEffect, useState } from "react";
import { sortBy } from "lodash";

export default function Mode() {
  const dispatch = useDispatch();
  const [scores, setScores] = useState([]);
  const game = useSelector((state) => state.game.data);
  const [worldScore, setWorldScore] = useState([]);

  useEffect(() => {
    let all = [];
    console.log(game);
    game.map(({ player }) => {
      console.log(player);
      all = [...all, ...player];
    });
    console.log("all", all);

    // sortBy(all, [
    //   function (o) {
    //     return o.all;
    //   },
    // ]);
    // sortBy(all, ["s"]);

    all
      .sort((a, b) => {
        return a.s - b.s;
      })
      .reverse();

    setWorldScore(all.slice(0, 5));
  }, [game]);

  useEffect(() => {
    // localStorage.setItem("scores", JSON.stringify([{ p: "hem" }]));
    let score = JSON.parse(localStorage.getItem("scores"));
    if (score?.length) {
      setScores(score);
    }
  }, []);
  console.log("game", worldScore);

  return (
    <>
      <div className="my-10">
        <div>
          <div className="pb-5 text-center text-5xl font-bold text-primary">
            Game Mode
          </div>
          <div className="my-5 flex justify-center gap-4">
            <button
              onClick={() => {
                dispatch(selectMode(1));
              }}
              className="text-gary-900 text-md  flex  gap-1 rounded-lg bg-gray-300 p-2 px-5 font-bold transition-all duration-300 ease-in-out hover:bg-gray-900 hover:text-gray-200"
            >
              <UsersIcon className="size-6 " />
              Multi Player
            </button>
            <button
              onClick={() => {
                dispatch(selectMode(2));
              }}
              className="text-md flex   gap-1 rounded-lg bg-gray-900 p-2 px-5 font-bold text-white transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-900"
            >
              <CpuChipIcon className="size-6 " />
              Play with Bot
            </button>
          </div>
        </div>
        <div className="rounded-lg p-3  py-5">
          <div className=" pb-6 text-center text-3xl font-bold text-primary">
            Players Scores
          </div>

          <div className="">
            {scores != null
              ? scores.length
                ? scores.map((player) => {
                    return (
                      <>
                        <div className="mb-2 flex justify-between border-b pb-2 text-lg font-bold text-primary">
                          <span>{player.p}</span>
                          <span className="text-gray-600">
                            {player.s} Point
                          </span>
                        </div>
                      </>
                    );
                  })
                : ""
              : ""}
          </div>
        </div>
        <div className="rounded-lg p-3  py-5">
          <div className=" pb-6 text-center text-3xl font-bold text-primary">
            Top Scores
          </div>

          <div className="">
            {worldScore.map((player) => {
              return (
                <>
                  <div className="mb-2 flex justify-between border-b pb-2 text-lg font-bold text-primary">
                    <span>{player.p}</span>
                    <span className="text-gray-600">{player.s} Point</span>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
