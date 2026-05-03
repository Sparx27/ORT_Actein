import CatalogForm from './CatalogForm'

export const PRODUCTS = [
  { id: 1, name: 'Cámara frigorífica modular BHT-12', brand: 'Bohn', category: 'Cámaras frigoríficas', install: true, specs: 'Panel poliuretano 80mm · Temperatura -18°C a +4°C · Capacidad 12 m³' },
  { id: 2, name: 'Cámara de conservación BHT-20', brand: 'Bohn', category: 'Cámaras frigoríficas', install: true, specs: 'Panel 100mm · +2°C a +8°C · 20 m³ · Puertas dobles' },
  { id: 3, name: 'Cámara de congelación BHF-08', brand: 'Bohn', category: 'Cámaras frigoríficas', install: true, specs: 'Panel 120mm · -22°C · 8 m³ · Piso incluido' },
  { id: 4, name: 'Unidad evaporadora BHT-06 Split', brand: 'Bohn', category: 'Cámaras frigoríficas', install: false, specs: '6 m³ · Compresor externo · Sin instalación de panel' },
  { id: 5, name: 'Exhibidora vertical EV-900', brand: 'Tecumseh', category: 'Exhibidoras comerciales', install: true, specs: '900L · Temperatura +2°C · Iluminación LED · Puertas de vidrio' },
  { id: 6, name: 'Exhibidora horizontal EH-600', brand: 'Tecumseh', category: 'Exhibidoras comerciales', install: false, specs: '600L · -18°C a -22°C · Tapa deslizante · Autónoma' },
  { id: 7, name: 'Exhibidora mural EM-1200', brand: 'Copeland', category: 'Exhibidoras comerciales', install: true, specs: '1200L · Temperatura +2°C a +6°C · Open front · 3 estantes' },
  { id: 8, name: 'Unidad condensadora UC-4HP', brand: 'Copeland', category: 'Unidades condensadoras', install: true, specs: '4HP · R404A · Compresor scroll · Uso interior' },
  { id: 9, name: 'Unidad condensadora UC-8HP', brand: 'Copeland', category: 'Unidades condensadoras', install: true, specs: '8HP · R448A · Alta eficiencia · Uso exterior' },
  { id: 10, name: 'Unidad condensadora UC-2HP', brand: 'Embraco', category: 'Unidades condensadoras', install: true, specs: '2HP · R134a · Bajo ruido · Uso interior' },
  { id: 11, name: 'Equipo split inverter 12000 BTU', brand: 'Danfoss', category: 'Aire acondicionado', install: true, specs: '12000 BTU · Inverter · Frío/calor · Clase A++' },
  { id: 12, name: 'Equipo split 18000 BTU', brand: 'Danfoss', category: 'Aire acondicionado', install: true, specs: '18000 BTU · Frío/calor · Filtro PM2.5' },
  { id: 13, name: 'Equipo split 24000 BTU', brand: 'Danfoss', category: 'Aire acondicionado', install: true, specs: '24000 BTU · Inverter · Control WiFi' },
  { id: 14, name: 'Válvula de expansión termostática', brand: 'Danfoss', category: 'Accesorios', install: false, specs: 'Para refrigerantes HFC · Rango -40°C a +10°C' },
  { id: 15, name: 'Presostato de alta y baja', brand: 'Danfoss', category: 'Accesorios', install: false, specs: 'Doble presostato · Ajustable · Universal' },
  { id: 16, name: 'Cámara frigorífica BHT-30', brand: 'Bohn', category: 'Cámaras frigoríficas', install: true, specs: 'Panel 80mm · +2°C a +6°C · 30 m³ · Antecámara incluida' },
  { id: 17, name: 'Cámara de congelación BHF-16', brand: 'Bohn', category: 'Cámaras frigoríficas', install: true, specs: 'Panel 120mm · -22°C · 16 m³' },
  { id: 18, name: 'Exhibidora vertical EV-1200', brand: 'Tecumseh', category: 'Exhibidoras comerciales', install: true, specs: '1200L · +2°C · LED · Autodescongelante' },
  { id: 19, name: 'Exhibidora horizontal EH-400', brand: 'Tecumseh', category: 'Exhibidoras comerciales', install: false, specs: '400L · -18°C · Compacta' },
  { id: 20, name: 'Unidad condensadora UC-6HP', brand: 'Copeland', category: 'Unidades condensadoras', install: true, specs: '6HP · R448A · Alta eficiencia' },
  { id: 21, name: 'Equipo split 9000 BTU', brand: 'Danfoss', category: 'Aire acondicionado', install: true, specs: '9000 BTU · Inverter · Ultra silencioso' },
  { id: 22, name: 'Filtro deshidratador 48cc', brand: 'Danfoss', category: 'Accesorios', install: false, specs: 'Bidireccional · Para sistemas R404A/R134a' },
  { id: 23, name: 'Cámara conservación BHT-15', brand: 'Bohn', category: 'Cámaras frigoríficas', install: true, specs: 'Panel 100mm · +2°C a +8°C · 15 m³' },
  { id: 24, name: 'Unidad condensadora UC-10HP', brand: 'Embraco', category: 'Unidades condensadoras', install: true, specs: '10HP · R744 CO₂ · Alta presión · Exterior' },
  { id: 25, name: 'Exhibidora vertical EV-600', brand: 'Copeland', category: 'Exhibidoras comerciales', install: true, specs: '600L · +2°C · LED · 2 puertas' },
  { id: 26, name: 'Cámara frigorífica BHT-40', brand: 'Bohn', category: 'Cámaras frigoríficas', install: true, specs: '40 m³ · Panel 80mm · Cámara industrial' },
  { id: 27, name: 'Equipo split 36000 BTU', brand: 'Danfoss', category: 'Aire acondicionado', install: true, specs: '36000 BTU · Trifásico · Inverter' },
  { id: 28, name: 'Presostato diferencial', brand: 'Danfoss', category: 'Accesorios', install: false, specs: 'Para aceite · Protección de compresor' },
  { id: 29, name: 'Exhibidora horizontal EH-800', brand: 'Copeland', category: 'Exhibidoras comerciales', install: false, specs: '800L · -22°C · Alta capacidad' },
  { id: 30, name: 'Unidad condensadora UC-3HP', brand: 'Tecumseh', category: 'Unidades condensadoras', install: true, specs: '3HP · R134a · Silenciosa · Interior' },
  { id: 31, name: 'Cámara modular BHF-20', brand: 'Bohn', category: 'Cámaras frigoríficas', install: true, specs: '20 m³ · -22°C · Panel 120mm' },
  { id: 32, name: 'Equipo split cassette 24000 BTU', brand: 'Danfoss', category: 'Aire acondicionado', install: true, specs: 'Cassette 4 vías · 24000 BTU · Inverter' },
  { id: 33, name: 'Compresor hermético 1HP', brand: 'Embraco', category: 'Accesorios', install: false, specs: '1HP · R134a · Bajo consumo' },
  { id: 34, name: 'Exhibidora vertical EV-1800', brand: 'Tecumseh', category: 'Exhibidoras comerciales', install: true, specs: '1800L · 3 puertas · LED · +2°C' },
  { id: 35, name: 'Unidad condensadora UC-5HP', brand: 'Copeland', category: 'Unidades condensadoras', install: true, specs: '5HP · R452A · Alta temperatura ambiente' },
  { id: 36, name: 'Cámara conservación BHT-25', brand: 'Bohn', category: 'Cámaras frigoríficas', install: true, specs: '25 m³ · Panel 100mm · Doble puerta' },
]

const Catalog = () => {
  return (
    <section className="catalog">
      <div className="container catalog-container">
        <CatalogForm />

      </div>
    </section>
  )
}

export default Catalog