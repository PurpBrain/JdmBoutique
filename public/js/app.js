//Dark mode 
function darkMode() {

    //Variable pour changer le Background
    let background = document.body;

    //Variable pour changer le Texte
    let txt = document.querySelectorAll("h1, h2, h3, label, input");
    let i;

    //Récupération de l'id pour changer la couleur du txt
    var element = document.getElementById("texte");

    //Si texte blanc alors on change en noir et on désactive le dark mode
    if (element.style.color == 'white') {
        for (i = 0; i < txt.length; i++) {
            txt[i].style.color = 'black';
            background.classList.remove("dark-mode");
            background.classList.add("no-dark-mode");

        }
        //Sinon on met le text en blanc et on active le dark mode  
    } else {
        for (i = 0; i < txt.length; i++) {
            txt[i].style.color = 'white';
            background.classList.add("dark-mode");

        }
    }
}
//Définir l'interface
const searchBarFilter = document.querySelector('#search');

//Barre de recherche 
search.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        resultatRecherche()
    } else return;
})

// Barre de recherche fonction
function resultatRecherche(e) {
    //Déclarer les variables
    var input, filter, voitures, div, o, txtValue, titre;
    //Donner des valeurs aux variables
    input = document.getElementById('search')
    filter = input.value.toLowerCase()
    voitures = document.getElementById('voitures')
    div = voitures.getElementsByTagName('div')

    for (o = 0; o < div.length; i++) {
        titre = div[o].getElementsByTagName('h3')[0]
        txtValue = titre.textContent || a.innerText
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            div[o].style.display = ''
        } else {
            div[o].style.display = 'none'
        }
    }
}
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