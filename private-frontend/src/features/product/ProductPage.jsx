import { useState } from 'react'
import Breadcrumb from '../../layouts/components/Breadcrumb'
import MainContentDisplay from '../../layouts/components/MainContentDisplay'
import EntityPageContainer from '../../shared/components/data_related/EntityPageContainer'
import EntityTable from '../../shared/components/data_related/EntityTable'
import { entitiesToDataframe } from '../../shared/utils/entity_utils'
import { API_FIELDS, URL_PARAMS, FILTER_PARAMS } from './config/fieldsConfig'
import { UI_CONFIG } from './config/uiConfig'
import useGetEntities from '../../shared/hooks/api_call/useGetEntities'
import { editProduct, getProduct, getProductCats, getProducts, postProduct, toggleProduct } from './services/queryProduct'
import useEntityParams from '../../shared/hooks/api_call/useEntityParams'
import EntityPagination from '../../shared/components/data_related/EntityPagination'
import EntityFilters from '../../shared/components/data_related/EntityFilters'
import useEntityFilter from '../../shared/hooks/data_related/useEntityFilter'
import EntityPageHeader from '../../shared/components/data_related/EntityPageHeader'
import Modal from '../../shared/components/Modal'
import EntityFormHeader from '../../shared/components/data_related/EntityFormHeader'
import SvgProducts from '../../shared/components/svgs/SvgProducts'
import Button from '../../shared/components/Button'
import useEntityForm from '../../shared/hooks/data_related/useEntityForm'
import EntityForm from '../../shared/components/data_related/EntityForm'
import useEntityCreate from '../../shared/hooks/api_call/useEntityCreate'
import useEntityEdit from '../../shared/hooks/api_call/useEntityEdit'
import useEntityGetById from '../../shared/hooks/api_call/useEntityGetById'
import useEntityToggleState from '../../shared/hooks/api_call/useEntityToggleState'

const { URL_PAGE } = URL_PARAMS
const { API_SEARCH, API_CATEGORY, API_BRAND, API_IS_ACTIVE, API_PAGE } = API_FIELDS

const ProductPage = () => {
  const { page, currentParams, setPage, setCurrentParams } = useEntityParams(URL_PAGE, API_PAGE, FILTER_PARAMS)
  const { entitiesQuery: productsQuery } = useGetEntities('products', getProducts, { page, ...currentParams })
  const { entitiesQuery: productCatsQuery } = useGetEntities('productCatOpts', getProductCats)

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(undefined)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingProduct, setDeletingProduct] = useState(null)

  const parsedCats = productCatsQuery?.data?.map(c => { return { value: c.id, label: c.name } }) ?? []

  // GET PRODUCTS & TABLE ROWS AND BTNS
  const apiData = productsQuery.data

  function onClickEditBtn(productId) {
    if (productId) {
      setEditingProduct(productId)
    }
    setEditModalOpen(true)
  }

  function onClickToggleBtn(product) {
    if (!product) product = []
    toggleStateMutation.reset()
    setDeletingProduct(product)
    setDeleteModalOpen(true)
  }

  const btnEntityActions = UI_CONFIG.tableActions(
    onClickEditBtn,
    onClickToggleBtn)

  const productsView = apiData?.products?.map(p => ({
    ...p,
    name_brand: { title: p.name, sub: p.brand },
  })) || []

  const productsDataframe = entitiesToDataframe(
    UI_CONFIG.tableColumns,
    productsView,
    btnEntityActions
  )
  // END GET PRODUCTS & TABLE ROWS AND BTNS

  // FILTER PRODUCTS
  const {
    register: filterRegister,
    handleSubmit: filterHandleSubmit,
    control: filterControl,
    reset: filterReset } = useEntityFilter(FILTER_PARAMS)

  const filterControls = UI_CONFIG.formFilterControls(filterControl, parsedCats)

  function handleFilterSubmit(data) {
    setCurrentParams(data)
  }

  function handleCleanFilters() {
    filterReset()
    setCurrentParams()
  }
  // END FILTER PRODUCTS

  // CREATE NEW PRODUCT
  const { createMutation } = useEntityCreate(postProduct, 'products')
  const {
    register: createRegister,
    control: createControl,
    errors: createErrors,
    submitHandler: createSubmitHandler,
    reset: createReset
  } = useEntityForm({ isSuccess: createMutation.isSuccess, onSubmit: handleCreate })

  const [createModalOpen, setCreateModalOpen] = useState(false)

  const createFormControls = UI_CONFIG.formCreateControls(parsedCats)
  const btnHeaderList = UI_CONFIG.btnHeaderList(handleCreateOpenModal)

  function handleCreate(data) {
    const reqBody = {
      sku: data.c_sku || null,
      name: data.c_name,
      description: data.c_description || null,
      category_id: data.c_category_id || null,
      brand: data.c_brand,
      specifications: data.c_specifications || null,
      requires_installation: data.c_requires_installation,
      maintenance_time: data.c_maintenance_time ? Number(data.c_maintenance_time) : null,
    }
    createMutation.mutate(reqBody)
  }

  function handleCreateOpenModal() {
    createReset()
    setCreateModalOpen(true)
  }

  function handleCreateCloseModal() {
    createReset()
    setCreateModalOpen(false)
  }
  // END CREATE NEW PRODUCT

  // EDIT PRODUCT
  const { entityByIdQuery: productByIdQuery } = useEntityGetById(
    getProduct,
    'product',
    editingProduct
  )
  const { editMutation } = useEntityEdit(editProduct, 'products', 'product')
  const {
    register: editRegister,
    control: editControl,
    errors: editErrors,
    submitHandler: editSubmitHandler,
    reset: editReset
  } = useEntityForm({
    values: productByIdQuery.data ? {
      e_sku: productByIdQuery.data.sku ?? '',
      e_name: productByIdQuery.data.name ?? '',
      e_description: productByIdQuery.data.description ?? '',
      e_category_id: productByIdQuery.data.category_id ?? '',
      e_brand: productByIdQuery.data.brand ?? '',
      e_specifications: productByIdQuery.data.specifications ?? '',
      e_maintenance_time: productByIdQuery.data.maintenance_time ?? '',
      e_requires_installation: productByIdQuery.data.requires_installation ?? false,
    } : undefined,
    isSuccess: editMutation.isSuccess,
    onSubmit: handleEdit
  })

  const editFormControls = UI_CONFIG.formEditControls(parsedCats)

  function handleEdit(data) {
    const body = {
      sku: data.e_sku || null,
      name: data.e_name,
      description: data.e_description || null,
      category_id: data.e_category_id || null,
      brand: data.e_brand,
      specifications: data.e_specifications || null,
      maintenance_time: data.e_maintenance_time ? Number(data.e_maintenance_time) : null,
      requires_installation: data.e_requires_installation,
    }
    editMutation.mutate({ id: editingProduct, body })
  }

  function handleEditOpenModal() {
    editReset()
    editMutation.reset()
    setEditModalOpen(true)
  }

  function handleEditCloseModal() {
    editReset()
    editMutation.reset()
    setEditModalOpen(false)
  }
  // END EDIT PRODUCT

  // TOGGLE PRODUCT STATUS
  const { toggleStateMutation } = useEntityToggleState(toggleProduct, 'products')

  function handleToggleState() {
    if (!deletingProduct) {
      handleCloseDeleteModal()
      return
    }
    toggleStateMutation.mutate(
      { id: deletingProduct[0], is_active: !deletingProduct[3] },
      {
        onSuccess: () => {
          setDeletingProduct(null)
          setDeleteModalOpen(false)
        }
      }
    )
  }

  function handleCloseDeleteModal() {
    toggleStateMutation.reset()
    setDeletingProduct(null)
    setDeleteModalOpen(false)
  }
  // END TOGGLE PRODUCT STATUS

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
            onSubmit={filterHandleSubmit(handleFilterSubmit)}
            register={filterRegister}
            controls={filterControls}
            reset={handleCleanFilters}
          />
          <EntityTable
            dataFrame={productsDataframe}
            isLoading={productsQuery.isLoading}
            isFetching={productsQuery.isFetching || toggleStateMutation.isPending}
            isError={productsQuery.error}
            errorMsg={productsQuery.error?.message ?? 'Error al cargar los datos, por favor intente nuevamente'}
          />
          <EntityPagination
            currentPage={page}
            totalPages={apiData?.total_pages ?? 1}
            onPageChange={setPage}
          />
        </EntityPageContainer>

        {/* CREATE MODAL */}
        <Modal isOpen={createModalOpen} onClose={handleCreateCloseModal}>
          <Modal.Header onClose={handleCreateCloseModal}>
            <EntityFormHeader title="Crear nuevo producto" icon={<SvgProducts />} />
          </Modal.Header>
          <Modal.Body>
            <EntityForm
              formId="create-product-form"
              controls={createFormControls}
              register={createRegister}
              control={createControl}
              submitHandler={createSubmitHandler}
              errors={createErrors}
              isSuccess={createMutation.isSuccess}
              apiRes={
                createMutation.isError ? createMutation.error.message
                  : createMutation.isSuccess ? 'Producto creado correctamente'
                    : null
              }
              apiResType={createMutation.isError ? 'error' : 'success'}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={handleCreateCloseModal}>Cancelar</Button>
            <Button type="submit" form="create-product-form" loading={createMutation.isPending}>Confirmar</Button>
          </Modal.Footer>
        </Modal>

        {/* EDIT MODAL */}
        <Modal isOpen={editModalOpen} onClose={handleEditCloseModal}>
          <Modal.Header onClose={handleEditCloseModal}>
            <EntityFormHeader title="Editar producto" icon={<SvgProducts />} />
          </Modal.Header>
          <Modal.Body>
            <EntityForm
              formId="edit-product-form"
              controls={editFormControls}
              register={editRegister}
              control={editControl}
              errors={editErrors}
              submitHandler={editSubmitHandler}
              isSuccess={editMutation.isSuccess}
              apiRes={
                editMutation.isError ?
                  editMutation.error.message
                  : editMutation.isSuccess ? 'Producto actualizado correctamente'
                    : null
              }
              apiResType={editMutation.isError ? 'error' : 'success'}
              isLoadingData={productByIdQuery.isFetching}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={handleEditCloseModal}>Cancelar</Button>
            <Button type="submit" form="edit-product-form"
              loading={productByIdQuery.isFetching || editMutation.isPending}>Confirmar</Button>
          </Modal.Footer>
        </Modal>

        {/* TOGGLE STATUS MODAL */}
        <Modal
          variant={deletingProduct && (deletingProduct[3] ? 'danger' : '')}
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
        >
          <Modal.Header onClose={handleCloseDeleteModal}>
            <EntityFormHeader title="Modificar estado producto" />
          </Modal.Header>
          <Modal.Body>
            {deletingProduct && (
              deletingProduct[3] ? (
                <>
                  <p className="modal-confirm-text">
                    ¿Seguro que querés desactivar el producto <strong>{deletingProduct && deletingProduct[1].title}</strong>?
                  </p>
                  <p className="modal-confirm-text">No estará disponible para futuras cotizaciones hasta reactivarse.</p>
                </>
              ) : (
                <p className="modal-confirm-text">Activar producto <strong>{deletingProduct && deletingProduct[1].title}</strong>?</p>
              )
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={handleCloseDeleteModal}>Cancelar</Button>
            <Button
              variant={deletingProduct && (deletingProduct[3] ? 'danger' : 'primary')}
              onClick={handleToggleState}
              loading={toggleStateMutation.isPending}
            >
              {deletingProduct && (deletingProduct[3] ? 'Desactivar' : 'Activar')}
            </Button>
          </Modal.Footer>
        </Modal>

      </MainContentDisplay>
    </>
  )
}

export default ProductPage