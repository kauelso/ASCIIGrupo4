const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

const Plant = require('../models/Plant');
const Comment = require('../models/Comment');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {    
    const plants = await Plant.find({ assignedToUser: req.userId})
      .populate(['user', 'comments'])
      .sort('-createdAt'); // sort com '-createdAt' vem o mais recente primeiro
      //com 'createdAt' vem o mais antigo primeiro
    return res.status(200).json({plants});
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      message: 'nao foi possivel obter as plantas'
    });
  }
});

router.get('/:plantId', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.plantId).populate(['user', 'comments']);
    if(!plant) 
      return res.status(400).json({
        error: "planta nao encontrada"
      });
    return res.status(200).json({plant});
  } catch (err) {
    return res.status(400).json({
      error: 'nao foi possivel obter a planta'
    });
  }
});

router.post('/', async (req, res) => {
  // console.log(req.body);
  const {scientificName, popularName, description,comments
  } = req.body;
  try{
    const plant = await Plant.create({
      scientificName, assignedToUser: req.userId, description,
      popularName
    });
    
    //aguardar tds promises do map concluirem
    // isso é para criar task q vamos usar para comentarios depois
    await Promise.all(comments.map(async comment => {
      const plantComment = new Comment({...comment, plant: plant._id,
        assignedTo: req.userId
      });
      
      await plantComment.save()
      plant.comments.push(plantComment);
    }));

    await plant.save();
    return res.json({plant});
  }catch(err){
    console.log(err);
    return res.status(400).json({
      error: 'Erro ao criar nova planta',
    });
  }
});

router.put('/:plantId', async (req, res) => {
  const {scientificName,popularName, description, comments} = req.body;
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.plantId, { 
      description,
      scientificName,
      popularName,
      assignedToUser: req.userId
    }, { new: true });

    if(!plant)
      return res.status(400).json({
        error:"projeto nao encontrado"
      });

    //deletar os comments para n ocorrer reescrita
    plant.comments = [];
    await Comment.remove({ plant: plant._id });

    //aguardar tds promises do map concluirem
    await Promise.all(comments.map(async comment => {
      comment.assignedTo = req.userId;
      const plantComment = new Comment({...comment, plant: plant._id});
      
      await plantComment.save()
      plant.comments.push(plantComment);
    }));

    await plant.save();
    return res.json({plant});
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'nao foi possivel atualizar o projeto'
    });
  }
});



module.exports = app => app.use('/api/plants', router);