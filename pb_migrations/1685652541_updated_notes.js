migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64bm0qgi82k3bpx")

  collection.createRule = "author.id = @request.auth.id"
  collection.updateRule = "author.id = @request.auth.id"
  collection.deleteRule = "author.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64bm0qgi82k3bpx")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
