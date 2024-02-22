import React from 'react'
import { Link } from 'react-router-dom'

const backgroundImage = [
  { img: 'src/assets/img/brand1.jpg', name: 'casamia' },
  { img: 'src/assets/img/brand2.jpg', name: 'campo' },
  { img: 'src/assets/img/brand3.jpg', name: 'urquiola' },
  { img: 'src/assets/img/brand4.jpg', name: 'onion' },
  { img: 'src/assets/img/brand5.jpg', name: 'lamaison' },
  { img: 'src/assets/img/brand6.jpg', name: 'mk' },
]
const Brand = () => {
  return (
    <section className='max-w-[80rem] m-auto px-4 py-12 box-content'>
      <h2 className='uppercase font-semibold text-[24px] pb-8 text-center'>Brand</h2>
      <div className='grid grid-cols-4 gap-4 '>
        {backgroundImage.map(item => (
          <Link to="#" className='col-span-1 [&:nth-child(3n+1)]:col-span-2 h-56 overflow-hidden rounded-lg relative'
          // style={{ backgroundImage: `url('${item.img}')` }}
          >
            <div
              style={{ backgroundImage: `url('${item.img}')` }}
              className='h-full z-0 bg-cover bg-no-repeat before:inset-0 before:bg-black before:opacity-0 hover:before:opacity-10 hover:scale-105 before:absolute before:z-[1] before:rounded-lg '
            />
            <span className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[Rokkitt] text-3xl'>{item.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Brand