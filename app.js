//Définir l'interface
const searchBarFilter = document.querySelector('#search');

//Application
searchBar()
function searchBar() {
    //Barre de recherche 
    searchBarFilter.addEventListener('keyup', resultatRecherche);
    //console.log(resultatRecherche);
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
    var input, filter,voitures, div,i,txtValue, tet;
    input = document.getElementById('search')
    filter = input.value.toLowerCase()
    voitures = document.getElementById('voitures')
    div = voitures.getElementsByTagName('div')
    for(i = 0; i < div.length; i++){
        tet = div[i].getElementsByTagName('h3')[0]
        txtValue = tet.textContent || a.innerText
        if(txtValue.toLowerCase().indexOf(filter) > -1){
            div[i].style.display = ''
        }else{
            div[i].style.display = 'none'
        }
    }
}