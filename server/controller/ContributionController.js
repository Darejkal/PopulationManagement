const Contribution = require("../model/khoanDongGopModel");
const asyncHandler = require("express-async-handler");

const getAllContributions = asyncHandler(async (req, res) => {
  try {
    const contributions = await Contribution.find();
    res.status(200).send({
      contributions,
      message: "Get Contributions successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateContributions = asyncHandler(async (req, res) => {
  try {
    await Contribution.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).send({
      message: "update contribution success",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const createContributions = asyncHandler(async (req, res) => {
  try {
    await Contribution.create({
      ...req.body,
      startTime: new Date(req.body.startTime),
      endTime: new Date(req.body.endTime),
    });
    res.status(201).send({
      message: "create contribution success",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteContributions = asyncHandler(async (req, res) => {
  try {
    await Contribution.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: "delete contribution success",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getAllContributions,
  updateContributions,
  createContributions,
  deleteContributions,
};
