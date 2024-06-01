const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Fonction pour compiler TypeScript en JavaScript en utilisant tsc
function compileTypeScript(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  execSync(`tsc ${src} --outDir ${destDir} --esModuleInterop`);
  const compiledFile = path.join(destDir, path.basename(src).replace('.ts', '.js'));
  if (fs.existsSync(compiledFile)) {
    fs.renameSync(compiledFile, dest);
  }
}

// Fonction pour copier un fichier
function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} to ${dest}`);
}

// Copie et compile les fichiers d'index globaux de src vers dist
const filesToCopy = [
  { src: 'src/components/index.ts', dest: 'dist/components/index.js' },
  { src: 'src/components/index.ts', dest: 'dist/types/index.d.ts' }
];

filesToCopy.forEach(file => {
  if (file.src.endsWith('.ts') && file.dest.endsWith('.js')) {
    compileTypeScript(file.src, file.dest);
  } else {
    copyFile(file.src, file.dest);
  }
});
