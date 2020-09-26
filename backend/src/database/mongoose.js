const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/prcv', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("🔌 Connected to MongoDB successfully")
  })
  .catch((err) => {
    console.log("Error while attempting to connect MongoDB: " + err)
  });

// Prevent deprectation warnings (native driver)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


module.exports = { mongoose };
