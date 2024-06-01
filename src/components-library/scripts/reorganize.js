const fs = require('fs-extra');
const path = require('path');

async function reorganize() {
  const componentsSrcDir = path.join(__dirname, '../dist/components/src/components');
  const componentsDestDir = path.join(__dirname, '../dist/components');

  try {
    // Ensure the destination directory exists
    await fs.ensureDir(componentsDestDir);

    // Copy each component directory to the dist/components directory
    if (await fs.pathExists(componentsSrcDir)) {
      const componentDirs = await fs.readdir(componentsSrcDir);
      for (const dir of componentDirs) {
        const srcDir = path.join(componentsSrcDir, dir);
        const destComponentDir = path.join(componentsDestDir, dir);
        await fs.copy(srcDir, destComponentDir);
      }
    }

    // Remove the unnecessary src directory if it exists
    const componentsSrcBaseDir = path.join(__dirname, '../dist/components/src');
    if (await fs.pathExists(componentsSrcBaseDir)) {
      await fs.remove(componentsSrcBaseDir);
    }

    console.log('Files reorganized successfully');
  } catch (err) {
    console.error('Error while reorganizing files:', err);
    process.exit(1);
  }
}

reorganize();