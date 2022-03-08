export const MOBILE_RE = /^1[3456789]\d{9}$/;

export const NUMBER_RE = /\d/;
export const LOWER_WORD_RE = /[a-z]/;
export const UPPER_WORD_RE = /[A-Z]/;
export const LENGTH_RE = /^[a-zA-Z0-9]{8,16}$/;
export const STRONG_PASSWORD_RE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/;
export const EMAIL_RE = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export const ID_CARD_RE = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
