export function formatNumber(num) {
  let prefix = "";
  let number;
  if (num >= 1_000_000_000) {
    prefix = "B";
    number = (num / 1_000_000_000).toFixed(1).replace(/\.0$/, ""); // Billion
  } else if (num >= 1_000_000) {
    prefix = "M";
    number = (num / 1_000_000).toFixed(1).replace(/\.0$/, ""); // Million
  } else if (num >= 1_000) {
    prefix = "K";
    number = (num / 1_000).toFixed(1).replace(/\.0$/, ""); // Thousand
  } else {
    number = num; // Less than 1,000
  }
  number = Math.max(0, number); // Handle negative numbers
  return `${number}${prefix}`;
}
