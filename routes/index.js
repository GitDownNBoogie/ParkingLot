exports.index = function(req, res){
  res.render('index', { title: 'Parking Lot', description: 'This is the place for you to park.'});
};

exports.js_sandbox = function(req, res){
  res.render('js-sandbox', { title: 'Javascript Sandbox'});
};

exports.jade_sandbox = function(req, res){
    res.render('pricing',{
        title:"Jade Sandbox",
        prices:[
            {time:"Hour", cost:"10"},
            {time:"Day", cost:"100"},
            {time:"Week", cost:"800"}
        ]
    })
}