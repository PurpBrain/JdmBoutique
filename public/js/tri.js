// Récupération de la valeur dans le selecteur 
function getValue() {
    var value = document.getElementById('monSelecteur').value;
    if (value == 'croissant') {
        prixCroissant()
    }
    if (value == 'décroissant') {
        prixDécroissant()
    }
}

function prixCroissant() {
    // Récupération de la db
    fetch("/assets/data/db.json")
        .then(x => x.json())
        .then(data => sortCroissant(data.fiche));
    
    // Fonction pour sortir par ordre croissant les prix de voitures 
    function sortCroissant(data) {

        const arry = [];
        // Boucle pour créer une db virtuel 
        for (i = 0; i < data.length; i++) {

            const obj = {
                id: data[i].id,
                price: data[i].price,
            }
            // Ajout de chaque objet 
            arry.push(obj)
        }

        // Délai pour ne pas exécuter les fonctions en même temps  
        setTimeout(function () {
            // Exécution de la fonction "triageDivCroissant()" après 0.5s
            triageDivCroissant()
        }, 500);// Réglage du temps d'exécution en milliseconde


        // Fonction pour trier le tableau virtuel
        function triageDivCroissant() {
            // Tri par prix croissant
            arry.sort(function (a, b) {
                return a.price - b.price
            })
            console.log(arry)
            // Boucle pour définir l'odre des div
            for (i = 0; i < arry.length; i++) {
                console.log("id div : ",arry[i].id, "ordre de la div: ",i)
                // "arry[i].id" = id défini dans la div
                // "i" = l'ordre des div 
                document.getElementById(`voiture-${arry[i].id}`).style.order = `${i}`;
            }
        }
    }
}

function prixDécroissant() {
    fetch("/assets/data/db.json")
        .then(x => x.json())
        .then(data => sortDécroissant(data.fiche));

    function sortDécroissant(data) {

        const arry = [];
        for (i = 0; i < data.length; i++) {

            const obj = {
                id: data[i].id,
                price: data[i].price,
            }
            arry.push(obj)
        }

        setTimeout(function () {
            triageDivDécroissant()
        }, 500);

        function triageDivDécroissant() {
            arry.sort(function (a, b) {
                // Tri dans l'ordre décroissant 
                return b.price - a.price
            })
            for (i = 0; i < arry.length; i++) {
                document.getElementById(`voiture-${arry[i].id}`).style.order = `${i}`
            }
        }
    }
}