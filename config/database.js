if(process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://koylyak:Djcamp15121990@ds113815.mlab.com:13815/vidjot-prod'
  };
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost/vidjot-dev'
  };
}