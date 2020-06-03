 // Este es el punto de entrada de tu aplicacion
import { db, auth } from './lib/index.js';
import { home } from './lib/views/home.js';

const root = document.querySelector('#root');
root.innerHTML = home();

// Crear estructura de la página
const mainStructure = () => {
  root.innerHTML = `
    <div class="modal hidden-component">
         <span id="close-modal">&times</span>
        <div class="modal-container">
          <ul class="modal-header">
            <li id="sign-in-tab" class="active-tab">Entrar</li>
            <li id="sign-up-tab">Registrarse</li>
          </ul>
          <div class="modal-content">
            <form action="" id="sign-in-form">
              <label for="email">Correo</label>
              <br>
              <input name="email" type="email">
              <br>
              <label for="password">Contraseña</label>
              <br>
              <input name="password" type="password">
              <br>
              <a href="#" id="password-request">¿Olvidaste tu contraseña?</a>
              <button id="sign-in-btn">Iniciar</button>
              <br>
              <p id="sign-in-error" class="error-message">*Nombre o contraseña no válidos</p>
            </form>
            
            <form action="" id="sign-up-form" class="hidden-component">
              <label for="user-name">Nombre de usuario</label>
              <input name="user-name" type="text">
              <br>
              <label for="email">Correo</label>
              <input name="email" type="email">
              <br>
              <label for="password">Contraseña</label>
              <input name="password" type="password">
              <br>
              <button id="sign-up-btn">Registrarse</button>
              <p id="sign-up-error" class="error-message">*La contraseña debe tener 6 caracteres como mínimo</p>
            </form>
          </div>
        </div>
      </div>
    <header id="header-orden" class="top">
      <div class="logo" id="logo-container">
      <img src="/images/logoPawLovers.png" alt="" class="logo">
      </div>
      <nav class="main-nav">
        <ul>
          <li class="sign-btn"><i class="fas fa-user"></i></li>
          <li></li>
          <li class="category">
          <a href="#" class="categorysBtn"><i class="fas fa-caret-down"></i></a>
          <div class="category-content">
              <a href="#" class="celeste" id="tips">Tips</a>
              <a href="#" class="verde" id="cuarentena">Dias en 40tena</a>
              <a href="#" class="marron" id="cuidados">Cuidados</a>
              <a href="#" class="celeste" id="memes">Memes</a>
              <a href="#" class="verde" id="adopcion">Adopcion</a>
              <a href="#" class="marron" id="servicios">Servicios</a>
              <a href="#" class="celeste" id="fotosConcursos">Fotos Concursos</a>
              <a href="#" class="verde" id="masPl">Mas sobre PL</a>
          </div>
      </li>
          <!--<span><input class="search-bar" type="text" placeholder="Buscar..."></span>-->
        </ul>
      </nav>
      
    </header>
    <nav class="secondary-navbar">
      <ul>
        <li>Tips</li>
        <li>Cuidados</li>
        <li>Paseos</li>
      </ul>
    </nav>

    <aside class="middle-left" id="photo-carousel">
    <div class="derecha">
    <ul id="menu2">
    <p>holaaaaaaaaaaaaaaaaaa</p>
    </ul>
  </div>  
  <aside>
    

      <main class="middle-center" id=" publication">
        <p>holiwi</p>
      </main>
      <aside class="middle-right" id="categories">
        <p>trululu</p>
      </aside>


   <footer class="bottom">
      <p>FOOTER</p><span><img src="" alt=""></span>
    </footer> </div>
  
  `
}
window.onload = mainStructure();


/* MODAL DE INGRESO */
// Pestañas
const toggleModalForm = () => {
  const signInTab = document.querySelector('#sign-in-tab');
  const signUpTab = document.querySelector('#sign-up-tab');
  const signInForm = document.querySelector('#sign-in-form');
  const signUpForm = document.querySelector('#sign-up-form');
  signInTab.addEventListener('click', () => {
    signInForm.classList.remove('hidden-component');
    signUpForm.classList.add('hidden-component');
    signUpTab.classList.add('inactive-tab');
    signUpTab.classList.remove('active-tab');
    signInTab.classList.add('active-tab');
  });
  signUpTab.addEventListener('click', () => {
    signUpForm.classList.remove('hidden-component');
    signInForm.classList.add('hidden-component');
    signInTab.classList.remove('active-tab');
    signInTab.classList.add('inactive-tab');
    signUpTab.classList.add('active-tab');
  });
};
// Abrir y cerrar modal
const openSignModal = () => {
  const modal = document.querySelector('.modal');
  modal.classList.remove('hidden-component');
  const closeModal = document.querySelector('#close-modal');
  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden-component');
  });
  toggleModalForm();
};
// Agregar a opción "Ingresar" event listener de apertura de modal
const signBtn = document.querySelector('.sign-btn');
if (signBtn != null) {
  signBtn.addEventListener('click', () => {
    openSignModal();
  });
}


// PUBLICACIONES

// Leer publicaciones (aquí podemos hacer una lectura por category)
/* db.collection('posts').onSnapshot((snapshot) => {
  snapshot.docs.forEach((doc) => {
    const docData = doc.data();
    console.log(docData);
  });
}); */

// Crear publicaciones
/* db.collection('posts').add({
  title: "Quiero un perro",
  content: "Hace mucho que no tengo un perrito, ¿qué raza me recomiendan?",
  category: "bla",
  author: "uid.user.name",
  likes: {
    username:
  }
})  */

// Eliminar publicaciones

// USUARIOS
// Registro
const signUpForm = document.querySelector('#sign-up-form');
signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const userName = signUpForm['user-name'].value;
  const email = signUpForm.email.value;
  const password = signUpForm.password.value;

  auth.createUserWithEmailAndPassword(email, password).then(credential => {
    return db.collection('user').doc(credential.user.uid).set({
      userName,
    });
  }).then(() => {
    console.log('Usuario creado y autenticado');
  });

});

// Inicio de sesión

// Cerrar sesión
