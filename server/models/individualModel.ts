// import mongoose, { Schema, Document, ObjectId } from "mongoose";

// export interface IIndividual  {
//     firstName: string;
//     lastName: string;
//     address: string;
//     identifyCardId: string;
//     household?: ObjectId;
// }

// const IndividualSchema: Schema = new mongoose.Schema(
//     {
//         firstName: {
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
//         identifyCardId: {
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
