export interface Exception extends Error {
  code: number
  details: any
  error_code?: string,
}
