import mongoose, { Schema, Document } from "mongoose";

export interface IContribution  {
  name: string;
  amount: number;
  description?: string;
  startTime?: Date;
  endTime?: Date;
}

const ContributionSchema: Schema = new mongoose.Schema(
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

const Contribution:mongoose.Model<IContribution> = mongoose.models.Contribution || mongoose.model<IContribution>("Contribution", ContributionSchema);

export default Contribution;
