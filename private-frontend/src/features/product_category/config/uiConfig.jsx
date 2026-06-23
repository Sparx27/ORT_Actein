import SvgAdd from '../../../shared/components/svgs/SvgAdd'

function req_msg(name, ao) {
  return `${name} es requerid${ao}`
}

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
    { header: 'nombre', key: 'name' }
  ],
  formCreateControls: () => {
    return [
      {
        controlType: 'input',
        type: 'text',
        name: 'c_name',
        label: 'Nombre',
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
    ]
  }
}
