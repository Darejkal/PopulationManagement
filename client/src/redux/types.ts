type IFee = {
	_id?: string;
	name: string;
	amount: number;
	description?: string;
	useremail?: string;
	frequency?: "yearly" | "monthly";
	houseType: "Penhouse"|"House"|"Kiot"|"Underground"|"All"|"Individual";
	weight:"None"|"HouseSize"
};
type IContribution = {
	_id?: string;
	name: string;
	amount: number;
	description?: string;
	startTime?: string;
	endTime?: string;
};
type IContributionHouseholdRel = {
	_id?: string;
	household: string;
	contribution: string;
	paymentTime?: Date;
	amount?: number;
	status?: boolean;
	relList?: string;
};
type IContributionHouseholdRelPopulated = Omit<
	IContributionHouseholdRel,
	"household" | "contribution" | "relList"
> & {
	household: {
		name?: string;
		area: number;
		address: string;
		owner?: string;
		memberNumber?: string;
	};
	contribution: {
		name: string;
		amount: string;
		description?: string;
		feeType?: ["Household", "Individual"];
		frequency?: ["yearly", "monthly"];
	};
	relList?: {
		name?: string;
		creator?: string;
		type?: string;
	};
};
type IHousehold = {
	name?: string;
	area: number;
	address: string;
	owner?: string;
	memberNumber?: string;
};
interface IUser {
	email: string;
	password: string;
	firstname: string;
	lastname: string;
	phoneNumber: string;
	household?: string;
	CCCD?: string;
	sex: string;
	position: "Admin" | "User";
	status?: string;
}
// type IIndividual={
//     firstname: string;
//     lastName: string;
//     address: string;
//     CCCD: string;
//     household?: string;
// }
type IRelList = {
	_id?: string;
	name?: string;
	creator?: string;
	type?: string;
};
type IFeeHouseholdRel = {
	_id?: string;
	paymentTime: string;
	amount: string;
	status: string;
	household: string;
	fee: string;
	relList: string;
};
type IFeeHouseholdRelPopulated = {
	household: IHousehold;
	fee: IFee;
	relList: IRelList;
} & Omit<IFeeHouseholdRel, "household" | "fee" | "relList">;
