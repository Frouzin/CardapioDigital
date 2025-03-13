const { get } = require("../../server/config");

var app = {};

app.event = {

}

app.method = {

    //centraliza as chamades de get
    get: (url, callbackSuccess, callbackError, login = false) => {
        try{

            if (app.method.validaToken(login)) {

                let xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.setRequestHeader("Content-Type", "application/json;charset = utf-8");
                xhr.setRequestHeader("Authorization", app.method.obterValorStorage('token'));

                xhr.onreadystatechange = function () {
                    if(this.readyState == 4){
                        if(this.status == 200){
                            return callbackSuccess(JSON.parse(xhr.responseText))
                        }
                        else{
                            //se o retorno for não autrorizado, redireciona para o login
                            if(xhr.status == 401) {
                                app.method.logout();
                            }
                            return callbackError(xhr.responseText);
                        }
                    }
                }
            }

        }catch (error){

        }

    },

    //metodo para validar a existencia do token(local)
    validaToken: (login = false) => {

        var tokenAtual = app.method.obterValorStorage('token');

        if((tokenAtual == undefined || tokenAtual == null || tokenAtual == "" || tokenAtual == "null" && !login)) {
            window.location.href = '/painel/login.html';
            return false;
        }

        return true;
    },

    //grava valores no local storage
    gravarValorStorage: (valor, local) => {
        localStorage[local] = valor;
    },

    //obtem um valor do localStorage
    obterValorStorage: (local) => {
        return localStorage[local];
    },

    //limpa o localstorage e redireciona para o login
    logout: ()=>{
        localStorage.clear();
        window.location.href = '/painel/login.html';
    }

}