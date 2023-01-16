const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) console.log(err);
  else console.log('mongdb is connected', process.env.MONGO_URL);
});
