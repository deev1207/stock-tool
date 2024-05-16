import { useEffect, useState } from "react";
import "./watchlist.css";

export default function WatchList({ data, index }) {
  const [watchList, setWatchList] = useState();
  useEffect(() => {
    if (data) {
      const arr = data.map((stock) => {
        return (
          <div key={`${stock} ${index} container`} className="watch-stock">
            <div key={`${stock} ${index}`}>{stock}</div>
          </div>
        );
      });
      setWatchList(arr);
    }
  }, [data, index]);

  return (
    <>
      <div className="watchlist">{watchList}</div>
    </>
  );
}
