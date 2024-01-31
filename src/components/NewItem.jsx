import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import newItem1 from 'assets/img/new1.jpg'
import newItem2 from 'assets/img/new2.jpg'
import newItem3 from 'assets/img/new3.jpg'
import newItem4 from 'assets/img/new4.jpg'
import newItem5 from 'assets/img/new5.jpg'
import newItem6 from 'assets/img/new6.jpg'
import newItem7 from 'assets/img/new7.jpg'
import newItem8 from 'assets/img/new8.jpg'
import { WishActiveIcon, WishIcon } from 'assets/svgIcon/SvgIcon'

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

const NewItem = ({ setOpen, isAuth }) => {
  const [wishClick, setWishClick] = useState(false)

  const clickWish = () => {
    if (!isAuth) {
      setOpen(true)
    }

  }

  return (
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
          <div className='flex flex-col justify-between py-4 px-2 min-h-[145px]'>
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
              <div className='absolute right-2' >
                <button type='button'
                  onClick={clickWish}
                >
                  {wishClick
                    ?
                    <WishActiveIcon className="w-5 h-5" />
                    : <WishIcon className="w-5 h-5" />
                  }
                </button>
              </div>
            </div>
          </div>

        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default NewItem