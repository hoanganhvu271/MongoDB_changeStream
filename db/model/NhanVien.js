const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
    id_nhan_vien: { type: Number, required: true, unique: true },
    ten_nhan_vien: { type: String, required: true },
    vai_tro: { type: String, required: true },
    id_tru_so: { type: Number, required: true },
    sdt: { type: String, required: true },
    cccd: { type: String, required: true }
}, { collection: 'NhanVien' });

module.exports = mongoose.model('NhanVien', employeeSchema, 'NhanVien');
