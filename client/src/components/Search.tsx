import React, { useState } from 'react'
import magnify from "../assets/icons/navbar/magnify.svg"

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (e: any) => {
        e.preventDefault();
        console.log("Search Term", searchTerm)
    }
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