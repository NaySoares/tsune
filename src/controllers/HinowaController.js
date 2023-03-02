const HinowaManga = require('../models/HinowaManga');

module.exports = {
  async index() {
    const chapterHinowa = await HinowaManga.find({ posted: false });
    chapterHinowa.map((chapter) => this.update(chapter));

    return chapterHinowa;
  },

  async update(chapter) {
    const { _id } = chapter;

    await HinowaManga.findOneAndUpdate(
      { _id },
      { $set: { posted: true } },
      { returnDocument: 'after' },
      (err, doc) => {
        if (err) {
          console.log('Something wrong when updating data!');
        }
        console.log(`${doc.title} postado`);
      },
    );
  },
};
