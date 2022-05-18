const express = require('express')
const app = express()
const port = 4000
const route = require('./router');
const bodyParser = require('body-parser')

// calling body-parser
app.use(bodyParser.urlencoded({extended:false}))

app.use('/api', route)
// home route
app.get('/', (req, res)=>{
    res.end('Routing App')
})
app.listen(port, () => console.log(`Server app listening on port ${port}`))