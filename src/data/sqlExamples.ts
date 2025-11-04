export interface SQLExample {
  id: string;
  title: string;
  description: string;
  query: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  dataset: string;
}

export const sqlExamples: { [key: string]: SQLExample[] } = {
  classicmodels: [
    {
      id: 'cm-1',
      title: 'List All Customers',
      description: 'Simple SELECT query to retrieve all customer records',
      query: 'SELECT * FROM customers LIMIT 10;',
      difficulty: 'beginner',
      dataset: 'classicmodels'
    },
    {
      id: 'cm-2',
      title: 'Filter Customers by Country',
      description: 'Use WHERE clause to filter customers from a specific country',
      query: "SELECT customerName, city, country FROM customers WHERE country = 'USA' ORDER BY customerName;",
      difficulty: 'beginner',
      dataset: 'classicmodels'
    },
    {
      id: 'cm-3',
      title: 'Count Orders by Status',
      description: 'Use GROUP BY and COUNT to aggregate order data',
      query: 'SELECT status, COUNT(*) as orderCount FROM orders GROUP BY status;',
      difficulty: 'beginner',
      dataset: 'classicmodels'
    },
    {
      id: 'cm-4',
      title: 'Top 10 Products by Sales',
      description: 'Join tables and calculate total sales using SUM',
      query: `SELECT p.productName, SUM(od.quantityOrdered * od.priceEach) as totalSales
FROM products p
JOIN orderdetails od ON p.productCode = od.productCode
GROUP BY p.productCode, p.productName
ORDER BY totalSales DESC
LIMIT 10;`,
      difficulty: 'intermediate',
      dataset: 'classicmodels'
    },
    {
      id: 'cm-5',
      title: 'Customer Order History',
      description: 'Join customers with orders to show order history',
      query: `SELECT c.customerName, o.orderNumber, o.orderDate, o.status
FROM customers c
JOIN orders o ON c.customerNumber = o.customerNumber
ORDER BY c.customerName, o.orderDate DESC
LIMIT 20;`,
      difficulty: 'intermediate',
      dataset: 'classicmodels'
    },
    {
      id: 'cm-6',
      title: 'Average Order Value by Country',
      description: 'Calculate average order values grouped by customer country',
      query: `SELECT c.country, 
       COUNT(DISTINCT o.orderNumber) as totalOrders,
       AVG(p.amount) as avgOrderValue
FROM customers c
JOIN orders o ON c.customerNumber = o.customerNumber
JOIN payments p ON c.customerNumber = p.customerNumber
GROUP BY c.country
ORDER BY avgOrderValue DESC;`,
      difficulty: 'intermediate',
      dataset: 'classicmodels'
    },
    {
      id: 'cm-7',
      title: 'Products with Low Stock',
      description: 'Filter products below reorder threshold',
      query: `SELECT productCode, productName, quantityInStock, buyPrice
FROM products
WHERE quantityInStock < 1000
ORDER BY quantityInStock ASC;`,
      difficulty: 'beginner',
      dataset: 'classicmodels'
    },
    {
      id: 'cm-8',
      title: 'Monthly Sales Report',
      description: 'Group sales by month using date functions',
      query: `SELECT 
  strftime('%Y-%m', o.orderDate) as month,
  COUNT(DISTINCT o.orderNumber) as ordersCount,
  SUM(od.quantityOrdered * od.priceEach) as totalRevenue
FROM orders o
JOIN orderdetails od ON o.orderNumber = od.orderNumber
GROUP BY strftime('%Y-%m', o.orderDate)
ORDER BY month DESC;`,
      difficulty: 'advanced',
      dataset: 'classicmodels'
    },
    {
      id: 'cm-9',
      title: 'Customers with No Orders',
      description: 'Use LEFT JOIN to find customers without orders',
      query: `SELECT c.customerNumber, c.customerName, c.country
FROM customers c
LEFT JOIN orders o ON c.customerNumber = o.customerNumber
WHERE o.orderNumber IS NULL;`,
      difficulty: 'intermediate',
      dataset: 'classicmodels'
    },
    {
      id: 'cm-10',
      title: 'Top Sales Rep by Revenue',
      description: 'Calculate total sales per employee',
      query: `SELECT e.employeeNumber, 
       e.firstName || ' ' || e.lastName as employeeName,
       SUM(p.amount) as totalSales
FROM employees e
JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
JOIN payments p ON c.customerNumber = p.customerNumber
GROUP BY e.employeeNumber, e.firstName, e.lastName
ORDER BY totalSales DESC
LIMIT 10;`,
      difficulty: 'advanced',
      dataset: 'classicmodels'
    }
  ],
  world: [
    {
      id: 'w-1',
      title: 'List All Countries',
      description: 'Simple SELECT to view all countries',
      query: 'SELECT Code, Name, Continent, Population FROM country ORDER BY Name LIMIT 20;',
      difficulty: 'beginner',
      dataset: 'world'
    },
    {
      id: 'w-2',
      title: 'Countries by Population',
      description: 'Sort countries by population',
      query: 'SELECT Name, Continent, Population FROM country ORDER BY Population DESC LIMIT 10;',
      difficulty: 'beginner',
      dataset: 'world'
    },
    {
      id: 'w-3',
      title: 'Cities in a Country',
      description: 'Join cities with countries to filter by country',
      query: "SELECT city.Name, city.Population FROM city JOIN country ON city.CountryCode = country.Code WHERE country.Name = 'United States' ORDER BY city.Population DESC LIMIT 10;",
      difficulty: 'intermediate',
      dataset: 'world'
    },
    {
      id: 'w-4',
      title: 'Official Languages by Country',
      description: 'Filter for official languages using WHERE clause',
      query: "SELECT country.Name, countrylanguage.Language, countrylanguage.Percentage FROM country JOIN countrylanguage ON country.Code = countrylanguage.CountryCode WHERE countrylanguage.IsOfficial = 'T' ORDER BY country.Name;",
      difficulty: 'intermediate',
      dataset: 'world'
    },
    {
      id: 'w-5',
      title: 'Countries with Most Languages',
      description: 'Count languages per country using GROUP BY',
      query: `SELECT country.Name, COUNT(countrylanguage.Language) as languageCount
FROM country
JOIN countrylanguage ON country.Code = countrylanguage.CountryCode
GROUP BY country.Code, country.Name
ORDER BY languageCount DESC
LIMIT 10;`,
      difficulty: 'intermediate',
      dataset: 'world'
    },
    {
      id: 'w-6',
      title: 'Average Population by Continent',
      description: 'Calculate average population using AVG and GROUP BY',
      query: `SELECT Continent, 
       COUNT(*) as countryCount,
       AVG(Population) as avgPopulation,
       SUM(Population) as totalPopulation
FROM country
GROUP BY Continent
ORDER BY totalPopulation DESC;`,
      difficulty: 'intermediate',
      dataset: 'world'
    },
    {
      id: 'w-7',
      title: 'Most Populous Cities',
      description: 'Find the largest cities across all countries',
      query: `SELECT city.Name, country.Name as Country, city.Population
FROM city
JOIN country ON city.CountryCode = country.Code
ORDER BY city.Population DESC
LIMIT 20;`,
      difficulty: 'beginner',
      dataset: 'world'
    },
    {
      id: 'w-8',
      title: 'Countries with Multiple Official Languages',
      description: 'Use HAVING to filter aggregated results',
      query: `SELECT country.Name, COUNT(countrylanguage.Language) as officialLanguageCount
FROM country
JOIN countrylanguage ON country.Code = countrylanguage.CountryCode
WHERE countrylanguage.IsOfficial = 'T'
GROUP BY country.Code, country.Name
HAVING COUNT(countrylanguage.Language) > 1
ORDER BY officialLanguageCount DESC;`,
      difficulty: 'advanced',
      dataset: 'world'
    }
  ]
};

export function getExamplesByDataset(datasetId: string): SQLExample[] {
  return sqlExamples[datasetId] || [];
}

export function getExamplesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): SQLExample[] {
  return Object.values(sqlExamples).flat().filter(ex => ex.difficulty === difficulty);
}

