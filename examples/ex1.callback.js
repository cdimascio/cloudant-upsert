var Cloudant = require('cloudant');
var cloudant = Cloudant('<YOUR_CLOUDANT_URL>');
require('../index')(cloudant);

cloudant.db.use('mydb').upsert('carmine', doc => ({
    "_id": "carmine",
    "_rev": doc._rev,
    "text": "Woop! Woop! We're using callbacks"
  }), (err, data) => {
    if (err) console.log('error', err.reason)
    else console.log('data', data)
  })