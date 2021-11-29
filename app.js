function saveUser() {
    let addUser = document.getElementById('dname').value;
    //console.log(addUser);
    localStorage.setItem('userName', addUser)
}
function darkMode() {
    // Background
    let modeDark = document.body;
    
    //console.log('mode dark', modeDark)
    
    
    // Text
    let allBlackTheme = document.querySelectorAll("h1, h2, h3, label, input"); 
    let textWhite;
    //console.log('test', allBlackTheme[0].style)
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
     
    //console.log(allBlackTheme);
}
