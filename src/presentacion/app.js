// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    aapiKey: "AIzaSyCNAJOluK3lPgo9k-nqGC0THXLVIHQZlls",
    authDomain: "circleci-react.firebaseapp.com",
    projectId: "circleci-react",
  });
  
var db = firebase.firestore();
function guardar(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;
    db.collection("users").add({
        first: nombre,
        last: apellido,
        born: fecha
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
