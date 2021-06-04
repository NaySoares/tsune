const Image = require('../models/Image');

module.exports = {

  async index(req, res) {

    
    const id = req.params.id;

    if (!id) {
      const imgs = await Image.find().sort('-createdAt');
      return res.json(imgs);
    } else {
      const imgs = await Image.findOne({ urlImg: id });
      return res.json(imgs);
    }
  },

  async store ( req, res, ) {
    const { nick, nickId, urlImg, level } = req.body;

    const img = await Image.create({
      nick,
      nickId,
      urlImg,
      level,
    })

    return res.json(img)

  }
};