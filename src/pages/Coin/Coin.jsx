import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext.jsx";
import LineChart from "../../components/LineChart/LineChart.jsx";

function Coin() {
  const { coinId } = useParams();

  const [coinData, setCoinData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const { currency } = useContext(CoinContext);

  async function fetchCoinData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-Cd71JU8aeXEHpR5ubbuQDBPM",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  }

  async function fetchHistoricalData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-Cd71JU8aeXEHpR5ubbuQDBPM",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=12&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  }

  useEffect(
    function () {
      fetchCoinData();
      fetchHistoricalData();
    },
    [currency]
  );

  if (coinData.length !== 0 && historicalData.length !== 0) {
    console.log(coinData);
    return (
      <div className="coin">
        <div className="coin-name">
          <img
            src={coinData.image.large}
            alt={coinData.name + " coin name."}
            className="coin-image"
          />
          <p className="coin-name-text">
            <strong>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </strong>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>

        <div className="coin-info">
          <ul className="coin-info-list">
            <li className="coin-info-item">Crypto Market Rank</li>
            <li className="coin-info-item">{coinData.market_cap_rank}</li>
          </ul>
          <ul className="coin-info-list">
            <li className="coin-info-item">Current Price</li>
            <li className="coin-info-item">
              {currency.symbol}{" "}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul className="coin-info-list">
            <li className="coin-info-item">Market Cap</li>
            <li className="coin-info-item">
              {currency.symbol}{" "}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul className="coin-info-list">
            <li className="coin-info-item">24 Hour High</li>
            <li className="coin-info-item">
              {currency.symbol}{" "}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul className="coin-info-list">
            <li className="coin-info-item">24 Hour Low</li>
            <li className="coin-info-item">
              {currency.symbol}{" "}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
}

export default Coin;
