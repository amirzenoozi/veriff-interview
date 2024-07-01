export interface Result {
	checkId: string;
	result: string;
}

export interface Response {
	verificationUuid: string;
	created_at: Date;
	deleted_at?: Date;
	results: Result[];
}
