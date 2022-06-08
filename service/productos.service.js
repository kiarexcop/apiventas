const faker = require("faker");
const boom = require("@hapi/boom");

class ProductosService {

  constructor() {
    this.productos = [];
    this.generarDatos();
  }

  generarDatos(){
    const size =10;
    for (let index = 0;index <size; index ++){
      this.productos.push({
        id:faker.datatype.uuid(),
        nombre: faker.commerce.productName(),
        precio: parseInt(faker.commerce.price()),
        imagen: faker.image.imageUrl(),
        esVisible : faker.datatype.boolean()
      });
    }
  }

  create(producto){
    //const error = this.actualiza();
    producto.id = faker.datatype.uuid();
    this.productos.push(producto);
  }

  update(id,producto){
    const posicion = this.productos.findIndex(item =>item.id == id);
    if (posicion === -1) {
      throw boom.notFound("Producto no encontra");
    }
    this.productos[posicion] =producto;
    return this.productos[posicion];
  }

  async updateParcial(id,productoParcial){
    const posicion = this.productos.findIndex(item =>item.id == id);
    if (posicion === -1) {
      throw boom.notFound("Producto no encontradoooo");
    }
    const producto = this.productos[posicion];
    this.productos[posicion] ={
      ...producto,
      ...productoParcial
    };
    return this.productos[posicion];
  }

  delete(id){
    const posicion = this.productos.findIndex(item =>item.id == id);
    if (posicion === -1) {
      throw boom.notFound("Producto no encontra");
    }
    this.productos.splice(posicion,1);
    return {
      mensaje : "operacion realizada",
      id
    };
  }

  findAll(){
    return new Promise((resolve,reject)=>{
    setTimeout(() =>{
      resolve (this.productos);
    },
      5000)
   });
  }

  findBy(id){
    const producto = this.productos.find(item =>item.id === id);
    if (!producto){
      throw boom.notFound("Producto no encontrado");
    }
    if (!producto.esVisible){
      throw boom.forbidden("Producto no accesible");
    }
    return producto;
  }

}




module.exports = ProductosService;
