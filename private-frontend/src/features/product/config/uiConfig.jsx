import StatusBadge from '../../../shared/components/data_related/table_renders/StatusBadge'
import TitleAndSub from '../../../shared/components/data_related/table_renders/TitleAndSub'
import SvgAdd from '../../../shared/components/svgs/SvgAdd'
import SvgDelete from '../../../shared/components/svgs/SvgDelete'
import SvgEdit from '../../../shared/components/svgs/SvgEdit'
import SvgSearch from '../../../shared/components/svgs/SvgSearch'
import SvgDeactivate from '../../../shared/components/svgs/SvgDeactivate'
import { API_FIELDS } from './fieldsConfig'
import SvgActivate from '../../../shared/components/svgs/SvgActivate'

const { API_SEARCH, API_CATEGORY, API_BRAND, API_IS_ACTIVE } = API_FIELDS

function req_msg(name, ao) {
  return `${name} es requerid${ao}`
}

export const UI_CONFIG = {
  btnHeaderList: (setCreateModalOpen) => {
    return [
      {
        label: 'Nuevo Producto',
        icon: <SvgAdd />,
        onClick: () => setCreateModalOpen(true),
        variant: 'primary'
      }
    ]
  },
  tableColumns: [
    { header: 'id', key: 'id' },
    {
      header: 'nombre',
      key: 'name_brand',
      render: (v) => <TitleAndSub title={v.title} sub={v.sub} />
    },
    { header: 'categoría', key: 'category_name' },
    {
      header: 'activo',
      key: 'is_active',
      render: (v) => <StatusBadge active={v} />
    }
  ],
  tableActions: (setEditingProduct, setEditModalOpen, setDeletingProduct, setDeleteModalOpen, PRODUCTS) => {
    return [
      {
        icon: () => <SvgEdit />,
        onClick: (row) => {
          const product = PRODUCTS.find(c => String(c.id) === String(row[0]))
          setEditingProduct(product)
          setEditModalOpen(true)
        }
      },
      {
        icon: (isActive) => isActive ? <SvgDeactivate /> : <SvgActivate />,
        onClick: (row) => {
          const product = PRODUCTS.find(c => String(c.id) === String(row[0]))
          setDeletingProduct(product)
          setDeleteModalOpen(true)
        },
        danger: true
      }
    ]
  },
  formCreateControls: (categories) => {
    return [
      {
        controlType: 'input',
        type: 'text',
        name: 'c_sku',
        label: 'SKU',
        validations: {
          maxLength: { value: 255, message: 'Máximo 255 caracteres' }
        }
      },
      {
        controlType: 'input',
        type: 'text',
        name: 'c_name',
        label: 'Nombre *',
        validations: {
          required: req_msg('Nombre', 'o'),
          maxLength: { value: 255, message: 'Máximo 255 caracteres' }
        }
      },
      {
        controlType: 'textarea',
        name: 'c_description',
        label: 'Descripción'
      },
      {
        controlType: 'combobox',
        name: 'c_category_id',
        label: 'Categoría *',
        options: categories,
        placeholder: 'Seleccionar',
        validations: {
          required: req_msg('Categoría', 'a')
        }
      },
      {
        controlType: 'input',
        type: 'text',
        name: 'c_brand',
        label: 'Marca *',
        validations: {
          required: req_msg('Marca', 'a'),
          maxLength: { value: 255, message: 'Máximo 255 caracteres' }
        }
      },
      {
        controlType: 'textarea',
        name: 'c_specifications',
        label: 'Especificaciones'
      },
      {
        controlType: 'input',
        type: 'number',
        name: 'c_maintenance_time',
        label: 'Tiempo para mantenimiento (días)',
        validations: {
          validate: {
            isInteger: (v) => !v || Number.isInteger(Number(v)) || 'Debe ser un número entero',
            isPositive: (v) => !v || Number(v) >= 0 || 'Debe ser cero o positivo'
          }
        }
      },
      {
        controlType: 'checkbox',
        name: 'c_requires_installation',
        label: 'Requiere instalación'
      },
    ]
  },
  formFilterControls: (control, parsedCats) => {
    return [
      {
        type: 'text',
        name: API_SEARCH,
        placeholder: 'Buscar por nombre',
        icon: <SvgSearch w={15} h={15} />
      },
      {
        type: 'combobox',
        name: API_CATEGORY,
        placeholder: 'Categoría',
        options: parsedCats,
        control: control
      },
      {
        type: 'text',
        name: API_BRAND,
        placeholder: 'Marca',
      },
      {
        type: 'select',
        name: API_IS_ACTIVE,
        placeholder: 'Producto activo',
        defaultOpt: 'Ambos',
        options: [
          { value: 'true', label: 'Si' },
          { value: 'false', label: 'No' }
        ],
        control: control
      }
    ]
  }
}