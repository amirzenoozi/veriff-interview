import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const VerificationSchema = new mongoose.Schema(
  {
    uuid: { type: String, default: uuidv4 },
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    questions: [
      {
        id: String,
        priority: Number,
        description: String,
      },
    ],
  },
  { versionKey: false },
);
