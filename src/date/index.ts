/**
 * 获取这个月有多少天
 */
export const getMonthDay = ({ year, month }: { year?: number, month?: number } = {}) => {
  if (month && typeof month !== 'number') {
    throw new TypeError(`Expected \`month\` to be of type \`number\`, got \`${typeof month}\``);
  }

  if (year && typeof year !== 'number') {
    throw new TypeError(`Expected \`year\` to be of type \`number\`, got \`${typeof year}\``);
  }

  const now = new Date();
  month = month ? month : now.getUTCMonth();
  year = year ? year : now.getUTCFullYear();

  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
}