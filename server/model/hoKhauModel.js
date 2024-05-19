const mongoose = require("mongoose");

const hoKhauSchema = new mongoose.Schema(
    {
        ID: {
            type: String,
            required: true,
            unique: true,
        },

        idChuHo: {
            type: String,
            required: true,
        },

        idCanHo: {
            type: String,
            required: true
        },

        maHoKhau: {
            type: String,
            required: true,
            unique: true
        },

        maKhuVuc: {
            type: String,
            required: true
        },

        diaChi: {
            type: String,
            required: true
        },
        
    }
)

module.exports = mongoose.models.HoKhau || mongoose.model("HoKhau",hoKhauSchema)