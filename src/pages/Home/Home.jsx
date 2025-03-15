import React, { useContext, useEffect, useRef, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

function Home() {
  const cryptoSearchEl = useRef(null);

  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  function handleInputSearch(event) {
    setInputSearch(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  }

  function searchHandler(event) {
    event.preventDefault();
    const searchedCoin = allCoin.filter((coin) =>
      coin.name.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setDisplayCoin(searchedCoin);
    setInputSearch("");
    cryptoSearchEl.current.focus();
  }

  useEffect(
    function () {
      setDisplayCoin(allCoin);
    },
    [allCoin]
  );

  useEffect(function () {
    cryptoSearchEl.current.focus();
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-heading">
          <span className="heading-highlight">Largest</span> <br /> Crypto
          Marketplace
        </h1>
        <p className="hero-description">
          Welcome to the world's largest crypto coin marketplace. Sign up to
          explore more about cryptos.
        </p>

        <form
          className="crypto-search-form"
          onSubmit={(event) => {
            searchHandler(event);
          }}
        >
          <input
            type="text"
            name="cryptoSearch"
            id="cryptoSearch"
            className="crypto-search-input"
            placeholder="Search for cryptos...."
            ref={cryptoSearchEl}
            onChange={handleInputSearch}
            list="coinDataList"
          />

          <datalist id="coinDataList">
            {allCoin.map((coin, index) => (
              <option key={index} value={coin.name} />
            ))}
          </datalist>

          <button type="submit" className="crypto-search-button">
            Search
          </button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="crypto-table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="table-change">24H Change</p>
          <p className="table-market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link
            to={`/coin/${item.id}`}
            className="crypto-table-layout"
            key={index}
          >
            <p>{item.market_cap_rank}</p>
            <div className="table-coin-info">
              <img
                src={item.image}
                alt={item.name + " coin image."}
                className="table-coin-image"
              />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={
                "table-change " +
                (item.price_change_percentage_24h > 0
                  ? " green-color"
                  : " red-color")
              }
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100} %
            </p>
            <p className="table-market-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
