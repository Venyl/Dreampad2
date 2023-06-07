migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64bm0qgi82k3bpx")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "author = @request.auth.id"
  collection.updateRule = "author = @request.auth.id"
  collection.deleteRule = "author = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64bm0qgi82k3bpx")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
