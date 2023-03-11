import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCdPfgC4AEAa98jZdKvwfLtln5h_NLAubY',
  authDomain: 'auth-rick-morty.firebaseapp.com',
  projectId: 'auth-rick-morty',
  storageBucket: 'auth-rick-morty.appspot.com',
  messagingSenderId: '715086604373',
  appId: '1:715086604373:web:4e649d70fbe80b06098cdc',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
