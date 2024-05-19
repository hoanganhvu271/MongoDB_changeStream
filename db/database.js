let mongoose = require('mongoose');

const mongodb_url = 'mongodb://localhost:28081/btl'

class Database {
    constructor() {
        this._connectPromise = this._connect();
    }

    async initialize() {
        await this._connectPromise;
        this.setupChangeStream();
    }

    _connect() {
        return mongoose.connect(mongodb_url, { useNewUrlParser: true })
            .then(() => {
                console.log("Database connection successfully!");
            })
            .catch(err => {
                console.log("Database connection error!");
            })
    }

    setupChangeStream() {
        const ticketsCollection = mongoose.connection.collection('Ve');
        const customersCollection = mongoose.connection.collection('KhachHang');

        const changeStream = ticketsCollection.watch([{ $match: { operationType: 'insert' } }]);

        changeStream.on('change', async (next) => {
            try {
                console.log("New ticket inserted:", next.fullDocument);
                const customerId = next.fullDocument.id_khach_hang;

                const customerExists = await customersCollection.findOne({ id_khach_hang: customerId });
                if (!customerExists) {
                    const newCustomer = {
                        id_khach_hang: customerId,
                        ten_khach_hang: "Vu",
                        sdt: "01272521",
                        email: "hoanganhvu271103@gmail.com",
                        cccd: "00928272"
                    };

                    await customersCollection.insertOne(newCustomer);
                    console.log("New customer added:", newCustomer);
                } else {
                    console.log("Customer already exists:", customerExists);
                }
            } catch (error) {
                console.error('Error processing change stream event:', error);
            }
        });

        changeStream.on('error', (error) => {
            console.error('Change stream error:', error);
            this.setupChangeStream();
        });

        changeStream.on('close', () => {
            console.warn('Change stream closed');

            this.setupChangeStream();
        });
    }

}

const database = new Database();
database.initialize();

module.exports = database;