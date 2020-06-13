// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    aapiKey: "AIzaSyCNAJOluK3lPgo9k-nqGC0THXLVIHQZlls",
    authDomain: "circleci-react.firebaseapp.com",
    projectId: "circleci-react",
  });
  
var db = firebase.firestore();


//agrgar un usuario a la base de datos
function guardar(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;
    db.collection("users").add({
        nombre: nombre,
        apellido: apellido,
        fechaNacimiento: fecha
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value='';
        document.getElementById('apellido').value='';
        document.getElementById('fecha').value='';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

//leer los datos de la bd
var tabla = document.getElementById('cuerpoTabla')
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().apellido}`);
        tabla.innerHTML +=`
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().apellido}</td>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().fechaNacimiento}</td>
            <td><button class="btb btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btb btn-warning" onclick="actualizar('${doc.id}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().fechaNacimiento}')">Editar</button></td>
        </tr>`
    });
});


//eliminar registros
function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//actualizar un documento
function actualizar(id,nombre,apellido,fecha){
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Actualizar';
    boton.onclick = function(){
        var registro = db.collection("users").doc(id);
        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var fecha = document.getElementById('fecha').value;


        return registro.update({
            nombre: nombre,
            apellido: apellido,
            fechaNacimiento: fecha
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            document.getElementById('nombre').value='';
            document.getElementById('apellido').value='';
            document.getElementById('fecha').value='';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}