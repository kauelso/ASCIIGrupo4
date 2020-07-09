const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

const Project = require('../models/Project');
const Task = require('../models/Task');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate(['user', 'tasks']);
    return res.status(200).json({projects});
  } catch (err) {
    return res.status(400).json({
      error: 'nao foi possivel obter os projetos'
    });
  }
});

router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);
    if(!project) 
      return res.status(400).json({
        error: "projeto nao encontrado"
      });
    return res.status(200).json({project});
  } catch (err) {
    return res.status(400).json({
      error: 'nao foi possivel obter o projeto'
    });
  }
});

router.post('/', async (req, res) => {
  // console.log(req.body);
  const {title, description, tasks} = req.body;
  try{
    const project = await Project.create({title, user: req.userId, description});
    
    //aguardar tds promises do map concluirem
    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({...task, project: project._id});
      
      await projectTask.save()
      project.tasks.push(projectTask);
    }));

    await project.save();
    return res.json({project});
  }catch(err){
    // console.log(err);
    return res.status(400).json({
      error: 'Erro ao criar novo projeto',
    });
  }
});

router.put('/:projectId', async (req, res) => {
  const {title, description, tasks} = req.body;
  try {
    const project = await Project.findByIdAndUpdate(req.params.projectId, {
      title, 
      description
    }, { new: true });

    if(!project)
      return res.status(400).json({
        error:"projeto nao encontrado"
      });

    //deletar as tasks para n ocorrer redundancia
    project.tasks = [];
    await Task.remove({ project: project._id });

    //aguardar tds promises do map concluirem
    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({...task, project: project._id});
      
      await projectTask.save()
      project.tasks.push(projectTask);
    }));

    await project.save();
    return res.json({project});
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'nao foi possivel atualizar o projeto'
    });
  }
});

router.delete('/:projectId', async (req, res) => {
  try {
    const project = await Project.findByIdAndRemove(req.params.projectId);
    if(!project) 
      return res.status(400).json({
        error: "projeto nao encontrado"
      });
    return res.status(200).json({message:'projeto removido com sucesso'});
  } catch (err) {
    return res.status(400).json({
      error: 'nao foi possivel apagar o projeto'
    });
  }
});

module.exports = app => app.use('/api/projects', router);