import React from 'react'
import lineBannerImg from 'assets/img/lineBanner.jpg'
const LineBanner = () => {
  return (
    <div className='max-w-[80rem] m-auto my-14 h-64 overflow-hidden relative before:absolute before:inset-0 before:bg-black before:opacity-50 before:block before:z-10'>
      <img src={lineBannerImg} alt={lineBannerImg} width={'100%'} className='-translate-y-20' />
      <div className='absolute top-0 left-0 z-10 text-white p-12 py-20'>
        <div className='sm:text-3xl text-2xl whitespace-nowrap font-medium mb-4'>
          드라마에서 만나는 까사미아
        </div>
        <div className='sm:text-lg text-base'>
          드라마 속 주요 공간에 노출된 까사미아 제품들을 만나보세요!
        </div>
      </div>
    </div>
  )
}

export default LineBanner