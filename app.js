
const express = require('express')
const async = require('hbs/lib/async')
const { ObjectId } = require('mongodb')
const { insertObject, getAllFromCollection, getDocumentById, updateCollection, deleteDocumentById, findProductById, findProductByName } = require('./databaseHandler')
const app = express()
const hbs = require('hbs')
const alert = require('alert')

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views');
app.use(express.urlencoded({extended:true}))

app.get('/',async(req,res)=>{
    
    const productCollection = 'product'
    const allProduct = await getAllFromCollection(productCollection)

    res.render('index',{products:allProduct})
})


app.get('/addProduct', async(req,res)=>{
    const id = req.query.id

    const allProduct = await findProductById(id)

    const categoryCollection = 'category'
    const document = await getDocumentById(categoryCollection,id)
    res.render('addProduct',{category:document,products:allProduct})
})

app.post('/addProduct',async (req,res)=>{
    const id = req.body.txtId
    const catName = req.body.txtCatName
    const name = req.body.txtName
    if (name.length <= 0){
        alert("Product's name must not be blank")
        res.redirect('/')
        return
    }
    const price = req.body.txtPrice
    const picURL = req.body.txtPictureURL
    const newP = {
        'catID' : id,
        'catName' : catName,
        'name' : name,
        'price': price,
        'pic' : picURL
    }
    const collectionName = 'product'
    await insertObject(collectionName,newP)
    res.redirect('/')
})

app.get('/edit',async (req,res)=>{
    const id = req.query.id
    const collectionName = 'product'
    const document = await getDocumentById(collectionName,id)
    console.log(document)
    res.render('editProducts',{product:document})
})

app.post('/edit', async (req,res)=>{
    const updateId = req.body.txtId
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picURL = req.body.txtPictureURL

    const newvalues = { $set: {'name': name, 'price': price,'pic':picURL } }
    const myQuery = {_id: ObjectId(updateId)}
    const collectionName = 'product'
    await updateCollection(collectionName,myQuery,newvalues)
    res.redirect('/')
})

app.get('/delete',async (req,res) =>{
    const id = req.query.id
    const collectionName = 'product'
    await deleteDocumentById(collectionName,id)
    res.redirect('/')
})

app.get('/category',async(req,res)=>{
    const collectionName = 'category'
    const result = await getAllFromCollection(collectionName)
    res.render('category',{category:result})
})


app.post('/category', async (req,res)=>{
    const name = req.body.txtName
    if (name.length <= 0){
        alert("Category's name must not be blank")
        res.redirect('/category')
        return
    }
        const picUrl = req.body.txtPictureURL
        const newC = {
            'name' : name,
            'pic' : picUrl
        }
        const collectionName = 'category'
        await insertObject(collectionName,newC)
        res.redirect('/category')
    }
)

app.get('/deleteCategory', async (req,res)=>{
    const id = req.query.id
    const collectionName = 'category'
    await deleteDocumentById(collectionName,id)
    res.redirect('/category')
})

app.get('/editCategory', async (req,res)=>{
    const id = req.query.id
    const collectionName = 'category'
    const document = await getDocumentById(collectionName,id)
    console.log(document)
    res.render('editCategory',{category:document})
})

app.post('/editCategory', async (req,res)=>{
    const updateId = req.body.txtId
    const name = req.body.txtName
    const picURL = req.body.txtPictureURL

    const newvalues = { $set: {'name': name, 'pic':picURL }}
    const myQuery = {_id: ObjectId(updateId)}
    const collectionName = 'category'
    await updateCollection(collectionName,myQuery,newvalues)
    res.redirect('/category')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')