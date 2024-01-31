import React, { useState } from 'react'
import 'swiper/css'
import 'swiper/css/scrollbar';
import Dialogs from './Dialogs';
import NewItem from './NewItem';



const NewList = ({ isAuth }) => {
  console.log('isAuth', isAuth)
  const [open, setOpen] = useState(false)

  console.log('open, ', open)

  return (
    <section className='max-w-[80rem] m-auto px-4 py-12'>
      <h2 className='uppercase font-semibold text-lg py-4'>new item <span>이달의 신제품</span></h2>
      <NewItem setOpen={setOpen} isAuth={isAuth} />
      {open && !isAuth &&
        < Dialogs title={`로그인이 필요합니다. \n  로그인 하시겠습니까?`} succes={'로그인하기'} setOpen={setOpen} to={"/Login"} />
      }
    </section >
  )
}

export default NewList