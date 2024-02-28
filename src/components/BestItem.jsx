import React, { useEffect, useState } from 'react'
import { WishActiveIcon, WishIcon } from 'assets/svgIcon/SvgIcon'
import { cloudStore } from 'firebaseApp'
import { collection, getDocs } from "firebase/firestore"
import LoaderImg from './LoaderImg'


const BestItem = ({ setOpen, isAuth }) => {
  const [wishClick, setWishClick] = useState(false)
  const [bestItemList, setBestItemList] = useState([])


  useEffect(() => {
    getNewItems()

  }, [])


  const clickWish = (id) => {
    console.log(id)
    if (!isAuth) {
      setOpen(true)
    }
  }


  //Best ITEM 데이터 가져오기
  const getNewItems = async () => {
    try {
      const getBestList = await getDocs(collection(cloudStore, "/bestItems"))

      const bestList = getBestList.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setBestItemList(bestList)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className='grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4'
    >
      {bestItemList.map((item) => (
        <div key={item.id} className='flex flex-col'>
          {/* <div className='w-full'>
          </div> */}
          <LoaderImg src={item.img} alt={item.brand + item.title + item.price + ' 원'} />
          <div className='flex flex-col justify-between py-4 px-2 min-h-[145px] relative'>
            <h4>{item.brand}</h4>
            <h3 className='font-medium mt-1 truncate'>{item.title}</h3>
            <div className='flex flex-col flex-1 justify-end realtive'>
              {item.SalePrice !== null
                ? <span className='text-sm line-through opacity-40'>{item.price}원</span>
                : <span>{item.price}원</span>
              }
              <div>
                {item.percent !== null
                  ? <span className='mr-2 text-primary font-medium'>{item.percent}%</span>
                  : null
                }
                {item.SalePrice !== null
                  ? <span>{item.SalePrice}원</span>
                  : null
                }
              </div>
              <div className='absolute right-2' >
                <button type='button'
                  onClick={() => clickWish(item.id)}
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

        </div>
      ))}
    </div>
  )
}

export default BestItem