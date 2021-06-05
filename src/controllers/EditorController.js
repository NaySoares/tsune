const Editor = require('../models/Editor');

module.exports = {
  async index(req, res) {
  
    const id = req.params.id
    
    if ( id !== undefined ) {  
      const editor = await Editor.findOne({ editorId: id });
      return res.json(editor);
    } else {
      const editor = await Editor.find();
      
      return res.json(editor);
    }
  },

  async store ( req, res) {
    const { editor, editorId, urlImg, level } = req.body;
    const points = 0;
    const victory = 0;

    let editorExist = await Editor.findOne({ editorId: editorId });
    
    if (!editorExist) {
      const editorTsun = await Editor.create({
        editor,
        editorId,
        points,
        victory,
        urlImg,
        level,
      })
      return res.json(editorTsun)
    } else {
        if (editorExist.urlImg !== '') {

        return res.json({message: "você já tem uma imagem registrada, envie sua imagem ou desista pedindo para um adm"})
      } else {
        if ( editorExist.level === '') {

          editorExist = await Editor.findOneAndUpdate({editorId: editorId, urlImg: urlImg});
          editorExist = await Editor.findOneAndUpdate({editorId: editorId, level: level});
          editorExist = await Editor.findOne({editorId: editorId});

          return res.json(editorExist);

        } else {
          return res.json({message: "ainda não avaliaram sua imagem, por favor aguarde um pouco mais ou fale com um adm"})
        }
      }
    } 
  },

  async update (req, res) {
    const id = { editorId: req.params.id } 
    const points = { points: req.params.points }

    if (points.points !== undefined) {
      const info = { 
        points,
        level: ''
      };

      let editor = await Editor.findOneAndUpdate(id,info.points);
      editor = await Editor.findOneAndUpdate(id, {level: ''});
      editor = await Editor.findOne(id);
      
      return res.json(editor)

    } else {
      const info = { 
        urlImg: ''
      };
      const oldEditor = await Editor.findOne(id);

      let editor = await Editor.findOneAndUpdate(id, info);
      editor = await Editor.findOne(id);
      
      return res.json([editor, oldEditor])
    }
  }
};