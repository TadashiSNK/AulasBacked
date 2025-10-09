import express from 'express'

const route = express.Router()


route.post("/", (request, response) => {
    const { name, email, password, typeUser } = request.body;

    if(name.length  < 2){
        return response.send("O nome precisa ter mais de 2 caracteres")
    }

    if(!email.includes("@")){
        return response.send("O email precisa ter '@'")
    }

    if(!(password.length >= 6 && password.length <= 10)){
        return response.send("A senha precisa ter no minimo 6 caracters e no maximo 10")
    }

    if (typeUser != "admin" && typeUser != "comum"){
        return response.send("o tipo de usuario só pode ser 'admin' ou 'comum'")
    }

    response.send(`Usuario ${name} cadastrado`)
})

export default route;