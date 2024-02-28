import React, { useState } from 'react'
import Loader from './Loader'

const LoaderImg = ({src, alt}) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && (
        <div className='bg-gray-50 w-full min-h-[250px] relative'>
          <Loader className={'w-20 z-50'} />
        </div>
      )}
      <img
        onLoad={() => setIsLoading(false)}
        className='h-auto'
        src={src}
        alt={alt}
      />
    </>
  )
}

export default LoaderImg