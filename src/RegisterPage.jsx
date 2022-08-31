import { useState, useEffect } from 'react'
import { registerUser } from './api/user'

import './App.css'
import {
  Image,
  Transformation,
  CloudinaryContext
} from 'cloudinary-react'
import {changeImg} from './api/coach'

function RegisterPage(props) {
  const [img, setImg] = useState(null),
        [msg, setMsg] = useState(null),
        [email, setEmail] = useState(''),
        [info, setInfo] = useState(null),
        [error, setError] = useState(null),
        [lastname, setLastname] = useState(''),
        [password, setPassword] = useState(''),
        [firstname, setFirstname] = useState(''),
        [disabled, setDisabled] = useState(true),

        onSubmitForm = e => {
          e.preventDefault()
          let data = {
              image: e.target.image.value,
              email: e.target.email.value,
              password: e.target.password.value,
              firstname: e.target.firstname.value,
              lastname: e.target.lastname.value,
          }
          registerUser(data)
          .then((res) => {
              //console.log('res Register page', res)
              if (res.status === 200) {
                  //console.log('res', res)
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
          })
        },

        // fonction callback de cloudinary déclenché lors de l'envoi un fichier
        checkUploadResult = (resultEvent) => {
          setMsg(null)
          //si l'envoi est réussit
            if (resultEvent.event === "success") {
                

              console.log("result info", resultEvent.info);

              /* let datas = {
                  imageUser : resultEvent.info.public_id,
                  //id: coach.infos.id
              }
              changeImg(datas)
              .then((res)=>{
                  if(res.status === 200){
                      getOneCoach(coach.infos.id)
                      .then((response)=>{
                        console.log("getOneCoach", response)
                          let myCoach = response.result
                          console.log(myCoach)
                          myCoach.token = localStorage.getItem("coachme-token")
                          dispatch(connectCoach(myCoach))
                          setImg(response.result.imageUrl)
                      })
                      
                      setMsg('Votre profil a bien été édité');
                  }else{
                      setMsg("L'image n'a pas été modifié");
                  }
              })
              .catch(err=>console.log("Echec modification image!")) */
            }else{
                console.log("Erreur envoi fichier")
            }
            console.log("RESULT EVENT", resultEvent);
        },

        // fonction d'affichage de notre interface de chargement d'images/videos de cloudinary
        showWidget = e => {
            e.preventDefault()
            //paramètrage de l'interface
            let widget = window.cloudinary.createUploadWidget(
              {
                cloudName: "mika4ever",//nom de mon cloud
                uploadPreset: "samples",//dossier ou l'on veut envoyer
                maxImageWidth: 800,//on peut paramètrer la taille max de l'image
                cropping: false,//recadrage
              },
              (error, result) => {
                console.log('error showWidget', error);
                console.log('result showWidget', result);
                checkUploadResult(result);//appel de notre callback
              }
            );
            //ouverture de notre interface
            widget.open();
        }





  useEffect(() => {
      if (email !== '' && password !== '' && firstname !== '' && lastname !== '') {
          setDisabled(false);
      }
      else {
          setDisabled(true);
      }
  }, [email, password]);
  return (
    <section className='min-h-screen pt-32 pb-8 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
      <form
        action="/user/register"
        method="post"
        onSubmit={e => onSubmitForm(e)}
        className="c-form"
      >







        {/* {img !== null && <CloudinaryContext cloudName="mika4ever">
          <div>
            <Image publicId={coach.infos.imageUrl} id="profilImg">
              <Transformation quality="auto" fetchFormat="auto" />
            </Image>
          </div>
        </CloudinaryContext>} */}
        <button
          onClick={e => showWidget(e)}
          className='bg-slate-200 py-1 px-2'
        >
          Ajouter ma photo de profil
        </button>







        <span className='text-gray-400 italic'>(facultatif)</span>
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
          name="Créer compte"
          className={`
            py-1
            px-2
            bg-slate-200
            dark:bg-slate-800
            dark:text-yellow-100
          `}
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
