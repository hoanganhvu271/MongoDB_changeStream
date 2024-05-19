const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
    id_ghe: { type: Number, required: true },
    loai_ghe: { type: String, required: true },
    trang_thai: { type: Number, required: true }
}, { _id: false });


const trainSchema = new Schema({
    id_tau: { type: Number, required: true, unique: true },
    ten_tau: { type: String, required: true },
    ghe: [seatSchema]
}, { collection: 'Tau' });

module.exports = mongoose.model('Tau', trainSchema, 'Tau');
