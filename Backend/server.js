require('dotenv').config();
const app = require('./src/app');

const connectDB = require('./src/config/database');
// const invokeGemini = require('./src/services/ai.service')



connectDB();
// invokeGemini()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
