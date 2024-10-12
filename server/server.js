const express = require('express');
const cors = require('cors');
const path = require('path');
const disclosureRoutes = require('./routes/disclosureRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/disclosures', disclosureRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});