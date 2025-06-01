"use client";

import Alert from "@/components/ui/atoms/Alert";
import Button from "@/components/ui/atoms/Button";
import Dialog from "@/components/ui/atoms/Dialog";
import { Check, Copy, Download, FileDown } from "lucide-react";
import Papa from "papaparse";
import { useState } from "react";
import { useJsonToCsv } from "../../../../../lib/hooks/useJsonToCsv";

interface Props {
  jsonInput: string;
}

export const ExportCompaniesDialog = ({ jsonInput }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const [copied, setCopied] = useState<boolean>(false);

  const { csvData, downloadCSV, error } = useJsonToCsv({ jsonInput });

  const copyToClipboard = () => {
    if (!csvData) return;

    navigator.clipboard.writeText(csvData.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <Button onClick={openDialog} className="flex items-center justify-center">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>

      <Dialog
        open={isOpen}
        onClose={closeDialog}
        size="xl"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        {!!error && (
          <Dialog.Body>
            <Alert open variant="error">
              {error}
            </Alert>
          </Dialog.Body>
        )}
        {csvData && (
          <>
            <Dialog.Header id="dialog-title">
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-lg font-medium">CSV Output</h2>
                <div className="flex space-x-2">
                  <Button onClick={copyToClipboard} className="flex items-center space-x-1">
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => downloadCSV(`companies-${new Date().toISOString()}.csv`)}
                    className="flex items-center space-x-1"
                    color="info"
                  >
                    <FileDown className="h-4 w-4" />
                    <span>Download CSV</span>
                  </Button>
                </div>
              </div>
            </Dialog.Header>
            <Dialog.Body id="dialog-description" divider>
              <div className="my-4 p-4 rounded-md border border-border">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-gray-600/20">
                      <tr>
                        {csvData.headers.map((header, index) => (
                          <th
                            key={index}
                            className="px-3 py-2 text-left text-xs font-medium text-muted uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-surface divide-y divide-border">
                      {csvData.content
                        .split("\n")
                        .slice(1)
                        .map((row, rowIndex) => {
                          const cells = Papa.parse(row).data[0] as string[];
                          return (
                            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-surface" : "bg-gray-600/20"}>
                              {cells.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-3 py-2 text-sm text-muted truncate max-w-xs">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4">
                  <p className="text-sm">
                    CSV file contains {csvData.content.split("\n").length - 1} rows and {csvData.headers.length}{" "}
                    columns.
                  </p>
                </div>
              </div>
            </Dialog.Body>
          </>
        )}
        <Dialog.Footer className="gap-2">
          <Button onClick={closeDialog}>Close</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};
