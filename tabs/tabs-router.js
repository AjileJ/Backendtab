const router = require('express').Router();
const tabsModel = require('./tabs-model');

const knex = require('../database/dbConfig');

router.get('/categories', (req,res) => {
  tabsModel.cate()
    .then(cate => {
      res.status(200).json(cate)
    })
    .catch(err => {
      res.status(500).json({error: "error occured while getting category list"})
    })
})

router.use('/:id', confirmUser)


router.get('/:id',(req,res) => {
  tabsModel.getUserTabs(req.params.id)
  .then(tabs => {
    res.status(200).json({tabs})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: "error getting user tabs"})
  })
})


router.post('/:id', (req,res) => {
  tabsModel.addTab({...req.body, user_id: req.params.id})
  .then(tabs => {
    res.json({tabs})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: "error while creating tab"})
  })
})

router.put('/:id/:tab_id', (req,res) => {
  const category = req.body.category;
  delete req.body['category'] 
  tabsModel.updateTab(req.body, req.params.tab_id)
  .then(count => {
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: "failed to insert tab"})
  })
})

router.delete('/:id/:tab_id', (req,res) => {
  tabsModel.deleteTab(req.params.id, req.params.tab_id)
  .then(tabs => res.json({tabs}
    ))
    .catch(err => {
      res.status(500).json({error: "could not delete tab"})
  })
})


function confirmUser(req,res,next) {
  const {id} = req.params;
  tabsModel.getUser(id)
  .then(user => {
    if(user){
      next()
    }else{
      res.status(400).json({message: "invalid user id"})
    }
  })
  .catch(err => {
    res.status(500).json({error: "error occured while retrieving the user information"})
  })
}

module.exports = router;