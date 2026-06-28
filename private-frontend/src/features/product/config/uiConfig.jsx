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
  btnHeaderList: (handleOpenModal) => {
    return [
      {
        label: 'Nuevo Producto',
        icon: <SvgAdd />,
        onClick: () => handleOpenModal(true),
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
      header: 'estado',
      key: 'is_active',
      render: (v) => <StatusBadge active={v} />
    }
  ],
  tableActions: (onClickEditBtn, onClickToggleBtn) => {
    return [
      {
        icon: () => <SvgEdit />,
        onClick: (product) => onClickEditBtn(product ? product[0] : undefined)
      },
      {
        icon: () => <SvgActivate />,
        onClick: (product) => onClickToggleBtn(product),
        danger: false
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
        placeholder: 'Estado',
        defaultOpt: 'Ambos',
        options: [
          { value: 'true', label: 'Activo' },
          { value: 'false', label: 'Inactivo' }
        ],
        control: control
      }
    ]
  },
  formEditControls: (categories) => {
    return [
      {
        controlType: 'input',
        type: 'text',
        name: 'e_sku',
        label: 'SKU',
        validations: {
          maxLength: { value: 255, message: 'Máximo 255 caracteres' }
        }
      },
      {
        controlType: 'input',
        type: 'text',
        name: 'e_name',
        label: 'Nombre *',
        validations: {
          required: req_msg('Nombre', 'o'),
          maxLength: { value: 255, message: 'Máximo 255 caracteres' }
        }
      },
      {
        controlType: 'textarea',
        name: 'e_description',
        label: 'Descripción'
      },
      {
        controlType: 'combobox',
        name: 'e_category_id',
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
        name: 'e_brand',
        label: 'Marca *',
        validations: {
          required: req_msg('Marca', 'a'),
          maxLength: { value: 255, message: 'Máximo 255 caracteres' }
        }
      },
      {
        controlType: 'textarea',
        name: 'e_specifications',
        label: 'Especificaciones'
      },
      {
        controlType: 'input',
        type: 'number',
        name: 'e_maintenance_time',
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
        name: 'e_requires_installation',
        label: 'Requiere instalación'
      },
    ]
  }
}