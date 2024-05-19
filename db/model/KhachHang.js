const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    id_khach_hang: { type: Number, required: true, unique: true },
    ten_khach_hang: { type: String, required: true },
    sdt: { type: String, required: true },
    email: { type: String, required: true },
    cccd: { type: String, required: true }
}, { collection: 'KhachHang' });

module.exports = mongoose.model('KhachHang', customerSchema, 'KhachHang');
