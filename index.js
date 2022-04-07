const express = require('express'); //require function is the easiest way to include modules in your project.
const Joi = require('@hapi/joi');

const app = express();  //express func creates an instance express app obj with methods of routing http reques. it is called app by tradition.
const joi=require('joi');//joi is use for validation 
app.use(express.json());   // we are using the use() method on app const, Use is the method to configure the middleware(is the func which receives the response and requests objs) used by the routes of the express HTTP server object. 
//Create READ REQUEST HANDLERS(are the functions that handle the client request and construct a response)
var bodyParser = require('body-parser');


const fruits=[
    {name:'Apples',id:1},
    {name:'banana',id:2},
    {name:'oranges',id:3},
    {name:'strawberry',id:4},
    {name:'raspberry',id:5},
    {name:'blackberry',id:6},
    {name:'cherries',id:7}
]

//route here inside the API client
//   app.get('/',(req,res)=>{
//       res.send('https://seabreeze.conteir.no/MAIN%2FSNOMEDCT-NO-DAILYBUILD/descriptions?conceptId=233604007&offset=0&limit=50');

//   });
//get method request to request data from a source
//req is an obj containing info about the http request that raised the event.
//res is an obj represents the http responses that an express app sends when it gets http requests. 
  app.get('/api/fruits',(req,res)=>{
      res.send(fruits);//response to the above request
  });
//search for indiviual id
  app.get('/api/fruits/:id', (req,res)=>{
      const fruit = fruits.find(c=> c.id ===parseInt(req.params.id));
      if(!fruits)res.status(404).send('fruit not found');
      res.send(fruit);

  });
  //create request handler
 app.post('/api/fruits',(req,res)=>{
 const {error}=validateFruit(req.body);
  if (error){
  res.status(400).send(error.details[0].message)
     return;
           }

const fruit = {
id:fruits.length + 1,
name: req.body.name
};
fruits.push(fruit);
res.send(fruit);

      
 });
 

 function validateFruit(fruit){
     
     

     const schema = Joi.object({name: Joi.string() .min(3) .required() });//string name of fruit with min 3 character
     const validation = schema.validate(fruit);
     return validation;
 }
//  function validateFruit(fruit){
//        const schema ={
//            name:Joi.string().min(3).required()
//      };
//    return Joi.validate(fruit,schema);
//     //   }
  //envirement port variable injected by node at runtime for your application represents the state of system envirement.
  const port =process.env.PORT|| 5001;// use default port or 5001 port
  app.listen(port,()=>console.log(`listening on port ${port}...`));//when app run it will display this message.  










