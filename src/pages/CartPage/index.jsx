import React from 'react'
import { CartIcon, LoginUserIcon, NextIcon, PrevIcon } from 'assets/svgIcon/SvgIcon'

const CartPage = () => {
  return (
    <div className='p-8 h-[calc(100vh-520px)] min-h-[40vh]  flex flex-col items-center justify-center gap-2'>
      <CartIcon className={`w-10 h-10`} />
      <div>장바구니에 담긴 상품이 없습니다.</div>
    </div>
  )
}

export default CartPage