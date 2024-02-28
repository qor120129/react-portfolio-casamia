import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import { WishActiveIcon, WishIcon } from 'assets/svgIcon/SvgIcon'
import { collection, getDocs } from "firebase/firestore"
import { cloudStore } from 'firebaseApp'
import Loader from './Loader'
import LoaderImg from './LoaderImg'


const NewItem = ({ setOpen, isAuth }) => {
  const [wishClick, setWishClick] = useState(false)
  const [newItemList, setNewItemList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getNewItems()
  }, [])


  const clickWish = (id) => {
    console.log('isAuth', isAuth)
    console.log('setOpen', setOpen)
    if (!isAuth) {
      setOpen(true)
    } else {
      console.log(id)
    }
  }

  //NEW ITEM 데이터 가져오기
  const getNewItems = async () => {
    try {
      const getNewList = await getDocs(collection(cloudStore, "/newItems"))

      const newList = getNewList.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
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
        350: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
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



      {newItemList.map((item) => (
        <SwiperSlide key={item.id}>
          <div className='w-full h-full relative'>
            <LoaderImg src={item.img} alt={item.brand + item.title + item.price + '원'} />
          </div>
          <div className='flex flex-col justify-between py-4 px-2 min-h-[145px]'>
            <h4>{item.brand}</h4>
            <h3 className='font-medium mt-1 truncate'>{item.title}</h3>
            <div className='flex flex-col flex-1 justify-end realtive'>
              {item.salePrice !== null
                ? <span className='text-sm line-through opacity-40'>{item.price}원</span>
                : <span className=''>{item.price}원</span>}
              <div>
                {item.percent !== null
                  ? <span className='mr-2 text-primary font-medium'>{item.percent}%</span>
                  : ''}
                {item.salePrice !== null
                  ? <span>{item.salePrice}원</span>
                  : ''}
              </div>
              <div className='absolute right-2'>
                <button type='button'
                  onClick={() => clickWish(item.id)}
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