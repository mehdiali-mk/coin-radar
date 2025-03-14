import React from "react";
import "./Home.css";

function Home() {
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

        <form className="crypto-search-form">
          <input
            type="text"
            name="cryptoSearch"
            id="cryptoSearch"
            className="crypto-search-input"
            placeholder="Search for cryptos...."
          />
          <button type="submit" className="crypto-search-button">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
