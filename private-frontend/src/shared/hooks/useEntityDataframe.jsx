import { useState } from 'react'
import { entitiesToDataframe } from '../utils/entity_utils'

const CATEGORIES = [
  {
    ID: 1,
    Name: 'Cat1',
    DSC: 'Una dsc',
    CREATED: '1/1/2025 02:00:00'
  },
  {
    ID: 2,
    Name: 'Cat___2',
    DSC: 'Una dsc de cat2 lorem efweagfyu egfywegfygwf wufwywfuywef wyf wefgywgfe uywg fge wfwf wufuywgfw fewfwfogwf uf wef wf wgfewufewy fw feu ffewufwgfewy fwug f',
    CREATED: '2/2/2025 02:00:00'
  }
]

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
const useEntityDataframe = (headers, btnList) => {
  const [dataframe, setDataframe] = useState(entitiesToDataframe(headers, CATEGORIES, btnList))

  console.log(dataframe)

  return {
    dataframe
  }
}

export default useEntityDataframe