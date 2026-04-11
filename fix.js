const fs = require('fs');

const peixesPath = 'frontend/src/data/peixes.json';
let text = fs.readFileSync(peixesPath, 'utf8');

const fixes = {
  'Ã¡': 'á',
  'Ã': 'Á',
  'Ã©': 'é',
  'Ã³': 'ó',
  'Ã­': 'í',
  'Ãº': 'ú',
  'Ã¢': 'â',
  'Ãª': 'ê',
  'Ã´': 'ô',
  'Ã£': 'ã',
  'Ã§': 'ç',
  'Ã ': 'à',
  'Â°': '°',
  'Ã“': 'Ó',
  'Ã—': '×', // Multiplicação, como em Tambacu
  'Ã': 'í', // Failsafe para í incompleto
  'Ã³': 'ó',
  '\\'Ã¡\\'': "'á'",
  '\\'Ã©\\'': "'é'"
};

for (const [wrong, right] of Object.entries(fixes)) {
  text = text.split(wrong).join(right);
}

fs.writeFileSync(peixesPath, text, 'utf8');
console.log('Arquivo peixes.json corrigido.');