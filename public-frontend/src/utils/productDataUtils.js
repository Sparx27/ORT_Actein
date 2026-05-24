export const parseSpecs = (str) => {
  if (!str) return null

  const key_value = str.split(',')
  const res = key_value.map(lv => {
    const [a, b] = lv.split(':')
    return [a, b]
  })
  return res
}