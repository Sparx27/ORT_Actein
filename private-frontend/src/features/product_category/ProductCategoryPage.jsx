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
import EntityFormHeader from '../../shared/components/data_related/EntityFormHeader'
import SvgTag from '../../shared/components/svgs/SvgTag'
import Button from '../../shared/components/Button'
import SvgEdit from '../../shared/components/svgs/SvgEdit'
import SvgDelete from '../../shared/components/svgs/SvgDelete'
import EntityPagination from '../../shared/components/data_related/EntityPagination'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { UI_CONFIG } from './config/uiConfig'
import { API_FIELDS, FILTER_PARAMS } from './config/fieldsConfig'

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
  },
  {
    id: 3,
    name: 'Cat3',
    dsc: 'Descripción de la categoría 3',
    created: '3/3/2025 02:00:00'
  },
  {
    id: 4,
    name: 'Cat4',
    dsc: 'Descripción de la categoría 4 con un texto un poco más largo para pruebas',
    created: '4/4/2025 02:00:00'
  },
  {
    id: 5,
    name: 'Cat5',
    dsc: 'Categoría orientada a testing de componentes',
    created: '5/5/2025 02:00:00'
  },
  {
    id: 6,
    name: 'Cat6',
    dsc: 'Otra descripción de ejemplo para la categoría 6',
    created: '6/6/2025 02:00:00'
  },
  {
    id: 7,
    name: 'Cat7',
    dsc: 'Contenido descriptivo de la categoría 7',
    created: '7/7/2025 02:00:00'
  },
  {
    id: 8,
    name: 'Cat8',
    dsc: 'Texto de prueba para validar listados y tablas',
    created: '8/8/2025 02:00:00'
  },
  {
    id: 9,
    name: 'Cat9',
    dsc: 'Descripción breve de la categoría 9',
    created: '9/9/2025 02:00:00'
  }
]

const { API_SEARCH } = API_FIELDS

const ProductCategoryPage = () => {
  const { page, currentParams, setPage, setCurrentParams } = useCategoriesParams()
  const { categoriesQuery } = useCategories({ page, ...currentParams })
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingCategory, setDeletingCategory] = useState(null)
  const [searchParams] = useSearchParams()
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: Object.fromEntries(
      Object.entries(FILTER_PARAMS).map(
        ([apiField, urlParam]) => [apiField, searchParams.get(urlParam) ?? '']
      )
    )
  })

  // FILTER DATA
  const handleFilterSubmit = (data) => {
    setCurrentParams(data)
  }

  const filterControls = [
    {
      type: 'text',
      placeholder: 'Buscar por nombre',
      icon: <SvgSearch w={15} h={15} />,
      name: API_SEARCH
    }
  ]

  const handleCleanFilters = () => {
    Object.keys(FILTER_PARAMS).forEach(field => setValue(field, ''))
    setCurrentParams()
  }

  // CREATE DATA
  const btnHeaderList = [
    {
      label: 'Nueva Categoría',
      icon: <SvgAdd />,
      onClick: () => setModalOpen(true),
      variant: 'primary'
    }
  ]

  // EDIT DATA

  // DELETE DATA
  const handleConfirmDelete = () => {
    console.log('eliminar', deletingCategory?.id)
    setDeleteModalOpen(false)
  }

  // SHOW DATA
  let apiData = categoriesQuery.data

  // Edit & Delete Actions
  const btnEntityActions = [
    {
      icon: <SvgEdit />,
      onClick: (row) => {
        const category = CATEGORIES.find(c => String(c.id) === String(row[0]))
        setEditingCategory(category)
        setEditModalOpen(true)
      }
    },
    {
      icon: <SvgDelete />,
      onClick: (row) => {
        const category = CATEGORIES.find(c => String(c.id) === String(row[0]))
        setDeletingCategory(category)
        setDeleteModalOpen(true)
      },
      danger: true
    }
  ]

  const categoriesDataframe = entitiesToDataframe(
    UI_CONFIG.tableColumns,
    apiData?.categories,
    btnEntityActions
  )

  return (
    <>
      <Breadcrumb />
      <MainContentDisplay>

        <EntityPageHeader
          title={'Categorías de producto'}
          sub={'Para organizar los productos del catálogo por categoría'}
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
            dataFrame={categoriesDataframe}
            isLoading={categoriesQuery.isLoading}
            isError={categoriesQuery.error}
            errorMsg={categoriesQuery.error?.message ?? 'Error al cargar los datos, por favor intente nuevamente'}
          />
          <EntityPagination
            currentPage={page}
            totalPages={apiData?.total_pages ?? 1}
            onPageChange={setPage}
          />
        </EntityPageContainer>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header title="Crear nueva categoría" onClose={() => setModalOpen(false)}>
            <EntityFormHeader title={'Crear nueva categoría'} icon={<SvgTag />} />
          </Modal.Header>
          <Modal.Body>
            {/* <EntityForm controls={entityFormControls} onSubmit={handleSubmit} /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit" onClick={() => setModalOpen(false)}>Confirmar</Button>
          </Modal.Footer>
        </Modal>

        <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <Modal.Header onClose={() => setEditModalOpen(false)}>
            <EntityFormHeader title="Editar categoría" icon={<SvgTag />} />
          </Modal.Header>
          <Modal.Body>
            {/* <EntityForm
              controls={entityFormControls}
              onSubmit={handleSubmit}
              values={editingCategory ? { name: editingCategory.name, dsc: editingCategory.dsc } : undefined}
            /> */}
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
              ¿Seguro que querés eliminar la categoría <strong>{deletingCategory?.name}</strong>?
            </p>
            <p className="modal-confirm-text">Esta acción no se puede deshacer.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
            <Button danger onClick={handleConfirmDelete}>Eliminar</Button>
          </Modal.Footer>
        </Modal>

      </MainContentDisplay>
    </>
  )
}

export default ProductCategoryPage