function upsertFn(db) {
  function upsert(docId, transform, callback) {
    if (!transform) {
      return callback(
        'transform missing. signature is: upsert(docId, transform, qs, callback)'
      );
    }

    const MSG_INVALID_DOC = 'Error: caller did not supply a valid doc';

    const transformDoc = curDoc => {
      const id = curDoc && (curDoc._id || curDoc.id);
      const rev = curDoc && (curDoc._rev || curDoc.rev);
      const doc = transform(curDoc);
      if (doc) {
        doc._id = id || doc._id || undefined;
        doc._rev = rev || doc._rev || undefined;
      }
      return doc;
    };

    const mergeIdRev = (doc, inserted) => {
      doc._id = (inserted && (inserted.id || inserted._id)) || doc._id;
      doc._rev = (inserted && (inserted.rev || inserted._rev)) || doc._rev;
      return doc;
    };

    const promiseHelper = curDoc => {
      const doc = transformDoc(curDoc);
      if (doc) {
        return db.insert(doc, doc._id).then(data => mergeIdRev(doc, data));
      } else {
        return Promise.reject(MSG_INVALID_DOC);
      }
    };

    const callbackHelper = curDoc => {
      const doc = transformDoc(curDoc);
      if (doc) {
        db.insert(doc, doc._id, function(err, data) {
          if (err) callback(err);
          else callback(null, mergeIdRev(doc, data));
        });
      } else {
        callback(MSG_INVALID_DOC);
      }
    };

    if (callback) {
      if (!docId) callbackHelper();
      else {
        db.get(docId, { include_docs: true }, (err, body) => {
          if (err && err.statusCode !== 404) callback(err);
          else callbackHelper(body);
        });
      }
    } else {
      return !docId
        ? promiseHelper()
        : db
            .get(docId, { include_docs: true })
            .catch(e => {
              if (e.statusCode === 404) return null;
              throw e;
            })
            .then(promiseHelper);
    }
  }

  return upsert;
}

module.exports = function(cloudant) {
  var use = cloudant.db.use;
  cloudant.db.use = function(dbName) {
    var db = use(dbName);
    db.upsert = upsertFn(db);
    return db;
  };
  return cloudant;
};
