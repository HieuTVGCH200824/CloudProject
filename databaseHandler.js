const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://admin:admin@cluster0-shard-00-00.zwgre.mongodb.net:27017,cluster0-shard-00-01.zwgre.mongodb.net:27017,cluster0-shard-00-02.zwgre.mongodb.net:27017/test?replicaSet=atlas-cb0vzg-shard-0&ssl=true&authSource=admin';
const databaseName = 'GCH0904_DB'

async function deleteDocumentById(collectionName,id){
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    await dbo.collection(collectionName).deleteOne({_id: ObjectId(id)})
}

async function updateCollection(collectionName, myquery, newvalues) {
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    await dbo.collection(collectionName).updateOne(myquery, newvalues)
}

async function getDocumentById(collectionName, id){
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    return await dbo.collection(collectionName).findOne({_id:ObjectId(id)})
}


async function insertObject(collectionName, newP) {
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    await dbo.collection(collectionName).insertOne(newP)
}

async function findProductById(id){
    const  collectionName = 'product'
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    return  await dbo.collection(collectionName).find({catID:id}).toArray()
}


async function getAllFromCollection(collectionName){
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    return await dbo.collection(collectionName).find({}).toArray()
}


module.exports = {findProductById,insertObject,getAllFromCollection,getDocumentById,updateCollection,deleteDocumentById}