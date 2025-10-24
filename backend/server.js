const express= require("express")
const logrequest = require("./middlewares/log.middleware")
const dbArray = require("./Db/DbArray")
const ratelimiter = require('./middlewares/ratelimiter.middleware')
const LRUCache = require("./cache/LruCache")

const app = express()
app.use(express.json())

//logging request 
app.use(logrequest)

// implementing Lru cache 
const cache = new LRUCache(3);

app.get("/", (req , res)=> {
    res.send("server is up ")
})

app.post("/getproduct", ratelimiter,(req , res)=> {
    let data = req.body;
    console.log(req.body)
    const cached = cache.get(data.id)
    if(cached) return res.status(200).json({msg : "found in cache" ,
        data: cached
    })
    let queryData = dbArray[data.id -1]
      if (!queryData) 
        return res.status(404).json({ msg: "Product not found" });

    cache.set(data.id, queryData);

    res.status(200).json({ msg: "fetched from DB", data: queryData });

})

app.listen(3000 , ()=>{
    console.log(`server is up at 3000`)
})
