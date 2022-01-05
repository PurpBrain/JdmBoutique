function getValue() { 
    var value = document.getElementById('monSelecteur').value; 
    if ( value == 'croissant' ){
        prixCroissant()
        }
    }  

function prixCroissant() {
    fetch("http://localhost:3000/assets/data/db.json")
        .then(x => x.json())
        .then(data => sortCroissant(data.fiche));
}

function sortCroissant(data) {

    const arry = [];
    for (i = 0; i < data.length; i++) {

        const obj = {
            id: data[i].id,
            price: data[i].price,
        }
        arry.push(obj)
    }

    setTimeout(function () {
        triageDivCroissant()
    }, 500);

    function triageDivCroissant() {
        arry.sort(function (a, b) { return a.price - b.price })
        for (i = 0; i < arry.length; i++) {
            document.getElementById(`voiture-${arry[i].id}`).style.order = `${i}`
        }
    }
}