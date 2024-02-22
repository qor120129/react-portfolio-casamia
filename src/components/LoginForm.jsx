import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { app } from 'firebaseApp'

const LoginForm = () => {
  // const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth(app)
      await signInWithEmailAndPassword(auth, email, password)

      toast.success("로그인성공!", {
        position: "top-center"
      });

      navigate("/")

    } catch (error) {
      if (error.message.match('auth/invalid-credential')) {
        toast.error('이메일 또는 비밀번호를 확인해 주세요 ',{
          position: "top-center"
        }) 
      }
      if (error.message.match('to many failed')) {
        toast.error('여러 번의 로그인 시도 실패로 나중에 다시 시도할 수 있습니다.',{
          position: "top-center"
        }) 
      }
    }
  }

  const changeValue = (e) => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    }

    if (name === 'password') {
      setPassword(value)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl  leading-9 tracking-tight text-gray-900">
          회원 로그인
        </h2>
      </div>
      <div className="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit} method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 opacity-80">
              아이디(이메일)
            </label>
            <div className="mt-2">
              <input
                onChange={changeValue}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset p-4 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-8"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 opacity-80">
                비밀번호
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={changeValue}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset p-4 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-8"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary  px-3 py-1.5 text-sm font-semibold leading-8 text-white shadow-sm hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
              로그인
            </button>
          </div>
          <div className='flex items-center justify-center gap-4'>
            <Link to='/join' className='flex justify-end text-sm text-center hover:text-primary'>아이디 / 비밀번호 찾기</Link>
            <Link to='/join' className='flex justify-end text-sm text-center hover:text-primary'>회원가입</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm