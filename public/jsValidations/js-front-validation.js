window.addEventListener("load", function(){
    let formularioRegister = document.querySelector("form.register")

    formularioRegister.addEventListener("submit", function(e){

        let errores = [];
        let ulErrores = document.querySelector("div.errores ul")

        let campoNombre = document.querySelector("input#first_Name")
        
        if (campoNombre.value == "") {
            errores.push("El campo nombre es obligatorio");
        } else if (campoNombre.value.length < 2){
            errores.push("El campo nombre debe tener al menos 2 caracteres");
        }

        let campoEmail = document.querySelector("input#email")

        if (campoEmail.value == ""){
            errores.push("El campo email es obligatorio");
        } else if (campoEmail.value.indexOf("@") == -1 && campoEmail.value.indexOf(".") == -1){
            errores.push("El campo email debe contener @ y .");
        } 

        let campoPassword = document.querySelector("input#password")

        if (campoPassword.value == "") {
            errores.push("La contraseña es obligatoria");
        } else if (campoPassword.value.length < 8){
            errores.push("La contraseña debe contener por lo menos 8 caracteres");
        }

        if (errores.length > 0 ){
            e.preventDefault();

            for (let i = 0; i< errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }
    });
})

function actualizarInputFile() {
    var filename = "'" + this.value.replace(/^.*[\\\/]/, '') + "'";
    this.parentElement.style.setProperty('--fn', filename);
    }
    
    document.querySelectorAll(".file-select input").forEach((ele)=>ele.addEventListener('change', actualizarInputFile));