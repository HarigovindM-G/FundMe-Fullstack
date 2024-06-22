import { fundMe_abi, fundMe_add } from "../constants";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FaEthereum } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";

export default function ContractBal() {
  const [balance, setBalance] = useState("");

  const getBal = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const fundMe = new ethers.Contract(fundMe_add, fundMe_abi, signer);
    const bal = await provider.getBalance(fundMe.target);
    const formattedBalance = ethers.formatEther(bal);
    setBalance(formattedBalance);
    // setBalance(bal);
  };
  useEffect(() => {
    getBal();
  });
  const refresh = () => {
    getBal();
  };

  return (
    <div>
      <div className="text-3xl text-white font-semibold flex flex-row justify-center">
        Contract balance :{balance}
        <FaEthereum size={32}/>  
      </div>
      <button
        className="bg-[#ede8f5] text-2xl py-1 px-6 rounded-md mt-2 font-semibold"
        onClick={refresh}
      >
      <div className="flex flex-row">
        <div className="">Refresh</div>
        <IoIosRefresh size={20} color="" className="translate-y-1.5 translate-x-1 "/>
      </div>
      </button>
    </div>
  );
}
