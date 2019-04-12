'use strict';

var response = require('./rest');
var fs = require('fs');
var dummydb = require('../database/dummydb.json')

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

exports.user = function(req,res){
    var id = req.params.id
    var result = {}
    for(let i in dummydb){
       
        if(dummydb[i].facebook_id == id){
            result = dummydb[i]
        }
        
    }
    for(let i in result.friends){
        for(let j in dummydb){
            
            if(dummydb[j].facebook_id==result.friends[i].facebook_id){
                result.friends[i].name = dummydb[j].name 
            }
            
        }
    }   

    response.ok(result,res);

}

exports.match = function(req,res){
    
    var mutual = []
    
    for(let i in dummydb){
        
        for(let j in dummydb[i].friends){
            var id_a = dummydb[i].facebook_id
            var age_a = dummydb[i].age
            var name_a = dummydb[i].name
            let id_b = dummydb[i].friends[j].facebook_id

            var arr = []
            let match = matching(id_b,dummydb)

            if(match[0]!= undefined){
                if(match[0].age == age_a){
                    for(let i in match[0].friends){
                        if(match[0].friends[i].facebook_id == id_a){

                            
                            arr.push({"facebook_id":id_a,"name":name_a},
                            {"facebook_id":match[0].facebook_id,"name":match[0].name})

                            mutual.push({
                                "match":arr
                            })
                            
                            console.log(match[0].facebook_id+' cocok dengan '+id_a)
                            
                        }
                    }
                }
            }
            
        }

    }

    response.ok(mutual,res)

}


exports.register = function(req,res){
    var person = req.body

    dummydb.push(person)
    
    savePersonToDummyDb(dummydb, function(err) {
        if (err) {
            response.fail(String(error),res);
        }else{
            response.success('User successfully added',res);
        }
      });
}

function savePersonToDummyDb(person, callback) {
    fs.writeFile('./database/dummydb.json', JSON.stringify(person), callback);
}

function matching(id,words){
    let match = words.filter(word => word.facebook_id == id);
    return match
}

async function asyncForEach(array, callback) {
    for (let i in array) {
      await callback(array[i], i, array);
    }
}

const pushData = async (store,data) => {
    return await store.push(data)
  }