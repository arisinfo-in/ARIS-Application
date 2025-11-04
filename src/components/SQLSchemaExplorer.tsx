import React, { useState, useEffect, memo } from 'react';
import { ChevronDown, ChevronRight, Table, Columns } from 'lucide-react';
import NeumorphicCard from './NeumorphicCard';
import { sqlEngineService } from '../services/sqlEngineService';
import { datasetService, DatasetMetadata } from '../services/datasetService';

interface SQLSchemaExplorerProps {
  datasetId: string | null;
}

const SQLSchemaExplorer: React.FC<SQLSchemaExplorerProps> = ({ datasetId }) => {
  const [schema, setSchema] = useState<DatasetMetadata | null>(null);
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSchema = async () => {
      if (!datasetId) {
        setSchema(null);
        return;
      }

      setLoading(true);
      try {
        const metadata = await datasetService.getDatasetSchema(datasetId);
        setSchema(metadata);
      } catch (error) {
        console.error('Error loading schema:', error);
        setSchema(null);
      } finally {
        setLoading(false);
      }
    };

    loadSchema();
  }, [datasetId]);

  const toggleTable = (tableName: string) => {
    setExpandedTables(prev => {
      const next = new Set(prev);
      if (next.has(tableName)) {
        next.delete(tableName);
      } else {
        next.add(tableName);
      }
      return next;
    });
  };

  if (!datasetId) {
    return (
      <NeumorphicCard padding="md" className="h-full">
        <div className="text-center text-gray-400 py-8">
          <Table className="w-12 h-12 mx-auto mb-3 text-gray-600" />
          <p className="text-sm">Select a dataset to view schema</p>
        </div>
      </NeumorphicCard>
    );
  }

  if (loading) {
    return (
      <NeumorphicCard padding="md" className="h-full">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
      </NeumorphicCard>
    );
  }

  if (!schema) {
    return (
      <NeumorphicCard padding="md" className="h-full">
        <div className="text-center text-gray-400 py-8">
          <p className="text-sm">Failed to load schema</p>
        </div>
      </NeumorphicCard>
    );
  }

  return (
    <NeumorphicCard padding="md" className="h-full overflow-auto">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-100 mb-1">{schema.name}</h3>
        <p className="text-sm text-gray-300">{schema.description}</p>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
          <Table className="w-4 h-4" />
          Tables ({schema.tables.length})
        </h4>
        
        {schema.tables.map((table) => (
          <div key={table.name} className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleTable(table.name)}
              className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-750 transition-colors flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                {expandedTables.has(table.name) ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
                <span className="text-sm font-medium text-gray-200">{table.name}</span>
              </div>
              <span className="text-xs text-gray-400">{table.columns.length} columns</span>
            </button>
            
            {expandedTables.has(table.name) && (
              <div className="px-3 py-2 bg-gray-900 border-t border-gray-700">
                <p className="text-xs text-gray-400 mb-2">{table.description}</p>
                <div className="space-y-1">
                  {table.columns.map((column) => (
                    <div
                      key={column}
                      className="flex items-center gap-2 text-xs text-gray-300 py-1 px-2 rounded hover:bg-gray-800"
                    >
                      <Columns className="w-3 h-3 text-gray-500" />
                      <span className="font-mono">{column}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </NeumorphicCard>
  );
};

export default memo(SQLSchemaExplorer);

