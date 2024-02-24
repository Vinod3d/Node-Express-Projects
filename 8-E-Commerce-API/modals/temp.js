import {
    ObjectId
  } from 'mongodb';
  
  [
    {
      '$match': {
        'product': new ObjectId('65d80f47c74e3a194be963c4')
      }
    }, {
      '$group': {
        '_id': null, 
        'averageRating': {
          '$avg': '$rating'
        }, 
        'numberofReview': {
          '$sum': 1
        }
      }
    }
  ]