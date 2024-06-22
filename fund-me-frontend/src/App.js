import "./App.css";
import FundButton from "./components/FundButton";
import {  useState } from "react";
import WithdrawButton from "./components/WithdrawButton";
import ContractBal from "./components/ContractBal";
function App() {
  // const [metaMaskPresent, setMetaMaskPresent] = useState(false);
  const [metaMaskConnected, setMetaMaskConnected] = useState(false);
  const [ethAmount, setEthAmount] = useState("");

  // useEffect(() => {
  //   if (typeof window.ethereum !== "undefined") {
  //     console.log("MetaMask found");
  //     setMetaMaskPresent(true);
  //   } else {
  //     console.log("No MetaMask");
  //     setMetaMaskPresent(false);
  //   }
  // }, []);

  const connect = () => {
    window.ethereum.request({ method: "eth_requestAccounts" });
    setMetaMaskConnected(true);
  };

  return (
    <div className="App h-screen bg-[#7091e6] flex flex-col justify-center ">
      <div className="align-middle">
        <div>
          <h1 className="text-5xl text-white font-bold -translate-y-5">Fund Me</h1>
        </div>
        <div className="-translate-y-5 text-blue-900 font-semibold">
          <button onClick={connect}>
            {metaMaskConnected ? <>MetaMask is Connected</> : <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-lg">Connect MetaMask</button>}
          </button>
        </div>
        <form>
        <div className="-translate-x-8">
        <label className="text-white font-semibold" for="amount">Enter ETH amount</label>
        </div>
        <div>
        <input className="p-1 px-2 bg-transparent border border-white rounded-md text-white font-semibold"
          onChange={(e) => {
            setEthAmount(e.target.value);
          }}
        ></input>
        </div>
        </form>
        <div className="flex flex-row justify-center">
          <div className="m-2">
            <FundButton ethAmount={ethAmount} />
          </div>
          <div className="m-2">
            <WithdrawButton />
          </div>
        </div>
        <div>
          <ContractBal />
        </div>
      </div>
    </div>
  );
}

export default App;
