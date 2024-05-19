const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const trainRouteSchema = new Schema({
    id_chuyen_tau: { type: Number, required: true, unique: true },
    thoi_gian_bat_dau: { type: Date, required: true },
    ga_tau: { type: [String], required: true },
    id_tau: { type: Number, required: true }
}, { collection: 'ChuyenTau' });

module.exports = mongoose.model('ChuyenTau', trainRouteSchema, 'ChuyenTau');
