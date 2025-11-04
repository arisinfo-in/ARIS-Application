# SQL Practice Datasets

This directory should contain SQLite database files for the SQL practice feature.

## Required Files

1. **classicmodels.sqlite** - ClassicModels database
   - Download from: https://www.mysqltutorial.org/mysql-sample-database.aspx
   - Convert MySQL dump to SQLite using a tool like: https://github.com/dumblob/mysql2sqlite

2. **world.sqlite** - World database  
   - Download from: https://dev.mysql.com/doc/index-other.html
   - Convert MySQL dump to SQLite

## Setup Instructions

1. Download the MySQL sample databases
2. Convert them to SQLite format using mysql2sqlite or similar tool
3. Place the converted `.sqlite` files in this directory
4. The application will automatically load them when users select a dataset

## File Structure

```
public/datasets/
├── classicmodels.sqlite
├── world.sqlite
└── README.md (this file)
```

## Alternative: Using Online Datasets

If you prefer not to host the files locally, you can modify `datasetService.ts` to load databases from a CDN or external source.

