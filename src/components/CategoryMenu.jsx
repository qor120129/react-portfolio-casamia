import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const category = [
  { name: '거실가구', to: '/Living' },
  { name: '침실가구', to: 'javascript:void(0)' },
  { name: '주방가구', to: 'javascript:void(0)' },
  { name: '키즈/학생가구', to: 'javascript:void(0)' },
  { name: '홈인테리어', to: 'javascript:void(0)' },
  { name: '기획전', to: 'javascript:void(0)' },
  { name: '매장찾기', to: '/Store' },
]


const CategoryMenu = ({ setSlideOpen, slideOpen, setIsActiveName }) => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-white z-[998]">
      <div className="mt-[53px] p-4 flex flex-col flex-1 h-[calc(100vh-105px)] justify-between">
        <ul>
          {category.map((item, index) => (
            <li>
              <NavLink
                key={index}
                to={item.to}
                // onClick={() => { setSlideOpen(!slideOpen), setIsActiveName('홈') }}
                className='hover:text-primary h-12 w-auto flex flex-shrink-0 items-center justify-start text-sm font-medium pr-12  '
              >
                {item.name}
              </NavLink>
            </li>
          ))
          }

        </ul>

        <div className="text-sm text-sub flex flex-col gap-1 ">
          <div>
            <span className='w-36'>고객문의 대표전화</span>
            <span className='font-semibold text-primary/50'>1566-0228</span>
          </div>
          <div>
            <span className='w-36'>신세계까사 A/S전화</span>
            <span className='font-semibold text-primary/50'>1588-3408</span>
          </div>
          <p className='text-[0.8rem] text-sub'>평일 09:00 ~18:00 (주말 및 공휴일 휴무)</p>
        </div>
      </div>

    </section>
  )
}

export default CategoryMenu