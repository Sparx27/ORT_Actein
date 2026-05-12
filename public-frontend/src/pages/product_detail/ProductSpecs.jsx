import React from 'react'
import ContentBox from '../../shared_components/ContentBox'
import SvgSpecs from '../../shared_components/svg/SvgSpecs'


/*
function renderSpecs() {
  const container = document.getElementById('specsContainer');
  const text = PRODUCTO.especificaciones;

  if (!text || !text.trim()) {
    container.innerHTML = '<span class="specs-empty">Sin especificaciones cargadas.</span>';
    return;
  }

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  const tbody = lines.map(line => {
    const colonIdx = line.indexOf(': ');
    if (colonIdx > 0) {
      const key = esc(line.substring(0, colonIdx).trim());
      const val = esc(line.substring(colonIdx + 2).trim());
      return `<tr>
        <td class="spec-key">${key}</td>
        <td class="spec-val">${val}</td>
      </tr>`;
    }
    // Línea sin ": " → fila de texto plano (ancho completo)
    return `<tr class="spec-plain-row">
      <td colspan="2">${esc(line)}</td>
    </tr>`;
  }).join('');

  container.innerHTML = `<table class="specs-table"><tbody>${tbody}</tbody></table>`;
}

<div class="card">
  <div class="specs-card-head">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
    <h3>Especificaciones técnicas</h3>
  </div>

  <div id="specsContainer">
    <table class="specs-table">
      <tbody>
        <tr class="spec-plain-row">
          <td colspan="2">Características generales</td>
        </tr>
        <tr>
          <td class="spec-key">Marca</td>
          <td class="spec-val">Samsung</td>
        </tr>
        <tr>
          <td class="spec-key">Modelo</td>
          <td class="spec-val">Galaxy S24</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
*/

const PRODUCTO = 'capacidad: 20lt, Rango de temperatura: 10 - 5'

const parsear = (str) => {
  const key_value = str.split(',')
  const res = key_value.map(lv => {
    const [a, b] = lv.split(':')
    return [a, b]
  })
  return res
}

const ProductSpecs = () => {
  return (
    <ContentBox design={'product-specs'}>
      <div class="product-specs-card-head">
        <SvgSpecs />
        <h2 className="h2 upper">Especificaciones técnicas</h2>
      </div>

      <table class="product-specs-table">
        <tbody>
          {
            parsear(PRODUCTO).map(p => {
              console.log(p)
              return (
                <tr>
                  <td class="product-specs-key">{p[0]}</td>
                  <td class="product-specs-val">{p[1]}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </ContentBox>
  )
}

/*

          <tr>
            <td class="product-specs-key">Modelo</td>
            <td class="product-specs-val">BHT-20</td>
          </tr>
          <tr>
            <td class="product-specs-key">Tipo</td>
            <td class="product-specs-val">Cámara frigorífica modular</td>
          </tr>
          <tr>
            <td class="product-specs-key">Rango de temperatura</td>
            <td class="product-specs-val">-2°C a +8°C</td>
          </tr>
          <tr>
            <td class="product-specs-key">Capacidad</td>
            <td class="product-specs-val">20 m³</td>
          </tr>
          <tr>
            <td class="product-specs-key">Uso</td>
            <td class="product-specs-val">Comercial / Industrial</td>
          </tr>
          <tr>
            <td class="product-specs-key">Voltaje</td>
            <td class="product-specs-val">220V / 50Hz</td>
          </tr>
          <tr>
            <td class="product-specs-key">Aplicaciones</td>
            <td class="product-specs-val">Supermercados, restaurantes, hoteles, depósitos</td>
          </tr>
*/

export default ProductSpecs