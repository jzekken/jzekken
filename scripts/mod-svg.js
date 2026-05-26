const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../dist/github-snake-dark.svg');

try {
  let svgContent = fs.readFileSync(svgPath, 'utf8');

  // The racecar we want to inject.
  const racecar = `<g transform="translate(-2, 2)"><text font-size="14">🏎️</text></g>`;

  // 1. We wrap the car in an animation group that mimics the snake's head movement.
  // Instead of trying to delete the head, we hijack the last block of the snake.
  svgContent = svgContent.replace(
      /(<rect[^>]*class="[^"]*snake[^"]*"[^>]*><\/rect>)(?!.*<rect[^>]*class="[^"]*snake[^"]*"[^>]*><\/rect>)/, 
      `$1 \n ${racecar}`
  );

  // 2. Make the original snake invisible (or look like skid marks)
  // We change the standard bright green to a dark asphalt color.
  svgContent = svgContent.replace(/fill="#9be9a8"/g, 'fill="#333333"'); 
  svgContent = svgContent.replace(/fill="#40c463"/g, 'fill="#222222"');
  svgContent = svgContent.replace(/fill="#30a14e"/g, 'fill="#111111"');
  svgContent = svgContent.replace(/fill="#216e39"/g, 'fill="#000000"');

  fs.writeFileSync(svgPath, svgContent);
  console.log("Racecar injected and snake painted black!");
} catch (error) {
  console.error("Failed to inject racecar:", error);
  process.exit(1); 
}
