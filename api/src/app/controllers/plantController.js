const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

const Plant = require('../models/Plant');
const Comment = require('../models/Comment');

router.use(authMiddleware);

router.get('/', async (req, res) => { // por intervalo de datas
  try {
    const {dateRange} =  req.query;
    if(dateRange){
      
    }

    const {initialDate, finalDate} = req.body;
    const plants = await Plant
      .find({"createdAt":{ $gte:initialDate, $lt:finalDate }})
      .populate(['user', 'comments'])
      .sort('createdAt');  

    return res.status(200).json({ plants });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      message: 'nao foi possivel obter as plantas'
    });
  }
});

router.get('/', async (req, res) => { // por datas em ordem de mais recente primeiro
  try {
    const plants = await Plant.find({ assignedToUser: req.userId })
      .populate(['user', 'comments'])
      .sort('-createdAt'); // sort com '-createdAt' vem o mais recente primeiro
    //com 'createdAt' vem o mais antigo primeiro
    return res.status(200).json({ plants });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      message: 'nao foi possivel obter as plantas'
    });
  }
});

router.get('/favorites', async (req, res) => { // listar favoritas
  try {
    const plants = await Plant.find({ assignedToUser: req.userId, isFavorite: true })
      .populate(['user', 'comments'])
      .sort('-createdAt'); // sort com '-createdAt' vem o mais recente primeiro
    //com 'createdAt' vem o mais antigo primeiro
    return res.status(200).json({ plants });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      message: 'nao foi possivel obter as plantas favoritas'
    });
  }
});

router.get('/archived',async (req,res)=>{ // listar arquivadas
  try {    
    const plants = await Plant.find({ assignedToUser: req.userId, isArchived: true})
      .populate(['user', 'comments'])
      .sort('-createdAt'); // sort com '-createdAt' vem o mais recente primeiro
      //com 'createdAt' vem o mais antigo primeiro
    return res.status(200).json({plants});
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      message: 'nao foi possivel obter as plantas arquivadas'
    });
  }
});

router.get('/planttype',async (req,res)=>{ // listar por tipo
  const type = req.body
  try {
    const plants = await Plant.find({ assignedToUser: req.userId , plantType: type.plantType})
      .populate(['user', 'comments'])
      .sort('-createdAt'); // sort com '-plantType' vem o mais recente primeiro
      //com 'plantType' vem o mais antigo primeiro
    return res.status(200).json({plants});
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      message: 'nao foi possivel obter as plantas desse tipo'
    });
  }
});

router.get('/:plantId', async (req, res) => { // listar planta por id
  try {
    const plant = await Plant.findById(req.params.plantId).populate(['user', 'comments']);
    if (!plant)
      return res.status(400).json({
        error: "planta nao encontrada"
      });
    return res.status(200).json({ plant });
  } catch (err) {
    return res.status(400).json({
      error: 'nao foi possivel obter a planta'
    });
  }
});

router.post('/', async (req, res) => { // criar planta
  // console.log(req.body);
  const { scientificName, popularName, description, 
    comments, plantType
  } = req.body;
  try {
    const plant = await Plant.create({
      scientificName, assignedToUser: req.userId, description,
      popularName, plantType
    });

    //aguardar tds promises do map concluirem
    // isso é para criar task q vamos usar para comentarios depois
    await Promise.all(comments.map(async comment => {
      const plantComment = new Comment({
        ...comment, plant: plant._id,
        assignedTo: req.userId
      });

      await plantComment.save()
      plant.comments.push(plantComment);
    }));

    await plant.save();
    return res.json({ plant });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'Erro ao criar nova planta',
    });
  }
});

router.put('/archive/:plantId', async (req, res) => { // (des)arquivar uma planta
  try {
    const plant = await Plant.findById(req.params.plantId);
    console.log(req.params.plantId);
    
    if(!plant)
      return res.status(400).json({
        error:"planta nao encontrada"
      });

    console.log(plant.assignedToUser, req.userId)
    if(plant.assignedToUser != req.userId)
      return res.status(401).json({
        error: "voce nao tem permissoes para isso"
      });
    plant.isArchived = !plant.isArchived;

    await plant.save();
    return res.json({plant});
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'nao foi possivel arquivar a planta'
    });
  }
});

router.put('/favorite/:plantId', async (req, res) => { // (des)favoritar uma planta
  try {
    const plant = await Plant.findById(req.params.plantId);

    if (!plant)
      return res.status(400).json({
        error: "planta nao encontrada"
      });

    console.log(plant.assignedToUser, req.userId)
    if (plant.assignedToUser != req.userId)
      return res.status(401).json({
        error: "voce nao tem permissoes para isso"
      });
    plant.isFavorite = !plant.isFavorite;

    await plant.save();
    return res.json({ plant });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'nao foi possivel favoritar a planta'
    });
  }
});

router.put('/:plantId', async (req, res) => { // atualizar uma planta
  const { scientificName, popularName, description, comments } = req.body;
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.plantId, {
      description,
      scientificName,
      popularName,
      assignedToUser: req.userId
    }, { new: true });

    if (!plant)
      return res.status(400).json({
        error: "planta nao encontrada"
      });

    //deletar os comments para n ocorrer reescrita
    plant.comments = [];
    await Comment.remove({ plant: plant._id });

    //aguardar tds promises do map concluirem
    await Promise.all(comments.map(async comment => {
      comment.assignedTo = req.userId;
      const plantComment = new Comment({ ...comment, plant: plant._id });

      await plantComment.save()
      plant.comments.push(plantComment);
    }));

    await plant.save();
    return res.json({ plant });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'nao foi possivel atualizar a planta'
    });
  }
});

router.put('/comment/:plantId', async (req, res) => { // add comentario a uma planta
  try {
    const { comment } = req.body;
    const plant = await Plant.findById(req.params.plantId);

    if (!plant)
      return res.status(400).json({
        error: "planta nao encontrada"
      });

    console.log(plant.assignedToUser, req.userId)
    if (plant.assignedToUser != req.userId)
      return res.status(401).json({
        error: "voce nao tem permissoes para isso"
      });

    comment.assignedTo = req.userId;
    const plantComment = new Comment({ ...comment, plant: plant._id });

    await plantComment.save()
    plant.comments.push(plantComment);

    await plant.save();
    return res.json({ plant });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'nao foi possivel favoritar a planta'
    });
  }
});

module.exports = app => app.use('/api/plants', router);