// build-and-copy.js
// Usage: node build-and-copy.js
const fs = require('fs-extra');
const path = require('path');

(async () => {
  try {
    const extSidebar = path.resolve(__dirname, '../Jobbyfy extension/sidebar');
    const frontendDist = extSidebar; // since vite outDir already targets extension/sidebar

    // ensure sidebar folder exists
    await fs.ensureDir(extSidebar);

    // Remove leftover unwanted files (safe cleanup)
    // Comment this out if you want to keep index.html there
    try { await fs.remove(path.join(extSidebar, 'index.html')); } catch(e){}

    console.log('Build output should already be in:', frontendDist);
    console.log('Sidebar ready at:', extSidebar);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
