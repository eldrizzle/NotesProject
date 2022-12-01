function dbConnect() {
    // Db connection
const mongoose = require('mongoose')
const url = 'mongodb+srv://rajat4661:Rajat1598@cluster0.ncboalk.mongodb.net/comments'

mongoose.connect(url, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

const connection = mongoose.connection
connection.once('open', function() {
    console.log('Database connected...')
}).on(function(err){
    console.log('Connection failed...')
})
}

module.exports = dbConnect