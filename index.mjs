import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://manuelmgp2001:DHbYsH73j8bNTCQg@ceramarcluster.zjvvy.mongodb.net/?retryWrites=true&w=majority&appName=ceramarCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User created', user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});