window.addEventListener('load',function(){
    let formularioLogin = document.querySelector('form.FormLogin')
    
    formularioLogin.addEventListener("submit", function(event){
        
        let errors = []

        let campoEmail = document.querySelector('input#email')
        console.log(campoEmail)
        if (campoEmail.value == ''){
            errors.push('El campo del email debe estar completo')
        } 

        if (campoEmail.value.indexOf('@') == -1){
            errors.push('El campo del email debe ser valido')
        } 

        let campoPassword = document.querySelector('input#pass')
        console.log(campoPassword)
        if (campoPassword.value == ''){
            errors.push('El campo de contraseña debe estar completo')
        }
        
        if (errors.length > 0){
            event.preventDefault()
            
            let ulErrors = document.querySelector('div.errors ul')
            ulErrors.innerHTML = ''
            for (let index = 0; index < errors.length; index++) {
                
                ulErrors.innerHTML += "<li>"+ errors[index] + "</li>"
                
            }
            
        }
        
    })
    
    console.log('funca')
})