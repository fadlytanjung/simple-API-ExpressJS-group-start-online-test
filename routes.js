'use strict';

module.exports = function(app) {
    var todo = require('./controller');

    app.route('/')
        .get(todo.index);
    
    app.route('/register')
        .post(todo.register);

    app.route('/user/:id')
        .get(todo.user);
    
    app.route('/match')
        .get(todo.match);
};