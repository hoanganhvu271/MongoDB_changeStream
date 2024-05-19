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
        const customersCollection = mongoose.connection.collection('KhachHang');
        const ticketsCollection = mongoose.connection.collection('Ve');
        const changeStream = customersCollection.watch([{ $match: { operationType: 'delete' } }]);

        changeStream.on('change', async (next) => {
            try {
                // console.log(next.documentKey)
                const deletedCustomerId = next.fullDocument.id_khach_hang;
                await ticketsCollection.deleteMany({ id_khach_hang: deletedCustomerId });
            } catch (error) {
                console.error('Error processing change stream event:', error);
            }
        });

        changeStream.on('error', (error) => {
            console.error('Change stream error:', error);
        });

        changeStream.on('close', () => {
            console.warn('Change stream closed');
        });
    }
}

const database = new Database();
database.initialize();

module.exports = database;