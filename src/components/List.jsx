import React, { useState } from 'react'
import 'swiper/css'
import 'swiper/css/scrollbar';
import Dialogs from './Dialogs';
import NewItem from './NewItem';
import BestItem from './BestItem';



const List = ({ isAuth, category }) => {
  const [open, setOpen] = useState(false)


  return (
    <section className='max-w-[80rem] m-auto px-4 py-12'>

      {category === 'new' &&
        <>
          <h2 className='uppercase font-semibold text-[20px] py-4'>new item <span>이달의 신제품</span></h2>
          <NewItem setOpen={setOpen} isAuth={isAuth} />
        </>
      }
      {category === 'best' &&
        <>
          <h2 className='uppercase font-semibold text-[20px] py-4'>best item <span>베스트</span></h2>
          <BestItem setOpen={setOpen} isAuth={isAuth} />
        </>}

      {open && !isAuth &&
        < Dialogs title={`로그인이 필요합니다. \n  로그인 하시겠습니까?`} succes={'로그인하기'} setOpen={setOpen} to={"/Login"} />
      }
    </section >
  )
}

export default List