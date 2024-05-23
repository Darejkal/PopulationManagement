const mongoose = require("mongoose");
const khoanDongGopSchema = new mongoose.Schema(
    {
        ID: {
            type: String,
            required: true,
            unique: true
        },
        
        tenKhoanDongGop: {
            type: String,
            required: true
        },
    }
)
module.exports = mongoose.models.KhoanDongGop || mongoose.model("KhoanDongGop",khoanDongGopSchema)