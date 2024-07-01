export interface Verification {
  uuid: string;
  created_at: Date;
  deleted_at?: Date;
  questions: {
    id: string;
    priority: number;
    description: string;
  }[];
}
