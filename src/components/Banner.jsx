import React, { useEffect, useRef, useState } from 'react'
import banner1 from '@/assets/img/banner1.jpg'
import banner2 from '@/assets/img/banner2.jpg'
import banner3 from '@/assets/img/banner3.jpg'
import banner4 from '@/assets/img/banner4.jpg'
import { NextIcon, PrevIcon } from '../assets/svgIcon/SvgIcon'


const bannerSlide = [
  { img: banner1, title: 'LIFESTYLE SCENE MAKER, CASAMIA', subTitle: '나다운 공간 아름다운 삶의 장면을 완성하는 감각적인 디자인' },
  { img: banner2, title: 'CAMPO', subTitle: '세상에서 가장 편안한 소파' },
  { img: banner3, title: 'NEW CASAMIA', subTitle: '이달의 까사미아 신제품' },
  { img: banner4, title: 'HOME DECO', subTitle: '까사미아가 제안하는 홈 데코 시리즈' },
]
const Banner = () => {
  const [activeImage, setActiveImage] = useState(0)
  const [startX, setStartX] = useState(0)
  const [dragMove, setDragMove] = useState(true)
  const timeOutRef = useRef(0)


  const resetTimeout = () => {
    setDragMove(false)
    // console.log('false;')
    clearTimeout(timeOutRef.current);
  }

  const startTimeout = () => {
    // console.log('true;')
    timeOutRef.current = setTimeout(() => {
      setDragMove(true)
      activeImage === bannerSlide.length - 1 ? setActiveImage(0) : setActiveImage(activeImage + 1)
    }, 5000);
  }

  useEffect(() => {
    dragMove ? startTimeout() : resetTimeout()
  }, [activeImage])


  const onDragEnd = (e) => {
    console.log('시작;', startX)
    console.log('끝;', e.pageX)
    if (startX > e.pageX) {
      activeImage === bannerSlide.length - 1 ? setActiveImage(0) : setActiveImage(activeImage + 1)
    } else if (startX < e.pageX) {
      activeImage === 0 ? setActiveImage(bannerSlide.length - 1) : setActiveImage(activeImage - 1)
    }
  }


  return (
    <section className='relative h-[740px] overflow-hidden'>
      {bannerSlide.map((item, index) => (
        <div
          // ref={timeOutRef}
          key={index}
          onMouseOver={resetTimeout}
          onMouseOut={startTimeout}
          onMouseDown={(e) => setStartX(e.pageX)}
          onMouseUp={onDragEnd}
          className={`${activeImage === index ? 'opacity-1 ' : 'opacity-0'} absolute transition ease-in-out duration-300 w-full h-full`}
        >
          <div className='absolute w-full h-full'>
            <img
              src={item.img} alt={item.title + item.subTitle} className='absolute top-1/2 left-1/2 -translate-y-[55%] -translate-x-1/2 max-w-fit drag ' />
          </div>
          <div className=' absolute top-[21%] left-1/2 -translate-x-1/2 text-center text-slate-50'>
            <div className='font-[Rokkitt] text-5xl w-[80vw] m-auto'>
              {item.title}
            </div>
            <div className='text-lg mt-4'>{item.subTitle}</div>
          </div>
          <div className="flex justify-between absolute top-1/2 right-0 left-0 -translate-y-1/2 z-50">
            <div onClick={() => { index === 0 ? setActiveImage(bannerSlide.length - 1) : setActiveImage(index - 1) }} className=' cursor-pointer text-slate-50/30 hover:text-slate-50/70'>
              <PrevIcon className="w-14 h-14" />
            </div>
            <div onClick={() => { index === bannerSlide.length - 1 ? setActiveImage(0) : setActiveImage(index + 1) }} className="cursor-pointer text-slate-50/30 hover:text-slate-50/70">
              <NextIcon className="w-14 h-14" />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Banner