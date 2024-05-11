import { useDispatch } from "react-redux";
import { selectDice } from "../lib/slice/DiceSlice";
import { pauseMode } from "../lib/slice/PauseSlice";
import { selectMode } from "../lib/slice/ModeSlice";
import { setClear } from "../lib/slice/MoveSlice";
import { setTurn } from "../lib/slice/TurnSlice";

export default function Pause() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="my-10 ">
        <div>
          <div className="pb-5 text-center text-5xl font-bold text-primary">
            Want To Exit?
          </div>
          <div className="my-5 flex justify-center gap-4">
            <button
              onClick={() => {
                dispatch(selectDice({ one: "", two: "" }));
                dispatch(selectMode(null));
                dispatch(pauseMode(false));
                dispatch(setClear());
                dispatch(setTurn(null));
              }}
              className="text-gary-900 flex  gap-2 rounded-lg bg-gray-300 p-2 px-5 text-2xl font-bold transition-all duration-300 ease-in-out hover:bg-gray-900 hover:text-gray-200"
            >
              Yes
            </button>
            <button
              onClick={() => {
                console.log("clicked");
                dispatch(pauseMode(false));
              }}
              className="flex gap-2  rounded-lg bg-gray-900 p-2 px-5 text-2xl font-bold text-white transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-900"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
