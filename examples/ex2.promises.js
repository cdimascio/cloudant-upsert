var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant({
  url: '<YOUR-CLOUDANT-URL>',
  plugins: 'promises',
});
require('../index')(cloudant);

cloudant.db
  .use('mydb')
  .upsert('carmine', prevdoc => ({
    text: "Woop Woop! We're using promises",
  }))
  .then(r => console.log('result', r))
  .catch(e => console.log('error', e.message));
