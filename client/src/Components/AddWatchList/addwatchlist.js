import { useState } from "react";
import "./addwatchlist.css";

export default function AddWatchList({
  switchWatchList,
  len,
  deleteWatchList,
  addwatchlist,
}) {
  const [count, setCount] = useState(len);
  let init = [];
  for (let i = 1; i <= len; i++) {
    init.push(
      <button key={i} className="child-items" onClick={() => handleButton(i)}>
        {i}
      </button>
    );
  }
  const [arr, setArr] = useState(init);

  function handleButton(i) {
    switchWatchList(i);
  }

  function handleClickAdd() {
    setCount(count + 1);
    setArr((prvs) => {
      return [
        ...prvs,
        <button
          key={count + 1}
          className="child-items"
          onClick={() => handleButton(count + 1)}
        >
          {count + 1}
        </button>,
      ];
    });
    addwatchlist(count + 1);
  }

  function handleClickMinus() {
    setArr((prvs) => {
      return prvs.slice(0, -1);
    });

    setCount(count - 1);
    deleteWatchList(count);
  }
  return (
    <>
      <div className="container">
        {arr}
        <button className="child-items" onClick={handleClickAdd}>
          +
        </button>
        <button className="child-items" onClick={handleClickMinus}>
          -
        </button>
      </div>
    </>
  );
}
