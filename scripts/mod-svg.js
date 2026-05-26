const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../dist/github-snake-dark.svg');

try {
  let svgContent = fs.readFileSync(svgPath, 'utf8');

  // We are injecting a racing car emoji. 
  // We use <g> tags to group it, and a slight translation to center it on the grid squares.
  const racecar = `<g transform="translate(-2, 2)"><text font-size="14">🏎️</text></g>`;

  // Platane/snk usually renders the head as the very last <rect> or <path> with specific animation classes.
  // This regex looks for the standard snake head rendering and replaces it.
  svgContent = svgContent.replace(/<rect[^>]*class="[^"]*snake-head[^"]*"[^>]*><\/rect>/g, racecar);
  
  // Optional: Change the snake body color to look like dark asphalt/skid marks
  svgContent = svgContent.replace(/fill="#9be9a8"/g, 'fill="#333333"'); 
  svgContent = svgContent.replace(/fill="#40c463"/g, 'fill="#222222"');

  fs.writeFileSync(svgPath, svgContent);
  console.log("Racecar injected successfully!");
} catch (error) {
  console.error("Failed to inject racecar:", error);
  process.exit(1); 
}
