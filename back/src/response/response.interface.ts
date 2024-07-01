export interface Response {
	verificationUuid: string;
	created_at: Date;
	deleted_at?: Date;
	results: {
		checkId: string;
		result: string; // 'yes' or 'no'
	}[];
}
