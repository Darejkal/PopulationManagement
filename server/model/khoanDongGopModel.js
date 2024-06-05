const mongoose = require("mongoose");
const khoanDongGopSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
        },
        startTime: {
          type: Date,
        },
        endTime: {
          type: Date,
        },
      },
      {
        timestamps: true,
      }
    );
module.exports = mongoose.models.KhoanDongGop || mongoose.model("KhoanDongGop",khoanDongGopSchema)