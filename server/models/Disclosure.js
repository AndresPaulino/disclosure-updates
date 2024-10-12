const fs = require('fs').promises;
const path = require('path');

class Disclosure {
  constructor(file, type) {
    this.file = file;
    this.type = type;
    this.uploadDate = new Date();
  }

  static async save(disclosure) {
    const disclosuresDir = path.join(__dirname, '..', 'disclosures');
    const oldDisclosuresDir = path.join(disclosuresDir, 'old_disclosures');

    // Ensure directories exist
    await fs.mkdir(disclosuresDir, { recursive: true });
    await fs.mkdir(oldDisclosuresDir, { recursive: true });

    const fileName = `${disclosure.type.replace(/\s+/g, '-')}.pdf`;
    const filePath = path.join(disclosuresDir, fileName);

    // Check if a previous version exists
    try {
      const stats = await fs.stat(filePath);
      if (stats.isFile()) {
        // Move the old file to old_disclosures
        const oldFileName = `${disclosure.type.replace(/\s+/g, '-')}-Old-${this.getFormattedDate()}.pdf`;
        await fs.rename(filePath, path.join(oldDisclosuresDir, oldFileName));
      }
    } catch (error) {
      // File doesn't exist, which is fine
    }

    // Save the new file
    await fs.writeFile(filePath, disclosure.file.buffer);

    return filePath;
  }

  static getFormattedDate() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${month}${day}${year}`;
  }
}

module.exports = Disclosure;