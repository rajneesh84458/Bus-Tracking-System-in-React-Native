import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyAnPT31NrRgISk1AGtxPZgoG0z3CUClWYE",
    authDomain: "bus-tracking-system-405ad.firebaseapp.com",
    databaseURL: "https://bus-tracking-system-405ad.firebaseio.com",
    projectId: "bus-tracking-system-405ad",
    storageBucket: "bus-tracking-system-405ad.appspot.com",
    messagingSenderId: "123431624364"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;