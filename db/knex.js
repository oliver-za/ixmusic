const knex = require('knex');

const connectedKnex = knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: 'ixmusic.sqlite3'
    }
})

module.exports = connectedKnex;