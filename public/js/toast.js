// Script pour les toasts (flash)
var toastTrigger = document.getElementById('Btncontc')
    var toastLiveExample = document.getElementById('po')
    if (toastTrigger) {
        toastTrigger.addEventListener('click', function () {
            var toast = new bootstrap.Toast(toastLiveExample)
            toast.show()
        })
    }  