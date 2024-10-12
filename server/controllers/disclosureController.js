const Disclosure = require('../models/Disclosure');

exports.uploadDisclosure = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ message: 'Only PDF files are allowed' });
    }

    const disclosure = new Disclosure(req.file, req.body.type);
    const savedPath = await Disclosure.save(disclosure);

    res.status(200).json({
      message: 'Disclosure uploaded successfully',
      file: savedPath
    });
  } catch (error) {
    console.error('Error uploading disclosure:', error);
    res.status(500).json({ message: 'Error uploading disclosure' });
  }
};