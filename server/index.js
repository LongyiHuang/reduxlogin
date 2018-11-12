



import express from 'express';
import bodyParser from 'body-parser';

import users from './routes/users';
import auth from './routes/auth';
import user from './routes/user';



const app = express();

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/user',user);

app.get('/',(req,res) => {
   res.send("hello!");
});



app.listen(6060, () => console.log('Server is running on localhost:6060'));