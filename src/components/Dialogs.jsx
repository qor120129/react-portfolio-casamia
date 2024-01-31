import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Dialogs({ title, succes, close, to, setOpen}) {

  const cancelButtonRef = useRef(null)
  const navigate = useNavigate()


  return (
    <div className={` z-50 fixed inset-0 bg-gray-500 bg-opacity-50 animate-opacity`} >
      <div className='flex items-center justify-center h-full'   >
        <div className=" min-w-80 text-center  bg-white shadow-xl transition-all rounded-lg overflow-hidden ">
          <div className="bg-white p-6 text-base font-semibold leading-6 whitespace-pre-line">
            {title}
          </div>
          <div className="bg-gray-50 px-4 py-3 justify-center sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className={`${succes ? 'bg-primary hover:bg-primaryHover' : 'bg-red-600 hover:bg-red-500'} inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto`}
              onClick={() => navigate(to)}
            >
              {succes}
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => setOpen(false)}
              ref={cancelButtonRef}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
