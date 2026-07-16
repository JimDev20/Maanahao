/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1392088676");

  // Delete empty records first
  const emptyRecords = app.findAllRecords("site_content");
  for (const record of emptyRecords) {
    app.delete(record);
  }

  // Re-create the collection with all fields
  app.delete(collection);

  const newCollection = new Collection({
    "createRule": "",
    "deleteRule": "",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "text_section",
        "max": 0,
        "min": 1,
        "name": "section",
        "pattern": "",
        "presentable": true,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "text_title",
        "max": 0,
        "min": 0,
        "name": "title",
        "pattern": "",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "text_subtitle",
        "max": 0,
        "min": 0,
        "name": "subtitle",
        "pattern": "",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "text_body",
        "max": 0,
        "min": 0,
        "name": "body",
        "pattern": "",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "text_image_url",
        "max": 0,
        "min": 0,
        "name": "image_url",
        "pattern": "",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "text_button_text",
        "max": 0,
        "min": 0,
        "name": "button_text",
        "pattern": "",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "text_button_link",
        "max": 0,
        "min": 0,
        "name": "button_link",
        "pattern": "",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "json_meta",
        "maxSize": 0,
        "name": "meta",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_1392088676",
    "indexes": [],
    "listRule": "",
    "name": "site_content",
    "system": false,
    "type": "base",
    "updateRule": "",
    "viewRule": ""
  });

  return app.save(newCollection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1392088676");
  return app.delete(collection);
});
