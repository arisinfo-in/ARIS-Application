import React, { memo } from 'react';
import { Download } from 'lucide-react';
import NeumorphicButton from './NeumorphicButton';

interface SQLResultsProps {
  columns: string[];
  values: any[][];
  rowCount: number;
  onExportCSV?: () => void;
  onExportJSON?: () => void;
}

const SQLResults: React.FC<SQLResultsProps> = ({
  columns,
  values,
  rowCount,
  onExportCSV,
  onExportJSON
}) => {
  const handleExportCSV = () => {
    if (values.length === 0) return;

    // Create CSV content
    const csvHeaders = columns.join(',');
    const csvRows = values.map(row => 
      row.map(cell => {
        const value = cell === null ? '' : String(cell);
        // Escape quotes and wrap in quotes if contains comma or newline
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );
    
    const csvContent = [csvHeaders, ...csvRows].join('\n');
    
    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `query_results_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    if (onExportCSV) {
      onExportCSV();
    }
  };

  const handleExportJSON = () => {
    if (values.length === 0) return;

    // Convert to JSON array of objects
    const jsonData = values.map(row => {
      const obj: { [key: string]: any } = {};
      columns.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });

    const jsonContent = JSON.stringify(jsonData, null, 2);
    
    // Download file
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `query_results_${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    if (onExportJSON) {
      onExportJSON();
    }
  };

  if (columns.length === 0 && values.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">
        <p>No results to display. Execute a query to see results.</p>
      </div>
    );
  }

  const maxRowsToShow = 1000;
  const displayValues = values.slice(0, maxRowsToShow);
  const hasMoreRows = values.length > maxRowsToShow;

  return (
    <div className="w-full">
      {/* Header with export options */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-200">
            {rowCount} {rowCount === 1 ? 'row' : 'rows'} returned
            {hasMoreRows && ` (showing first ${maxRowsToShow})`}
          </span>
        </div>
        {values.length > 0 && (
          <div className="flex gap-2">
            <NeumorphicButton
              size="sm"
              variant="ghost"
              icon={Download}
              onClick={handleExportCSV}
            >
              Export CSV
            </NeumorphicButton>
            <NeumorphicButton
              size="sm"
              variant="ghost"
              icon={Download}
              onClick={handleExportJSON}
            >
              Export JSON
            </NeumorphicButton>
          </div>
        )}
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full border-collapse bg-gray-900">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-700">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-200 border-r border-gray-700 last:border-r-0"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayValues.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-2 text-sm text-gray-300 border-r border-gray-800 last:border-r-0 whitespace-nowrap"
                  >
                    {cell === null ? (
                      <span className="text-gray-500 italic">NULL</span>
                    ) : typeof cell === 'number' ? (
                      cell.toLocaleString()
                    ) : (
                      String(cell)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {values.length === 0 && columns.length > 0 && (
        <div className="p-4 text-center text-gray-400 text-sm">
          Query executed successfully but returned no rows.
        </div>
      )}
    </div>
  );
};

export default memo(SQLResults);

