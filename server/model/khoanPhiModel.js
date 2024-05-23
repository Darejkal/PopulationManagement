const mongoose = require("mongoose");
const khoanPhiSchema = new mongoose.Schema(
    {
        ID: {
            type: String,
            required: true,
            unique: true
        },
        tenPhi: {
            type: String,
            required: true
        },
        donGia: {
            type: Number,
            required: true
        },
        chatLuong: {
            type: String,
            required: true
        }
    }
)
module.exports = mongoose.models.KhoanPhi || mongoose.model("KhoanPhi",khoanPhiSchema)