const generalError = (err, req, res, next)=>{
    console.log('Server Error.check ',err);
    let pageTitle = 'Error Page'
    let displayText = '500 Internal Server Error, Return to Home'
    res.status(500).render('errorPage',{pageTitle, displayText})
}

module.exports = {generalError}