import React from 'react'
import ContentBox from '../../shared_components/ContentBox'
import SvgSpecs from '../../shared_components/svg/SvgSpecs'

const PRODUCTO = 'capacidad: 20lt, Rango de temperatura: 10 - 5'

const parsear = (str) => {
  const key_value = str.split(',')
  const res = key_value.map(lv => {
    const [a, b] = lv.split(':')
    return [a, b]
  })
  return res
}

const ProductSpecs = ({ specifications }) => {
  // specsArray = parseSpecifications(specifications) de helpers/yoquese.js
  // usar abajo

  return (
    <ContentBox design={'product-specs'}>
      <div className="product-specs-card-head">
        <SvgSpecs />
        <h2 className="h2 upper">Especificaciones técnicas</h2>
      </div>

      <table className="product-specs-table">
        <tbody>
          {
            parsear(PRODUCTO).map(p => {
              console.log(p)
              return (
                <tr>
                  <td className="product-specs-key">{p[0]}</td>
                  <td className="product-specs-val">{p[1]}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </ContentBox>
  )
}

export default ProductSpecs