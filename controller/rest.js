'use strict';

exports.ok = function(values, res) {
  var data = {
      'status': 200,
      'playload': values
  };
  res.json(data);
  res.end();
};

exports.update = function(values, res) {
  var data = {
      'status': 200,
      'message':'Data berhasil di update',
      'data': values
  };
  res.json(data);
  res.end();
};

exports.success = function(message,res){
  var response = {
    'status':200,
    'message':message
  }

  res.json(response);
  res.end();
}
exports.fail = function(err, res) {
  var data = {
      'status': 401,
      'message': err
  
  };
  res.json(data);
  res.end();

};
