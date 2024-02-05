import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import { WishActiveIcon, WishIcon } from 'assets/svgIcon/SvgIcon'
import { doc, setDoc, collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { cloudStore } from 'firebaseApp'
import Loader from './Loader'


const NewItem = ({ setOpen, isAuth }) => {
  const [wishClick, setWishClick] = useState(false)
  const [newItemList, setNewItemList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getNewItems()
  }, [])


  const clickWish = () => {
    if (!isAuth) {
      setOpen(true)
    }
  }

  //NEW ITEM 데이터 가져오기
  const getNewItems = async () => {
    try {
      const getNewList = await getDocs(collection(cloudStore, "/newItems"))

      const newList = getNewList.docs.map((doc) => {
        return doc.data()
      })
      setNewItemList(newList)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Swiper
      className='pb-10'
      // loop={true}
      scrollbar
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



      {newItemList.map((itme, index) => (
        <SwiperSlide key={index}>
          <div className='w-full h-full relative'>

            {isLoading && (
              <div className='bg-gray-50 w-full h-[297px]'>
                <Loader className={'w-20 z-50'} />
              </div>
            )}
            <img
              src={itme.img}
              alt={itme.brand + itme.title + itme.price + '원'}
              onLoad={() => setIsLoading(false)} />

          </div><div className='flex flex-col justify-between py-4 px-2 min-h-[145px]'>
            <h4>{itme.brand}</h4>
            <h3 className='font-medium mt-1 truncate'>{itme.title}</h3>
            <div className='flex flex-col flex-1 justify-end realtive'>
              {itme.salePrice !== null
                ? <span className='text-sm line-through opacity-40'>{itme.price}원</span>
                : <span className=''>{itme.price}원</span>}
              <div>
                {itme.percent !== null
                  ? <span className='mr-2 text-primary font-medium'>{itme.percent}%</span>
                  : ''}
                {itme.salePrice !== null
                  ? <span>{itme.salePrice}원</span>
                  : ''}
              </div>
              <div className='absolute right-2'>
                <button type='button'
                  onClick={clickWish}
                >
                  {wishClick
                    ?
                    <WishActiveIcon className="w-5 h-5" />
                    : <WishIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}



    </Swiper >
  )
}

export default NewItem