import React, { useState } from 'react'
import magnify from "../assets/icons/navbar/magnify.svg"
import { useAccount, useReadContracts, useWriteContract } from "wagmi";
import {
    DecentTweetAbi as abi,
    DecentTweetContractAddress as address,
  } from "../contract/DecentTweetABI";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (e: any) => {
        e.preventDefault();
        console.log("Search Term", searchTerm)
    }

    const DTAAA = {
        address: address as `0x${string}`,  
        abi,
      };
      const { address: currentUserAddress } = useAccount();
      const { data: contractData } = useReadContracts({
        contracts: [
          {
            ...DTAAA,
            functionName: "getPublicUserDetails",
            args: ["0x719E60774D28E45f73F313d443178AE1Eabf2E50"],
          },
        ],
      });
      console.log(contractData)
  return (
    <div>

        <form className='flex my-4 border-2 border-neutral-700 rounded-xl' onSubmit={(e) => handleSearch(e)}>
            <button type='submit'>
                <img src={magnify} className='h-6 w-6 m-2'/>
            </button>
            <input type='text' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search' className='w-full bg-neutral-900 focus:outline-none rounded-r-xl pl-2'/>
        </form>
    </div>
  )
}

export default Search