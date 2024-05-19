const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const officeSchema = new Schema({
    id_tru_so: { type: Number, required: true, unique: true },
    dia_chi: { type: String, required: true },
    sdt: { type: String, required: true }
}, {
    collection: 'TruSo'
});


module.exports = mongoose.model('TruSo', officeSchema, 'TruSo');
