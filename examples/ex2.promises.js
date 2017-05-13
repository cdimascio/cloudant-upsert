var Cloudant = require('cloudant');
var cloudant = Cloudant({ url: '<YOUR_CLOUDANT_URL>', plugin: 'promises' });
require('../index')(cloudant);

cloudant.db.use('rooms').upsert('carmine', doc => ({
    "_id": "carmine",
    "_rev": doc._rev,
    "text": "Woop Woop! We're using promises",
  }))
  .then(r => console.log('result', r))
  .catch(e => console.log('error', e));