const express = require('express');
const ImageController = require('./controllers/ImageController');
const EditorController = require('./controllers/EditorController');
const routes = new express.Router();

const multer = require('multer');
const upload = multer();



routes.get('/', (req, res) => {
  res.json({Tsune: 'O que você está fazendo aqui? Você não pode invadir o espaço das pessoas desse jeito!'})
})
routes.get('/image', ImageController.index)
routes.get('/image/:id', ImageController.index)
routes.post('/image', upload.single(), ImageController.store)

routes.get('/editor', EditorController.index)
routes.get('/editor/:id', EditorController.index)
routes.post('/editor',upload.single(), EditorController.store)
routes.put('/editor/:id', upload.single(), EditorController.update)
routes.put('/editor/:id/:points', upload.single(), EditorController.update)

module.exports = routes;