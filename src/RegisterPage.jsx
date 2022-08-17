import { useState, useEffect } from 'react'
import { registerUser } from './api/user'
import { config } from './config'

function RegisterPage(props) {
  const [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [firstname, setFirstname] = useState(''),
        [lastname, setLastname] = useState(''),
        [disabled, setDisabled] = useState(true),
        [error, setError] = useState(null),
        [info, setInfo] = useState(null)

  useEffect(() => {
      if (email !== '' && password !== '' && firstname !== '' && lastname !== '') {
          setDisabled(false);
      }
      else {
          setDisabled(true);
      }
  }, [email, password]);
    
  const onSubmitForm = (e) => {
      let data = {
          email: e.target.email.value,
          password: e.target.password.value,
          firstname: e.target.firstname.value,
          lastname: e.target.lastname.value,
      };

      registerUser(data)
      .then((res) => {
          console.log('res Register page', res)
          if (res.status === 200) {
              console.log('res', res)
              setInfo(res.data.message)
          }
          else {
              console.log('RES (LOGIN PAGE) :')
              console.log(res)
              console.log('RES.RESPONSE.DATA.MESSAGE (LOGIN PAGE) :')
              console.log(res.response.data.message)
              setError(res.response.data.message);
          }
      })
      .catch((err) => {
          console.log('err: rentré dans le catch RegisterPage.jsx')
          console.log(err)
          setError(err)
      });
  }

  return (
      <section className='min-h-screen pt-32 pb-8 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
          <form
              action="/user/register"
              method="post"
              onSubmit={(e)=>{
                  e.preventDefault()
                  onSubmitForm(e)
              }}
          >
              <input
                onChange={(e) => {
                  setFirstname(e.currentTarget.value);
                }}
                type="text"
                name="firstname"
                placeholder="votre prénom"
                className='border dark:bg-slate-800 dark:text-white'
              />
              <input
                onChange={(e) => {
                  setLastname(e.currentTarget.value);
                }}
                type="text"
                name="lastname"
                placeholder="votre nom"
                className='border dark:bg-slate-800 dark:text-white'
              />
              <input
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
                type="text"
                name="email"
                placeholder="votre email"
                className='border dark:bg-slate-800 dark:text-white'
              />
              <input
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
                type='password'
                name="password"
                placeholder="votre mot de passe"
                className='border dark:bg-slate-800 dark:text-white'
              />
              <button
                disabled={disabled}
                type="submit"
                name="Se connecter"
                className='block border bg-slate-200 dark:bg-slate-800 dark:text-yellow-100'
              >
                Créer mon compte
              </button>
          </form>
          {info && (
            <p className='text-green-500'>{info}</p>
          )}
          {error && (
            <p className='text-red-500'>{error}</p>
          )}
      </section>
  );
}

export default RegisterPage;
