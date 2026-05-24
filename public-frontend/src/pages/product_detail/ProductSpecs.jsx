import React from 'react'
import ContentBox from '../../shared_components/ContentBox'
import SvgSpecs from '../../shared_components/svg/SvgSpecs'
import { parseSpecs } from '../../utils/productDataUtils'

const PRODUCTO = 'capacidad: 20lt, Rango de temperatura: 10 - 5'

const ProductSpecs = ({ specifications }) => {
  const specsArray = parseSpecs(specifications)

  return (
    <ContentBox design={'product-specs'}>
      <div className="product-specs-card-head">
        <SvgSpecs />
        <h2 className="h2 upper">Especificaciones técnicas</h2>
      </div>

      <table className="product-specs-table">
        <tbody>
          {
            specsArray.map((s, i) => {
              return (
                <tr key={`tr-${i}`}>
                  <td className="product-specs-key">{s[0]}</td>
                  <td className="product-specs-val">{s[1]}</td>
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