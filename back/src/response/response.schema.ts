import * as mongoose from 'mongoose';

export const ResponseSchema = new mongoose.Schema(
	{
		verificationUuid: String,
		created_at: {type: Date, default: Date.now},
		deleted_at: {type: Date, default: null},
		results: [
			{
				checkId: { type: String, required: true },
				result: { type: String, required: true }, // 'yes' or 'no'
			},
		],
	},
	{versionKey: false},
);
