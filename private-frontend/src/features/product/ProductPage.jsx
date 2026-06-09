import Breadcrumb from '../../layouts/components/Breadcrumb'
import MainContentDisplay from '../../layouts/components/MainContentDisplay'
import EntityFilters from '../../shared/components/data_related/EntityFilters'
import EntityPageContainer from '../../shared/components/data_related/EntityPageContainer'
import EntityPageHeader from '../../shared/components/data_related/EntityPageHeader'
import EntityTable from '../../shared/components/data_related/EntityTable'
import SvgAdd from '../../shared/components/svgs/SvgAdd'
import SvgSearch from '../../shared/components/svgs/SvgSearch'
import { entitiesToDataframe } from '../../shared/utils/entity_utils'
import useProducts from './hooks/useProducts'
import useProductsParams from './hooks/useProductsParams'

const btnList = [
  {
    label: 'Nuevo Producto',
    icon: <SvgAdd />,
    onClick: () => console.log('add'),
    variant: 'primary'
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

const PRODUCTS = [
  {
    id: 1,
    name: 'Prod1',
    dsc: 'Una dsc',
    catery_name: 'Nombre categoria 1',
    brand: 'una brand',
    isActive: true
  },
  {
    id: 2,
    name: 'Prod2',
    dsc: 'Una dsc de cat2 lorem efweagfyu egfywegfygwf wufwywfuywef wyf wefgywgfe uywg fge wfwf wufuywgfw fewfwfogwf uf wef wf wgfewufewy fw feu ffewufwgfewy fwug f',
    catery_name: 'Nombre categoria 2',
    brand: 'una brand2',
    isActive: false
  }
]

const ProductPage = () => {
  const { page, currentParams, setPage, setCurrentParams } = useProductsParams()
  const { productsQuery } = useProducts({ page, ...currentParams })

  // IMPORTANTE: PASAR ESTE ISERROR AL ENTITY TABLE...
  //if (productsQuery.error) return <MessageBox message={productsQuery.error.message} type="error" />

  const { categories, total_pages } = productsQuery.data

  const productsDataframe = entitiesToDataframe(
    ['id', 'nombre', 'categoría', 'marca', 'activo'],
    ['id', 'name', 'catery_name', 'brand', 'isActive'],
    PRODUCTS,
    btnList
  )

  return (
    <>
      <Breadcrumb />
      <MainContentDisplay>
        <EntityPageHeader
          title={'Productos'}
          btnList={btnList}
        />

        <EntityPageContainer>
          <EntityFilters controls={filterControls} />
          <EntityTable
            dataFrame={productsDataframe}
            isLoading={productsQuery.isLoading}
          //isError={productsQuery.error}
          //errorMsg={productsQuery.error?.message ?? 'Error al cargar los datos, por favor intente nuevamente'}
          />
        </EntityPageContainer>
      </MainContentDisplay>
    </>
  )
}

export default ProductPage