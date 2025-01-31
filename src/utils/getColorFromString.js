export function getColorForString(input) {
  const colors = ["red", "blue", "black", "purple", "green", "yellow"];

  // Create a simple hash based on the input string
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }

  // Use modulo operation to map hash to one of the colors
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
}
