import Papa from "papaparse";
import { useEffect, useState } from "react";

type CsvData = {
  content: string;
  filename: string;
  headers: string[];
};

export const useJsonToCsv = ({ jsonInput }: { jsonInput: string }) => {
  const [csvData, setCsvData] = useState<CsvData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    convertToCSV(jsonInput);
  }, [jsonInput]);

  const convertToCSV = (jsonInput: string) => {
    try {
      let parsedData: Record<string, unknown> | Record<string, unknown>[];
      try {
        parsedData = JSON.parse(jsonInput);
      } catch (e) {
        console.log(e);
        setError("Invalid JSON format. Please check your input.");
        setCsvData(null);
        return;
      }

      let dataToConvert = [];
      if (Array.isArray(parsedData)) {
        dataToConvert = parsedData;
      } else if (typeof parsedData === "object" && parsedData !== null) {
        dataToConvert = [parsedData];
      } else {
        setError("JSON must be an object or array of objects.");
        setCsvData(null);
        return;
      }

      if (dataToConvert.length === 0) {
        setError("No data to convert.");
        setCsvData(null);
        return;
      }

      const headers = new Set<string>();
      dataToConvert.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          Object.keys(item).forEach((key) => headers.add(key));
        }
      });

      if (headers.size === 0) {
        setError("No valid properties found in JSON objects.");
        setCsvData(null);
        return;
      }

      const headerArray = Array.from(headers);
      const csv = Papa.unparse({
        fields: headerArray,
        data: dataToConvert.map((item) =>
          headerArray.map((header) =>
            item && typeof item === "object" && header in item
              ? JSON.stringify(item[header]).replace(/^"(.*)"$/, "$1")
              : ""
          )
        ),
      });

      setCsvData({
        content: csv,
        filename: `json-to-csv-${new Date().toISOString().slice(0, 10)}.csv`,
        headers: headerArray,
      });
      setError(null);
    } catch (e) {
      setError(`Error converting JSON to CSV: ${e instanceof Error ? e.message : "Unknown error"}`);
      setCsvData(null);
    }
  };

  const downloadCSV = (filename?: string) => {
    if (!csvData) return;

    const blob = new Blob([csvData.content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename || csvData.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    csvData,
    error,
    downloadCSV,
  };
};
