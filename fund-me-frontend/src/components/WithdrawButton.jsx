import React from "react";
import { ethers } from "ethers";
import { fundMe_abi, fundMe_add } from "../constants";

export default function WithdrawButton() {
  const withdraw = async () => {
    console.log("Withdrawing .... ")
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const fundMe = new ethers.Contract(fundMe_add, fundMe_abi, signer);
    try {
      const response = await fundMe.withdraw()
      await response.wait(1)
    } catch (error) {
      console.log(error)
    }
  };
  return <button className="bg-green-700 text-white rounded-lg px-4 py-1 mt-2 text-2xl font-semibold" onClick={withdraw}>Withdraw</button>;
}
