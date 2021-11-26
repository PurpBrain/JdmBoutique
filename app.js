function saveUser() {
    let addUser = document.getElementById('dname').value;
    console.log(addUser);
    localStorage.setItem('userName', addUser)
}
