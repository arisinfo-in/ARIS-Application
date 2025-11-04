import { sqlEngineService } from './sqlEngineService';

export interface Dataset {
  id: string;
  name: string;
  description: string;
  filePath: string;
}

export interface DatasetMetadata {
  name: string;
  description: string;
  tables: Array<{
    name: string;
    description: string;
    columns: string[];
  }>;
}

class DatasetService {
  private datasets: Dataset[] = [
    {
      id: 'classicmodels',
      name: 'ClassicModels',
      description: 'Classic car dealership database with products, customers, orders, and employees',
      filePath: '/datasets/classicmodels.sqlite'
    },
    {
      id: 'world',
      name: 'World Database',
      description: 'Geographic database with countries, cities, and languages',
      filePath: '/datasets/world.sqlite'
    }
  ];

  private schemaCache: { [key: string]: DatasetMetadata } | null = null;

  async getDatasets(): Promise<Dataset[]> {
    return this.datasets;
  }

  async getDatasetMetadata(): Promise<{ [key: string]: DatasetMetadata }> {
    if (this.schemaCache) {
      return this.schemaCache;
    }

    try {
      // In Vite, files in src/data are imported, so we need to fetch from public or import directly
      // For now, we'll use a static import approach or fetch from public
      const response = await fetch('/datasets/schemas.json');
      if (!response.ok) {
        // Fallback: return basic schema info
        return {
          classicmodels: {
            name: 'ClassicModels',
            description: 'Classic car dealership database',
            tables: []
          },
          world: {
            name: 'World Database',
            description: 'Geographic database',
            tables: []
          }
        };
      }
      const data = await response.json();
      this.schemaCache = data;
      return data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to load schema metadata:', error);
      }
      // Return fallback schema
      return {
        classicmodels: {
          name: 'ClassicModels',
          description: 'Classic car dealership database',
          tables: []
        },
        world: {
          name: 'World Database',
          description: 'Geographic database',
          tables: []
        }
      };
    }
  }

  async loadDataset(datasetId: string): Promise<void> {
    const dataset = this.datasets.find(d => d.id === datasetId);
    if (!dataset) {
      throw new Error(`Dataset ${datasetId} not found`);
    }

    try {
      // Initialize SQL engine if not already done
      await sqlEngineService.initialize();

      // Load database file
      const response = await fetch(dataset.filePath);
      if (!response.ok) {
        // If file doesn't exist, create a demo in-memory database
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Dataset file not found at ${dataset.filePath}, creating demo database`);
        }
        await this.createDemoDatabase(datasetId);
        return;
      }

      const arrayBuffer = await response.arrayBuffer();
      
      // Check if file is empty
      if (arrayBuffer.byteLength === 0) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Dataset file is empty, creating demo database`);
        }
        await this.createDemoDatabase(datasetId);
        return;
      }

      const dbBytes = new Uint8Array(arrayBuffer);

      // Validate that it's a valid SQLite database (starts with SQLite magic header)
      if (dbBytes.length < 16 || 
          String.fromCharCode(...dbBytes.slice(0, 15)) !== 'SQLite format 3') {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Invalid SQLite file, creating demo database`);
        }
        await this.createDemoDatabase(datasetId);
        return;
      }

      // Load database into SQL engine
      await sqlEngineService.loadDatabase(dbBytes);
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error loading dataset ${datasetId}:`, error);
      }
      // Try to create demo database as fallback
      try {
        await this.createDemoDatabase(datasetId);
      } catch (demoError) {
        throw new Error(`Failed to load dataset: ${error.message}. Please ensure the SQLite database file exists at ${dataset.filePath}`);
      }
    }
  }

  private async createDemoDatabase(datasetId: string): Promise<void> {
    await sqlEngineService.initialize();
    const sqlJs = sqlEngineService.getSqlJs();
    
    if (!sqlJs) {
      throw new Error('SQL.js not initialized');
    }

    // Create a new in-memory database
    const db = new sqlJs.Database();

    if (datasetId === 'classicmodels') {
      // Create demo ClassicModels tables
      db.run(`
        CREATE TABLE customers (
          customerNumber INTEGER PRIMARY KEY,
          customerName TEXT,
          contactLastName TEXT,
          contactFirstName TEXT,
          phone TEXT,
          city TEXT,
          country TEXT
        );
      `);

      db.run(`
        INSERT INTO customers VALUES
        (1, 'Atelier graphique', 'Schmitt', 'Carine', '40.32.2555', 'Nantes', 'France'),
        (2, 'Signal Gift Stores', 'King', 'Jean', '7025551838', 'Las Vegas', 'USA'),
        (3, 'Australian Collectors', 'Ferguson', 'Peter', '03 9520 4555', 'Melbourne', 'Australia'),
        (4, 'La Rochelle Gifts', 'Labrune', 'Janine', '40.67.8555', 'Nantes', 'France'),
        (5, 'Saveley & Henot', 'Saveley', 'Paul', '78.32.5555', 'Lyon', 'France');
      `);

      db.run(`
        CREATE TABLE products (
          productCode TEXT PRIMARY KEY,
          productName TEXT,
          productLine TEXT,
          quantityInStock INTEGER,
          buyPrice DECIMAL(10,2)
        );
      `);

      db.run(`
        INSERT INTO products VALUES
        ('S10_1678', '1969 Harley Davidson Ultimate Chopper', 'Motorcycles', 7933, 48.81),
        ('S10_1949', '1952 Alpine Renault 1300', 'Classic Cars', 7305, 98.58),
        ('S10_2016', '1996 Moto Guzzi 1100i', 'Motorcycles', 6625, 68.99),
        ('S12_1099', '1968 Ford Mustang', 'Classic Cars', 68, 95.34),
        ('S12_1666', '1958 Setra Bus', 'Trucks and Buses', 1579, 77.90);
      `);
    } else if (datasetId === 'world') {
      // Create demo World database
      db.run(`
        CREATE TABLE country (
          Code TEXT PRIMARY KEY,
          Name TEXT,
          Continent TEXT,
          Population INTEGER
        );
      `);

      db.run(`
        INSERT INTO country VALUES
        ('USA', 'United States', 'North America', 278357000),
        ('CHN', 'China', 'Asia', 1277558000),
        ('IND', 'India', 'Asia', 1013662000),
        ('GBR', 'United Kingdom', 'Europe', 59623400),
        ('FRA', 'France', 'Europe', 59225700);
      `);

      db.run(`
        CREATE TABLE city (
          ID INTEGER PRIMARY KEY,
          Name TEXT,
          CountryCode TEXT,
          Population INTEGER
        );
      `);

      db.run(`
        INSERT INTO city VALUES
        (1, 'Kabul', 'AFG', 1780000),
        (2, 'Qandahar', 'AFG', 237500),
        (3, 'Herat', 'AFG', 186800),
        (4, 'New York', 'USA', 8008278),
        (5, 'Los Angeles', 'USA', 3694820);
      `);
    }

    // Export database to bytes and load it
    const dbBytes = db.export();
    db.close();
    
    // Validate exported bytes before loading
    if (!dbBytes || dbBytes.length === 0) {
      throw new Error('Failed to export demo database');
    }
    
    await sqlEngineService.loadDatabase(dbBytes);
  }

  getDatasetById(datasetId: string): Dataset | undefined {
    return this.datasets.find(d => d.id === datasetId);
  }

  async getDatasetSchema(datasetId: string): Promise<DatasetMetadata | null> {
    const metadata = await this.getDatasetMetadata();
    return metadata[datasetId] || null;
  }

  async getTableNames(datasetId: string): Promise<string[]> {
    try {
      await this.loadDataset(datasetId);
      return await sqlEngineService.getTableNames();
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error getting table names:', error);
          }
          return [];
        }
  }
}

export const datasetService = new DatasetService();

