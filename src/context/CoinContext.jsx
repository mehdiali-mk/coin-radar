import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

function CoinContextProvider(props) {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  async function fetchAllCoin() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-Cd71JU8aeXEHpR5ubbuQDBPM",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoin(res))
      .catch((err) => console.error(err));
  }

  useEffect(
    function () {
      fetchAllCoin();
    },
    [, currency]
  );

  const contextValue = { allCoin, currency, setCurrency };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
}

export default CoinContextProvider;
