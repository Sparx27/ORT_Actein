
/*
dataFrame = {
  headers: ['col1', 'col2'],
  rows: [
    [val1, val2],
    [val3, null]
  ],
  actions: [
    {
      label: 'editar',
      icon: <SvgEdit />,
    }
  ]
}
*/
export const entitiesToDataframe = (
  headers = [],
  rowSelect = [],
  rows = [],
  btnList = []
) => {
  const dataFrame = {}
  dataFrame.rows = rows.map(o => rowSelect.map(h => o[h.toLowerCase()]))
  dataFrame.headers = headers.map(h => h.charAt(0).toUpperCase() + h.slice(1).toLowerCase())
  dataFrame.actions = btnList
  return dataFrame
}