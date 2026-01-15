import React, { useState, useEffect } from "react";
import "./App.scss";
import HeaderNav from "./components/HeaderNav";
import ImageDesc from "./components/ImageDesc";
import Featured from "./components/Featured";
import Steps from "./components/Steps";
import Price from "./components/Price";
import KickStart from "./components/KickStart";
import Footer from "./components/Footer";

function App() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);

      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        });
    }
  }, []);

  async function connectWallet() {
    setLoading(true);

    try {
      if (! window.ethereum) {
        alert("Please install MetaMask!");
        setLoading(false);
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
      setLoading(false);
    } catch (error) {
      console.error("Connection error:", error);
      alert("Failed to connect wallet");
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <HeaderNav
        account={account}
        isWalletInstalled={isWalletInstalled}
        connectWallet={connectWallet}
        loading={loading}
      />
      <ImageDesc
        account={account}
        isWalletInstalled={isWalletInstalled}
        connectWallet={connectWallet}
      />
      <Steps />
      <Featured account={account} />
      <Price />
      <KickStart
        account={account}
        isWalletInstalled={isWalletInstalled}
        connectWallet={connectWallet}
      />
      <Footer />
    </div>
  );
}

export default App;