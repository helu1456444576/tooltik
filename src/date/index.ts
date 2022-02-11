import { padStart } from "./../string/index";

const ONE_SECOND = 1e3;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

interface SecondsFormatObject {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

type SecondFormatUnit = "D" | "DD" | "H" | "HH" | "m" | "mm" | "s" | "ss" | "SSS"

/**
 * 获取这个月有多少天
 */
export const getMonthDay = ({ year, month }: { year?: number, month?: number } = {}) => {
  if (month && typeof month !== "number") {
    throw new TypeError(`Expected \`month\` to be of type \`number\`, got \`${typeof month}\``);
  }

  if (year && typeof year !== "number") {
    throw new TypeError(`Expected \`year\` to be of type \`number\`, got \`${typeof year}\``);
  }

  const now = new Date();
  const newMonth = month || now.getUTCMonth();
  const newYear = year || now.getUTCFullYear();

  return new Date(Date.UTC(newYear, newMonth + 1, 0)).getUTCDate();
};

export const parseSeconds = (milliseconds: number): SecondsFormatObject => {
  return {
    days: Math.floor(milliseconds / ONE_DAY),
    hours: Math.floor((milliseconds % ONE_DAY) / ONE_HOUR),
    minutes: Math.floor((milliseconds % ONE_HOUR) / ONE_MINUTE),
    seconds: Math.floor((milliseconds % ONE_MINUTE) / ONE_SECOND),
    milliseconds: Math.floor(milliseconds % ONE_SECOND),
  };
};

export const formatSeconds = (formatter: string, timeData: SecondsFormatObject): string => {
  const {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  } = timeData;

  const matches: Record<SecondFormatUnit, string> = {
    D: String(days),
    DD: padStart(String(days), 2, "0"),
    H: String(hours),
    HH: padStart(String(hours), 2, "0"),
    m: String(minutes),
    mm: padStart(String(minutes), 2, "0"),
    s: String(seconds),
    ss: padStart(String(seconds), 2, "0"),
    SSS: padStart(String(milliseconds), 3, "0"),
  };

  return formatter.replace(
    REGEX_FORMAT,
    (match: string, $1: string) => $1 || matches[match as SecondFormatUnit],
  );
};
