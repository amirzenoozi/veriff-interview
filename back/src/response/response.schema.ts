import * as mongoose from 'mongoose';

export const ResponseSchema = new mongoose.Schema(
  {
    verificationUuid: String,
    results: [
      {
        checkId: String,
        result: String, // 'yes' or 'no'
      },
    ],
  },
  { versionKey: false },
);
