export interface ApiErrorResponse {
  error: string;
  message: string;
  fields: Record<string, string>;
}
