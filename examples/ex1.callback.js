var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant('<YOUR-CLOUDANT-URL>');
require('../index')(cloudant);

cloudant.db.use('mydb').upsert('carmine', prevdoc => ({
    text: "Woop! Woop! We're using callbacks",
  }), (err, data) => {
    if (err) console.log('error', err.message);
    else console.log('data', data);
  }
);
