import React from 'react'
const LineBanner = ({ lineBannerImg, title, subTitle, className }) => {
  return (
    <div className={`max-w-[80rem] my-12 m-auto ${className} overflow-hidden relative before:absolute before:inset-0 before:bg-black before:opacity-50 before:block before:z-10 `}>
      <img src={lineBannerImg} alt={lineBannerImg} width={'100%'} className='-translate-y-1/2 relative top-1/2' />
      <div className='absolute top-1/2 -translate-y-1/2 left-16 z-10 text-white '>
        <div className='sm:text-3xl text-2xl whitespace-nowrap font-medium mb-4'>
          {title}
        </div>
        <div className='sm:text-lg text-base'>
          {subTitle}
        </div>
      </div>
    </div>
  )
}

export default LineBanner