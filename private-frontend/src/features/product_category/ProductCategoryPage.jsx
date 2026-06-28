import { useState } from 'react'
import Breadcrumb from '../../layouts/components/Breadcrumb'
import MainContentDisplay from '../../layouts/components/MainContentDisplay'
import EntityPageHeader from '../../shared/components/data_related/EntityPageHeader'
import useEntityParams from '../../shared/hooks/api_call/useEntityParams'
import useGetEntities from '../../shared/hooks/api_call/useGetEntities'
import { API_FIELDS, FILTER_PARAMS, URL_PARAMS } from './config/fieldsConfig'
import { UI_CONFIG } from './config/uiConfig'
import { editCategory, getCategories, getCategory, postCategory, toggleCategory } from './services/queryCategory'
import EntityPageContainer from '../../shared/components/data_related/EntityPageContainer'
import Modal from '../../shared/components/Modal'
import EntityFormHeader from '../../shared/components/data_related/EntityFormHeader'
import SvgProducts from '../../shared/components/svgs/SvgProducts'
import EntityForm from '../../shared/components/data_related/EntityForm'
import Button from '../../shared/components/Button'
import useEntityCreate from '../../shared/hooks/api_call/useEntityCreate'
import useEntityForm from '../../shared/hooks/data_related/useEntityForm'
import SvgTag from '../../shared/components/svgs/SvgTag'
import EntityFilters from '../../shared/components/data_related/EntityFilters'
import useEntityFilter from '../../shared/hooks/data_related/useEntityFilter'
import EntityTable from '../../shared/components/data_related/EntityTable'
import { entitiesToDataframe } from '../../shared/utils/entity_utils'
import EntityPagination from '../../shared/components/data_related/EntityPagination'
import useEntityToggleState from '../../shared/hooks/api_call/useEntityToggleState'
import MessageBox from '../../shared/components/MessageBox'
import useEntityGetById from '../../shared/hooks/api_call/useEntityGetById'
import useEntityEdit from '../../shared/hooks/api_call/useEntityEdit'

const { URL_PAGE } = URL_PARAMS
const { API_SEARCH, API_CATEGORY, API_BRAND, API_IS_ACTIVE, API_PAGE } = API_FIELDS

const ProductCategoryPage = () => {
  const { page, currentParams, setPage, setCurrentParams } = useEntityParams(URL_PAGE, API_PAGE, FILTER_PARAMS)
  const { entitiesQuery: categoriesQuery } = useGetEntities('categories', getCategories, { page, ...currentParams })

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(undefined)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingCategory, setDeletingCategory] = useState(null)

  // GET PRODUCTS & TABLE ROWS AND BTNS
  const apiData = categoriesQuery.data

  function onClickEditBtn(categoryId) {
    if (categoryId) {
      setEditingCategory(categoryId)
    }
    setEditModalOpen(true)
  }

  function onClickToggleBtn(category) {
    if (!category) category = []
    toggleStateMutation.reset()
    setDeletingCategory(category)
    setDeleteModalOpen(true)
  }

  const btnEntityActions = UI_CONFIG.tableActions(
    onClickEditBtn,
    onClickToggleBtn)

  const productsView = apiData?.categories

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

  const filterControls = UI_CONFIG.formFilterControls(filterControl)

  function handleFilterSubmit(data) {
    setCurrentParams(data)
  }

  function handleCleanFilters() {
    filterReset()
    setCurrentParams()
  }
  // END FILTER PRODUCTS

  // CREATE NEW CATEGORY
  const { createMutation: createCategoryMutation } = useEntityCreate(postCategory, 'categories')
  const {
    register: createCategoryRegister,
    control: createCategoryControl,
    errors: createCategoryErrors,
    submitHandler: createCategorySubmitHandler,
    reset: createCategoryReset
  } = useEntityForm({ isSuccess: createCategoryMutation.isSuccess, onSubmit: handleCreate })

  const [createModalOpen, setCreateModalOpen] = useState(false)

  const createFormControls = UI_CONFIG.formCreateControls()
  const btnHeaderList = UI_CONFIG.btnHeaderList(handleCreateOpenModal)

  function handleCreate(data) {
    const reqBody = {
      name: data.c_name,
      description: data.c_description || null
    }
    createCategoryMutation.mutate(reqBody)
  }

  function handleCreateOpenModal() {
    createCategoryMutation.reset()
    createCategoryReset()
    setCreateModalOpen(true)
  }

  function handleCreateCloseModal() {
    createCategoryMutation.reset()
    createCategoryReset()
    setCreateModalOpen(false)
  }
  // END CREATE NEW CATEGORY

  // EDIT PRODUCT
  const { entityByIdQuery: categoryByIdQuery } = useEntityGetById(
    getCategory,
    'category',
    editingCategory
  )
  const { editMutation } = useEntityEdit(editCategory, 'categories', 'category')
  const {
    register: editRegister,
    control: editControl,
    errors: editErrors,
    submitHandler: editSubmitHandler,
    reset: editReset
  } = useEntityForm({
    values: categoryByIdQuery.data ? {
      e_name: categoryByIdQuery.data.name ?? '',
      e_description: categoryByIdQuery.data.description ?? ''
    } : undefined,
    isSuccess: editMutation.isSuccess,
    onSubmit: handleEdit
  })

  const editFormControls = UI_CONFIG.formEditControls()

  function handleEdit(data) {
    const body = {
      name: data.e_name,
      description: data.e_description || null
    }
    editMutation.mutate({ id: editingCategory, body })
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
  const { toggleStateMutation } = useEntityToggleState(toggleCategory, 'categories')

  function handleToggleState() {
    if (!deletingCategory) {
      handleCloseDeleteModal()
      return
    }
    toggleStateMutation.mutate(
      { id: deletingCategory[0], is_active: !deletingCategory[2] },
      {
        onSuccess: () => {
          setDeletingCategory(null)
          setDeleteModalOpen(false)
        }
      }
    )
  }

  function handleCloseDeleteModal() {
    toggleStateMutation.reset()
    setDeletingCategory(null)
    setDeleteModalOpen(false)
  }
  // END TOGGLE PRODUCT STATUS


  return (
    <>
      <Breadcrumb />
      <MainContentDisplay>

        <EntityPageHeader
          title={'Categorías'}
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
            isLoading={categoriesQuery.isLoading}
            isFetching={categoriesQuery.isFetching}
            isError={categoriesQuery.error}
            errorMsg={categoriesQuery.error?.message ?? 'Error al cargar los datos, por favor intente nuevamente'}
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
            <EntityFormHeader title="Crear nueva categoría" icon={<SvgTag />} />
          </Modal.Header>
          <Modal.Body>
            <EntityForm
              formId="create-category-form"
              controls={createFormControls}
              register={createCategoryRegister}
              control={createCategoryControl}
              submitHandler={createCategorySubmitHandler}
              errors={createCategoryErrors}
              isSuccess={createCategoryMutation.isSuccess}
              apiRes={
                createCategoryMutation.isError ? createCategoryMutation.error.message
                  : createCategoryMutation.isSuccess ? 'Categoría creada correctamente'
                    : null
              }
              apiResType={createCategoryMutation.isError ? 'error' : 'success'}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={handleCreateCloseModal}>Cancelar</Button>
            <Button type="submit" form="create-category-form" loading={createCategoryMutation.isPending}>Confirmar</Button>
          </Modal.Footer>
        </Modal>

        {/* EDIT MODAL */}
        <Modal isOpen={editModalOpen} onClose={handleEditCloseModal}>
          <Modal.Header onClose={handleEditCloseModal}>
            <EntityFormHeader title="Editar categoría" icon={<SvgProducts />} />
          </Modal.Header>
          <Modal.Body>
            <EntityForm
              formId="edit-category-form"
              controls={editFormControls}
              register={editRegister}
              control={editControl}
              errors={editErrors}
              submitHandler={editSubmitHandler}
              isSuccess={editMutation.isSuccess}
              apiRes={
                editMutation.isError ?
                  editMutation.error.message
                  : editMutation.isSuccess ? 'Categoría actualizada correctamente'
                    : null
              }
              apiResType={editMutation.isError ? 'error' : 'success'}
              isLoadingData={categoryByIdQuery.isFetching}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={handleEditCloseModal}>Cancelar</Button>
            <Button type="submit" form="edit-category-form"
              loading={categoryByIdQuery.isFetching || editMutation.isPending}>Confirmar</Button>
          </Modal.Footer>
        </Modal>

        {/* TOGGLE STATUS MODAL */}
        <Modal
          variant={deletingCategory && (deletingCategory[2] ? 'danger' : '')}
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
        >
          <Modal.Header onClose={handleCloseDeleteModal}>
            <EntityFormHeader title="Cambiar estado categoría" />
          </Modal.Header>
          <Modal.Body>
            {toggleStateMutation.isError && (
              <div style={{ marginBottom: '15px' }}>
                <MessageBox message={toggleStateMutation.error.message} type="error" />
              </div>
            )}
            {deletingCategory && (
              deletingCategory[2] ? (
                <>
                  <p className="modal-confirm-text">
                    ¿Seguro que querés desactivar la categoría <strong>{deletingCategory && deletingCategory[1]}</strong>?
                  </p>
                </>
              ) : (
                <p className="modal-confirm-text">Activar categoría <strong>{deletingCategory && deletingCategory[1]}</strong>?</p>
              )
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={handleCloseDeleteModal}>Cancelar</Button>
            <Button
              variant={deletingCategory && (deletingCategory[2] ? 'danger' : 'primary')}
              onClick={handleToggleState}
              loading={toggleStateMutation.isPending}
            >
              {deletingCategory && (deletingCategory[2] ? 'Desactivar' : 'Activar')}
            </Button>
          </Modal.Footer>
        </Modal>


      </MainContentDisplay>
    </>
  )
}

export default ProductCategoryPage