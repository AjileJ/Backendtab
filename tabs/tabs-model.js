const db = require('../database/dbConfig');



module.exports.getUser = id => db('users').where({ id }).first()

module.exports.getUserTabs = id => db('tabs as t')
    .select('t.*', 'c.category')
    .where({ user_id: id })
    .join('categories as c', { 'c.id': 't.category_id' })

module.exports.addTab = tab => db('tabs').insert(tab, 'id')
    .then(() => module.exports.getUserTabs(tab.user_id))


module.exports.updateTab = (tab, id) => db('tabs').update(tab).where({id})
    .then(() => module.exports.getUserTabs(tab.user_id))

module.exports.deleteTab = (user_id, id) => db('tabs').delete().where({id})
    .then(() => module.exports.getUserTabs(user_id))

module.exports.cate = () => db('categories')


