import { auth, db } from './functions.js';

// Registro
export const signUpFunction = () => {
  const signUpForm = document.querySelector('#sign-up-form');
  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const userName = signUpForm['user-name'].value;
    const email = signUpForm.email.value;
    const password = signUpForm.password.value;

    auth.createUserWithEmailAndPassword(email, password).then(userData => {
      userData.user.updateProfile({
          displayName: userName,
      });
     db.collection('users').doc(userData.user.uid).set({
        userName,
      }).then(() => {
         console.log('Usuario creado y autenticado');
         const successMessageP = document.querySelector('#sign-up-success');
         const successMsge = `Bienvenido a Paw Lovers, ${auth.currentUser.displayName}.`;
         successMessageP.innerHTML = successMsge;
         console.log(successMsge);
         setTimeout(() => {
           signUpForm.reset();
           //Seleccionando el modal completo a través del formulario de registro para ocultarlo
           successMessageP.innerHTML = "";
           const modal = signUpForm.parentElement.parentElement.parentElement;
           modal.classList.add('hidden-component');
           window.location.hash = "#/home";
         }, 3000);
      })
  }).catch(error => {
    console.log(error.message);
    if (error.message === "Password should be at least 6 characters") {
      const errorMessageP = document.querySelector('#sign-up-error');
      let spaError = "La contraseña debe tener 6 caracteres como mínimo";
      errorMessageP.innerHTML = spaError;
    }
  });
});
}

// Inicio de sesión
export const signInFunction = () => {
  const signInForm = document.querySelector('#sign-in-form');
  signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = signInForm.email.value;
    const password = signInForm.password.value;

  auth.signInWithEmailAndPassword(email, password).then((credential) => {
    console.log('Usuario ingresado');
    let errorMessageP = document.querySelector('#sign-in-error');
    errorMessageP.innerHTML = "";
    const successMessageP = document.querySelector('#sign-in-success');
    const successMsge = `Hola, ${credential.user.displayName}, iniciaste sesión correctamente.`;
    successMessageP.innerHTML = successMsge;
    setTimeout(() => {
      signInForm.reset();
      //Seleccionando el modal completo a través del formulario de registro para ocultarlo
      successMessageP.innerHTML = "";
      const modal = signInForm.parentElement.parentElement.parentElement;
      modal.classList.add('hidden-component');
      window.location.hash = "#/home";
    }, 3000);
  }).catch(error => {
    console.log(error.message);
    let errorMessageP = document.querySelector('#sign-in-error');
    let spaError;
    errorMessageP.innerHTML = "";
    
    if (error.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
      spaError = "No existe un usuario registrado con esa dirección o la contraseña es incorrecta.";
      errorMessageP.innerHTML = spaError;
    } else if (error.message === "The password is invalid or the user does not have a password.") {
      spaError = "La contraseña no es válida o el usuario no posee una contraseña.";
      errorMessageP.innerHTML = spaError;
    } else if (error.message === "The email address is badly formatted.") {
      spaError = "El correo tiene un formato incorrecto.";
      errorMessageP.innerHTML = spaError;
    }
  });
  });
};
//Acceder con google
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return  firebase.auth().signInWithPopup(provider)

    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
};


// Cerrar sesión
export const exitFunction = () => {
const exit = document.querySelector('.exit');
exit.addEventListener('click', (event) => {
    auth.signOut();
    console.log('Sali, me fui');
});
};