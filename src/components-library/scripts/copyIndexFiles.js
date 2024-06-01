const fs = require('fs');
const path = require('path');

// Fonction pour copier un fichier
function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} to ${dest}`);
}

// Chemins des fichiers d'index à copier
const filesToCopy = [
  { src: 'src/components/index.ts', dest: 'dist/components/index.js' },
  { src: 'src/components/index.ts', dest: 'dist/types/index.d.ts' }
];

filesToCopy.forEach(file => {
  copyFile(file.src, file.dest);
});
