# cloudant-upsert

Adds an upsert function to the [nodejs-cloudant](https://github.com/cloudant/nodejs-cloudant/blob/master/cloudant.js) library. This library does not include any package dependencies.

## Install

```shell
npm install cloudant-upsert
```

## Usage

```javascript
var Cloudant = require('cloudant');
var cloudant = Cloudant('<YOUR_CLOUDANT_URI>');
require('cloudant-upsert')(cloudant);
```

## Examples

#### Promises

```javascript
var Cloudant = require('cloudant');
var cloudant = Cloudant({ url: '<YOUR_CLOUDANT_URL>', plugin: 'promises' });
require('cloudant-upsert')(cloudant);

cloudant.db.use('rooms').upsert('carmine', doc => ({
    "_id": "carmine",
    "_rev": doc._rev,
    "text": "Woop Woop! We're using promises",
  }))
  .then(r => console.log('result', r))
  .catch(e => console.log('error', e));
```

#### Callbacks

```javascript
var Cloudant = require('cloudant');
var cloudant = Cloudant('<YOUR_CLOUDANT_URL>');
require('cloudant-upsert')(cloudant);

cloudant.db.use('mydb').upsert('carmine', doc => ({
    "_id": "carmine",
    "_rev": doc._rev,
    "text": "Woop! Woop! We're using callbacks"
  }), (err, data) => {
    if (err) console.log('error', err.reason)
    else console.log('data', data)
  })
```

## License
MIT