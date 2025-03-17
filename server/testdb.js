const mysql = require('mysql2/promise');

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Ma40028922',
            database: 'burguer'
        });

        console.log('✅ Conectado com sucesso ao banco `burguer`!');
        const [rows] = await connection.query('SHOW TABLES');
        console.log('🗃️  Tabelas:', rows);

        await connection.end();

    } catch (err) {
        console.error('❌ Erro na conexão:', err.message);
    }
}

testConnection();
