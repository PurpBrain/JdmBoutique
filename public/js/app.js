//Définir l'interface
const searchBarFilter = document.querySelector('#search');

//Barre de recherche 
// search.addEventListener('keydown', function (event) {
//     if (event.keyCode === 13) {
//         searchData()
//     } else return;
// })

// function searchData(event) {
//     this.search = event.target.value
//     console.log(this.search)
//     console.log(this.filter)
//     this.empService.searchData(this.search).subscribe((res) => {
//         console.log("Filter Response", res);
//         if (res) {
//             this.voiture = res
//             if (res.length === 0) {
//                 this.noData = true
//             } else {
//                 this.noData = false
//             }
//         }
//     },
//         (err) => {
//             console.log(err);
//             console.log("error")
//         })
// }

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

