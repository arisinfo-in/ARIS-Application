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
      // Create complete ClassicModels database with all tables
      
      // Customers table
      db.run(`
        CREATE TABLE customers (
          customerNumber INTEGER PRIMARY KEY,
          customerName TEXT NOT NULL,
          contactLastName TEXT NOT NULL,
          contactFirstName TEXT NOT NULL,
          phone TEXT NOT NULL,
          addressLine1 TEXT,
          addressLine2 TEXT,
          city TEXT,
          state TEXT,
          postalCode TEXT,
          country TEXT NOT NULL,
          salesRepEmployeeNumber INTEGER,
          creditLimit DECIMAL(10,2)
        );
      `);

      db.run(`
        INSERT INTO customers VALUES
        (103, 'Atelier graphique', 'Schmitt', 'Carine', '40.32.2555', '54, rue Royale', NULL, 'Nantes', NULL, '44000', 'France', 1370, 21000.00),
        (112, 'Signal Gift Stores', 'King', 'Jean', '7025551838', '8489 Strong St.', NULL, 'Las Vegas', 'NV', '83030', 'USA', 1166, 71800.00),
        (114, 'Australian Collectors, Co.', 'Ferguson', 'Peter', '03 9520 4555', '636 St Kilda Road', 'Level 3', 'Melbourne', 'Victoria', '3004', 'Australia', 1611, 117300.00),
        (119, 'La Rochelle Gifts', 'Labrune', 'Janine', '40.67.8555', '67, rue des Cinquante Otages', NULL, 'Nantes', NULL, '44000', 'France', 1370, 118200.00),
        (121, 'Baane Mini Imports', 'Bergulfsen', 'Jonas', '07-98 9555', 'Erling Skakkes gate 78', NULL, 'Stavern', NULL, '4110', 'Norway', 1504, 81700.00);
      `);

      // Products table
      db.run(`
        CREATE TABLE products (
          productCode TEXT PRIMARY KEY,
          productName TEXT NOT NULL,
          productLine TEXT NOT NULL,
          productScale TEXT NOT NULL,
          productVendor TEXT NOT NULL,
          productDescription TEXT NOT NULL,
          quantityInStock INTEGER NOT NULL,
          buyPrice DECIMAL(10,2) NOT NULL,
          MSRP DECIMAL(10,2) NOT NULL
        );
      `);

      db.run(`
        INSERT INTO products VALUES
        ('S10_1678', '1969 Harley Davidson Ultimate Chopper', 'Motorcycles', '1:10', 'Min Lin Diecast', 'This replica features working kickstand, front suspension, gear-shift lever, footbrake lever, drive chain, wheels and steering. All parts are particularly delicate due to their precise scale and require special attention and display.', 7933, 48.81, 95.70),
        ('S10_1949', '1952 Alpine Renault 1300', 'Classic Cars', '1:10', 'Classic Metal Creations', 'Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.', 7305, 98.58, 214.30),
        ('S10_2016', '1996 Moto Guzzi 1100i', 'Motorcycles', '1:10', 'Highway 66 Mini Classics', 'Official Moto Guzzi logos and insignias, saddle bags located on side of motorcycle, detailed engine, working steering, working suspension, two leather seats, luggage rack, dual exhaust pipes, small saddle bag located on handle bars, two-tone paint with chrome accents, superior die-cast detail , rotating wheels , working kick stand, diecast metal with plastic parts and baked enamel finish.', 6625, 68.99, 118.94),
        ('S12_1099', '1968 Ford Mustang', 'Classic Cars', '1:12', 'Autoart Studio Design', 'Hood, doors and trunk all open to reveal highly detailed interior features. Steering wheel actually turns the front wheels. Color dark green.', 68, 95.34, 194.57),
        ('S12_1666', '1958 Setra Bus', 'Trucks and Buses', '1:12', 'Welly Diecast Productions', 'Model features 30 windows, skylights & glare resistant glass, working steering system, original logos', 1579, 77.90, 136.67),
        ('S18_1097', '1932 Model A Ford J-Coupe', 'Vintage Cars', '1:18', 'Highway 66 Mini Classics', 'This model features grille-mounted chrome horn, lift-up louvered hood, fold-down rumble seat, working steering system, chrome-covered spare, opening doors, detailed and wired engine', 9353, 58.48, 127.13),
        ('S18_1121', '1996 Moto Guzzi 1100i', 'Motorcycles', '1:18', 'Highway 66 Mini Classics', 'Official Moto Guzzi logos and insignias, saddle bags located on side of motorcycle, detailed engine, working steering, working suspension, two leather seats, luggage rack, dual exhaust pipes, small saddle bag located on handle bars, two-tone paint with chrome accents, superior die-cast detail , rotating wheels , working kick stand, diecast metal with plastic parts and baked enamel finish.', 6625, 68.99, 118.94),
        ('S18_1342', '1937 Buick GS Special 2 Door Hardtop', 'Vintage Cars', '1:18', 'Classic Metal Creations', 'Model features 2 doors, hood, trunk lift-up, detailed engine, working steering system, chrome-covered spare, opening doors, detailed and wired engine.', 8692, 52.14, 106.49),
        ('S18_1367', '1936 Mercedes-Benz 500K Roadster', 'Vintage Cars', '1:18', 'Highway 66 Mini Classics', 'This 1:18 scale replica features chrome accents, chrome wheels, working steering system, opening doors, opening hood, detailed engine, detailed interior, and baked enamel finish.', 8635, 24.26, 53.91),
        ('S18_1589', '1965 Aston Martin DB5', 'Classic Cars', '1:18', 'Classic Metal Creations', 'Die-cast model of the silver 1965 Aston Martin DB5 in silver. This model includes full wire wheels and doors that open with fully detailed passenger compartment. In 1:18 scale, this model measures approximately 10 inches/20 cm long.', 9042, 65.96, 124.44);
      `);

      // Orders table
      db.run(`
        CREATE TABLE orders (
          orderNumber INTEGER PRIMARY KEY,
          orderDate TEXT NOT NULL,
          requiredDate TEXT NOT NULL,
          shippedDate TEXT,
          status TEXT NOT NULL,
          comments TEXT,
          customerNumber INTEGER NOT NULL
        );
      `);

      db.run(`
        INSERT INTO orders VALUES
        (10100, '2003-01-06', '2003-01-13', '2003-01-10', 'Shipped', NULL, 363),
        (10101, '2003-01-09', '2003-01-18', '2003-01-11', 'Shipped', 'Check on availability.', 128),
        (10102, '2003-01-10', '2003-01-18', '2003-01-14', 'Shipped', NULL, 181),
        (10103, '2003-01-29', '2003-02-07', '2003-02-02', 'Shipped', NULL, 121),
        (10104, '2003-01-31', '2003-02-09', '2003-02-01', 'Shipped', NULL, 141),
        (10105, '2003-02-11', '2003-02-21', '2003-02-12', 'Shipped', NULL, 145),
        (10106, '2003-02-17', '2003-02-24', '2003-02-21', 'Shipped', NULL, 278),
        (10107, '2003-02-24', '2003-03-03', '2003-02-26', 'Shipped', 'Difficult to negotiate with customer. We need more marketing materials', 131),
        (10108, '2003-03-03', '2003-03-12', '2003-03-08', 'Shipped', NULL, 385),
        (10109, '2003-03-10', '2003-03-19', '2003-03-11', 'Shipped', 'Customer requested that FedEx Ground is used for this shipping', 486);
      `);

      // OrderDetails table
      db.run(`
        CREATE TABLE orderdetails (
          orderNumber INTEGER NOT NULL,
          productCode TEXT NOT NULL,
          quantityOrdered INTEGER NOT NULL,
          priceEach DECIMAL(10,2) NOT NULL,
          orderLineNumber INTEGER NOT NULL,
          PRIMARY KEY (orderNumber, productCode)
        );
      `);

      db.run(`
        INSERT INTO orderdetails VALUES
        (10100, 'S18_1749', 30, 136.00, 3),
        (10100, 'S18_2248', 50, 55.09, 2),
        (10100, 'S18_4409', 22, 75.46, 4),
        (10100, 'S24_3969', 49, 35.29, 1),
        (10101, 'S18_2325', 25, 108.06, 4),
        (10101, 'S18_2795', 26, 167.06, 1),
        (10101, 'S24_1937', 45, 32.53, 3),
        (10101, 'S24_2022', 46, 44.35, 2),
        (10102, 'S18_1342', 39, 95.55, 2),
        (10102, 'S18_1367', 41, 43.13, 1),
        (10103, 'S10_1949', 26, 214.30, 1),
        (10103, 'S10_4962', 42, 119.67, 2),
        (10103, 'S12_1666', 27, 121.64, 3),
        (10104, 'S12_4473', 22, 95.70, 4),
        (10104, 'S18_2238', 48, 140.81, 3),
        (10104, 'S18_2319', 22, 98.18, 2),
        (10104, 'S18_3232', 50, 137.17, 1),
        (10105, 'S10_1678', 23, 76.56, 4),
        (10105, 'S10_4698', 26, 175.39, 3),
        (10105, 'S12_2823', 48, 134.55, 2);
      `);

      // Employees table
      db.run(`
        CREATE TABLE employees (
          employeeNumber INTEGER PRIMARY KEY,
          lastName TEXT NOT NULL,
          firstName TEXT NOT NULL,
          extension TEXT NOT NULL,
          email TEXT NOT NULL,
          officeCode TEXT NOT NULL,
          reportsTo INTEGER,
          jobTitle TEXT NOT NULL
        );
      `);

      db.run(`
        INSERT INTO employees VALUES
        (1002, 'Murphy', 'Diane', 'x5800', 'dmurphy@classicmodelcars.com', '1', NULL, 'President'),
        (1056, 'Patterson', 'Mary', 'x4611', 'mpatterso@classicmodelcars.com', '1', 1002, 'VP Sales'),
        (1076, 'Firrelli', 'Jeff', 'x9273', 'jfirrelli@classicmodelcars.com', '1', 1002, 'VP Marketing'),
        (1088, 'Patterson', 'William', 'x4871', 'wpatterson@classicmodelcars.com', '6', 1056, 'Sales Manager (APAC)'),
        (1102, 'Bondur', 'Gerard', 'x5408', 'gbondur@classicmodelcars.com', '4', 1056, 'Sale Manager (EMEA)'),
        (1143, 'Bow', 'Anthony', 'x5428', 'abow@classicmodelcars.com', '1', 1056, 'Sales Manager (NA)'),
        (1165, 'Jennings', 'Leslie', 'x3291', 'ljennings@classicmodelcars.com', '1', 1143, 'Sales Rep'),
        (1166, 'Thompson', 'Leslie', 'x4065', 'lthompson@classicmodelcars.com', '1', 1143, 'Sales Rep'),
        (1188, 'Firrelli', 'Julie', 'x2173', 'jfirrelli@classicmodelcars.com', '2', 1143, 'Sales Rep'),
        (1216, 'Patterson', 'Steve', 'x4334', 'spatterson@classicmodelcars.com', '2', 1143, 'Sales Rep');
      `);

      // Offices table
      db.run(`
        CREATE TABLE offices (
          officeCode TEXT PRIMARY KEY,
          city TEXT NOT NULL,
          phone TEXT NOT NULL,
          addressLine1 TEXT NOT NULL,
          addressLine2 TEXT,
          state TEXT,
          country TEXT NOT NULL,
          postalCode TEXT NOT NULL,
          territory TEXT NOT NULL
        );
      `);

      db.run(`
        INSERT INTO offices VALUES
        ('1', 'San Francisco', '+1 650 219 4782', '100 Market Street', 'Suite 300', 'CA', 'USA', '94080', 'NA'),
        ('2', 'Boston', '+1 215 837 0825', '1550 Court Place', 'Suite 102', 'MA', 'USA', '02107', 'NA'),
        ('3', 'NYC', '+1 212 555 3000', '523 East 53rd Street', 'apt. 5A', 'NY', 'USA', '10022', 'NA'),
        ('4', 'Paris', '+33 14 723 4404', '43 Rue Jouffroy D''abbans', NULL, NULL, 'France', '75017', 'EMEA'),
        ('5', 'Tokyo', '+81 33 224 5000', '4-1 Kioicho', NULL, 'Chiyoda-Ku', 'Japan', '102-8578', 'Japan'),
        ('6', 'Sydney', '+61 2 9264 2451', '5-11 Wentworth Avenue', 'Floor #2', NULL, 'Australia', 'NSW 2010', 'APAC'),
        ('7', 'London', '+44 20 7877 2041', '25 Old Broad Street', 'Level 7', NULL, 'UK', 'EC2N 1HN', 'EMEA');
      `);

      // Payments table
      db.run(`
        CREATE TABLE payments (
          customerNumber INTEGER NOT NULL,
          checkNumber TEXT NOT NULL,
          paymentDate TEXT NOT NULL,
          amount DECIMAL(10,2) NOT NULL,
          PRIMARY KEY (customerNumber, checkNumber)
        );
      `);

      db.run(`
        INSERT INTO payments VALUES
        (103, 'HQ336336', '2004-10-19', 6066.78),
        (103, 'JM555205', '2003-06-05', 14571.44),
        (103, 'OM314933', '2004-12-18', 1676.14),
        (112, 'BO864823', '2004-12-17', 14191.12),
        (112, 'HQ55022', '2003-06-06', 32641.98),
        (112, 'ND748579', '2004-08-20', 33347.88),
        (114, 'GG31455', '2003-05-20', 45864.03),
        (114, 'MA765515', '2004-12-15', 82261.22),
        (114, 'NP603840', '2003-05-31', 7565.08),
        (114, 'NR27552', '2004-03-10', 44894.74),
        (119, 'DB933704', '2004-11-14', 19501.82),
        (119, 'LN373447', '2004-08-08', 47924.19),
        (119, 'NG94694', '2005-02-22', 49523.67),
        (121, 'DB889831', '2003-02-16', 50218.95),
        (121, 'FD317790', '2003-10-28', 1491.38),
        (121, 'KI831359', '2004-11-04', 17876.32),
        (121, 'MA302151', '2004-11-28', 34638.14);
      `);

      // ProductLines table
      db.run(`
        CREATE TABLE productlines (
          productLine TEXT PRIMARY KEY,
          textDescription TEXT,
          htmlDescription TEXT,
          image BLOB
        );
      `);

      db.run(`
        INSERT INTO productlines VALUES
        ('Classic Cars', 'Attention car enthusiasts: Make your wildest car ownership dreams come true. Whether you are looking for classic muscle cars, dream sports cars or movie-inspired miniatures, you will find great choices in this category. These replicas feature superb attention to detail and craftsmanship. Many have working aspects such as the steering, suspension, hoods, and doors.', NULL, NULL),
        ('Motorcycles', 'Our motorcycles are painstakingly reproduced to exact specifications. Each model features many handcrafted components and is packed with features such as official logos, rotating wheels, working kickstands, front suspension, gear-shift levers, and detailed engine parts.', NULL, NULL),
        ('Planes', 'Unique, diecast airplane and helicopter replicas suitable for collections, as well as home, office or classroom decorations. Models contain stunning details such as official logos and insignias, rotating jet engines, propellers, wheels, and landing gear.', NULL, NULL),
        ('Ships', 'The perfect holiday or anniversary gift for executives, clients, friends, and family. These handcrafted model ships are unique, stunning works of art that will be treasured for generations. They come fully assembled and ready for display in the home or office.', NULL, NULL),
        ('Trains', 'Model trains are a rewarding hobby for enthusiasts of all ages. Whether you are looking for collectible wooden trains, electric streetcars or locomotives, you will find a number of great choices for any budget within this category.', NULL, NULL),
        ('Trucks and Buses', 'The Truck and Bus models are realistic replicas of buses and specialized trucks produced from the early 1920s to present. The models range in size from 1:12 to 1:50 scale and include numerous limited edition and several out-of-production vehicles.', NULL, NULL),
        ('Vintage Cars', 'Our Vintage Car models realistically portray automobiles produced from the early 1900s through the 1940s. Materials used include Bakelite, diecast, plastic and wood. Most of the replicas are in the 1:18 and 1:24 scale sizes, some of which can be up to 20 or 30 inches in length.', NULL, NULL);
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

