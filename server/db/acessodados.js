const mysql = require('mysql2/promise');

module.exports = class AcessoDados {

    async Query(SqlQuery, parametros) {

        let connection;

        try {
            let SqlQueryUp = SqlQuery;

            // percorre os parametros
            if (parametros && parametros != undefined) {
                let p = parametros;

                for (let key in p) {
                    if (p.hasOwnProperty(key)) {
                        let campo = key;
                        let valor = p[key];

                        // Se for string, adiciona aspas simples
                        if (typeof valor === 'string') {
                            valor = `'${valor}'`;
                        }

                        SqlQueryUp = SqlQueryUp.replace('@' + campo, valor);
                    }
                }
            }

            connection = await mysql.createConnection(global.config.database);

            const [results] = await connection.query(SqlQueryUp);

            return results;

        } catch (error) {
            console.error('❌ Erro na Query:', error);
            return error;

        } finally {
            if (connection) {
                await connection.end();
            }
        }

    }

}
