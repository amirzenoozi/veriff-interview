export interface Response {
  verificationUuid: string;
  results: {
    checkId: string;
    result: string; // 'yes' or 'no'
  }[];
  surveyConnection: string;
}
