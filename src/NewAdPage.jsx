import { newAd } from './api/ads'
import { useState, useEffect } from 'react'

function NewAdPage(props) {

  const [title, setName] = useState(''),
        [price, setPrice] = useState(''),
        [info, setInfo] = useState(null),
        [error, setError] = useState(null),
        [disabled, setDisabled] = useState(true),
        [description, setDescription] = useState(''),

        onSubmitForm = e => {
          e.preventDefault()
          let data = {
            title: e.target.titre.value,
            description: e.target.description.value,
            price: e.target.price.value,
            userId: props.dataUser._id,
            firstname: props.dataUser.firstname,
            lastname: props.dataUser.lastname,
            superUser: props.dataUser.superUser,
            reviewsNb: props.dataUser.reviewsNb,
            starsNb: props.dataUser.starsNb,
            imageUser: props.dataUser.imageUser,
          }
          console.log('data .jsx', data)
          newAd(data)
          .then(res => {
            // console.log('res Register page', res)
            if(res.status === 200) {
              // console.log('res', res)
              setInfo(res.data.message)
            }
            else {
              console.log('RES :')
              console.log(res)
              console.log('RES.RESPONSE.DATA.MESSAGE :')
              console.log(res.response.data.message)
              setError(res.response.data.message)
            }
          })
          .catch(err => {
            console.log('err: rentré dans le catch NewAdPage.jsx')
            console.log(err)
            setError(err)
          })
        }

  useEffect(() => {
    if (title !== '' && description !== '' && price !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [title, price, description]);

  return (
    <section className='min-h-screen pt-32 pb-8 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
      <form
        method='post'
        onSubmit={e => onSubmitForm(e)}
        action={`/user/${props.dataUser._id}/new`}
      >
        <input
          type='text'
          name='titre'
          placeholder='Titre de votre annonce'
          onChange={e => setName(e.currentTarget.value)}
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          type='text'
          name='description'
          placeholder='Description de votre annonce'
          onChange={e => setDescription(e.currentTarget.value)}
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          name='price'
          type='number'
          onChange={(e) => setPrice(e.currentTarget.value)}
          placeholder='votre prix par heure'
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <button
          type='submit'
          name='Envoyer'
          disabled={disabled}
          className='block border bg-slate-200 dark:bg-slate-800 dark:text-yellow-100'
        >
          Poster mon annonce
        </button>
      </form>
      {info &&
        <p className='text-green-500'>{info}</p>
      }
      {error &&
        <p className='text-red-500'>{error}</p>
      }
    </section>
  )
}

export default NewAdPage;
