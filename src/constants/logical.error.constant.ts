const LOGICAL_ERRORS = {
  NOT_FOUND_ERROR: { error_code: 'NOT_FOUND_ERROR', message: 'Not found error', code: 404 },
  UNAUTHORIZED_ERROR: { error_code: 'UNAUTHORIZED_ERROR', message: 'Unauthorized', code: 401 },
  TOKEN_INVALID_ERROR: { error_code: 'TOKEN_INVALID_ERROR', message: 'Token invalid', code: 401 },
  EMAIL_VERIFED: { error_code: 'EMAIL_VERIFED', message: 'Email verified' },
  EMAIL_IS_NOT_VERIFED: { error_code: 'EMAIL_IS_NOT_VERIFED', message: 'Email is not verified' },
  DUPLICA_EMAIL: { error_code: 'EMAIL_DUPLICATION', message: 'Email duplication', code: 409 },
};

export {
  LOGICAL_ERRORS,
};
