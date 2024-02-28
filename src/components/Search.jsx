import React from 'react'
import { SearchIcon } from '../assets/svgIcon/SvgIcon'

const Search = ({ placeholder, className }) => {
  return (
    <>
      <div className='relative  max-sm:hidden'>
        <label className="sr-only">
          검색
        </label>
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md py-1.5 pl-7 sm:pr-20 border text-main ring-inset ring-gray-300 placeholder:text-gray-400"
          placeholder={placeholder} />
        <button className='absolute right-4 top-1/2 -translate-y-1/2'>
          <SearchIcon className={`w-5 h-5`} />
        </button>
      </div>
      <button className='sm:hidden'>
        <SearchIcon className={`w-5 h-5`} />
      </button>
    </>

  )
}

export default Search