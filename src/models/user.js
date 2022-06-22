

  const { get } = require('superagent');
const superagent = require('superagent');
require('dotenv').config();
let userModel = {};


const baseURL = 'https://api.mercadolibre.com/';


/**
 * Funcion que ejecuta un query al API de MELI search para busqueda de items
 * @param {*} _query string parametro de busqueda
 * @param {*} callback retrono de la data 
 */
 userModel.searchItems = async (_query,callback)=> {

  // Varaibles
  let res = await queryItems(_query);

  let arrayItemsFiltered = [];

  let categories = [] ;

  /////

  /**
   * Ciclo forEach para guardar los string de las categorias de la busqueda, 
   * que serviran para el Bredcrumb
   */
  res.body.filters[0].values[0].path_from_root.forEach(element => {
     categories.push(element.name);
   });


  /**
   * Ciclo forEach para filtrar los datos necesarios de la API de MELI al frontEnd
   */
  res.body.results.forEach(element => {

    let objFiltered = {      
      id: element.id,
      title: element.title,
      price: {
        currency:element.currency_id,
        amount: element.price
      },
      picture: element.thumbnail,
      condition: element.condition,
      free_shipping: element.shipping.free_shipping  

    }

    /**Verificar que solo se obtengan los 4 primeros items */
    if(arrayItemsFiltered.length == 4){

      return;

    }else{
      
      arrayItemsFiltered.push(objFiltered);
    }

  });


  /**
   * Objeto final que se enviará al frontEnd 
   */
  let objToSend = {
    author:{
      name: process.env.AUTHOR_NAME,
      lastname: process.env.AUTHOR_LASTNAME
    },
    categories:categories,
    items: arrayItemsFiltered

  
  }

  callback(200,objToSend);   
   
 }


 /**
  * Funcion que ejecuta un query al API de MELI para consultar un Item por su ID
  * y retornar al FrontEnd un objeto con la data necesaria
  * @param {*} _id string con el ID del item a buscar
  * @param {*} callback 
  */
 userModel.getItemById = async (_id,callback)=>{

    // Varaibles

  let dataItem ;
  let itemDescription;

  ////

  try {

    /**
     * Array de peticiones al API de MELI consultando la data del ITEM y su descripción
     */
    [dataItem, itemDescription] = await Promise.all([
      queryItemById(_id),
      getItemDescription(_id)
      
    ])

  } catch (error) {
    callback(error.status,'Item no encontrado')
  } 

  /**
   * Objeto que se envia al front con la data necesaria 
   */
  let objToSend ={
    author:{
      name: process.env.AUTHOR_NAME,
      lastname: process.env.AUTHOR_LASTNAME
    },
    item:{
      id:dataItem.body.id,
      title: dataItem.body.title,
      price:{
        currency:dataItem.body.currency_id,
        amount:dataItem.body.price,        
      },
      picture:dataItem.body.pictures[0].url,
      condition:dataItem.body.condition,
      free_shipping:dataItem.body.shipping.free_shipping,
      sold_quantity:dataItem.body.sold_quantity,
      description: itemDescription.body.plain_text,
    }
  }
  callback(200,objToSend); 

 }

  

 
/**
 * Funcion que realiza el request a la API de MELI para buscar Items
 * @param {*} _query string con el parametro de busqueda
 * @returns 
 */
 function queryItems(_query){

 return  superagent.get(`${baseURL}sites/MLA/search`).query({q:_query}) 

 }

 /**
  * Funcion que realiza el request a la API de MELI para buscar Item por ID
  * @param {*} _id string ID del item
  * @returns 
  */
 function queryItemById(_id){  

  return superagent.get(`${baseURL}items/${_id}`)  
 
}

/**
 * Funcion que realiza el request a la API de MELI para buscar la descripcion del ITEM por su ID
 * @param {*} _id 
 * @returns 
 */
function getItemDescription(_id){  

  return superagent.get(`${baseURL}items/${_id}/description`)  
 
}

 

 module.exports = userModel;