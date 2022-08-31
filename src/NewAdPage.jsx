import { useState, useEffect } from 'react'
import { newAd } from './api/ads'

function NewAdPage(props) {

  console.log('props.dataUser._id,', props.dataUser._id)

  const [description, setDescription] = useState(''),
        [price, setPrice] = useState(''),
        [title, setName] = useState(''),
        [disabled, setDisabled] = useState(true),
        [error, setError] = useState(null),
        [info, setInfo] = useState(null)

  useEffect(() => {
      if (title !== '' && description !== '' && price !== '') {
          setDisabled(false);
      }
      else {
          setDisabled(true);
      }
  }, [title, price, description]);
    
  const onSubmitForm = (e) => {
      let data = {
          title: e.target.name.value,
          description: e.target.description.value,
          price: e.target.price.value,
          userId: props.dataUser._id,
      };
      console.log('data .jsx', data)
      newAd(data)
      .then((res) => {
          //console.log('res Register page', res)
          if (res.status === 200) {
              //console.log('res', res)
              setInfo(res.data.message)
          }
          else {
              console.log('RES :')
              console.log(res)
              console.log('RES.RESPONSE.DATA.MESSAGE :')
              console.log(res.response.data.message)
              setError(res.response.data.message);
          }
      })
      .catch((err) => {
          console.log('err: rentré dans le catch NewAdPage.jsx')
          console.log(err)
          setError(err)
      });
  }

  return (
      <section className='min-h-screen pt-32 pb-8 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
          <form
              action={`/user/${props.dataUser._id}/new`}
              method="post"
              onSubmit={(e)=>{
                  e.preventDefault()
                  onSubmitForm(e)
              }}
          >
              <input
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
                type="text"
                name="titre"
                placeholder="Le titre de votre annonce"
                className='border dark:bg-slate-800 dark:text-white'
              />
              <input
                onChange={(e) => {
                  setDescription(e.currentTarget.value);
                }}
                type="text"
                name="description"
                placeholder="La description de votre annonce"
                className='border dark:bg-slate-800 dark:text-white'
              />
              <input
                onChange={(e) => {
                  setPrice(e.currentTarget.value);
                }}
                type="number"
                name="price"
                placeholder="votre prix par heure"
                className='border dark:bg-slate-800 dark:text-white'
              />
              <button
                disabled={disabled}
                type="submit"
                name="Envoyer"
                className='block border bg-slate-200 dark:bg-slate-800 dark:text-yellow-100'
              >
                Poster mon annonce
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

export default NewAdPage;
