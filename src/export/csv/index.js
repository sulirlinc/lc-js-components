import json2csv from 'json2csv'

/**
 * 浏览器数据导出CSV GBK编码
 * config 数据相关
 * @param fileName 导出的文件名
 * @param config
 */
export default (fileName, { csv, list }) => {
  try {
    const { fields, cast = {}, isCast, filters = (value, filter, enums) => {},
      stringValues = [] } = csv
    const json2csv1 = new json2csv.Parser({ fields })
    const data = JSON.stringify(cast) !== '{}' ? [] : list
    if (isCast) {
      for (const i in list) {
        const d = {}
        for (const key in list[i]) {
          if (cast[key]) {
            d[key] = filters(list[i][key],
                cast[key].filter, cast[key].enums)
          } else {
            d[key] = list[i][key]
          }
          if(stringValues.includes(key)){
            d[key] = `${d[key]}\t` // 转换为字符串
          }
        }
        data.push(d)
      }
    }
    if (data.length < 1) {
      return
    }
    const result = json2csv1.parse(data, { fields })
    const csvContent = 'data:text/csvcharset=GBK,\uFEFF' + result
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${fileName}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (err) {
    console.error(err)
  }
}

export function csvData(config, {
  buildingDisplay = ({ key, value, config }) => {
  }
}) {
  config.csv = config.csv || {}
  config.csv.fields = []
  for (const key in config.items) {
    let value = config.items[key].key;
    if (config.items[key].filter) {
      config.csv.isCast = true
      config.csv.cast[value] = {
        filter: config.items[key].filter,
        enums: config.items[key].enums
      }
    }
    config.csv.fields.push({
      value: value,
      label: config.items[key].display || buildingDisplay({ config, key, value })
    })
  }
}