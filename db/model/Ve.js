const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ticketSchema = new Schema({
    id_ve: { type: Number, required: true },
    id_chuyen_tau: { type: Number, required: true },
    id_nhan_vien: { type: Number, required: true },
    id_khach_hang: { type: Number, required: true },
    id_tru_so: { type: Number, required: true },
    gia_ve: { type: Number, required: true },
    id_ghe: { type: Number, required: true }
}, { collection: 'Ve' });

module.exports = mongoose.model('Ve', ticketSchema, 'Ve');
