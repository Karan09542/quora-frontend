export function generateGeometricIllustrationSrc(inputString) {
  // Create a deterministic random seed based on the input string
  let seed = Array.from(inputString).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );

  // Pseudo-random generator based on seed
  function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  // Create an off-screen canvas
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 800;
  const ctx = canvas.getContext("2d");

  // Utility to generate random colors
  function randomColor(opacity = 1) {
    const h = Math.floor(random() * 360); // Hue
    const s = Math.floor(random() * 50 + 50); // Saturation
    const l = Math.floor(random() * 40 + 50); // Lightness
    return `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
  }

  // Draw a polygon with `sides` number of sides
  function drawPolygon(x, y, radius, sides) {
    const angleStep = (Math.PI * 2) / sides;
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const dx = x + Math.cos(i * angleStep) * radius;
      const dy = y + Math.sin(i * angleStep) * radius;
      ctx.lineTo(dx, dy);
    }
    ctx.closePath();
    ctx.fillStyle = randomColor(0.7);
    ctx.strokeStyle = randomColor(0.9);
    ctx.lineWidth = random() * 4 + 1;
    ctx.fill();
    ctx.stroke();
  }

  // Draw a circle
  function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = randomColor(0.8);
    ctx.strokeStyle = randomColor(0.9);
    ctx.lineWidth = random() * 4 + 1;
    ctx.fill();
    ctx.stroke();
  }

  // Draw a triangle
  function drawTriangle(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.closePath();
    ctx.fillStyle = randomColor(0.8);
    ctx.strokeStyle = randomColor(0.9);
    ctx.lineWidth = random() * 4 + 1;
    ctx.fill();
    ctx.stroke();
  }

  // Clear canvas and set background
  function clearCanvas() {
    ctx.fillStyle = "#dce7f3"; // Light background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Main function to generate illustration
  function generateShapes() {
    clearCanvas();

    // Draw random polygons
    for (let i = 0; i < 10; i++) {
      const x = random() * canvas.width;
      const y = random() * canvas.height;
      const radius = random() * 100 + 50;
      const sides = Math.floor(random() * 5) + 3; // 3 to 7 sides
      drawPolygon(x, y, radius, sides);
    }

    // Draw random circles
    for (let i = 0; i < 8; i++) {
      const x = random() * canvas.width;
      const y = random() * canvas.height;
      const radius = random() * 80 + 30;
      drawCircle(x, y, radius);
    }

    // Draw random triangles
    for (let i = 0; i < 6; i++) {
      const x = random() * canvas.width;
      const y = random() * canvas.height;
      const size = random() * 120 + 40;
      drawTriangle(x, y, size);
    }
  }

  // Generate the illustration
  generateShapes();

  // Return the canvas as a base64 image URL
  return canvas.toDataURL("image/png");
}

// Example usage
// const illustrationSrc = generateGeometricIllustrationSrc("UniqueInput123");
// console.log(illustrationSrc); // Logs the base64 URL
