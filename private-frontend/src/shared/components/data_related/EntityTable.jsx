import ContentBox from '../ContentBox'
import MessageText from '../MessageText'

/*
dataFrame = {
  headers: [col1, col2],
  rows: [
    [val1, val2],
    [val3, null]
  ],
  actions: [
    {
      icon: <SvgEdit />,
      onClick: funct
    }
  ]
}
*/
const EntityTable = ({ dataFrame = {}, isLoading, isError, errorMsg }) => {
  const { headers, rows, actions } = dataFrame

  // Para cuando hay error o esta cargando, que la primera row ocupe toda la tabla...
  const totalSpan = (headers?.length ?? 0) + (actions?.length > 0 ? 1 : 0)

  return (
    <ContentBox>
      <div className="data-table-wrap">
        <div className="data-table-scroll">

          <table>
            <thead>
              <tr>
                {headers?.length > 0 && headers.map((h, i) => <th key={`th-${i}`}>{h}</th>)}
                {actions && <th>Acciones</th>}
              </tr>
            </thead>

            <tbody>
              {isError ? (
                <tr>
                  <td colSpan={totalSpan}>
                    <div className="data-table-message">
                      <MessageText message={errorMsg} type="error" />
                    </div>
                  </td>
                </tr>
              ) : isLoading ? (
                <tr>
                  <td colSpan={totalSpan}>
                    <div className="data-table-message">
                      <MessageText message="Cargando información..." type="info" />
                    </div>
                  </td>
                </tr>
              ) : (
                rows?.length > 0 && (
                  rows.map((r, i) => (
                    <tr key={`tr-${i}`}>
                      {r.map((v, ii) => (
                        <td key={`td-${i}-${ii}`}>{v}</td>
                      ))}
                      {actions?.length > 0 && (
                        <td>
                          <div className="row-actions">
                            {actions.map((btn, bi) => (
                              <button
                                key={`btn-${i}-${bi}`}
                                className={`btn-base btn-${btn.variant}`}
                                onClick={() => btn.onClick(r, i)}
                              >
                                {btn.icon}
                              </button>
                            ))}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )
              )}
            </tbody>

          </table>

        </div>
      </div>
    </ContentBox>
  )
}

export default EntityTable