/* import illustationImage from './images/illustration.jpg';
import Cards from './Cards';
import BigCards from './BigCards'; */
import styles from './Page.module.scss';
import { Lien } from './components/Lien';
import { loadAds } from './api/ads'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* const tiles = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"><g transform="translate(0, 0)"> <rect x="2" y="2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" width="60" height="38" strokeLinejoin="round"></rect> <circle data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" cx="12" cy="56" r="4" strokeLinejoin="round"></circle> <circle data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" cx="32" cy="56" r="6" strokeLinejoin="round"></circle> <circle data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" cx="52" cy="56" r="4" strokeLinejoin="round"></circle> </g></svg>,
    name: 'UI',
    description: 'Je crée des interfaces modernes répondant aux besoins de mes clients'
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"><g transform="translate(0, 0)"> <path data-cap="butt" data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" d="M23.99574,28.16605 C20.46621,26.62196,18,23.09899,18,19c0-5.52285,4.47715-10,10-10s10,4.47715,10,10c0,4.47754-2.94276,8.26776-6.99972,9.54211" strokeLinejoin="round" strokeLinecap="round"></path> <path data-cap="butt" data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" d="M23.99961,35.52665 C16.54108,33.7277,11,27.01094,11,19c0-9.38884,7.61116-17,17-17s17,7.61116,17,17c0,5.68837-2.78219,10.70188-7.07254,13.78783" strokeLinejoin="round" strokeLinecap="round"></path> <line fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" x1="24" y1="37.99999" x2="24" y2="43.99999" strokeLinejoin="round"></line> <path fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M31,36v-2.5 c0-1.93299,1.567-3.5,3.5-3.5H34.5c1.93299,0,3.5,1.567,3.5,3.5V36" strokeLinejoin="round"></path> <path fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M38,37.00021V35.5 c0-1.93299,1.567-3.5,3.5-3.5H41.5c1.93299,0,3.5,1.567,3.5,3.5V38" strokeLinejoin="round"></path> <path fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M45,37.5 c0-1.93299,1.567-3.5,3.5-3.5h0c1.84727,0,3.26627,1.63612,3.00502,3.46482L48,62H24c0-3.83333-7-9.33333-7-14v-6.99999 c0-1.65686,1.34315-3,3-3.00001l4-0.00001V19.5c0-1.933,1.56701-3.5,3.5-3.5h0.00001c1.93299,0,3.49999,1.567,3.49999,3.5V35" strokeLinejoin="round"></path> </g></svg>,
    name: 'UX',
    description: "Je suis toujours à la recherche de l'expérience utilisateur la plus satisfaisante et la plus intuitive possible"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"> <g transform="translate(0, 0)"> <polyline data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points=" 8,48 2,48 2,8 34,8 " strokeLinejoin="miter"></polyline> <polyline data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points="56,8 62,8 62,48 22,48 " strokeLinejoin="miter"></polyline> <line data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="22" y1="60" x2="42" y2="60" strokeLinejoin="miter"></line> <path fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M55,32H35c-0.6,0-1-0.4-1-1 V3c0-0.6,0.4-1,1-1h20c0.6,0,1,0.4,1,1v28C56,31.6,55.6,32,55,32z" strokeLinejoin="miter"></path> <line fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="44" y1="26" x2="46" y2="26" strokeLinejoin="miter"></line> <path fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M21,54H9c-0.6,0-1-0.4-1-1 V31c0-0.6,0.4-1,1-1h12c0.6,0,1,0.4,1,1v22C22,53.6,21.6,54,21,54z" strokeLinejoin="miter"></path> <line fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="14" y1="48" x2="16" y2="48" strokeLinejoin="miter"></line> <rect data-color="color-2" x="28" y="56" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" width="8" height="4" strokeLinejoin="miter"></rect> </g> </svg>,
    name: 'Responsive design',
    description: "Tous mes sites sont pensés pour une utilisation sur mobiles et tablettes, et s'adaptent à toutes les résolutions d'écran"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"> <g transform="translate(0, 0)"> <rect x="2" y="6" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" width="60" height="52" strokeLinejoin="miter"></rect> <line fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="2" y1="18" x2="62" y2="18" strokeLinejoin="miter"></line> <line fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="10" y1="12" x2="12" y2="12" strokeLinejoin="miter"></line> <line data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="10" y1="26" x2="16" y2="26" strokeLinejoin="miter"></line> <line data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="10" y1="38" x2="14" y2="38" strokeLinejoin="miter"></line> <line data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="10" y1="32" x2="12" y2="32" strokeLinejoin="miter"></line> <line data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="10" y1="44" x2="12" y2="44" strokeLinejoin="miter"></line> <line data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="10" y1="50" x2="12" y2="50" strokeLinejoin="miter"></line> <line data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="32" y1="26" x2="36" y2="26" strokeLinejoin="miter"></line> <line data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="36" y1="32" x2="44" y2="32" strokeLinejoin="miter"></line> <line data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="40" y1="38" x2="54" y2="38" strokeLinejoin="miter"></line> <line data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="36" y1="44" x2="44" y2="44" strokeLinejoin="miter"></line> <line data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="32" y1="50" x2="36" y2="50" strokeLinejoin="miter"></line> <line fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="24" y1="18" x2="24" y2="58" strokeLinejoin="miter"></line> </g> </svg>,
    name: 'Développement',
    description: "Je développe des sites uniques sur-mesure repondant aux besoins de mes clients"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"> <g transform="translate(0, 0)"> <circle data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" cx="26" cy="38" r="24" strokeLinejoin="miter"></circle> <circle data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" cx="26" cy="38" r="14" strokeLinejoin="miter"></circle> <circle fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" cx="26" cy="38" r="4" strokeLinejoin="miter"></circle> <line data-cap="butt" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" x1="28.8" y1="35.2" x2="58" y2="6" strokeLinejoin="miter" strokeLinecap="butt"></line> <polygon fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points="52,4 54,10 48,16 46,10 " strokeLinejoin="miter"></polygon> <polygon fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points="60,12 54,10 48,16 54,18 " strokeLinejoin="miter"></polygon> </g> </svg>,
    name: 'Référencement',
    description: "Je construis la structure HTML de mes sites pour optimiser le référencement naturel"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"> <g transform="translate(0, 0)"> <polyline data-cap="butt" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" points="12,22 2,27.8 2,62 62,62 62,27.9 51.9,22 " strokeLinejoin="miter" strokeLinecap="butt"></polyline> <polyline data-cap="butt" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" points="12,33.5 12,2 52,2 52,33.2 " strokeLinejoin="miter" strokeLinecap="butt"></polyline> <line data-cap="butt" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" x1="2" y1="27.8" x2="62" y2="62" strokeLinejoin="miter" strokeLinecap="butt"></line> <line data-cap="butt" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" x1="62" y1="27.9" x2="31.3" y2="44.5" strokeLinejoin="miter" strokeLinecap="butt"></line> <polyline data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points=" 24,18 20,22 24,26 " strokeLinejoin="miter"></polyline> <polyline data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points=" 40,18 44,22 40,26 " strokeLinejoin="miter"></polyline> <line data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="28" y1="30" x2="36" y2="14" strokeLinejoin="miter"></line> </g> </svg>,
    name: 'Email marketing',
    description: "Je crée des campagnes de mails marketing ou des scénarios de nurturing"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"> <g transform="translate(0, 0)"> <circle data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" cx="32" cy="22" r="18" strokeLinejoin="miter"></circle> <circle fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" cx="20" cy="42" r="18" strokeLinejoin="miter"></circle> <circle fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" cx="44" cy="42" r="18" strokeLinejoin="miter"></circle> </g> </svg>,
    name: 'Identité visuelle',
    description: "Je crée des identités visuelles fortes, modernes et durables"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"> <g transform="translate(0, 0)"> <line data-cap="butt" data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" x1="32" y1="60" x2="32" y2="4" strokeLinejoin="round" strokeLinecap="round"></line> <line data-cap="butt" data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" x1="6.978" y1="32" x2="57.022" y2="32" strokeLinejoin="round" strokeLinecap="round"></line> <path fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M32,4c-8,6-20,10-28,10 c0,18.666,9.334,38,28,46c18.666-8,28-27.334,28-46C52,14,40,10,32,4z" strokeLinejoin="round"></path> </g> </svg>,
    name: 'Sécurité / Sauvegarde',
    description: "Je suis particulièrement vigilant à la sécurité de mes sites et je sais être réactif en cas d'attaques"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"> <g transform="translate(0, 0)"> <polyline data-cap="butt" data-color="color-2" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" points="2,32 15.6,32 23.8,15.6 40.2,48.4 48.4,32 62,32 " strokeLinejoin="miter" strokeLinecap="butt"></polyline> <circle fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" cx="32" cy="32" r="30" strokeLinejoin="miter"></circle> </g> </svg>,
    name: 'Analytics',
    description: "J'aide mes clients à analyser leurs statistiques pour qu'ils se fixent des objectifs adaptés"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"> <g transform="translate(0, 0)"> <path data-cap="butt" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" d="M9.8,33.4c-4.7-6.8-4-16.2,2.1-22.3 c5.4-5.4,13.7-6.4,20.2-3.3" strokeLinejoin="miter" strokeLinecap="butt"></path> <path fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M52.1,36.1 c6.8-6.8,7-18.1,0.2-25s-17.9-6.8-24.8,0L15.1,23.5c0,0,6,3.9,12.4-2.5c0,0,11.1,6.2,17.2,0.1" strokeLinejoin="miter"></path> <path data-cap="butt" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" d="M47.8,42.1c1.4,1.4,3.6,1.4,5,0 l0.1-0.1c1.3-1.3,1.4-3.5,0.1-4.9L40.1,23.5" strokeLinejoin="miter" strokeLinecap="butt"></path> <path data-cap="butt" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" d="M29.5,53.5L33,57c1.4,1.4,3.6,1.4,5,0 l0,0c1.4-1.4,1.4-3.6,0-5l-5.1-5.1" strokeLinejoin="miter" strokeLinecap="butt"></path> <path data-cap="butt" fill="none" stroke="#afafaf" strokeWidth="2" strokeMiterlimit="10" d="M38,52c1.4,1.4,3.6,1.4,5,0l0,0 c1.4-1.4,1.4-3.6,0-5" strokeLinejoin="miter" strokeLinecap="butt"></path> <path fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M38.6,42.6l4.3,4.3 c1.4,1.4,3.6,1.5,5,0.1l0,0c1.4-1.4,1.3-3.5-0.1-4.9l-4.4-4.4" strokeLinejoin="miter"></path> <path fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M32.2,45.9L32.2,45.9 c1.4,1.4,1.4,3.6,0,5l-3.7,3.7c-1.4,1.4-3.6,1.4-5,0l0,0c-1.4-1.4-1.4-3.6,0-5l3.7-3.7C28.7,44.6,30.9,44.6,32.2,45.9z" strokeLinejoin="miter"></path> <path fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M22.2,35.9L22.2,35.9 c1.4,1.4,1.4,3.6,0,5l-3.7,3.7c-1.4,1.4-3.6,1.4-5,0l0,0c-1.4-1.4-1.4-3.6,0-5l3.7-3.7C18.6,34.5,20.9,34.5,22.2,35.9z" strokeLinejoin="miter"></path> <path fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M17.2,30.9L17.2,30.9 c1.4,1.4,1.4,3.6,0,5l-3.7,3.7c-1.4,1.4-3.6,1.4-5,0l0,0c-1.4-1.4-1.4-3.6,0-5l3.7-3.7C13.6,29.5,15.8,29.5,17.2,30.9z" strokeLinejoin="miter"></path> <path fill="none" stroke="#afafaf" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M27.2,40.9L27.2,40.9 c1.4,1.4,1.4,3.6,0,5l-3.7,3.7c-1.4,1.4-3.6,1.4-5,0l0,0c-1.4-1.4-1.4-3.6,0-5l3.7-3.7C23.6,39.5,25.8,39.5,27.2,40.9z" strokeLinejoin="miter"></path> </g> </svg>,
    name: 'Accompagnement',
    description: "Je gère entièrement mes projets en assurant un accompagnement de qualité"
  },
];

const bigTiles = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"><g transform="translate(0, 0)"> <line data-cap="butt" data-color="color-2" fill="none" stroke="#444444" strokeWidth="2" strokeMiterlimit="10" x1="7.63636" y1="24" x2="22.36364" y2="24" strokeLinejoin="miter" strokeLinecap="butt"></line> <line fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="36" y1="20" x2="62" y2="20" strokeLinejoin="miter"></line> <line fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="36" y1="32" x2="62" y2="32" strokeLinejoin="miter"></line> <line fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="2" y1="44" x2="62" y2="44" strokeLinejoin="miter"></line> <line fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="2" y1="56" x2="62" y2="56" strokeLinejoin="miter"></line> <polyline data-color="color-2" fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points=" 26,32 16,10 14,10 4,32 " strokeLinejoin="miter"></polyline> <line fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="36" y1="8" x2="62" y2="8" strokeLinejoin="miter"></line> </g></svg>,
    name: 'Écrire un message',
    description: 'Nous partageons la même passion ? Écrivez-moi si vous voulez en savoir plus sur mon métier, ma formation ou pour toute autre question !'
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"> <g transform="translate(0, 0)"> <rect x="6" y="10" fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" width="44" height="52" strokeLinejoin="miter"></rect> <line data-color="color-2" fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="16" y1="26" x2="40" y2="26" strokeLinejoin="miter"></line> <line data-color="color-2" fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="16" y1="36" x2="40" y2="36" strokeLinejoin="miter"></line> <line data-color="color-2" fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="16" y1="46" x2="24" y2="46" strokeLinejoin="miter"></line> <polyline data-color="color-2" fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points=" 12,2 58,2 58,56 " strokeLinejoin="miter"></polyline> </g> </svg>,
    name: 'Demander un devis',
    description: "Vous pouvez aussi me demander un devis gratuit pour un projet et je me ferai un plaisir de vous répondre dans les délais les plus brefs."
  },
]; */

function HomePage(props) {
  const { state } = useLocation();
  const [userState, setUserState] = useState()
  const [ads, setAds] = useState([])
  /* const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState() */
  // Read values passed on state
  // setUser(state.user);

  useEffect(() => {
    
    //console.log('first')
    loadAds()
    .then((res)=>{
        console.log('RES (HOMEPAGE) :')
        console.log(res) 
        setAds(res)
    })
    .catch(err=>console.log(err))

    //console.log('STATE', state)

    /* if(state === null) {
        props.updateUser(undefined)
    }
    else {
        props.updateUser(state.user)
    } */
  }, []);

  return (
    <>
      {/* <header className="bg-slate-200 dark:bg-slate-800 h-screen flex flex-col justify-end px-8 pb-8">
        <div className="relative max-w-5xl text-left">
          <h1 className="text-slate-700 font-extrabold text-4xl sm:text-5xl lg:text-6xl dark:text-white">Mikaël Borges</h1>
          <p className={`${styles.description} uppercase mt-6 text-base text-slate-500 max-w-3xl dark:text-pink-600`}>
            ui & ux designer - front-end developer. Lille
          </p>
        </div>
      </header> */}

      <section className='pt-32 pb-8 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
        {/* <h2 className='dark:text-white text-6xl text-slate-700 break-words'>Toutes les annonces</h2>
        <p className='leading-10 text-gray-400'>Je créé des applications et des sites aux ergonomies intuitives et aux design épurés. J'interviens sur l'expérience utilisateur globale, le design d'interfaces et le développement front-end de marques ou de produits. Chaque étape du processus de création est importante, depuis le brief jusqu'au déploiement, c'est pourquoi j'aime penser et développer les projets dans leur globalité.</p> */}


        {ads.length > 0 &&
          <ul className=''>
            {ads.map((ad)=>{
              return (
                <li key={ad._id} className='dark:bg-slate-700 dark:text-white bg-slate-200 rounded-3xl p-4 last:mb-0 mb-8'>
                  <h3 className='text-2xl'>{ad.name}</h3>
                  <p className='text-2xl'>{ad.description}</p>
                  <p className='text-2xl dark:text-yellow-100'>{ad.price} / heure</p>
                </li>
              )
            })}
          </ul>
        }
      
      
      
      </section>

      {/* <section className='py-32 relative px-12'>
        <div className={`absolute inset-0 bg-bottom bg-no-repeat ${styles.indexBeams} ${props.darkMode ? styles.dark : ''}`}>
          <div className={`${styles.grid} absolute inset-0 ${props.darkMode ? styles.bgGridSlate400 : styles.bgGridSlate900} bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5`}></div>
        </div>
      </section>

      <section className='py-32 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
        <h4 className='dark:text-white'>Allier une ergonomie efficace...</h4>
        <p className='leading-10 text-gray-400'>L'ergonomie d'un site ou d'une application est l'un des points les plus importants pour moi. Je passe beaucoup de temps à imaginer comment faciliter la navigation pour les utilisateurs.</p>
        <Lien
          url={'/projects'}
          target='_self'
          className={`
            hover:dark:bg-black
            hover:bg-black
            hover:dark:text-pink-600
            dark:bg-slate-700
            dark:text-yellow-100
            block
            w-fit
            p-6
            rounded-full
            shadow-xl
          `}
        >
          Je découvre les projets
        </Lien>
        <h4 className='dark:text-white'>... à une interface et un développement de qualité</h4>
        <p className='leading-10 text-gray-400'>La phase de création d'un projet est un autre point très important. Elle passe par un design et un développement minutieux. En alliant une interface esthétique, ergonomique et intuitive à un développement solide, je produis des applications et des sites efficaces.</p>
      </section>

      <section className='py-32 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
      </section> */}
    </>
  );
}

export default HomePage;
