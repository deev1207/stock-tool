import "./suggest.css";

export default function Suggest({ stocks, handleStock }) {
  const handleClick = (stock) => {
    handleStock(stock);
  };
  const stocks_arr = [];
  for (const item of stocks) {
    stocks_arr.push(
      <>
        <div className="test">
          <div className="stock">{item["name"]}</div>
          <button onClick={() => handleClick(item["name"])}>add</button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="stocks-container">{stocks_arr}</div>
    </>
  );
}
