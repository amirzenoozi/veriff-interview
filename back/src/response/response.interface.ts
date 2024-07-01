export interface Result {
	checkId: string;
	result: string;
}

export interface Response {
	uuid: string;
	verificationUuid: string;
	created_at: Date;
	deleted_at?: Date;
	results: Result[];
}
