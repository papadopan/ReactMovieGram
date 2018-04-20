import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBwSCm8O2bXcISEkYnSVe49qwU2AOJwLOA",
    authDomain: "moviegram-bc401.firebaseapp.com",
    databaseURL: "https://moviegram-bc401.firebaseio.com",
    projectId: "moviegram-bc401",
    storageBucket: "moviegram-bc401.appspot.com",
    messagingSenderId: "645743201115"
  };

  firebase.initializeApp(config);
  export default firebase;