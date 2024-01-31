import React from 'react'

const Search = ({placeholder}) => {
  return (
    <div className='relative'>
      <label className="sr-only">
        검색
      </label>
      <input
        type="text"
        name="price"
        id="price"
        className="block w-full rounded-md py-1.5 pl-7 pr-20 border text-main ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        placeholder={placeholder}
      />
      <button className='absolute right-4 top-1/2 -translate-y-1/2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
    </div>
  )
}

export default Search