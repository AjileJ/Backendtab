const db = require('../database/dbConfig');

module.exports ={
    addTab,
    updateTab
    
}

module.exports.getUser = id => db('users').where({ id }).first()

module.exports.getUserTabs = (id) => db('tabs as t')
.select('t.*', 'c.category')
.where({user_id: id})
.join('categories as c', {'c.id': 't.category_id'})

function updateTab(tab, id){
    console.log('tab',tab)
    return db('tabs')
        .where({id: id})
        .update(tab)
        
      }

module.exports.deleteTab = (user_id, id) => db('tabs').delete().where({id})
    .then(() => module.exports.getUserTabs(user_id))

module.exports.cate = () => db('categories')

function addTab(tab){
    return db('tabs').insert(tab)
    .then(() => module.exports.getUserTabs(tab.user_id))
}








    
    







