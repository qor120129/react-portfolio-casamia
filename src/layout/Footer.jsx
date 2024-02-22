import React from 'react'
import { Link } from 'react-router-dom'
const footerNavigation = [
  { name: '개인정보 처리방침', to: '/Living' },
  { name: '채용정보', to: 'javascript:void(0)' },
  { name: '서비스 이용약관', to: 'javascript:void(0)' },
  { name: '입점문의', to: 'javascript:void(0)' },
  { name: '위치정보 서비스 약관', to: 'javascript:void(0)' },
]

const Footer = () => {
  return (
    <footer className='border-t py-12'>
      <div className='px-4 max-w-[80rem] m-auto'>
        <Link to="/">
          <h1 className='font-[Rokkitt] text-main text-3xl pb-3'>casamia</h1>
        </Link>
        <div className='flex flex-wrap gap-y-6 text-[0.75rem] justify-between max-lg:gap-y-0 relative'>
          <div className='*:pr-6 flex flex-wrap max-w-[42rem] *:flex *:items-center text-sub'>
            <ul className='text-main flex flex-wrap gap-x-6'>
              {footerNavigation.map(item => (
                <li key={item.name} className='text-sm'>
                  <Link to={item.to}
                    className={item.name === '개인정보 처리방침' ? 'font-semibold pl-0' : ''}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <span>상호명 : ㈜신세계까사</span>
            <span>대표이사 : 임병선</span>
            <span>주소 : 서울시 중구 남대문시장10길 2 메사빌딩 5-6층</span>
            <span>사업자등록번호 : 120-81-11794</span>
            <span>통신 판매업 신고 : 2018-서울강남-03383</span>
            <span>개인정보보호책임자 : 김찬후</span>
            <Link to="javascript:void(0)">사업자정보확인</Link>
            <span>호스팅제공자 : (주)신세계아이앤씨</span>
            <span>e-mail : guud@shinsegae.com</span>
            <Link to="javascript:void(0)">에스크로 서비스 가입확인</Link>
          </div>
          <div className=' before:border-r before:bg-blue-700 before:absolute  before:top-0 before:-bottom-0 mr-7 before:max-lg:border-r-0'></div>
          <div>
            <div className='text-base *:flex *:gap-1 *:items-center  max-lg:border-t max-lg:pt-6 max-lg:mt-6 max-lg:flex-auto max-lg:flex max-lg:gap-x-6 max-lg:flex-wrap'>
              <div >
                <span className='w-36'>고객문의 대표전화</span>
                <span className='font-semibold text-xl text-primary/50'>1566-0228</span>
              </div>
              <div>
                <span className='w-36'>신세계까사 A/S전화</span>
                <span className='font-semibold text-xl text-primary/50'>1588-3408</span>
              </div>
              <p className='text-[0.8rem] text-sub'>평일 09:00 ~18:00 (주말 및 공휴일 휴무)</p>
            </div>
            <div className='mt-4 flex gap-4 *:border *:p-2 *:rounded-lg'>
              <button className='hover:border-primary hover:text-primary'>대리점 개설안내</button>
              <button className='hover:border-primary hover:text-primary'>입점 문의</button>
            </div>
          </div>
        </div>
        <p className='text-[0.8rem] text-sub pt-4'>Copyright &copy; 2024 SHINSEGAE CASA Co., Ltd. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer