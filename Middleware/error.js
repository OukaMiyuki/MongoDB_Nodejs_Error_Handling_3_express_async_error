module.exports = function(err, req, res, next){//error middleware function
    res.status(500).send('An error occured!');
}