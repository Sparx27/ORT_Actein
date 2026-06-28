import StatusBadge from '../../../shared/components/data_related/table_renders/StatusBadge'
import SvgActivate from '../../../shared/components/svgs/SvgActivate'
import SvgAdd from '../../../shared/components/svgs/SvgAdd'
import SvgDelete from '../../../shared/components/svgs/SvgDelete'
import SvgEdit from '../../../shared/components/svgs/SvgEdit'
import SvgSearch from '../../../shared/components/svgs/SvgSearch'
import { API_FIELDS } from './fieldsConfig'

function req_msg(name, ao) {
  return `${name} es requerid${ao}`
}

const { API_SEARCH, API_IS_ACTIVE } = API_FIELDS

export const UI_CONFIG = {
  btnHeaderList: (setCreateModalOpen) => {
    return [
      {
        label: 'Nueva Categoría',
        icon: <SvgAdd />,
        onClick: () => setCreateModalOpen(true),
        variant: 'primary'
      }
    ]
  },
  tableColumns: [
    { header: 'id', key: 'id' },
    { header: 'nombre', key: 'name' },
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
        onClick: (category) => onClickEditBtn(category ? category[0] : undefined)
      },
      {
        icon: () => <SvgActivate />,
        onClick: (category) => onClickToggleBtn(category),
        danger: false
      }
    ]
  },
  formCreateControls: () => {
    return [
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
      }
    ]
  },
  formFilterControls: (control) => {
    return [
      {
        type: 'text',
        name: API_SEARCH,
        placeholder: 'Buscar por nombre',
        icon: <SvgSearch w={15} h={15} />,
        control: control
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
  formEditControls: () => {
    return [
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
      }
    ]
  }
}
