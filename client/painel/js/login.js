document.addEventListener("DOMContentLoaded", function(event){
    login.event.init();
});

var login = {};

login.event = {

    init:() => {
        document.querySelector("#btnLogin").onclick = () => {
            login.method.validarLogin();
        }

    }

}

login.method = {

    //Valida os campos
    validarLogin : () => {
        let email = document.querySelector('#txtEmailLogin').value.trim();
        let senha = document.querySelector('#txtSenhaLogin').value.trim();

        if(email.length == 0){
            alert("Informe o Email, por favor.");
            document.querySelector("#txtEmailLogin").focus();
            return;
        }

        if(senha.length == 0){
            alert("Informe a Senha, por favor.");
            document.querySelector("#txtSenhaLogin").focus();
            return;
        }

        login.method.login(email,senha);

    },

    //metodo que gaz o login (via API)
    login: (email, senha) => {

        var dados = {
            email:email,
            senha:senha
        }
        app.method.post('/login', JSON.stringify(),
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);

            }    
        )
    }

}