import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { app } from 'firebaseApp'

const LoginForm = ({ mobile }) => {
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
        toast.error('이메일 또는 비밀번호를 확인해 주세요 ', {
          position: "top-center"
        })
      }
      if (error.message.match('to many failed')) {
        toast.error('여러 번의 로그인 시도 실패로 나중에 다시 시도할 수 있습니다.', {
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
    <div className={`${mobile ? 'max-sm:min-h-[calc(100vh-100px)]' : ' min-h-[calc(100vh-440px)]'} flex flex-1 flex-col justify-center px-6 py-12 lg:px-8`}>
      <div className="mx-auto">
        <h2 className="text-center text-3xl  leading-9 tracking-tight text-gray-900 max-sm:text-2xl">
          회원 로그인
        </h2>
      </div>
      <div className="my-10 mx-auto max-w-sm w-[80%]">
        <form className={`space-y-6`} onSubmit={onSubmit} method="POST">
          <div>
            <label htmlFor="email" className='form_label'>
              아이디(이메일)
            </label>
            <div className="mt-1 sm:mt-2">
              <input
                onChange={changeValue}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`form_input`}

              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className='form_label'>
                비밀번호
              </label>
            </div>
            <div className="mt-1 sm:mt-2">
              <input
                onChange={changeValue}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`form_input`}

              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary  px-3 py-1.5 text-sm font-semibold leading-8 text-white shadow-sm hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6"
            >
              로그인
            </button>
          </div>
          <div className='flex text-sm items-center justify-center gap-4  max-sm:text-[12px] '>
            <Link to='/join' className='hover:text-primary'>아이디 / 비밀번호 찾기</Link>
            <Link to='/join' className='hover:text-primary'>회원가입</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm