const Ve = require('../db/model/Ve');
const TruSo = require('../db/model/TruSo');
const NhanVien = require('../db/model/NhanVien');
const ChuyenTau = require('../db/model/ChuyenTau');
const KhachHang = require('../db/model/KhachHang');
const mongoose = require('mongoose');

const getHome = async (req, res) => {
    try {
        const truso = await TruSo.find();
        res.render('home', { truso: truso });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const renderAddNewTickets = async (req, res) => {
    var idTruSo = req.query.id_tru_so;
    const nhanVienList = await NhanVien.find({ id_tru_so: idTruSo });
    const chuyenTauList = await ChuyenTau.find();

    res.render('addTicket', { idtruso: idTruSo, nhanvien: nhanVienList, chuyentau: chuyenTauList })
}


const addNewTickets = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { id_ve, id_chuyen_tau, id_nhan_vien, gia_ve, id_ghe, id_tru_so, cccd, ten_khach_hang, sdt, email } = req.body;

        var khachHang = await KhachHang.findOneAndUpdate(
            { cccd: cccd },
            { cccd: cccd, ten_khach_hang: ten_khach_hang, sdt: sdt, email: email },
            { upsert: true, new: true, session: session }
        );
        // console.log(khachHang);

        const ticket = new Ve({
            id_ve,
            id_chuyen_tau,
            id_nhan_vien,
            id_khach_hang: cccd,
            id_tru_so,
            gia_ve,
            id_ghe
        });

        await ticket.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).send('Ticket added successfully!');
    } catch (error) {

        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = addNewTickets;

module.exports = {
    getHome, addNewTickets, renderAddNewTickets
};
