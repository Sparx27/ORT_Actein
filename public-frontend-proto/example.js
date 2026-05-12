// EMPIEZA POR EL ROUTER:
// ejemplo carpeta routes/product_router.js

const router = express.Router()

router.put('/:productId', authMiddleware, updateProductController) // Fijate aca como llamo el controller para que lo use el router

// ...

/********************************* *********************************/


// LA SEGUNDA CAPA ES EL CONTROLLER:
// ejemplo carpeta controllers/product_controller.js

const updateProductController = async (req, res, next) => {
  try {
    const { productId } = req.params
    const requestingUserId = req.user.id // viene del middleware de auth
    const updated = await productUpdate(productId, req.body, requestingUserId) // Fijate aca como llama al service
    return res.status(200).json({ data: updated })
  } catch (error) {
    next(error)
  }
}

// ...

/********************************* *********************************/


// CAPA 4: SERVICE:
// ejemplo carpeta services/product_service.js

const productUpdate = async (productId, productData, requestingUserId) => {
  const product = await findProductById(productId) // Fijate aca como llama al repository
  if (!product) throw new NotFoundError(`Product ${productId} not found`)

  if (String(product.owner) !== String(requestingUserId)) {
    throw new ForbiddenError('You don\'t have permission to update this product')
  }

  if (productData.price && productData.price < 0) {
    throw new ValidationError('Price cannot be negative')
  }

  return await updateProduct(productId, productData) // Fijate aca como lo llama de nuevo al repository
}

// ...

/********************************* *********************************/


// CAPA 5: REPOSITORY:
// Ejemplo carpeta repositories/product_repository.js

const findProductById = async (productId) => {
  return await Product.findById(productId).lean()
}

const updateProduct = async (productId, productData) => {
  return await Product.findByIdAndUpdate(
    productId,
    { $set: productData },
    { new: true, runValidators: true }
  ).lean()
}


// Aca esa coneccion seria a Neon, si ma;ana cambia, entonces no hay que cambiar NADA de router, controller o service
// Lo mismo cambios de disenio en cualquier otra capa... mientras lo que devuelva cada metodo no cambie



/*
  QUE ES CADA COSA?

  Router
  Define las rutas y los middlewares que aplican a cada una. No tiene lógica, solo conecta una URL con su controller.

  Controller
  Recibe el request y devuelve el response. Extrae lo que necesita (req.params, req.body, req.user) y se lo pasa al service. No tiene lógica de negocio, no habla con la DB.

  Service
  El cerebro. Acá vive toda la lógica de negocio: validaciones, permisos, reglas. Usa el repository para acceder a los datos pero decide qué hacer con ellos y qué errores lanzar.

  Repository
  El único que habla con la base de datos. Solo hace queries y devuelve el resultado crudo. No sabe nada del negocio, no valida nada, si no encuentra algo devuelve null y listo.
*/