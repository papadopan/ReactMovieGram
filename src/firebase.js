import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDEu569VnoD3dDmyJAshRXk5LHYcK5RGB8",
  authDomain: "mymovie-e370f.firebaseapp.com",
  databaseURL: "https://mymovie-e370f.firebaseio.com",
  projectId: "mymovie-e370f",
  storageBucket: "",
  messagingSenderId: "570225383226"
};

  firebase.initializeApp(config);
  export default firebase;