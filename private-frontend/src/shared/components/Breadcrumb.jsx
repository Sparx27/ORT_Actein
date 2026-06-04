// Breadcrumb.jsx
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useBreadcrumbs } from './useBreadcrumbs'

/*
      EJEMPLO DE USO

  // ProductoDetalle.jsx
  import { useParams } from 'react-router-dom'
  import { useQuery } from '@tanstack/react-query'
  import { useMemo } from 'react'
  import Breadcrumb from './Breadcrumb'

  // Qué atributo del producto mostrar como label.
  // Si mañana el campo se llama distinto ('titulo', 'modelo'...),
  // cambiás SOLO esta línea y todo lo demás sigue funcionando.
  const LABEL_KEY = 'name'

  function ProductoDetalle() {
    // useParams lee las partes dinámicas de la ruta.
    // Si tu ruta está definida como "/productos/:id", acá id vale "2".
    const { id } = useParams()

    // useQuery (TanStack Query) maneja el fetch de datos por vos:
    // se encarga del cacheo, los reintentos, el estado de carga, etc.
    // - queryKey: identifica este dato en el caché. Incluye el id
    //   para que cada producto se cachee por separado.
    // - queryFn: la función que trae el dato (tu llamada al backend).
    const { data: producto } = useQuery({
      queryKey: ['producto', id],
      queryFn: () => fetchProducto(id),
    })

    // Armamos el override para el path de este producto.
    const overrides = useMemo(() => ({
      // producto?.[LABEL_KEY] usa "optional chaining" (?.):
      //   si producto todavía es undefined (cargando), toda la
      //   expresión da undefined SIN explotar.
      //
      // La sintaxis con corchetes [LABEL_KEY] accede a la propiedad
      //   cuyo nombre está guardado en la variable. Como LABEL_KEY es 'name',
      //   esto equivale a producto?.name. Si cambiás la constante a 'modelo',
      //   pasa a leer producto?.modelo automáticamente.
      [`/productos/${id}`]: producto?.[LABEL_KEY],
    }), [id, producto])

    return (
      <>
        <Breadcrumb overrides={overrides} />
      </>
    )
  }
*/

const Breadcrumb = ({ overrides }) => {
  const items = useBreadcrumbs(overrides)

  // En raíz "/" no hay segmentos
  if (items.length === 0) return null

  return (
    <div className="breadcrumb-bar">
      <nav className="breadcrumb-inner" aria-label="breadcrumb">
        {items.map((item, i) => (
          // Fragment agrupa elementos sin agregar un <div> extra al HTML.
          <Fragment key={item.path}>
            {i > 0 && <span className="bc-sep">›</span>}

            {item.isLast
              ? <span className="bc-current">{item.label}</span>
              : <Link to={item.path}>{item.label}</Link>}
          </Fragment>
        ))}
      </nav>
    </div>
  )
}

export default Breadcrumb