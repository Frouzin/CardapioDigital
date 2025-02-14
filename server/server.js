global.config = require('./config').get('dev');

const restify = require("restify");
const path = require("path");
const recursiveReaddir = require("recursive-readdir");
const { config } = require('process');

//Cria o servidor
const server = restify.createServer({
    name: 'Delivery',
    version: '1.0'
});

// Adiciona extensões do Restify para funcionamento do JSON nas requisições
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.urlEncodedBodyParser());

//Adiciona todas as rotas na inicialização do server. busca na pasta "Routes"
const pathFiles = path.resolve(path.resolve('./').concat('/server/routes'));

recursiveReaddir(pathFiles, ['!*.js'],(err, files) => {
    if(err){
        console.log(err);
        process.exit(1);
    }
    files.forEach(element => { require(element)(server) })
});

// Utilizado para não ter problema com requisições no Chrome(CORS)
server.use(
    function nocache(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Pragma", "no-cache");
        next();
    }
)

//Modifica o erro e mostra pro usuario uma mensagem personalizada
server.on('restifyError',function(req, res, err, callback){
    err.toJSON = function customToJSON(){
        return{
            Erro: 'Página não encontrada'
        }
    };
    return callback();
});

module.exports = Object.assign({ server,restify, config });