import React from 'react'
const LineBanner = ({ lineBannerImg, title, subTitle, className }) => {
  return (
    <section
      className={`max-w-[80rem] my-12 m-auto ${className} overflow-hidden relative before:absolute before:inset-0 before:bg-black before:opacity-50 before:block before:z-10`}
    >
      {/* <img
        src={lineBannerImg}
        alt={lineBannerImg}
        width={'100%'}
        className='-translate-y-1/2 relative top-1/2'
      /> */}
      <div style={{ backgroundImage: `url('${lineBannerImg}')` }} className='bg-cover bg-center h-full '>
        <div className='absolute top-1/2 -translate-y-1/2 left-1/2 max-sm:-translate-x-1/2 sm:left-16 z-10 text-white p-8 sm:p-12 w-full'>
          <div className='sm:text-3xl text-xl  font-medium mb-4 break-words'>
            {title}
          </div>
          <div className='sm:text-lg text-sm'>
            {subTitle}
          </div>
        </div>

      </div>
    </section>
  )
}

export default LineBanner