// import mongoose, { Schema, Document, ObjectId } from "mongoose";

// export interface IIndividual  {
//     firstname: string;
//     lastName: string;
//     address: string;
//     CCCD: string;
//     household?: ObjectId;
// }

// const IndividualSchema: Schema = new mongoose.Schema(
//     {
//         firstname: {
//             type: String,
//             required: true,
//         },
//         lastName: {
//             type: String,
//             required: true,
//         },
//         address: {
//             type: String,
//             required: true,
//         },
//         CCCD: {
//             type: String,
//             required: true,
//         },
//         household: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Household",
//         }
//     },
//     {
//         timestamps: true,
//     }
// );

// const Individual:mongoose.Model<IIndividual> = mongoose.models.Individual || mongoose.model<IIndividual>("Individual", IndividualSchema);

// export default Individual;
