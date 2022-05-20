const ListNovel = require('../models/ListNovel');

module.exports = {
  async index() {

    const listNovels = await ListNovel.find({ posted: false });
    listNovels.map(novel => this.update(novel))

    return listNovels;
  },

  async update(novel) {
    const { _id } = novel

    await ListNovel.findOneAndUpdate({ _id }, {$set: {posted: true}}, { returnDocument: 'after' }, (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log(`novel ${doc.title} postada`);
    });

    return
  }
};