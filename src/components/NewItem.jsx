import React from 'react'
import 'swiper/css'
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules';
import newItem1 from 'assets/img/new1.jpg'
import newItem2 from 'assets/img/new2.jpg'
import newItem3 from 'assets/img/new3.jpg'
import newItem4 from 'assets/img/new4.jpg'
import newItem5 from 'assets/img/new5.jpg'
import newItem6 from 'assets/img/new6.jpg'
import newItem7 from 'assets/img/new7.jpg'
import newItem8 from 'assets/img/new8.jpg'

const newItems = [
  { img: newItem1, brand: 'casamia', title: '캄포 슬림 4인 카우치소파 BL', price: '3,580,000', SalePrice: '', percent: '' },
  { img: newItem2, brand: 'casamia', title: '우스터 1인 리클라이너 BR', price: '940,000', SalePrice: '', percent: '' },
  { img: newItem3, brand: 'onion', title: '라빈 1인 소파', price: '350,000', SalePrice: '297,500', percent: '15' },
  { img: newItem4, brand: 'casamia', title: '진저 유리 선반 수납장 세트 BR', price: '398,000', SalePrice: '338,300', percent: '15' },
  { img: newItem5, brand: 'casamia', title: '라임POP 수납형 침대 GSS 매트제외 (컬러 택1)', price: '545,000', SalePrice: '436,000', percent: '20' },
  { img: newItem6, brand: 'casamia', title: '네토 오토만(소) 딥그린', price: '190,000', SalePrice: '', percent: '' },
  { img: newItem7, brand: 'casamia', title: '심플리 고밀도 워싱 누비 이불커버', price: '188,000', SalePrice: '', percent: '' },
  { img: newItem8, brand: 'casamia', title: '우드플리츠 테이블 램프', price: '99,000', SalePrice: '59,400', percent: '40' },
]

const NewItem = () => {
  return (
    <section className='max-w-[80rem] m-auto px-4 py-12'>
      <h2 className='uppercase font-semibold text-lg py-4'>new item <span>이달의 신제품</span></h2>
      <Swiper
        className='pb-10'
        loop={true}
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{

          500: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
      >
        {newItems.map((itme, index) => (
          <SwiperSlide key={index}>
            <div className='w-full h-full'>
              <img
                className='rounded-3xl '
                src={itme.img} alt={itme.brand + itme.title + itme.price + ' 원'}
              />
            </div>
            <div className='flex flex-col justify-between py-4 px-2 min-h-[150px]'>
              <h4>{itme.brand}</h4>
              <h3 className='font-medium mt-1 truncate'>{itme.title}</h3>
              <div className='flex flex-col flex-1 justify-end realtive'>
                {itme.SalePrice !== ''
                  ? <span className='text-sm line-through opacity-40'>{itme.price}원</span>
                  : <span className=''>{itme.price}원</span>
                }
                <div>
                  {itme.percent !== ''
                    ? <span className='mr-2 text-primary font-medium'>{itme.percent}%</span>
                    : ''
                  }
                  {itme.SalePrice !== ''
                    ? <span>{itme.SalePrice}원</span>
                    : ''
                  }
                </div>
                <button className='absolute right-2'>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#B29A6C" className="w-5 h-5">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg> */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
              </div>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div class="bannerPrev prev"></div>
      <div class="bannerNext next"></div>
      <div class="swiper-scrollbar"></div> */}
    </section >
  )
}

export default NewItem