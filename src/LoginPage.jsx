import { loginUser } from './api/user'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage(props) {

    const navigate = useNavigate(),
          [email, setEmail] = useState(''),
          [error, setError] = useState(null),
          [password, setPassword] = useState(''),
          [disabled, setDisabled] = useState(true),

          onSubmitForm = e => {
            e.preventDefault()
            /* console.log('EMAIL ENTRé')
            console.log(e.target.email.value)
            console.log('MDP ENTRé')
            console.log(e.target.password.value) */

            let data = {
              email: e.target.email.value,
              password: e.target.password.value,
            }

            loginUser(data)
            .then(res => {
              /* console.log('res', res)
              console.log('res.status', res.status) */
              if(res.status === 200) {
                /* console.log('RES (LOGIN PAGE) :')
                console.log(res)
                console.log('RES.DATA (LOGIN PAGE) :')
                console.log(res.data)
                console.log('RES.DATA.SESSION.USER (LOGIN PAGE)')
                console.log(res.data.session.user) */

                window.localStorage.setItem('user', JSON.stringify(res.data.session.user))
                props.updateUser(res.data.session.user)
                navigate('/')
              }
              else {
                console.log('RES (LOGIN PAGE) :')
                console.log(res)
                console.log('RES.RESPONSE.DATA.MESSAGE (LOGIN PAGE) :')
                console.log(res.response.data.message)
                setError(res.response.data.message)
              }
            })
            .catch(err => {
                console.log('err: rentré dans le catch LoginPage.jsx')
                console.log(err)
                setError(err)
            })
          }

    useEffect(() => {
      if(email !== '' && password !== '') {
        setDisabled(false)
      }
      else {
        setDisabled(true)
      }
    }, [email, password]);

    /* useEffect(() => {
      console.log('login useEffect [props.dataUser]')
      console.log('props.dataUser', props.dataUser)
      if(Object.keys(props.dataUser).length !== 0 || props.dataUser.constructor !== Object) {
        console.log('REDIRECTION')
        navigate('/')
      }
    }, [props.dataUser]); */

    useEffect(() => {
      console.log('composant login chargé')
    }, []);

  return (
    <section className='min-h-screen pt-32 pb-8 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
      <form
        action='/user/login'
        method='post'
        onSubmit={e => onSubmitForm(e)}
      >
        <input
          onChange={e => setEmail(e.currentTarget.value)}
          type='text'
          name='email'
          placeholder='votre email'
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          onChange={e => setPassword(e.currentTarget.value)}
          type='password'
          name='password'
          placeholder='votre mot de passe'
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <button
          disabled={disabled}
          type='submit'
          name='Se connecter'
          className='border bg-slate-200 dark:bg-slate-800 dark:text-yellow-100'
        >
          Se connecter
        </button>
      </form>
      {error &&
        <p className='text-red-500'>{error}</p>
      }
    </section>
  )
}

export default LoginPage
