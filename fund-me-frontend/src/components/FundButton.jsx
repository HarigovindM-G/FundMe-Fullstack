import React from "react";
import { TransactionReceipt, ethers } from "ethers";
import { fundMe_abi, fundMe_add } from "../constants";

export default function FundButton({ ethAmount }) {
  const fund = async () => {
    // const sendValue = "1000000000000000000"
    console.log(`Funding ${ethAmount} ETH`);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const fundMe = new ethers.Contract(fundMe_add, fundMe_abi, signer);
    try {
      const response = await fundMe.fund({
         value: ethers.parseEther(ethAmount),
      });
      await response.wait(1);
      console.log("Transaction is Done !")
    } catch (error) {
      console.log(error);
    }
  };
  return <button className="bg-orange-700 text-white rounded-lg px-4 py-1 mt-2 text-2xl font-semibold" onClick={fund}>Fund</button>;
}

