import CsvExport, { csvData } from "./export/csv"

export default {
  export: {
    csv: {
      execute: CsvExport,
      building: csvData
    },
  }
}