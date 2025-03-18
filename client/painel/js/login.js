document.addEventListener("DOMContentLoaded", function (event) {
    login.event.init();
});

var login = {};

login.event = {

    init: () => {

        document.querySelector("#btnLogin").onclick = () => {
            login.method.validarLogin();
        }

    }

}

login.method = {

    // Valida os campos
    validarLogin: () => {

        let email = document.querySelector("#txtEmailLogin").value.trim();
        let senha = document.querySelector("#txtSenhaLogin").value.trim();

        if (email.length == 0) {
            alert("Informe o e-mail, por favor.");
            document.querySelector("#txtEmailLogin").focus();
            return;
        }

        if (senha.length == 0) {
            alert("Informe a senha, por favor.");
            document.querySelector("#txtSenhaLogin").focus();
            return;
        }

        login.method.login(email, senha);

    },

    // método que faz o login (via API)
    login: (email, senha) => {

        var dados = {
            email: email,
            senha: senha
        }

        app.method.post('/login', JSON.stringify(dados),
            (response) => {
                
                if (response.status == 'error') {
                    app.method.mensagem(response.message);
                    return;
                }
                if (response.status == "success"){
                    app.method.gravarValorStorage(response.TokenAcesso, "token");
                    app.method.gravarValorStorage(response.Nome, "Nome");
                    app.method.gravarValorStorage(response.Email, "Email");
                    app.method.gravarValorStorage(response.Logo, "Logo");

                    window.location.href = "/painel/home.html";
                }
            },
            (error) => {
                console.log(error);
            }, true
        )

    }

}