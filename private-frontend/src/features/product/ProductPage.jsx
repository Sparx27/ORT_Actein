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
import useProductsCats from './hooks/useProductsCats'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { API_FIELDS, FILTER_PARAMS } from './config/fieldsConfig'
import { UI_CONFIG } from './config/uiConfig'
import useCreateProduct from './hooks/useCreateProduct'

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

const { API_SEARCH, API_CATEGORY, API_BRAND, API_IS_ACTIVE } = API_FIELDS

const ProductPage = () => {
  const { page, currentParams, setPage, setCurrentParams } = useProductsParams()
  const { productsQuery } = useProducts({ page, ...currentParams })
  const { productCats } = useProductsCats()
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingProduct, setDeletingProduct] = useState(null)
  const [searchParams] = useSearchParams()
  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: Object.fromEntries(
      Object.entries(FILTER_PARAMS).map(
        ([apiField, urlParam]) => [apiField, searchParams.get(urlParam) ?? '']
      )
    )
  })

  // SHARED
  const parsedCats = productCats?.data?.map(c => { return { value: c.id, label: c.name } }) ?? []

  // FILTER DATA
  const handleFilterSubmit = (data) => {
    setCurrentParams(data)
  }

  const filterControls = UI_CONFIG.formFilterControls(control, parsedCats)

  const handleCleanFilters = () => {
    Object.keys(FILTER_PARAMS).forEach(field => setValue(field, ''))
    setCurrentParams()
  }

  // CREATE DATA
  const btnHeaderList = UI_CONFIG.btnHeaderList(setCreateModalOpen)

  const { createMutation } = useCreateProduct()

  const handleCreate = (data) => {
    console.log(data)
    const body = {
      sku: data.c_sku || null,
      name: data.c_name,
      description: data.c_description || null,
      category_id: data.c_category_id || null,
      brand: data.c_brand,
      specifications: data.c_specifications || null,
      requires_installation: data.c_requires_installation,
      maintenance_time: data.c_maintenance_time ? Number(data.c_maintenance_time) : null,
    }
    createMutation.mutate(body)
  }

  const entityFormControls = UI_CONFIG.formCreateControls(parsedCats)

  // EDIT DATA
  const handleEdit = (data) => {
    console.log(data)
    setEditModalOpen(false)
  }

  // DELETE DATA
  const handleDelete = () => {
    console.log('eliminar', deletingProduct?.id)
    setDeleteModalOpen(false)
  }

  // SHOW DATA
  const apiData = productsQuery.data

  // Edit & Delete Actions
  const btnEntityActions = UI_CONFIG.tableActions(
    setEditingProduct,
    setEditModalOpen,
    setDeletingProduct,
    setDeleteModalOpen,
    PRODUCTS)

  const productsView = apiData?.products?.map(p => ({
    ...p,
    name_brand: { title: p.name, sub: p.brand },
  })) || []

  const productsDataframe = entitiesToDataframe(
    UI_CONFIG.tableColumns,
    productsView,
    btnEntityActions
  )

  return (
    <>
      <Breadcrumb />
      <MainContentDisplay>
        <EntityPageHeader
          title={'Productos'}
          btnList={btnHeaderList}
        />

        <EntityPageContainer>
          <EntityFilters
            onSubmit={handleSubmit(handleFilterSubmit)}
            register={register}
            controls={filterControls}
            reset={handleCleanFilters}
          />
          <EntityTable
            dataFrame={productsDataframe}
            isLoading={productsQuery.isLoading}
            isError={productsQuery.error}
            errorMsg={productsQuery.error?.message ?? 'Error al cargar los datos, por favor intente nuevamente'}
          />
          <EntityPagination
            currentPage={page}
            totalPages={apiData?.total_pages ?? 1}
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
              apiRes={
                createMutation.isError ? createMutation.error.message
                  : createMutation.isSuccess ? 'Producto creado correctamente'
                    : null
              }
              apiResType={createMutation.isError ? 'error' : 'success'}
              isSuccess={createMutation.isSuccess}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost">Cancelar</Button>
            <Button type="submit" form="create-product-form" loading={createMutation.isPending}>Confirmar</Button>
          </Modal.Footer>
        </Modal>

        <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <Modal.Header onClose={() => setEditModalOpen(false)}>
            <EntityFormHeader title="Editar categoría" icon={<SvgProducts />} />
          </Modal.Header>
          <Modal.Body>
            <EntityForm
              controls={[]}
              onSubmit={handleEdit}
              values={editingProduct ? { name: editingProduct.name, dsc: editingProduct.dsc, category_id: editingProduct.category_id } : undefined}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setEditModalOpen(false)}>Cancelar</Button>
            <Button onClick={() => setEditModalOpen(false)}>Confirmar</Button>
          </Modal.Footer>
        </Modal>

        <Modal variant="danger" isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <Modal.Header title="Eliminar categoría" onClose={() => setDeleteModalOpen(false)} />
          <Modal.Body>
            <p className="modal-confirm-text">
              ¿Seguro que querés desactivar el producto <strong>{deletingProduct?.name}</strong>?
            </p>
            <p className="modal-confirm-text">No estará disponible para futuras cotizaciones hasta reactivarse.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
            <Button variant="danger" onClick={handleDelete}>Desactivar</Button>
          </Modal.Footer>
        </Modal>

      </MainContentDisplay>
    </>
  )
}

export default ProductPage