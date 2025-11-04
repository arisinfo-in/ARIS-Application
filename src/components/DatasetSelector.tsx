import React, { memo, useState, useRef, useEffect } from 'react';
import { Database, ChevronDown, Check, Loader } from 'lucide-react';
import NeumorphicCard from './NeumorphicCard';
import { Dataset } from '../services/datasetService';

interface DatasetSelectorProps {
  datasets: Dataset[];
  selectedDataset: string | null;
  onDatasetChange: (datasetId: string) => void;
  loading?: boolean;
}

const DatasetSelector: React.FC<DatasetSelectorProps> = ({
  datasets,
  selectedDataset,
  onDatasetChange,
  loading = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedDatasetData = datasets.find(d => d.id === selectedDataset);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (datasetId: string) => {
    if (datasetId !== selectedDataset && !loading) {
      onDatasetChange(datasetId);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, datasetId?: string) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' && datasetId) {
      handleSelect(datasetId);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Database className="w-5 h-5 text-orange-500 flex-shrink-0" />
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !loading && setIsOpen(!isOpen)}
          disabled={loading}
          onKeyDown={(e) => handleKeyDown(e)}
          className={`
            px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
            text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 
            disabled:opacity-50 disabled:cursor-not-allowed 
            w-[480px] h-[56px]
            flex items-center justify-between gap-3
            hover:bg-gray-800 hover:border-gray-600
            active:bg-gray-750
            transition-all duration-200
            ${isOpen ? 'ring-2 ring-orange-500 border-orange-500' : ''}
          `}
        >
          <div className="flex-1 text-left min-w-0">
            {loading ? (
              <span className="text-gray-400 block truncate">Loading dataset...</span>
            ) : selectedDatasetData ? (
              <div className="min-w-0">
                <div className="font-medium truncate">{selectedDatasetData.name}</div>
                <div className="text-xs text-gray-400 truncate">{selectedDatasetData.description}</div>
              </div>
            ) : (
              <span className="text-gray-400 block truncate">Select a dataset...</span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {loading ? (
              <Loader className="w-4 h-4 animate-spin text-orange-500" />
            ) : (
              <ChevronDown 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
              />
            )}
          </div>
        </button>

        {isOpen && !loading && (
          <NeumorphicCard 
            className="absolute top-full mt-2 left-0 z-50 w-[480px] max-h-[300px] overflow-y-auto shadow-xl p-0"
          >
            <div className="py-2">
              {datasets.length === 0 ? (
                <div className="px-4 py-3 text-gray-400 text-sm text-center">
                  No datasets available
                </div>
              ) : (
                datasets.map((dataset) => {
                  const isSelected = dataset.id === selectedDataset;
                  return (
                    <button
                      key={dataset.id}
                      type="button"
                      onClick={() => handleSelect(dataset.id)}
                      onKeyDown={(e) => handleKeyDown(e, dataset.id)}
                      className={`
                        w-full px-4 py-3 text-left
                        transition-all duration-150
                        hover:bg-gray-800/50
                        active:bg-gray-800
                        ${isSelected ? 'bg-gray-800/30' : ''}
                        border-l-2 ${isSelected ? 'border-orange-500' : 'border-transparent'}
                      `}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Database className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            <span className={`font-medium ${isSelected ? 'text-orange-400' : 'text-gray-100'}`}>
                              {dataset.name}
                            </span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                            {dataset.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </NeumorphicCard>
        )}
      </div>
    </div>
  );
};

export default memo(DatasetSelector);

