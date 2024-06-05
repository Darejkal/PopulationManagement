const Fee = require('../model/khoanPhiModel');
const asyncHandler = require("express-async-handler");

const getAllFee = asyncHandler(async (req, res) => {
    try {
      const fees = await Fee.find();
      res.status(200).send({
        fees,
        message: "Get all fees Successfully",
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const updateFee = asyncHandler(async (req, res) => {
    try {
      await Fee.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).send({
        message: "update fee success",
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const createFee = asyncHandler(async (req, res) => {
    try {
      await Fee.create(req.body);
      res.status(201).send({
        message: "create fee success",
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deleteFee = asyncHandler(async (req, res) => {
    try {
      await Fee.deleteOne({ _id: req.params.id });
      res.status(200).send({
        message: "delete fee success",
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  
  module.exports = { getAllFee, updateFee, deleteFee, createFee };
  