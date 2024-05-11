import { useSelector } from "react-redux";

export default function Box(props) {
  const winner = useSelector((state) => state.winner.value);

  return (
    <>
      <button
        onClick={() => {
          if (!winner) {
            props.onClick();
          }
        }}
        className=" -ml-1.5 -mt-1.5  h-20 w-20 border-8 border-primary text-5xl font-bold"
        disabled={winner || props.value}
      >
        {props.value}
      </button>
    </>
  );
}
