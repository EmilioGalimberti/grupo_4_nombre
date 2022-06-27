window.addEventListener('load',function(){
    let formularioCreate = document.querySelector('form.formCreate')
    
    formularioCreate.addEventListener("submit", function(event){
        
        let errors = []

        let campoNombre = document.querySelector('input#name')
        console.log(campoNombre)
        if (campoNombre.value == ''){
            errors.push('El campo del name no debe estar vacio')
        } 

        if (campoNombre.value.length < 5){
            errors.push('El campo nombre debe tener almenos 5 caracteres')
        } 

        let campoDescripcion = document.querySelector('textarea#description')
        console.log(campoDescripcion)
        
       
        
        if (campoDescripcion.value.length < 20){
            errors.push('El campo de descripcion debe tener almenos 20 caracteres')
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