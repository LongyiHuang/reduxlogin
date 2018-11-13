



import express from 'express';
import bodyParser from 'body-parser';

import signup from './routes/signup';
import auth from './routes/auth';
import user from './routes/user';



const app = express();

app.use(bodyParser.json());

app.use('/api/signup', signup);
app.use('/api/auth', auth);
app.use('/api/user',user);

app.get('/',(req,res) => {
   res.send("hello!");
});



app.listen(6060, () => console.log('Server is running on localhost:6060'));