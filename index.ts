import 'dotenv/config'
import app from './app';

const PORT = process.env.PORT || 3001;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined');
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});