import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAt2TiADBd8YhqKeAuJ5Q09kF-f0qDUpBk",
    authDomain: "fronttikurssi.firebaseapp.com",
    databaseURL: "https://fronttikurssi.firebaseio.com",
    projectId: "fronttikurssi",
    storageBucket: "fronttikurssi.appspot.com",
    messagingSenderId: "1027477566749"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;