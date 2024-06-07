import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IContributionHouseholdRel  {
    household: ObjectId;
    contribution: ObjectId;
    paymentTime?: Date;
    amount?: number;
    status?: boolean;
    relList?: ObjectId;
}

const ContributionHouseholdRelSchema: Schema = new mongoose.Schema(
    {
        household: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Household",
            required: true
        },
        contribution: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contribution",
            required: true
        },
        paymentTime: {
            type: Date,
        },
        amount: {
            type: Number,
        },
        status: {
            type: Boolean,
            default: false,
        },
        relList: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RelList",
        },
    }
);

const ContributionHouseholdRel: mongoose.Model<IContributionHouseholdRel> = mongoose.models.ContributionHouseholdRel || mongoose.model<IContributionHouseholdRel>("ContributionHouseholdRel", ContributionHouseholdRelSchema);

export default ContributionHouseholdRel;
