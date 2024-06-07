import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const componentsDir = path.resolve(process.cwd(), 'src/components-library/src/components');

export async function GET(req, res) {
  try {
    const components = [];

    // Lire les sous-dossiers dans le dossier des composants
    const componentFolders = fs.readdirSync(componentsDir);

    componentFolders.forEach((folder) => {
      const folderPath = path.join(componentsDir, folder);
      if (fs.lstatSync(folderPath).isDirectory()) {
        // Lire les fichiers dans chaque sous-dossier
        const files = fs.readdirSync(folderPath);
        files.forEach((file) => {
          const filePath = path.join(folderPath, file);
          if (fs.lstatSync(filePath).isFile() && path.extname(file) === '.tsx') {
            const content = fs.readFileSync(filePath, 'utf-8');
            const name = path.basename(file, path.extname(file));
            components.push({ name, content });
          }
        });
      }
    });

    return new NextResponse(JSON.stringify(components), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Error reading components', error: error.message }), { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
