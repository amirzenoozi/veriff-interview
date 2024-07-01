import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const ResponseSchema = new mongoose.Schema(
	{
		uuid: {type: String, default: uuidv4},
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
