import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import config from './AppConfig'

// Firebase 
export const firebase_app = firebase.initializeApp({

    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    databaseURL: config.firebase.databaseURL,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId
  
});

export const db = firebase.firestore();



