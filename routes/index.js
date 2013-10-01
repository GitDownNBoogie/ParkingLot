
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Parking Lot', description: 'This is the place for you to park.'});
};