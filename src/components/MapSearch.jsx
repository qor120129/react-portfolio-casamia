import React, { useState } from 'react'
import { SearchIcon } from '../assets/svgIcon/SvgIcon'

const MapSearch = ({searchChange, className}) => {
  const [search, setSearch] = useState('까사미아')

  const changeValue = (e) => {
    const { value } = e.target
    setSearch(value)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    searchChange(search)
  }
  return (
    <div className={className} id='mapWrap'>
      <form onSubmit={onSubmit}>
        <div className='relative'>
          <label className="sr-only">
            검색
          </label>
          <input
            onChange={changeValue}
            type="text"
            value={search}
            id="searchKeyword"
            className="block w-full rounded-md py-1.5 pl-7 pr-20 border border-slate-950 text-main ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
          <button type="submit" className='absolute right-4 top-1/2 -translate-y-1/2'>
            <SearchIcon className={'h-5 w-5'} />
          </button>
        </div>
      </form>
      <ul id="mapList" className='mt-2'></ul>
      <div id="mapPagination"></div>
    </div>
  )
}

export default MapSearch