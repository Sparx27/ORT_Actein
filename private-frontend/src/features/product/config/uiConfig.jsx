import StatusBadge from '../../../shared/components/data_related/table_renders/StatusBadge'
import TitleAndSub from '../../../shared/components/data_related/table_renders/TitleAndSub'


export const UI_CONFIG = {
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
  ]
}