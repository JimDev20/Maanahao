/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1392088676");

  collection.createRule = "@request.auth.id != ''";
  collection.updateRule = "@request.auth.id != ''";
  collection.deleteRule = "@request.auth.id != ''";
  collection.listRule = "";
  collection.viewRule = "";

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1392088676");

  collection.createRule = "";
  collection.updateRule = "";
  collection.deleteRule = "";
  collection.listRule = "";
  collection.viewRule = "";

  return app.save(collection);
});
