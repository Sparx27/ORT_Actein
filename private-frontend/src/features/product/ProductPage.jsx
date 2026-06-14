import { useState } from 'react'
import Breadcrumb from '../../layouts/components/Breadcrumb'
import MainContentDisplay from '../../layouts/components/MainContentDisplay'
import EntityFilters from '../../shared/components/data_related/EntityFilters'
import EntityPageContainer from '../../shared/components/data_related/EntityPageContainer'
import EntityPageHeader from '../../shared/components/data_related/EntityPageHeader'
import EntityTable from '../../shared/components/data_related/EntityTable'
import Modal from '../../shared/components/Modal'
import SvgAdd from '../../shared/components/svgs/SvgAdd'
import SvgSearch from '../../shared/components/svgs/SvgSearch'
import { entitiesToDataframe } from '../../shared/utils/entity_utils'
import useProducts from './hooks/useProducts'
import useProductsParams from './hooks/useProductsParams'
import SvgProducts from '../../shared/components/svgs/SvgProducts'
import EntityFormHeader from '../../shared/components/data_related/EntityFormHeader'
import EntityForm from '../../shared/components/data_related/EntityForm'
import Button from '../../shared/components/Button'
import SvgEdit from '../../shared/components/svgs/SvgEdit'
import SvgDelete from '../../shared/components/svgs/SvgDelete'
import EntityPagination from '../../shared/components/data_related/EntityPagination'
import TagCell from '../../shared/components/data_related/table_renders/TagCell'
import StatusBadge from '../../shared/components/data_related/table_renders/StatusBadge'
import TitleAndSub from '../../shared/components/data_related/table_renders/TitleAndSub'



const filterControls = [
  {
    type: 'text',
    placeholder: 'Buscar por nombre',
    icon: <SvgSearch w={15} h={15} />,
    onSubmit: () => console.log('buscar')
  }
]

const PRODUCTS = [
  {
    id: 1,
    name: 'Compresor Hermético 1/2 HP',
    dsc: 'Compresor para cámaras frigoríficas y equipos de refrigeración comercial. Bajo nivel de ruido y alta eficiencia energética.',
    catery_name: 'Compresores',
    category_id: 1,
    brand: 'Embraco',
    isActive: true
  },
  {
    id: 2,
    name: 'Gas Refrigerante R134a 13.6kg',
    dsc: 'Refrigerante de alta pureza para sistemas de refrigeración comercial e industrial. Ideal para mantenimiento y recarga.',
    catery_name: 'Gases Refrigerantes',
    category_id: 2,
    brand: 'Chemours',
    isActive: true
  },
  {
    id: 3,
    name: 'Evaporador Cúbico 3 Ventiladores',
    dsc: 'Evaporador de techo para cámaras de conservación. Construcción en aluminio con serpentín de cobre.',
    catery_name: 'Evaporadores',
    category_id: 3,
    brand: 'LU-VE',
    isActive: true
  },
  {
    id: 4,
    name: 'Condensador Axial 2 HP',
    dsc: 'Unidad condensadora con ventiladores axiales de alto rendimiento para aplicaciones de media temperatura.',
    catery_name: 'Condensadores',
    category_id: 4,
    brand: 'Güntner',
    isActive: true
  },
  {
    id: 5,
    name: 'Controlador Digital de Temperatura',
    dsc: 'Control electrónico con display LED, programación de deshielo y alarmas configurables.',
    catery_name: 'Controladores',
    category_id: 5,
    brand: 'Dixell',
    isActive: true
  },
  {
    id: 6,
    name: 'Válvula de Expansión Termostática',
    dsc: 'Válvula para regulación precisa del flujo de refrigerante en sistemas comerciales.',
    catery_name: 'Válvulas',
    category_id: 6,
    brand: 'Danfoss',
    isActive: true
  },
  {
    id: 7,
    name: 'Motor Ventilador 16W 220V',
    dsc: 'Motor universal para evaporadores y vitrinas refrigeradas. Bajo consumo y larga vida útil.',
    catery_name: 'Motores',
    category_id: 7,
    brand: 'Elco',
    isActive: true
  },
  {
    id: 8,
    name: 'Filtro Deshidratador Soldable',
    dsc: 'Filtro para eliminación de humedad e impurezas en circuitos frigoríficos.',
    catery_name: 'Accesorios',
    category_id: 8,
    brand: 'Castel',
    isActive: true
  },
  {
    id: 9,
    name: 'Cámara Frigorífica Modular 12m³',
    dsc: 'Paneles modulares de poliuretano para conservación de productos frescos y congelados.',
    catery_name: 'Cámaras Frigoríficas',
    category_id: 9,
    brand: 'ColdKit',
    isActive: false
  },
  {
    id: 10,
    name: 'Manómetro Digital para Refrigeración',
    dsc: 'Equipo profesional para medición de presión y temperatura en sistemas HVAC/R.',
    catery_name: 'Herramientas',
    category_id: 10,
    brand: 'Testo',
    isActive: true
  }
]

const CATEGORIES = [
  {
    value: 1,
    label: 'Cat1',
  },
  {
    value: 2,
    label: 'Cat___2',
  }
]

const ProductPage = () => {
  const { page, currentParams, setPage, setCurrentParams } = useProductsParams()
  const { productsQuery } = useProducts({ page, ...currentParams })
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingProduct, setDeletingProduct] = useState(null)

  // IMPORTANTE: PASAR ESTE ISERROR AL ENTITY TABLE...
  //if (productsQuery.error) return <MessageBox message={productsQuery.error.message} type="error" />

  const { categories, total_pages } = productsQuery.data

  const btnHeaderList = [
    {
      label: 'Nuevo Producto',
      icon: <SvgAdd />,
      onClick: () => setCreateModalOpen(true),
      variant: 'primary'
    }
  ]

  const btnList = [
    {
      icon: <SvgEdit />,
      onClick: (row) => {
        const product = PRODUCTS.find(c => String(c.id) === String(row[0]))
        setEditingProduct(product)
        setEditModalOpen(true)
      }
    },
    {
      icon: <SvgDelete />,
      onClick: (row) => {
        const product = PRODUCTS.find(c => String(c.id) === String(row[0]))
        setDeletingProduct(product)
        setDeleteModalOpen(true)
      },
      danger: true
    }
  ]

  const productsView = PRODUCTS.map(p => ({
    ...p,
    namebrand: { title: p.name, sub: p.brand },
    isactive: p.isActive
  }))

  const productsDataframe = entitiesToDataframe(
    ['id', 'nombre', 'categoría', 'activo'],
    ['id', 'nameBrand', 'catery_name', 'isActive'],
    productsView,
    btnList
  )

  productsDataframe.renders = {
    1: (v) => <TitleAndSub title={v.title} sub={v.sub} />,
    2: (v) => <TagCell>{v}</TagCell>,
    3: (v) => <StatusBadge active={v} />
  }

  const handleCreate = (data) => {
    console.log(data)
    setCreateModalOpen(false)
  }

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
    },
    {
      controlType: 'combobox',
      label: 'Categoría',
      name: 'category_id',
      options: CATEGORIES,
      placeholder: 'Seleccionar'
    },
  ]

  const handleEdit = (data) => {
    console.log(data)
    setEditModalOpen(false)
  }

  const handleDelete = () => {
    console.log('eliminar', deletingProduct?.id)
    setDeleteModalOpen(false)
  }

  return (
    <>
      <Breadcrumb />
      <MainContentDisplay>
        <EntityPageHeader
          title={'Productos'}
          btnList={btnHeaderList}
        />

        <EntityPageContainer>
          <EntityFilters controls={filterControls} />
          <EntityTable
            dataFrame={productsDataframe}
            isLoading={productsQuery.isLoading}
          //isError={productsQuery.error}
          //errorMsg={productsQuery.error?.message ?? 'Error al cargar los datos, por favor intente nuevamente'}
          />
          <EntityPagination
            currentPage={page}
            totalPages={productsQuery?.total_pages ?? 10}
            onPageChange={setPage}
          />
        </EntityPageContainer>

        <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)}>
          <Modal.Header onClose={() => setCreateModalOpen(false)}>
            <EntityFormHeader title="Crear nuevo producto" icon={<SvgProducts />} />
          </Modal.Header>
          <Modal.Body>
            <EntityForm
              formId="create-product-form"
              controls={entityFormControls}
              onSubmit={handleCreate}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setCreateModalOpen(false)}>Cancelar</Button>
            <Button type="submit" form="create-product-form">Confirmar</Button>
          </Modal.Footer>
        </Modal>

        <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <Modal.Header onClose={() => setEditModalOpen(false)}>
            <EntityFormHeader title="Editar categoría" icon={<SvgProducts />} />
          </Modal.Header>
          <Modal.Body>
            <EntityForm
              controls={entityFormControls}
              onSubmit={handleEdit}
              values={editingProduct ? { name: editingProduct.name, dsc: editingProduct.dsc, category_id: editingProduct.category_id } : undefined}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setEditModalOpen(false)}>Cancelar</Button>
            <Button onClick={() => setEditModalOpen(false)}>Confirmar</Button>
          </Modal.Footer>
        </Modal>

        <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <Modal.Header title="Eliminar categoría" onClose={() => setDeleteModalOpen(false)} />
          <Modal.Body>
            <p className="modal-confirm-text">
              ¿Seguro que querés eliminar la categoría <strong>{deletingProduct?.name}</strong>?
            </p>
            <p className="modal-confirm-text">Esta acción no se puede deshacer.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
            <Button danger onClick={handleDelete}>Eliminar</Button>
          </Modal.Footer>
        </Modal>

      </MainContentDisplay>
    </>
  )
}

export default ProductPage