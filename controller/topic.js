const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


//Get all
const getTopics = async (req, res, next) => {
    try {
    mongodb.getDb().db().collection('topics').find().toArray((err, lists) => {
      if (err){
        res.status(400).json({message: err});
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
    } catch (err){
      res.status(500).json(err);
    }
    };

const getTopic = async (req, res, next) => {
    try {
        //  #swagger.parameters['id'] = { description: 'Get a specfic worker' }
    const userId = new ObjectId(req.params.id);
    mongodb.getDb().db().collection('topics').find({ _id: userId }).toArray((err, result) => {
        if (err){
        res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
    } catch (err){
    res.status(500).json(err);
    }
    };


module.exports = {getTopics, getTopic};