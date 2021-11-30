//Définir l'interface
const searchBarFilter = document.querySelector('#search');

//Application
searchBar()
function searchBar() {
    //Barre de recherche 
    searchBarFilter.addEventListener('keyup', resultatRecherche);
}

//Local Storage
function saveUser() {
    let addUser = document.getElementById('dname').value;
    localStorage.setItem('userName', addUser)
}

//Dark mode 
function darkMode() {

    // Background
    let modeDark = document.body;
            
    // Text
    let allBlackTheme = document.querySelectorAll("h1, h2, h3, label, input"); 
    let textWhite;
    var element = document.getElementById("ziak");

    if(element.style.color == 'white'){
        for (textWhite = 0; textWhite < allBlackTheme.length; textWhite++) {
            allBlackTheme[textWhite].style.color = 'black';
            modeDark.classList.remove("dark-mode");
            modeDark.classList.add("no-dark-mode");

        }
    } else {
        for (textWhite = 0; textWhite < allBlackTheme.length; textWhite++) {
            allBlackTheme[textWhite].style.color = 'white';
            modeDark.classList.add("dark-mode");
            
        }
    } 
}
// Barre de recherche fonction
function resultatRecherche(e) {
    const contenuClavier = e.target.value.toLowerCase();
    document.querySelectorAll('.product-item').forEach(
        function(tache) {
            const motCle = tache.firstChild.textContent
            if (motCle.toLocaleLowerCase().indexOf(contenuClavier)!= -1) {
                tache.getElementsByClassName.display = 'block'
            } else {
                tache.style.display = 'none'
            } 
        }
    )
}