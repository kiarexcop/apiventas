const express = require("express");

const ProductosService = require("../service/productos.service");
const controlValidar = require("../middlewares/validar.middleware");
const {crearProductoSchema,actualizarProductoSchema,findByProductoSchema} = require("../schemas/producto.schemas")

const servicio = new ProductosService();
const router= express.Router();

router.get('/',async (req,res) => {
  const productos= await servicio.findAll();
  res.status(200).json(productos);
});

router.post('/',(req,res) => {
  const body = req.body;
  servicio.create(body);
  res.status(200).json({
    mensaje:"Registro exitoso",
    datos : body
  });
});

router.put('/:id',async(req,res,) => {
  const { id }= req.params;
  try {
    const body = req.body;
    const producto =await servicio.update(id,body);
    res.status(200).json(producto);
  } catch (error) {
    res.status(404).json({
      mensaje: error.message
    });
  }

});

router.patch('/:id',async(req,res, next) => {
  try {
    const { id }= req.params;
    const body = req.body;
    const producto =await servicio.updateParcial(id,body);
    res.status(200).json(producto);
  } catch (error) {
    /* res.status(404).json({
      mensaje: error.message
    }); */
    next(error);
  }

});

router.delete('/:id',(req,res) => {
  const { id }= req.params;
  const salida = servicio.delete(id);
  res.json(salida);
});



router.get('/:id',controlValidar(findByProductoSchema, 'params'),async(req,res, next) => {
  try {
    const {id}= req.params;
    const producto = await servicio.findBy(id);
    res.json(producto);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
