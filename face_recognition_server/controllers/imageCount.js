const Clarifai =  require('clarifai');

const app = new Clarifai.App({
    apiKey: '1d726dbf171f462b88b2822d16db0887'
   });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImageCount = (req, res, db) =>{
    const {id} = req.body
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('bad request'))
}

module.exports = {
    handleImageCount: handleImageCount,
    handleApiCall: handleApiCall
}