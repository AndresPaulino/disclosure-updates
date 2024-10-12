const express = require('express');
const multer = require('multer');
const disclosureController = require('../controllers/disclosureController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), disclosureController.uploadDisclosure);

module.exports = router;