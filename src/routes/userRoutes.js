const User = require('../models/user')


module.exports = function (app){  


    /**
     * Ruta para realizar busqueda de items 
     */
     app.get('/api/items',(req, res) => {

        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'GET,'


        let query = req.query.q; // variable que obtiene el parameto de busqueda. 

        User.searchItems(query,(err,data)=>{
            res.status(200).json(data);
        })
     })

     /**
      * Ruta para realizar busqueda de Item por ID
      */
     app.get('/api/items/:id',(req, res) => {

        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'GET,'

        let id = req.params.id; // variable que obtiene el ID del item a buscar

        User.getItemById( id, (status,data)=>{
            
            res.status(status).json(data);
        })
     })

 

     
   
     
}