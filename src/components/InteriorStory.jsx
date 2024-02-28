import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import { collection, getDocs, doc, onSnapshot, updateDoc, increment } from 'firebase/firestore'
import { cloudStore } from 'firebaseApp'
import Loader from './Loader'
import LoaderImg from './LoaderImg'

const InteriorStory = () => {
  const [storyList, setStoryList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getStoryList()
  }, [])

  // Story List 실시간 데이터 가져오기 
  const getStoryList = () => {
    onSnapshot(collection(cloudStore, "/storyList"), (snapshot) => {
      const newStoryList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      console.log(newStoryList)
      setStoryList(newStoryList)
    })
  }

  // 클릭시 look 수 증가 
  const updateStoryLook = (id) => {
    const updateLook = updateDoc(doc(cloudStore, `/storyList/${id}`), {
      look: increment(1)
    })
    console.log("Document written with ID: ", updateLook);
  }

  return (
    <section className='max-w-[80rem] m-auto px-4 py-12 box-content'>
      <h2 className='uppercase font-semibold text-[24px] pb-8 text-center'>
        interior Story
      </h2>
      <Swiper
        loop={true}
        modules={[Scrollbar]}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          500: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
        }}
      >
        {storyList.map((item) => (
          <SwiperSlide
            key={item.id}
            onClick={() => updateStoryLook(item.id)}
            className='border cursor-pointer'
          >
            <LoaderImg src={item.img} alt={item.title + item.subTitle + item.content} />

            <div className='px-4 py-6 flex flex-col flex-1'>
              <h3 className='text-lg font-bold truncate '>{item.title}</h3>
              <h4 className='text-sm py-3 truncate'>{item.subTitle}</h4>
              <p className='text-sm text-sub line-clamp-3'>{item.content}</p>
              <div className='flex py-4 gap-2 text-sub *:border *:text-[10px] *:px-2 *:rounded-lg'>
                {item.tags.map(item =>
                  <span key={item}>#{item}</span>
                )}
              </div>
              <div className="text-sm text-sub flex justify-between *:text-[12px]">
                <span className='text-sm'>Editor - {item.editor} </span>
                <span>Look - {item.look}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper >
    </section>
  )
}

export default InteriorStory