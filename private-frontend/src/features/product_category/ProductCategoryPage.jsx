import { useState } from 'react'
import Breadcrumb from '../../layouts/components/Breadcrumb'
import MainContentDisplay from '../../layouts/components/MainContentDisplay'
import EntityFilters from '../../shared/components/data_related/EntityFilters'
import EntityPageContainer from '../../shared/components/data_related/EntityPageContainer'
import EntityPageHeader from '../../shared/components/data_related/EntityPageHeader'
import EntityTable from '../../shared/components/data_related/EntityTable'
import MessageBox from '../../shared/components/MessageBox'
import MessageText from '../../shared/components/MessageText'
import SvgAdd from '../../shared/components/svgs/SvgAdd'
import SvgSearch from '../../shared/components/svgs/SvgSearch'
import { entitiesToDataframe } from '../../shared/utils/entity_utils'
import useCategories from './hooks/useCategories'
import useCategoriesParams from './hooks/useCategoriesParams'
import './product_category.css'
import Modal from '../../shared/components/Modal'
import EntityForm from '../../shared/components/data_related/EntityForm'

const CATEGORIES = [
  {
    id: 1,
    name: 'Cat1',
    dsc: 'Una dsc',
    created: '1/1/2025 02:00:00'
  },
  {
    id: 2,
    name: 'Cat___2',
    dsc: 'Una dsc de cat2 lorem efweagfyu egfywegfygwf wufwywfuywef wyf wefgywgfe uywg fge wfwf wufuywgfw fewfwfogwf uf wef wf wgfewufewy fw feu ffewufwgfewy fwug f',
    created: '2/2/2025 02:00:00'
  }
]

const filterControls = [
  {
    type: 'text',
    placeholder: 'Buscar por nombre',
    icon: <SvgSearch w={15} h={15} />,
    onSubmit: () => console.log('buscar')
  }
]

const ProductCategoryPage = () => {
  const { page, currentParams, setPage, setCurrentParams } = useCategoriesParams()
  const { categoriesQuery } = useCategories({ page, ...currentParams })
  const [modalOpen, setModalOpen] = useState(false)
  const [apiRes, setApiRes] = useState('')
  const [apiResType, setApiResType] = useState('')

  // IMPORTANTE: PASAR ESTE ISERROR AL ENTITY TABLE...
  //if (categoriesQuery.error) return <MessageBox message={categoriesQuery.error.message} type="error" />

  const { categories, total_pages } = categoriesQuery.data

  const btnList = [
    {
      label: 'Nueva Categoría',
      icon: <SvgAdd />,
      onClick: () => setModalOpen(true),
      variant: 'primary'
    }
  ]

  const entityFormControls = [
    {
      controlType: 'input',
      type: 'text',
      label: 'Nombre',
      name: 'name'
    },
    {
      controlType: 'textarea',
      label: 'Descripción',
      name: 'dsc'
    }
  ]

  const categoriesDataframe = entitiesToDataframe(
    ['id', 'nombre', 'descripción'],
    ['id', 'name', 'dsc'],
    CATEGORIES,
    btnList
  )

  return (
    <>
      <Breadcrumb />
      <MainContentDisplay>
        <EntityPageHeader
          title={'Categorías de producto'}
          sub={'Para organizar los productos del catálogo por categoría'}
          btnList={btnList}
        />

        <EntityPageContainer>
          <EntityFilters controls={filterControls} />
          <EntityTable
            dataFrame={categoriesDataframe}
            isLoading={categoriesQuery.isLoading}
          // isError={categoriesQuery.error}
          // errorMsg={categoriesQuery.error?.message ?? 'Error al cargar los datos, por favor intente nuevamente'}
          />
        </EntityPageContainer>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header title="Crear nueva categoría" onClose={() => setModalOpen(false)} />
          <Modal.Body>
            <EntityForm controls={entityFormControls} />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn-ghost" onClick={() => setModalOpen(false)}>Cancelar</button>
            <button className="btn-primary" onClick={() => setModalOpen(false)}>Confirmar</button>
          </Modal.Footer>
        </Modal>
      </MainContentDisplay>


    </>
  )
}

/*
EJEMPLO DE USO:
<>
    <div className="demo-area">
      <button className="btn-primary" onClick={() => setOpen(true)}>
        Abrir modal
      </button>
    </div>

    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <Modal.Header title="Confirmar acción" onClose={() => setOpen(false)} />
      <Modal.Body>
        <p style={{ fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.6 }}>
          Esto es el contenido del modal. Podés poner cualquier cosa acá:
          formularios, texto, tablas, lo que necesites.
        </p>
        <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 10 }}>
          Hacé click afuera de la caja o presioná <strong>Escape</strong> para cerrar.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-ghost" onClick={() => setOpen(false)}>Cancelar</button>
        <button className="btn-primary" onClick={() => setOpen(false)}>Confirmar</button>
      </Modal.Footer>
    </Modal>
</>
*/

export default ProductCategoryPage