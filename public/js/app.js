//Preloader
// var time

// function loadFunction() {
//     time = setTimeout(showPage,400);
// }

// function showPage() {
//     document.getElementById("loader").style.display = "none";
//     document.getElementById("loader").style.height = "0%";
//     document.getElementById("myPage").style.display = "block";
// }
//Définir l'interface
const searchBarFilter = document.querySelector('#search');

//check password 
function checkPassword() {
    //Récupération de l'id des inputs
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('passwordConfirm');
    //Si password = passConfirm alors password match
    if (password.value === passwordConfirm.value) {
        let changeIcons = document.getElementsByClassName("icons");
        let p;
        //Boucle pour changer l'icone croix par un icone validé
        for (p = 0; p < changeIcons.length; p++) {
            changeIcons[p].innerHTML = `<i class="fas fa-check-square"></i>`
        }
        console.log('mdp match');
    } else {
        console.log('mdp différent');
    }
}
checkPassword()

//check value 
let formValid = document.getElementById('connexion-modal-login');
let emailLogin = document.getElementById('email-login');
let missEmailLogin = document.getElementById('missEmailLogin');

formValid.addEventListener('click', validation);

function validation(event) {
    if (emailLogin.validity.valueMissing) {
        event.preventDefault();
        console.log('email invalide');
        // missEmailLogin.textContent = 'Email invalide';
        // missEmailLogin.style.color = 'red';
    }
}
validation()

