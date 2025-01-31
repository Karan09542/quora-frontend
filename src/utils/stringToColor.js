export function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + (hash << 4) - hash;
  }
  const hue = Math.abs(hash) % 360; // Hue range: 0-360
  const saturation = 90; // High saturation for vibrant colors
  const lightness = 60; // Light color tones

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
