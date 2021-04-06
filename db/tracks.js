const knex = require('./knex');

function createTrack(track) {
    return knex('tracks').insert(car);
};

function getAllTracks() {
    return knex('tracks').select('*')
}

function deleteTrack(id) {
    return knex('tracks').where('id', id).del();
}

function updateTrack(id, track) {
    return knex('tracks').where('id', id).update(track)
}

module.exports = {
    createTrack,
    getAllTracks,
    deleteTrack,
    updateTrack
}