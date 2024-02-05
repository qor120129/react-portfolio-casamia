import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import ErrorMsg from 'components/ErrorMsg'
import { app, database } from "firebaseApp"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom'
import { ref, child, get, set, push, query, onValue, } from "firebase/database"

const JoinForm = ({ usersDB }) => {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [displayName, setDisplayName] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth(app)
      await createUserWithEmailAndPassword(auth, email, password)

      toast.success('회원가입에 성공했습니다.', {
        position: "top-center",
      })
      writeUserData(email, password, displayName)
      navigate("/")
      await updateProfile(auth.currentUser, { displayName })

    } catch (error) {
      console.log(error)
    }
  }

  const writeUserData = (email, password, displayName) => {
    const postListRef = ref(database, 'users')
    const newPostRef = push(postListRef)

    set(newPostRef, {
      displayName,
      email,
      password,
    })
  }

  const changeValue = (e) => {
    const { name, value } = e.target

    // 이메일
    if (name === 'email') {
      setEmail(value)

      //  이메일 정규식
      const regexEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i


      if (!value.match(regexEmail)) {
        setError('이메일 형식이 올바르지 않습니다.')
      } else {
        setError('')
        setDisplayName(value.substring(0, value.indexOf('@')))
      }
      if (value.match(regexEmail)) {
        usersDB.filter((item) => {
          if (item.email === value) {
            return setError('이미 사용중인 이메일 입니다.')
          }
        })
      }
    }
    // 비밀번호
    if (name === 'password') {
      setPassword(value)

      if (value.length < 8) {
        setError('비밀번호는 8자리 이상으로 입력해주세요.')
      } else if (passwordConfirm.length > 0 && value !== passwordConfirm) {
        setError('비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요')
      } else {
        setError('')
      }
    }

    // 비밀번호 확인
    if (name === 'passwordConfirm') {
      setPasswordConfirm(value)

      if (value !== password) {
        setError('비밀번호와 입력한 값이 다릅니다. 다시 확인해주세요')
      } else {
        setError('')
      }
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl  leading-9 tracking-tight text-gray-900">
          회원 가입
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
          {error.match('이메일') && < ErrorMsg error={error} />}
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
          {error.match('비밀번호 확인') && <ErrorMsg error={error} />}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="passwordConfirm" className="block text-sm font-medium leading-6 opacity-80">
                비밀번호 확인
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={changeValue}
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset p-4 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-8"
              />
            </div>
          </div>
          {error.match('비밀번호와 입력한') && <ErrorMsg error={error} />}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary  px-3 py-1.5 text-sm font-semibold leading-8 text-white shadow-sm hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
              회원가입
            </button>
          </div>
          <div className='text-sm text-center'>이미 아이디가 있으신가요?
            <Link to='/Login' className='ml-2 underline hover:text-primary'>로그인 하기</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JoinForm