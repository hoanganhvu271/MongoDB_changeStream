const Ve = require('../db/model/Ve');

//
const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ve.find();
        res.render('home', { tickets: tickets });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const renderAddNewTickets = async (req, res) => {
    res.render('addTicket')
}


const addNewTickets = async (req, res) => {
    try {
        const { id_ve, id_chuyen_tau, id_nhan_vien, id_khach_hang, id_tru_so, gia_ve, id_ghe } = req.body;

        const newTicket = new Ve({
            id_ve: id_ve,
            id_chuyen_tau: id_chuyen_tau,
            id_nhan_vien: id_nhan_vien,
            id_khach_hang: id_khach_hang,
            id_tru_so: id_tru_so,
            gia_ve: gia_ve,
            id_ghe: id_ghe
        });

        await newTicket.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = addNewTickets;

module.exports = {
    getAllTickets, addNewTickets, renderAddNewTickets
};
