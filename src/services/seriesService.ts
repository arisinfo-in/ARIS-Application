export interface SeriesEpisode {
  id: string;
  partNumber: number;
  title: string;
  summary: string;
  content: string;
  readTime: number; // in minutes
  isCompleted?: boolean;
  publishedAt: string;
  tags: string[];
}

export interface SeriesData {
  id: string;
  title: string;
  description: string;
  totalEpisodes: number;
  estimatedDuration: string; // e.g., "10 weeks", "5 hours"
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  episodes: SeriesEpisode[];
  prerequisites?: string[];
  learningOutcomes: string[];
}

class SeriesService {
  /**
   * Get series data for a specific module
   */
  getModuleSeries(moduleId: string): SeriesData {
    const seriesData = this.getSeriesData();
    return seriesData[moduleId as keyof typeof seriesData] || this.getDefaultSeries(moduleId);
  }

  /**
   * Get all available series
   */
  getAllSeries(): { [key: string]: SeriesData } {
    return this.getSeriesData();
  }

  /**
   * Get series data structure
   */
  private getSeriesData(): { [key: string]: SeriesData } {
    return {
      'excel': {
        id: 'excel',
        title: 'The Ultimate Guide to Excel for Data Analysis',
        description: 'Master Excel from basics to advanced data analysis techniques. This comprehensive series will take you from Excel novice to data analysis expert.',
        totalEpisodes: 15,
        estimatedDuration: '10 weeks',
        difficulty: 'Beginner',
        category: 'excel',
        prerequisites: ['Basic computer skills', 'Access to Microsoft Excel'],
        learningOutcomes: [
          'Master essential Excel functions and formulas',
          'Create powerful pivot tables and charts',
          'Automate tasks with macros and VBA',
          'Build interactive dashboards',
          'Perform advanced data analysis'
        ],
        episodes: [
          {
            id: 'excel-part-1',
            partNumber: 1,
            title: 'Getting Started with Excel for Data Analysis',
            summary: 'Set up your workspace, understand data types, and learn the fundamentals of data cleaning in Excel.',
            content: `# Part 1: Getting Started with Excel for Data Analysis

Welcome to **The Ultimate Guide to Excel for Data Analysis**! This comprehensive series will transform you from an Excel novice into a data analysis expert. In this first installment, we'll lay the foundation for everything that follows.

## Setting Up Your Workspace

Before diving into data analysis, it's crucial to set up your Excel environment for maximum efficiency.

### Essential Tools and Shortcuts

**Key Shortcuts to Master:**
- **Ctrl + T**: Create a table (essential for data analysis)
- **Ctrl + Shift + L**: Toggle filters
- **Alt + D + F + F**: Advanced filter
- **Ctrl + G**: Go to special cells

### Understanding Data Types

Excel recognizes several data types, and understanding them is crucial for effective analysis:

1. **Text**: Names, descriptions, categories
2. **Numbers**: Quantities, measurements, calculations
3. **Dates**: Time-based data (crucial for trend analysis)
4. **Boolean**: TRUE/FALSE values

**Pro Tip**: Always format your data types correctly from the start. This prevents calculation errors later.

## First Steps in Data Cleaning

Data cleaning is the foundation of any analysis. Here's your step-by-step approach:

### Step 1: Remove Duplicates
\`\`\`
Data → Remove Duplicates → Select all columns → OK
\`\`\`

### Step 2: Trim Spaces
Use the TRIM function to remove extra spaces:
\`\`\`
=TRIM(A1)
\`\`\`

### Step 3: Standardize Text
Use UPPER, LOWER, or PROPER functions:
\`\`\`
=PROPER(A1)  // Capitalizes first letter of each word
\`\`\`

## Practical Example: Sales Data

Let's work with a sample sales dataset throughout this series. Our dataset includes:
- Customer names
- Product categories
- Sales amounts
- Dates
- Regions

**Exercise**: Download the sample file and practice the cleaning techniques we've covered.

## Summary & Next Steps

In this first part, we've covered:
- Setting up your Excel workspace
- Understanding different data types
- Basic data cleaning techniques

**Next up**: In Part 2, we'll dive into essential formulas and functions that will supercharge your data analysis capabilities.

**Action Items**:
1. Practice the shortcuts we covered
2. Download and clean the sample dataset
3. Share your progress in the comments below

Ready for Part 2? Let's master those essential formulas!`,
            readTime: 12,
            publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Excel Basics', 'Data Cleaning', 'Getting Started', 'Workspace Setup']
          },
          {
            id: 'excel-part-2',
            partNumber: 2,
            title: 'Essential Formulas and Functions',
            summary: 'Master VLOOKUP, IF statements, and text functions that are essential for data analysis.',
            content: `# Part 2: Essential Formulas and Functions

Welcome back! In Part 1, we set up our workspace and learned basic data cleaning. Now it's time to unlock Excel's true power with essential formulas and functions.

## The Power of VLOOKUP and HLOOKUP

VLOOKUP is arguably Excel's most powerful function for data analysis.

### VLOOKUP Syntax
\`\`\`
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
\`\`\`

**Real-world Example**: Looking up customer information
\`\`\`
=VLOOKUP(A2, CustomerTable, 3, FALSE)
\`\`\`

### Common VLOOKUP Mistakes to Avoid
1. **Not using FALSE for exact matches**
2. **Including the entire column in table_array**
3. **Forgetting that VLOOKUP only looks right**

## Using IF, SUMIF, and COUNTIF

### IF Function for Conditional Logic
\`\`\`
=IF(A2>1000, "High Value", "Standard")
\`\`\`

### SUMIF for Conditional Summing
\`\`\`
=SUMIF(Region, "North", Sales)
\`\`\`

### COUNTIF for Conditional Counting
\`\`\`
=COUNTIF(Status, "Completed")
\`\`\`

## Text Functions for Data Manipulation

### CONCATENATE and & Operator
\`\`\`
=CONCATENATE(A2, " ", B2)
=A2 & " " & B2  // Same result, shorter syntax
\`\`\`

### LEFT, RIGHT, and MID Functions
\`\`\`
=LEFT(A2, 3)    // First 3 characters
=RIGHT(A2, 2)   // Last 2 characters
=MID(A2, 2, 4)  // 4 characters starting from position 2
\`\`\`

## Practical Exercise

Using our sales dataset, create formulas to:
1. Categorize sales as "High" (>$1000) or "Standard"
2. Sum sales by region
3. Count completed orders
4. Combine customer first and last names

## Summary & Next Steps

We've covered the essential formulas that form the backbone of Excel data analysis. These functions will be used throughout the rest of our series.

**Coming up in Part 3**: We'll dive into pivot tables - Excel's most powerful tool for data aggregation and analysis.

**Practice Challenge**: Create a summary report using all the functions we've learned today.`,
            readTime: 15,
            publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['VLOOKUP', 'IF Functions', 'Text Functions', 'Formulas']
          },
          {
            id: 'excel-part-3',
            partNumber: 3,
            title: 'Data Aggregation with Pivot Tables',
            summary: 'Master pivot tables - Excel\'s most powerful tool for data aggregation, filtering, and analysis.',
            content: `# Part 3: Data Aggregation with Pivot Tables

Pivot tables are Excel's crown jewel for data analysis. They transform raw data into meaningful insights with just a few clicks.

## Your First Pivot Table

### Step-by-Step Creation
1. Select your data range
2. Go to Insert → PivotTable
3. Choose your location
4. Drag fields to Rows, Columns, Values, and Filters

### Understanding the Four Areas
- **Rows**: Categories for grouping
- **Columns**: Sub-categories or time periods
- **Values**: Numbers to summarize
- **Filters**: Additional filtering options

## Filtering and Sorting in Pivot Tables

### Advanced Filtering Techniques
- Use the filter dropdowns
- Apply multiple filters simultaneously
- Create custom filters with conditions

### Sorting Options
- Sort by values (ascending/descending)
- Sort by labels (A-Z, Z-A)
- Custom sort orders

## Calculated Fields and Items

### Creating Calculated Fields
\`\`\`
Formula: [Sales] * 1.1  // Add 10% markup
\`\`\`

### Calculated Items
- Right-click on field → Calculated Item
- Create custom calculations within categories

## Practical Exercise

Create a pivot table from our sales data showing:
1. Sales by region and product category
2. Average order value by month
3. Top 10 customers by total sales

## Summary & Next Steps

Pivot tables are essential for data analysis. Master these techniques and you'll be able to analyze any dataset quickly and effectively.

**Next up**: Part 4 - Data Visualization with charts and dashboards.`,
            readTime: 18,
            publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Pivot Tables', 'Data Aggregation', 'Filtering', 'Calculated Fields']
          },
          {
            id: 'excel-part-4',
            partNumber: 4,
            title: 'Data Visualization and Dashboard Creation',
            summary: 'Learn to create compelling charts, dashboards, and visual stories that communicate insights effectively.',
            content: `# Part 4: Data Visualization and Dashboard Creation

Great data analysis means nothing without effective visualization. Learn to tell compelling stories with your data.

## Choosing the Right Chart Type

### Chart Selection Guide
- **Bar Charts**: Compare categories
- **Line Charts**: Show trends over time
- **Pie Charts**: Show proportions (use sparingly)
- **Scatter Plots**: Show relationships between variables
- **Histograms**: Show data distribution

### When to Use Each Type
- Use bar charts for categorical comparisons
- Use line charts for time series data
- Avoid pie charts with more than 5 categories
- Use scatter plots to identify correlations

## Creating Professional Charts

### Chart Design Principles
1. **Keep it simple**: Remove unnecessary elements
2. **Use consistent colors**: Stick to your brand palette
3. **Add clear titles and labels**: Make it self-explanatory
4. **Highlight key insights**: Use annotations

### Formatting Techniques
- Right-click elements to format
- Use the Format Chart Area panel
- Apply consistent fonts and colors
- Add data labels when helpful

## Building Interactive Dashboards

### Dashboard Layout
1. **Header**: Title and key metrics
2. **Main Charts**: Primary visualizations
3. **Supporting Data**: Tables and secondary charts
4. **Filters**: Interactive controls

### Using Slicers
- Insert → Slicer
- Connect to multiple pivot tables
- Create consistent filtering across charts

## Practical Exercise

Create a sales dashboard with:
1. Monthly sales trend (line chart)
2. Top products (bar chart)
3. Regional performance (map or bar chart)
4. Key metrics summary (KPI cards)

## Summary & Next Steps

Visualization transforms data into insights. Practice creating different chart types and building dashboards.

**Next up**: Part 5 - Advanced data cleaning with Power Query.`,
            readTime: 20,
            publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Charts', 'Dashboards', 'Visualization', 'Slicers']
          },
          {
            id: 'excel-part-5',
            partNumber: 5,
            title: 'Advanced Data Cleaning with Power Query',
            summary: 'Master Power Query for advanced data cleaning, transformation, and automation.',
            content: `# Part 5: Advanced Data Cleaning with Power Query

Power Query revolutionizes data preparation in Excel. Learn to clean and transform data like a pro.

## Introduction to Power Query

### What is Power Query?
- Built-in data transformation tool in Excel
- Connects to multiple data sources
- Performs complex data cleaning operations
- Records all steps for automation

### Getting Started
1. Data → Get Data → From Other Sources → Blank Query
2. Or use Data → Get Data → From Table/Range

## Essential Power Query Operations

### Data Type Conversion
- Right-click column → Change Type
- Choose appropriate data types
- Handle errors gracefully

### Removing and Filtering Data
- Remove duplicates
- Filter rows based on conditions
- Remove empty rows and columns

### Text Transformations
- Split columns by delimiter
- Extract text (first/last characters)
- Replace values
- Trim whitespace

## Advanced Transformations

### Unpivoting Data
- Transform columns into rows
- Essential for time series data
- Use Transform → Unpivot Columns

### Merging and Appending Queries
- Combine data from multiple sources
- Merge: Join tables horizontally
- Append: Stack tables vertically

## Practical Exercise

Clean a messy sales dataset:
1. Import data from multiple sources
2. Standardize date formats
3. Remove duplicates and errors
4. Unpivot monthly columns
5. Create a clean, analysis-ready dataset

## Summary & Next Steps

Power Query makes data cleaning efficient and repeatable. Master these techniques for professional data preparation.

**Next up**: Part 6 - Introduction to Power Pivot and data modeling.`,
            readTime: 22,
            publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Power Query', 'Data Cleaning', 'Data Transformation', 'Automation']
          },
          {
            id: 'excel-part-6',
            partNumber: 6,
            title: 'Introduction to Power Pivot and Data Modeling',
            summary: 'Learn to build data models and relationships using Power Pivot for advanced analysis.',
            content: `# Part 6: Introduction to Power Pivot and Data Modeling

Power Pivot extends Excel's capabilities with advanced data modeling and analysis features.

## Understanding the Data Model

### What is Power Pivot?
- In-memory data processing engine
- Handles millions of rows efficiently
- Creates relationships between tables
- Enables advanced calculations with DAX

### Enabling Power Pivot
1. File → Options → Add-ins
2. Manage: COM Add-ins → Go
3. Check Microsoft Power Pivot for Excel

## Creating Relationships

### Building Your First Data Model
1. Import data into Power Pivot
2. Create relationships between tables
3. Define hierarchies
4. Build calculated columns

### Relationship Types
- **One-to-Many**: Most common relationship
- **Many-to-Many**: Requires bridge tables
- **One-to-One**: Rare, usually indicates design issues

## Calculated Columns vs Measures

### Calculated Columns
- Computed for each row
- Stored in the data model
- Use for filtering and grouping

### Measures
- Computed at query time
- Dynamic calculations
- Use for aggregations

## Practical Exercise

Build a sales data model:
1. Import customer, product, and sales tables
2. Create relationships between tables
3. Add calculated columns for profit margins
4. Create measures for total sales and growth rates

## Summary & Next Steps

Data modeling is the foundation of advanced Excel analysis. Master these concepts for professional-level work.

**Next up**: Part 7 - Introduction to DAX formulas for advanced calculations.`,
            readTime: 25,
            publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Power Pivot', 'Data Modeling', 'Relationships', 'Calculated Columns']
          },
          {
            id: 'excel-part-7',
            partNumber: 7,
            title: 'Introduction to DAX Formulas',
            summary: 'Master DAX (Data Analysis Expressions) for powerful calculations and business intelligence.',
            content: `# Part 7: Introduction to DAX Formulas

DAX is the formula language of Power Pivot and Power BI. Learn to create powerful calculations.

## DAX Fundamentals

### What is DAX?
- Formula language for data analysis
- Similar to Excel formulas but more powerful
- Works with tables and relationships
- Context-aware calculations

### Basic DAX Syntax
\`\`\`
Measure Name = DAX Formula
\`\`\`

## Essential DAX Functions

### Aggregation Functions
- **SUM**: Sum of values
- **AVERAGE**: Average of values
- **COUNT**: Count of rows
- **COUNTROWS**: Count of rows in a table

### Filter Functions
- **FILTER**: Filter a table
- **CALCULATE**: Modify filter context
- **ALL**: Remove filters
- **VALUES**: Return unique values

### Time Intelligence Functions
- **TOTALYTD**: Year-to-date totals
- **SAMEPERIODLASTYEAR**: Compare to previous year
- **DATEADD**: Add/subtract time periods

## Creating Your First DAX Measures

### Basic Measures
\`\`\`
Total Sales = SUM(Sales[Amount])
Average Order = AVERAGE(Sales[Amount])
\`\`\`

### Advanced Measures
\`\`\`
Sales Growth = 
VAR CurrentYear = SUM(Sales[Amount])
VAR PreviousYear = CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(Sales[Date]))
RETURN DIVIDE(CurrentYear - PreviousYear, PreviousYear)
\`\`\`

## Practical Exercise

Create DAX measures for:
1. Total sales by region
2. Year-over-year growth
3. Running totals
4. Top 10 customers

## Summary & Next Steps

DAX opens up powerful analytical capabilities. Practice creating different types of measures.

**Next up**: Part 8 - What-If Analysis and scenario planning.`,
            readTime: 28,
            publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['DAX', 'Measures', 'Calculations', 'Time Intelligence']
          },
          {
            id: 'excel-part-8',
            partNumber: 8,
            title: 'What-If Analysis and Scenario Planning',
            summary: 'Master Excel\'s What-If Analysis tools for scenario planning and sensitivity analysis.',
            content: `# Part 8: What-If Analysis and Scenario Planning

Excel's What-If Analysis tools help you explore different scenarios and make informed decisions.

## Goal Seek

### What is Goal Seek?
- Finds the input value needed to achieve a desired result
- Works backwards from your target
- Perfect for "what if" questions

### Using Goal Seek
1. Data → What-If Analysis → Goal Seek
2. Set cell: The cell with the formula
3. To value: Your target result
4. By changing cell: The input cell to adjust

### Practical Example
\`\`\`
Goal: Achieve $10,000 profit
Formula: Profit = Revenue - Costs
Question: What revenue do I need?
\`\`\`

## Scenario Manager

### Creating Scenarios
1. Data → What-If Analysis → Scenario Manager
2. Add scenarios (Best Case, Worst Case, Most Likely)
3. Define changing cells and values
4. Create scenario summary

### Scenario Types
- **Optimistic**: Best possible outcomes
- **Pessimistic**: Worst possible outcomes
- **Realistic**: Most likely outcomes

## Data Tables

### One-Variable Data Table
- Shows how changing one input affects results
- Useful for sensitivity analysis
- Create tables with different input values

### Two-Variable Data Table
- Shows how changing two inputs affects results
- More complex but more comprehensive
- Great for optimization problems

## Practical Exercise

Create a business planning model:
1. Set up revenue and cost formulas
2. Use Goal Seek to find break-even point
3. Create scenarios for different market conditions
4. Build data tables for sensitivity analysis
5. Create a summary dashboard

## Summary & Next Steps

What-If Analysis helps you make data-driven decisions. Practice with different business scenarios.

**Next up**: Part 9 - Automation with macros and VBA.`,
            readTime: 20,
            publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Goal Seek', 'Scenario Manager', 'Data Tables', 'What-If Analysis']
          },
          {
            id: 'excel-part-9',
            partNumber: 9,
            title: 'Automation with Macros and VBA',
            summary: 'Learn to automate repetitive tasks using Excel macros and VBA programming.',
            content: `# Part 9: Automation with Macros and VBA

Automation saves time and reduces errors. Learn to create powerful macros in Excel.

## Introduction to Macros

### What are Macros?
- Recorded sequences of actions
- Automate repetitive tasks
- Written in VBA (Visual Basic for Applications)
- Can be triggered by buttons or events

### Enabling Macros
1. File → Options → Trust Center
2. Trust Center Settings → Macro Settings
3. Enable all macros (for development)
4. Developer tab → Record Macro

## Recording Your First Macro

### Step-by-Step Process
1. Developer → Record Macro
2. Name your macro
3. Choose shortcut key (optional)
4. Perform your actions
5. Stop recording

### Macro Best Practices
- Use descriptive names
- Add comments
- Test thoroughly
- Save as macro-enabled workbook (.xlsm)

## Introduction to VBA

### VBA Editor
- Alt + F11 to open
- Project Explorer shows your workbooks
- Code window for writing VBA
- Immediate window for testing

### Basic VBA Concepts
\`\`\`vba
Sub MyFirstMacro()
    ' This is a comment
    Range("A1").Value = "Hello World"
    Range("A1").Font.Bold = True
End Sub
\`\`\`

## Essential VBA Techniques

### Working with Ranges
\`\`\`vba
' Select a range
Range("A1:C10").Select

' Set values
Range("A1").Value = 100

' Format cells
Range("A1:C10").Font.Bold = True
\`\`\`

### Loops and Conditions
\`\`\`vba
' For loop
For i = 1 To 10
    Range("A" & i).Value = i
Next i

' If statement
If Range("A1").Value > 100 Then
    Range("B1").Value = "High"
Else
    Range("B1").Value = "Low"
End If
\`\`\`

## Practical Exercise

Create a data processing macro:
1. Record a macro to format a data table
2. Modify the VBA code to make it more flexible
3. Add error handling
4. Create a button to run the macro
5. Test with different datasets

## Summary & Next Steps

Macros and VBA can dramatically improve your productivity. Start with simple recordings and gradually learn VBA.

**Next up**: Part 10 - Final project bringing everything together.`,
            readTime: 25,
            publishedAt: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Macros', 'VBA', 'Automation', 'Programming']
          },
          {
            id: 'excel-part-10',
            partNumber: 10,
            title: 'Final Project: Complete Data Analysis Dashboard',
            summary: 'Bring together all Excel skills to create a comprehensive business dashboard.',
            content: `# Part 10: Final Project: Complete Data Analysis Dashboard

Congratulations! You've learned all the essential Excel skills. Now let's create a masterpiece.

## Project Overview

### What We'll Build
- Complete business dashboard
- Multiple data sources
- Interactive visualizations
- Automated calculations
- Professional formatting

### Skills Demonstrated
- Data cleaning with Power Query
- Advanced formulas and functions
- Pivot tables and charts
- DAX measures
- VBA automation
- Dashboard design

## Step 1: Data Preparation

### Import Multiple Data Sources
1. Sales data from CSV
2. Customer data from database
3. Product information from Excel
4. Market data from web

### Clean and Transform Data
- Remove duplicates
- Standardize formats
- Create calculated columns
- Build relationships

## Step 2: Data Modeling

### Create Power Pivot Model
- Import all data sources
- Create relationships
- Add calculated columns
- Build DAX measures

### Key Measures to Create
\`\`\`
Total Sales = SUM(Sales[Amount])
Average Order = AVERAGE(Sales[Amount])
Growth Rate = DIVIDE([Current Period] - [Previous Period], [Previous Period])
\`\`\`

## Step 3: Visualization

### Dashboard Layout
1. **Header**: Company logo and title
2. **KPIs**: Key performance indicators
3. **Charts**: Sales trends, product performance
4. **Tables**: Detailed data views
5. **Filters**: Interactive controls

### Chart Types to Include
- Line chart for trends
- Bar chart for comparisons
- Pie chart for proportions
- Gauge charts for KPIs

## Step 4: Automation

### Create Macros
- Refresh data
- Export reports
- Format dashboard
- Send email notifications

### Add Interactive Elements
- Slicers for filtering
- Buttons for actions
- Dropdown lists
- Conditional formatting

## Step 5: Final Polish

### Professional Formatting
- Consistent color scheme
- Clear titles and labels
- Proper spacing
- Print-friendly layout

### Testing and Validation
- Test all calculations
- Verify data accuracy
- Check user experience
- Document the process

## Project Deliverables

### What to Submit
1. Complete Excel workbook
2. Documentation of the process
3. Screenshots of the dashboard
4. List of techniques used
5. Lessons learned

### Success Criteria
- All data sources integrated
- Calculations are accurate
- Dashboard is user-friendly
- Automation works properly
- Professional appearance

## Summary & Congratulations

You've completed the Ultimate Excel for Data Analysis series! You now have the skills to:
- Clean and transform any dataset
- Create powerful calculations
- Build interactive dashboards
- Automate repetitive tasks
- Present insights professionally

**Next Steps**: Practice with real-world data, explore advanced techniques, and consider Power BI for even more powerful analytics.

**Final Challenge**: Create your own dashboard using a dataset from your work or interests. Share your results and continue learning!`,
            readTime: 30,
            publishedAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Final Project', 'Dashboard', 'Complete Analysis', 'Portfolio']
          },
          {
            id: 'excel-part-11',
            partNumber: 11,
            title: 'Advanced Excel Functions and Formulas',
            summary: 'Master advanced Excel functions for complex data analysis and automation.',
            content: `# Part 11: Advanced Excel Functions and Formulas

Take your Excel skills to the next level with advanced functions and formula techniques.

## Array Formulas

### What are Array Formulas?
- **Definition**: Formulas that work with multiple values
- **Advantages**: Perform complex calculations in one formula
- **Syntax**: Use Ctrl+Shift+Enter (legacy) or automatic arrays

### Common Array Functions
\`\`\`
=SUM(IF(A1:A10>5, B1:B10, 0))
=MAX(IF(A1:A10="Product A", B1:B10))
=AVERAGE(IF(A1:A10<>"", B1:B10))
\`\`\`

## Lookup and Reference Functions

### Advanced VLOOKUP Techniques
- **Exact Match**: VLOOKUP with FALSE
- **Approximate Match**: VLOOKUP with TRUE
- **Multiple Criteria**: Using INDEX and MATCH
- **Error Handling**: IFERROR with VLOOKUP

### INDEX and MATCH
\`\`\`
=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))
=INDEX(A1:C10, MATCH("Product A", A1:A10, 0), 3)
\`\`\`

### XLOOKUP (Excel 365)
\`\`\`
=XLOOKUP(lookup_value, lookup_array, return_array)
=XLOOKUP("Product A", A1:A10, C1:C10)
\`\`\`

## Text Functions

### String Manipulation
- **LEFT, RIGHT, MID**: Extract parts of text
- **LEN**: Count characters
- **FIND, SEARCH**: Locate text within strings
- **SUBSTITUTE, REPLACE**: Replace text

### Advanced Text Functions
\`\`\`
=TRIM(CLEAN(A1))
=PROPER(A1)
=CONCATENATE(A1, " ", B1)
=TEXTJOIN(", ", TRUE, A1:A10)
\`\`\`

## Date and Time Functions

### Working with Dates
- **TODAY, NOW**: Current date and time
- **DATE, TIME**: Create date/time values
- **DATEDIF**: Calculate differences
- **EOMONTH**: End of month calculations

### Advanced Date Functions
\`\`\`
=NETWORKDAYS(start_date, end_date)
=WORKDAY(start_date, days)
=YEARFRAC(start_date, end_date)
\`\`\`

## Logical Functions

### Advanced IF Statements
- **Nested IF**: Multiple conditions
- **IF with AND/OR**: Complex logic
- **IFS**: Multiple conditions (Excel 365)
- **SWITCH**: Multiple values (Excel 365)

### Examples
\`\`\`
=IF(AND(A1>0, B1>0), "Both Positive", "Not Both Positive")
=IFS(A1>90, "A", A1>80, "B", A1>70, "C", TRUE, "F")
\`\`\`

## Statistical Functions

### Advanced Statistics
- **PERCENTILE**: Calculate percentiles
- **QUARTILE**: Calculate quartiles
- **CORREL**: Correlation coefficient
- **FORECAST**: Linear trend prediction

### Array Statistical Functions
\`\`\`
=STDEV.S(A1:A10)
=VAR.S(A1:A10)
=SKEW(A1:A10)
=KURT(A1:A10)
\`\`\`

## Practical Exercise

Create a comprehensive analysis workbook:
1. Use array formulas for complex calculations
2. Implement advanced lookup functions
3. Build dynamic text processing
4. Create date-based calculations
5. Apply statistical functions

## Summary & Next Steps

Advanced functions unlock Excel's full potential. Master these techniques for professional analysis.

**Next up**: Part 12 - Excel automation and productivity tips.`,
            readTime: 25,
            publishedAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Array Formulas', 'Advanced Functions', 'Lookup Functions', 'Text Functions']
          },
          {
            id: 'excel-part-12',
            partNumber: 12,
            title: 'Excel Automation and Productivity Tips',
            summary: 'Learn advanced automation techniques and productivity tips for Excel power users.',
            content: `# Part 12: Excel Automation and Productivity Tips

Become an Excel power user with advanced automation and productivity techniques.

## Advanced Automation

### Data Validation
- **Lists**: Dropdown menus
- **Custom Rules**: Complex validation
- **Error Messages**: User-friendly feedback
- **Input Messages**: Helpful hints

### Conditional Formatting
- **Color Scales**: Visual data representation
- **Icon Sets**: Symbol-based indicators
- **Data Bars**: In-cell bar charts
- **Custom Rules**: Advanced formatting logic

## Power Query Advanced Techniques

### Data Transformation
- **Merging Queries**: Combine multiple data sources
- **Appending Queries**: Stack datasets
- **Pivoting/Unpivoting**: Reshape data
- **Custom Columns**: Advanced calculations

### Query Optimization
- **Query Folding**: Push operations to source
- **Data Types**: Optimize memory usage
- **Query Dependencies**: Manage relationships
- **Performance Monitoring**: Track query speed

## Advanced Pivot Table Techniques

### Calculated Fields and Items
- **Calculated Fields**: Custom calculations
- **Calculated Items**: Custom groupings
- **Show Values As**: Percentage calculations
- **Running Totals**: Cumulative analysis

### Pivot Table Design
- **Custom Styles**: Professional formatting
- **Conditional Formatting**: Visual emphasis
- **Slicers**: Interactive filtering
- **Timeline**: Date-based filtering

## Excel Tables and Structured References

### Table Benefits
- **Automatic Expansion**: Dynamic ranges
- **Structured References**: Named ranges
- **Total Row**: Built-in calculations
- **Table Styles**: Professional formatting

### Advanced Table Features
\`\`\`
=SUM(Table1[Sales])
=AVERAGE(Table1[Sales])
=COUNT(Table1[Product])
\`\`\`

## Keyboard Shortcuts and Efficiency

### Essential Shortcuts
- **Ctrl+Shift+L**: Toggle filters
- **Ctrl+T**: Create table
- **Ctrl+Shift+Enter**: Array formula
- **F4**: Toggle absolute references

### Navigation Shortcuts
- **Ctrl+Arrow**: Jump to edge
- **Ctrl+Shift+Arrow**: Select to edge
- **Ctrl+Page Up/Down**: Switch sheets
- **Alt+Tab**: Switch applications

## Data Analysis Tools

### What-If Analysis
- **Goal Seek**: Find input for target
- **Data Tables**: Sensitivity analysis
- **Scenario Manager**: Multiple scenarios
- **Solver**: Optimization problems

### Analysis ToolPak
- **Histogram**: Distribution analysis
- **Regression**: Statistical modeling
- **Correlation**: Relationship analysis
- **Descriptive Statistics**: Summary statistics

## Collaboration and Sharing

### Workbook Protection
- **Sheet Protection**: Prevent changes
- **Workbook Protection**: Secure structure
- **Password Protection**: Access control
- **Digital Signatures**: Authenticity

### Sharing Best Practices
- **Version Control**: Track changes
- **Comments**: Collaborative feedback
- **Track Changes**: Monitor modifications
- **Shared Workbooks**: Real-time collaboration

## Practical Exercise

Create a professional dashboard:
1. Set up data validation and conditional formatting
2. Build automated data refresh with Power Query
3. Create interactive pivot tables with slicers
4. Implement keyboard shortcuts workflow
5. Add protection and sharing features

## Summary & Congratulations

You've mastered Excel! These advanced techniques will make you a true Excel power user.

**Final Challenge**: Apply all learned techniques to create a comprehensive business analysis workbook that demonstrates your Excel mastery.

**Next Steps**: Continue practicing with real-world data, explore Power BI for advanced analytics, and consider Excel certification programs.`,
            readTime: 28,
            publishedAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Automation', 'Productivity', 'Power Query', 'Advanced Techniques']
          }
          // Additional episodes would continue here...
        ]
      },
      'python': {
        id: 'python',
        title: 'Python for Data Analysis: From Zero to Hero',
        description: 'Master Python programming for data analysis with this comprehensive series covering pandas, numpy, matplotlib, and more.',
        totalEpisodes: 15,
        estimatedDuration: '12 weeks',
        difficulty: 'Beginner',
        category: 'python',
        prerequisites: ['Basic programming concepts', 'Python 3.x installed'],
        learningOutcomes: [
          'Master Python fundamentals for data analysis',
          'Work with pandas for data manipulation',
          'Create visualizations with matplotlib and seaborn',
          'Perform statistical analysis with scipy',
          'Build data analysis projects'
        ],
        episodes: [
          {
            id: 'python-part-1',
            partNumber: 1,
            title: 'Python Fundamentals for Data Analysis',
            summary: 'Set up your Python environment and learn the essential concepts for data analysis.',
            content: `# Part 1: Python Fundamentals for Data Analysis

Welcome to **Python for Data Analysis: From Zero to Hero**! This series will take you from Python beginner to data analysis expert.

## Setting Up Your Environment

### Installing Python and Essential Libraries
\`\`\`bash
pip install pandas numpy matplotlib seaborn jupyter
\`\`\`

### Jupyter Notebooks
Jupyter notebooks are essential for data analysis. They allow you to:
- Write and execute code interactively
- Include markdown documentation
- Visualize data inline
- Share your analysis easily

## Python Basics for Data Analysis

### Data Types
\`\`\`python
# Numbers
age = 25
salary = 50000.50

# Strings
name = "John Doe"

# Lists
scores = [85, 92, 78, 96]

# Dictionaries
employee = {
    'name': 'John',
    'age': 25,
    'department': 'IT'
}
\`\`\`

### Essential Libraries
\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
\`\`\`

## Your First Data Analysis

Let's start with a simple dataset and perform basic analysis:

\`\`\`python
# Create a simple dataset
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age': [25, 30, 35, 28],
    'Salary': [50000, 60000, 70000, 55000]
}

df = pd.DataFrame(data)
print(df.head())
\`\`\`

## Summary & Next Steps

We've covered Python basics and set up our environment. 

**Next up**: In Part 2, we'll dive deep into pandas - the most important library for data analysis in Python.`,
            readTime: 10,
            publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Python Basics', 'Environment Setup', 'Jupyter', 'Data Types']
          },
          {
            id: 'python-part-2',
            partNumber: 2,
            title: 'Mastering Pandas for Data Manipulation',
            summary: 'Learn pandas fundamentals for data loading, cleaning, and manipulation.',
            content: `# Part 2: Mastering Pandas for Data Manipulation

Pandas is the backbone of data analysis in Python. Master these essential techniques.

## Introduction to Pandas

### What is Pandas?
- Powerful data manipulation library
- Built on NumPy
- Handles structured data efficiently
- Essential for data analysis

### Key Data Structures
- **Series**: One-dimensional labeled array
- **DataFrame**: Two-dimensional labeled data structure

## Loading and Exploring Data

### Reading Data Files
\`\`\`python
import pandas as pd

# Read CSV files
df = pd.read_csv('data.csv')

# Read Excel files
df = pd.read_excel('data.xlsx')

# Read from database
df = pd.read_sql('SELECT * FROM table', connection)
\`\`\`

### Exploring Your Data
\`\`\`python
# Basic information
df.info()
df.describe()
df.head()
df.shape

# Data types
df.dtypes

# Missing values
df.isnull().sum()
\`\`\`

## Data Cleaning and Manipulation

### Handling Missing Data
\`\`\`python
# Drop missing values
df.dropna()

# Fill missing values
df.fillna(0)
df.fillna(df.mean())

# Forward fill
df.fillna(method='ffill')
\`\`\`

### Data Selection and Filtering
\`\`\`python
# Select columns
df['column_name']
df[['col1', 'col2']]

# Filter rows
df[df['age'] > 25]
df[(df['age'] > 25) & (df['city'] == 'New York')]

# Use query method
df.query('age > 25 and city == "New York"')
\`\`\`

## Practical Exercise

Load and clean a sales dataset:
1. Import the data
2. Explore the structure
3. Handle missing values
4. Filter for specific criteria
5. Create summary statistics

## Summary & Next Steps

Pandas is essential for data manipulation. Practice these techniques with real datasets.

**Next up**: Part 3 - Data visualization with matplotlib and seaborn.`,
            readTime: 18,
            publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Pandas', 'Data Manipulation', 'Data Cleaning', 'DataFrames']
          },
          {
            id: 'python-part-3',
            partNumber: 3,
            title: 'Data Visualization with Matplotlib and Seaborn',
            summary: 'Create compelling visualizations to communicate your data insights effectively.',
            content: `# Part 3: Data Visualization with Matplotlib and Seaborn

Visualization is crucial for understanding and communicating data insights.

## Introduction to Matplotlib

### Basic Plotting
\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# Create a simple line plot
x = np.linspace(0, 10, 100)
y = np.sin(x)
plt.plot(x, y)
plt.title('Sine Wave')
plt.xlabel('X values')
plt.ylabel('Y values')
plt.show()
\`\`\`

### Multiple Plots
\`\`\`python
# Subplots
fig, axes = plt.subplots(2, 2, figsize=(12, 8))
axes[0, 0].plot(x, y)
axes[0, 1].scatter(x, y)
axes[1, 0].bar(['A', 'B', 'C'], [1, 2, 3])
axes[1, 1].hist(np.random.normal(0, 1, 1000))
plt.tight_layout()
plt.show()
\`\`\`

## Introduction to Seaborn

### Statistical Visualizations
\`\`\`python
import seaborn as sns

# Set style
sns.set_style("whitegrid")

# Scatter plot with regression line
sns.scatterplot(data=df, x='x', y='y')
sns.regplot(data=df, x='x', y='y')

# Distribution plots
sns.histplot(data=df, x='column')
sns.boxplot(data=df, x='category', y='value')
\`\`\`

### Advanced Visualizations
\`\`\`python
# Heatmap
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')

# Pair plot
sns.pairplot(df, hue='category')

# Violin plot
sns.violinplot(data=df, x='category', y='value')
\`\`\`

## Practical Exercise

Create a comprehensive visualization dashboard:
1. Load your dataset
2. Create multiple chart types
3. Customize colors and styles
4. Add annotations and labels
5. Save high-quality images

## Summary & Next Steps

Visualization brings data to life. Practice creating different chart types for various data scenarios.

**Next up**: Part 4 - Statistical analysis with scipy and scikit-learn.`,
            readTime: 20,
            publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Matplotlib', 'Seaborn', 'Visualization', 'Charts']
          },
          {
            id: 'python-part-4',
            partNumber: 4,
            title: 'Statistical Analysis with NumPy and SciPy',
            summary: 'Master statistical analysis using NumPy and SciPy for data science applications.',
            content: `# Part 4: Statistical Analysis with NumPy and SciPy

Statistics is the foundation of data analysis. Learn to perform statistical analysis with Python.

## Introduction to NumPy

### What is NumPy?
- Fundamental package for scientific computing
- Provides N-dimensional arrays
- Fast mathematical operations
- Foundation for other libraries

### Creating Arrays
\`\`\`python
import numpy as np

# Create arrays
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.zeros((3, 4))
arr3 = np.ones((2, 3))
arr4 = np.random.randn(1000)  # Random normal distribution
\`\`\`

### Array Operations
\`\`\`python
# Mathematical operations
result = arr1 * 2
mean_val = np.mean(arr1)
std_val = np.std(arr1)

# Array indexing and slicing
first_three = arr1[:3]
last_two = arr1[-2:]
\`\`\`

## Statistical Functions

### Descriptive Statistics
\`\`\`python
# Basic statistics
data = np.random.normal(100, 15, 1000)

mean = np.mean(data)
median = np.median(data)
std = np.std(data)
var = np.var(data)

# Percentiles
q25 = np.percentile(data, 25)
q75 = np.percentile(data, 75)
\`\`\`

### Correlation and Covariance
\`\`\`python
# Correlation matrix
correlation = np.corrcoef(data1, data2)

# Covariance matrix
covariance = np.cov(data1, data2)
\`\`\`

## Introduction to SciPy

### Statistical Tests
\`\`\`python
from scipy import stats

# T-test
t_stat, p_value = stats.ttest_ind(group1, group2)

# Chi-square test
chi2, p_value = stats.chi2_contingency(contingency_table)

# ANOVA
f_stat, p_value = stats.f_oneway(group1, group2, group3)
\`\`\`

### Distribution Functions
\`\`\`python
# Generate random samples
normal_data = stats.norm.rvs(loc=0, scale=1, size=1000)
uniform_data = stats.uniform.rvs(loc=0, scale=1, size=1000)

# Probability density function
x = np.linspace(-3, 3, 100)
pdf = stats.norm.pdf(x, loc=0, scale=1)
\`\`\`

## Practical Exercise

Perform statistical analysis on a dataset:
1. Load and explore the data
2. Calculate descriptive statistics
3. Test for normality
4. Perform hypothesis tests
5. Create statistical visualizations

## Summary & Next Steps

Statistics provides the foundation for data analysis. Master these concepts for advanced analytics.

**Next up**: Part 5 - Machine learning with scikit-learn.`,
            readTime: 22,
            publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['NumPy', 'SciPy', 'Statistics', 'Statistical Tests']
          },
          {
            id: 'python-part-5',
            partNumber: 5,
            title: 'Machine Learning with Scikit-Learn',
            summary: 'Introduction to machine learning using scikit-learn for predictive modeling.',
            content: `# Part 5: Machine Learning with Scikit-Learn

Machine learning opens up powerful predictive capabilities. Learn the fundamentals with scikit-learn.

## Introduction to Machine Learning

### Types of Machine Learning
- **Supervised Learning**: Learn from labeled data
- **Unsupervised Learning**: Find patterns in unlabeled data
- **Reinforcement Learning**: Learn through interaction

### Common Algorithms
- Linear Regression
- Decision Trees
- Random Forest
- K-Means Clustering
- Neural Networks

## Data Preprocessing

### Handling Missing Data
\`\`\`python
from sklearn.impute import SimpleImputer

# Fill missing values
imputer = SimpleImputer(strategy='mean')
X_imputed = imputer.fit_transform(X)
\`\`\`

### Feature Scaling
\`\`\`python
from sklearn.preprocessing import StandardScaler

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
\`\`\`

### Encoding Categorical Variables
\`\`\`python
from sklearn.preprocessing import LabelEncoder, OneHotEncoder

# Label encoding
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# One-hot encoding
ohe = OneHotEncoder()
X_encoded = ohe.fit_transform(X_categorical)
\`\`\`

## Supervised Learning

### Linear Regression
\`\`\`python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)
\`\`\`

### Classification
\`\`\`python
from sklearn.ensemble import RandomForestClassifier

# Train classifier
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

# Predictions
y_pred = clf.predict(X_test)
\`\`\`

## Model Evaluation

### Regression Metrics
\`\`\`python
from sklearn.metrics import mean_squared_error, r2_score

mse = mean_squared_error(y_test, predictions)
r2 = r2_score(y_test, predictions)
\`\`\`

### Classification Metrics
\`\`\`python
from sklearn.metrics import accuracy_score, classification_report

accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)
\`\`\`

## Practical Exercise

Build a complete ML pipeline:
1. Load and explore the data
2. Preprocess the features
3. Split into train/test sets
4. Train multiple models
5. Evaluate and compare performance
6. Make predictions on new data

## Summary & Next Steps

Machine learning is a powerful tool for prediction and pattern recognition. Practice with different algorithms.

**Next up**: Part 6 - Data cleaning and preprocessing techniques.`,
            readTime: 25,
            publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Scikit-Learn', 'Machine Learning', 'Supervised Learning', 'Model Evaluation']
          },
          {
            id: 'python-part-6',
            partNumber: 6,
            title: 'Data Cleaning and Preprocessing',
            summary: 'Master data cleaning techniques and preprocessing for high-quality datasets.',
            content: `# Part 6: Data Cleaning and Preprocessing

Clean data is essential for accurate analysis. Learn comprehensive data cleaning techniques.

## Data Quality Issues

### Common Data Problems
- **Missing Values**: NULL, NaN, empty cells
- **Outliers**: Extreme values that skew analysis
- **Inconsistent Formats**: Mixed data types
- **Duplicates**: Repeated records
- **Incorrect Values**: Typos, invalid entries

### Data Quality Assessment
\`\`\`python
import pandas as pd
import numpy as np

# Check data quality
print(df.info())
print(df.describe())
print(df.isnull().sum())
print(df.duplicated().sum())
\`\`\`

## Handling Missing Data

### Detection Methods
\`\`\`python
# Check for missing values
missing_data = df.isnull()
missing_percentage = (df.isnull().sum() / len(df)) * 100

# Visualize missing data
import seaborn as sns
sns.heatmap(df.isnull(), cbar=True, yticklabels=False)
\`\`\`

### Treatment Strategies
\`\`\`python
# Drop missing values
df_clean = df.dropna()

# Fill missing values
df['column'].fillna(df['column'].mean(), inplace=True)
df['column'].fillna(df['column'].median(), inplace=True)
df['column'].fillna(df['column'].mode()[0], inplace=True)

# Forward/backward fill
df['column'].fillna(method='ffill', inplace=True)
df['column'].fillna(method='bfill', inplace=True)
\`\`\`

## Outlier Detection and Treatment

### Statistical Methods
\`\`\`python
# Z-score method
from scipy import stats
z_scores = np.abs(stats.zscore(df['column']))
outliers = df[z_scores > 3]

# IQR method
Q1 = df['column'].quantile(0.25)
Q3 = df['column'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
outliers = df[(df['column'] < lower_bound) | (df['column'] > upper_bound)]
\`\`\`

### Treatment Options
\`\`\`python
# Remove outliers
df_clean = df[(df['column'] >= lower_bound) & (df['column'] <= upper_bound)]

# Cap outliers
df['column'] = np.where(df['column'] > upper_bound, upper_bound, df['column'])
df['column'] = np.where(df['column'] < lower_bound, lower_bound, df['column'])

# Transform outliers
df['column_log'] = np.log1p(df['column'])
\`\`\`

## Data Type Conversion

### Converting Data Types
\`\`\`python
# Convert to numeric
df['column'] = pd.to_numeric(df['column'], errors='coerce')

# Convert to datetime
df['date_column'] = pd.to_datetime(df['date_column'])

# Convert to category
df['category_column'] = df['category_column'].astype('category')

# Convert to string
df['text_column'] = df['text_column'].astype(str)
\`\`\`

## String Data Cleaning

### Text Processing
\`\`\`python
# Remove whitespace
df['text'] = df['text'].str.strip()

# Convert to lowercase
df['text'] = df['text'].str.lower()

# Remove special characters
df['text'] = df['text'].str.replace('[^a-zA-Z0-9]', '', regex=True)

# Handle encoding issues
df['text'] = df['text'].str.encode('utf-8').str.decode('utf-8')
\`\`\`

## Duplicate Handling

### Finding and Removing Duplicates
\`\`\`python
# Check for duplicates
duplicates = df.duplicated()
print(f"Number of duplicates: {duplicates.sum()}")

# Remove duplicates
df_unique = df.drop_duplicates()

# Remove duplicates based on specific columns
df_unique = df.drop_duplicates(subset=['column1', 'column2'])
\`\`\`

## Data Validation

### Validation Rules
\`\`\`python
# Check data ranges
valid_age = (df['age'] >= 0) & (df['age'] <= 120)
valid_email = df['email'].str.contains('@', na=False)

# Check data consistency
consistent_data = df['start_date'] <= df['end_date']

# Apply validation
df_valid = df[valid_age & valid_email & consistent_data]
\`\`\`

## Practical Exercise

Clean a messy dataset:
1. Assess data quality issues
2. Handle missing values appropriately
3. Detect and treat outliers
4. Convert data types correctly
5. Clean text data
6. Remove duplicates
7. Validate data consistency

## Summary & Next Steps

Data cleaning is crucial for reliable analysis. Master these techniques for high-quality datasets.

**Next up**: Part 7 - Time series analysis and forecasting.`,
            readTime: 20,
            publishedAt: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Data Cleaning', 'Missing Data', 'Outliers', 'Data Validation']
          },
          {
            id: 'python-part-7',
            partNumber: 7,
            title: 'Time Series Analysis and Forecasting',
            summary: 'Master time series analysis techniques for temporal data and forecasting.',
            content: `# Part 7: Time Series Analysis and Forecasting

Time series analysis helps you understand patterns in temporal data and make predictions.

## Time Series Fundamentals

### What is Time Series Data?
- **Definition**: Data points collected over time
- **Characteristics**: Trend, seasonality, noise
- **Applications**: Sales forecasting, stock prices, weather prediction

### Components of Time Series
- **Trend**: Long-term direction
- **Seasonality**: Regular patterns
- **Cyclical**: Irregular patterns
- **Noise**: Random variation

## Working with Time Series in Pandas

### Creating Time Series
\`\`\`python
import pandas as pd
import numpy as np

# Create date range
dates = pd.date_range('2023-01-01', periods=365, freq='D')

# Create time series data
ts_data = pd.Series(np.random.randn(365), index=dates)

# Set datetime index
df['date'] = pd.to_datetime(df['date'])
df.set_index('date', inplace=True)
\`\`\`

### Time Series Operations
\`\`\`python
# Resampling
daily_data = df.resample('D').sum()
monthly_data = df.resample('M').mean()
yearly_data = df.resample('Y').sum()

# Rolling windows
rolling_mean = df['value'].rolling(window=7).mean()
rolling_std = df['value'].rolling(window=7).std()

# Shifting data
df['lag_1'] = df['value'].shift(1)
df['lead_1'] = df['value'].shift(-1)
\`\`\`

## Time Series Decomposition

### Seasonal Decomposition
\`\`\`python
from statsmodels.tsa.seasonal import seasonal_decompose

# Decompose time series
decomposition = seasonal_decompose(df['value'], model='additive')
trend = decomposition.trend
seasonal = decomposition.seasonal
residual = decomposition.resid

# Plot decomposition
decomposition.plot()
\`\`\`

### Stationarity Testing
\`\`\`python
from statsmodels.tsa.stattools import adfuller

# Augmented Dickey-Fuller test
result = adfuller(df['value'])
print(f'ADF Statistic: {result[0]}')
print(f'p-value: {result[1]}')
print(f'Critical Values: {result[4]}')
\`\`\`

## Time Series Forecasting

### ARIMA Model
\`\`\`python
from statsmodels.tsa.arima.model import ARIMA

# Fit ARIMA model
model = ARIMA(df['value'], order=(1, 1, 1))
fitted_model = model.fit()

# Make forecasts
forecast = fitted_model.forecast(steps=30)
confidence_intervals = fitted_model.get_forecast(steps=30).conf_int()
\`\`\`

### Exponential Smoothing
\`\`\`python
from statsmodels.tsa.holtwinters import ExponentialSmoothing

# Simple exponential smoothing
model = ExponentialSmoothing(df['value'], trend='add')
fitted_model = model.fit()

# Make forecasts
forecast = fitted_model.forecast(steps=30)
\`\`\`

## Advanced Time Series Models

### SARIMA (Seasonal ARIMA)
\`\`\`python
from statsmodels.tsa.statespace.sarimax import SARIMAX

# Fit SARIMA model
model = SARIMAX(df['value'], order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
fitted_model = model.fit()

# Make forecasts
forecast = fitted_model.forecast(steps=30)
\`\`\`

### Prophet (Facebook's Forecasting Tool)
\`\`\`python
from prophet import Prophet

# Prepare data for Prophet
df_prophet = df.reset_index()
df_prophet.columns = ['ds', 'y']

# Fit Prophet model
model = Prophet()
model.fit(df_prophet)

# Make forecasts
future = model.make_future_dataframe(periods=30)
forecast = model.predict(future)
\`\`\`

## Time Series Visualization

### Plotting Time Series
\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# Basic time series plot
plt.figure(figsize=(12, 6))
plt.plot(df.index, df['value'])
plt.title('Time Series Plot')
plt.xlabel('Date')
plt.ylabel('Value')
plt.show()

# Multiple time series
df[['series1', 'series2', 'series3']].plot(figsize=(12, 6))
\`\`\`

### Advanced Visualizations
\`\`\`python
# Seasonal plot
df['month'] = df.index.month
df['year'] = df.index.year
sns.lineplot(data=df, x='month', y='value', hue='year')

# Autocorrelation plot
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
plot_acf(df['value'])
plot_pacf(df['value'])
\`\`\`

## Model Evaluation

### Time Series Cross-Validation
\`\`\`python
from sklearn.metrics import mean_squared_error, mean_absolute_error

# Split data for validation
train_size = int(len(df) * 0.8)
train_data = df[:train_size]
test_data = df[train_size:]

# Evaluate model
predictions = model.forecast(len(test_data))
mse = mean_squared_error(test_data['value'], predictions)
mae = mean_absolute_error(test_data['value'], predictions)
\`\`\`

## Practical Exercise

Analyze and forecast time series data:
1. Load and explore time series data
2. Perform time series decomposition
3. Test for stationarity
4. Fit different forecasting models
5. Evaluate model performance
6. Make future predictions
7. Visualize results

## Summary & Next Steps

Time series analysis is powerful for understanding temporal patterns and making predictions.

**Next up**: Part 8 - Advanced data visualization techniques.`,
            readTime: 22,
            publishedAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Time Series', 'Forecasting', 'ARIMA', 'Prophet']
          },
          {
            id: 'python-part-8',
            partNumber: 8,
            title: 'Advanced Data Visualization',
            summary: 'Master advanced visualization techniques for compelling data storytelling.',
            content: `# Part 8: Advanced Data Visualization

Create compelling visualizations that tell powerful data stories and drive insights.

## Advanced Matplotlib Techniques

### Custom Styling and Themes
\`\`\`python
import matplotlib.pyplot as plt
import matplotlib.style as style

# Set style
plt.style.use('seaborn-v0_8')
style.use('ggplot')

# Custom styling
plt.rcParams['figure.figsize'] = (12, 8)
plt.rcParams['font.size'] = 12
plt.rcParams['axes.grid'] = True
\`\`\`

### Subplots and Layouts
\`\`\`python
# Create subplots
fig, axes = plt.subplots(2, 2, figsize=(15, 10))

# Plot on specific subplot
axes[0, 0].plot(x, y1)
axes[0, 1].scatter(x, y2)
axes[1, 0].bar(categories, values)
axes[1, 1].hist(data, bins=30)

# Adjust layout
plt.tight_layout()
plt.show()
\`\`\`

## Seaborn Advanced Features

### Statistical Plots
\`\`\`python
import seaborn as sns

# Regression plots
sns.regplot(x='x', y='y', data=df)
sns.lmplot(x='x', y='y', data=df, hue='category')

# Distribution plots
sns.distplot(df['column'])
sns.kdeplot(df['column'])
sns.violinplot(x='category', y='value', data=df)
\`\`\`

### Multi-dimensional Plots
\`\`\`python
# Pair plots
sns.pairplot(df, hue='category')

# Heatmaps
correlation_matrix = df.corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm')

# Clustermap
sns.clustermap(correlation_matrix, cmap='coolwarm')
\`\`\`

## Interactive Visualizations

### Plotly for Interactive Charts
\`\`\`python
import plotly.express as px
import plotly.graph_objects as go

# Interactive scatter plot
fig = px.scatter(df, x='x', y='y', color='category', 
                 size='size', hover_data=['additional_info'])
fig.show()

# Interactive line chart
fig = go.Figure()
fig.add_trace(go.Scatter(x=df['date'], y=df['value'], 
                        mode='lines+markers', name='Series'))
fig.update_layout(title='Interactive Time Series')
fig.show()
\`\`\`

### Bokeh for Web-based Visualizations
\`\`\`python
from bokeh.plotting import figure, show
from bokeh.models import HoverTool

# Create interactive plot
p = figure(title='Interactive Plot', x_axis_label='X', y_axis_label='Y')
p.circle(x, y, size=10, color='blue', alpha=0.5)

# Add hover tool
hover = HoverTool(tooltips=[('X', '@x'), ('Y', '@y')])
p.add_tools(hover)

show(p)
\`\`\`

## Dashboard Creation

### Streamlit Dashboards
\`\`\`python
import streamlit as st
import pandas as pd
import plotly.express as px

st.title('Data Analysis Dashboard')

# Sidebar filters
category = st.sidebar.selectbox('Select Category', df['category'].unique())
date_range = st.sidebar.date_input('Select Date Range', value=[])

# Filter data
filtered_df = df[df['category'] == category]

# Display metrics
col1, col2, col3 = st.columns(3)
with col1:
    st.metric('Total Records', len(filtered_df))
with col2:
    st.metric('Average Value', filtered_df['value'].mean())
with col3:
    st.metric('Max Value', filtered_df['value'].max())

# Create charts
fig = px.line(filtered_df, x='date', y='value', title='Trend Analysis')
st.plotly_chart(fig)
\`\`\`

## Geographic Visualizations

### Plotting Geographic Data
\`\`\`python
import folium
import geopandas as gpd

# Create map
m = folium.Map(location=[40.7128, -74.0060], zoom_start=10)

# Add markers
for idx, row in df.iterrows():
    folium.Marker([row['lat'], row['lon']], 
                  popup=row['description']).add_to(m)

# Add choropleth
folium.Choropleth(
    geo_data=geo_data,
    data=df,
    columns=['region', 'value'],
    key_on='feature.properties.region',
    fill_color='YlOrRd',
    fill_opacity=0.7,
    line_opacity=0.2
).add_to(m)
\`\`\`

## Animation and Dynamic Plots

### Animated Visualizations
\`\`\`python
import matplotlib.animation as animation

# Create animated plot
fig, ax = plt.subplots()
line, = ax.plot([], [], 'b-')

def animate(frame):
    x = np.linspace(0, 2*np.pi, 100)
    y = np.sin(x + frame * 0.1)
    line.set_data(x, y)
    return line,

anim = animation.FuncAnimation(fig, animate, frames=100, 
                              interval=50, blit=True)
plt.show()
\`\`\`

## Visualization Best Practices

### Design Principles
- **Clarity**: Clear labels and titles
- **Consistency**: Consistent color schemes
- **Context**: Provide necessary background
- **Comparison**: Make comparisons easy
- **Color**: Use color meaningfully

### Accessibility
- **Color Blind Friendly**: Use patterns and shapes
- **High Contrast**: Ensure readability
- **Alt Text**: Provide descriptions
- **Font Size**: Use readable fonts

## Practical Exercise

Create a comprehensive visualization dashboard:
1. Design multiple chart types
2. Implement interactive features
3. Create a cohesive color scheme
4. Add proper labels and titles
5. Test accessibility features
6. Deploy as a web dashboard

## Summary & Next Steps

Advanced visualization skills help you communicate insights effectively. Practice with different chart types and tools.

**Next up**: Part 9 - Web scraping and API integration.`,
            readTime: 20,
            publishedAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Advanced Visualization', 'Interactive Charts', 'Dashboards', 'Plotly']
          },
          {
            id: 'python-part-9',
            partNumber: 9,
            title: 'Web Scraping and API Integration',
            summary: 'Learn to collect data from web sources and integrate with APIs for comprehensive datasets.',
            content: `# Part 9: Web Scraping and API Integration

Collect data from web sources and APIs to build comprehensive datasets for analysis.

## Web Scraping Fundamentals

### Understanding Web Structure
- **HTML**: Structure of web pages
- **CSS**: Styling and layout
- **JavaScript**: Dynamic content
- **HTTP**: Communication protocol

### Legal and Ethical Considerations
- **Robots.txt**: Check website policies
- **Rate Limiting**: Respect server resources
- **Terms of Service**: Follow website rules
- **Data Privacy**: Protect user information

## BeautifulSoup for HTML Parsing

### Basic HTML Parsing
\`\`\`python
import requests
from bs4 import BeautifulSoup

# Get webpage
url = 'https://example.com'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Find elements
title = soup.find('title').text
links = soup.find_all('a')
paragraphs = soup.find_all('p')
\`\`\`

### Advanced Parsing Techniques
\`\`\`python
# Find by attributes
divs = soup.find_all('div', class_='content')
images = soup.find_all('img', src=True)

# CSS selectors
titles = soup.select('h1.title')
prices = soup.select('.price')

# Navigate DOM
parent = element.parent
siblings = element.find_next_siblings()
children = element.find_all('div')
\`\`\`

## Selenium for Dynamic Content

### Setting Up Selenium
\`\`\`python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize driver
driver = webdriver.Chrome()
driver.get('https://example.com')

# Wait for elements
wait = WebDriverWait(driver, 10)
element = wait.until(EC.presence_of_element_located((By.ID, 'content')))
\`\`\`

### Interacting with Web Elements
\`\`\`python
# Click elements
button = driver.find_element(By.ID, 'submit')
button.click()

# Fill forms
input_field = driver.find_element(By.NAME, 'username')
input_field.send_keys('my_username')

# Handle dropdowns
from selenium.webdriver.support.ui import Select
dropdown = Select(driver.find_element(By.ID, 'country'))
dropdown.select_by_value('US')
\`\`\`

## API Integration

### REST API Basics
\`\`\`python
import requests
import json

# GET request
response = requests.get('https://api.example.com/data')
data = response.json()

# POST request
payload = {'key': 'value'}
response = requests.post('https://api.example.com/submit', 
                        json=payload)

# Headers and authentication
headers = {'Authorization': 'Bearer token'}
response = requests.get('https://api.example.com/protected', 
                       headers=headers)
\`\`\`

### Handling API Responses
\`\`\`python
# Check status
if response.status_code == 200:
    data = response.json()
else:
    print(f'Error: {response.status_code}')

# Handle pagination
def get_all_data(url):
    all_data = []
    page = 1
    
    while True:
        response = requests.get(f'{url}?page={page}')
        if response.status_code != 200:
            break
            
        page_data = response.json()
        if not page_data:
            break
            
        all_data.extend(page_data)
        page += 1
    
    return all_data
\`\`\`

## Data Collection Strategies

### Rate Limiting and Delays
\`\`\`python
import time
import random

# Fixed delay
time.sleep(1)

# Random delay
time.sleep(random.uniform(1, 3))

# Respectful scraping
def respectful_scrape(urls):
    for url in urls:
        response = requests.get(url)
        # Process response
        time.sleep(random.uniform(1, 2))
\`\`\`

### Error Handling
\`\`\`python
import requests
from requests.exceptions import RequestException

def safe_request(url, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response
        except RequestException as e:
            print(f'Attempt {attempt + 1} failed: {e}')
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                raise
\`\`\`

## Data Storage and Processing

### Saving Scraped Data
\`\`\`python
import pandas as pd
import json

# Save to CSV
df = pd.DataFrame(scraped_data)
df.to_csv('scraped_data.csv', index=False)

# Save to JSON
with open('scraped_data.json', 'w') as f:
    json.dump(scraped_data, f, indent=2)

# Save to database
import sqlite3
conn = sqlite3.connect('data.db')
df.to_sql('scraped_data', conn, if_exists='replace')
\`\`\`

## Popular APIs for Data Analysis

### Financial Data APIs
\`\`\`python
# Alpha Vantage
api_key = 'your_api_key'
url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey={api_key}'
response = requests.get(url)
stock_data = response.json()
\`\`\`

### Social Media APIs
\`\`\`python
# Twitter API (example)
import tweepy

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

tweets = api.search_tweets(q='data science', count=100)
\`\`\`

## Practical Exercise

Build a data collection pipeline:
1. Scrape data from a website
2. Integrate with a public API
3. Handle errors and rate limiting
4. Clean and structure the data
5. Save to multiple formats
6. Create a monitoring system

## Summary & Next Steps

Web scraping and API integration expand your data sources. Use these techniques responsibly and ethically.

**Next up**: Part 10 - Database integration and SQL with Python.`,
            readTime: 22,
            publishedAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Web Scraping', 'API Integration', 'BeautifulSoup', 'Selenium']
          },
          {
            id: 'python-part-10',
            partNumber: 10,
            title: 'Database Integration and SQL with Python',
            summary: 'Master database operations and SQL integration for efficient data management.',
            content: `# Part 10: Database Integration and SQL with Python

Integrate Python with databases for efficient data storage, retrieval, and analysis.

## Database Fundamentals

### Types of Databases
- **Relational**: SQL databases (MySQL, PostgreSQL)
- **NoSQL**: Document, key-value, graph databases
- **In-memory**: Redis, Memcached
- **Time-series**: InfluxDB, TimescaleDB

### Database Design Principles
- **Normalization**: Reduce data redundancy
- **Indexing**: Improve query performance
- **Relationships**: Foreign keys and constraints
- **ACID Properties**: Atomicity, Consistency, Isolation, Durability

## SQLite with Python

### Basic Operations
\`\`\`python
import sqlite3
import pandas as pd

# Connect to database
conn = sqlite3.connect('example.db')
cursor = conn.cursor()

# Create table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        age INTEGER
    )
''')

# Insert data
cursor.execute('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', 
               ('John Doe', 'john@example.com', 30))
conn.commit()
\`\`\`

### Querying Data
\`\`\`python
# Select data
cursor.execute('SELECT * FROM users WHERE age > 25')
results = cursor.fetchall()

# Using pandas
df = pd.read_sql_query('SELECT * FROM users', conn)

# Parameterized queries
cursor.execute('SELECT * FROM users WHERE name LIKE ?', ('%John%',))
\`\`\`

## PostgreSQL Integration

### Setting Up Connection
\`\`\`python
import psycopg2
from sqlalchemy import create_engine

# Direct connection
conn = psycopg2.connect(
    host='localhost',
    database='mydb',
    user='username',
    password='password'
)

# SQLAlchemy engine
engine = create_engine('postgresql://username:password@localhost/mydb')
\`\`\`

### Advanced Operations
\`\`\`python
# Bulk operations
df.to_sql('table_name', engine, if_exists='replace', index=False)

# Complex queries
query = '''
    SELECT u.name, COUNT(o.id) as order_count
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    GROUP BY u.id, u.name
    HAVING COUNT(o.id) > 5
'''
result_df = pd.read_sql_query(query, engine)
\`\`\`

## NoSQL Databases

### MongoDB Integration
\`\`\`python
from pymongo import MongoClient
import pandas as pd

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
collection = db['mycollection']

# Insert documents
document = {'name': 'John', 'age': 30, 'city': 'New York'}
collection.insert_one(document)

# Query documents
results = collection.find({'age': {'$gt': 25}})
df = pd.DataFrame(list(results))
\`\`\`

### Redis for Caching
\`\`\`python
import redis
import json

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

# Store data
r.set('user:1', json.dumps({'name': 'John', 'age': 30}))

# Retrieve data
user_data = json.loads(r.get('user:1'))
\`\`\`

## Data Pipeline with Databases

### ETL Process
\`\`\`python
def extract_data(source):
    # Extract from source
    return raw_data

def transform_data(raw_data):
    # Clean and transform
    return clean_data

def load_data(clean_data, target_db):
    # Load to target database
    clean_data.to_sql('target_table', target_db, 
                     if_exists='append', index=False)

# Complete ETL pipeline
raw_data = extract_data('source')
clean_data = transform_data(raw_data)
load_data(clean_data, engine)
\`\`\`

### Data Validation
\`\`\`python
def validate_data(df):
    # Check for required columns
    required_columns = ['id', 'name', 'email']
    missing_columns = set(required_columns) - set(df.columns)
    if missing_columns:
        raise ValueError(f'Missing columns: {missing_columns}')
    
    # Check for duplicates
    if df.duplicated().any():
        raise ValueError('Duplicate records found')
    
    # Check data types
    if not df['id'].dtype == 'int64':
        raise ValueError('ID column must be integer')
    
    return True
\`\`\`

## Performance Optimization

### Connection Pooling
\`\`\`python
from sqlalchemy.pool import QueuePool

engine = create_engine(
    'postgresql://user:pass@localhost/db',
    poolclass=QueuePool,
    pool_size=10,
    max_overflow=20
)
\`\`\`

### Query Optimization
\`\`\`python
# Use indexes
cursor.execute('CREATE INDEX idx_name ON users(name)')

# Batch operations
def batch_insert(data, batch_size=1000):
    for i in range(0, len(data), batch_size):
        batch = data[i:i + batch_size]
        df_batch = pd.DataFrame(batch)
        df_batch.to_sql('table', engine, if_exists='append', 
                       index=False, method='multi')
\`\`\`

## Data Security

### SQL Injection Prevention
\`\`\`python
# Bad - vulnerable to SQL injection
# cursor.execute(f"SELECT * FROM users WHERE name = '{user_input}'")

# Good - parameterized queries
cursor.execute("SELECT * FROM users WHERE name = ?", (user_input,))
\`\`\`

### Connection Security
\`\`\`python
import ssl

# Secure connection
conn = psycopg2.connect(
    host='localhost',
    database='mydb',
    user='username',
    password='password',
    sslmode='require'
)
\`\`\`

## Practical Exercise

Build a complete data management system:
1. Design a database schema
2. Create tables and relationships
3. Implement data insertion and updates
4. Build query functions
5. Add data validation
6. Implement caching
7. Test performance

## Summary & Next Steps

Database integration is essential for data management. Master these techniques for scalable data solutions.

**Next up**: Part 11 - Performance optimization and parallel processing.`,
            readTime: 20,
            publishedAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Database Integration', 'SQL', 'PostgreSQL', 'NoSQL']
          },
          {
            id: 'python-part-11',
            partNumber: 11,
            title: 'Performance Optimization and Parallel Processing',
            summary: 'Optimize Python code performance and implement parallel processing for large datasets.',
            content: `# Part 11: Performance Optimization and Parallel Processing

Optimize your Python code for better performance and handle large datasets efficiently.

## Performance Profiling

### Identifying Bottlenecks
\`\`\`python
import cProfile
import pstats
import time

# Profile function execution
def slow_function():
    result = []
    for i in range(1000000):
        result.append(i ** 2)
    return result

# Run profiler
profiler = cProfile.Profile()
profiler.enable()
slow_function()
profiler.disable()

# Analyze results
stats = pstats.Stats(profiler)
stats.sort_stats('cumulative')
stats.print_stats(10)
\`\`\`

### Memory Profiling
\`\`\`python
from memory_profiler import profile
import tracemalloc

# Memory profiler decorator
@profile
def memory_intensive_function():
    data = []
    for i in range(100000):
        data.append([i] * 1000)
    return data

# Track memory usage
tracemalloc.start()
data = memory_intensive_function()
current, peak = tracemalloc.get_traced_memory()
print(f"Current memory usage: {current / 1024 / 1024:.2f} MB")
print(f"Peak memory usage: {peak / 1024 / 1024:.2f} MB")
\`\`\`

## Vectorization with NumPy

### Avoiding Python Loops
\`\`\`python
import numpy as np

# Slow - Python loops
def slow_calculation(data):
    result = []
    for value in data:
        result.append(value ** 2 + 2 * value + 1)
    return result

# Fast - NumPy vectorization
def fast_calculation(data):
    return data ** 2 + 2 * data + 1

# Performance comparison
data = np.random.randn(1000000)
%timeit slow_calculation(data)
%timeit fast_calculation(data)
\`\`\`

### Advanced NumPy Operations
\`\`\`python
# Broadcasting
a = np.array([[1, 2, 3], [4, 5, 6]])
b = np.array([1, 2, 3])
result = a + b  # Broadcasting

# Advanced indexing
data = np.random.randn(1000, 1000)
mask = data > 0.5
filtered_data = data[mask]

# Universal functions
result = np.sqrt(np.sum(data ** 2, axis=1))
\`\`\`

## Pandas Optimization

### Efficient Data Operations
\`\`\`python
import pandas as pd

# Use appropriate data types
df['category'] = df['category'].astype('category')
df['date'] = pd.to_datetime(df['date'])

# Vectorized operations
df['new_column'] = df['col1'] * df['col2'] + df['col3']

# Avoid apply() when possible
# Slow
df['result'] = df.apply(lambda x: x['col1'] + x['col2'], axis=1)

# Fast
df['result'] = df['col1'] + df['col2']
\`\`\`

### Memory Optimization
\`\`\`python
# Reduce memory usage
def optimize_dtypes(df):
    for col in df.columns:
        if df[col].dtype == 'int64':
            if df[col].min() >= 0:
                if df[col].max() < 255:
                    df[col] = df[col].astype('uint8')
                elif df[col].max() < 65535:
                    df[col] = df[col].astype('uint16')
            else:
                if df[col].min() > -128 and df[col].max() < 127:
                    df[col] = df[col].astype('int8')
                elif df[col].min() > -32768 and df[col].max() < 32767:
                    df[col] = df[col].astype('int16')
        elif df[col].dtype == 'float64':
            df[col] = df[col].astype('float32')
    return df
\`\`\`

## Parallel Processing

### Multiprocessing
\`\`\`python
from multiprocessing import Pool, cpu_count
import time

def process_chunk(chunk):
    # Process a chunk of data
    return sum(x ** 2 for x in chunk)

def parallel_processing(data, chunk_size=1000):
    # Split data into chunks
    chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
    
    # Process in parallel
    with Pool(processes=cpu_count()) as pool:
        results = pool.map(process_chunk, chunks)
    
    return sum(results)

# Usage
data = list(range(1000000))
result = parallel_processing(data)
\`\`\`

### Threading for I/O Operations
\`\`\`python
import threading
import requests
from concurrent.futures import ThreadPoolExecutor

def fetch_url(url):
    response = requests.get(url)
    return response.json()

def parallel_requests(urls):
    with ThreadPoolExecutor(max_workers=10) as executor:
        results = list(executor.map(fetch_url, urls))
    return results
\`\`\`

## Dask for Large Datasets

### Dask DataFrames
\`\`\`python
import dask.dataframe as dd

# Read large CSV files
df = dd.read_csv('large_file.csv')

# Operations are lazy
result = df.groupby('category').sum()

# Compute when ready
final_result = result.compute()
\`\`\`

### Dask Arrays
\`\`\`python
import dask.array as da

# Create large arrays
large_array = da.random.random((10000, 10000), chunks=(1000, 1000))

# Operations are lazy
result = da.sum(large_array, axis=1)

# Compute when needed
final_result = result.compute()
\`\`\`

## Caching and Memoization

### Function Caching
\`\`\`python
from functools import lru_cache
import joblib

# LRU cache
@lru_cache(maxsize=128)
def expensive_function(n):
    # Expensive computation
    return sum(i ** 2 for i in range(n))

# Joblib caching
from joblib import Memory
memory = Memory('./cache')

@memory.cache
def expensive_computation(data):
    # Expensive computation
    return processed_data
\`\`\`

### Data Caching
\`\`\`python
import pickle
import os

def cache_data(data, filename):
    with open(filename, 'wb') as f:
        pickle.dump(data, f)

def load_cached_data(filename):
    if os.path.exists(filename):
        with open(filename, 'rb') as f:
            return pickle.load(f)
    return None
\`\`\`

## GPU Acceleration

### CuPy for GPU Computing
\`\`\`python
import cupy as cp

# Move data to GPU
gpu_array = cp.array(cpu_array)

# GPU operations
result = cp.sum(gpu_array ** 2)

# Move back to CPU
cpu_result = cp.asnumpy(result)
\`\`\`

### Numba for JIT Compilation
\`\`\`python
from numba import jit, cuda

@jit(nopython=True)
def fast_function(data):
    result = 0
    for i in range(len(data)):
        result += data[i] ** 2
    return result

# GPU version
@cuda.jit
def gpu_function(data, result):
    idx = cuda.grid(1)
    if idx < data.size:
        result[idx] = data[idx] ** 2
\`\`\`

## Practical Exercise

Optimize a data processing pipeline:
1. Profile the current implementation
2. Identify performance bottlenecks
3. Apply vectorization techniques
4. Implement parallel processing
5. Add caching mechanisms
6. Test performance improvements
7. Monitor memory usage

## Summary & Next Steps

Performance optimization is crucial for handling large datasets. Master these techniques for efficient data processing.

**Next up**: Part 12 - Final project: Complete data analysis pipeline.`,
            readTime: 25,
            publishedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Performance Optimization', 'Parallel Processing', 'NumPy', 'Dask']
          },
          {
            id: 'python-part-12',
            partNumber: 12,
            title: 'Final Project: Complete Data Analysis Pipeline',
            summary: 'Build a comprehensive data analysis pipeline using all learned Python techniques.',
            content: `# Part 12: Final Project: Complete Data Analysis Pipeline

Congratulations! You've learned all the essential Python data analysis skills. Now let's build a masterpiece.

## Project Overview

### What We'll Build
- Complete end-to-end data analysis pipeline
- Data collection from multiple sources
- Advanced data processing and analysis
- Interactive dashboard and reporting
- Automated workflow and deployment

### Skills Demonstrated
- Data collection and web scraping
- Data cleaning and preprocessing
- Statistical analysis and machine learning
- Advanced visualization and dashboards
- Performance optimization
- Database integration

## Step 1: Data Collection

### Multiple Data Sources
\`\`\`python
import requests
import pandas as pd
from bs4 import BeautifulSoup
import sqlite3

class DataCollector:
    def __init__(self):
        self.data_sources = []
    
    def collect_api_data(self, api_url, params=None):
        """Collect data from REST API"""
        response = requests.get(api_url, params=params)
        if response.status_code == 200:
            return response.json()
        return None
    
    def scrape_web_data(self, url, selectors):
        """Scrape data from web pages"""
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        data = []
        for selector in selectors:
            elements = soup.select(selector['css'])
            for element in elements:
                data.append({
                    'source': url,
                    'type': selector['type'],
                    'content': element.get_text().strip()
                })
        return data
    
    def collect_all_sources(self):
        """Collect from all configured sources"""
        all_data = []
        
        # API data
        api_data = self.collect_api_data('https://api.example.com/data')
        if api_data:
            all_data.extend(api_data)
        
        # Web scraping
        web_data = self.scrape_web_data('https://example.com', [
            {'css': '.news-item', 'type': 'news'},
            {'css': '.price', 'type': 'price'}
        ])
        all_data.extend(web_data)
        
        return all_data
\`\`\`

## Step 2: Data Processing Pipeline

### Advanced Data Processing
\`\`\`python
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

class DataProcessor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.imputer = SimpleImputer(strategy='mean')
    
    def clean_data(self, df):
        """Comprehensive data cleaning"""
        # Remove duplicates
        df = df.drop_duplicates()
        
        # Handle missing values
        numeric_columns = df.select_dtypes(include=[np.number]).columns
        df[numeric_columns] = self.imputer.fit_transform(df[numeric_columns])
        
        # Remove outliers
        for col in numeric_columns:
            Q1 = df[col].quantile(0.25)
            Q3 = df[col].quantile(0.75)
            IQR = Q3 - Q1
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            df = df[(df[col] >= lower_bound) & (df[col] <= upper_bound)]
        
        return df
    
    def feature_engineering(self, df):
        """Create new features"""
        # Date features
        if 'date' in df.columns:
            df['year'] = pd.to_datetime(df['date']).dt.year
            df['month'] = pd.to_datetime(df['date']).dt.month
            df['day_of_week'] = pd.to_datetime(df['date']).dt.dayofweek
        
        # Mathematical features
        numeric_columns = df.select_dtypes(include=[np.number]).columns
        for col in numeric_columns:
            df[f'{col}_log'] = np.log1p(df[col])
            df[f'{col}_sqrt'] = np.sqrt(df[col])
        
        return df
    
    def prepare_for_ml(self, df, target_column):
        """Prepare data for machine learning"""
        X = df.drop(columns=[target_column])
        y = df[target_column]
        
        # Encode categorical variables
        X = pd.get_dummies(X, drop_first=True)
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        return X_scaled, y
\`\`\`

## Step 3: Advanced Analytics

### Machine Learning Pipeline
\`\`\`python
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import joblib

class MLPipeline:
    def __init__(self):
        self.models = {
            'linear': LinearRegression(),
            'random_forest': RandomForestRegressor(n_estimators=100),
            'gradient_boosting': GradientBoostingRegressor(n_estimators=100)
        }
        self.best_model = None
    
    def train_models(self, X, y):
        """Train multiple models and select the best"""
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        results = {}
        for name, model in self.models.items():
            # Train model
            model.fit(X_train, y_train)
            
            # Make predictions
            y_pred = model.predict(X_test)
            
            # Evaluate
            mse = mean_squared_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)
            
            # Cross-validation
            cv_scores = cross_val_score(model, X, y, cv=5)
            
            results[name] = {
                'model': model,
                'mse': mse,
                'r2': r2,
                'cv_mean': cv_scores.mean(),
                'cv_std': cv_scores.std()
            }
        
        # Select best model
        best_name = max(results.keys(), key=lambda x: results[x]['r2'])
        self.best_model = results[best_name]['model']
        
        return results
    
    def save_model(self, filename):
        """Save the best model"""
        if self.best_model:
            joblib.dump(self.best_model, filename)
\`\`\`

## Step 4: Interactive Dashboard

### Streamlit Dashboard
\`\`\`python
import streamlit as st
import plotly.express as px
import plotly.graph_objects as go

class Dashboard:
    def __init__(self, data, model_results):
        self.data = data
        self.model_results = model_results
    
    def create_dashboard(self):
        """Create interactive dashboard"""
        st.set_page_config(page_title="Data Analysis Dashboard", layout="wide")
        
        # Sidebar
        st.sidebar.title("Filters")
        category = st.sidebar.selectbox("Category", self.data['category'].unique())
        
        # Main content
        st.title("Data Analysis Dashboard")
        
        # Metrics
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.metric("Total Records", len(self.data))
        with col2:
            st.metric("Average Value", self.data['value'].mean())
        with col3:
            st.metric("Best Model R²", f"{self.model_results['best_r2']:.3f}")
        with col4:
            st.metric("Prediction Accuracy", f"{self.model_results['accuracy']:.1%}")
        
        # Charts
        col1, col2 = st.columns(2)
        
        with col1:
            # Distribution plot
            fig = px.histogram(self.data, x='value', title='Value Distribution')
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            # Trend plot
            fig = px.line(self.data, x='date', y='value', title='Trend Analysis')
            st.plotly_chart(fig, use_container_width=True)
        
        # Model comparison
        st.subheader("Model Performance Comparison")
        model_df = pd.DataFrame([
            {'Model': name, 'R²': results['r2'], 'MSE': results['mse']}
            for name, results in self.model_results['all_results'].items()
        ])
        
        fig = px.bar(model_df, x='Model', y='R²', title='Model R² Comparison')
        st.plotly_chart(fig, use_container_width=True)
        
        # Predictions
        st.subheader("Make Predictions")
        feature_inputs = {}
        for col in self.data.select_dtypes(include=[np.number]).columns:
            if col != 'target':
                feature_inputs[col] = st.number_input(f"{col}", value=0.0)
        
        if st.button("Predict"):
            # Make prediction using best model
            prediction = self.model_results['best_model'].predict([list(feature_inputs.values())])
            st.success(f"Predicted Value: {prediction[0]:.2f}")
\`\`\`

## Step 5: Automation and Deployment

### Automated Pipeline
\`\`\`python
import schedule
import time
from datetime import datetime

class AutomatedPipeline:
    def __init__(self):
        self.collector = DataCollector()
        self.processor = DataProcessor()
        self.ml_pipeline = MLPipeline()
    
    def run_full_pipeline(self):
        """Run the complete analysis pipeline"""
        print(f"Starting pipeline at {datetime.now()}")
        
        # Collect data
        print("Collecting data...")
        raw_data = self.collector.collect_all_sources()
        
        # Process data
        print("Processing data...")
        df = pd.DataFrame(raw_data)
        clean_df = self.processor.clean_data(df)
        processed_df = self.processor.feature_engineering(clean_df)
        
        # Train models
        print("Training models...")
        X, y = self.processor.prepare_for_ml(processed_df, 'target')
        results = self.ml_pipeline.train_models(X, y)
        
        # Save results
        print("Saving results...")
        self.ml_pipeline.save_model('best_model.pkl')
        processed_df.to_csv('processed_data.csv', index=False)
        
        print(f"Pipeline completed at {datetime.now()}")
    
    def schedule_pipeline(self):
        """Schedule the pipeline to run automatically"""
        schedule.every().day.at("02:00").do(self.run_full_pipeline)
        
        while True:
            schedule.run_pending()
            time.sleep(60)

# Run the pipeline
if __name__ == "__main__":
    pipeline = AutomatedPipeline()
    pipeline.run_full_pipeline()
\`\`\`

## Project Deliverables

### What to Submit
1. Complete Python codebase
2. Data collection and processing scripts
3. Machine learning models
4. Interactive dashboard
5. Documentation and README
6. Performance benchmarks
7. Deployment instructions

### Success Criteria
- All data sources integrated
- Models achieve good performance
- Dashboard is interactive and informative
- Pipeline runs automatically
- Code is well-documented
- Performance is optimized

## Summary & Congratulations

You've completed the Python for Data Analysis series! You now have the skills to:
- Collect data from multiple sources
- Clean and process large datasets
- Build and evaluate machine learning models
- Create interactive visualizations
- Optimize performance for large-scale processing
- Deploy automated data pipelines

**Next Steps**: Apply these skills to real-world projects, contribute to open-source projects, and continue learning advanced techniques.

**Final Challenge**: Use this pipeline template to analyze a dataset from your domain of interest. Share your results and insights with the community!`,
            readTime: 30,
            publishedAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Final Project', 'Data Pipeline', 'Machine Learning', 'Dashboard']
          }
          // Additional episodes would continue here...
        ]
      },
      'powerbi': {
        id: 'powerbi',
        title: 'Power BI Mastery: From Beginner to Expert',
        description: 'Complete Power BI series covering data modeling, DAX, visualization, and advanced analytics.',
        totalEpisodes: 12,
        estimatedDuration: '12 weeks',
        difficulty: 'Beginner',
        category: 'powerbi',
        prerequisites: ['Basic Excel knowledge', 'Power BI Desktop installed'],
        learningOutcomes: [
          'Master Power BI Desktop interface',
          'Create powerful data models',
          'Write advanced DAX formulas',
          'Build interactive dashboards',
          'Deploy and share reports'
        ],
        episodes: [
          {
            id: 'powerbi-part-1',
            partNumber: 1,
            title: 'Getting Started with Power BI Desktop',
            summary: 'Learn the Power BI interface, data sources, and basic report creation.',
            content: `# Part 1: Getting Started with Power BI Desktop

Welcome to Power BI Mastery! This series will transform you into a Power BI expert.

## Power BI Desktop Interface

### Key Areas
- **Fields Panel**: Your data fields
- **Visualizations Panel**: Chart types and formatting
- **Filters Panel**: Apply filters to visuals
- **Report Canvas**: Where you build your report

### Data Sources
- Excel files
- CSV files
- SQL databases
- Web data
- APIs and services

## Your First Report

### Step-by-Step Process
1. Connect to data source
2. Transform and clean data
3. Create relationships
4. Build visualizations
5. Format and design

### Basic Visualizations
- Bar charts
- Line charts
- Tables
- Cards
- Maps

## Data Transformation

### Power Query Editor
- Clean messy data
- Remove duplicates
- Handle missing values
- Create calculated columns

### Best Practices
- Always clean data first
- Use descriptive column names
- Document your transformations
- Test with sample data

## Practical Exercise

Create your first Power BI report:
1. Import a sample dataset
2. Clean and transform the data
3. Create 3-4 basic visualizations
4. Apply basic formatting
5. Add filters

## Summary & Next Steps

You've created your first Power BI report! Practice with different data sources.

**Next up**: Part 2 - Data modeling and relationships.`,
            readTime: 15,
            publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Power BI Desktop', 'Data Sources', 'Basic Visualizations', 'Getting Started']
          },
          {
            id: 'powerbi-part-2',
            partNumber: 2,
            title: 'Data Modeling and Relationships',
            summary: 'Master data modeling in Power BI to create powerful analytical solutions.',
            content: `# Part 2: Data Modeling and Relationships

Data modeling is the foundation of effective Power BI reports. Learn to create robust data models.

## Understanding Data Models

### What is a Data Model?
- Collection of tables and relationships
- Foundation for all analysis
- Enables complex calculations
- Improves performance

### Star Schema Design
- **Fact Tables**: Contain measures and metrics
- **Dimension Tables**: Contain descriptive attributes
- **Relationships**: Connect facts to dimensions

## Creating Relationships

### Relationship Types
- **One-to-Many**: Most common relationship
- **Many-to-Many**: Requires bridge tables
- **One-to-One**: Rare, usually indicates design issues

### Best Practices
- Use unique keys for relationships
- Avoid circular relationships
- Keep relationships simple
- Document your model

## Data Types and Formatting

### Setting Data Types
- Right-click column → Change Type
- Choose appropriate data types
- Handle errors gracefully
- Use consistent formatting

### Date Tables
- Create dedicated date tables
- Include all necessary columns
- Mark as date table
- Use for time intelligence

## Calculated Columns vs Measures

### Calculated Columns
- Computed for each row
- Stored in the data model
- Use for filtering and grouping
- Created in Data view

### Measures
- Computed at query time
- Dynamic calculations
- Use for aggregations
- Created in Report view

## Practical Exercise

Build a sales data model:
1. Import sales and customer data
2. Create proper relationships
3. Add calculated columns
4. Create basic measures
5. Test the model

## Summary & Next Steps

A good data model is essential for effective analysis. Practice with different data structures.

**Next up**: Part 3 - Introduction to DAX formulas.`,
            readTime: 18,
            publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Data Modeling', 'Relationships', 'Star Schema', 'Calculated Columns']
          },
          {
            id: 'powerbi-part-3',
            partNumber: 3,
            title: 'Introduction to DAX Formulas',
            summary: 'Master DAX (Data Analysis Expressions) for powerful calculations in Power BI.',
            content: `# Part 3: Introduction to DAX Formulas

DAX is the formula language of Power BI. Learn to create powerful calculations and business logic.

## DAX Fundamentals

### What is DAX?
- Formula language for data analysis
- Similar to Excel formulas but more powerful
- Works with tables and relationships
- Context-aware calculations

### DAX Syntax
\`\`\`
Measure Name = DAX Formula
\`\`\`

### Key Concepts
- **Filter Context**: Current filters applied
- **Row Context**: Current row being evaluated
- **Context Transition**: Converting row to filter context

## Essential DAX Functions

### Aggregation Functions
- **SUM**: Sum of values
- **AVERAGE**: Average of values
- **COUNT**: Count of rows
- **COUNTROWS**: Count of rows in a table

### Filter Functions
- **FILTER**: Filter a table
- **CALCULATE**: Modify filter context
- **ALL**: Remove filters
- **VALUES**: Return unique values

### Logical Functions
- **IF**: Conditional logic
- **AND**: Logical AND
- **OR**: Logical OR
- **SWITCH**: Multiple conditions

## Creating Your First DAX Measures

### Basic Measures
\`\`\`
Total Sales = SUM(Sales[Amount])
Average Order = AVERAGE(Sales[Amount])
Order Count = COUNTROWS(Sales)
\`\`\`

### Advanced Measures
\`\`\`
Sales Growth = 
VAR CurrentYear = SUM(Sales[Amount])
VAR PreviousYear = CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(Sales[Date]))
RETURN DIVIDE(CurrentYear - PreviousYear, PreviousYear)
\`\`\`

## Time Intelligence Functions

### Common Time Functions
- **TOTALYTD**: Year-to-date totals
- **SAMEPERIODLASTYEAR**: Compare to previous year
- **DATEADD**: Add/subtract time periods
- **DATESBETWEEN**: Date range calculations

### Example Time Measures
\`\`\`
YTD Sales = TOTALYTD(SUM(Sales[Amount]), Sales[Date])
Previous Year Sales = CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(Sales[Date]))
\`\`\`

## Practical Exercise

Create DAX measures for:
1. Total sales by region
2. Year-over-year growth
3. Running totals
4. Top 10 customers
5. Market share calculations

## Summary & Next Steps

DAX opens up powerful analytical capabilities. Practice creating different types of measures.

**Next up**: Part 4 - Advanced visualizations and formatting.`,
            readTime: 22,
            publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['DAX', 'Measures', 'Time Intelligence', 'Calculations']
          },
          {
            id: 'powerbi-part-4',
            partNumber: 4,
            title: 'Advanced Visualizations and Formatting',
            summary: 'Create compelling visualizations and professional formatting for impactful reports.',
            content: `# Part 4: Advanced Visualizations and Formatting

Create stunning visualizations that tell compelling data stories and drive business decisions.

## Advanced Chart Types

### Custom Visuals
- **Waterfall Charts**: Show cumulative effects
- **Gauge Charts**: Display KPIs and metrics
- **Funnel Charts**: Show conversion processes
- **Treemap**: Hierarchical data visualization
- **Sankey Diagrams**: Flow relationships

### Chart Customization
\`\`\`
- Color schemes and themes
- Data labels and formatting
- Axis formatting and scaling
- Legend positioning
- Tooltip customization
\`\`\`

## Conditional Formatting

### Data Bars and Color Scales
- **Data Bars**: In-cell bar charts
- **Color Scales**: Heat map effects
- **Icon Sets**: Visual indicators
- **Custom Rules**: Advanced formatting logic

### Table and Matrix Formatting
\`\`\`
- Background colors
- Font formatting
- Border styles
- Row and column highlighting
- Alternating row colors
\`\`\`

## Interactive Features

### Slicers and Filters
- **Slicer Types**: List, dropdown, timeline
- **Cross-filtering**: Interactive relationships
- **Synchronized Slicers**: Multiple page filtering
- **Advanced Filtering**: Top N, relative date

### Bookmarks and Buttons
- **Bookmarks**: Save view states
- **Buttons**: Navigate between views
- **Action Buttons**: Custom interactions
- **Drill-through**: Detailed analysis

## Report Design Principles

### Layout and Structure
- **Grid System**: Consistent alignment
- **White Space**: Proper spacing
- **Visual Hierarchy**: Important elements first
- **Consistent Styling**: Unified appearance

### Color Theory
- **Brand Colors**: Company identity
- **Accessibility**: Color-blind friendly
- **Semantic Colors**: Meaningful color choices
- **Contrast**: Readability and clarity

## Advanced DAX for Visualizations

### Dynamic Measures
\`\`\`
Selected Measure = 
SWITCH(
    SELECTEDVALUE(MeasureSelector[Measure]),
    "Sales", [Total Sales],
    "Profit", [Total Profit],
    "Margin", [Profit Margin],
    [Total Sales]
)
\`\`\`

### Conditional Formatting with DAX
\`\`\`
Color Measure = 
IF([Sales] > [Target], "Green", 
   IF([Sales] > [Target] * 0.8, "Yellow", "Red"))
\`\`\`

## Performance Optimization

### Visual Performance
- **Data Reduction**: Limit data points
- **Aggregation**: Summarize large datasets
- **Caching**: Optimize data refresh
- **Query Optimization**: Efficient DAX

### Report Performance
- **Page Load Time**: Optimize visuals
- **Cross-filtering**: Efficient relationships
- **Large Datasets**: Best practices
- **Mobile Optimization**: Responsive design

## Mobile and Responsive Design

### Mobile Layouts
- **Phone Layout**: Optimized for mobile
- **Tablet Layout**: Medium screen optimization
- **Responsive Design**: Adaptive layouts
- **Touch Interactions**: Mobile-friendly controls

### Accessibility
- **Screen Readers**: Alt text and descriptions
- **Keyboard Navigation**: Tab order
- **High Contrast**: Visual accessibility
- **Font Sizing**: Readable text

## Practical Exercise

Create a professional dashboard:
1. Design a cohesive layout
2. Implement advanced visualizations
3. Add interactive features
4. Apply conditional formatting
5. Optimize for performance
6. Test on mobile devices
7. Ensure accessibility

## Summary & Next Steps

Advanced visualizations make your reports compelling and actionable. Master these techniques for professional dashboards.

**Next up**: Part 5 - Power Query advanced techniques and data transformation.`,
            readTime: 20,
            publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Advanced Visualizations', 'Conditional Formatting', 'Interactive Features', 'Report Design']
          },
          {
            id: 'powerbi-part-5',
            partNumber: 5,
            title: 'Power Query Advanced Techniques',
            summary: 'Master advanced Power Query techniques for complex data transformation and modeling.',
            content: `# Part 5: Power Query Advanced Techniques

Unlock the full power of Power Query for complex data transformation and modeling scenarios.

## Advanced Data Sources

### Multiple Data Sources
- **Database Connections**: SQL Server, Oracle, MySQL
- **Cloud Services**: Azure, AWS, Google Cloud
- **APIs and Web Services**: REST, SOAP endpoints
- **Files**: Excel, CSV, JSON, XML
- **Online Services**: SharePoint, Dynamics 365

### Data Source Management
\`\`\`
- Connection strings and authentication
- Data source credentials
- Gateway configuration
- Refresh scheduling
- Error handling and retry logic
\`\`\`

## Complex Data Transformations

### Advanced M Language
\`\`\`
// Custom functions
let
    CustomFunction = (input as text) as text =>
        Text.Upper(input),
    Result = CustomFunction("hello world")
in
    Result
\`\`\`

### Data Type Transformations
- **Text Functions**: Split, combine, format
- **Date Functions**: Parse, format, calculate
- **Number Functions**: Round, format, convert
- **Logical Functions**: IF, AND, OR conditions

## Merging and Appending Data

### Merge Operations
\`\`\`
- Inner Join: Matching records only
- Left Join: All records from left table
- Right Join: All records from right table
- Full Outer Join: All records from both tables
- Anti Join: Records not in both tables
\`\`\`

### Append Operations
- **Append Queries**: Combine similar tables
- **Union Operations**: Merge datasets
- **Data Consolidation**: Multiple sources
- **Schema Matching**: Handle different structures

## Advanced Filtering and Sorting

### Complex Filtering
\`\`\`
// Advanced filter conditions
Table.SelectRows(
    Source,
    each [Sales] > 1000 and [Region] = "North"
)
\`\`\`

### Dynamic Filtering
- **Parameter-based Filters**: User input
- **Date Range Filters**: Relative periods
- **Top N Filters**: Performance optimization
- **Custom Filter Logic**: Complex conditions

## Data Quality and Cleansing

### Error Handling
\`\`\`
// Handle errors gracefully
Table.ReplaceErrorValues(
    Source,
    {{"Sales", 0}, {"Region", "Unknown"}}
)
\`\`\`

### Data Validation
- **Data Type Validation**: Ensure correct types
- **Range Validation**: Check value ranges
- **Format Validation**: Verify patterns
- **Completeness Checks**: Missing value detection

## Performance Optimization

### Query Optimization
- **Query Folding**: Push operations to source
- **Data Reduction**: Filter early and often
- **Column Selection**: Remove unnecessary columns
- **Indexing**: Optimize data access

### Memory Management
- **Data Types**: Use appropriate types
- **Chunking**: Process large datasets
- **Caching**: Store intermediate results
- **Compression**: Reduce memory usage

## Custom Functions and Reusability

### Creating Custom Functions
\`\`\`
// Reusable data transformation function
let
    CleanText = (input as text) as text =>
        Text.Trim(Text.Clean(input)),
    Result = CleanText("  Hello World  ")
in
    Result
\`\`\`

### Function Libraries
- **Shared Functions**: Team-wide reuse
- **Parameter Functions**: Flexible operations
- **Error Handling**: Robust functions
- **Documentation**: Function descriptions

## Advanced Data Modeling

### Star Schema Implementation
- **Fact Tables**: Central metrics
- **Dimension Tables**: Descriptive attributes
- **Relationships**: Proper connections
- **Hierarchies**: Drill-down capabilities

### Data Lineage and Documentation
- **Query Dependencies**: Track relationships
- **Data Sources**: Document origins
- **Transformations**: Record changes
- **Business Logic**: Explain calculations

## Practical Exercise

Build a complex data transformation pipeline:
1. Connect to multiple data sources
2. Implement advanced transformations
3. Create custom functions
4. Handle data quality issues
5. Optimize query performance
6. Document the process
7. Test error scenarios

## Summary & Next Steps

Advanced Power Query techniques enable complex data scenarios. Master these skills for enterprise-level solutions.

**Next up**: Part 6 - Advanced DAX patterns and techniques.`,
            readTime: 22,
            publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Power Query', 'M Language', 'Data Transformation', 'Performance Optimization']
          },
          {
            id: 'powerbi-part-6',
            partNumber: 6,
            title: 'Advanced DAX Patterns and Techniques',
            summary: 'Master advanced DAX patterns for complex calculations and business intelligence.',
            content: `# Part 6: Advanced DAX Patterns and Techniques

Unlock the full power of DAX with advanced patterns and techniques for complex business scenarios.

## Advanced DAX Functions

### Time Intelligence Functions
\`\`\`
-- Year-to-date calculation
YTD Sales = TOTALYTD([Total Sales], 'Date'[Date])

-- Previous year comparison
PY Sales = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Date'[Date]))

-- Month-over-month growth
MoM Growth = 
VAR CurrentMonth = [Total Sales]
VAR PreviousMonth = CALCULATE([Total Sales], DATEADD('Date'[Date], -1, MONTH))
RETURN
    DIVIDE(CurrentMonth - PreviousMonth, PreviousMonth, 0)

-- Rolling 12-month average
Rolling 12M Avg = 
AVERAGEX(
    DATESINPERIOD('Date'[Date], LASTDATE('Date'[Date]), -12, MONTH),
    [Total Sales]
)
\`\`\`

### Advanced Filtering Functions
\`\`\`
-- Top N customers by sales
Top 5 Customers = 
CALCULATE(
    [Total Sales],
    TOPN(5, VALUES(Customer[CustomerID]), [Total Sales], DESC)
)

-- Sales for customers who bought last month
Active Customers Sales = 
CALCULATE(
    [Total Sales],
    FILTER(
        VALUES(Customer[CustomerID]),
        CALCULATE([Total Sales], DATEADD('Date'[Date], -1, MONTH)) > 0
    )
)

-- Sales excluding top 10% customers
Sales Excluding Top 10% = 
VAR Top10Percent = 
    TOPN(
        ROUNDUP(DISTINCTCOUNT(Customer[CustomerID]) * 0.1, 0),
        VALUES(Customer[CustomerID]),
        [Total Sales],
        DESC
    )
RETURN
    CALCULATE([Total Sales], EXCEPT(VALUES(Customer[CustomerID]), Top10Percent))
\`\`\`

## Advanced Calculation Patterns

### Running Totals and Cumulative Calculations
\`\`\`
-- Running total
Running Total = 
CALCULATE(
    [Total Sales],
    FILTER(
        ALL('Date'[Date]),
        'Date'[Date] <= MAX('Date'[Date])
    )
)

-- Cumulative percentage
Cumulative % = 
VAR RunningTotal = [Running Total]
VAR GrandTotal = CALCULATE([Total Sales], ALL('Date'[Date]))
RETURN
    DIVIDE(RunningTotal, GrandTotal, 0)

-- Moving average
Moving Average 7 Days = 
AVERAGEX(
    DATESINPERIOD('Date'[Date], MAX('Date'[Date]), -7, DAY),
    [Total Sales]
)
\`\`\`

### Advanced Ranking and Percentile Calculations
\`\`\`
-- Percentile ranking
Percentile Rank = 
VAR CurrentValue = [Total Sales]
VAR AllValues = VALUES(Customer[CustomerID])
VAR RankValue = 
    RANKX(AllValues, [Total Sales], CurrentValue, DESC)
VAR TotalCount = COUNTROWS(AllValues)
RETURN
    DIVIDE(RankValue - 1, TotalCount - 1, 0)

-- Quartile calculation
Quartile = 
VAR Percentile = [Percentile Rank]
RETURN
    SWITCH(
        TRUE(),
        Percentile <= 0.25, 1,
        Percentile <= 0.5, 2,
        Percentile <= 0.75, 3,
        4
    )
\`\`\`

## Dynamic Measures and Parameters

### Parameter-Driven Measures
\`\`\`
-- Dynamic date range measure
Sales in Period = 
VAR StartDate = [Start Date Parameter]
VAR EndDate = [End Date Parameter]
RETURN
    CALCULATE(
        [Total Sales],
        'Date'[Date] >= StartDate,
        'Date'[Date] <= EndDate
    )

-- Dynamic aggregation measure
Dynamic Aggregation = 
SWITCH(
    [Aggregation Type],
    "Sum", SUM(Sales[Amount]),
    "Average", AVERAGE(Sales[Amount]),
    "Count", COUNTROWS(Sales),
    "Min", MIN(Sales[Amount]),
    "Max", MAX(Sales[Amount])
)
\`\`\`

### Conditional Measures
\`\`\`
-- Conditional sales calculation
Conditional Sales = 
IF(
    [Total Sales] > [Sales Target],
    [Total Sales] * 1.1,  -- 10% bonus
    [Total Sales]
)

-- Multi-condition measure
Sales Category = 
SWITCH(
    TRUE(),
    [Total Sales] >= 100000, "High",
    [Total Sales] >= 50000, "Medium",
    [Total Sales] >= 10000, "Low",
    "Very Low"
)
\`\`\`

## Advanced Data Modeling with DAX

### Virtual Relationships
\`\`\`
-- Virtual relationship using TREATAS
Virtual Sales = 
CALCULATE(
    [Total Sales],
    TREATAS(
        VALUES(Product[Category]),
        'Sales'[ProductCategory]
    )
)

-- Cross-filtering with USERELATIONSHIP
Sales with Custom Relationship = 
CALCULATE(
    [Total Sales],
    USERELATIONSHIP('Date'[Date], 'Sales'[OrderDate])
)
\`\`\`

### Advanced Table Functions
\`\`\`
-- Create virtual table
Top Products Table = 
TOPN(
    10,
    SUMMARIZE(
        Sales,
        Product[ProductName],
        "Total Sales", [Total Sales]
    ),
    [Total Sales],
    DESC
)

-- Union tables
Combined Data = 
UNION(
    SELECTCOLUMNS(
        Sales,
        "Source", "Sales",
        "Amount", Sales[Amount],
        "Date", Sales[Date]
    ),
    SELECTCOLUMNS(
        Returns,
        "Source", "Returns",
        "Amount", Returns[Amount],
        "Date", Returns[Date]
    )
)
\`\`\`

## Performance Optimization

### Optimizing DAX Performance
\`\`\`
-- Use variables to avoid recalculation
Optimized Measure = 
VAR TotalSales = [Total Sales]
VAR TotalCosts = [Total Costs]
VAR Profit = TotalSales - TotalCosts
VAR Margin = DIVIDE(Profit, TotalSales, 0)
RETURN
    Margin

-- Use CALCULATE with specific filters
Efficient Filtering = 
CALCULATE(
    [Total Sales],
    'Date'[Year] = 2023,
    'Product'[Category] = "Electronics"
)

-- Avoid expensive functions in filters
Optimized TopN = 
CALCULATE(
    [Total Sales],
    TOPN(
        5,
        VALUES(Customer[CustomerID]),
        CALCULATE([Total Sales])
    )
)
\`\`\`

### Memory-Efficient Patterns
\`\`\`
-- Use SUMMARIZE for aggregations
Efficient Aggregation = 
SUMMARIZE(
    Sales,
    'Date'[Year],
    'Product'[Category],
    "Total Sales", SUM(Sales[Amount])
)

-- Use ADDCOLUMNS for calculated columns
Calculated Table = 
ADDCOLUMNS(
    VALUES(Customer[CustomerID]),
    "Total Sales", [Total Sales],
    "Customer Count", 1
)
\`\`\`

## Advanced Business Scenarios

### Cohort Analysis
\`\`\`
-- Customer cohort calculation
Cohort Month = 
VAR FirstPurchase = 
    CALCULATE(
        MIN('Date'[Date]),
        FILTER(
            ALL('Date'[Date]),
            [Total Sales] > 0
        )
    )
RETURN
    EOMONTH(FirstPurchase, 0)

-- Cohort retention
Cohort Retention = 
VAR CohortMonth = [Cohort Month]
VAR CurrentMonth = EOMONTH(MAX('Date'[Date]), 0)
VAR MonthsDiff = DATEDIFF(CohortMonth, CurrentMonth, MONTH)
VAR CohortCustomers = 
    CALCULATE(
        DISTINCTCOUNT(Customer[CustomerID]),
        'Date'[Date] = CohortMonth
    )
VAR ActiveCustomers = 
    CALCULATE(
        DISTINCTCOUNT(Customer[CustomerID]),
        'Date'[Date] = CurrentMonth
    )
RETURN
    DIVIDE(ActiveCustomers, CohortCustomers, 0)
\`\`\`

### Market Basket Analysis
\`\`\`
-- Product association
Product Association = 
VAR ProductA = [Selected Product A]
VAR ProductB = [Selected Product B]
VAR BothProducts = 
    CALCULATE(
        DISTINCTCOUNT(Sales[OrderID]),
        CONTAINSSTRING(Sales[Products], ProductA),
        CONTAINSSTRING(Sales[Products], ProductB)
    )
VAR ProductAOnly = 
    CALCULATE(
        DISTINCTCOUNT(Sales[OrderID]),
        CONTAINSSTRING(Sales[Products], ProductA)
    )
RETURN
    DIVIDE(BothProducts, ProductAOnly, 0)
\`\`\`

## Practical Exercise

Build advanced DAX solutions:
1. Create time intelligence measures
2. Implement dynamic calculations
3. Build performance-optimized measures
4. Develop complex business logic
5. Create virtual relationships
6. Optimize for large datasets
7. Test and validate results

## Summary & Next Steps

Advanced DAX patterns enable sophisticated business intelligence solutions. Master these techniques for complex analytical scenarios.

**Next up**: Part 7 - Power BI service and collaboration features.`,
            readTime: 25,
            publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Advanced DAX', 'Time Intelligence', 'Performance Optimization', 'Business Logic']
          },
          {
            id: 'powerbi-part-7',
            partNumber: 7,
            title: 'Power BI Service and Collaboration',
            summary: 'Master Power BI service features for team collaboration and enterprise deployment.',
            content: `# Part 7: Power BI Service and Collaboration

Learn to leverage Power BI service for team collaboration and enterprise-scale deployments.

## Power BI Service Overview

### What is Power BI Service?
- **Cloud Platform**: Web-based Power BI environment
- **Collaboration**: Share and collaborate on reports
- **Data Refresh**: Automatic data updates
- **Mobile Access**: Access reports on any device
- **Enterprise Features**: Security, governance, and administration

### Key Components
- **Workspaces**: Collaborative environments
- **Apps**: Packaged content collections
- **Gateways**: On-premises data connections
- **Dataflows**: Reusable data preparation
- **Datasets**: Shared data models

## Workspace Management

### Creating and Managing Workspaces
\`\`\`
Workspace Types:
1. Personal Workspace (My Workspace)
   - Individual use
   - Limited sharing options
   - Basic features

2. Workspace (Classic)
   - Team collaboration
   - Shared resources
   - Standard features

3. Workspace (New)
   - Enhanced collaboration
   - Advanced security
   - Premium features
\`\`\`

### Workspace Roles and Permissions
\`\`\`
Role Hierarchy:
1. Admin
   - Full control
   - Manage members
   - Configure settings
   - Delete workspace

2. Member
   - Add/edit content
   - Share reports
   - Manage datasets
   - Cannot delete workspace

3. Contributor
   - Add/edit content
   - Limited sharing
   - Cannot manage datasets

4. Viewer
   - View content only
   - No editing rights
   - Read-only access
\`\`\`

## Content Sharing and Distribution

### Sharing Reports
\`\`\`
Sharing Options:
1. Direct Sharing
   - Share with specific users
   - Set permissions
   - Control access levels

2. Publish to Web
   - Public access
   - Embed in websites
   - No authentication required

3. Organizational Content Pack
   - Share with organization
   - Include datasets and reports
   - Version control

4. Apps
   - Curated content
   - Professional distribution
   - Update management
\`\`\`

### Embedding Reports
\`\`\`
Embedding Methods:
1. Embed in SharePoint
   - Native integration
   - Single sign-on
   - Responsive design

2. Embed in Teams
   - Chat integration
   - Tab embedding
   - Real-time collaboration

3. Embed in Websites
   - Public embedding
   - Custom authentication
   - Responsive iframes

4. Embed in Applications
   - Power BI Embedded
   - Custom authentication
   - White-label solution
\`\`\`

## Data Refresh and Scheduling

### Configuring Data Refresh
\`\`\`
Refresh Options:
1. Manual Refresh
   - On-demand updates
   - Immediate results
   - User-initiated

2. Scheduled Refresh
   - Automatic updates
   - Configurable frequency
   - Background processing

3. Real-time Refresh
   - Live data connections
   - Streaming datasets
   - Instant updates
\`\`\`

### Gateway Configuration
\`\`\`
Gateway Types:
1. On-premises Data Gateway
   - Personal mode
   - Individual use
   - Basic features

2. On-premises Data Gateway (Standard)
   - Enterprise mode
   - Multiple users
   - Advanced features

3. Cloud Data Gateway
   - Cloud-to-cloud
   - No installation
   - Managed service
\`\`\`

## Security and Governance

### Row-Level Security (RLS)
\`\`\`
RLS Implementation:
1. Define Security Roles
   - Create roles in Power BI Desktop
   - Define DAX filters
   - Test with different users

2. Assign Users to Roles
   - Add users in Power BI Service
   - Assign appropriate roles
   - Test access levels

3. Test and Validate
   - Use "View as" feature
   - Verify data filtering
   - Document security model
\`\`\`

### Data Classification and Sensitivity Labels
\`\`\`
Classification Levels:
1. Public
   - No restrictions
   - Can be shared widely
   - No sensitive data

2. Internal
   - Organization use
   - Limited external sharing
   - Business data

3. Confidential
   - Restricted access
   - Specific users only
   - Sensitive information

4. Highly Confidential
   - Strict controls
   - Audit requirements
   - Critical data
\`\`\`

## Mobile and Offline Access

### Power BI Mobile Apps
\`\`\`
Mobile Features:
1. Cross-Platform Support
   - iOS, Android, Windows
   - Native apps
   - Responsive design

2. Offline Access
   - Download reports
   - View without internet
   - Sync when online

3. Mobile-Optimized Views
   - Phone layouts
   - Touch interactions
   - Optimized performance
\`\`\`

### Mobile Report Optimization
\`\`\`
Best Practices:
1. Design for Mobile
   - Use phone layouts
   - Optimize visuals
   - Simplify navigation

2. Performance Optimization
   - Limit data volume
   - Use efficient visuals
   - Optimize queries

3. User Experience
   - Intuitive navigation
   - Clear labeling
   - Responsive design
\`\`\`

## Advanced Collaboration Features

### Comments and Annotations
\`\`\`
Collaboration Tools:
1. Report Comments
   - Add comments to visuals
   - Tag team members
   - Thread discussions

2. Annotations
   - Highlight insights
   - Add context
   - Share findings

3. Subscriptions
   - Email notifications
   - Scheduled reports
   - Automated distribution
\`\`\`

### Version Control and History
\`\`\`
Version Management:
1. Report History
   - Track changes
   - View previous versions
   - Restore if needed

2. Dataset History
   - Monitor updates
   - Track refresh history
   - Identify issues

3. Workspace History
   - Audit trail
   - User activities
   - Compliance reporting
\`\`\`

## Enterprise Deployment

### Power BI Premium
\`\`\`
Premium Features:
1. Dedicated Capacity
   - Isolated resources
   - Predictable performance
   - Advanced features

2. Advanced Analytics
   - AI capabilities
   - Advanced dataflows
   - Paginated reports

3. Enterprise Security
   - Advanced RLS
   - Azure AD integration
   - Compliance features
\`\`\`

### Deployment Pipelines
\`\`\`
Pipeline Stages:
1. Development
   - Create and test
   - Initial development
   - Team collaboration

2. Test
   - Quality assurance
   - User testing
   - Performance testing

3. Production
   - Live deployment
   - User access
   - Monitoring
\`\`\`

## Practical Exercise

Set up enterprise collaboration:
1. Create and configure workspaces
2. Set up security and permissions
3. Configure data refresh
4. Share and distribute content
5. Implement mobile access
6. Set up monitoring and governance
7. Test collaboration features

## Summary & Next Steps

Power BI service enables enterprise-scale collaboration and deployment. Master these features for team productivity.

**Next up**: Part 8 - Advanced data modeling and relationships.`,
            readTime: 22,
            publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Power BI Service', 'Collaboration', 'Security', 'Enterprise Deployment']
          },
          {
            id: 'powerbi-part-8',
            partNumber: 8,
            title: 'Advanced Data Modeling and Relationships',
            summary: 'Master advanced data modeling techniques for complex business scenarios.',
            content: `# Part 8: Advanced Data Modeling and Relationships

Build sophisticated data models that handle complex business relationships and scenarios.

## Star Schema Design

### Fact and Dimension Tables
\`\`\`
Star Schema Components:

1. Fact Tables
   - Central tables with measures
   - Foreign keys to dimensions
   - Numeric data (facts)
   - Examples: Sales, Orders, Transactions

2. Dimension Tables
   - Descriptive attributes
   - Primary keys
   - Text and categorical data
   - Examples: Customer, Product, Date, Geography

3. Relationships
   - One-to-many relationships
   - Fact table (many) to Dimension (one)
   - Proper cardinality
\`\`\`

### Designing Fact Tables
\`\`\`
Fact Table Best Practices:

1. Grain Definition
   - Define the level of detail
   - One row per business event
   - Consistent granularity

2. Measure Types
   - Additive: Sum across all dimensions
   - Semi-additive: Sum across some dimensions
   - Non-additive: Cannot be summed

3. Surrogate Keys
   - Use integer keys
   - Avoid business keys
   - Enable SCD (Slowly Changing Dimensions)
\`\`\`

## Snowflake Schema

### Normalized Dimensions
\`\`\`
Snowflake Schema Benefits:
1. Reduced Data Redundancy
   - Normalized structure
   - Smaller file sizes
   - Better maintenance

2. Hierarchical Relationships
   - Parent-child relationships
   - Drill-down capabilities
   - Flexible hierarchies

3. Complex Business Logic
   - Multiple levels of detail
   - Sophisticated relationships
   - Advanced analytics
\`\`\`

### Implementing Snowflake Schema
\`\`\`
Example: Product Hierarchy
Product Category (Level 1)
├── Product Subcategory (Level 2)
    ├── Product (Level 3)
        ├── Product Variant (Level 4)

Relationships:
- Product Category → Product Subcategory (1:Many)
- Product Subcategory → Product (1:Many)
- Product → Product Variant (1:Many)
\`\`\`

## Advanced Relationship Types

### Many-to-Many Relationships
\`\`\`
Bridge Table Approach:
1. Create Bridge Table
   - Junction table
   - Contains keys from both tables
   - May include additional attributes

2. Example: Customer-Product Many-to-Many
   Customer Table (CustomerID, CustomerName)
   Product Table (ProductID, ProductName)
   CustomerProduct Bridge (CustomerID, ProductID, Quantity)

3. DAX Measures
   Total Customers = DISTINCTCOUNT(CustomerProduct[CustomerID])
   Total Products = DISTINCTCOUNT(CustomerProduct[ProductID])
\`\`\`

### Cross-Filtering Relationships
\`\`\`
Cross-Filtering Options:
1. Both Directions
   - Filters flow both ways
   - Use with caution
   - Can cause ambiguity

2. Single Direction
   - Filters flow one way
   - Recommended approach
   - Clear filter context

3. None
   - No automatic filtering
   - Manual filter control
   - Advanced scenarios
\`\`\`

## Date and Time Modeling

### Date Dimension Design
\`\`\`
Date Dimension Attributes:
1. Basic Attributes
   - Date (Primary Key)
   - Year, Quarter, Month, Day
   - Day of Week, Day of Year

2. Business Attributes
   - Fiscal Year, Fiscal Quarter
   - Business Days, Holidays
   - Season, Period

3. Hierarchies
   - Year → Quarter → Month → Day
   - Fiscal Year → Fiscal Quarter → Month
   - Custom business hierarchies
\`\`\`

### Time Intelligence Functions
\`\`\`
Common Time Intelligence Patterns:
1. Period Comparisons
   - Year over Year
   - Month over Month
   - Quarter over Quarter

2. Running Calculations
   - Year to Date
   - Quarter to Date
   - Month to Date

3. Moving Averages
   - 12-month moving average
   - Rolling calculations
   - Trend analysis
\`\`\`

## Slowly Changing Dimensions (SCD)

### SCD Type 1: Overwrite
\`\`\`
SCD Type 1 Implementation:
1. Update Strategy
   - Overwrite existing values
   - No historical tracking
   - Simple implementation

2. Use Cases
   - Correcting errors
   - Non-critical attributes
   - Current state only

3. Example
   Customer Name: "John Smith" → "John A. Smith"
   (Previous name is lost)
\`\`\`

### SCD Type 2: Historical Tracking
\`\`\`
SCD Type 2 Implementation:
1. Update Strategy
   - Create new records
   - Maintain history
   - Effective date tracking

2. Additional Columns
   - Effective Date
   - Expiration Date
   - Current Flag
   - Surrogate Key

3. Example
   CustomerID | Name | EffectiveDate | ExpirationDate | Current
   1 | John Smith | 2023-01-01 | 2023-06-30 | N
   2 | John A. Smith | 2023-07-01 | 9999-12-31 | Y
\`\`\`

## Advanced Modeling Patterns

### Role-Playing Dimensions
\`\`\`
Multiple Date Roles:
1. Order Date
   - When order was placed
   - Sales analysis
   - Order trends

2. Ship Date
   - When order was shipped
   - Logistics analysis
   - Delivery performance

3. Delivery Date
   - When order was delivered
   - Customer satisfaction
   - Service level analysis
\`\`\`

### Junk Dimensions
\`\`\`
Junk Dimension Benefits:
1. Reduce Fact Table Size
   - Combine small dimensions
   - Reduce foreign keys
   - Improve performance

2. Common Attributes
   - Flags and indicators
   - Small categorical data
   - Boolean values

3. Example
   OrderJunk (JunkID, IsRush, IsInternational, PaymentMethod, OrderSource)
\`\`\`

## Data Quality and Validation

### Data Validation Rules
\`\`\`
Validation Strategies:
1. Referential Integrity
   - Foreign key constraints
   - Orphaned record detection
   - Data consistency checks

2. Business Rules
   - Valid value ranges
   - Required field validation
   - Format validation

3. Data Profiling
   - Completeness analysis
   - Uniqueness checks
   - Pattern recognition
\`\`\`

### Error Handling
\`\`\`
Error Handling Approaches:
1. Data Quality Views
   - Identify data issues
   - Monitor data quality
   - Report problems

2. Default Values
   - Handle missing data
   - Provide fallback values
   - Maintain data integrity

3. Data Lineage
   - Track data sources
   - Document transformations
   - Audit data flow
\`\`\`

## Performance Optimization

### Model Optimization Techniques
\`\`\`
Performance Best Practices:
1. Column Optimization
   - Use appropriate data types
   - Remove unnecessary columns
   - Optimize text columns

2. Relationship Optimization
   - Use integer keys
   - Avoid complex relationships
   - Optimize cardinality

3. Measure Optimization
   - Use variables in DAX
   - Avoid expensive functions
   - Cache intermediate results
\`\`\`

### Aggregation Tables
\`\`\`
Aggregation Strategy:
1. Pre-calculated Aggregations
   - Summary tables
   - Reduced data volume
   - Faster queries

2. Automatic Aggregations
   - Power BI Premium feature
   - Automatic optimization
   - Transparent to users

3. Manual Aggregations
   - Custom summary tables
   - Specific business needs
   - Full control
\`\`\`

## Practical Exercise

Build an advanced data model:
1. Design star schema
2. Implement relationships
3. Create date dimension
4. Handle SCD scenarios
5. Optimize for performance
6. Validate data quality
7. Test and document

## Summary & Next Steps

Advanced data modeling enables sophisticated business intelligence solutions. Master these techniques for complex scenarios.

**Next up**: Part 9 - Custom visuals and advanced formatting.`,
            readTime: 28,
            publishedAt: new Date(Date.now()).toISOString(),
            tags: ['Data Modeling', 'Star Schema', 'Relationships', 'SCD']
          },
          {
            id: 'powerbi-part-9',
            partNumber: 9,
            title: 'Custom Visuals and Advanced Formatting',
            summary: 'Create stunning reports with custom visuals and advanced formatting techniques.',
            content: `# Part 9: Custom Visuals and Advanced Formatting

Transform your Power BI reports with custom visuals and professional formatting techniques.

## Custom Visual Development

### Power BI Visual SDK
\`\`\`
Custom Visual Components:
1. Visual Class
   - Main visual logic
   - Data binding
   - Rendering logic

2. Capabilities
   - Data roles definition
   - Formatting options
   - Interaction settings

3. Settings
   - Property pane configuration
   - User customization options
   - Default values
\`\`\`

### Building Custom Visuals
\`\`\`
Development Process:
1. Setup Development Environment
   - Install Node.js and npm
   - Install Power BI Visual Tools
   - Create new visual project

2. Define Visual Structure
   - HTML template
   - CSS styling
   - TypeScript logic

3. Implement Data Binding
   - Data roles configuration
   - Data transformation
   - Visual rendering

4. Add Formatting Options
   - Property pane settings
   - User customization
   - Theme support
\`\`\`

## Advanced Formatting Techniques

### Conditional Formatting
\`\`\`
Conditional Formatting Options:
1. Data Bars
   - Visual data representation
   - Color-coded values
   - Proportional sizing

2. Color Scales
   - Gradient color mapping
   - Value-based coloring
   - Custom color schemes

3. Icon Sets
   - Symbol-based indicators
   - Status representation
   - Custom icon libraries

4. Field Formatting
   - Dynamic text formatting
   - Conditional visibility
   - Custom expressions
\`\`\`

### Advanced Visual Formatting
\`\`\`
Formatting Best Practices:
1. Color Schemes
   - Consistent color palette
   - Accessibility compliance
   - Brand alignment

2. Typography
   - Font selection
   - Size hierarchy
   - Readability optimization

3. Layout Design
   - Grid alignment
   - Spacing consistency
   - Visual hierarchy

4. Interactive Elements
   - Hover effects
   - Click interactions
   - Drill-through capabilities
\`\`\`

## Custom Visual Marketplace

### Popular Custom Visuals
\`\`\`
Essential Custom Visuals:
1. Advanced Analytics
   - Box and Whisker charts
   - Correlation matrices
   - Statistical charts

2. Geographic Visuals
   - Enhanced map visuals
   - Heat maps
   - Geographic analytics

3. Time Series
   - Advanced time charts
   - Seasonal decomposition
   - Forecasting visuals

4. Business Intelligence
   - KPI indicators
   - Gauge charts
   - Performance metrics
\`\`\`

### Installing and Managing Custom Visuals
\`\`\`
Visual Management:
1. Installation Process
   - Browse marketplace
   - Install visual
   - Configure permissions

2. Visual Configuration
   - Set up data roles
   - Configure formatting
   - Test functionality

3. Performance Optimization
   - Monitor performance
   - Optimize data usage
   - Update regularly
\`\`\`

## Advanced Report Design

### Report Layout Principles
\`\`\`
Design Principles:
1. Visual Hierarchy
   - Primary information first
   - Secondary details below
   - Clear information flow

2. White Space Usage
   - Adequate spacing
   - Visual breathing room
   - Clean appearance

3. Consistency
   - Uniform styling
   - Consistent interactions
   - Standardized elements

4. Accessibility
   - Color contrast compliance
   - Screen reader support
   - Keyboard navigation
\`\`\`

### Responsive Design
\`\`\`
Responsive Techniques:
1. Mobile Layouts
   - Phone-optimized views
   - Touch-friendly interactions
   - Simplified navigation

2. Tablet Optimization
   - Medium screen layouts
   - Balanced information
   - Touch and mouse support

3. Desktop Enhancement
   - Full feature utilization
   - Complex interactions
   - Detailed information
\`\`\`

## Advanced Interactions

### Cross-Filtering and Highlighting
\`\`\`
Interaction Types:
1. Cross-Filtering
   - Filter other visuals
   - Maintain context
   - Show relationships

2. Cross-Highlighting
   - Highlight related data
   - Show connections
   - Maintain focus

3. Drill-Through
   - Navigate to details
   - Context preservation
   - Return navigation
\`\`\`

### Bookmarks and Buttons
\`\`\`
Navigation Features:
1. Bookmarks
   - Save visual states
   - Quick navigation
   - Storytelling support

2. Action Buttons
   - Custom interactions
   - Navigation control
   - User guidance

3. Selection Panes
   - Visual organization
   - Layer management
   - Visibility control
\`\`\`

## Performance Optimization

### Visual Performance
\`\`\`
Performance Optimization:
1. Data Volume Management
   - Limit data points
   - Use aggregations
   - Optimize queries

2. Visual Complexity
   - Simplify visuals
   - Reduce calculations
   - Optimize rendering

3. Memory Management
   - Monitor memory usage
   - Optimize data types
   - Clean up resources
\`\`\`

### Report Performance
\`\`\`
Report Optimization:
1. Page Load Time
   - Minimize visuals per page
   - Optimize data refresh
   - Use efficient visuals

2. User Experience
   - Responsive interactions
   - Smooth animations
   - Fast navigation

3. Resource Usage
   - Monitor CPU usage
   - Optimize memory
   - Balance features
\`\`\`

## Advanced Analytics Integration

### R and Python Integration
\`\`\`
Advanced Analytics:
1. R Scripts
   - Statistical analysis
   - Advanced visualizations
   - Custom calculations

2. Python Scripts
   - Machine learning
   - Data processing
   - Custom analytics

3. Azure ML Integration
   - Cloud-based analytics
   - Scalable processing
   - Advanced algorithms
\`\`\`

### AI-Powered Features
\`\`\`
AI Capabilities:
1. Q&A Natural Language
   - Natural language queries
   - Automatic visual generation
   - Intelligent suggestions

2. Key Influencers
   - Identify key factors
   - Explain variations
   - Statistical significance

3. Decomposition Tree
   - Break down metrics
   - Identify contributors
   - Interactive analysis
\`\`\`

## Practical Exercise

Create a professional report:
1. Design report layout
2. Implement custom visuals
3. Apply advanced formatting
4. Set up interactions
5. Optimize performance
6. Test accessibility
7. Deploy and share

## Summary & Next Steps

Custom visuals and advanced formatting create compelling, professional reports. Master these techniques for impactful presentations.

**Next up**: Part 10 - Power BI Premium and advanced features.`,
            readTime: 24,
            publishedAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Custom Visuals', 'Advanced Formatting', 'Report Design', 'Performance Optimization']
          },
          {
            id: 'powerbi-part-10',
            partNumber: 10,
            title: 'Power BI Premium and Advanced Features',
            summary: 'Explore Power BI Premium capabilities and enterprise-level features.',
            content: `# Part 10: Power BI Premium and Advanced Features

Unlock enterprise-level capabilities with Power BI Premium and advanced features.

## Power BI Premium Overview

### What is Power BI Premium?
- **Dedicated Capacity**: Isolated compute resources
- **Advanced Features**: Premium-only capabilities
- **Enterprise Scale**: Large dataset support
- **Advanced Analytics**: AI and ML integration
- **Flexible Licensing**: Per-user or per-capacity

### Premium vs Pro Comparison
\`\`\`
Feature Comparison:
1. Dataset Size Limits
   - Pro: 1 GB per dataset
   - Premium: 100 GB per dataset

2. Refresh Frequency
   - Pro: 8 times per day
   - Premium: 48 times per day

3. Advanced Features
   - Pro: Basic features
   - Premium: Advanced analytics, paginated reports

4. Sharing Options
   - Pro: Limited sharing
   - Premium: Unlimited sharing with Premium users
\`\`\`

## Premium Capacity Management

### Capacity Planning
\`\`\`
Capacity Considerations:
1. Resource Requirements
   - CPU usage patterns
   - Memory consumption
   - Storage needs

2. User Load
   - Concurrent users
   - Peak usage times
   - Performance requirements

3. Dataset Complexity
   - Data volume
   - Calculation complexity
   - Refresh frequency
\`\`\`

### Capacity Monitoring
\`\`\`
Monitoring Metrics:
1. Performance Metrics
   - Query response times
   - Refresh durations
   - Resource utilization

2. Usage Analytics
   - User activity
   - Popular content
   - Performance bottlenecks

3. Capacity Health
   - Resource availability
   - Error rates
   - System status
\`\`\`

## Advanced Dataflows

### Dataflow Architecture
\`\`\`
Dataflow Components:
1. Data Sources
   - Multiple source types
   - Connection management
   - Authentication handling

2. Data Transformations
   - Power Query operations
   - Data cleansing
   - Business logic

3. Data Storage
   - Azure Data Lake
   - Optimized storage
   - Data lineage
\`\`\`

### Advanced Dataflow Features
\`\`\`
Premium Dataflow Features:
1. Computed Entities
   - Derived calculations
   - Performance optimization
   - Incremental refresh

2. Linked Entities
   - Reusable components
   - Data sharing
   - Consistency maintenance

3. Enhanced Refresh
   - Incremental refresh
   - Parallel processing
   - Error handling
\`\`\`

## Paginated Reports

### Report Builder
\`\`\`
Paginated Report Features:
1. Pixel-Perfect Layout
   - Precise positioning
   - Print-ready output
   - Professional formatting

2. Advanced Data Sources
   - SQL Server
   - Oracle
   - Custom data providers

3. Complex Layouts
   - Multi-page reports
   - Subreports
   - Dynamic content
\`\`\`

### Report Development
\`\`\`
Development Process:
1. Design Phase
   - Layout planning
   - Data source design
   - Parameter definition

2. Development Phase
   - Report creation
   - Data binding
   - Formatting application

3. Testing Phase
   - Data validation
   - Performance testing
   - User acceptance
\`\`\`

## AI and Machine Learning

### Automated Machine Learning
\`\`\`
AutoML Features:
1. Model Training
   - Automatic algorithm selection
   - Hyperparameter tuning
   - Model validation

2. Model Deployment
   - One-click deployment
   - API integration
   - Real-time scoring

3. Model Management
   - Version control
   - Performance monitoring
   - Retraining automation
\`\`\`

### Cognitive Services Integration
\`\`\`
AI Services:
1. Text Analytics
   - Sentiment analysis
   - Key phrase extraction
   - Language detection

2. Computer Vision
   - Image analysis
   - Object detection
   - Text recognition

3. Anomaly Detection
   - Time series anomalies
   - Statistical analysis
   - Alert generation
\`\`\`

## Advanced Security

### Row-Level Security (RLS)
\`\`\`
Advanced RLS Features:
1. Dynamic RLS
   - User-based filtering
   - Role-based access
   - Context-aware security

2. Cross-Filtering
   - Related table filtering
   - Hierarchical security
   - Complex relationships

3. Performance Optimization
   - Efficient filtering
   - Cached results
   - Query optimization
\`\`\`

### Data Classification
\`\`\`
Classification Framework:
1. Sensitivity Labels
   - Data categorization
   - Access control
   - Compliance tracking

2. Information Protection
   - Encryption at rest
   - Encryption in transit
   - Key management

3. Audit and Compliance
   - Access logging
   - Data lineage
   - Compliance reporting
\`\`\`

## Performance Optimization

### Query Performance
\`\`\`
Optimization Techniques:
1. Aggregations
   - Pre-calculated summaries
   - Reduced data volume
   - Faster queries

2. Incremental Refresh
   - Partial data updates
   - Reduced refresh time
   - Resource efficiency

3. Query Caching
   - Result caching
   - Reduced computation
   - Improved response times
\`\`\`

### Memory Management
\`\`\`
Memory Optimization:
1. Data Compression
   - Columnar compression
   - Dictionary encoding
   - Reduced memory usage

2. Garbage Collection
   - Automatic cleanup
   - Memory optimization
   - Performance maintenance

3. Resource Monitoring
   - Memory usage tracking
   - Performance alerts
   - Capacity planning
\`\`\`

## Enterprise Deployment

### Deployment Pipelines
\`\`\`
Pipeline Configuration:
1. Development Environment
   - Initial development
   - Testing and validation
   - Team collaboration

2. Test Environment
   - User acceptance testing
   - Performance testing
   - Security validation

3. Production Environment
   - Live deployment
   - User access
   - Monitoring and maintenance
\`\`\`

### Governance and Compliance
\`\`\`
Governance Framework:
1. Data Governance
   - Data quality standards
   - Master data management
   - Data lineage tracking

2. Security Governance
   - Access control policies
   - Security monitoring
   - Incident response

3. Compliance Management
   - Regulatory compliance
   - Audit requirements
   - Documentation standards
\`\`\`

## Practical Exercise

Implement enterprise features:
1. Set up Premium capacity
2. Configure advanced dataflows
3. Create paginated reports
4. Implement AI features
5. Set up advanced security
6. Optimize performance
7. Deploy enterprise solution

## Summary & Next Steps

Power BI Premium provides enterprise-level capabilities for advanced analytics and large-scale deployments.

**Next up**: Part 11 - Integration with other Microsoft tools and services.`,
            readTime: 26,
            publishedAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Power BI Premium', 'Enterprise Features', 'Advanced Analytics', 'AI Integration']
          },
          {
            id: 'powerbi-part-11',
            partNumber: 11,
            title: 'Integration with Microsoft Ecosystem',
            summary: 'Master Power BI integration with Office 365, Azure, and other Microsoft services.',
            content: `# Part 11: Integration with Microsoft Ecosystem

Seamlessly integrate Power BI with the broader Microsoft ecosystem for enhanced productivity.

## Office 365 Integration

### Excel Integration
\`\`\`
Excel-Power BI Integration:
1. Analyze in Excel
   - Connect to Power BI datasets
   - Create Excel pivot tables
   - Maintain Excel functionality

2. Power BI Publisher for Excel
   - Publish Excel workbooks
   - Automatic refresh
   - Version control

3. Excel Data Types
   - Rich data types
   - Linked data sources
   - Automatic updates
\`\`\`

### PowerPoint Integration
\`\`\`
PowerPoint Features:
1. Live Data Embedding
   - Embed Power BI visuals
   - Automatic updates
   - Interactive presentations

2. Export to PowerPoint
   - One-click export
   - Maintain formatting
   - Update capabilities

3. Presentation Mode
   - Full-screen viewing
   - Navigation controls
   - Comment integration
\`\`\`

### Teams Integration
\`\`\`
Microsoft Teams Features:
1. Power BI App
   - Native Teams app
   - Tab embedding
   - Chat integration

2. Report Sharing
   - Direct sharing in Teams
   - Notification integration
   - Collaborative features

3. Meeting Integration
   - Present reports in meetings
   - Real-time collaboration
   - Screen sharing
\`\`\`

## Azure Integration

### Azure Data Services
\`\`\`
Azure Data Integration:
1. Azure SQL Database
   - Direct connections
   - Real-time data
   - Scalable storage

2. Azure Data Lake
   - Big data storage
   - Data lake analytics
   - Cost-effective scaling

3. Azure Synapse Analytics
   - Data warehouse integration
   - Advanced analytics
   - Machine learning
\`\`\`

### Azure Active Directory
\`\`\`
AAD Integration:
1. Single Sign-On (SSO)
   - Seamless authentication
   - Centralized identity
   - Security compliance

2. Role-Based Access Control
   - Azure AD groups
   - Dynamic membership
   - Conditional access

3. Multi-Factor Authentication
   - Enhanced security
   - Compliance requirements
   - Risk-based authentication
\`\`\`

## SharePoint Integration

### SharePoint Online
\`\`\`
SharePoint Features:
1. Web Part Integration
   - Embed Power BI reports
   - Responsive design
   - Mobile optimization

2. Document Libraries
   - Store Power BI files
   - Version control
   - Collaboration features

3. Lists and Libraries
   - Data source integration
   - Real-time updates
   - Workflow integration
\`\`\`

### SharePoint On-Premises
\`\`\`
On-Premises Integration:
1. Data Gateway
   - Secure connections
   - Hybrid scenarios
   - Data sovereignty

2. Custom Solutions
   - Custom web parts
   - API integration
   - Workflow automation

3. Security Integration
   - Windows authentication
   - Kerberos delegation
   - Network security
\`\`\`

## Dynamics 365 Integration

### CRM Integration
\`\`\`
Dynamics 365 Features:
1. Sales Analytics
   - Pipeline analysis
   - Performance metrics
   - Forecasting

2. Customer Insights
   - 360-degree view
   - Behavioral analysis
   - Personalization

3. Service Analytics
   - Case management
   - Performance tracking
   - Customer satisfaction
\`\`\`

### ERP Integration
\`\`\`
ERP Features:
1. Financial Analytics
   - Budget vs actual
   - Cash flow analysis
   - Financial reporting

2. Supply Chain Analytics
   - Inventory management
   - Supplier performance
   - Demand forecasting

3. HR Analytics
   - Employee performance
   - Workforce planning
   - Talent management
\`\`\`

## Power Platform Integration

### Power Apps Integration
\`\`\`
Power Apps Features:
1. Embedded Analytics
   - Power BI visuals in apps
   - Interactive dashboards
   - Mobile optimization

2. Data Integration
   - Shared data sources
   - Real-time updates
   - Consistent experience

3. Custom Solutions
   - Business process automation
   - Data collection
   - Workflow integration
\`\`\`

### Power Automate Integration
\`\`\`
Power Automate Features:
1. Automated Refresh
   - Scheduled data updates
   - Event-driven refresh
   - Error handling

2. Notification Workflows
   - Alert automation
   - Email notifications
   - Teams integration

3. Data Processing
   - ETL automation
   - Data validation
   - Quality checks
\`\`\`

## Advanced Integration Patterns

### API Integration
\`\`\`
API Development:
1. Power BI REST API
   - Programmatic access
   - Automation capabilities
   - Custom solutions

2. Embedding APIs
   - Custom applications
   - White-label solutions
   - Authentication handling

3. Webhook Integration
   - Real-time notifications
   - Event-driven updates
   - System integration
\`\`\`

### Custom Connectors
\`\`\`
Connector Development:
1. Data Source Connectors
   - Custom data sources
   - API integration
   - Authentication handling

2. Transformation Connectors
   - Custom transformations
   - Business logic
   - Data processing

3. Destination Connectors
   - Custom outputs
   - System integration
   - Data delivery
\`\`\`

## Security and Compliance

### Data Protection
\`\`\`
Protection Strategies:
1. Data Loss Prevention
   - Sensitive data detection
   - Policy enforcement
   - Compliance monitoring

2. Information Rights Management
   - Document protection
   - Access control
   - Usage tracking

3. Encryption
   - Data at rest
   - Data in transit
   - Key management
\`\`\`

### Compliance Features
\`\`\`
Compliance Capabilities:
1. Audit Logging
   - User activity tracking
   - Data access logging
   - Compliance reporting

2. Data Residency
   - Geographic restrictions
   - Data sovereignty
   - Regulatory compliance

3. Retention Policies
   - Data lifecycle management
   - Automatic deletion
   - Legal hold
\`\`\`

## Performance and Scalability

### Hybrid Scenarios
\`\`\`
Hybrid Architecture:
1. On-Premises Data
   - Data gateway
   - Secure connections
   - Hybrid analytics

2. Cloud Analytics
   - Scalable processing
   - Advanced features
   - Cost optimization

3. Edge Computing
   - Local processing
   - Reduced latency
   - Offline capabilities
\`\`\`

### Scalability Planning
\`\`\`
Scaling Strategies:
1. Horizontal Scaling
   - Multiple instances
   - Load balancing
   - High availability

2. Vertical Scaling
   - Resource upgrades
   - Performance optimization
   - Capacity planning

3. Auto-Scaling
   - Dynamic resource allocation
   - Cost optimization
   - Performance maintenance
\`\`\`

## Practical Exercise

Build integrated solution:
1. Set up Office 365 integration
2. Configure Azure services
3. Implement SharePoint integration
4. Connect Dynamics 365
5. Build Power Platform solution
6. Set up security and compliance
7. Test and optimize performance

## Summary & Next Steps

Microsoft ecosystem integration enables comprehensive business intelligence solutions. Master these integrations for enterprise success.

**Next up**: Part 12 - Best practices and final project.`,
            readTime: 25,
            publishedAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Microsoft Integration', 'Office 365', 'Azure', 'Power Platform']
          },
          {
            id: 'powerbi-part-12',
            partNumber: 12,
            title: 'Best Practices and Final Project',
            summary: 'Apply all learned concepts in a comprehensive final project with best practices.',
            content: `# Part 12: Best Practices and Final Project

Apply all your Power BI knowledge in a comprehensive final project following industry best practices.

## Power BI Best Practices

### Data Modeling Best Practices
\`\`\`
Modeling Guidelines:
1. Star Schema Design
   - Use proper fact and dimension tables
   - Implement surrogate keys
   - Optimize relationships

2. Performance Optimization
   - Use appropriate data types
   - Implement aggregations
   - Optimize DAX measures

3. Naming Conventions
   - Consistent naming standards
   - Clear and descriptive names
   - Avoid special characters
\`\`\`

### DAX Best Practices
\`\`\`
DAX Guidelines:
1. Measure Design
   - Use variables for complex calculations
   - Avoid expensive functions
   - Optimize for performance

2. Naming Conventions
   - Clear measure names
   - Consistent formatting
   - Descriptive descriptions

3. Error Handling
   - Use DIVIDE instead of division
   - Implement proper error handling
   - Test edge cases
\`\`\`

### Report Design Best Practices
\`\`\`
Design Principles:
1. Visual Hierarchy
   - Most important information first
   - Clear information flow
   - Consistent layout

2. Color and Formatting
   - Consistent color scheme
   - Accessibility compliance
   - Professional appearance

3. User Experience
   - Intuitive navigation
   - Responsive design
   - Mobile optimization
\`\`\`

## Final Project: Enterprise Sales Dashboard

### Project Overview
\`\`\`
Project Requirements:
1. Data Sources
   - Sales transactions
   - Customer information
   - Product catalog
   - Geographic data

2. Key Metrics
   - Sales performance
   - Customer analytics
   - Product performance
   - Geographic analysis

3. Deliverables
   - Complete data model
   - Interactive dashboard
   - Mobile-optimized views
   - Documentation
\`\`\`

### Phase 1: Data Preparation
\`\`\`
Data Preparation Steps:
1. Data Source Analysis
   - Identify data sources
   - Assess data quality
   - Plan data transformations

2. Power Query Development
   - Create dataflows
   - Implement transformations
   - Set up incremental refresh

3. Data Model Design
   - Design star schema
   - Create relationships
   - Implement hierarchies
\`\`\`

### Phase 2: DAX Development
\`\`\`
DAX Implementation:
1. Core Measures
   - Sales metrics
   - Customer metrics
   - Product metrics
   - Time intelligence

2. Advanced Calculations
   - Year-over-year comparisons
   - Running totals
   - Percentile rankings
   - Cohort analysis

3. Performance Optimization
   - Optimize complex measures
   - Implement variables
   - Test performance
\`\`\`

### Phase 3: Report Development
\`\`\`
Report Creation:
1. Dashboard Design
   - Executive summary page
   - Detailed analysis pages
   - Mobile layouts

2. Visual Selection
   - Choose appropriate visuals
   - Implement custom visuals
   - Optimize for performance

3. Interactivity
   - Set up cross-filtering
   - Implement drill-through
   - Create bookmarks
\`\`\`

### Phase 4: Advanced Features
\`\`\`
Advanced Implementation:
1. Security Implementation
   - Set up row-level security
   - Configure user roles
   - Test security model

2. AI Features
   - Implement Q&A
   - Add key influencers
   - Use decomposition tree

3. Integration
   - Set up data refresh
   - Configure sharing
   - Implement mobile access
\`\`\`

## Project Documentation

### Technical Documentation
\`\`\`
Documentation Requirements:
1. Data Model Documentation
   - Table descriptions
   - Relationship documentation
   - Measure definitions

2. Report Documentation
   - Page descriptions
   - Visual explanations
   - User instructions

3. Security Documentation
   - Role definitions
   - Access permissions
   - Security testing results
\`\`\`

### User Guide
\`\`\`
User Documentation:
1. Getting Started Guide
   - Access instructions
   - Navigation guide
   - Basic functionality

2. Feature Guide
   - Detailed feature explanations
   - Use cases
   - Best practices

3. Troubleshooting Guide
   - Common issues
   - Solutions
   - Support contacts
\`\`\`

## Testing and Validation

### Testing Strategy
\`\`\`
Testing Approach:
1. Data Validation
   - Accuracy testing
   - Completeness checks
   - Performance testing

2. User Acceptance Testing
   - Functionality testing
   - Usability testing
   - Performance validation

3. Security Testing
   - Access control testing
   - Data security validation
   - Compliance verification
\`\`\`

### Quality Assurance
\`\`\`
QA Process:
1. Code Review
   - DAX code review
   - Model optimization
   - Performance analysis

2. User Testing
   - Stakeholder feedback
   - Usability testing
   - Performance validation

3. Documentation Review
   - Technical accuracy
   - Completeness check
   - User-friendliness
\`\`\`

## Deployment and Maintenance

### Deployment Strategy
\`\`\`
Deployment Process:
1. Pre-deployment
   - Final testing
   - User training
   - Documentation review

2. Deployment
   - Production deployment
   - User access setup
   - Monitoring setup

3. Post-deployment
   - User support
   - Performance monitoring
   - Feedback collection
\`\`\`

### Maintenance Plan
\`\`\`
Maintenance Activities:
1. Regular Updates
   - Data refresh monitoring
   - Performance optimization
   - User feedback incorporation

2. Enhancement Planning
   - Feature requests
   - Performance improvements
   - New data sources

3. Support and Training
   - User support
   - Training updates
   - Best practice sharing
\`\`\`

## Career Development

### Power BI Certification
\`\`\`
Certification Paths:
1. Microsoft Certified: Data Analyst Associate
   - Power BI fundamentals
   - Data modeling
   - Report development

2. Microsoft Certified: Azure Data Engineer Associate
   - Data platform solutions
   - Data processing
   - Data security

3. Microsoft Certified: Azure AI Engineer Associate
   - AI solutions
   - Machine learning
   - Cognitive services
\`\`\`

### Continuous Learning
\`\`\`
Learning Resources:
1. Official Documentation
   - Microsoft Learn
   - Power BI documentation
   - Community resources

2. Community Engagement
   - Power BI community
   - User groups
   - Conferences and events

3. Hands-on Practice
   - Personal projects
   - Open datasets
   - Real-world scenarios
\`\`\`

## Final Project Checklist

### Project Completion Checklist
\`\`\`
Final Validation:
1. Data Model
   ✅ Star schema implemented
   ✅ Relationships optimized
   ✅ Measures tested
   ✅ Performance validated

2. Reports
   ✅ Dashboard completed
   ✅ Mobile layouts created
   ✅ Interactivity configured
   ✅ Security implemented

3. Documentation
   ✅ Technical documentation complete
   ✅ User guide created
   ✅ Testing results documented
   ✅ Deployment plan ready

4. Quality Assurance
   ✅ Code reviewed
   ✅ User testing completed
   ✅ Performance validated
   ✅ Security tested
\`\`\`

## Congratulations!

You've completed the comprehensive Power BI series! You now have the skills to:
- Design and implement enterprise data models
- Create compelling, interactive reports
- Optimize performance and security
- Integrate with Microsoft ecosystem
- Follow industry best practices

## Next Steps

Continue your Power BI journey:
1. Practice with real-world datasets
2. Explore advanced features
3. Join the Power BI community
4. Consider certification
5. Share your knowledge

## Summary

This series has covered everything from basic concepts to advanced enterprise features. You're now equipped to build professional Power BI solutions that drive business value.

**Keep learning, keep building, and keep innovating with Power BI!**`,
            readTime: 30,
            publishedAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Best Practices', 'Final Project', 'Enterprise Dashboard', 'Career Development']
          }
          // Additional episodes would continue here...
        ]
      },
      'sql-database': {
        id: 'sql-database',
        title: 'SQL Mastery: Database Management and Analysis',
        description: 'Complete SQL series from basics to advanced queries, database design, and optimization.',
        totalEpisodes: 14,
        estimatedDuration: '14 weeks',
        difficulty: 'Beginner',
        category: 'sql',
        prerequisites: ['Basic computer skills', 'Access to a database system'],
        learningOutcomes: [
          'Master SQL fundamentals',
          'Write complex queries',
          'Design efficient databases',
          'Optimize query performance',
          'Handle large datasets'
        ],
        episodes: [
          {
            id: 'sql-part-1',
            partNumber: 1,
            title: 'SQL Fundamentals and Basic Queries',
            summary: 'Learn SQL basics, database concepts, and your first queries.',
            content: `# Part 1: SQL Fundamentals and Basic Queries

Welcome to SQL Mastery! This series will make you a database expert.

## What is SQL?

### SQL Overview
- Structured Query Language
- Standard language for databases
- Used for data manipulation and analysis
- Works with all major database systems

### Database Concepts
- Tables and columns
- Rows and records
- Primary keys
- Relationships

## Your First Queries

### SELECT Statement
\`\`\`sql
-- Basic SELECT
SELECT * FROM customers;

-- Select specific columns
SELECT name, email FROM customers;

-- Limit results
SELECT * FROM customers LIMIT 10;
\`\`\`

### WHERE Clause
\`\`\`sql
-- Filter data
SELECT * FROM customers WHERE age > 25;

-- Multiple conditions
SELECT * FROM customers 
WHERE age > 25 AND city = 'New York';

-- Text filtering
SELECT * FROM customers 
WHERE name LIKE 'John%';
\`\`\`

## Sorting and Ordering

### ORDER BY Clause
\`\`\`sql
-- Sort by column
SELECT * FROM customers ORDER BY name;

-- Sort descending
SELECT * FROM customers ORDER BY age DESC;

-- Multiple sort criteria
SELECT * FROM customers 
ORDER BY city, name;
\`\`\`

## Practical Exercise

Practice with a sample database:
1. Explore the table structure
2. Write basic SELECT queries
3. Use WHERE clauses for filtering
4. Sort your results
5. Combine multiple conditions

## Summary & Next Steps

You've learned the fundamentals of SQL! Practice with different datasets.

**Next up**: Part 2 - Joins and relationships between tables.`,
            readTime: 12,
            publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['SQL Basics', 'SELECT Statement', 'WHERE Clause', 'Database Concepts']
          },
          {
            id: 'sql-part-2',
            partNumber: 2,
            title: 'Joins and Relationships',
            summary: 'Master SQL joins to combine data from multiple tables effectively.',
            content: `# Part 2: Joins and Relationships

Joins are essential for combining data from multiple tables. Learn to use them effectively.

## Understanding Joins

### What are Joins?
- Combine data from multiple tables
- Based on common columns
- Essential for relational databases
- Different types for different needs

### Join Types
- **INNER JOIN**: Only matching records
- **LEFT JOIN**: All records from left table
- **RIGHT JOIN**: All records from right table
- **FULL OUTER JOIN**: All records from both tables

## INNER JOIN

### Basic INNER JOIN
\`\`\`sql
SELECT c.name, o.order_date, o.amount
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;
\`\`\`

### Multiple INNER JOINs
\`\`\`sql
SELECT c.name, p.product_name, o.quantity
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
INNER JOIN products p ON o.product_id = p.id;
\`\`\`

## LEFT JOIN

### When to Use LEFT JOIN
- Keep all records from left table
- Include matching records from right table
- Show NULL for non-matching records

### Example
\`\`\`sql
SELECT c.name, o.order_date
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;
\`\`\`

## Advanced Join Techniques

### Self Joins
\`\`\`sql
SELECT e1.name AS employee, e2.name AS manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id;
\`\`\`

### Joining with Conditions
\`\`\`sql
SELECT c.name, o.amount
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
WHERE o.amount > 1000;
\`\`\`

## Practical Exercise

Practice with a sample database:
1. Create tables with relationships
2. Insert sample data
3. Write different types of joins
4. Combine joins with WHERE clauses
5. Use joins in complex queries

## Summary & Next Steps

Joins are fundamental to SQL. Master these techniques for effective data analysis.

**Next up**: Part 3 - Aggregation functions and GROUP BY.`,
            readTime: 15,
            publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['INNER JOIN', 'LEFT JOIN', 'Relationships', 'Multiple Tables']
          },
          {
            id: 'sql-part-3',
            partNumber: 3,
            title: 'Aggregation Functions and GROUP BY',
            summary: 'Learn to summarize and group data using SQL aggregation functions.',
            content: `# Part 3: Aggregation Functions and GROUP BY

Aggregation functions help you summarize data and find patterns. Master these essential techniques.

## Aggregation Functions

### Common Functions
- **COUNT**: Count rows or non-null values
- **SUM**: Sum of numeric values
- **AVG**: Average of numeric values
- **MIN**: Minimum value
- **MAX**: Maximum value

### Basic Examples
\`\`\`sql
-- Count total customers
SELECT COUNT(*) FROM customers;

-- Sum total sales
SELECT SUM(amount) FROM orders;

-- Average order amount
SELECT AVG(amount) FROM orders;

-- Min and max order amounts
SELECT MIN(amount), MAX(amount) FROM orders;
\`\`\`

## GROUP BY Clause

### What is GROUP BY?
- Groups rows with same values
- Used with aggregation functions
- Essential for data analysis
- Creates summary tables

### Basic GROUP BY
\`\`\`sql
-- Sales by region
SELECT region, SUM(amount) as total_sales
FROM orders
GROUP BY region;
\`\`\`

### Multiple Columns
\`\`\`sql
-- Sales by region and year
SELECT region, YEAR(order_date) as year, SUM(amount) as total_sales
FROM orders
GROUP BY region, YEAR(order_date);
\`\`\`

## HAVING Clause

### Filtering Groups
- WHERE filters rows before grouping
- HAVING filters groups after grouping
- Use HAVING with aggregation functions

### Example
\`\`\`sql
-- Regions with sales > 10000
SELECT region, SUM(amount) as total_sales
FROM orders
GROUP BY region
HAVING SUM(amount) > 10000;
\`\`\`

## Advanced Aggregation

### DISTINCT with Aggregation
\`\`\`sql
-- Count unique customers
SELECT COUNT(DISTINCT customer_id) FROM orders;
\`\`\`

### Conditional Aggregation
\`\`\`sql
-- Count orders by status
SELECT 
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders
FROM orders;
\`\`\`

## Practical Exercise

Analyze sales data:
1. Calculate total sales by month
2. Find top 5 customers by order count
3. Calculate average order value by region
4. Identify months with sales above average
5. Create summary reports

## Summary & Next Steps

Aggregation functions are powerful for data analysis. Practice with different grouping scenarios.

**Next up**: Part 4 - Subqueries and CTEs.`,
            readTime: 18,
            publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['GROUP BY', 'Aggregation Functions', 'HAVING', 'Data Summarization']
          },
          {
            id: 'sql-part-4',
            partNumber: 4,
            title: 'Subqueries and Common Table Expressions',
            summary: 'Master subqueries and CTEs for complex data analysis and query optimization.',
            content: `# Part 4: Subqueries and Common Table Expressions

Subqueries and CTEs enable complex data analysis and improve query readability and performance.

## Subquery Fundamentals

### What are Subqueries?
- **Definition**: Queries nested inside other queries
- **Purpose**: Break complex problems into manageable parts
- **Types**: Scalar, column, row, and table subqueries
- **Performance**: Can be optimized for better execution

### Scalar Subqueries
\`\`\`sql
-- Single value subquery
SELECT name, salary,
       (SELECT AVG(salary) FROM employees) as avg_salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
\`\`\`

### Column Subqueries
\`\`\`sql
-- Multiple values in WHERE clause
SELECT name, department
FROM employees
WHERE department IN (
    SELECT department 
    FROM departments 
    WHERE budget > 100000
);
\`\`\`

## Common Table Expressions (CTEs)

### Basic CTE Syntax
\`\`\`sql
WITH cte_name AS (
    SELECT column1, column2
    FROM table_name
    WHERE condition
)
SELECT * FROM cte_name;
\`\`\`

### Multiple CTEs
\`\`\`sql
WITH 
    high_earners AS (
        SELECT * FROM employees WHERE salary > 80000
    ),
    department_stats AS (
        SELECT department, COUNT(*) as emp_count
        FROM high_earners
        GROUP BY department
    )
SELECT * FROM department_stats;
\`\`\`

## Advanced Subquery Techniques

### Correlated Subqueries
\`\`\`sql
-- Subquery references outer query
SELECT e1.name, e1.salary
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department = e1.department
);
\`\`\`

### EXISTS and NOT EXISTS
\`\`\`sql
-- Check for existence
SELECT name
FROM employees e
WHERE EXISTS (
    SELECT 1 FROM projects p
    WHERE p.manager_id = e.id
);

-- Check for non-existence
SELECT name
FROM employees e
WHERE NOT EXISTS (
    SELECT 1 FROM projects p
    WHERE p.manager_id = e.id
);
\`\`\`

## Window Functions

### ROW_NUMBER and RANK
\`\`\`sql
-- Rank employees by salary
SELECT name, salary,
       ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num,
       RANK() OVER (ORDER BY salary DESC) as rank,
       DENSE_RANK() OVER (ORDER BY salary DESC) as dense_rank
FROM employees;
\`\`\`

### PARTITION BY
\`\`\`sql
-- Rank within departments
SELECT name, department, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank
FROM employees;
\`\`\`

### LAG and LEAD
\`\`\`sql
-- Compare with previous/next values
SELECT name, salary,
       LAG(salary, 1) OVER (ORDER BY salary) as prev_salary,
       LEAD(salary, 1) OVER (ORDER BY salary) as next_salary
FROM employees;
\`\`\`

## Recursive CTEs

### Hierarchical Data
\`\`\`sql
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers
    SELECT id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: subordinates
    SELECT e.id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy;
\`\`\`

## Performance Optimization

### Subquery vs JOIN
\`\`\`sql
-- Subquery approach
SELECT name FROM employees
WHERE department IN (
    SELECT department FROM departments WHERE budget > 100000
);

-- JOIN approach (often faster)
SELECT DISTINCT e.name
FROM employees e
JOIN departments d ON e.department = d.department
WHERE d.budget > 100000;
\`\`\`

### CTE vs Temporary Tables
- **CTEs**: Better for readability, limited scope
- **Temporary Tables**: Better for complex operations, reusable
- **Performance**: Depends on query complexity and data size

## Practical Exercise

Solve complex business problems:
1. Find employees earning more than their department average
2. Calculate running totals and moving averages
3. Identify top performers in each department
4. Build organizational hierarchy
5. Compare performance across time periods
6. Optimize query performance

## Summary & Next Steps

Subqueries and CTEs are powerful tools for complex data analysis. Master these techniques for advanced SQL skills.

**Next up**: Part 5 - Advanced SQL functions and data manipulation.`,
            readTime: 18,
            publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Subqueries', 'CTEs', 'Window Functions', 'Recursive Queries']
          },
          {
            id: 'sql-part-5',
            partNumber: 5,
            title: 'Advanced SQL Functions and Data Manipulation',
            summary: 'Master advanced SQL functions for complex data manipulation and analysis.',
            content: `# Part 5: Advanced SQL Functions and Data Manipulation

Advanced SQL functions enable sophisticated data manipulation and analysis capabilities.

## String Functions

### Text Manipulation
\`\`\`sql
-- Basic string functions
SELECT 
    UPPER(name) as upper_name,
    LOWER(email) as lower_email,
    LENGTH(name) as name_length,
    SUBSTRING(name, 1, 3) as first_three,
    CONCAT(first_name, ' ', last_name) as full_name
FROM employees;
\`\`\`

### Pattern Matching
\`\`\`sql
-- LIKE patterns
SELECT name FROM employees
WHERE name LIKE 'John%';  -- Starts with John

SELECT email FROM employees
WHERE email LIKE '%@company.com';  -- Company email

-- Regular expressions (PostgreSQL)
SELECT name FROM employees
WHERE name ~ '^[A-Z][a-z]+ [A-Z][a-z]+$';  -- Proper name format
\`\`\`

### String Replacement and Cleaning
\`\`\`sql
-- Replace and clean text
SELECT 
    REPLACE(phone, '-', '') as clean_phone,
    TRIM(name) as trimmed_name,
    LTRIM(RTRIM(address)) as clean_address
FROM employees;
\`\`\`

## Date and Time Functions

### Date Arithmetic
\`\`\`sql
-- Date calculations
SELECT 
    hire_date,
    CURRENT_DATE - hire_date as days_employed,
    EXTRACT(YEAR FROM hire_date) as hire_year,
    DATE_ADD(hire_date, INTERVAL 1 YEAR) as anniversary
FROM employees;
\`\`\`

### Date Formatting
\`\`\`sql
-- Format dates
SELECT 
    hire_date,
    DATE_FORMAT(hire_date, '%Y-%m-%d') as formatted_date,
    DATE_FORMAT(hire_date, '%B %d, %Y') as readable_date
FROM employees;
\`\`\`

### Time Zone Handling
\`\`\`sql
-- Convert time zones
SELECT 
    created_at,
    CONVERT_TZ(created_at, 'UTC', 'America/New_York') as est_time
FROM orders;
\`\`\`

## Mathematical Functions

### Basic Math Operations
\`\`\`sql
-- Mathematical functions
SELECT 
    salary,
    ROUND(salary, 2) as rounded_salary,
    CEIL(salary) as ceiling_salary,
    FLOOR(salary) as floor_salary,
    ABS(salary - 50000) as salary_diff
FROM employees;
\`\`\`

### Statistical Functions
\`\`\`sql
-- Statistical calculations
SELECT 
    department,
    COUNT(*) as emp_count,
    AVG(salary) as avg_salary,
    MIN(salary) as min_salary,
    MAX(salary) as max_salary,
    STDDEV(salary) as salary_stddev
FROM employees
GROUP BY department;
\`\`\`

## Conditional Functions

### CASE Statements
\`\`\`sql
-- Simple CASE
SELECT name, salary,
    CASE 
        WHEN salary > 80000 THEN 'High'
        WHEN salary > 50000 THEN 'Medium'
        ELSE 'Low'
    END as salary_category
FROM employees;
\`\`\`

### COALESCE and NULLIF
\`\`\`sql
-- Handle NULL values
SELECT 
    name,
    COALESCE(phone, 'No phone') as contact_phone,
    NULLIF(salary, 0) as adjusted_salary
FROM employees;
\`\`\`

## JSON Functions (Modern SQL)

### JSON Data Handling
\`\`\`sql
-- Extract JSON data
SELECT 
    name,
    JSON_EXTRACT(metadata, '$.department') as dept,
    JSON_UNQUOTE(JSON_EXTRACT(metadata, '$.skills[0]')) as primary_skill
FROM employees
WHERE JSON_VALID(metadata);
\`\`\`

### JSON Aggregation
\`\`\`sql
-- Create JSON objects
SELECT 
    department,
    JSON_ARRAYAGG(JSON_OBJECT('name', name, 'salary', salary)) as employees
FROM employees
GROUP BY department;
\`\`\`

## Data Type Conversion

### Type Casting
\`\`\`sql
-- Convert data types
SELECT 
    name,
    CAST(salary AS CHAR) as salary_text,
    CONVERT(salary, DECIMAL(10,2)) as salary_decimal,
    salary + 0.0 as salary_float
FROM employees;
\`\`\`

### Date Conversion
\`\`\`sql
-- Convert between date formats
SELECT 
    hire_date,
    STR_TO_DATE(hire_date, '%Y-%m-%d') as parsed_date,
    UNIX_TIMESTAMP(hire_date) as unix_timestamp
FROM employees;
\`\`\`

## Advanced Aggregation

### ROLLUP and CUBE
\`\`\`sql
-- ROLLUP for hierarchical grouping
SELECT 
    department,
    job_title,
    COUNT(*) as emp_count,
    AVG(salary) as avg_salary
FROM employees
GROUP BY ROLLUP(department, job_title);
\`\`\`

### GROUPING SETS
\`\`\`sql
-- Multiple grouping levels
SELECT 
    department,
    job_title,
    COUNT(*) as emp_count
FROM employees
GROUP BY GROUPING SETS (
    (department),
    (job_title),
    (department, job_title),
    ()
);
\`\`\`

## Performance Considerations

### Function Indexing
\`\`\`sql
-- Create function-based indexes
CREATE INDEX idx_upper_name ON employees (UPPER(name));
CREATE INDEX idx_hire_year ON employees (EXTRACT(YEAR FROM hire_date));
\`\`\`

### Query Optimization
- **Avoid functions in WHERE clauses**: Use indexed columns
- **Use appropriate data types**: Match function requirements
- **Consider function complexity**: Simple functions perform better
- **Test performance**: Measure before and after optimization

## Practical Exercise

Apply advanced functions to real scenarios:
1. Clean and standardize customer data
2. Calculate complex business metrics
3. Handle time zone conversions
4. Process JSON configuration data
5. Create dynamic reports
6. Optimize function performance

## Summary & Next Steps

Advanced SQL functions provide powerful data manipulation capabilities. Master these techniques for sophisticated analysis.

**Next up**: Part 6 - Database design and optimization.`,
            readTime: 20,
            publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['String Functions', 'Date Functions', 'Mathematical Functions', 'JSON Functions']
          },
          {
            id: 'sql-part-6',
            partNumber: 6,
            title: 'Advanced Data Manipulation and CTEs',
            summary: 'Master Common Table Expressions and advanced data manipulation techniques.',
            content: `# Part 6: Advanced Data Manipulation and CTEs

Unlock the power of Common Table Expressions (CTEs) and advanced data manipulation techniques.

## Common Table Expressions (CTEs)

### What are CTEs?
- **Definition**: Temporary named result sets within a query
- **Scope**: Available only within the query that defines them
- **Benefits**: Improved readability, recursive queries, complex logic
- **Syntax**: WITH clause followed by CTE definition

### Basic CTE Syntax
\`\`\`sql
-- Basic CTE example
WITH SalesSummary AS (
    SELECT 
        CustomerID,
        COUNT(*) as OrderCount,
        SUM(TotalAmount) as TotalSpent
    FROM Orders
    GROUP BY CustomerID
)
SELECT 
    c.CustomerName,
    s.OrderCount,
    s.TotalSpent
FROM Customers c
JOIN SalesSummary s ON c.CustomerID = s.CustomerID
WHERE s.TotalSpent > 1000;
\`\`\`

### Multiple CTEs
\`\`\`sql
-- Multiple CTEs in one query
WITH 
    HighValueCustomers AS (
        SELECT CustomerID, SUM(TotalAmount) as TotalSpent
        FROM Orders
        GROUP BY CustomerID
        HAVING SUM(TotalAmount) > 5000
    ),
    RecentOrders AS (
        SELECT CustomerID, COUNT(*) as RecentOrderCount
        FROM Orders
        WHERE OrderDate >= DATEADD(MONTH, -3, GETDATE())
        GROUP BY CustomerID
    )
SELECT 
    c.CustomerName,
    h.TotalSpent,
    r.RecentOrderCount
FROM Customers c
JOIN HighValueCustomers h ON c.CustomerID = h.CustomerID
LEFT JOIN RecentOrders r ON c.CustomerID = r.CustomerID;
\`\`\`

## Recursive CTEs

### Recursive CTE Structure
\`\`\`sql
-- Recursive CTE for organizational hierarchy
WITH EmployeeHierarchy AS (
    -- Anchor member (base case)
    SELECT 
        EmployeeID,
        EmployeeName,
        ManagerID,
        0 as Level,
        CAST(EmployeeName AS VARCHAR(1000)) as HierarchyPath
    FROM Employees
    WHERE ManagerID IS NULL
    
    UNION ALL
    
    -- Recursive member
    SELECT 
        e.EmployeeID,
        e.EmployeeName,
        e.ManagerID,
        eh.Level + 1,
        CAST(eh.HierarchyPath + ' -> ' + e.EmployeeName AS VARCHAR(1000))
    FROM Employees e
    INNER JOIN EmployeeHierarchy eh ON e.ManagerID = eh.EmployeeID
)
SELECT 
    EmployeeID,
    EmployeeName,
    Level,
    HierarchyPath
FROM EmployeeHierarchy
ORDER BY Level, EmployeeName;
\`\`\`

### Practical Recursive Examples
\`\`\`sql
-- Find all subordinates of a manager
WITH SubordinateHierarchy AS (
    -- Start with specific manager
    SELECT EmployeeID, EmployeeName, ManagerID, 0 as Level
    FROM Employees
    WHERE EmployeeID = 1  -- Manager ID
    
    UNION ALL
    
    -- Find all subordinates
    SELECT e.EmployeeID, e.EmployeeName, e.ManagerID, sh.Level + 1
    FROM Employees e
    INNER JOIN SubordinateHierarchy sh ON e.ManagerID = sh.EmployeeID
)
SELECT 
    EmployeeID,
    EmployeeName,
    Level,
    CASE 
        WHEN Level = 0 THEN 'Manager'
        WHEN Level = 1 THEN 'Direct Report'
        ELSE 'Subordinate'
    END as RoleType
FROM SubordinateHierarchy
ORDER BY Level, EmployeeName;
\`\`\`

## Advanced Data Manipulation

### Pivot and Unpivot Operations
\`\`\`sql
-- Pivot example: Sales by product and month
SELECT 
    ProductName,
    [1] as January,
    [2] as February,
    [3] as March,
    [4] as April,
    [5] as May,
    [6] as June
FROM (
    SELECT 
        p.ProductName,
        MONTH(o.OrderDate) as OrderMonth,
        SUM(od.Quantity * od.UnitPrice) as MonthlySales
    FROM Orders o
    JOIN OrderDetails od ON o.OrderID = od.OrderID
    JOIN Products p ON od.ProductID = p.ProductID
    WHERE YEAR(o.OrderDate) = 2023
    GROUP BY p.ProductName, MONTH(o.OrderDate)
) as SourceData
PIVOT (
    SUM(MonthlySales)
    FOR OrderMonth IN ([1], [2], [3], [4], [5], [6])
) as PivotTable;
\`\`\`

### Unpivot Example
\`\`\`sql
-- Unpivot example: Convert columns to rows
WITH SalesData AS (
    SELECT 
        ProductName,
        [Q1] as Q1_Sales,
        [Q2] as Q2_Sales,
        [Q3] as Q3_Sales,
        [Q4] as Q4_Sales
    FROM (
        SELECT 
            p.ProductName,
            DATEPART(QUARTER, o.OrderDate) as Quarter,
            SUM(od.Quantity * od.UnitPrice) as Sales
        FROM Orders o
        JOIN OrderDetails od ON o.OrderID = od.OrderID
        JOIN Products p ON od.ProductID = p.ProductID
        WHERE YEAR(o.OrderDate) = 2023
        GROUP BY p.ProductName, DATEPART(QUARTER, o.OrderDate)
    ) as SourceData
    PIVOT (
        SUM(Sales)
        FOR Quarter IN ([1], [2], [3], [4])
    ) as PivotTable
)
SELECT 
    ProductName,
    Quarter,
    Sales
FROM SalesData
UNPIVOT (
    Sales FOR Quarter IN (Q1_Sales, Q2_Sales, Q3_Sales, Q4_Sales)
) as UnpivotTable;
\`\`\`

## Advanced Window Functions

### Ranking Functions
\`\`\`sql
-- Advanced ranking with multiple criteria
SELECT 
    CustomerID,
    CustomerName,
    TotalSpent,
    ROW_NUMBER() OVER (ORDER BY TotalSpent DESC) as RowNumber,
    RANK() OVER (ORDER BY TotalSpent DESC) as Rank,
    DENSE_RANK() OVER (ORDER BY TotalSpent DESC) as DenseRank,
    NTILE(4) OVER (ORDER BY TotalSpent DESC) as Quartile
FROM (
    SELECT 
        c.CustomerID,
        c.CustomerName,
        SUM(od.Quantity * od.UnitPrice) as TotalSpent
    FROM Customers c
    JOIN Orders o ON c.CustomerID = o.CustomerID
    JOIN OrderDetails od ON o.OrderID = od.OrderID
    GROUP BY c.CustomerID, c.CustomerName
) as CustomerSales;
\`\`\`

### Advanced LAG and LEAD
\`\`\`sql
-- Compare current period with previous periods
SELECT 
    ProductName,
    OrderMonth,
    MonthlySales,
    LAG(MonthlySales, 1) OVER (PARTITION BY ProductName ORDER BY OrderMonth) as PreviousMonth,
    LAG(MonthlySales, 12) OVER (PARTITION BY ProductName ORDER BY OrderMonth) as SameMonthLastYear,
    LEAD(MonthlySales, 1) OVER (PARTITION BY ProductName ORDER BY OrderMonth) as NextMonth,
    -- Calculate growth rates
    CASE 
        WHEN LAG(MonthlySales, 1) OVER (PARTITION BY ProductName ORDER BY OrderMonth) > 0
        THEN ((MonthlySales - LAG(MonthlySales, 1) OVER (PARTITION BY ProductName ORDER BY OrderMonth)) 
               / LAG(MonthlySales, 1) OVER (PARTITION BY ProductName ORDER BY OrderMonth)) * 100
        ELSE NULL
    END as MonthOverMonthGrowth,
    -- Year-over-year growth
    CASE 
        WHEN LAG(MonthlySales, 12) OVER (PARTITION BY ProductName ORDER BY OrderMonth) > 0
        THEN ((MonthlySales - LAG(MonthlySales, 12) OVER (PARTITION BY ProductName ORDER BY OrderMonth)) 
               / LAG(MonthlySales, 12) OVER (PARTITION BY ProductName ORDER BY OrderMonth)) * 100
        ELSE NULL
    END as YearOverYearGrowth
FROM (
    SELECT 
        p.ProductName,
        YEAR(o.OrderDate) * 100 + MONTH(o.OrderDate) as OrderMonth,
        SUM(od.Quantity * od.UnitPrice) as MonthlySales
    FROM Orders o
    JOIN OrderDetails od ON o.OrderID = od.OrderID
    JOIN Products p ON od.ProductID = p.ProductID
    GROUP BY p.ProductName, YEAR(o.OrderDate), MONTH(o.OrderDate)
) as MonthlyProductSales
ORDER BY ProductName, OrderMonth;
\`\`\`

## Complex Data Transformations

### Data Quality and Cleansing
\`\`\`sql
-- Data cleansing with CTEs
WITH 
    RawData AS (
        SELECT 
            CustomerID,
            CustomerName,
            Email,
            Phone,
            Address
        FROM RawCustomers
    ),
    CleanedData AS (
        SELECT 
            CustomerID,
            -- Clean customer name
            TRIM(UPPER(LEFT(CustomerName, 1)) + LOWER(SUBSTRING(CustomerName, 2, LEN(CustomerName)))) as CleanName,
            -- Validate and clean email
            CASE 
                WHEN Email LIKE '%@%.%' AND Email NOT LIKE '%@%@%' 
                THEN LOWER(TRIM(Email))
                ELSE NULL
            END as CleanEmail,
            -- Clean phone number
            CASE 
                WHEN LEN(REPLACE(REPLACE(REPLACE(Phone, '-', ''), '(', ''), ')', '')) = 10
                THEN REPLACE(REPLACE(REPLACE(Phone, '-', ''), '(', ''), ')', '')
                ELSE NULL
            END as CleanPhone,
            -- Standardize address
            UPPER(TRIM(Address)) as CleanAddress
        FROM RawData
    ),
    ValidatedData AS (
        SELECT 
            CustomerID,
            CleanName,
            CleanEmail,
            CleanPhone,
            CleanAddress,
            -- Add validation flags
            CASE WHEN CleanEmail IS NOT NULL THEN 1 ELSE 0 END as HasValidEmail,
            CASE WHEN CleanPhone IS NOT NULL THEN 1 ELSE 0 END as HasValidPhone,
            CASE WHEN CleanAddress IS NOT NULL AND LEN(CleanAddress) > 10 THEN 1 ELSE 0 END as HasValidAddress
        FROM CleanedData
    )
SELECT 
    CustomerID,
    CleanName as CustomerName,
    CleanEmail as Email,
    CleanPhone as Phone,
    CleanAddress as Address,
    HasValidEmail,
    HasValidPhone,
    HasValidAddress,
    -- Overall data quality score
    (HasValidEmail + HasValidPhone + HasValidAddress) as DataQualityScore
FROM ValidatedData
ORDER BY DataQualityScore DESC, CustomerName;
\`\`\`

### Advanced Aggregations
\`\`\`sql
-- Complex aggregation with multiple grouping sets
SELECT 
    COALESCE(CAST(ProductCategoryID AS VARCHAR), 'All Categories') as Category,
    COALESCE(CAST(SupplierID AS VARCHAR), 'All Suppliers') as Supplier,
    COALESCE(CAST(YEAR(OrderDate) AS VARCHAR), 'All Years') as Year,
    COUNT(*) as OrderCount,
    SUM(od.Quantity * od.UnitPrice) as TotalSales,
    AVG(od.Quantity * od.UnitPrice) as AverageOrderValue,
    MIN(od.Quantity * od.UnitPrice) as MinOrderValue,
    MAX(od.Quantity * od.UnitPrice) as MaxOrderValue
FROM Orders o
JOIN OrderDetails od ON o.OrderID = od.OrderID
JOIN Products p ON od.ProductID = p.ProductID
WHERE o.OrderDate >= '2023-01-01'
GROUP BY 
    GROUPING SETS (
        (p.ProductCategoryID, p.SupplierID, YEAR(o.OrderDate)),  -- Detailed level
        (p.ProductCategoryID, YEAR(o.OrderDate)),                -- Category by year
        (p.SupplierID, YEAR(o.OrderDate)),                       -- Supplier by year
        (YEAR(o.OrderDate)),                                     -- Year total
        ()                                                       -- Grand total
    )
ORDER BY 
    CASE WHEN ProductCategoryID IS NULL THEN 1 ELSE 0 END,
    ProductCategoryID,
    CASE WHEN SupplierID IS NULL THEN 1 ELSE 0 END,
    SupplierID,
    YEAR(OrderDate);
\`\`\`

## Performance Optimization

### CTE Performance Considerations
\`\`\`sql
-- Optimized CTE with proper indexing hints
WITH 
    IndexedSales AS (
        SELECT /*+ INDEX(Orders IX_Orders_Date_Customer) */
            o.CustomerID,
            o.OrderDate,
            SUM(od.Quantity * od.UnitPrice) as OrderTotal
        FROM Orders o WITH (INDEX(IX_Orders_Date_Customer))
        JOIN OrderDetails od WITH (INDEX(IX_OrderDetails_OrderID)) 
            ON o.OrderID = od.OrderID
        WHERE o.OrderDate >= '2023-01-01'
        GROUP BY o.CustomerID, o.OrderDate
    ),
    CustomerMetrics AS (
        SELECT 
            CustomerID,
            COUNT(*) as OrderCount,
            SUM(OrderTotal) as TotalSpent,
            AVG(OrderTotal) as AverageOrderValue,
            MIN(OrderDate) as FirstOrderDate,
            MAX(OrderDate) as LastOrderDate
        FROM IndexedSales
        GROUP BY CustomerID
    )
SELECT 
    c.CustomerName,
    cm.OrderCount,
    cm.TotalSpent,
    cm.AverageOrderValue,
    DATEDIFF(DAY, cm.FirstOrderDate, cm.LastOrderDate) as CustomerLifespanDays
FROM CustomerMetrics cm
JOIN Customers c ON cm.CustomerID = c.CustomerID
WHERE cm.TotalSpent > 1000
ORDER BY cm.TotalSpent DESC;
\`\`\`

## Practical Exercise

Build complex data analysis:
1. Create recursive CTEs for hierarchical data
2. Implement advanced window functions
3. Use pivot/unpivot for data reshaping
4. Apply data cleansing techniques
5. Optimize query performance
6. Test with large datasets
7. Document your solutions

## Summary & Next Steps

CTEs and advanced data manipulation enable complex analytical queries. Master these techniques for sophisticated data analysis.

**Next up**: Part 7 - Stored procedures and functions.`,
            readTime: 28,
            publishedAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['CTEs', 'Recursive Queries', 'Data Manipulation', 'Performance Optimization']
          },
          {
            id: 'sql-part-7',
            partNumber: 7,
            title: 'Stored Procedures and Functions',
            summary: 'Master stored procedures, functions, and programmatic SQL development.',
            content: `# Part 7: Stored Procedures and Functions

Learn to create reusable, efficient database objects with stored procedures and functions.

## Stored Procedures

### What are Stored Procedures?
- **Definition**: Precompiled SQL statements stored in the database
- **Benefits**: Performance, security, reusability, maintainability
- **Execution**: Called by name with parameters
- **Scope**: Can return result sets, output parameters, or status codes

### Basic Stored Procedure Syntax
\`\`\`sql
-- Create a basic stored procedure
CREATE PROCEDURE GetCustomerOrders
    @CustomerID INT,
    @StartDate DATE = NULL,
    @EndDate DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Set default date range if not provided
    IF @StartDate IS NULL
        SET @StartDate = DATEADD(MONTH, -12, GETDATE());
    
    IF @EndDate IS NULL
        SET @EndDate = GETDATE();
    
    SELECT 
        o.OrderID,
        o.OrderDate,
        o.TotalAmount,
        o.Status,
        COUNT(od.OrderDetailID) as ItemCount
    FROM Orders o
    LEFT JOIN OrderDetails od ON o.OrderID = od.OrderID
    WHERE o.CustomerID = @CustomerID
        AND o.OrderDate BETWEEN @StartDate AND @EndDate
    GROUP BY o.OrderID, o.OrderDate, o.TotalAmount, o.Status
    ORDER BY o.OrderDate DESC;
END;
\`\`\`

### Advanced Stored Procedure
\`\`\`sql
-- Complex stored procedure with error handling
CREATE PROCEDURE ProcessOrder
    @CustomerID INT,
    @ProductID INT,
    @Quantity INT,
    @UnitPrice DECIMAL(10,2),
    @OrderID INT OUTPUT,
    @ErrorMessage NVARCHAR(500) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Validate customer exists
        IF NOT EXISTS (SELECT 1 FROM Customers WHERE CustomerID = @CustomerID)
        BEGIN
            SET @ErrorMessage = 'Customer not found';
            ROLLBACK TRANSACTION;
            RETURN -1;
        END
        
        -- Validate product exists and has sufficient stock
        DECLARE @AvailableStock INT;
        SELECT @AvailableStock = StockQuantity 
        FROM Products 
        WHERE ProductID = @ProductID;
        
        IF @AvailableStock < @Quantity
        BEGIN
            SET @ErrorMessage = 'Insufficient stock available';
            ROLLBACK TRANSACTION;
            RETURN -2;
        END
        
        -- Create order
        INSERT INTO Orders (CustomerID, OrderDate, Status, TotalAmount)
        VALUES (@CustomerID, GETDATE(), 'Pending', @Quantity * @UnitPrice);
        
        SET @OrderID = SCOPE_IDENTITY();
        
        -- Add order details
        INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice)
        VALUES (@OrderID, @ProductID, @Quantity, @UnitPrice);
        
        -- Update product stock
        UPDATE Products 
        SET StockQuantity = StockQuantity - @Quantity
        WHERE ProductID = @ProductID;
        
        -- Update order status
        UPDATE Orders 
        SET Status = 'Completed'
        WHERE OrderID = @OrderID;
        
        COMMIT TRANSACTION;
        SET @ErrorMessage = 'Order processed successfully';
        RETURN 0;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        SET @ErrorMessage = ERROR_MESSAGE();
        RETURN -999;
    END CATCH
END;
\`\`\`

## User-Defined Functions

### Scalar Functions
\`\`\`sql
-- Create a scalar function
CREATE FUNCTION CalculateAge(@BirthDate DATE)
RETURNS INT
AS
BEGIN
    DECLARE @Age INT;
    
    SET @Age = DATEDIFF(YEAR, @BirthDate, GETDATE());
    
    -- Adjust if birthday hasn't occurred this year
    IF DATEADD(YEAR, @Age, @BirthDate) > GETDATE()
        SET @Age = @Age - 1;
    
    RETURN @Age;
END;

-- Use the scalar function
SELECT 
    CustomerName,
    BirthDate,
    dbo.CalculateAge(BirthDate) as Age
FROM Customers
WHERE dbo.CalculateAge(BirthDate) > 18;
\`\`\`

### Table-Valued Functions
\`\`\`sql
-- Inline table-valued function
CREATE FUNCTION GetTopCustomers(@TopCount INT = 10)
RETURNS TABLE
AS
RETURN
(
    SELECT TOP (@TopCount)
        c.CustomerID,
        c.CustomerName,
        SUM(od.Quantity * od.UnitPrice) as TotalSpent,
        COUNT(DISTINCT o.OrderID) as OrderCount
    FROM Customers c
    JOIN Orders o ON c.CustomerID = o.CustomerID
    JOIN OrderDetails od ON o.OrderID = od.OrderID
    GROUP BY c.CustomerID, c.CustomerName
    ORDER BY TotalSpent DESC
);

-- Use the table-valued function
SELECT * FROM dbo.GetTopCustomers(5);
\`\`\`

### Multi-Statement Table-Valued Functions
\`\`\`sql
-- Multi-statement table-valued function
CREATE FUNCTION GetCustomerAnalytics(@CustomerID INT)
RETURNS @Analytics TABLE
(
    MetricName NVARCHAR(50),
    MetricValue DECIMAL(18,2),
    MetricDate DATE
)
AS
BEGIN
    -- Total spent
    INSERT INTO @Analytics
    SELECT 
        'Total Spent' as MetricName,
        SUM(od.Quantity * od.UnitPrice) as MetricValue,
        MAX(o.OrderDate) as MetricDate
    FROM Orders o
    JOIN OrderDetails od ON o.OrderID = od.OrderID
    WHERE o.CustomerID = @CustomerID;
    
    -- Average order value
    INSERT INTO @Analytics
    SELECT 
        'Average Order Value' as MetricName,
        AVG(od.Quantity * od.UnitPrice) as MetricValue,
        MAX(o.OrderDate) as MetricDate
    FROM Orders o
    JOIN OrderDetails od ON o.OrderID = od.OrderID
    WHERE o.CustomerID = @CustomerID;
    
    -- Order frequency (orders per month)
    INSERT INTO @Analytics
    SELECT 
        'Orders Per Month' as MetricName,
        CAST(COUNT(*) AS DECIMAL(18,2)) / 
        NULLIF(DATEDIFF(MONTH, MIN(o.OrderDate), MAX(o.OrderDate)) + 1, 0) as MetricValue,
        MAX(o.OrderDate) as MetricDate
    FROM Orders o
    WHERE o.CustomerID = @CustomerID;
    
    RETURN;
END;

-- Use the multi-statement function
SELECT * FROM dbo.GetCustomerAnalytics(1);
\`\`\`

## Advanced Programming Constructs

### Variables and Control Flow
\`\`\`sql
-- Stored procedure with complex logic
CREATE PROCEDURE GenerateSalesReport
    @StartDate DATE,
    @EndDate DATE,
    @ReportType VARCHAR(20) = 'Summary'
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @TotalSales DECIMAL(18,2);
    DECLARE @TotalOrders INT;
    DECLARE @AverageOrderValue DECIMAL(18,2);
    DECLARE @TopProductID INT;
    DECLARE @TopProductName NVARCHAR(100);
    
    -- Calculate basic metrics
    SELECT 
        @TotalSales = SUM(od.Quantity * od.UnitPrice),
        @TotalOrders = COUNT(DISTINCT o.OrderID),
        @AverageOrderValue = AVG(od.Quantity * od.UnitPrice)
    FROM Orders o
    JOIN OrderDetails od ON o.OrderID = od.OrderID
    WHERE o.OrderDate BETWEEN @StartDate AND @EndDate;
    
    -- Find top-selling product
    SELECT TOP 1
        @TopProductID = od.ProductID,
        @TopProductName = p.ProductName
    FROM OrderDetails od
    JOIN Products p ON od.ProductID = p.ProductID
    JOIN Orders o ON od.OrderID = o.OrderID
    WHERE o.OrderDate BETWEEN @StartDate AND @EndDate
    GROUP BY od.ProductID, p.ProductName
    ORDER BY SUM(od.Quantity) DESC;
    
    -- Return report based on type
    IF @ReportType = 'Summary'
    BEGIN
        SELECT 
            @TotalSales as TotalSales,
            @TotalOrders as TotalOrders,
            @AverageOrderValue as AverageOrderValue,
            @TopProductName as TopSellingProduct;
    END
    ELSE IF @ReportType = 'Detailed'
    BEGIN
        -- Return detailed breakdown
        SELECT 
            p.ProductName,
            SUM(od.Quantity) as TotalQuantity,
            SUM(od.Quantity * od.UnitPrice) as TotalSales,
            COUNT(DISTINCT o.OrderID) as OrderCount
        FROM Orders o
        JOIN OrderDetails od ON o.OrderID = od.OrderID
        JOIN Products p ON od.ProductID = p.ProductID
        WHERE o.OrderDate BETWEEN @StartDate AND @EndDate
        GROUP BY p.ProductID, p.ProductName
        ORDER BY TotalSales DESC;
    END
    ELSE
    BEGIN
        RAISERROR('Invalid report type. Use ''Summary'' or ''Detailed''', 16, 1);
        RETURN;
    END
END;
\`\`\`

### Cursors and Dynamic SQL
\`\`\`sql
-- Stored procedure using cursor
CREATE PROCEDURE UpdateProductPrices
    @CategoryID INT,
    @IncreasePercent DECIMAL(5,2)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @ProductID INT;
    DECLARE @CurrentPrice DECIMAL(10,2);
    DECLARE @NewPrice DECIMAL(10,2);
    DECLARE @UpdatedCount INT = 0;
    
    -- Declare cursor
    DECLARE product_cursor CURSOR FOR
        SELECT ProductID, UnitPrice
        FROM Products
        WHERE CategoryID = @CategoryID;
    
    OPEN product_cursor;
    
    FETCH NEXT FROM product_cursor INTO @ProductID, @CurrentPrice;
    
    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Calculate new price
        SET @NewPrice = @CurrentPrice * (1 + @IncreasePercent / 100);
        
        -- Update product price
        UPDATE Products
        SET UnitPrice = @NewPrice
        WHERE ProductID = @ProductID;
        
        SET @UpdatedCount = @UpdatedCount + 1;
        
        FETCH NEXT FROM product_cursor INTO @ProductID, @CurrentPrice;
    END
    
    CLOSE product_cursor;
    DEALLOCATE product_cursor;
    
    SELECT @UpdatedCount as ProductsUpdated;
END;
\`\`\`

## Error Handling and Logging

### Comprehensive Error Handling
\`\`\`sql
-- Stored procedure with advanced error handling
CREATE PROCEDURE ProcessBulkOrders
    @OrderData NVARCHAR(MAX)  -- JSON or XML data
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @ErrorCount INT = 0;
    DECLARE @SuccessCount INT = 0;
    DECLARE @ErrorMessage NVARCHAR(MAX) = '';
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Create temporary table for processing
        CREATE TABLE #TempOrders (
            CustomerID INT,
            ProductID INT,
            Quantity INT,
            UnitPrice DECIMAL(10,2),
            RowNumber INT IDENTITY(1,1)
        );
        
        -- Parse and insert data (simplified example)
        -- In real implementation, you would parse JSON/XML here
        
        -- Process each order
        DECLARE @CurrentRow INT = 1;
        DECLARE @MaxRows INT;
        DECLARE @CurrentCustomerID INT;
        DECLARE @CurrentProductID INT;
        DECLARE @CurrentQuantity INT;
        DECLARE @CurrentUnitPrice DECIMAL(10,2);
        
        SELECT @MaxRows = MAX(RowNumber) FROM #TempOrders;
        
        WHILE @CurrentRow <= @MaxRows
        BEGIN
            BEGIN TRY
                SELECT 
                    @CurrentCustomerID = CustomerID,
                    @CurrentProductID = ProductID,
                    @CurrentQuantity = Quantity,
                    @CurrentUnitPrice = UnitPrice
                FROM #TempOrders
                WHERE RowNumber = @CurrentRow;
                
                -- Validate data
                IF NOT EXISTS (SELECT 1 FROM Customers WHERE CustomerID = @CurrentCustomerID)
                BEGIN
                    SET @ErrorMessage = @ErrorMessage + 'Row ' + CAST(@CurrentRow AS VARCHAR) + ': Invalid Customer ID; ';
                    SET @ErrorCount = @ErrorCount + 1;
                END
                ELSE IF NOT EXISTS (SELECT 1 FROM Products WHERE ProductID = @CurrentProductID)
                BEGIN
                    SET @ErrorMessage = @ErrorMessage + 'Row ' + CAST(@CurrentRow AS VARCHAR) + ': Invalid Product ID; ';
                    SET @ErrorCount = @ErrorCount + 1;
                END
                ELSE
                BEGIN
                    -- Process valid order
                    EXEC ProcessOrder 
                        @CustomerID = @CurrentCustomerID,
                        @ProductID = @CurrentProductID,
                        @Quantity = @CurrentQuantity,
                        @UnitPrice = @CurrentUnitPrice,
                        @OrderID = NULL,
                        @ErrorMessage = NULL;
                    
                    SET @SuccessCount = @SuccessCount + 1;
                END
                
            END TRY
            BEGIN CATCH
                SET @ErrorMessage = @ErrorMessage + 'Row ' + CAST(@CurrentRow AS VARCHAR) + ': ' + ERROR_MESSAGE() + '; ';
                SET @ErrorCount = @ErrorCount + 1;
            END CATCH
            
            SET @CurrentRow = @CurrentRow + 1;
        END
        
        -- Log results
        INSERT INTO ProcessingLog (ProcessDate, SuccessCount, ErrorCount, ErrorMessage)
        VALUES (GETDATE(), @SuccessCount, @ErrorCount, @ErrorMessage);
        
        -- Return results
        SELECT 
            @SuccessCount as SuccessCount,
            @ErrorCount as ErrorCount,
            @ErrorMessage as ErrorMessage;
        
        COMMIT TRANSACTION;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        -- Log error
        INSERT INTO ErrorLog (ErrorDate, ErrorMessage, ErrorProcedure)
        VALUES (GETDATE(), ERROR_MESSAGE(), 'ProcessBulkOrders');
        
        -- Re-raise error
        THROW;
    END CATCH
    
    -- Clean up
    DROP TABLE #TempOrders;
END;
\`\`\`

## Performance Optimization

### Optimizing Stored Procedures
\`\`\`sql
-- Optimized stored procedure with proper indexing
CREATE PROCEDURE GetCustomerOrderHistory
    @CustomerID INT,
    @StartDate DATE = NULL,
    @EndDate DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Use proper data types and set defaults
    IF @StartDate IS NULL
        SET @StartDate = DATEADD(YEAR, -1, GETDATE());
    
    IF @EndDate IS NULL
        SET @EndDate = GETDATE();
    
    -- Use indexed columns in WHERE clause
    SELECT 
        o.OrderID,
        o.OrderDate,
        o.TotalAmount,
        o.Status,
        -- Use computed columns efficiently
        CASE 
            WHEN o.Status = 'Completed' THEN 'Yes'
            ELSE 'No'
        END as IsCompleted,
        -- Optimize aggregations
        COUNT(od.OrderDetailID) as ItemCount,
        SUM(od.Quantity) as TotalQuantity
    FROM Orders o WITH (INDEX(IX_Orders_CustomerID_Date))
    LEFT JOIN OrderDetails od WITH (INDEX(IX_OrderDetails_OrderID))
        ON o.OrderID = od.OrderID
    WHERE o.CustomerID = @CustomerID
        AND o.OrderDate >= @StartDate
        AND o.OrderDate <= @EndDate
    GROUP BY o.OrderID, o.OrderDate, o.TotalAmount, o.Status
    ORDER BY o.OrderDate DESC;
    
    -- Return execution statistics
    SELECT 
        @@ROWCOUNT as RecordsReturned,
        GETDATE() as QueryExecutedAt;
END;
\`\`\`

## Practical Exercise

Build comprehensive database objects:
1. Create stored procedures for common operations
2. Develop user-defined functions
3. Implement error handling and logging
4. Optimize for performance
5. Test with various scenarios
6. Document your code
7. Create maintenance procedures

## Summary & Next Steps

Stored procedures and functions provide powerful tools for database programming. Master these techniques for efficient, maintainable database solutions.

**Next up**: Part 8 - Database design and normalization.`,
            readTime: 30,
            publishedAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Stored Procedures', 'Functions', 'Error Handling', 'Performance Optimization']
          },
          {
            id: 'sql-part-8',
            partNumber: 8,
            title: 'Database Design and Normalization',
            summary: 'Master database design principles, normalization, and data modeling.',
            content: `# Part 8: Database Design and Normalization

Learn to design efficient, normalized databases that support your application requirements.

## Database Design Principles

### What is Database Design?
- **Definition**: Process of creating a detailed data model of a database
- **Purpose**: Organize data efficiently and eliminate redundancy
- **Benefits**: Data integrity, performance, maintainability
- **Process**: Requirements analysis, conceptual design, logical design, physical design

### Design Process Overview
\`\`\`
Database Design Steps:
1. Requirements Analysis
   - Identify data requirements
   - Define business rules
   - Determine user needs

2. Conceptual Design
   - Create Entity-Relationship (ER) model
   - Identify entities and relationships
   - Define attributes

3. Logical Design
   - Convert ER model to relational model
   - Apply normalization rules
   - Define constraints

4. Physical Design
   - Choose storage structures
   - Create indexes
   - Optimize performance
\`\`\`

## Entity-Relationship Modeling

### ER Model Components
\`\`\`
ER Model Elements:
1. Entities
   - Real-world objects
   - Represented as rectangles
   - Examples: Customer, Product, Order

2. Attributes
   - Properties of entities
   - Represented as ovals
   - Types: Simple, Composite, Derived, Key

3. Relationships
   - Associations between entities
   - Represented as diamonds
   - Types: One-to-One, One-to-Many, Many-to-Many

4. Cardinality
   - Number of instances in relationship
   - Notation: 1:1, 1:M, M:N
\`\`\`

### ER Diagram Example
\`\`\`
E-Commerce ER Model:

Entities:
- Customer (CustomerID, Name, Email, Phone)
- Product (ProductID, Name, Price, Category)
- Order (OrderID, OrderDate, TotalAmount)
- OrderDetail (OrderID, ProductID, Quantity, UnitPrice)

Relationships:
- Customer 1:M Order
- Order 1:M OrderDetail
- Product 1:M OrderDetail
- Order M:N Product (through OrderDetail)
\`\`\`

## Normalization

### What is Normalization?
- **Definition**: Process of organizing data to reduce redundancy
- **Goals**: Eliminate data anomalies, improve data integrity
- **Trade-offs**: Query complexity vs. storage efficiency
- **Levels**: 1NF, 2NF, 3NF, BCNF, 4NF, 5NF

### First Normal Form (1NF)
\`\`\`sql
-- Example: Unnormalized table
CREATE TABLE UnnormalizedOrders (
    OrderID INT,
    CustomerName VARCHAR(100),
    CustomerEmail VARCHAR(100),
    Product1 VARCHAR(100),
    Quantity1 INT,
    Product2 VARCHAR(100),
    Quantity2 INT,
    Product3 VARCHAR(100),
    Quantity3 INT
);

-- 1NF: Eliminate repeating groups
CREATE TABLE Orders_1NF (
    OrderID INT,
    CustomerName VARCHAR(100),
    CustomerEmail VARCHAR(100),
    Product VARCHAR(100),
    Quantity INT
);

-- Insert sample data
INSERT INTO Orders_1NF VALUES
(1, 'John Doe', 'john@email.com', 'Laptop', 1),
(1, 'John Doe', 'john@email.com', 'Mouse', 2),
(2, 'Jane Smith', 'jane@email.com', 'Keyboard', 1);
\`\`\`

### Second Normal Form (2NF)
\`\`\`sql
-- 2NF: Remove partial dependencies
-- Split into separate tables

-- Orders table
CREATE TABLE Orders_2NF (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10,2)
);

-- OrderDetails table
CREATE TABLE OrderDetails_2NF (
    OrderID INT,
    ProductID INT,
    Quantity INT,
    UnitPrice DECIMAL(10,2),
    PRIMARY KEY (OrderID, ProductID)
);

-- Customers table
CREATE TABLE Customers_2NF (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(100),
    CustomerEmail VARCHAR(100)
);

-- Products table
CREATE TABLE Products_2NF (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10,2)
);
\`\`\`

### Third Normal Form (3NF)
\`\`\`sql
-- 3NF: Remove transitive dependencies
-- Example: Customer table with city and state

-- Before 3NF (transitive dependency)
CREATE TABLE Customers_Before3NF (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(100),
    City VARCHAR(50),
    State VARCHAR(50),
    StateCode VARCHAR(2)  -- Transitive dependency: State -> StateCode
);

-- After 3NF (remove transitive dependency)
CREATE TABLE Customers_3NF (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(100),
    City VARCHAR(50),
    State VARCHAR(50)
);

CREATE TABLE States_3NF (
    State VARCHAR(50) PRIMARY KEY,
    StateCode VARCHAR(2)
);
\`\`\`

## Advanced Normalization

### Boyce-Codd Normal Form (BCNF)
\`\`\`sql
-- BCNF: Every determinant is a candidate key
-- Example: Course-Instructor relationship

-- Before BCNF
CREATE TABLE CourseInstructor_BeforeBCNF (
    CourseID INT,
    InstructorID INT,
    CourseName VARCHAR(100),
    InstructorName VARCHAR(100),
    PRIMARY KEY (CourseID, InstructorID)
);

-- Problem: CourseName depends only on CourseID
-- Solution: Separate tables

-- After BCNF
CREATE TABLE Courses_BCNF (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(100)
);

CREATE TABLE Instructors_BCNF (
    InstructorID INT PRIMARY KEY,
    InstructorName VARCHAR(100)
);

CREATE TABLE CourseInstructor_BCNF (
    CourseID INT,
    InstructorID INT,
    PRIMARY KEY (CourseID, InstructorID),
    FOREIGN KEY (CourseID) REFERENCES Courses_BCNF(CourseID),
    FOREIGN KEY (InstructorID) REFERENCES Instructors_BCNF(InstructorID)
);
\`\`\`

### Fourth Normal Form (4NF)
\`\`\`sql
-- 4NF: Eliminate multivalued dependencies
-- Example: Employee-Skill-Language relationship

-- Before 4NF (multivalued dependency)
CREATE TABLE EmployeeSkills_Before4NF (
    EmployeeID INT,
    Skill VARCHAR(50),
    Language VARCHAR(50),
    PRIMARY KEY (EmployeeID, Skill, Language)
);

-- After 4NF (separate multivalued dependencies)
CREATE TABLE EmployeeSkills_4NF (
    EmployeeID INT,
    Skill VARCHAR(50),
    PRIMARY KEY (EmployeeID, Skill)
);

CREATE TABLE EmployeeLanguages_4NF (
    EmployeeID INT,
    Language VARCHAR(50),
    PRIMARY KEY (EmployeeID, Language)
);
\`\`\`

## Denormalization

### When to Denormalize
\`\`\`
Denormalization Scenarios:
1. Performance Requirements
   - Frequent complex joins
   - Real-time reporting needs
   - Read-heavy workloads

2. Data Warehouse Design
   - Analytical queries
   - Historical data
   - Aggregated data

3. Specific Use Cases
   - Audit trails
   - Data archiving
   - Reporting tables
\`\`\`

### Denormalization Examples
\`\`\`sql
-- Example: Denormalized reporting table
CREATE TABLE SalesSummary_Denormalized (
    OrderID INT,
    OrderDate DATE,
    CustomerID INT,
    CustomerName VARCHAR(100),
    CustomerEmail VARCHAR(100),
    ProductID INT,
    ProductName VARCHAR(100),
    Category VARCHAR(50),
    Quantity INT,
    UnitPrice DECIMAL(10,2),
    TotalAmount DECIMAL(10,2),
    SalesRepID INT,
    SalesRepName VARCHAR(100),
    Region VARCHAR(50)
);

-- Benefits:
-- - Faster reporting queries
-- - No complex joins required
-- - Pre-calculated totals

-- Trade-offs:
-- - Data redundancy
-- - Storage overhead
-- - Update complexity
\`\`\`

## Data Types and Constraints

### Choosing Appropriate Data Types
\`\`\`sql
-- Numeric Data Types
CREATE TABLE NumericExamples (
    -- Integer types
    SmallIntColumn SMALLINT,        -- -32,768 to 32,767
    IntColumn INT,                  -- -2,147,483,648 to 2,147,483,647
    BigIntColumn BIGINT,            -- -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
    
    -- Decimal types
    DecimalColumn DECIMAL(10,2),    -- Precision 10, Scale 2
    NumericColumn NUMERIC(8,4),     -- Same as DECIMAL
    FloatColumn FLOAT(24),          -- Single precision
    RealColumn REAL,                -- Same as FLOAT(24)
    
    -- Money types
    MoneyColumn MONEY,              -- -922,337,203,685,477.5808 to 922,337,203,685,477.5807
    SmallMoneyColumn SMALLMONEY     -- -214,748.3648 to 214,748.3647
);

-- String Data Types
CREATE TABLE StringExamples (
    -- Fixed-length strings
    CharColumn CHAR(10),            -- Fixed length, padded with spaces
    
    -- Variable-length strings
    VarCharColumn VARCHAR(255),     -- Variable length, up to 255 chars
    NVarCharColumn NVARCHAR(100),   -- Unicode variable length
    
    -- Text types (deprecated in newer versions)
    TextColumn TEXT,                -- Large text data
    NTextColumn NTEXT               -- Large Unicode text data
);

-- Date and Time Types
CREATE TABLE DateTimeExamples (
    DateColumn DATE,                -- Date only (YYYY-MM-DD)
    TimeColumn TIME,                -- Time only (HH:MM:SS)
    DateTimeColumn DATETIME,        -- Date and time
    DateTime2Column DATETIME2,      -- Higher precision datetime
    SmallDateTimeColumn SMALLDATETIME, -- Lower precision datetime
    TimeStampColumn TIMESTAMP       -- Auto-incrementing timestamp
);
\`\`\`

### Constraints and Data Integrity
\`\`\`sql
-- Primary Key Constraints
CREATE TABLE Customers_WithConstraints (
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    Phone VARCHAR(20),
    BirthDate DATE,
    RegistrationDate DATETIME DEFAULT GETDATE(),
    
    -- Check constraints
    CONSTRAINT CK_CustomerName CHECK (LEN(CustomerName) >= 2),
    CONSTRAINT CK_Email CHECK (Email LIKE '%@%.%'),
    CONSTRAINT CK_BirthDate CHECK (BirthDate < GETDATE()),
    
    -- Foreign key constraints
    CONSTRAINT FK_Customer_Region FOREIGN KEY (RegionID) REFERENCES Regions(RegionID)
);

-- Unique Constraints
CREATE TABLE Products_WithConstraints (
    ProductID INT IDENTITY(1,1) PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    SKU VARCHAR(50) UNIQUE,
    CategoryID INT,
    Price DECIMAL(10,2) CHECK (Price > 0),
    
    -- Composite unique constraint
    CONSTRAINT UQ_Product_Category_Name UNIQUE (CategoryID, ProductName)
);

-- Indexes for performance
CREATE INDEX IX_Customers_Email ON Customers_WithConstraints(Email);
CREATE INDEX IX_Customers_RegistrationDate ON Customers_WithConstraints(RegistrationDate);
CREATE INDEX IX_Products_Category_Price ON Products_WithConstraints(CategoryID, Price);
\`\`\`

## Performance Considerations

### Indexing Strategy
\`\`\`sql
-- Clustered Index (Primary Key)
CREATE TABLE Orders_Optimized (
    OrderID INT IDENTITY(1,1) PRIMARY KEY CLUSTERED,
    CustomerID INT NOT NULL,
    OrderDate DATETIME NOT NULL,
    TotalAmount DECIMAL(10,2),
    Status VARCHAR(20)
);

-- Non-clustered Indexes
CREATE INDEX IX_Orders_CustomerID ON Orders_Optimized(CustomerID);
CREATE INDEX IX_Orders_OrderDate ON Orders_Optimized(OrderDate);
CREATE INDEX IX_Orders_Status ON Orders_Optimized(Status);

-- Composite Index
CREATE INDEX IX_Orders_Customer_Date ON Orders_Optimized(CustomerID, OrderDate);

-- Covering Index (includes additional columns)
CREATE INDEX IX_Orders_Customer_Covering ON Orders_Optimized(CustomerID) 
INCLUDE (OrderDate, TotalAmount, Status);
\`\`\`

### Partitioning Strategy
\`\`\`sql
-- Partition function for date-based partitioning
CREATE PARTITION FUNCTION PF_OrderDate (DATETIME)
AS RANGE RIGHT FOR VALUES (
    '2023-01-01',
    '2023-04-01',
    '2023-07-01',
    '2023-10-01',
    '2024-01-01'
);

-- Partition scheme
CREATE PARTITION SCHEME PS_OrderDate
AS PARTITION PF_OrderDate
TO (FG_2022, FG_2023Q1, FG_2023Q2, FG_2023Q3, FG_2023Q4, FG_2024);

-- Partitioned table
CREATE TABLE Orders_Partitioned (
    OrderID INT IDENTITY(1,1),
    CustomerID INT,
    OrderDate DATETIME,
    TotalAmount DECIMAL(10,2)
) ON PS_OrderDate(OrderDate);
\`\`\`

## Practical Exercise

Design a complete database:
1. Analyze business requirements
2. Create ER diagram
3. Apply normalization rules
4. Choose appropriate data types
5. Define constraints and indexes
6. Consider performance implications
7. Document your design

## Summary & Next Steps

Database design and normalization are fundamental to creating efficient, maintainable databases. Master these principles for robust data solutions.

**Next up**: Part 9 - Database security and administration.`,
            readTime: 32,
            publishedAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Database Design', 'Normalization', 'ER Modeling', 'Data Integrity']
          },
          {
            id: 'sql-part-9',
            partNumber: 9,
            title: 'Database Security and Administration',
            summary: 'Master database security, user management, and administrative tasks.',
            content: `# Part 9: Database Security and Administration

Learn to secure your database and perform essential administrative tasks.

## Database Security Overview

### Security Principles
- **Confidentiality**: Protect data from unauthorized access
- **Integrity**: Ensure data accuracy and consistency
- **Availability**: Maintain system accessibility
- **Authentication**: Verify user identity
- **Authorization**: Control user permissions

### Security Layers
\`\`\`
Security Architecture:
1. Network Security
   - Firewalls and VPNs
   - SSL/TLS encryption
   - Network segmentation

2. Database Security
   - User authentication
   - Role-based access control
   - Data encryption

3. Application Security
   - Input validation
   - SQL injection prevention
   - Secure coding practices

4. Data Security
   - Encryption at rest
   - Encryption in transit
   - Data masking
\`\`\`

## User Management

### Creating and Managing Users
\`\`\`sql
-- Create database users
CREATE LOGIN SalesUser WITH PASSWORD = 'SecurePassword123!';
CREATE USER SalesUser FOR LOGIN SalesUser;

CREATE LOGIN ManagerUser WITH PASSWORD = 'ManagerPass456!';
CREATE USER ManagerUser FOR LOGIN ManagerUser;

CREATE LOGIN AdminUser WITH PASSWORD = 'AdminPass789!';
CREATE USER AdminUser FOR LOGIN AdminUser;

-- Create application users
CREATE USER AppUser WITHOUT LOGIN;
CREATE USER ServiceAccount WITHOUT LOGIN;
\`\`\`

### Role-Based Access Control
\`\`\`sql
-- Create custom roles
CREATE ROLE SalesRole;
CREATE ROLE ManagerRole;
CREATE ROLE ReadOnlyRole;

-- Assign users to roles
ALTER ROLE SalesRole ADD MEMBER SalesUser;
ALTER ROLE ManagerRole ADD MEMBER ManagerUser;
ALTER ROLE ReadOnlyRole ADD MEMBER AppUser;

-- Grant permissions to roles
-- Sales role permissions
GRANT SELECT, INSERT, UPDATE ON Orders TO SalesRole;
GRANT SELECT, INSERT, UPDATE ON OrderDetails TO SalesRole;
GRANT SELECT ON Customers TO SalesRole;
GRANT SELECT ON Products TO SalesRole;

-- Manager role permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON Orders TO ManagerRole;
GRANT SELECT, INSERT, UPDATE, DELETE ON OrderDetails TO ManagerRole;
GRANT SELECT, INSERT, UPDATE, DELETE ON Customers TO ManagerRole;
GRANT SELECT, INSERT, UPDATE, DELETE ON Products TO ManagerRole;
GRANT SELECT ON SalesReports TO ManagerRole;

-- Read-only role permissions
GRANT SELECT ON Orders TO ReadOnlyRole;
GRANT SELECT ON OrderDetails TO ReadOnlyRole;
GRANT SELECT ON Customers TO ReadOnlyRole;
GRANT SELECT ON Products TO ReadOnlyRole;
GRANT SELECT ON SalesReports TO ReadOnlyRole;
\`\`\`

## Advanced Security Features

### Row-Level Security (RLS)
\`\`\`sql
-- Enable RLS on a table
ALTER TABLE Orders ENABLE ROW LEVEL SECURITY;

-- Create security policy for sales representatives
CREATE SECURITY POLICY SalesRepPolicy
ADD FILTER PREDICATE dbo.fn_securitypredicate(SalesRepID)
ON Orders
WITH (STATE = ON);

-- Create the security predicate function
CREATE FUNCTION dbo.fn_securitypredicate(@SalesRepID INT)
RETURNS TABLE
WITH SCHEMABINDING
AS
RETURN SELECT 1 AS fn_securitypredicate_result
WHERE @SalesRepID = USER_ID() OR USER_NAME() = 'ManagerUser';

-- Test RLS
-- Sales rep can only see their own orders
EXECUTE AS USER = 'SalesUser1';
SELECT * FROM Orders; -- Only shows orders for SalesUser1
REVERT;

-- Manager can see all orders
EXECUTE AS USER = 'ManagerUser';
SELECT * FROM Orders; -- Shows all orders
REVERT;
\`\`\`

### Dynamic Data Masking
\`\`\`sql
-- Add data masking to sensitive columns
ALTER TABLE Customers
ALTER COLUMN Email ADD MASKED WITH (FUNCTION = 'email()');

ALTER TABLE Customers
ALTER COLUMN Phone ADD MASKED WITH (FUNCTION = 'partial(2,"XXX-XXX-",2)');

ALTER TABLE Customers
ALTER COLUMN CreditCard ADD MASKED WITH (FUNCTION = 'partial(0,"XXXX-XXXX-XXXX-",4)');

-- Create user with limited permissions for testing
CREATE USER TestUser WITHOUT LOGIN;
GRANT SELECT ON Customers TO TestUser;

-- Test data masking
EXECUTE AS USER = 'TestUser';
SELECT CustomerID, CustomerName, Email, Phone, CreditCard FROM Customers;
REVERT;

-- Results will show:
-- Email: aXXX@XXXX.com
-- Phone: 12XXX-XXX-34
-- CreditCard: XXXX-XXXX-XXXX-1234
\`\`\`

### Transparent Data Encryption (TDE)
\`\`\`sql
-- Create master key
CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'MasterKeyPassword123!';

-- Create certificate
CREATE CERTIFICATE TDECertificate
WITH SUBJECT = 'TDE Certificate for Database Encryption';

-- Create database encryption key
CREATE DATABASE ENCRYPTION KEY
WITH ALGORITHM = AES_256
ENCRYPTION BY SERVER CERTIFICATE TDECertificate;

-- Enable TDE
ALTER DATABASE YourDatabase SET ENCRYPTION ON;

-- Check encryption status
SELECT 
    name,
    is_encrypted,
    encryption_state,
    encryption_state_desc
FROM sys.databases
WHERE name = 'YourDatabase';
\`\`\`

## Backup and Recovery

### Backup Strategies
\`\`\`sql
-- Full database backup
BACKUP DATABASE YourDatabase
TO DISK = 'C:\\Backups\\YourDatabase_Full.bak'
WITH FORMAT, INIT, COMPRESSION;

-- Differential backup
BACKUP DATABASE YourDatabase
TO DISK = 'C:\\Backups\\YourDatabase_Diff.bak'
WITH DIFFERENTIAL, COMPRESSION;

-- Transaction log backup
BACKUP LOG YourDatabase
TO DISK = 'C:\\Backups\\YourDatabase_Log.trn'
WITH COMPRESSION;

-- File and filegroup backup
BACKUP DATABASE YourDatabase
FILEGROUP = 'PRIMARY'
TO DISK = 'C:\\Backups\\YourDatabase_Primary.bak'
WITH COMPRESSION;
\`\`\`

### Recovery Operations
\`\`\`sql
-- Restore full database backup
RESTORE DATABASE YourDatabase
FROM DISK = 'C:\\Backups\\YourDatabase_Full.bak'
WITH REPLACE, NORECOVERY;

-- Restore differential backup
RESTORE DATABASE YourDatabase
FROM DISK = 'C:\\Backups\\YourDatabase_Diff.bak'
WITH NORECOVERY;

-- Restore transaction log backups
RESTORE LOG YourDatabase
FROM DISK = 'C:\\Backups\\YourDatabase_Log1.trn'
WITH NORECOVERY;

RESTORE LOG YourDatabase
FROM DISK = 'C:\\Backups\\YourDatabase_Log2.trn'
WITH RECOVERY;

-- Point-in-time recovery
RESTORE DATABASE YourDatabase
FROM DISK = 'C:\\Backups\\YourDatabase_Full.bak'
WITH NORECOVERY;

RESTORE LOG YourDatabase
FROM DISK = 'C:\\Backups\\YourDatabase_Log.trn'
WITH STOPAT = '2023-12-01 14:30:00', RECOVERY;
\`\`\`

## Performance Monitoring

### System Views and Functions
\`\`\`sql
-- Monitor active connections
SELECT 
    session_id,
    login_name,
    host_name,
    program_name,
    status,
    cpu_time,
    memory_usage,
    reads,
    writes,
    last_request_start_time
FROM sys.dm_exec_sessions
WHERE is_user_process = 1;

-- Monitor running queries
SELECT 
    r.session_id,
    r.status,
    r.command,
    r.cpu_time,
    r.total_elapsed_time,
    r.reads,
    r.writes,
    t.text as query_text
FROM sys.dm_exec_requests r
CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) t
WHERE r.session_id > 50;

-- Monitor database size and growth
SELECT 
    name,
    size * 8 / 1024 as size_mb,
    max_size * 8 / 1024 as max_size_mb,
    growth,
    is_percent_growth
FROM sys.database_files;

-- Monitor index usage
SELECT 
    OBJECT_NAME(i.object_id) as table_name,
    i.name as index_name,
    s.user_seeks,
    s.user_scans,
    s.user_lookups,
    s.user_updates,
    s.last_user_seek,
    s.last_user_scan
FROM sys.indexes i
LEFT JOIN sys.dm_db_index_usage_stats s
    ON i.object_id = s.object_id AND i.index_id = s.index_id
WHERE i.object_id > 100
ORDER BY s.user_seeks + s.user_scans + s.user_lookups DESC;
\`\`\`

### Performance Optimization
\`\`\`sql
-- Identify missing indexes
SELECT 
    mid.statement,
    mid.equality_columns,
    mid.inequality_columns,
    mid.included_columns,
    migs.avg_total_user_cost,
    migs.avg_user_impact,
    migs.user_seeks,
    migs.user_scans
FROM sys.dm_db_missing_index_details mid
JOIN sys.dm_db_missing_index_groups mig
    ON mid.index_handle = mig.index_handle
JOIN sys.dm_db_missing_index_group_stats migs
    ON mig.index_group_handle = migs.group_handle
ORDER BY migs.avg_total_user_cost * migs.avg_user_impact * (migs.user_seeks + migs.user_scans) DESC;

-- Monitor wait statistics
SELECT 
    wait_type,
    waiting_tasks_count,
    wait_time_ms,
    max_wait_time_ms,
    signal_wait_time_ms
FROM sys.dm_os_wait_stats
WHERE waiting_tasks_count > 0
ORDER BY wait_time_ms DESC;

-- Check for blocking
SELECT 
    blocking_session_id,
    session_id,
    wait_type,
    wait_time,
    wait_resource,
    resource_description
FROM sys.dm_exec_requests
WHERE blocking_session_id <> 0;
\`\`\`

## Maintenance Tasks

### Database Maintenance Plans
\`\`\`sql
-- Update statistics
UPDATE STATISTICS Customers;
UPDATE STATISTICS Orders;
UPDATE STATISTICS OrderDetails;

-- Rebuild indexes
ALTER INDEX ALL ON Customers REBUILD;
ALTER INDEX ALL ON Orders REBUILD;

-- Reorganize indexes (for less fragmentation)
ALTER INDEX IX_Customers_Email ON Customers REORGANIZE;

-- Check database integrity
DBCC CHECKDB('YourDatabase');

-- Shrink database (use with caution)
DBCC SHRINKDATABASE('YourDatabase', 10); -- Leave 10% free space

-- Clean up old backup files
EXEC xp_delete_file 0, 'C:\\Backups\\', 'bak', '2023-01-01 00:00:00';
\`\`\`

### Automated Maintenance
\`\`\`sql
-- Create maintenance stored procedure
CREATE PROCEDURE sp_DatabaseMaintenance
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @DatabaseName VARCHAR(100) = DB_NAME();
    DECLARE @BackupPath VARCHAR(200) = 'C:\\Backups\\';
    DECLARE @BackupFile VARCHAR(300);
    
    -- Generate backup filename with timestamp
    SET @BackupFile = @BackupPath + @DatabaseName + '_' + 
                     CONVERT(VARCHAR(8), GETDATE(), 112) + '_' +
                     REPLACE(CONVERT(VARCHAR(8), GETDATE(), 108), ':', '') + '.bak';
    
    -- Perform full backup
    BACKUP DATABASE @DatabaseName
    TO DISK = @BackupFile
    WITH FORMAT, INIT, COMPRESSION;
    
    -- Update statistics
    EXEC sp_updatestats;
    
    -- Rebuild indexes if fragmentation > 30%
    DECLARE @ObjectID INT, @IndexID INT, @Fragmentation FLOAT;
    
    DECLARE index_cursor CURSOR FOR
        SELECT object_id, index_id, avg_fragmentation_in_percent
        FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED')
        WHERE avg_fragmentation_in_percent > 30;
    
    OPEN index_cursor;
    FETCH NEXT FROM index_cursor INTO @ObjectID, @IndexID, @Fragmentation;
    
    WHILE @@FETCH_STATUS = 0
    BEGIN
        DECLARE @SQL NVARCHAR(MAX);
        SET @SQL = 'ALTER INDEX ' + QUOTENAME(OBJECT_NAME(@ObjectID)) + 
                   ' ON ' + QUOTENAME(OBJECT_SCHEMA_NAME(@ObjectID)) + '.' + 
                   QUOTENAME(OBJECT_NAME(@ObjectID)) + ' REBUILD';
        
        EXEC sp_executesql @SQL;
        
        FETCH NEXT FROM index_cursor INTO @ObjectID, @IndexID, @Fragmentation;
    END
    
    CLOSE index_cursor;
    DEALLOCATE index_cursor;
    
    -- Log maintenance completion
    INSERT INTO MaintenanceLog (MaintenanceDate, DatabaseName, Status)
    VALUES (GETDATE(), @DatabaseName, 'Completed');
END;
\`\`\`

## Practical Exercise

Implement comprehensive security and administration:
1. Create users and roles
2. Implement row-level security
3. Set up data masking
4. Configure backup strategy
5. Monitor performance
6. Create maintenance procedures
7. Test security measures

## Summary & Next Steps

Database security and administration are critical for maintaining data integrity and system performance. Master these skills for production environments.

**Next up**: Part 10 - Advanced SQL techniques and optimization.`,
            readTime: 35,
            publishedAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Database Security', 'User Management', 'Backup Recovery', 'Performance Monitoring']
          },
          {
            id: 'sql-part-10',
            partNumber: 10,
            title: 'Advanced SQL Techniques and Optimization',
            summary: 'Master advanced SQL techniques, query optimization, and performance tuning.',
            content: `# Part 10: Advanced SQL Techniques and Optimization

Learn advanced SQL techniques and optimization strategies for high-performance databases.

## Query Optimization Fundamentals

### Understanding Query Execution Plans
\`\`\`sql
-- Enable execution plan analysis
SET STATISTICS IO ON;
SET STATISTICS TIME ON;

-- Analyze query execution
SELECT 
    c.CustomerName,
    COUNT(o.OrderID) as OrderCount,
    SUM(od.Quantity * od.UnitPrice) as TotalSpent
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
JOIN OrderDetails od ON o.OrderID = od.OrderID
WHERE o.OrderDate >= '2023-01-01'
GROUP BY c.CustomerID, c.CustomerName
HAVING SUM(od.Quantity * od.UnitPrice) > 1000
ORDER BY TotalSpent DESC;

-- View execution plan
-- Use SQL Server Management Studio or SET SHOWPLAN_ALL ON
\`\`\`

### Index Optimization Strategies
\`\`\`sql
-- Analyze index usage and effectiveness
SELECT 
    OBJECT_NAME(i.object_id) as TableName,
    i.name as IndexName,
    i.type_desc as IndexType,
    s.user_seeks,
    s.user_scans,
    s.user_lookups,
    s.user_updates,
    s.last_user_seek,
    s.last_user_scan,
    -- Calculate index effectiveness
    CASE 
        WHEN s.user_seeks + s.user_scans + s.user_lookups = 0 THEN 'Unused'
        WHEN s.user_updates > (s.user_seeks + s.user_scans + s.user_lookups) * 2 THEN 'Over-updated'
        ELSE 'Effective'
    END as IndexStatus
FROM sys.indexes i
LEFT JOIN sys.dm_db_index_usage_stats s
    ON i.object_id = s.object_id AND i.index_id = s.index_id
WHERE i.object_id > 100
ORDER BY s.user_seeks + s.user_scans + s.user_lookups DESC;

-- Create optimized indexes
CREATE INDEX IX_Orders_Customer_Date_Status 
ON Orders (CustomerID, OrderDate, Status)
INCLUDE (TotalAmount);

CREATE INDEX IX_OrderDetails_Order_Product 
ON OrderDetails (OrderID, ProductID)
INCLUDE (Quantity, UnitPrice);
\`\`\`

## Advanced Query Techniques

### Query Hints and Optimization
\`\`\`sql
-- Use query hints for optimization
SELECT /*+ INDEX(Orders IX_Orders_Customer_Date) */
    c.CustomerName,
    o.OrderDate,
    o.TotalAmount
FROM Customers c
JOIN Orders o WITH (INDEX(IX_Orders_Customer_Date)) ON c.CustomerID = o.CustomerID
WHERE o.OrderDate >= '2023-01-01'
    AND o.Status = 'Completed';

-- Force specific join algorithm
SELECT 
    c.CustomerName,
    p.ProductName,
    od.Quantity
FROM Customers c
INNER LOOP JOIN Orders o ON c.CustomerID = o.CustomerID
INNER HASH JOIN OrderDetails od ON o.OrderID = od.OrderID
INNER MERGE JOIN Products p ON od.ProductID = p.ProductID;

-- Use table hints for locking
SELECT 
    ProductID,
    ProductName,
    Price
FROM Products WITH (NOLOCK)
WHERE CategoryID = 1;
\`\`\`

### Parallel Query Processing
\`\`\`sql
-- Enable parallel processing
SELECT 
    p.CategoryID,
    COUNT(*) as ProductCount,
    AVG(p.Price) as AveragePrice,
    SUM(od.Quantity * od.UnitPrice) as TotalSales
FROM Products p
JOIN OrderDetails od ON p.ProductID = od.ProductID
JOIN Orders o ON od.OrderID = o.OrderID
WHERE o.OrderDate >= '2023-01-01'
GROUP BY p.CategoryID
ORDER BY TotalSales DESC
OPTION (MAXDOP 4); -- Use 4 processors

-- Monitor parallel execution
SELECT 
    session_id,
    request_id,
    scheduler_id,
    cpu_id,
    status,
    command,
    start_time
FROM sys.dm_exec_requests
WHERE session_id > 50;
\`\`\`

## Performance Monitoring and Tuning

### Dynamic Management Views
\`\`\`sql
-- Monitor query performance
SELECT 
    qs.sql_handle,
    qt.text as query_text,
    qs.execution_count,
    qs.total_elapsed_time / qs.execution_count as avg_elapsed_time,
    qs.total_logical_reads / qs.execution_count as avg_logical_reads,
    qs.total_physical_reads / qs.execution_count as avg_physical_reads,
    qs.creation_time,
    qs.last_execution_time
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) qt
WHERE qt.text NOT LIKE '%sys.dm_exec_query_stats%'
ORDER BY qs.total_elapsed_time DESC;

-- Identify expensive queries
SELECT TOP 10
    qt.text as query_text,
    qs.execution_count,
    qs.total_elapsed_time,
    qs.total_logical_reads,
    qs.total_physical_reads,
    qs.total_logical_writes,
    qs.creation_time,
    qs.last_execution_time
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) qt
ORDER BY qs.total_elapsed_time DESC;
\`\`\`

### Wait Statistics Analysis
\`\`\`sql
-- Analyze wait statistics
SELECT 
    wait_type,
    waiting_tasks_count,
    wait_time_ms,
    max_wait_time_ms,
    signal_wait_time_ms,
    wait_time_ms - signal_wait_time_ms as resource_wait_time_ms,
    CASE 
        WHEN waiting_tasks_count = 0 THEN 0
        ELSE wait_time_ms / waiting_tasks_count
    END as avg_wait_time_ms
FROM sys.dm_os_wait_stats
WHERE waiting_tasks_count > 0
ORDER BY wait_time_ms DESC;

-- Common wait types to monitor:
-- PAGEIOLATCH_*: I/O waits
-- LCK_*: Lock waits
-- WRITELOG: Log write waits
-- CXPACKET: Parallel query waits
-- SOS_SCHEDULER_YIELD: CPU pressure
\`\`\`

## Advanced Optimization Techniques

### Query Rewriting and Refactoring
\`\`\`sql
-- Original inefficient query
SELECT 
    c.CustomerName,
    COUNT(o.OrderID) as OrderCount
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
WHERE o.OrderDate >= '2023-01-01' OR o.OrderDate IS NULL
GROUP BY c.CustomerID, c.CustomerName;

-- Optimized version using EXISTS
SELECT 
    c.CustomerName,
    (SELECT COUNT(*) 
     FROM Orders o 
     WHERE o.CustomerID = c.CustomerID 
       AND o.OrderDate >= '2023-01-01') as OrderCount
FROM Customers c;

-- Alternative using window functions
SELECT DISTINCT
    c.CustomerName,
    COUNT(o.OrderID) OVER (PARTITION BY c.CustomerID) as OrderCount
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
WHERE o.OrderDate >= '2023-01-01' OR o.OrderDate IS NULL;
\`\`\`

### Temporary Tables vs. CTEs vs. Subqueries
\`\`\`sql
-- Using temporary tables for complex operations
CREATE TABLE #CustomerMetrics (
    CustomerID INT,
    OrderCount INT,
    TotalSpent DECIMAL(10,2),
    AvgOrderValue DECIMAL(10,2)
);

INSERT INTO #CustomerMetrics
SELECT 
    c.CustomerID,
    COUNT(o.OrderID) as OrderCount,
    SUM(od.Quantity * od.UnitPrice) as TotalSpent,
    AVG(od.Quantity * od.UnitPrice) as AvgOrderValue
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
JOIN OrderDetails od ON o.OrderID = od.OrderID
WHERE o.OrderDate >= '2023-01-01'
GROUP BY c.CustomerID;

-- Use the temporary table for further analysis
SELECT 
    c.CustomerName,
    cm.OrderCount,
    cm.TotalSpent,
    cm.AvgOrderValue,
    CASE 
        WHEN cm.TotalSpent > 5000 THEN 'High Value'
        WHEN cm.TotalSpent > 1000 THEN 'Medium Value'
        ELSE 'Low Value'
    END as CustomerSegment
FROM Customers c
JOIN #CustomerMetrics cm ON c.CustomerID = cm.CustomerID
ORDER BY cm.TotalSpent DESC;

DROP TABLE #CustomerMetrics;
\`\`\`

## Practical Exercise

Optimize database performance:
1. Analyze query execution plans
2. Identify performance bottlenecks
3. Create appropriate indexes
4. Rewrite inefficient queries
5. Monitor wait statistics
6. Test optimization results
7. Document performance improvements

## Summary & Next Steps

Advanced SQL optimization techniques are essential for high-performance databases. Master these skills for production environments.

**Next up**: Part 11 - NoSQL and modern database technologies.`,
            readTime: 28,
            publishedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Query Optimization', 'Performance Tuning', 'Index Optimization', 'Advanced Techniques']
          },
          {
            id: 'sql-part-11',
            partNumber: 11,
            title: 'NoSQL and Modern Database Technologies',
            summary: 'Explore NoSQL databases, cloud databases, and modern data storage solutions.',
            content: `# Part 11: NoSQL and Modern Database Technologies

Explore modern database technologies including NoSQL, cloud databases, and distributed systems.

## NoSQL Database Types

### Document Databases
\`\`\`javascript
// MongoDB example - Document structure
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "customerName": "John Doe",
  "email": "john@example.com",
  "orders": [
    {
      "orderId": "ORD-001",
      "orderDate": ISODate("2023-12-01T10:30:00Z"),
      "items": [
        {
          "productId": "PROD-123",
          "productName": "Laptop",
          "quantity": 1,
          "price": 999.99
        }
      ],
      "totalAmount": 999.99,
      "status": "completed"
    }
  ],
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "createdAt": ISODate("2023-01-15T08:00:00Z"),
  "updatedAt": ISODate("2023-12-01T10:30:00Z")
}

// MongoDB queries
// Find customers with orders over $500
db.customers.find({
  "orders.totalAmount": { $gt: 500 }
});

// Aggregate total sales by customer
db.customers.aggregate([
  { $unwind: "$orders" },
  { $group: {
    _id: "$_id",
    customerName: { $first: "$customerName" },
    totalSpent: { $sum: "$orders.totalAmount" }
  }},
  { $sort: { totalSpent: -1 } }
]);
\`\`\`

### Key-Value Stores
\`\`\`python
# Redis example - Key-value operations
import redis

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

# Basic operations
r.set('user:1001:name', 'John Doe')
r.set('user:1001:email', 'john@example.com')
r.set('user:1001:last_login', '2023-12-01T10:30:00Z')

# Get values
name = r.get('user:1001:name')
email = r.get('user:1001:email')

# Hash operations
r.hset('user:1001', mapping={
    'name': 'John Doe',
    'email': 'john@example.com',
    'age': '30',
    'city': 'New York'
})

# Get hash
user_data = r.hgetall('user:1001')

# List operations
r.lpush('recent_orders', 'ORD-001', 'ORD-002', 'ORD-003')
recent_orders = r.lrange('recent_orders', 0, -1)

# Set operations
r.sadd('product_categories', 'Electronics', 'Books', 'Clothing')
categories = r.smembers('product_categories')

# Sorted sets for rankings
r.zadd('product_ratings', {
    'PROD-123': 4.5,
    'PROD-456': 4.2,
    'PROD-789': 4.8
})
top_products = r.zrevrange('product_ratings', 0, 9, withscores=True)
\`\`\`

### Column-Family Databases
\`\`\`sql
-- Apache Cassandra CQL example
-- Create keyspace
CREATE KEYSPACE ecommerce 
WITH REPLICATION = {
    'class': 'SimpleStrategy',
    'replication_factor': 3
};

USE ecommerce;

-- Create table for orders
CREATE TABLE orders (
    order_id UUID PRIMARY KEY,
    customer_id UUID,
    order_date TIMESTAMP,
    total_amount DECIMAL,
    status TEXT,
    items MAP<TEXT, INT>
);

-- Create table for customer orders (denormalized for queries)
CREATE TABLE customer_orders (
    customer_id UUID,
    order_date TIMESTAMP,
    order_id UUID,
    total_amount DECIMAL,
    status TEXT,
    PRIMARY KEY (customer_id, order_date, order_id)
) WITH CLUSTERING ORDER BY (order_date DESC);

-- Insert data
INSERT INTO orders (order_id, customer_id, order_date, total_amount, status, items)
VALUES (
    uuid(),
    uuid(),
    '2023-12-01 10:30:00',
    999.99,
    'completed',
    {'PROD-123': 1, 'PROD-456': 2}
);

-- Query customer orders
SELECT * FROM customer_orders 
WHERE customer_id = ? 
ORDER BY order_date DESC;
\`\`\`

## Cloud Database Services

### Amazon RDS and Aurora
\`\`\`sql
-- Amazon RDS MySQL example
-- Create database instance (via AWS Console or CLI)
-- aws rds create-db-instance \
--   --db-instance-identifier mydb \
--   --db-instance-class db.t3.micro \
--   --engine mysql \
--   --master-username admin \
--   --master-user-password password123 \
--   --allocated-storage 20

-- Connect and create tables
CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    status ENUM('pending', 'completed', 'cancelled'),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Aurora Serverless example
-- Auto-scaling based on demand
-- Pay only for what you use
\`\`\`

### Google Cloud SQL and BigQuery
\`\`\`sql
-- BigQuery example - Data warehouse
-- Create dataset
CREATE SCHEMA IF NOT EXISTS ecommerce;

-- Create table with partitioning
CREATE TABLE ecommerce.orders (
    order_id STRING,
    customer_id STRING,
    order_date DATE,
    total_amount NUMERIC,
    status STRING,
    items ARRAY<STRUCT<
        product_id STRING,
        product_name STRING,
        quantity INT64,
        price NUMERIC
    >>
)
PARTITION BY DATE(order_date)
CLUSTER BY customer_id, status;

-- Insert data
INSERT INTO ecommerce.orders VALUES
('ORD-001', 'CUST-001', '2023-12-01', 999.99, 'completed', 
 [STRUCT('PROD-123', 'Laptop', 1, 999.99)]);

-- Analytics queries
SELECT 
    DATE_TRUNC(order_date, MONTH) as month,
    COUNT(*) as order_count,
    SUM(total_amount) as total_revenue,
    AVG(total_amount) as avg_order_value
FROM ecommerce.orders
WHERE order_date >= '2023-01-01'
GROUP BY month
ORDER BY month;

-- Window functions for analytics
SELECT 
    customer_id,
    order_date,
    total_amount,
    SUM(total_amount) OVER (
        PARTITION BY customer_id 
        ORDER BY order_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) as running_total
FROM ecommerce.orders
ORDER BY customer_id, order_date;
\`\`\`

## Distributed Database Systems

### Apache Cassandra
\`\`\`sql
-- Cassandra cluster setup
-- nodetool status
-- nodetool ring

-- Create keyspace with network topology
CREATE KEYSPACE ecommerce 
WITH REPLICATION = {
    'class': 'NetworkTopologyStrategy',
    'datacenter1': 3,
    'datacenter2': 2
};

-- Create table with proper partitioning
CREATE TABLE customer_orders (
    customer_id UUID,
    order_date TIMESTAMP,
    order_id UUID,
    total_amount DECIMAL,
    status TEXT,
    items MAP<TEXT, INT>,
    PRIMARY KEY (customer_id, order_date, order_id)
) WITH CLUSTERING ORDER BY (order_date DESC);

-- Batch operations for consistency
BEGIN BATCH
    INSERT INTO customer_orders (customer_id, order_date, order_id, total_amount, status)
    VALUES (?, ?, ?, ?, ?);
    
    UPDATE customer_stats 
    SET order_count = order_count + 1, 
        total_spent = total_spent + ?
    WHERE customer_id = ?;
APPLY BATCH;
\`\`\`

### Apache Kafka for Data Streaming
\`\`\`python
# Kafka producer example
from kafka import KafkaProducer
import json

# Create producer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda x: json.dumps(x).encode('utf-8')
)

# Send order events
order_event = {
    'event_type': 'order_created',
    'order_id': 'ORD-001',
    'customer_id': 'CUST-001',
    'timestamp': '2023-12-01T10:30:00Z',
    'total_amount': 999.99,
    'items': [
        {'product_id': 'PROD-123', 'quantity': 1, 'price': 999.99}
    ]
}

producer.send('order-events', order_event)
producer.flush()

# Kafka consumer example
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'order-events',
    bootstrap_servers=['localhost:9092'],
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for message in consumer:
    event = message.value
    print(f"Received event: {event['event_type']}")
    
    # Process the event
    if event['event_type'] == 'order_created':
        # Update inventory
        # Send confirmation email
        # Update analytics
        pass
\`\`\`

## Data Lake and Data Warehouse

### Apache Spark for Big Data Processing
\`\`\`python
# Spark SQL example
from pyspark.sql import SparkSession
from pyspark.sql.functions import *

# Create Spark session
spark = SparkSession.builder \
    .appName("EcommerceAnalytics") \
    .config("spark.sql.adaptive.enabled", "true") \
    .getOrCreate()

# Read data from various sources
orders_df = spark.read.parquet("s3://data-lake/orders/")
customers_df = spark.read.parquet("s3://data-lake/customers/")
products_df = spark.read.parquet("s3://data-lake/products/")

# Complex analytics
customer_analytics = orders_df \
    .join(customers_df, "customer_id") \
    .join(products_df, "product_id") \
    .groupBy("customer_id", "customer_name") \
    .agg(
        count("order_id").alias("order_count"),
        sum("total_amount").alias("total_spent"),
        avg("total_amount").alias("avg_order_value"),
        max("order_date").alias("last_order_date")
    ) \
    .withColumn("customer_segment", 
        when(col("total_spent") > 5000, "High Value")
        .when(col("total_spent") > 1000, "Medium Value")
        .otherwise("Low Value")
    )

# Write results back to data lake
customer_analytics.write \
    .mode("overwrite") \
    .parquet("s3://data-lake/analytics/customer_segments/")
\`\`\`

## Practical Exercise

Build modern data architecture:
1. Set up NoSQL database
2. Implement data streaming
3. Create data lake structure
4. Build analytics pipeline
5. Monitor system performance
6. Test scalability
7. Document architecture

## Summary & Next Steps

Modern database technologies enable scalable, flexible data solutions. Master these technologies for contemporary applications.

**Next up**: Part 12 - Best practices and final project.`,
            readTime: 30,
            publishedAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['NoSQL', 'Cloud Databases', 'Distributed Systems', 'Data Streaming']
          },
          {
            id: 'sql-part-12',
            partNumber: 12,
            title: 'Best Practices and Final Project',
            summary: 'Apply all SQL knowledge in a comprehensive final project with industry best practices.',
            content: `# Part 12: Best Practices and Final Project

Apply all your SQL knowledge in a comprehensive final project following industry best practices.

## SQL Best Practices

### Code Quality and Standards
\`\`\`sql
-- Naming Conventions
-- Use descriptive, consistent names
CREATE TABLE customer_orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATETIME2 NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at DATETIME2 DEFAULT GETUTCDATE(),
    updated_at DATETIME2 DEFAULT GETUTCDATE()
);

-- Use proper data types
CREATE TABLE products (
    product_id INT IDENTITY(1,1) PRIMARY KEY,
    product_name NVARCHAR(100) NOT NULL,
    description NVARCHAR(500),
    price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    is_active BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETUTCDATE()
);

-- Add proper constraints
ALTER TABLE customer_orders
ADD CONSTRAINT FK_orders_customers 
FOREIGN KEY (customer_id) REFERENCES customers(customer_id);

ALTER TABLE customer_orders
ADD CONSTRAINT CK_orders_total_amount 
CHECK (total_amount > 0);

ALTER TABLE customer_orders
ADD CONSTRAINT CK_orders_status 
CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled'));
\`\`\`

### Performance Best Practices
\`\`\`sql
-- Use appropriate indexes
CREATE INDEX IX_orders_customer_date ON customer_orders(customer_id, order_date);
CREATE INDEX IX_orders_status ON customer_orders(status);
CREATE INDEX IX_products_category ON products(category_id);

-- Use covering indexes
CREATE INDEX IX_orders_customer_covering 
ON customer_orders(customer_id) 
INCLUDE (order_date, total_amount, status);

-- Optimize queries
-- Good: Use specific columns
SELECT order_id, customer_id, order_date, total_amount
FROM customer_orders
WHERE customer_id = 123
    AND order_date >= '2023-01-01';

-- Avoid: SELECT *
SELECT * FROM customer_orders; -- Don't do this

-- Use proper JOIN syntax
SELECT 
    c.customer_name,
    o.order_date,
    o.total_amount
FROM customers c
INNER JOIN customer_orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= '2023-01-01';
\`\`\`

### Security Best Practices
\`\`\`sql
-- Use parameterized queries (in application code)
-- Good: Parameterized
-- SELECT * FROM customers WHERE customer_id = @customer_id

-- Bad: String concatenation (SQL injection risk)
-- SELECT * FROM customers WHERE customer_id = ' + customer_id + '

-- Implement proper permissions
CREATE ROLE sales_team;
GRANT SELECT, INSERT, UPDATE ON customer_orders TO sales_team;
GRANT SELECT ON customers TO sales_team;
GRANT SELECT ON products TO sales_team;

-- Use stored procedures for complex operations
CREATE PROCEDURE sp_create_order
    @customer_id INT,
    @order_items NVARCHAR(MAX), -- JSON string
    @order_id INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Validate customer exists
        IF NOT EXISTS (SELECT 1 FROM customers WHERE customer_id = @customer_id)
        BEGIN
            RAISERROR('Customer not found', 16, 1);
            RETURN;
        END
        
        -- Create order
        INSERT INTO customer_orders (customer_id, order_date, total_amount, status)
        VALUES (@customer_id, GETUTCDATE(), 0, 'pending');
        
        SET @order_id = SCOPE_IDENTITY();
        
        -- Process order items (simplified)
        -- In real implementation, parse JSON and insert order details
        
        COMMIT TRANSACTION;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        THROW;
    END CATCH
END;
\`\`\`

## Final Project: E-Commerce Database System

### Project Overview
\`\`\`
Project Requirements:
1. Database Design
   - Normalized schema
   - Proper relationships
   - Data integrity constraints

2. Core Functionality
   - Customer management
   - Product catalog
   - Order processing
   - Inventory management

3. Advanced Features
   - Reporting and analytics
   - Performance optimization
   - Security implementation
   - Backup and recovery

4. Deliverables
   - Complete database schema
   - Stored procedures and functions
   - Sample data and queries
   - Documentation
\`\`\`

### Phase 1: Database Schema Design
\`\`\`sql
-- Create database
CREATE DATABASE ECommerceDB;
USE ECommerceDB;

-- Customers table
CREATE TABLE customers (
    customer_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name NVARCHAR(50) NOT NULL,
    last_name NVARCHAR(50) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    phone NVARCHAR(20),
    date_of_birth DATE,
    registration_date DATETIME2 DEFAULT GETUTCDATE(),
    is_active BIT DEFAULT 1,
    
    CONSTRAINT CK_customers_email CHECK (email LIKE '%@%.%'),
    CONSTRAINT CK_customers_dob CHECK (date_of_birth < GETDATE())
);

-- Addresses table
CREATE TABLE customer_addresses (
    address_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT NOT NULL,
    address_type VARCHAR(20) NOT NULL, -- 'billing', 'shipping'
    street_address NVARCHAR(100) NOT NULL,
    city NVARCHAR(50) NOT NULL,
    state NVARCHAR(50) NOT NULL,
    postal_code NVARCHAR(20) NOT NULL,
    country NVARCHAR(50) NOT NULL,
    is_default BIT DEFAULT 0,
    
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    CONSTRAINT CK_addresses_type CHECK (address_type IN ('billing', 'shipping'))
);

-- Categories table
CREATE TABLE categories (
    category_id INT IDENTITY(1,1) PRIMARY KEY,
    category_name NVARCHAR(50) NOT NULL,
    description NVARCHAR(200),
    parent_category_id INT,
    is_active BIT DEFAULT 1,
    
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);

-- Products table
CREATE TABLE products (
    product_id INT IDENTITY(1,1) PRIMARY KEY,
    product_name NVARCHAR(100) NOT NULL,
    description NVARCHAR(500),
    category_id INT NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    cost DECIMAL(10,2),
    weight DECIMAL(8,2),
    dimensions VARCHAR(50), -- "LxWxH"
    is_active BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETUTCDATE(),
    updated_at DATETIME2 DEFAULT GETUTCDATE(),
    
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    CONSTRAINT CK_products_price CHECK (price > 0),
    CONSTRAINT CK_products_cost CHECK (cost >= 0)
);

-- Inventory table
CREATE TABLE inventory (
    product_id INT PRIMARY KEY,
    quantity_in_stock INT NOT NULL DEFAULT 0,
    reorder_level INT NOT NULL DEFAULT 10,
    reorder_quantity INT NOT NULL DEFAULT 50,
    last_restocked DATETIME2,
    
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    CONSTRAINT CK_inventory_quantity CHECK (quantity_in_stock >= 0)
);

-- Orders table
CREATE TABLE orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT NOT NULL,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    order_date DATETIME2 DEFAULT GETUTCDATE(),
    status VARCHAR(20) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    shipping_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_address_id INT,
    billing_address_id INT,
    notes NVARCHAR(500),
    
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (shipping_address_id) REFERENCES customer_addresses(address_id),
    FOREIGN KEY (billing_address_id) REFERENCES customer_addresses(address_id),
    CONSTRAINT CK_orders_status CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    CONSTRAINT CK_orders_amounts CHECK (subtotal > 0 AND total_amount > 0)
);

-- Order items table
CREATE TABLE order_items (
    order_item_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    CONSTRAINT CK_order_items_quantity CHECK (quantity > 0),
    CONSTRAINT CK_order_items_price CHECK (unit_price > 0)
);
\`\`\`

### Phase 2: Advanced Features Implementation
\`\`\`sql
-- Create indexes for performance
CREATE INDEX IX_customers_email ON customers(email);
CREATE INDEX IX_orders_customer_date ON orders(customer_id, order_date);
CREATE INDEX IX_orders_status ON orders(status);
CREATE INDEX IX_order_items_order ON order_items(order_id);
CREATE INDEX IX_products_category ON products(category_id);
CREATE INDEX IX_products_sku ON products(sku);

-- Create views for common queries
CREATE VIEW v_customer_orders AS
SELECT 
    c.customer_id,
    c.first_name + ' ' + c.last_name as customer_name,
    c.email,
    o.order_id,
    o.order_number,
    o.order_date,
    o.status,
    o.total_amount,
    COUNT(oi.order_item_id) as item_count
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY c.customer_id, c.first_name, c.last_name, c.email, 
         o.order_id, o.order_number, o.order_date, o.status, o.total_amount;

-- Create stored procedures
CREATE PROCEDURE sp_get_customer_analytics
    @customer_id INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        c.customer_id,
        c.first_name + ' ' + c.last_name as customer_name,
        COUNT(o.order_id) as total_orders,
        SUM(o.total_amount) as total_spent,
        AVG(o.total_amount) as avg_order_value,
        MIN(o.order_date) as first_order_date,
        MAX(o.order_date) as last_order_date,
        DATEDIFF(DAY, MAX(o.order_date), GETDATE()) as days_since_last_order
    FROM customers c
    LEFT JOIN orders o ON c.customer_id = o.customer_id
    WHERE c.customer_id = @customer_id
    GROUP BY c.customer_id, c.first_name, c.last_name;
END;

-- Create functions
CREATE FUNCTION fn_calculate_order_total(@order_id INT)
RETURNS DECIMAL(10,2)
AS
BEGIN
    DECLARE @total DECIMAL(10,2);
    
    SELECT @total = SUM(total_price)
    FROM order_items
    WHERE order_id = @order_id;
    
    RETURN ISNULL(@total, 0);
END;
\`\`\`

### Phase 3: Data Management and Security
\`\`\`sql
-- Create audit table
CREATE TABLE audit_log (
    audit_id INT IDENTITY(1,1) PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id INT NOT NULL,
    action VARCHAR(10) NOT NULL, -- INSERT, UPDATE, DELETE
    old_values NVARCHAR(MAX),
    new_values NVARCHAR(MAX),
    user_name VARCHAR(50),
    timestamp DATETIME2 DEFAULT GETUTCDATE()
);

-- Create trigger for audit logging
CREATE TRIGGER tr_orders_audit
ON orders
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;
    
    IF EXISTS (SELECT * FROM inserted)
    BEGIN
        IF EXISTS (SELECT * FROM deleted)
        BEGIN
            -- UPDATE
            INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, user_name)
            SELECT 
                'orders',
                d.order_id,
                'UPDATE',
                (SELECT d.* FOR JSON AUTO),
                (SELECT i.* FOR JSON AUTO),
                USER_NAME()
            FROM deleted d
            JOIN inserted i ON d.order_id = i.order_id;
        END
        ELSE
        BEGIN
            -- INSERT
            INSERT INTO audit_log (table_name, record_id, action, new_values, user_name)
            SELECT 
                'orders',
                order_id,
                'INSERT',
                (SELECT * FOR JSON AUTO),
                USER_NAME()
            FROM inserted;
        END
    END
    ELSE
    BEGIN
        -- DELETE
        INSERT INTO audit_log (table_name, record_id, action, old_values, user_name)
        SELECT 
            'orders',
            order_id,
            'DELETE',
            (SELECT * FOR JSON AUTO),
            USER_NAME()
        FROM deleted;
    END
END;

-- Create backup procedure
CREATE PROCEDURE sp_backup_database
AS
BEGIN
    DECLARE @backup_path VARCHAR(200);
    DECLARE @backup_name VARCHAR(100);
    
    SET @backup_name = 'ECommerceDB_' + FORMAT(GETDATE(), 'yyyyMMdd_HHmmss');
    SET @backup_path = 'C:\\Backups\\' + @backup_name + '.bak';
    
    BACKUP DATABASE ECommerceDB
    TO DISK = @backup_path
    WITH FORMAT, INIT, COMPRESSION;
    
    PRINT 'Backup completed: ' + @backup_path;
END;
\`\`\`

### Phase 4: Sample Data and Testing
\`\`\`sql
-- Insert sample data
INSERT INTO categories (category_name, description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Books', 'Books and educational materials'),
('Clothing', 'Apparel and fashion items');

INSERT INTO products (product_name, description, category_id, sku, price, cost) VALUES
('Laptop Computer', 'High-performance laptop', 1, 'LAPTOP-001', 999.99, 600.00),
('Programming Book', 'Learn SQL programming', 2, 'BOOK-001', 49.99, 25.00),
('T-Shirt', 'Cotton t-shirt', 3, 'SHIRT-001', 19.99, 10.00);

INSERT INTO inventory (product_id, quantity_in_stock, reorder_level) VALUES
(1, 50, 10),
(2, 100, 20),
(3, 200, 50);

INSERT INTO customers (first_name, last_name, email, phone) VALUES
('John', 'Doe', 'john.doe@email.com', '555-0123'),
('Jane', 'Smith', 'jane.smith@email.com', '555-0456');

-- Test the system
EXEC sp_get_customer_analytics @customer_id = 1;

-- Test order creation
DECLARE @order_id INT;
EXEC sp_create_order @customer_id = 1, @order_items = '[]', @order_id = @order_id OUTPUT;
PRINT 'Created order: ' + CAST(@order_id AS VARCHAR);
\`\`\`

## Project Documentation

### Technical Documentation
\`\`\`
Database Schema Documentation:

1. Tables Overview
   - customers: Customer information
   - customer_addresses: Customer address management
   - categories: Product categories
   - products: Product catalog
   - inventory: Stock management
   - orders: Order processing
   - order_items: Order line items

2. Relationships
   - customers 1:M customer_addresses
   - customers 1:M orders
   - categories 1:M products
   - products 1:1 inventory
   - orders 1:M order_items
   - products 1:M order_items

3. Indexes
   - Performance indexes on frequently queried columns
   - Covering indexes for common queries

4. Stored Procedures
   - sp_get_customer_analytics: Customer analysis
   - sp_create_order: Order creation
   - sp_backup_database: Database backup

5. Functions
   - fn_calculate_order_total: Order total calculation
\`\`\`

### User Guide
\`\`\`
System Usage Guide:

1. Customer Management
   - Add new customers
   - Update customer information
   - Manage customer addresses

2. Product Management
   - Add products to catalog
   - Update product information
   - Manage inventory levels

3. Order Processing
   - Create new orders
   - Process order items
   - Update order status

4. Reporting
   - Customer analytics
   - Sales reports
   - Inventory reports

5. Maintenance
   - Database backups
   - Performance monitoring
   - Data cleanup
\`\`\`

## Testing and Validation

### Test Cases
\`\`\`sql
-- Test data integrity
-- Test 1: Foreign key constraints
INSERT INTO orders (customer_id, order_number, status, subtotal, total_amount)
VALUES (999, 'TEST-001', 'pending', 100.00, 100.00); -- Should fail

-- Test 2: Check constraints
INSERT INTO products (product_name, category_id, sku, price)
VALUES ('Test Product', 1, 'TEST-001', -10.00); -- Should fail

-- Test 3: Unique constraints
INSERT INTO customers (first_name, last_name, email)
VALUES ('Test', 'User', 'john.doe@email.com'); -- Should fail (duplicate email)

-- Test 4: Stored procedure functionality
EXEC sp_get_customer_analytics @customer_id = 1; -- Should return customer data

-- Test 5: Function functionality
SELECT dbo.fn_calculate_order_total(1) as order_total; -- Should return calculated total
\`\`\`

## Deployment and Maintenance

### Deployment Checklist
\`\`\`
Pre-deployment:
□ Database schema created
□ Indexes created
□ Stored procedures deployed
□ Sample data loaded
□ Security configured
□ Backups configured

Post-deployment:
□ Performance testing completed
□ User acceptance testing passed
□ Documentation updated
□ Monitoring configured
□ Maintenance procedures established
\`\`\`

### Maintenance Procedures
\`\`\`sql
-- Daily maintenance
EXEC sp_backup_database;

-- Weekly maintenance
UPDATE STATISTICS customers;
UPDATE STATISTICS orders;
UPDATE STATISTICS products;

-- Monthly maintenance
-- Check for unused indexes
-- Analyze query performance
-- Review audit logs
-- Clean up old data
\`\`\`

## Congratulations!

You've completed the comprehensive SQL series! You now have the skills to:
- Design and implement complex databases
- Write efficient SQL queries
- Optimize database performance
- Implement security measures
- Manage database administration
- Work with modern database technologies

## Next Steps

Continue your SQL journey:
1. Practice with real-world datasets
2. Explore advanced database features
3. Learn database-specific optimizations
4. Consider database certifications
5. Contribute to open-source projects

## Summary

This series has covered everything from basic SQL to advanced database administration. You're now equipped to work with databases in professional environments.

**Keep learning, keep practicing, and keep building amazing database solutions!**`,
            readTime: 35,
            publishedAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Best Practices', 'Final Project', 'Database Design', 'Professional Development']
          }
          // Additional episodes would continue here...
        ]
      },
      'advanced-ai': {
        id: 'advanced-ai',
        title: 'Advanced AI & Analytics: The Complete Guide',
        description: 'Master advanced AI techniques, machine learning, and analytics for data professionals.',
        totalEpisodes: 12,
        estimatedDuration: '12 weeks',
        difficulty: 'Intermediate',
        category: 'ai',
        prerequisites: ['Basic Python knowledge', 'Understanding of statistics'],
        learningOutcomes: [
          'Master advanced AI concepts',
          'Implement machine learning algorithms',
          'Build predictive models',
          'Apply AI to business problems',
          'Deploy AI solutions'
        ],
        episodes: [
          {
            id: 'ai-part-1',
            partNumber: 1,
            title: 'Introduction to Advanced AI Concepts',
            summary: 'Explore the fundamentals of artificial intelligence and its applications in data analysis.',
            content: `# Part 1: Introduction to Advanced AI Concepts

Welcome to Advanced AI & Analytics! This series will transform you into an AI expert.

## What is Artificial Intelligence?

### AI Fundamentals
- **Machine Learning**: Algorithms that learn from data
- **Deep Learning**: Neural networks with multiple layers
- **Natural Language Processing**: Understanding human language
- **Computer Vision**: Interpreting visual information

### Types of AI
- **Narrow AI**: Specialized for specific tasks
- **General AI**: Human-level intelligence (theoretical)
- **Superintelligence**: Beyond human capabilities (theoretical)

## AI in Data Analysis

### Traditional vs AI-Powered Analytics
- **Traditional**: Rule-based, statistical methods
- **AI-Powered**: Pattern recognition, predictive modeling
- **Hybrid**: Combining both approaches

### AI Applications in Business
- **Predictive Analytics**: Forecasting future trends
- **Anomaly Detection**: Identifying unusual patterns
- **Recommendation Systems**: Personalized suggestions
- **Automated Decision Making**: AI-driven business processes

## Machine Learning Overview

### Supervised Learning
- **Classification**: Predicting categories
- **Regression**: Predicting continuous values
- **Examples**: Email spam detection, house price prediction

### Unsupervised Learning
- **Clustering**: Grouping similar data points
- **Dimensionality Reduction**: Simplifying complex data
- **Examples**: Customer segmentation, data compression

### Reinforcement Learning
- **Learning through interaction**: Trial and error
- **Reward-based**: Optimizing for specific outcomes
- **Examples**: Game playing, autonomous vehicles

## AI Tools and Technologies

### Popular AI Frameworks
- **TensorFlow**: Google's machine learning platform
- **PyTorch**: Facebook's deep learning framework
- **Scikit-learn**: Python machine learning library
- **Keras**: High-level neural network API

### Cloud AI Services
- **AWS AI Services**: Amazon's AI platform
- **Azure AI**: Microsoft's AI services
- **Google Cloud AI**: Google's AI offerings
- **IBM Watson**: IBM's AI platform

## Practical Exercise

Set up your AI development environment:
1. Install Python and required libraries
2. Set up Jupyter notebooks
3. Explore sample datasets
4. Run your first AI model
5. Interpret the results

## Summary & Next Steps

AI is transforming data analysis. Understanding these concepts is essential for modern data professionals.

**Next up**: Part 2 - Deep learning fundamentals and neural networks.`,
            readTime: 20,
            publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['AI Fundamentals', 'Machine Learning', 'Deep Learning', 'AI Applications']
          },
          {
            id: 'ai-part-2',
            partNumber: 2,
            title: 'Deep Learning and Neural Networks',
            summary: 'Master deep learning concepts and neural network architectures for advanced AI applications.',
            content: `# Part 2: Deep Learning and Neural Networks

Dive deep into neural networks and deep learning architectures that power modern AI systems.

## Neural Network Fundamentals

### What are Neural Networks?
- **Inspired by**: Biological neurons in the brain
- **Components**: Neurons, weights, biases, activation functions
- **Purpose**: Learn complex patterns from data
- **Applications**: Image recognition, natural language processing, speech recognition

### Basic Architecture
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

class SimpleNeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        # Initialize weights and biases
        self.W1 = np.random.randn(input_size, hidden_size) * 0.1
        self.b1 = np.zeros((1, hidden_size))
        self.W2 = np.random.randn(hidden_size, output_size) * 0.1
        self.b2 = np.zeros((1, output_size))
    
    def forward(self, X):
        # Forward propagation
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.sigmoid(self.z2)
        return self.a2
    
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))
\`\`\`

## Activation Functions

### Common Activation Functions
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def tanh(x):
    return np.tanh(x)

def relu(x):
    return np.maximum(0, x)

def leaky_relu(x, alpha=0.01):
    return np.where(x > 0, x, alpha * x)

def softmax(x):
    exp_x = np.exp(x - np.max(x, axis=1, keepdims=True))
    return exp_x / np.sum(exp_x, axis=1, keepdims=True)

# Visualize activation functions
x = np.linspace(-5, 5, 100)
plt.figure(figsize=(12, 8))

plt.subplot(2, 2, 1)
plt.plot(x, sigmoid(x))
plt.title('Sigmoid')
plt.grid(True)

plt.subplot(2, 2, 2)
plt.plot(x, tanh(x))
plt.title('Tanh')
plt.grid(True)

plt.subplot(2, 2, 3)
plt.plot(x, relu(x))
plt.title('ReLU')
plt.grid(True)

plt.subplot(2, 2, 4)
plt.plot(x, leaky_relu(x))
plt.title('Leaky ReLU')
plt.grid(True)

plt.tight_layout()
plt.show()
\`\`\`

## Backpropagation Algorithm

### Gradient Descent
\`\`\`python
class NeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size, learning_rate=0.1):
        self.learning_rate = learning_rate
        # Initialize weights
        self.W1 = np.random.randn(input_size, hidden_size) * 0.1
        self.b1 = np.zeros((1, hidden_size))
        self.W2 = np.random.randn(hidden_size, output_size) * 0.1
        self.b2 = np.zeros((1, output_size))
    
    def forward(self, X):
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.sigmoid(self.z2)
        return self.a2
    
    def backward(self, X, y, output):
        m = X.shape[0]
        
        # Output layer gradients
        dz2 = output - y
        dW2 = (1/m) * np.dot(self.a1.T, dz2)
        db2 = (1/m) * np.sum(dz2, axis=0, keepdims=True)
        
        # Hidden layer gradients
        da1 = np.dot(dz2, self.W2.T)
        dz1 = da1 * self.sigmoid_derivative(self.z1)
        dW1 = (1/m) * np.dot(X.T, dz1)
        db1 = (1/m) * np.sum(dz1, axis=0, keepdims=True)
        
        # Update weights
        self.W2 -= self.learning_rate * dW2
        self.b2 -= self.learning_rate * db2
        self.W1 -= self.learning_rate * dW1
        self.b1 -= self.learning_rate * db1
    
    def sigmoid_derivative(self, x):
        s = self.sigmoid(x)
        return s * (1 - s)
\`\`\`

## Convolutional Neural Networks (CNNs)

### CNN Architecture
\`\`\`python
import tensorflow as tf
from tensorflow.keras import layers, models

def create_cnn_model(input_shape, num_classes):
    model = models.Sequential([
        # Convolutional layers
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.MaxPooling2D((2, 2)),
        
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        
        layers.Conv2D(64, (3, 3), activation='relu'),
        
        # Dense layers
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    return model

# Create model
model = create_cnn_model((28, 28, 1), 10)
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

print(model.summary())
\`\`\`

## Practical Exercise

Build a complete deep learning pipeline:
1. Choose a dataset (images, text, or time series)
2. Preprocess the data
3. Design a neural network architecture
4. Implement the model
5. Train the model
6. Evaluate performance
7. Fine-tune hyperparameters

## Summary & Next Steps

Deep learning and neural networks are powerful tools for complex AI tasks. Master these architectures for advanced applications.

**Next up**: Part 3 - Natural language processing and computer vision.`,
            readTime: 25,
            publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Deep Learning', 'Neural Networks', 'CNNs', 'RNNs']
          },
          {
            id: 'ai-part-3',
            partNumber: 3,
            title: 'Natural Language Processing and Computer Vision',
            summary: 'Master NLP and computer vision techniques for advanced AI applications.',
            content: `# Part 3: Natural Language Processing and Computer Vision

Explore the cutting-edge applications of AI in understanding text and images.

## Natural Language Processing (NLP)

### Text Preprocessing
\`\`\`python
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer, WordNetLemmatizer

def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()
    
    # Remove special characters and digits
    text = re.sub(r'[^a-zA-Z\\s]', '', text)
    
    # Tokenize
    tokens = word_tokenize(text)
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    
    # Stemming
    stemmer = PorterStemmer()
    tokens = [stemmer.stem(token) for token in tokens]
    
    # Lemmatization
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]
    
    return ' '.join(tokens)

# Example
text = "The quick brown foxes are jumping over the lazy dogs!"
processed_text = preprocess_text(text)
print(processed_text)
\`\`\`

### Word Embeddings
\`\`\`python
from gensim.models import Word2Vec
import numpy as np

# Train Word2Vec model
sentences = [
    ['the', 'quick', 'brown', 'fox'],
    ['jumps', 'over', 'the', 'lazy', 'dog'],
    ['the', 'dog', 'is', 'lazy'],
    ['the', 'fox', 'is', 'quick']
]

model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, workers=4)

# Get word vectors
fox_vector = model.wv['fox']
dog_vector = model.wv['dog']

# Find similar words
similar_words = model.wv.most_similar('fox', topn=3)
print(similar_words)

# Calculate similarity
similarity = model.wv.similarity('fox', 'dog')
print(f"Similarity between 'fox' and 'dog': {similarity}")
\`\`\`

### Sentiment Analysis
\`\`\`python
from transformers import pipeline
import torch

# Load pre-trained sentiment analysis model
sentiment_analyzer = pipeline("sentiment-analysis", 
                            model="nlptown/bert-base-multilingual-uncased-sentiment")

# Analyze sentiment
texts = [
    "I love this product! It's amazing.",
    "This is terrible. I hate it.",
    "It's okay, nothing special."
]

for text in texts:
    result = sentiment_analyzer(text)
    print(f"Text: {text}")
    print(f"Sentiment: {result[0]['label']} (Confidence: {result[0]['score']:.3f})")
    print()
\`\`\`

## Computer Vision

### Image Preprocessing
\`\`\`python
import cv2
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

def preprocess_image(image_path, target_size=(224, 224)):
    # Load image
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Resize image
    image = cv2.resize(image, target_size)
    
    # Normalize pixel values
    image = image.astype(np.float32) / 255.0
    
    # Add batch dimension
    image = np.expand_dims(image, axis=0)
    
    return image

def augment_image(image):
    # Random rotation
    angle = np.random.uniform(-15, 15)
    h, w = image.shape[:2]
    center = (w // 2, h // 2)
    rotation_matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(image, rotation_matrix, (w, h))
    
    # Random brightness adjustment
    brightness = np.random.uniform(0.8, 1.2)
    brightened = cv2.convertScaleAbs(rotated, alpha=brightness, beta=0)
    
    # Random horizontal flip
    if np.random.random() > 0.5:
        brightened = cv2.flip(brightened, 1)
    
    return brightened
\`\`\`

### Object Detection
\`\`\`python
import cv2
import numpy as np

def detect_objects(image_path):
    # Load YOLO model
    net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")
    classes = []
    
    with open("coco.names", "r") as f:
        classes = [line.strip() for line in f.readlines()]
    
    # Load image
    image = cv2.imread(image_path)
    height, width, channels = image.shape
    
    # Create blob
    blob = cv2.dnn.blobFromImage(image, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    
    # Get detections
    outputs = net.forward()
    
    # Process detections
    boxes = []
    confidences = []
    class_ids = []
    
    for output in outputs:
        for detection in output:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            
            if confidence > 0.5:
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)
                
                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)
    
    # Apply non-maximum suppression
    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
    
    # Draw detections
    for i in range(len(boxes)):
        if i in indexes:
            x, y, w, h = boxes[i]
            label = classes[class_ids[i]]
            confidence = confidences[i]
            
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(image, f"{label} {confidence:.2f}", (x, y - 10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    return image
\`\`\`

## Practical Exercise

Build an AI application:
1. Choose a domain (NLP or Computer Vision)
2. Collect and preprocess data
3. Select appropriate models
4. Train or fine-tune models
5. Evaluate performance
6. Deploy the application
7. Monitor and improve

## Summary & Next Steps

NLP and Computer Vision are powerful AI applications. Master these techniques for real-world AI solutions.

**Next up**: Part 4 - AI ethics and responsible AI development.`,
            readTime: 28,
            publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['NLP', 'Computer Vision', 'Text Processing', 'Image Analysis']
          },
          {
            id: 'ai-part-4',
            partNumber: 4,
            title: 'Computer Vision and Image Processing',
            summary: 'Master computer vision techniques for image analysis, object detection, and visual recognition.',
            content: `# Part 4: Computer Vision and Image Processing

Learn advanced computer vision techniques for image analysis, object detection, and visual recognition systems.

## Image Processing Fundamentals

### Image Preprocessing and Enhancement
\`\`\`python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image, ImageEnhance, ImageFilter
import skimage
from skimage import filters, exposure, restoration
from skimage.color import rgb2gray, gray2rgb
from skimage.transform import resize, rotate
from skimage.feature import canny, hog
from skimage.segmentation import slic, felzenszwalb

# Load sample image
def load_sample_image():
    """Load a sample image for processing"""
    # Create a sample image with various features
    img = np.zeros((400, 600, 3), dtype=np.uint8)
    
    # Add some geometric shapes
    cv2.rectangle(img, (50, 50), (150, 150), (255, 0, 0), -1)  # Blue rectangle
    cv2.circle(img, (300, 100), 50, (0, 255, 0), -1)  # Green circle
    cv2.ellipse(img, (450, 100), (60, 30), 0, 0, 360, (0, 0, 255), -1)  # Red ellipse
    
    # Add some text
    cv2.putText(img, 'Computer Vision', (200, 200), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
    
    # Add some noise
    noise = np.random.randint(0, 50, img.shape, dtype=np.uint8)
    img = cv2.add(img, noise)
    
    return img

# Load and display original image
original_img = load_sample_image()
plt.figure(figsize=(15, 10))

plt.subplot(2, 4, 1)
plt.imshow(cv2.cvtColor(original_img, cv2.COLOR_BGR2RGB))
plt.title('Original Image')
plt.axis('off')

# Convert to grayscale
gray_img = cv2.cvtColor(original_img, cv2.COLOR_BGR2GRAY)
plt.subplot(2, 4, 2)
plt.imshow(gray_img, cmap='gray')
plt.title('Grayscale')
plt.axis('off')

# Gaussian blur
blurred = cv2.GaussianBlur(original_img, (15, 15), 0)
plt.subplot(2, 4, 3)
plt.imshow(cv2.cvtColor(blurred, cv2.COLOR_BGR2RGB))
plt.title('Gaussian Blur')
plt.axis('off')

# Edge detection
edges = cv2.Canny(gray_img, 50, 150)
plt.subplot(2, 4, 4)
plt.imshow(edges, cmap='gray')
plt.title('Edge Detection (Canny)')
plt.axis('off')

# Histogram equalization
equalized = cv2.equalizeHist(gray_img)
plt.subplot(2, 4, 5)
plt.imshow(equalized, cmap='gray')
plt.title('Histogram Equalization')
plt.axis('off')

# Morphological operations
kernel = np.ones((5, 5), np.uint8)
opening = cv2.morphologyEx(edges, cv2.MORPH_OPEN, kernel)
plt.subplot(2, 4, 6)
plt.imshow(opening, cmap='gray')
plt.title('Morphological Opening')
plt.axis('off')

# Thresholding
_, thresh = cv2.threshold(gray_img, 127, 255, cv2.THRESH_BINARY)
plt.subplot(2, 4, 7)
plt.imshow(thresh, cmap='gray')
plt.title('Binary Thresholding')
plt.axis('off')

# Adaptive thresholding
adaptive_thresh = cv2.adaptiveThreshold(gray_img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
plt.subplot(2, 4, 8)
plt.imshow(adaptive_thresh, cmap='gray')
plt.title('Adaptive Thresholding')
plt.axis('off')

plt.tight_layout()
plt.show()
\`\`\`

## Feature Detection and Description

### Corner and Keypoint Detection
\`\`\`python
# Harris corner detection
def detect_corners_harris(image):
    """Detect corners using Harris corner detection"""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = np.float32(gray)
    
    # Harris corner detection
    corners = cv2.cornerHarris(gray, 2, 3, 0.04)
    corners = cv2.dilate(corners, None)
    
    # Threshold for an optimal value
    image[corners > 0.01 * corners.max()] = [0, 0, 255]
    
    return image, corners

# SIFT keypoint detection
def detect_keypoints_sift(image):
    """Detect keypoints using SIFT"""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Create SIFT detector
    sift = cv2.SIFT_create()
    
    # Detect keypoints and descriptors
    keypoints, descriptors = sift.detectAndCompute(gray, None)
    
    # Draw keypoints
    img_with_keypoints = cv2.drawKeypoints(image, keypoints, None, flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
    
    return img_with_keypoints, keypoints, descriptors

# Apply different keypoint detectors
harris_result, harris_corners = detect_corners_harris(original_img.copy())
sift_result, sift_keypoints, sift_descriptors = detect_keypoints_sift(original_img.copy())

plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.imshow(cv2.cvtColor(harris_result, cv2.COLOR_BGR2RGB))
plt.title(f'Harris Corners ({np.sum(harris_corners > 0.01 * harris_corners.max())} corners)')
plt.axis('off')

plt.subplot(1, 3, 2)
plt.imshow(cv2.cvtColor(sift_result, cv2.COLOR_BGR2RGB))
plt.title(f'SIFT Keypoints ({len(sift_keypoints)} keypoints)')
plt.axis('off')

plt.tight_layout()
plt.show()
\`\`\`

## Object Detection and Recognition

### Template Matching
\`\`\`python
# Template matching
def template_matching(image, template):
    """Perform template matching"""
    # Convert to grayscale
    gray_img = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray_template = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)
    
    # Perform template matching
    result = cv2.matchTemplate(gray_img, gray_template, cv2.TM_CCOEFF_NORMED)
    
    # Find locations where matching is above threshold
    threshold = 0.8
    locations = np.where(result >= threshold)
    
    # Draw rectangles around matches
    h, w = gray_template.shape
    matched_img = image.copy()
    
    for pt in zip(*locations[::-1]):
        cv2.rectangle(matched_img, pt, (pt[0] + w, pt[1] + h), (0, 255, 0), 2)
    
    return matched_img, result

# Create a template from the original image
template = original_img[50:150, 50:150]  # Extract a region as template

# Perform template matching
matched_img, match_result = template_matching(original_img, template)

plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.imshow(cv2.cvtColor(original_img, cv2.COLOR_BGR2RGB))
plt.title('Original Image')
plt.axis('off')

plt.subplot(1, 3, 2)
plt.imshow(cv2.cvtColor(template, cv2.COLOR_BGR2RGB))
plt.title('Template')
plt.axis('off')

plt.subplot(1, 3, 3)
plt.imshow(cv2.cvtColor(matched_img, cv2.COLOR_BGR2RGB))
plt.title('Template Matching Result')
plt.axis('off')

plt.tight_layout()
plt.show()
\`\`\`

## Image Segmentation

### Color-based Segmentation
\`\`\`python
# Color-based segmentation
def color_segmentation(image):
    """Perform color-based segmentation"""
    # Convert to different color spaces
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
    # Define color ranges for segmentation
    # Blue range
    lower_blue = np.array([100, 50, 50])
    upper_blue = np.array([130, 255, 255])
    blue_mask = cv2.inRange(hsv, lower_blue, upper_blue)
    
    # Green range
    lower_green = np.array([40, 50, 50])
    upper_green = np.array([80, 255, 255])
    green_mask = cv2.inRange(hsv, lower_green, upper_green)
    
    # Red range
    lower_red1 = np.array([0, 50, 50])
    upper_red1 = np.array([10, 255, 255])
    lower_red2 = np.array([170, 50, 50])
    upper_red2 = np.array([180, 255, 255])
    red_mask1 = cv2.inRange(hsv, lower_red1, upper_red1)
    red_mask2 = cv2.inRange(hsv, lower_red2, upper_red2)
    red_mask = red_mask1 + red_mask2
    
    # Apply masks
    blue_segmented = cv2.bitwise_and(image, image, mask=blue_mask)
    green_segmented = cv2.bitwise_and(image, image, mask=green_mask)
    red_segmented = cv2.bitwise_and(image, image, mask=red_mask)
    
    return blue_segmented, green_segmented, red_segmented, blue_mask, green_mask, red_mask

# Perform color segmentation
blue_seg, green_seg, red_seg, blue_mask, green_mask, red_mask = color_segmentation(original_img)

plt.figure(figsize=(15, 10))

plt.subplot(2, 4, 1)
plt.imshow(cv2.cvtColor(original_img, cv2.COLOR_BGR2RGB))
plt.title('Original Image')
plt.axis('off')

plt.subplot(2, 4, 2)
plt.imshow(blue_mask, cmap='gray')
plt.title('Blue Mask')
plt.axis('off')

plt.subplot(2, 4, 3)
plt.imshow(green_mask, cmap='gray')
plt.title('Green Mask')
plt.axis('off')

plt.subplot(2, 4, 4)
plt.imshow(red_mask, cmap='gray')
plt.title('Red Mask')
plt.axis('off')

plt.subplot(2, 4, 5)
plt.imshow(cv2.cvtColor(blue_seg, cv2.COLOR_BGR2RGB))
plt.title('Blue Segmented')
plt.axis('off')

plt.subplot(2, 4, 6)
plt.imshow(cv2.cvtColor(green_seg, cv2.COLOR_BGR2RGB))
plt.title('Green Segmented')
plt.axis('off')

plt.subplot(2, 4, 7)
plt.imshow(cv2.cvtColor(red_seg, cv2.COLOR_BGR2RGB))
plt.title('Red Segmented')
plt.axis('off')

plt.subplot(2, 4, 8)
# Combined segmentation
combined_mask = blue_mask + green_mask + red_mask
combined_seg = cv2.bitwise_and(original_img, original_img, mask=combined_mask)
plt.imshow(cv2.cvtColor(combined_seg, cv2.COLOR_BGR2RGB))
plt.title('Combined Segmentation')
plt.axis('off')

plt.tight_layout()
plt.show()
\`\`\`

## Practical Exercise

Apply computer vision techniques:
1. Preprocess and enhance images
2. Detect corners and keypoints
3. Match features between images
4. Perform template matching
5. Segment images by color
6. Build a simple object detection system

## Summary & Next Steps

Computer vision opens up powerful possibilities for image analysis and understanding. Master these techniques to build sophisticated visual recognition systems.

**Next up**: Part 5 - Natural language processing fundamentals.`,
            readTime: 28,
            publishedAt: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Computer Vision', 'Image Processing', 'Feature Detection', 'Segmentation']
          },
          {
            id: 'ai-part-5',
            partNumber: 5,
            title: 'Natural Language Processing Fundamentals',
            summary: 'Master the fundamentals of NLP including text preprocessing, tokenization, and language models.',
            content: `# Part 5: Natural Language Processing Fundamentals

Learn the core concepts and techniques of Natural Language Processing for text analysis and understanding.

## Text Preprocessing and Tokenization

### Basic Text Processing
\`\`\`python
import nltk
import re
import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk.tag import pos_tag
from collections import Counter
import matplotlib.pyplot as plt
import seaborn as sns
from wordcloud import WordCloud

# Download required NLTK data
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')

# Sample text for processing
sample_text = """
Artificial Intelligence (AI) is transforming the way we work and live. 
Machine learning algorithms can analyze vast amounts of data to identify patterns 
and make predictions. Natural Language Processing (NLP) enables computers to 
understand and generate human language. Deep learning models, particularly 
neural networks, have achieved remarkable success in various applications 
including image recognition, speech processing, and autonomous systems.
"""

print("Original Text:")
print(sample_text)

# Text preprocessing functions
def preprocess_text(text, remove_stopwords=True, lemmatize=True):
    """Comprehensive text preprocessing"""
    # Convert to lowercase
    text = text.lower()
    
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    
    # Remove extra whitespace
    text = re.sub(r'\\s+', ' ', text).strip()
    
    # Tokenize
    tokens = word_tokenize(text)
    
    # Remove stopwords
    if remove_stopwords:
        stop_words = set(stopwords.words('english'))
        tokens = [token for token in tokens if token not in stop_words]
    
    # Lemmatize
    if lemmatize:
        lemmatizer = WordNetLemmatizer()
        tokens = [lemmatizer.lemmatize(token) for token in tokens]
    
    return tokens

# Apply preprocessing
processed_tokens = preprocess_text(sample_text)
print(f"\\nProcessed tokens: {processed_tokens}")

# Word frequency analysis
word_freq = Counter(processed_tokens)
print(f"\\nWord frequencies: {dict(word_freq.most_common(10))}")

# Part-of-speech tagging
def analyze_pos(text):
    """Analyze part-of-speech tags"""
    tokens = word_tokenize(text)
    pos_tags = pos_tag(tokens)
    
    # Count POS tags
    pos_counts = Counter([tag for word, tag in pos_tags])
    
    return pos_tags, pos_counts

pos_tags, pos_counts = analyze_pos(sample_text)
print(f"\\nPOS tag counts: {dict(pos_counts)}")

# Visualize word frequency
plt.figure(figsize=(15, 10))

plt.subplot(2, 3, 1)
words, counts = zip(*word_freq.most_common(10))
plt.bar(words, counts)
plt.title('Top 10 Most Frequent Words')
plt.xlabel('Words')
plt.ylabel('Frequency')
plt.xticks(rotation=45)

plt.subplot(2, 3, 2)
pos_names, pos_counts_list = zip(*pos_counts.most_common(8))
plt.pie(pos_counts_list, labels=pos_names, autopct='%1.1f%%')
plt.title('Part-of-Speech Distribution')

plt.subplot(2, 3, 3)
# Word cloud
wordcloud = WordCloud(width=400, height=300, background_color='white').generate(sample_text)
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis('off')
plt.title('Word Cloud')

plt.subplot(2, 3, 4)
# Text length analysis
sentences = sent_tokenize(sample_text)
sentence_lengths = [len(word_tokenize(sent)) for sent in sentences]
plt.hist(sentence_lengths, bins=5, alpha=0.7)
plt.title('Sentence Length Distribution')
plt.xlabel('Words per Sentence')
plt.ylabel('Frequency')

plt.subplot(2, 3, 5)
# Character frequency
char_freq = Counter(sample_text.lower())
chars, char_counts = zip(*char_freq.most_common(10))
plt.bar(chars, char_counts)
plt.title('Top 10 Most Frequent Characters')
plt.xlabel('Characters')
plt.ylabel('Frequency')

plt.subplot(2, 3, 6)
# Text statistics
text_stats = {
    'Total Characters': len(sample_text),
    'Total Words': len(word_tokenize(sample_text)),
    'Total Sentences': len(sent_tokenize(sample_text)),
    'Unique Words': len(set(word_tokenize(sample_text.lower()))),
    'Average Word Length': np.mean([len(word) for word in word_tokenize(sample_text)]),
    'Average Sentence Length': np.mean(sentence_lengths)
}

stats_names = list(text_stats.keys())
stats_values = list(text_stats.values())
plt.barh(stats_names, stats_values)
plt.title('Text Statistics')
plt.xlabel('Count')

plt.tight_layout()
plt.show()
\`\`\`

## Text Vectorization

### Bag of Words and TF-IDF
\`\`\`python
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

# Sample documents
documents = [
    "Machine learning is a subset of artificial intelligence.",
    "Natural language processing helps computers understand human language.",
    "Deep learning uses neural networks with multiple layers.",
    "Computer vision enables machines to interpret visual information.",
    "Data science combines statistics, programming, and domain expertise."
]

print("Sample Documents:")
for i, doc in enumerate(documents, 1):
    print(f"{i}. {doc}")

# Bag of Words
def create_bag_of_words(docs):
    """Create bag of words representation"""
    vectorizer = CountVectorizer(stop_words='english')
    bow_matrix = vectorizer.fit_transform(docs)
    
    # Get feature names
    feature_names = vectorizer.get_feature_names_out()
    
    # Convert to DataFrame for better visualization
    bow_df = pd.DataFrame(bow_matrix.toarray(), columns=feature_names)
    
    return bow_matrix, bow_df, vectorizer

# TF-IDF
def create_tfidf(docs):
    """Create TF-IDF representation"""
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(docs)
    
    # Get feature names
    feature_names = vectorizer.get_feature_names_out()
    
    # Convert to DataFrame
    tfidf_df = pd.DataFrame(tfidf_matrix.toarray(), columns=feature_names)
    
    return tfidf_matrix, tfidf_df, vectorizer

# Create representations
bow_matrix, bow_df, bow_vectorizer = create_bag_of_words(documents)
tfidf_matrix, tfidf_df, tfidf_vectorizer = create_tfidf(documents)

print("\\nBag of Words Matrix:")
print(bow_df)

print("\\nTF-IDF Matrix:")
print(tfidf_df.round(3))

# Document similarity
def calculate_similarity(matrix, method='cosine'):
    """Calculate document similarity"""
    if method == 'cosine':
        similarity_matrix = cosine_similarity(matrix)
    else:
        # Jaccard similarity
        similarity_matrix = np.zeros((matrix.shape[0], matrix.shape[0]))
        for i in range(matrix.shape[0]):
            for j in range(matrix.shape[0]):
                intersection = np.minimum(matrix[i].toarray(), matrix[j].toarray()).sum()
                union = np.maximum(matrix[i].toarray(), matrix[j].toarray()).sum()
                similarity_matrix[i, j] = intersection / union if union > 0 else 0
    
    return similarity_matrix

# Calculate similarities
bow_similarity = calculate_similarity(bow_matrix)
tfidf_similarity = calculate_similarity(tfidf_matrix)

# Visualize similarities
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
sns.heatmap(bow_similarity, annot=True, cmap='Blues', 
            xticklabels=[f'Doc {i+1}' for i in range(len(documents))],
            yticklabels=[f'Doc {i+1}' for i in range(len(documents))])
plt.title('Bag of Words Similarity')

plt.subplot(1, 3, 2)
sns.heatmap(tfidf_similarity, annot=True, cmap='Greens',
            xticklabels=[f'Doc {i+1}' for i in range(len(documents))],
            yticklabels=[f'Doc {i+1}' for i in range(len(documents))])
plt.title('TF-IDF Similarity')

plt.subplot(1, 3, 3)
# Compare top terms
bow_top_terms = bow_df.sum().sort_values(ascending=False).head(10)
tfidf_top_terms = tfidf_df.sum().sort_values(ascending=False).head(10)

x = np.arange(len(bow_top_terms))
width = 0.35

plt.bar(x - width/2, bow_top_terms.values, width, label='Bag of Words', alpha=0.7)
plt.bar(x + width/2, tfidf_top_terms.values, width, label='TF-IDF', alpha=0.7)
plt.xlabel('Terms')
plt.ylabel('Score')
plt.title('Top Terms Comparison')
plt.xticks(x, bow_top_terms.index, rotation=45)
plt.legend()

plt.tight_layout()
plt.show()
\`\`\`

## Language Models and N-grams

### N-gram Analysis
\`\`\`python
from nltk.util import ngrams
from collections import defaultdict

def create_ngrams(text, n):
    """Create n-grams from text"""
    tokens = word_tokenize(text.lower())
    tokens = [token for token in tokens if token.isalpha()]  # Remove punctuation
    
    ngram_list = list(ngrams(tokens, n))
    ngram_freq = Counter(ngram_list)
    
    return ngram_list, ngram_freq

def analyze_ngrams(text, max_n=3):
    """Analyze n-grams of different sizes"""
    results = {}
    
    for n in range(1, max_n + 1):
        ngram_list, ngram_freq = create_ngrams(text, n)
        results[n] = {
            'ngrams': ngram_list,
            'frequencies': ngram_freq,
            'unique_count': len(ngram_freq),
            'total_count': len(ngram_list)
        }
    
    return results

# Analyze n-grams
ngram_results = analyze_ngrams(sample_text, max_n=3)

# Display results
for n, result in ngram_results.items():
    print(f"\\n{n}-grams:")
    print(f"Total {n}-grams: {result['total_count']}")
    print(f"Unique {n}-grams: {result['unique_count']}")
    print(f"Top 5 {n}-grams: {result['frequencies'].most_common(5)}")

# Visualize n-gram analysis
plt.figure(figsize=(15, 10))

for i, (n, result) in enumerate(ngram_results.items(), 1):
    plt.subplot(2, 3, i)
    top_ngrams = result['frequencies'].most_common(10)
    ngram_labels = [' '.join(ngram) for ngram, count in top_ngrams]
    counts = [count for ngram, count in top_ngrams]
    
    plt.barh(ngram_labels, counts)
    plt.title(f'Top 10 {n}-grams')
    plt.xlabel('Frequency')

# N-gram diversity
plt.subplot(2, 3, 4)
n_values = list(ngram_results.keys())
unique_counts = [result['unique_count'] for result in ngram_results.values()]
total_counts = [result['total_count'] for result in ngram_results.values()]

plt.plot(n_values, unique_counts, 'o-', label='Unique n-grams')
plt.plot(n_values, total_counts, 's-', label='Total n-grams')
plt.xlabel('N-gram Size')
plt.ylabel('Count')
plt.title('N-gram Diversity')
plt.legend()
plt.grid(True, alpha=0.3)

# N-gram coverage
plt.subplot(2, 3, 5)
coverage = [unique/total for unique, total in zip(unique_counts, total_counts)]
plt.plot(n_values, coverage, 'o-', color='green')
plt.xlabel('N-gram Size')
plt.ylabel('Coverage Ratio')
plt.title('N-gram Coverage')
plt.grid(True, alpha=0.3)

# Perplexity estimation (simplified)
plt.subplot(2, 3, 6)
perplexity = [1/coverage[i] if coverage[i] > 0 else float('inf') for i in range(len(coverage))]
plt.plot(n_values, perplexity, 'o-', color='red')
plt.xlabel('N-gram Size')
plt.ylabel('Perplexity (simplified)')
plt.title('N-gram Perplexity')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Text Classification

### Simple Text Classifier
\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sklearn.pipeline import Pipeline

# Sample dataset for text classification
text_data = [
    ("Machine learning is fascinating", "AI"),
    ("I love programming in Python", "Programming"),
    ("Data analysis is crucial for business", "Data Science"),
    ("Neural networks are powerful", "AI"),
    ("JavaScript is great for web development", "Programming"),
    ("Statistics help in data interpretation", "Data Science"),
    ("Deep learning models are complex", "AI"),
    ("React is a popular framework", "Programming"),
    ("Data visualization is important", "Data Science"),
    ("Natural language processing is amazing", "AI"),
    ("HTML and CSS are web technologies", "Programming"),
    ("Machine learning algorithms are diverse", "AI"),
    ("Database design is essential", "Data Science"),
    ("Python has many libraries", "Programming"),
    ("Big data requires special tools", "Data Science")
]

# Separate text and labels
texts = [item[0] for item in text_data]
labels = [item[1] for item in text_data]

print("Sample Dataset:")
for i, (text, label) in enumerate(text_data[:5], 1):
    print(f"{i}. {text} -> {label}")

# Split data
X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.3, random_state=42)

# Create different classifiers
classifiers = {
    'Naive Bayes': MultinomialNB(),
    'Logistic Regression': LogisticRegression(random_state=42),
    'SVM': SVC(kernel='linear', random_state=42)
}

# Train and evaluate classifiers
results = {}

for name, classifier in classifiers.items():
    # Create pipeline with TF-IDF vectorizer
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(stop_words='english')),
        ('classifier', classifier)
    ])
    
    # Train
    pipeline.fit(X_train, y_train)
    
    # Predict
    y_pred = pipeline.predict(X_test)
    
    # Evaluate
    accuracy = accuracy_score(y_test, y_pred)
    results[name] = {
        'pipeline': pipeline,
        'predictions': y_pred,
        'accuracy': accuracy
    }
    
    print(f"\\n{name} Results:")
    print(f"Accuracy: {accuracy:.3f}")
    print("Classification Report:")
    print(classification_report(y_test, y_pred))

# Visualize results
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
classifier_names = list(results.keys())
accuracies = [results[name]['accuracy'] for name in classifier_names]
plt.bar(classifier_names, accuracies, color=['skyblue', 'lightcoral', 'lightgreen'])
plt.title('Classifier Performance')
plt.ylabel('Accuracy')
plt.ylim(0, 1)
for i, v in enumerate(accuracies):
    plt.text(i, v + 0.01, f'{v:.3f}', ha='center', va='bottom')

# Confusion matrix for best classifier
best_classifier = max(results.keys(), key=lambda x: results[x]['accuracy'])
best_predictions = results[best_classifier]['predictions']

plt.subplot(1, 3, 2)
cm = confusion_matrix(y_test, best_predictions)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=sorted(set(labels)),
            yticklabels=sorted(set(labels)))
plt.title(f'Confusion Matrix - {best_classifier}')
plt.xlabel('Predicted')
plt.ylabel('Actual')

# Feature importance (for logistic regression)
if best_classifier == 'Logistic Regression':
    plt.subplot(1, 3, 3)
    feature_names = results[best_classifier]['pipeline'].named_steps['tfidf'].get_feature_names_out()
    coefficients = results[best_classifier]['pipeline'].named_steps['classifier'].coef_
    
    # Get top features for each class
    classes = results[best_classifier]['pipeline'].named_steps['classifier'].classes_
    for i, class_name in enumerate(classes):
        top_features_idx = np.argsort(coefficients[i])[-5:]
        top_features = [feature_names[idx] for idx in top_features_idx]
        top_coeffs = [coefficients[i][idx] for idx in top_features_idx]
        
        plt.barh(top_features, top_coeffs, alpha=0.7, label=class_name)
    
    plt.title('Top Features by Class')
    plt.xlabel('Coefficient Value')
    plt.legend()

plt.tight_layout()
plt.show()

# Test with new text
new_texts = [
    "I enjoy working with machine learning algorithms",
    "Python is my favorite programming language",
    "Data visualization helps in understanding patterns"
]

print("\\nPredictions for new texts:")
for text in new_texts:
    prediction = results[best_classifier]['pipeline'].predict([text])[0]
    print(f"'{text}' -> {prediction}")
\`\`\`

## Practical Exercise

Apply NLP fundamentals:
1. Preprocess and tokenize text data
2. Analyze word frequencies and POS tags
3. Create bag of words and TF-IDF representations
4. Calculate document similarities
5. Build n-gram models
6. Train text classification models
7. Evaluate model performance
8. Make predictions on new text

## Summary & Next Steps

NLP fundamentals provide the foundation for understanding and processing human language. Master these techniques to build sophisticated language understanding systems.

**Next up**: Part 6 - Advanced NLP and language models.`,
            readTime: 29,
            publishedAt: new Date(Date.now() + 33 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['NLP', 'Text Processing', 'Tokenization', 'Vectorization', 'Classification']
          },
          {
            id: 'ai-part-6',
            partNumber: 6,
            title: 'Advanced NLP and Language Models',
            summary: 'Explore advanced NLP techniques including word embeddings, transformers, and modern language models.',
            content: `# Part 6: Advanced NLP and Language Models

Dive deep into advanced NLP techniques, word embeddings, and modern language models that power today's AI systems.

## Word Embeddings and Vector Representations

### Word2Vec and GloVe
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
import gensim
from gensim.models import Word2Vec, KeyedVectors
import nltk
from nltk.tokenize import word_tokenize
import re

# Download required data
nltk.download('punkt')

# Sample text corpus
corpus = [
    "Machine learning is a subset of artificial intelligence that focuses on algorithms.",
    "Deep learning uses neural networks with multiple layers to process data.",
    "Natural language processing helps computers understand human language.",
    "Computer vision enables machines to interpret and analyze visual information.",
    "Data science combines statistics, programming, and domain expertise.",
    "Artificial intelligence is transforming various industries and applications.",
    "Neural networks are inspired by the structure of the human brain.",
    "Algorithms can learn patterns from data without explicit programming.",
    "Text analysis involves processing and understanding written language.",
    "Image recognition is a key application of computer vision technology."
]

# Preprocess text
def preprocess_corpus(texts):
    """Preprocess text corpus for word embeddings"""
    processed_texts = []
    for text in texts:
        # Convert to lowercase and tokenize
        tokens = word_tokenize(text.lower())
        # Remove punctuation and short words
        tokens = [token for token in tokens if token.isalpha() and len(token) > 2]
        processed_texts.append(tokens)
    return processed_texts

# Process corpus
processed_corpus = preprocess_corpus(corpus)
print("Processed corpus:")
for i, text in enumerate(processed_corpus[:3], 1):
    print(f"{i}. {text}")

# Train Word2Vec model
def train_word2vec(corpus, vector_size=100, window=5, min_count=1):
    """Train Word2Vec model"""
    model = Word2Vec(
        sentences=corpus,
        vector_size=vector_size,
        window=window,
        min_count=min_count,
        workers=4,
        sg=1,  # Skip-gram
        epochs=100
    )
    return model

# Train models with different parameters
models = {}
for sg in [0, 1]:  # CBOW and Skip-gram
    model_name = "Skip-gram" if sg else "CBOW"
    models[model_name] = train_word2vec(processed_corpus, sg=sg)

# Analyze word similarities
def analyze_word_similarities(model, words):
    """Analyze word similarities and relationships"""
    similarities = {}
    
    for word in words:
        if word in model.wv:
            # Find most similar words
            similar_words = model.wv.most_similar(word, topn=5)
            similarities[word] = similar_words
            
            print(f"\\nWords similar to '{word}':")
            for similar_word, score in similar_words:
                print(f"  {similar_word}: {score:.3f}")
    
    return similarities

# Test words
test_words = ['machine', 'learning', 'neural', 'data', 'artificial']
similarities = analyze_word_similarities(models['Skip-gram'], test_words)

# Visualize word embeddings
def visualize_embeddings(model, words, title):
    """Visualize word embeddings using PCA and t-SNE"""
    # Get word vectors
    word_vectors = []
    word_labels = []
    
    for word in words:
        if word in model.wv:
            word_vectors.append(model.wv[word])
            word_labels.append(word)
    
    if len(word_vectors) < 2:
        print(f"Not enough words found for visualization: {word_labels}")
        return
    
    word_vectors = np.array(word_vectors)
    
    # PCA visualization
    pca = PCA(n_components=2)
    pca_result = pca.fit_transform(word_vectors)
    
    # t-SNE visualization
    tsne = TSNE(n_components=2, random_state=42)
    tsne_result = tsne.fit_transform(word_vectors)
    
    # Plot
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
    
    # PCA plot
    ax1.scatter(pca_result[:, 0], pca_result[:, 1], alpha=0.7)
    for i, word in enumerate(word_labels):
        ax1.annotate(word, (pca_result[i, 0], pca_result[i, 1]))
    ax1.set_title(f'{title} - PCA Visualization')
    ax1.set_xlabel('PC1')
    ax1.set_ylabel('PC2')
    ax1.grid(True, alpha=0.3)
    
    # t-SNE plot
    ax2.scatter(tsne_result[:, 0], tsne_result[:, 1], alpha=0.7)
    for i, word in enumerate(word_labels):
        ax2.annotate(word, (tsne_result[i, 0], tsne_result[i, 1]))
    ax2.set_title(f'{title} - t-SNE Visualization')
    ax2.set_xlabel('t-SNE 1')
    ax2.set_ylabel('t-SNE 2')
    ax2.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()

# Visualize embeddings
visualize_embeddings(models['Skip-gram'], test_words, 'Word2Vec Skip-gram')

# Word analogy tasks
def word_analogy(model, word1, word2, word3):
    """Perform word analogy: word1 is to word2 as word3 is to ?"""
    try:
        result = model.wv.most_similar(positive=[word2, word3], negative=[word1], topn=3)
        print(f"\\nAnalogy: {word1} is to {word2} as {word3} is to:")
        for word, score in result:
            print(f"  {word}: {score:.3f}")
        return result
    except KeyError as e:
        print(f"Word not found in vocabulary: {e}")
        return None

# Test analogies
analogies = [
    ('machine', 'learning', 'neural'),
    ('artificial', 'intelligence', 'computer'),
    ('data', 'science', 'text')
]

for word1, word2, word3 in analogies:
    word_analogy(models['Skip-gram'], word1, word2, word3)
\`\`\`

## Transformer Architecture

### Understanding Attention Mechanisms
\`\`\`python
import torch
import torch.nn as nn
import torch.nn.functional as F
import math
import matplotlib.pyplot as plt
import seaborn as sns

# Simple attention mechanism implementation
class SimpleAttention(nn.Module):
    def __init__(self, d_model):
        super(SimpleAttention, self).__init__()
        self.d_model = d_model
        self.query = nn.Linear(d_model, d_model)
        self.key = nn.Linear(d_model, d_model)
        self.value = nn.Linear(d_model, d_model)
        
    def forward(self, x):
        batch_size, seq_len, d_model = x.size()
        
        # Compute Q, K, V
        Q = self.query(x)
        K = self.key(x)
        V = self.value(x)
        
        # Compute attention scores
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_model)
        attention_weights = F.softmax(scores, dim=-1)
        
        # Apply attention to values
        output = torch.matmul(attention_weights, V)
        
        return output, attention_weights

# Multi-head attention
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super(MultiHeadAttention, self).__init__()
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
        
    def forward(self, x):
        batch_size, seq_len, d_model = x.size()
        
        # Linear transformations
        Q = self.W_q(x)
        K = self.W_k(x)
        V = self.W_v(x)
        
        # Reshape for multi-head attention
        Q = Q.view(batch_size, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        K = K.view(batch_size, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        V = V.view(batch_size, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        
        # Compute attention
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        attention_weights = F.softmax(scores, dim=-1)
        attention_output = torch.matmul(attention_weights, V)
        
        # Concatenate heads
        attention_output = attention_output.transpose(1, 2).contiguous().view(
            batch_size, seq_len, d_model
        )
        
        # Final linear transformation
        output = self.W_o(attention_output)
        
        return output, attention_weights

# Positional encoding
class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000):
        super(PositionalEncoding, self).__init__()
        
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * 
                           (-math.log(10000.0) / d_model))
        
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        pe = pe.unsqueeze(0).transpose(0, 1)
        
        self.register_buffer('pe', pe)
        
    def forward(self, x):
        return x + self.pe[:x.size(0), :]

# Simple Transformer block
class TransformerBlock(nn.Module):
    def __init__(self, d_model, num_heads, d_ff, dropout=0.1):
        super(TransformerBlock, self).__init__()
        self.attention = MultiHeadAttention(d_model, num_heads)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        
        self.feed_forward = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.ReLU(),
            nn.Linear(d_ff, d_model)
        )
        
        self.dropout = nn.Dropout(dropout)
        
    def forward(self, x):
        # Self-attention
        attn_output, attention_weights = self.attention(x)
        x = self.norm1(x + self.dropout(attn_output))
        
        # Feed forward
        ff_output = self.feed_forward(x)
        x = self.norm2(x + self.dropout(ff_output))
        
        return x, attention_weights

# Demo with sample data
def demo_transformer():
    """Demonstrate transformer components"""
    d_model = 128
    num_heads = 8
    seq_len = 10
    batch_size = 1
    
    # Create sample input
    x = torch.randn(batch_size, seq_len, d_model)
    
    # Positional encoding
    pos_encoding = PositionalEncoding(d_model)
    x_with_pos = pos_encoding(x.transpose(0, 1)).transpose(0, 1)
    
    # Transformer block
    transformer_block = TransformerBlock(d_model, num_heads, d_ff=512)
    
    # Forward pass
    output, attention_weights = transformer_block(x_with_pos)
    
    print(f"Input shape: {x.shape}")
    print(f"Output shape: {output.shape}")
    print(f"Attention weights shape: {attention_weights.shape}")
    
    # Visualize attention weights
    plt.figure(figsize=(12, 8))
    
    # Average attention across heads
    avg_attention = attention_weights.mean(dim=1).squeeze(0)
    
    plt.subplot(2, 2, 1)
    sns.heatmap(avg_attention.detach().numpy(), cmap='Blues', cbar=True)
    plt.title('Average Attention Weights')
    plt.xlabel('Key Position')
    plt.ylabel('Query Position')
    
    # Individual head attention
    for i in range(min(4, num_heads)):
        plt.subplot(2, 2, i+2)
        head_attention = attention_weights[0, i, :, :].detach().numpy()
        sns.heatmap(head_attention, cmap='Blues', cbar=True)
        plt.title(f'Head {i+1} Attention')
        plt.xlabel('Key Position')
        plt.ylabel('Query Position')
    
    plt.tight_layout()
    plt.show()
    
    return output, attention_weights

# Run demo
output, attention_weights = demo_transformer()
\`\`\`

## Modern Language Models

### BERT and GPT-style Models
\`\`\`python
import transformers
from transformers import AutoTokenizer, AutoModel, pipeline
import torch
import numpy as np
import matplotlib.pyplot as plt

# Load pre-trained models
def load_models():
    """Load different pre-trained language models"""
    models = {}
    
    # BERT model
    try:
        models['bert'] = {
            'tokenizer': AutoTokenizer.from_pretrained('bert-base-uncased'),
            'model': AutoModel.from_pretrained('bert-base-uncased')
        }
    except:
        print("BERT model not available")
    
    # GPT-2 model
    try:
        models['gpt2'] = {
            'tokenizer': AutoTokenizer.from_pretrained('gpt2'),
            'model': AutoModel.from_pretrained('gpt2')
        }
    except:
        print("GPT-2 model not available")
    
    return models

# Text classification with BERT
def bert_text_classification():
    """Demonstrate BERT for text classification"""
    try:
        # Load classification pipeline
        classifier = pipeline("sentiment-analysis", 
                            model="distilbert-base-uncased-finetuned-sst-2-english")
        
        # Test texts
        texts = [
            "I love machine learning and artificial intelligence!",
            "This is a terrible implementation of the algorithm.",
            "The weather is okay today, nothing special.",
            "Natural language processing is fascinating and complex.",
            "I hate debugging code, it's so frustrating."
        ]
        
        # Get predictions
        results = classifier(texts)
        
        print("BERT Sentiment Analysis Results:")
        for text, result in zip(texts, results):
            print(f"Text: {text}")
            print(f"Label: {result['label']}, Score: {result['score']:.3f}")
            print()
        
        return results
        
    except Exception as e:
        print(f"Error in BERT classification: {e}")
        return None

# Text generation with GPT-2
def gpt2_text_generation():
    """Demonstrate GPT-2 for text generation"""
    try:
        # Load generation pipeline
        generator = pipeline("text-generation", model="gpt2")
        
        # Prompts
        prompts = [
            "Artificial intelligence is",
            "Machine learning algorithms can",
            "The future of technology will be"
        ]
        
        print("GPT-2 Text Generation:")
        for prompt in prompts:
            # Generate text
            result = generator(prompt, max_length=50, num_return_sequences=1, 
                             temperature=0.7, do_sample=True)
            
            generated_text = result[0]['generated_text']
            print(f"Prompt: {prompt}")
            print(f"Generated: {generated_text}")
            print()
        
        return True
        
    except Exception as e:
        print(f"Error in GPT-2 generation: {e}")
        return None

# Named Entity Recognition
def bert_ner():
    """Demonstrate BERT for Named Entity Recognition"""
    try:
        # Load NER pipeline
        ner_pipeline = pipeline("ner", model="dbmdz/bert-large-cased-finetuned-conll03-english")
        
        # Test text
        text = "Apple Inc. was founded by Steve Jobs in Cupertino, California in 1976."
        
        # Get NER results
        entities = ner_pipeline(text)
        
        print("BERT Named Entity Recognition:")
        print(f"Text: {text}")
        print("Entities found:")
        
        for entity in entities:
            print(f"  {entity['word']}: {entity['entity']} (confidence: {entity['score']:.3f})")
        
        return entities
        
    except Exception as e:
        print(f"Error in BERT NER: {e}")
        return None

# Question Answering
def bert_qa():
    """Demonstrate BERT for Question Answering"""
    try:
        # Load QA pipeline
        qa_pipeline = pipeline("question-answering", 
                              model="distilbert-base-cased-distilled-squad")
        
        # Context and questions
        context = """
        Artificial Intelligence (AI) is intelligence demonstrated by machines, 
        in contrast to the natural intelligence displayed by humans and animals. 
        Leading AI textbooks define the field as the study of "intelligent agents": 
        any device that perceives its environment and takes actions that maximize 
        its chance of successfully achieving its goals.
        """
        
        questions = [
            "What is artificial intelligence?",
            "How do AI textbooks define the field?",
            "What do intelligent agents do?"
        ]
        
        print("BERT Question Answering:")
        print(f"Context: {context.strip()}")
        print()
        
        for question in questions:
            result = qa_pipeline(question=question, context=context)
            print(f"Question: {question}")
            print(f"Answer: {result['answer']}")
            print(f"Confidence: {result['score']:.3f}")
            print()
        
        return True
        
    except Exception as e:
        print(f"Error in BERT QA: {e}")
        return None

# Run demonstrations
print("=== BERT Text Classification ===")
bert_classification_results = bert_text_classification()

print("\\n=== GPT-2 Text Generation ===")
gpt2_generation_results = gpt2_text_generation()

print("\\n=== BERT Named Entity Recognition ===")
bert_ner_results = bert_ner()

print("\\n=== BERT Question Answering ===")
bert_qa_results = bert_qa()
\`\`\`

## Advanced NLP Applications

### Text Summarization and Translation
\`\`\`python
# Text summarization
def text_summarization():
    """Demonstrate text summarization"""
    try:
        # Load summarization pipeline
        summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
        
        # Long text to summarize
        long_text = """
        Artificial Intelligence (AI) has become one of the most transformative 
        technologies of the 21st century. From healthcare to finance, from 
        transportation to entertainment, AI is reshaping industries and creating 
        new possibilities. Machine learning algorithms can now process vast 
        amounts of data to identify patterns and make predictions with 
        unprecedented accuracy. Deep learning models, particularly neural 
        networks, have achieved remarkable success in tasks such as image 
        recognition, natural language processing, and game playing. Companies 
        are investing billions of dollars in AI research and development, 
        recognizing its potential to drive innovation and competitive advantage. 
        However, the rapid advancement of AI also raises important questions 
        about ethics, privacy, and the future of work. As AI systems become 
        more sophisticated, society must grapple with issues of bias, 
        transparency, and accountability. The future of AI holds both 
        tremendous promise and significant challenges that will require 
        careful consideration and responsible development.
        """
        
        # Summarize
        summary = summarizer(long_text, max_length=100, min_length=30, do_sample=False)
        
        print("Text Summarization:")
        print(f"Original length: {len(long_text)} characters")
        print(f"Summary: {summary[0]['summary_text']}")
        print(f"Summary length: {len(summary[0]['summary_text'])} characters")
        
        return summary
        
    except Exception as e:
        print(f"Error in text summarization: {e}")
        return None

# Text translation
def text_translation():
    """Demonstrate text translation"""
    try:
        # Load translation pipeline
        translator = pipeline("translation_en_to_fr", model="t5-small")
        
        # English texts to translate
        english_texts = [
            "Hello, how are you today?",
            "Machine learning is fascinating.",
            "Artificial intelligence will change the world."
        ]
        
        print("Text Translation (English to French):")
        for text in english_texts:
            translation = translator(text, max_length=100)
            print(f"English: {text}")
            print(f"French: {translation[0]['translation_text']}")
            print()
        
        return True
        
    except Exception as e:
        print(f"Error in text translation: {e}")
        return None

# Zero-shot classification
def zero_shot_classification():
    """Demonstrate zero-shot text classification"""
    try:
        # Load zero-shot classifier
        classifier = pipeline("zero-shot-classification", 
                            model="facebook/bart-large-mnli")
        
        # Text to classify
        text = "I love working with machine learning algorithms and building AI systems."
        
        # Candidate labels
        candidate_labels = ["technology", "sports", "politics", "science", "entertainment"]
        
        # Classify
        result = classifier(text, candidate_labels)
        
        print("Zero-shot Text Classification:")
        print(f"Text: {text}")
        print("Classification results:")
        for label, score in zip(result['labels'], result['scores']):
            print(f"  {label}: {score:.3f}")
        
        return result
        
    except Exception as e:
        print(f"Error in zero-shot classification: {e}")
        return None

# Run advanced NLP applications
print("=== Text Summarization ===")
summarization_results = text_summarization()

print("\\n=== Text Translation ===")
translation_results = text_translation()

print("\\n=== Zero-shot Classification ===")
zero_shot_results = zero_shot_classification()
\`\`\`

## Practical Exercise

Apply advanced NLP techniques:
1. Train word embeddings with Word2Vec
2. Analyze word similarities and analogies
3. Implement attention mechanisms
4. Use pre-trained language models
5. Perform text classification and generation
6. Extract named entities
7. Build question-answering systems
8. Create text summarization and translation

## Summary & Next Steps

Advanced NLP and language models represent the cutting edge of AI language understanding. Master these techniques to build sophisticated language AI systems.

**Next up**: Part 7 - Deep learning architectures.`,
            readTime: 30,
            publishedAt: new Date(Date.now() + 34 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Word Embeddings', 'Transformers', 'BERT', 'GPT', 'Language Models']
          },
          {
            id: 'ai-part-7',
            partNumber: 7,
            title: 'Deep Learning Architectures',
            summary: 'Explore advanced deep learning architectures including CNNs, RNNs, and modern neural network designs.',
            content: `# Part 7: Deep Learning Architectures

Master advanced deep learning architectures and understand how to design and implement sophisticated neural networks.

## Convolutional Neural Networks (CNNs)

### Advanced CNN Architectures
\`\`\`python
import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision
import torchvision.transforms as transforms
import matplotlib.pyplot as plt
import numpy as np
from torch.utils.data import DataLoader
import torch.optim as optim

# Advanced CNN Architecture
class AdvancedCNN(nn.Module):
    def __init__(self, num_classes=10):
        super(AdvancedCNN, self).__init__()
        
        # Feature extraction layers
        self.conv1 = nn.Conv2d(3, 64, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(64)
        self.conv2 = nn.Conv2d(64, 64, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)
        self.pool1 = nn.MaxPool2d(2, 2)
        self.dropout1 = nn.Dropout2d(0.25)
        
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.bn3 = nn.BatchNorm2d(128)
        self.conv4 = nn.Conv2d(128, 128, kernel_size=3, padding=1)
        self.bn4 = nn.BatchNorm2d(128)
        self.pool2 = nn.MaxPool2d(2, 2)
        self.dropout2 = nn.Dropout2d(0.25)
        
        self.conv5 = nn.Conv2d(128, 256, kernel_size=3, padding=1)
        self.bn5 = nn.BatchNorm2d(256)
        self.conv6 = nn.Conv2d(256, 256, kernel_size=3, padding=1)
        self.bn6 = nn.BatchNorm2d(256)
        self.pool3 = nn.MaxPool2d(2, 2)
        self.dropout3 = nn.Dropout2d(0.25)
        
        # Global average pooling
        self.global_avg_pool = nn.AdaptiveAvgPool2d((1, 1))
        
        # Classifier
        self.fc1 = nn.Linear(256, 512)
        self.dropout4 = nn.Dropout(0.5)
        self.fc2 = nn.Linear(512, num_classes)
        
    def forward(self, x):
        # First block
        x = F.relu(self.bn1(self.conv1(x)))
        x = F.relu(self.bn2(self.conv2(x)))
        x = self.pool1(x)
        x = self.dropout1(x)
        
        # Second block
        x = F.relu(self.bn3(self.conv3(x)))
        x = F.relu(self.bn4(self.conv4(x)))
        x = self.pool2(x)
        x = self.dropout2(x)
        
        # Third block
        x = F.relu(self.bn5(self.conv5(x)))
        x = F.relu(self.bn6(self.conv6(x)))
        x = self.pool3(x)
        x = self.dropout3(x)
        
        # Global average pooling
        x = self.global_avg_pool(x)
        x = x.view(x.size(0), -1)
        
        # Classifier
        x = F.relu(self.fc1(x))
        x = self.dropout4(x)
        x = self.fc2(x)
        
        return x

# Residual Block for ResNet
class ResidualBlock(nn.Module):
    def __init__(self, in_channels, out_channels, stride=1):
        super(ResidualBlock, self).__init__()
        
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3, 
                              stride=stride, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, 
                              stride=1, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(out_channels)
        
        # Shortcut connection
        self.shortcut = nn.Sequential()
        if stride != 1 or in_channels != out_channels:
            self.shortcut = nn.Sequential(
                nn.Conv2d(in_channels, out_channels, kernel_size=1, 
                         stride=stride, bias=False),
                nn.BatchNorm2d(out_channels)
            )
    
    def forward(self, x):
        residual = x
        
        out = F.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        
        out += self.shortcut(residual)
        out = F.relu(out)
        
        return out

# Simple ResNet
class SimpleResNet(nn.Module):
    def __init__(self, num_classes=10):
        super(SimpleResNet, self).__init__()
        
        self.conv1 = nn.Conv2d(3, 64, kernel_size=7, stride=2, padding=3, bias=False)
        self.bn1 = nn.BatchNorm2d(64)
        self.maxpool = nn.MaxPool2d(kernel_size=3, stride=2, padding=1)
        
        # Residual layers
        self.layer1 = self._make_layer(64, 64, 2, stride=1)
        self.layer2 = self._make_layer(64, 128, 2, stride=2)
        self.layer3 = self._make_layer(128, 256, 2, stride=2)
        
        self.avgpool = nn.AdaptiveAvgPool2d((1, 1))
        self.fc = nn.Linear(256, num_classes)
        
    def _make_layer(self, in_channels, out_channels, blocks, stride):
        layers = []
        layers.append(ResidualBlock(in_channels, out_channels, stride))
        for _ in range(1, blocks):
            layers.append(ResidualBlock(out_channels, out_channels))
        return nn.Sequential(*layers)
    
    def forward(self, x):
        x = F.relu(self.bn1(self.conv1(x)))
        x = self.maxpool(x)
        
        x = self.layer1(x)
        x = self.layer2(x)
        x = self.layer3(x)
        
        x = self.avgpool(x)
        x = x.view(x.size(0), -1)
        x = self.fc(x)
        
        return x

# Create models
advanced_cnn = AdvancedCNN(num_classes=10)
simple_resnet = SimpleResNet(num_classes=10)

print("Advanced CNN Architecture:")
print(advanced_cnn)
print(f"\\nTotal parameters: {sum(p.numel() for p in advanced_cnn.parameters()):,}")

print("\\nSimple ResNet Architecture:")
print(simple_resnet)
print(f"\\nTotal parameters: {sum(p.numel() for p in simple_resnet.parameters()):,}")

# Visualize model architectures
def visualize_model_architecture():
    """Visualize model architectures"""
    # Create sample input
    sample_input = torch.randn(1, 3, 32, 32)
    
    # Get intermediate outputs for visualization
    def get_layer_outputs(model, x):
        outputs = []
        hooks = []
        
        def hook_fn(module, input, output):
            outputs.append(output)
        
        # Register hooks for conv layers
        for name, module in model.named_modules():
            if isinstance(module, nn.Conv2d):
                hooks.append(module.register_forward_hook(hook_fn))
        
        # Forward pass
        with torch.no_grad():
            _ = model(x)
        
        # Remove hooks
        for hook in hooks:
            hook.remove()
        
        return outputs
    
    # Get outputs from both models
    cnn_outputs = get_layer_outputs(advanced_cnn, sample_input)
    resnet_outputs = get_layer_outputs(simple_resnet, sample_input)
    
    # Visualize feature maps
    fig, axes = plt.subplots(2, 4, figsize=(16, 8))
    
    # CNN feature maps
    for i, output in enumerate(cnn_outputs[:4]):
        feature_map = output[0, 0].detach().numpy()  # First channel of first sample
        axes[0, i].imshow(feature_map, cmap='viridis')
        axes[0, i].set_title(f'CNN Conv Layer {i+1}')
        axes[0, i].axis('off')
    
    # ResNet feature maps
    for i, output in enumerate(resnet_outputs[:4]):
        feature_map = output[0, 0].detach().numpy()  # First channel of first sample
        axes[1, i].imshow(feature_map, cmap='viridis')
        axes[1, i].set_title(f'ResNet Conv Layer {i+1}')
        axes[1, i].axis('off')
    
    plt.tight_layout()
    plt.show()

visualize_model_architecture()
\`\`\`

## Recurrent Neural Networks (RNNs)

### Advanced RNN Architectures
\`\`\`python
# LSTM Architecture
class AdvancedLSTM(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, num_classes, dropout=0.2):
        super(AdvancedLSTM, self).__init__()
        
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        
        # LSTM layers
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, 
                           batch_first=True, dropout=dropout, bidirectional=True)
        
        # Attention mechanism
        self.attention = nn.MultiheadAttention(hidden_size * 2, num_heads=8, dropout=dropout)
        
        # Classifier
        self.fc1 = nn.Linear(hidden_size * 2, hidden_size)
        self.dropout = nn.Dropout(dropout)
        self.fc2 = nn.Linear(hidden_size, num_classes)
        
    def forward(self, x):
        batch_size = x.size(0)
        
        # Initialize hidden state
        h0 = torch.zeros(self.num_layers * 2, batch_size, self.hidden_size)
        c0 = torch.zeros(self.num_layers * 2, batch_size, self.hidden_size)
        
        # LSTM forward pass
        lstm_out, (hn, cn) = self.lstm(x, (h0, c0))
        
        # Apply attention
        attn_out, attn_weights = self.attention(lstm_out, lstm_out, lstm_out)
        
        # Global average pooling
        pooled = torch.mean(attn_out, dim=1)
        
        # Classifier
        out = F.relu(self.fc1(pooled))
        out = self.dropout(out)
        out = self.fc2(out)
        
        return out, attn_weights

# GRU with Attention
class GRUWithAttention(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, num_classes, dropout=0.2):
        super(GRUWithAttention, self).__init__()
        
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        
        # GRU layers
        self.gru = nn.GRU(input_size, hidden_size, num_layers, 
                         batch_first=True, dropout=dropout, bidirectional=True)
        
        # Attention weights
        self.attention_weights = nn.Linear(hidden_size * 2, 1)
        
        # Classifier
        self.fc = nn.Linear(hidden_size * 2, num_classes)
        
    def forward(self, x):
        batch_size = x.size(0)
        
        # Initialize hidden state
        h0 = torch.zeros(self.num_layers * 2, batch_size, self.hidden_size)
        
        # GRU forward pass
        gru_out, hn = self.gru(x, h0)
        
        # Calculate attention weights
        attention_scores = self.attention_weights(gru_out)
        attention_weights = F.softmax(attention_scores, dim=1)
        
        # Apply attention
        context_vector = torch.sum(gru_out * attention_weights, dim=1)
        
        # Classifier
        out = self.fc(context_vector)
        
        return out, attention_weights

# Transformer-based sequence model
class TransformerSequenceModel(nn.Module):
    def __init__(self, input_size, d_model, num_heads, num_layers, num_classes, dropout=0.1):
        super(TransformerSequenceModel, self).__init__()
        
        self.d_model = d_model
        
        # Input projection
        self.input_projection = nn.Linear(input_size, d_model)
        
        # Positional encoding
        self.pos_encoding = PositionalEncoding(d_model)
        
        # Transformer encoder
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model,
            nhead=num_heads,
            dim_feedforward=d_model * 4,
            dropout=dropout,
            batch_first=True
        )
        self.transformer_encoder = nn.TransformerEncoder(encoder_layer, num_layers)
        
        # Classifier
        self.fc = nn.Linear(d_model, num_classes)
        
    def forward(self, x):
        # Input projection
        x = self.input_projection(x)
        
        # Add positional encoding
        x = self.pos_encoding(x)
        
        # Transformer encoding
        encoded = self.transformer_encoder(x)
        
        # Global average pooling
        pooled = torch.mean(encoded, dim=1)
        
        # Classification
        out = self.fc(pooled)
        
        return out

# Positional encoding for transformer
class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000):
        super(PositionalEncoding, self).__init__()
        
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * 
                           (-torch.log(torch.tensor(10000.0)) / d_model))
        
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        pe = pe.unsqueeze(0).transpose(0, 1)
        
        self.register_buffer('pe', pe)
        
    def forward(self, x):
        return x + self.pe[:x.size(1), :].transpose(0, 1)

# Create RNN models
input_size = 100
hidden_size = 128
num_layers = 2
num_classes = 10
seq_length = 50

lstm_model = AdvancedLSTM(input_size, hidden_size, num_layers, num_classes)
gru_model = GRUWithAttention(input_size, hidden_size, num_layers, num_classes)
transformer_model = TransformerSequenceModel(input_size, hidden_size, 8, num_layers, num_classes)

print("\\nLSTM Model:")
print(lstm_model)
print(f"Parameters: {sum(p.numel() for p in lstm_model.parameters()):,}")

print("\\nGRU Model:")
print(gru_model)
print(f"Parameters: {sum(p.numel() for p in gru_model.parameters()):,}")

print("\\nTransformer Model:")
print(transformer_model)
print(f"Parameters: {sum(p.numel() for p in transformer_model.parameters()):,}")

# Test models with sample data
def test_rnn_models():
    """Test RNN models with sample data"""
    batch_size = 4
    sample_input = torch.randn(batch_size, seq_length, input_size)
    
    # Test LSTM
    lstm_output, lstm_attention = lstm_model(sample_input)
    print(f"\\nLSTM output shape: {lstm_output.shape}")
    print(f"LSTM attention shape: {lstm_attention.shape}")
    
    # Test GRU
    gru_output, gru_attention = gru_model(sample_input)
    print(f"GRU output shape: {gru_output.shape}")
    print(f"GRU attention shape: {gru_attention.shape}")
    
    # Test Transformer
    transformer_output = transformer_model(sample_input)
    print(f"Transformer output shape: {transformer_output.shape}")
    
    return lstm_output, gru_output, transformer_output

test_outputs = test_rnn_models()
\`\`\`

## Autoencoders and Generative Models

### Variational Autoencoder (VAE)
\`\`\`python
# Variational Autoencoder
class VAE(nn.Module):
    def __init__(self, input_size, hidden_size, latent_size):
        super(VAE, self).__init__()
        
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.latent_size = latent_size
        
        # Encoder
        self.encoder = nn.Sequential(
            nn.Linear(input_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, hidden_size),
            nn.ReLU()
        )
        
        # Latent space
        self.mu_layer = nn.Linear(hidden_size, latent_size)
        self.logvar_layer = nn.Linear(hidden_size, latent_size)
        
        # Decoder
        self.decoder = nn.Sequential(
            nn.Linear(latent_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, input_size),
            nn.Sigmoid()
        )
        
    def encode(self, x):
        h = self.encoder(x)
        mu = self.mu_layer(h)
        logvar = self.logvar_layer(h)
        return mu, logvar
    
    def reparameterize(self, mu, logvar):
        std = torch.exp(0.5 * logvar)
        eps = torch.randn_like(std)
        return mu + eps * std
    
    def decode(self, z):
        return self.decoder(z)
    
    def forward(self, x):
        mu, logvar = self.encode(x)
        z = self.reparameterize(mu, logvar)
        recon_x = self.decode(z)
        return recon_x, mu, logvar

# VAE Loss Function
def vae_loss(recon_x, x, mu, logvar):
    """VAE loss function"""
    # Reconstruction loss
    recon_loss = F.binary_cross_entropy(recon_x, x, reduction='sum')
    
    # KL divergence loss
    kl_loss = -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp())
    
    return recon_loss + kl_loss

# Generative Adversarial Network (GAN)
class Generator(nn.Module):
    def __init__(self, latent_size, output_size):
        super(Generator, self).__init__()
        
        self.model = nn.Sequential(
            nn.Linear(latent_size, 256),
            nn.ReLU(),
            nn.Linear(256, 512),
            nn.ReLU(),
            nn.Linear(512, 1024),
            nn.ReLU(),
            nn.Linear(1024, output_size),
            nn.Tanh()
        )
        
    def forward(self, z):
        return self.model(z)

class Discriminator(nn.Module):
    def __init__(self, input_size):
        super(Discriminator, self).__init__()
        
        self.model = nn.Sequential(
            nn.Linear(input_size, 1024),
            nn.LeakyReLU(0.2),
            nn.Dropout(0.3),
            nn.Linear(1024, 512),
            nn.LeakyReLU(0.2),
            nn.Dropout(0.3),
            nn.Linear(512, 256),
            nn.LeakyReLU(0.2),
            nn.Dropout(0.3),
            nn.Linear(256, 1),
            nn.Sigmoid()
        )
        
    def forward(self, x):
        return self.model(x)

# Create generative models
input_size = 784  # 28x28 images
hidden_size = 400
latent_size = 20

vae_model = VAE(input_size, hidden_size, latent_size)
generator = Generator(latent_size, input_size)
discriminator = Discriminator(input_size)

print("\\nVAE Model:")
print(vae_model)
print(f"Parameters: {sum(p.numel() for p in vae_model.parameters()):,}")

print("\\nGAN Generator:")
print(generator)
print(f"Parameters: {sum(p.numel() for p in generator.parameters()):,}")

print("\\nGAN Discriminator:")
print(discriminator)
print(f"Parameters: {sum(p.numel() for p in discriminator.parameters()):,}")

# Test generative models
def test_generative_models():
    """Test generative models"""
    batch_size = 16
    
    # Test VAE
    sample_input = torch.randn(batch_size, input_size)
    recon_x, mu, logvar = vae_model(sample_input)
    print(f"\\nVAE - Input shape: {sample_input.shape}")
    print(f"VAE - Reconstructed shape: {recon_x.shape}")
    print(f"VAE - Latent mu shape: {mu.shape}")
    print(f"VAE - Latent logvar shape: {logvar.shape}")
    
    # Test GAN
    noise = torch.randn(batch_size, latent_size)
    fake_data = generator(noise)
    real_score = discriminator(sample_input)
    fake_score = discriminator(fake_data)
    
    print(f"\\nGAN - Noise shape: {noise.shape}")
    print(f"GAN - Generated data shape: {fake_data.shape}")
    print(f"GAN - Real data discriminator score: {real_score.mean().item():.3f}")
    print(f"GAN - Fake data discriminator score: {fake_score.mean().item():.3f}")
    
    return recon_x, fake_data

generative_outputs = test_generative_models()
\`\`\`

## Model Optimization and Training

### Advanced Training Techniques
\`\`\`python
# Learning rate scheduling
class CosineAnnealingWarmRestarts:
    def __init__(self, optimizer, T_0, T_mult=1, eta_min=0):
        self.optimizer = optimizer
        self.T_0 = T_0
        self.T_mult = T_mult
        self.eta_min = eta_min
        self.T_cur = 0
        self.T_i = T_0
        self.base_lrs = [group['lr'] for group in optimizer.param_groups]
        
    def step(self):
        if self.T_cur == 0:
            self.T_i = self.T_0
        elif self.T_cur == self.T_i:
            self.T_cur = 0
            self.T_i *= self.T_mult
        
        self.T_cur += 1
        
        for param_group, base_lr in zip(self.optimizer.param_groups, self.base_lrs):
            param_group['lr'] = self.eta_min + (base_lr - self.eta_min) * \
                               (1 + np.cos(np.pi * self.T_cur / self.T_i)) / 2

# Gradient clipping
def clip_gradients(model, max_norm=1.0):
    """Clip gradients to prevent exploding gradients"""
    torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm)

# Early stopping
class EarlyStopping:
    def __init__(self, patience=7, min_delta=0):
        self.patience = patience
        self.min_delta = min_delta
        self.counter = 0
        self.best_loss = None
        
    def __call__(self, val_loss):
        if self.best_loss is None:
            self.best_loss = val_loss
        elif val_loss < self.best_loss - self.min_delta:
            self.best_loss = val_loss
            self.counter = 0
        else:
            self.counter += 1
            
        return self.counter >= self.patience

# Model ensemble
class ModelEnsemble:
    def __init__(self, models):
        self.models = models
        
    def predict(self, x):
        predictions = []
        for model in self.models:
            model.eval()
            with torch.no_grad():
                pred = model(x)
                predictions.append(pred)
        
        # Average predictions
        ensemble_pred = torch.stack(predictions).mean(dim=0)
        return ensemble_pred

# Knowledge distillation
class KnowledgeDistillation:
    def __init__(self, teacher_model, student_model, temperature=3.0, alpha=0.7):
        self.teacher_model = teacher_model
        self.student_model = student_model
        self.temperature = temperature
        self.alpha = alpha
        
    def distillation_loss(self, student_logits, teacher_logits, labels):
        # Soft targets from teacher
        soft_loss = F.kl_div(
            F.log_softmax(student_logits / self.temperature, dim=1),
            F.softmax(teacher_logits / self.temperature, dim=1),
            reduction='batchmean'
        ) * (self.temperature ** 2)
        
        # Hard targets
        hard_loss = F.cross_entropy(student_logits, labels)
        
        # Combined loss
        total_loss = self.alpha * soft_loss + (1 - self.alpha) * hard_loss
        return total_loss

# Advanced data augmentation
class AdvancedAugmentation:
    def __init__(self):
        self.transform = transforms.Compose([
            transforms.RandomHorizontalFlip(p=0.5),
            transforms.RandomRotation(degrees=15),
            transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2, hue=0.1),
            transforms.RandomAffine(degrees=0, translate=(0.1, 0.1), scale=(0.9, 1.1)),
            transforms.RandomPerspective(distortion_scale=0.2, p=0.5),
            transforms.ToTensor(),
            transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
        ])
    
    def __call__(self, x):
        return self.transform(x)

# Training loop with advanced techniques
def advanced_training_loop(model, train_loader, val_loader, num_epochs=10):
    """Advanced training loop with optimization techniques"""
    
    # Setup
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = model.to(device)
    
    optimizer = optim.AdamW(model.parameters(), lr=0.001, weight_decay=0.01)
    scheduler = CosineAnnealingWarmRestarts(optimizer, T_0=10, T_mult=2)
    early_stopping = EarlyStopping(patience=5)
    
    train_losses = []
    val_losses = []
    
    for epoch in range(num_epochs):
        # Training phase
        model.train()
        train_loss = 0.0
        
        for batch_idx, (data, target) in enumerate(train_loader):
            data, target = data.to(device), target.to(device)
            
            optimizer.zero_grad()
            output = model(data)
            loss = F.cross_entropy(output, target)
            loss.backward()
            
            # Gradient clipping
            clip_gradients(model, max_norm=1.0)
            
            optimizer.step()
            train_loss += loss.item()
            
            if batch_idx % 100 == 0:
                print(f'Epoch {epoch}, Batch {batch_idx}, Loss: {loss.item():.4f}')
        
        # Validation phase
        model.eval()
        val_loss = 0.0
        correct = 0
        total = 0
        
        with torch.no_grad():
            for data, target in val_loader:
                data, target = data.to(device), target.to(device)
                output = model(data)
                val_loss += F.cross_entropy(output, target).item()
                
                pred = output.argmax(dim=1)
                correct += pred.eq(target).sum().item()
                total += target.size(0)
        
        # Update learning rate
        scheduler.step()
        
        # Calculate average losses
        avg_train_loss = train_loss / len(train_loader)
        avg_val_loss = val_loss / len(val_loader)
        accuracy = 100. * correct / total
        
        train_losses.append(avg_train_loss)
        val_losses.append(avg_val_loss)
        
        print(f'Epoch {epoch}: Train Loss: {avg_train_loss:.4f}, '
              f'Val Loss: {avg_val_loss:.4f}, Accuracy: {accuracy:.2f}%')
        
        # Early stopping
        if early_stopping(avg_val_loss):
            print(f'Early stopping at epoch {epoch}')
            break
    
    return train_losses, val_losses

# Visualize training progress
def plot_training_progress(train_losses, val_losses):
    """Plot training progress"""
    plt.figure(figsize=(12, 4))
    
    plt.subplot(1, 2, 1)
    plt.plot(train_losses, label='Training Loss')
    plt.plot(val_losses, label='Validation Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.title('Training Progress')
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    plt.subplot(1, 2, 2)
    plt.plot(train_losses, label='Training Loss')
    plt.plot(val_losses, label='Validation Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.title('Training Progress (Log Scale)')
    plt.yscale('log')
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()

print("\\nAdvanced training techniques implemented:")
print("- Learning rate scheduling with cosine annealing")
print("- Gradient clipping for stability")
print("- Early stopping to prevent overfitting")
print("- Model ensemble for better predictions")
print("- Knowledge distillation for model compression")
print("- Advanced data augmentation")
\`\`\`

## Practical Exercise

Apply deep learning architectures:
1. Design and implement advanced CNN architectures
2. Build RNN models with attention mechanisms
3. Create transformer-based sequence models
4. Implement variational autoencoders
5. Build generative adversarial networks
6. Apply advanced training techniques
7. Use model optimization strategies
8. Evaluate and compare different architectures

## Summary & Next Steps

Deep learning architectures form the foundation of modern AI systems. Master these designs to build sophisticated neural networks for complex tasks.

**Next up**: Part 8 - Reinforcement learning.`,
            readTime: 31,
            publishedAt: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Deep Learning', 'CNNs', 'RNNs', 'Transformers', 'VAE', 'GAN']
          },
          {
            id: 'ai-part-8',
            partNumber: 8,
            title: 'Reinforcement Learning',
            summary: 'Master reinforcement learning algorithms including Q-learning, policy gradients, and deep RL.',
            content: `# Part 8: Reinforcement Learning

Learn reinforcement learning algorithms and techniques for training intelligent agents to make decisions in complex environments.

## Introduction to Reinforcement Learning

### Basic Concepts and Terminology
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
import gym
import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from collections import deque, namedtuple
import random

# Basic RL Environment
class SimpleGridWorld:
    def __init__(self, size=5):
        self.size = size
        self.state = (0, 0)  # Start position
        self.goal = (size-1, size-1)  # Goal position
        self.actions = ['up', 'down', 'left', 'right']
        self.action_map = {
            'up': (-1, 0),
            'down': (1, 0),
            'left': (0, -1),
            'right': (0, 1)
        }
        
    def reset(self):
        self.state = (0, 0)
        return self.state
    
    def step(self, action):
        dx, dy = self.action_map[action]
        new_x = max(0, min(self.size-1, self.state[0] + dx))
        new_y = max(0, min(self.size-1, self.state[1] + dy))
        self.state = (new_x, new_y)
        
        # Check if goal reached
        done = self.state == self.goal
        reward = 1 if done else -0.01  # Small negative reward for each step
        
        return self.state, reward, done, {}
    
    def render(self):
        grid = np.zeros((self.size, self.size))
        grid[self.state] = 1  # Agent position
        grid[self.goal] = 2   # Goal position
        return grid

# Test the environment
env = SimpleGridWorld(5)
print("Grid World Environment:")
print("0: Empty, 1: Agent, 2: Goal")
print(env.render())

# Q-Learning Algorithm
class QLearning:
    def __init__(self, env, learning_rate=0.1, discount_factor=0.9, epsilon=0.1):
        self.env = env
        self.lr = learning_rate
        self.gamma = discount_factor
        self.epsilon = epsilon
        
        # Initialize Q-table
        self.q_table = {}
        self.actions = env.actions
        
    def get_q_value(self, state, action):
        if (state, action) not in self.q_table:
            self.q_table[(state, action)] = 0.0
        return self.q_table[(state, action)]
    
    def choose_action(self, state):
        if random.random() < self.epsilon:
            return random.choice(self.actions)
        else:
            q_values = [self.get_q_value(state, action) for action in self.actions]
            max_q = max(q_values)
            best_actions = [action for action, q in zip(self.actions, q_values) if q == max_q]
            return random.choice(best_actions)
    
    def update_q_value(self, state, action, reward, next_state):
        current_q = self.get_q_value(state, action)
        next_q_values = [self.get_q_value(next_state, next_action) for next_action in self.actions]
        max_next_q = max(next_q_values)
        
        new_q = current_q + self.lr * (reward + self.gamma * max_next_q - current_q)
        self.q_table[(state, action)] = new_q
    
    def train(self, episodes=1000):
        rewards = []
        steps_per_episode = []
        
        for episode in range(episodes):
            state = self.env.reset()
            total_reward = 0
            steps = 0
            
            while True:
                action = self.choose_action(state)
                next_state, reward, done, _ = self.env.step(action)
                
                self.update_q_value(state, action, reward, next_state)
                
                state = next_state
                total_reward += reward
                steps += 1
                
                if done:
                    break
            
            rewards.append(total_reward)
            steps_per_episode.append(steps)
            
            # Decay epsilon
            self.epsilon = max(0.01, self.epsilon * 0.995)
            
            if episode % 100 == 0:
                avg_reward = np.mean(rewards[-100:])
                avg_steps = np.mean(steps_per_episode[-100:])
                print(f"Episode {episode}, Avg Reward: {avg_reward:.2f}, Avg Steps: {avg_steps:.1f}")
        
        return rewards, steps_per_episode

# Train Q-Learning agent
q_agent = QLearning(env)
rewards, steps = q_agent.train(episodes=1000)

# Visualize training progress
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.plot(rewards)
plt.title('Q-Learning: Rewards per Episode')
plt.xlabel('Episode')
plt.ylabel('Total Reward')
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 2)
plt.plot(steps)
plt.title('Q-Learning: Steps per Episode')
plt.xlabel('Episode')
plt.ylabel('Steps to Goal')
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 3)
# Show learned policy
policy_grid = np.zeros((env.size, env.size))
for i in range(env.size):
    for j in range(env.size):
        state = (i, j)
        if state != env.goal:
            best_action = max(q_agent.actions, key=lambda a: q_agent.get_q_value(state, a))
            action_idx = q_agent.actions.index(best_action)
            policy_grid[i, j] = action_idx

plt.imshow(policy_grid, cmap='viridis')
plt.title('Learned Policy')
plt.xlabel('Y Position')
plt.ylabel('X Position')
plt.colorbar(label='Action (0:up, 1:down, 2:left, 3:right)')

plt.tight_layout()
plt.show()

# Test the trained agent
print("\\nTesting trained Q-Learning agent:")
state = env.reset()
total_reward = 0
steps = 0
path = [state]

while True:
    action = q_agent.choose_action(state)
    next_state, reward, done, _ = env.step(action)
    total_reward += reward
    steps += 1
    path.append(next_state)
    
    print(f"Step {steps}: {state} -> {action} -> {next_state}, Reward: {reward:.2f}")
    
    state = next_state
    if done:
        break

print(f"\\nTotal reward: {total_reward:.2f}, Steps: {steps}")
print(f"Path: {path}")
\`\`\`

## Deep Q-Network (DQN)

### Neural Network-based Q-Learning
\`\`\`python
# DQN Network
class DQN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(DQN, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.fc3 = nn.Linear(hidden_size, output_size)
        
    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

# Experience Replay Buffer
class ReplayBuffer:
    def __init__(self, capacity):
        self.buffer = deque(maxlen=capacity)
        self.experience = namedtuple("Experience", field_names=["state", "action", "reward", "next_state", "done"])
    
    def add(self, state, action, reward, next_state, done):
        experience = self.experience(state, action, reward, next_state, done)
        self.buffer.append(experience)
    
    def sample(self, batch_size):
        experiences = random.sample(self.buffer, k=batch_size)
        
        states = torch.FloatTensor([e.state for e in experiences])
        actions = torch.LongTensor([e.action for e in experiences])
        rewards = torch.FloatTensor([e.reward for e in experiences])
        next_states = torch.FloatTensor([e.next_state for e in experiences])
        dones = torch.BoolTensor([e.done for e in experiences])
        
        return states, actions, rewards, next_states, dones
    
    def __len__(self):
        return len(self.buffer)

# DQN Agent
class DQNAgent:
    def __init__(self, state_size, action_size, hidden_size=64, lr=0.001):
        self.state_size = state_size
        self.action_size = action_size
        
        # Networks
        self.q_network = DQN(state_size, hidden_size, action_size)
        self.target_network = DQN(state_size, hidden_size, action_size)
        self.optimizer = optim.Adam(self.q_network.parameters(), lr=lr)
        
        # Replay buffer
        self.memory = ReplayBuffer(10000)
        
        # Hyperparameters
        self.epsilon = 1.0
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995
        self.gamma = 0.95
        self.batch_size = 32
        self.update_target_every = 10
        
        # Update target network
        self.update_target_network()
    
    def update_target_network(self):
        self.target_network.load_state_dict(self.q_network.state_dict())
    
    def act(self, state, training=True):
        if training and random.random() < self.epsilon:
            return random.randrange(self.action_size)
        
        state_tensor = torch.FloatTensor(state).unsqueeze(0)
        q_values = self.q_network(state_tensor)
        return q_values.argmax().item()
    
    def remember(self, state, action, reward, next_state, done):
        self.memory.add(state, action, reward, next_state, done)
    
    def replay(self):
        if len(self.memory) < self.batch_size:
            return
        
        states, actions, rewards, next_states, dones = self.memory.sample(self.batch_size)
        
        current_q_values = self.q_network(states).gather(1, actions.unsqueeze(1))
        next_q_values = self.target_network(next_states).max(1)[0].detach()
        target_q_values = rewards + (self.gamma * next_q_values * ~dones)
        
        loss = F.mse_loss(current_q_values.squeeze(), target_q_values)
        
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()
        
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay

# CartPole Environment
def train_dqn_cartpole():
    """Train DQN on CartPole environment"""
    env = gym.make('CartPole-v1')
    state_size = env.observation_space.shape[0]
    action_size = env.action_space.n
    
    agent = DQNAgent(state_size, action_size)
    
    scores = []
    episodes = 500
    
    for episode in range(episodes):
        state = env.reset()
        total_reward = 0
        
        while True:
            action = agent.act(state)
            next_state, reward, done, _ = env.step(action)
            
            agent.remember(state, action, reward, next_state, done)
            agent.replay()
            
            state = next_state
            total_reward += reward
            
            if done:
                break
        
        scores.append(total_reward)
        
        if episode % agent.update_target_every == 0:
            agent.update_target_network()
        
        if episode % 50 == 0:
            avg_score = np.mean(scores[-50:])
            print(f"Episode {episode}, Average Score: {avg_score:.2f}, Epsilon: {agent.epsilon:.3f}")
    
    return scores, agent

# Train DQN
print("Training DQN on CartPole...")
dqn_scores, dqn_agent = train_dqn_cartpole()

# Visualize DQN training
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(dqn_scores)
plt.title('DQN Training: Scores per Episode')
plt.xlabel('Episode')
plt.ylabel('Score')
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
# Moving average
window = 50
if len(dqn_scores) >= window:
    moving_avg = np.convolve(dqn_scores, np.ones(window)/window, mode='valid')
    plt.plot(moving_avg)
    plt.title(f'DQN Training: Moving Average (window={window})')
    plt.xlabel('Episode')
    plt.ylabel('Average Score')
    plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Test trained DQN
def test_dqn_agent(agent, env, episodes=5):
    """Test trained DQN agent"""
    agent.epsilon = 0  # No exploration during testing
    
    for episode in range(episodes):
        state = env.reset()
        total_reward = 0
        
        while True:
            action = agent.act(state, training=False)
            state, reward, done, _ = env.step(action)
            total_reward += reward
            
            if done:
                break
        
        print(f"Test Episode {episode + 1}: Score = {total_reward}")

print("\\nTesting trained DQN agent:")
test_dqn_agent(dqn_agent, gym.make('CartPole-v1'))
\`\`\`

## Policy Gradient Methods

### REINFORCE Algorithm
\`\`\`python
# Policy Network
class PolicyNetwork(nn.Module):
    def __init__(self, state_size, action_size, hidden_size=64):
        super(PolicyNetwork, self).__init__()
        self.fc1 = nn.Linear(state_size, hidden_size)
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.fc3 = nn.Linear(hidden_size, action_size)
        
    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = F.softmax(self.fc3(x), dim=1)
        return x

# REINFORCE Agent
class REINFORCEAgent:
    def __init__(self, state_size, action_size, lr=0.01):
        self.policy_network = PolicyNetwork(state_size, action_size)
        self.optimizer = optim.Adam(self.policy_network.parameters(), lr=lr)
        self.gamma = 0.99
        
    def act(self, state):
        state_tensor = torch.FloatTensor(state).unsqueeze(0)
        action_probs = self.policy_network(state_tensor)
        action_dist = torch.distributions.Categorical(action_probs)
        action = action_dist.sample()
        return action.item(), action_dist.log_prob(action)
    
    def update_policy(self, rewards, log_probs):
        # Calculate discounted returns
        discounted_returns = []
        running_return = 0
        
        for reward in reversed(rewards):
            running_return = reward + self.gamma * running_return
            discounted_returns.insert(0, running_return)
        
        # Normalize returns
        discounted_returns = torch.FloatTensor(discounted_returns)
        discounted_returns = (discounted_returns - discounted_returns.mean()) / (discounted_returns.std() + 1e-8)
        
        # Calculate policy loss
        policy_loss = []
        for log_prob, return_val in zip(log_probs, discounted_returns):
            policy_loss.append(-log_prob * return_val)
        
        # Update policy
        self.optimizer.zero_grad()
        policy_loss = torch.stack(policy_loss).sum()
        policy_loss.backward()
        self.optimizer.step()

# Train REINFORCE
def train_reinforce():
    """Train REINFORCE agent on CartPole"""
    env = gym.make('CartPole-v1')
    state_size = env.observation_space.shape[0]
    action_size = env.action_space.n
    
    agent = REINFORCEAgent(state_size, action_size)
    
    scores = []
    episodes = 500
    
    for episode in range(episodes):
        state = env.reset()
        rewards = []
        log_probs = []
        
        while True:
            action, log_prob = agent.act(state)
            next_state, reward, done, _ = env.step(action)
            
            rewards.append(reward)
            log_probs.append(log_prob)
            
            state = next_state
            
            if done:
                break
        
        agent.update_policy(rewards, log_probs)
        scores.append(sum(rewards))
        
        if episode % 50 == 0:
            avg_score = np.mean(scores[-50:])
            print(f"Episode {episode}, Average Score: {avg_score:.2f}")
    
    return scores, agent

# Train REINFORCE
print("\\nTraining REINFORCE on CartPole...")
reinforce_scores, reinforce_agent = train_reinforce()

# Compare DQN and REINFORCE
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.plot(dqn_scores, label='DQN', alpha=0.7)
plt.plot(reinforce_scores, label='REINFORCE', alpha=0.7)
plt.title('Training Comparison')
plt.xlabel('Episode')
plt.ylabel('Score')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 2)
# DQN moving average
if len(dqn_scores) >= 50:
    dqn_avg = np.convolve(dqn_scores, np.ones(50)/50, mode='valid')
    plt.plot(dqn_avg, label='DQN', alpha=0.7)

# REINFORCE moving average
if len(reinforce_scores) >= 50:
    reinforce_avg = np.convolve(reinforce_scores, np.ones(50)/50, mode='valid')
    plt.plot(reinforce_avg, label='REINFORCE', alpha=0.7)

plt.title('Moving Average Comparison')
plt.xlabel('Episode')
plt.ylabel('Average Score')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 3)
# Final performance comparison
final_dqn = np.mean(dqn_scores[-100:])
final_reinforce = np.mean(reinforce_scores[-100:])

plt.bar(['DQN', 'REINFORCE'], [final_dqn, final_reinforce])
plt.title('Final Performance (Last 100 Episodes)')
plt.ylabel('Average Score')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print(f"\\nFinal Performance Comparison:")
print(f"DQN (last 100 episodes): {final_dqn:.2f}")
print(f"REINFORCE (last 100 episodes): {final_reinforce:.2f}")
\`\`\`

## Advanced RL Algorithms

### Actor-Critic Methods
\`\`\`python
# Actor-Critic Network
class ActorCritic(nn.Module):
    def __init__(self, state_size, action_size, hidden_size=64):
        super(ActorCritic, self).__init__()
        
        # Shared layers
        self.shared = nn.Sequential(
            nn.Linear(state_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, hidden_size),
            nn.ReLU()
        )
        
        # Actor (policy)
        self.actor = nn.Linear(hidden_size, action_size)
        
        # Critic (value function)
        self.critic = nn.Linear(hidden_size, 1)
        
    def forward(self, state):
        shared_features = self.shared(state)
        
        # Policy
        action_probs = F.softmax(self.actor(shared_features), dim=1)
        
        # Value
        value = self.critic(shared_features)
        
        return action_probs, value

# Actor-Critic Agent
class ActorCriticAgent:
    def __init__(self, state_size, action_size, lr=0.001):
        self.network = ActorCritic(state_size, action_size)
        self.optimizer = optim.Adam(self.network.parameters(), lr=lr)
        self.gamma = 0.99
        
    def act(self, state):
        state_tensor = torch.FloatTensor(state).unsqueeze(0)
        action_probs, _ = self.network(state_tensor)
        action_dist = torch.distributions.Categorical(action_probs)
        action = action_dist.sample()
        return action.item(), action_dist.log_prob(action)
    
    def evaluate(self, state, action):
        state_tensor = torch.FloatTensor(state).unsqueeze(0)
        action_tensor = torch.LongTensor([action])
        
        action_probs, value = self.network(state_tensor)
        action_dist = torch.distributions.Categorical(action_probs)
        log_prob = action_dist.log_prob(action_tensor)
        entropy = action_dist.entropy()
        
        return log_prob, value, entropy
    
    def update(self, states, actions, rewards, next_states, dones):
        # Calculate returns
        returns = []
        running_return = 0
        
        for reward, done in zip(reversed(rewards), reversed(dones)):
            if done:
                running_return = 0
            running_return = reward + self.gamma * running_return
            returns.insert(0, running_return)
        
        returns = torch.FloatTensor(returns)
        
        # Calculate advantages
        values = []
        for state in states:
            _, value = self.network(torch.FloatTensor(state).unsqueeze(0))
            values.append(value.squeeze())
        
        values = torch.stack(values)
        advantages = returns - values
        
        # Calculate losses
        actor_loss = 0
        critic_loss = 0
        
        for state, action, advantage, return_val in zip(states, actions, advantages, returns):
            log_prob, value, entropy = self.evaluate(state, action)
            
            actor_loss += -(log_prob * advantage.detach())
            critic_loss += F.mse_loss(value.squeeze(), return_val)
        
        # Update network
        self.optimizer.zero_grad()
        total_loss = actor_loss + 0.5 * critic_loss
        total_loss.backward()
        self.optimizer.step()

# Train Actor-Critic
def train_actor_critic():
    """Train Actor-Critic agent on CartPole"""
    env = gym.make('CartPole-v1')
    state_size = env.observation_space.shape[0]
    action_size = env.action_space.n
    
    agent = ActorCriticAgent(state_size, action_size)
    
    scores = []
    episodes = 500
    
    for episode in range(episodes):
        state = env.reset()
        states = []
        actions = []
        rewards = []
        next_states = []
        dones = []
        
        while True:
            action, _ = agent.act(state)
            next_state, reward, done, _ = env.step(action)
            
            states.append(state)
            actions.append(action)
            rewards.append(reward)
            next_states.append(next_state)
            dones.append(done)
            
            state = next_state
            
            if done:
                break
        
        agent.update(states, actions, rewards, next_states, dones)
        scores.append(sum(rewards))
        
        if episode % 50 == 0:
            avg_score = np.mean(scores[-50:])
            print(f"Episode {episode}, Average Score: {avg_score:.2f}")
    
    return scores, agent

# Train Actor-Critic
print("\\nTraining Actor-Critic on CartPole...")
ac_scores, ac_agent = train_actor_critic()

# Compare all methods
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.plot(dqn_scores, label='DQN', alpha=0.7)
plt.plot(reinforce_scores, label='REINFORCE', alpha=0.7)
plt.plot(ac_scores, label='Actor-Critic', alpha=0.7)
plt.title('All Methods Training')
plt.xlabel('Episode')
plt.ylabel('Score')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 2)
# Moving averages
if len(dqn_scores) >= 50:
    dqn_avg = np.convolve(dqn_scores, np.ones(50)/50, mode='valid')
    plt.plot(dqn_avg, label='DQN', alpha=0.7)

if len(reinforce_scores) >= 50:
    reinforce_avg = np.convolve(reinforce_scores, np.ones(50)/50, mode='valid')
    plt.plot(reinforce_avg, label='REINFORCE', alpha=0.7)

if len(ac_scores) >= 50:
    ac_avg = np.convolve(ac_scores, np.ones(50)/50, mode='valid')
    plt.plot(ac_avg, label='Actor-Critic', alpha=0.7)

plt.title('Moving Average Comparison')
plt.xlabel('Episode')
plt.ylabel('Average Score')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 3)
# Final performance
final_dqn = np.mean(dqn_scores[-100:])
final_reinforce = np.mean(reinforce_scores[-100:])
final_ac = np.mean(ac_scores[-100:])

plt.bar(['DQN', 'REINFORCE', 'Actor-Critic'], [final_dqn, final_reinforce, final_ac])
plt.title('Final Performance Comparison')
plt.ylabel('Average Score')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print(f"\\nFinal Performance Comparison:")
print(f"DQN: {final_dqn:.2f}")
print(f"REINFORCE: {final_reinforce:.2f}")
print(f"Actor-Critic: {final_ac:.2f}")
\`\`\`

## Practical Exercise

Apply reinforcement learning techniques:
1. Implement Q-learning for simple environments
2. Build and train DQN agents
3. Develop policy gradient methods
4. Create actor-critic algorithms
5. Compare different RL approaches
6. Optimize hyperparameters
7. Handle continuous action spaces
8. Apply RL to real-world problems

## Summary & Next Steps

Reinforcement learning enables agents to learn optimal behavior through interaction with environments. Master these algorithms to build intelligent decision-making systems.

**Next up**: Part 9 - AI ethics and responsible AI.`,
            readTime: 32,
            publishedAt: new Date(Date.now() + 36 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Reinforcement Learning', 'Q-Learning', 'DQN', 'Policy Gradients', 'Actor-Critic']
          },
          {
            id: 'ai-part-9',
            partNumber: 9,
            title: 'AI Ethics and Responsible AI',
            summary: 'Explore ethical considerations, bias mitigation, and responsible AI development practices.',
            content: `# Part 9: AI Ethics and Responsible AI

Understand the ethical implications of AI systems and learn how to develop responsible AI solutions that benefit society.

## Introduction to AI Ethics

### Core Ethical Principles
\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

# AI Ethics Framework
class AIEthicsFramework:
    def __init__(self):
        self.principles = {
            'Fairness': 'AI systems should treat all individuals and groups fairly',
            'Transparency': 'AI systems should be explainable and understandable',
            'Privacy': 'AI systems should protect individual privacy and data',
            'Accountability': 'AI systems should have clear responsibility and oversight',
            'Reliability': 'AI systems should be robust and perform consistently',
            'Safety': 'AI systems should not cause harm to humans or society'
        }
        
    def display_principles(self):
        """Display AI ethics principles"""
        print("AI Ethics Principles:")
        print("=" * 50)
        for principle, description in self.principles.items():
            print(f"{principle}: {description}")
            print()
    
    def assess_system(self, system_name, scores):
        """Assess an AI system against ethical principles"""
        print(f"Ethical Assessment for {system_name}:")
        print("=" * 40)
        
        for principle, score in scores.items():
            if principle in self.principles:
                status = "✓ Good" if score >= 7 else "⚠ Needs Improvement" if score >= 4 else "✗ Poor"
                print(f"{principle}: {score}/10 - {status}")
        
        overall_score = np.mean(list(scores.values()))
        print(f"\\nOverall Ethical Score: {overall_score:.1f}/10")
        
        if overall_score >= 8:
            print("Status: Ethically Sound")
        elif overall_score >= 6:
            print("Status: Needs Minor Improvements")
        else:
            print("Status: Requires Significant Ethical Review")

# Initialize framework
ethics_framework = AIEthicsFramework()
ethics_framework.display_principles()

# Example ethical assessment
sample_scores = {
    'Fairness': 8,
    'Transparency': 6,
    'Privacy': 9,
    'Accountability': 7,
    'Reliability': 8,
    'Safety': 9
}

ethics_framework.assess_system("Credit Scoring AI", sample_scores)
\`\`\`

## Bias Detection and Mitigation

### Identifying Bias in AI Systems
\`\`\`python
# Generate synthetic dataset with bias
def create_biased_dataset(n_samples=1000):
    """Create a synthetic dataset with inherent bias"""
    np.random.seed(42)
    
    # Create features
    age = np.random.normal(35, 15, n_samples)
    income = np.random.normal(50000, 20000, n_samples)
    education = np.random.choice([1, 2, 3, 4], n_samples, p=[0.1, 0.3, 0.4, 0.2])
    
    # Create biased gender feature (affects loan approval)
    gender = np.random.choice([0, 1], n_samples, p=[0.5, 0.5])
    
    # Create biased loan approval (unfairly favors certain groups)
    loan_approved = np.zeros(n_samples)
    for i in range(n_samples):
        # Biased approval: unfairly favors certain demographics
        if gender[i] == 1 and age[i] > 25 and income[i] > 40000:
            loan_approved[i] = 1
        elif gender[i] == 0 and age[i] > 30 and income[i] > 60000:  # Higher threshold for group 0
            loan_approved[i] = 1
        else:
            loan_approved[i] = 0
    
    # Add some randomness
    noise = np.random.random(n_samples) < 0.1
    loan_approved = np.logical_xor(loan_approved, noise).astype(int)
    
    # Create DataFrame
    data = pd.DataFrame({
        'age': age,
        'income': income,
        'education': education,
        'gender': gender,
        'loan_approved': loan_approved
    })
    
    return data

# Create biased dataset
biased_data = create_biased_dataset()
print("Biased Dataset Sample:")
print(biased_data.head())
print(f"\\nDataset shape: {biased_data.shape}")

# Analyze bias
def analyze_bias(data):
    """Analyze bias in the dataset"""
    print("\\nBias Analysis:")
    print("=" * 30)
    
    # Overall approval rate
    overall_rate = data['loan_approved'].mean()
    print(f"Overall approval rate: {overall_rate:.2%}")
    
    # Approval rate by gender
    gender_rates = data.groupby('gender')['loan_approved'].mean()
    print(f"\\nApproval rate by gender:")
    print(f"Group 0: {gender_rates[0]:.2%}")
    print(f"Group 1: {gender_rates[1]:.2%}")
    print(f"Disparity: {abs(gender_rates[1] - gender_rates[0]):.2%}")
    
    # Approval rate by income level
    data['income_level'] = pd.cut(data['income'], bins=3, labels=['Low', 'Medium', 'High'])
    income_rates = data.groupby('income_level')['loan_approved'].mean()
    print(f"\\nApproval rate by income level:")
    for level, rate in income_rates.items():
        print(f"{level}: {rate:.2%}")
    
    return gender_rates, income_rates

gender_rates, income_rates = analyze_bias(biased_data)

# Visualize bias
plt.figure(figsize=(15, 10))

plt.subplot(2, 3, 1)
gender_rates.plot(kind='bar', color=['skyblue', 'lightcoral'])
plt.title('Loan Approval Rate by Gender')
plt.ylabel('Approval Rate')
plt.xticks([0, 1], ['Group 0', 'Group 1'], rotation=0)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 2)
income_rates.plot(kind='bar', color=['lightgreen', 'orange', 'red'])
plt.title('Loan Approval Rate by Income Level')
plt.ylabel('Approval Rate')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 3)
# Age distribution by approval
approved_age = biased_data[biased_data['loan_approved'] == 1]['age']
rejected_age = biased_data[biased_data['loan_approved'] == 0]['age']
plt.hist([approved_age, rejected_age], bins=20, alpha=0.7, label=['Approved', 'Rejected'])
plt.title('Age Distribution by Loan Decision')
plt.xlabel('Age')
plt.ylabel('Frequency')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 4)
# Income distribution by approval
approved_income = biased_data[biased_data['loan_approved'] == 1]['income']
rejected_income = biased_data[biased_data['loan_approved'] == 0]['income']
plt.hist([approved_income, rejected_income], bins=20, alpha=0.7, label=['Approved', 'Rejected'])
plt.title('Income Distribution by Loan Decision')
plt.xlabel('Income')
plt.ylabel('Frequency')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 5)
# Education level by approval
education_rates = biased_data.groupby('education')['loan_approved'].mean()
education_rates.plot(kind='bar', color='purple', alpha=0.7)
plt.title('Loan Approval Rate by Education Level')
plt.ylabel('Approval Rate')
plt.xlabel('Education Level')
plt.xticks(rotation=0)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 6)
# Correlation heatmap
correlation_matrix = biased_data.corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('Feature Correlation Matrix')

plt.tight_layout()
plt.show()
\`\`\`

## Bias Mitigation Techniques

### Implementing Fairness Constraints
\`\`\`python
# Train biased model
def train_biased_model(data):
    """Train a model on biased data"""
    X = data[['age', 'income', 'education', 'gender']]
    y = data['loan_approved']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    # Predictions
    y_pred = model.predict(X_test_scaled)
    
    return model, scaler, X_test, y_test, y_pred

# Train biased model
biased_model, scaler, X_test, y_test, y_pred = train_biased_model(biased_data)

print("Biased Model Performance:")
print(f"Accuracy: {accuracy_score(y_test, y_pred):.3f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred))

# Bias mitigation techniques
class BiasMitigation:
    def __init__(self):
        self.mitigation_techniques = {
            'Preprocessing': 'Modify training data to reduce bias',
            'In-processing': 'Modify learning algorithm to be fair',
            'Post-processing': 'Modify model predictions to be fair'
        }
    
    def preprocessing_mitigation(self, data):
        """Preprocessing: Remove or modify biased features"""
        print("\\nPreprocessing Mitigation:")
        print("=" * 30)
        
        # Remove gender feature
        X_fair = data[['age', 'income', 'education']]
        y_fair = data['loan_approved']
        
        X_train, X_test, y_train, y_test = train_test_split(X_fair, y_fair, test_size=0.2, random_state=42)
        
        # Scale features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_train_scaled, y_train)
        
        # Predictions
        y_pred = model.predict(X_test_scaled)
        
        print(f"Accuracy: {accuracy_score(y_test, y_pred):.3f}")
        
        return model, scaler, X_test, y_test, y_pred
    
    def postprocessing_mitigation(self, model, scaler, X_test, y_test, y_pred):
        """Post-processing: Adjust predictions for fairness"""
        print("\\nPost-processing Mitigation:")
        print("=" * 30)
        
        # Get prediction probabilities
        y_proba = model.predict_proba(X_test)[:, 1]
        
        # Adjust thresholds for different groups
        X_test_df = pd.DataFrame(X_test, columns=['age', 'income', 'education', 'gender'])
        
        # Different thresholds for different groups
        adjusted_predictions = np.zeros(len(y_proba))
        
        for i, (prob, gender) in enumerate(zip(y_proba, X_test_df['gender'])):
            if gender == 0:  # Group 0 - lower threshold
                adjusted_predictions[i] = 1 if prob > 0.3 else 0
            else:  # Group 1 - higher threshold
                adjusted_predictions[i] = 1 if prob > 0.7 else 0
        
        print(f"Accuracy: {accuracy_score(y_test, adjusted_predictions):.3f}")
        
        return adjusted_predictions
    
    def evaluate_fairness(self, y_true, y_pred, sensitive_feature):
        """Evaluate fairness metrics"""
        print("\\nFairness Evaluation:")
        print("=" * 25)
        
        # Demographic parity
        group_0_rate = y_pred[sensitive_feature == 0].mean()
        group_1_rate = y_pred[sensitive_feature == 1].mean()
        
        demographic_parity = abs(group_0_rate - group_1_rate)
        print(f"Demographic Parity Difference: {demographic_parity:.3f}")
        
        # Equalized odds
        group_0_tpr = ((y_pred == 1) & (y_true == 1) & (sensitive_feature == 0)).sum() / (y_true == 1).sum()
        group_1_tpr = ((y_pred == 1) & (y_true == 1) & (sensitive_feature == 1)).sum() / (y_true == 1).sum()
        
        group_0_fpr = ((y_pred == 1) & (y_true == 0) & (sensitive_feature == 0)).sum() / (y_true == 0).sum()
        group_1_fpr = ((y_pred == 1) & (y_true == 0) & (sensitive_feature == 1)).sum() / (y_true == 0).sum()
        
        equalized_odds = abs(group_0_tpr - group_1_tpr) + abs(group_0_fpr - group_1_fpr)
        print(f"Equalized Odds Difference: {equalized_odds:.3f}")
        
        return {
            'demographic_parity': demographic_parity,
            'equalized_odds': equalized_odds
        }

# Apply bias mitigation
mitigation = BiasMitigation()

# Preprocessing mitigation
fair_model, fair_scaler, X_test_fair, y_test_fair, y_pred_fair = mitigation.preprocessing_mitigation(biased_data)

# Post-processing mitigation
adjusted_pred = mitigation.postprocessing_mitigation(biased_model, scaler, X_test, y_test, y_pred)

# Evaluate fairness
print("\\nOriginal Model Fairness:")
original_fairness = mitigation.evaluate_fairness(y_test, y_pred, X_test['gender'])

print("\\nPreprocessing Mitigation Fairness:")
preprocessing_fairness = mitigation.evaluate_fairness(y_test_fair, y_pred_fair, X_test_fair['gender'])

print("\\nPost-processing Mitigation Fairness:")
postprocessing_fairness = mitigation.evaluate_fairness(y_test, adjusted_pred, X_test['gender'])

# Compare fairness metrics
fairness_comparison = pd.DataFrame({
    'Original': [original_fairness['demographic_parity'], original_fairness['equalized_odds']],
    'Preprocessing': [preprocessing_fairness['demographic_parity'], preprocessing_fairness['equalized_odds']],
    'Post-processing': [postprocessing_fairness['demographic_parity'], postprocessing_fairness['equalized_odds']]
}, index=['Demographic Parity', 'Equalized Odds'])

print("\\nFairness Metrics Comparison:")
print(fairness_comparison)

# Visualize fairness comparison
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
fairness_comparison.loc['Demographic Parity'].plot(kind='bar', color=['red', 'orange', 'green'])
plt.title('Demographic Parity Comparison')
plt.ylabel('Difference')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
fairness_comparison.loc['Equalized Odds'].plot(kind='bar', color=['red', 'orange', 'green'])
plt.title('Equalized Odds Comparison')
plt.ylabel('Difference')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Explainable AI and Transparency

### Model Interpretability
\`\`\`python
# Feature importance analysis
def analyze_feature_importance(model, feature_names):
    """Analyze feature importance for model interpretability"""
    importance = model.feature_importances_
    
    # Create importance DataFrame
    importance_df = pd.DataFrame({
        'feature': feature_names,
        'importance': importance
    }).sort_values('importance', ascending=False)
    
    print("Feature Importance Analysis:")
    print("=" * 30)
    for _, row in importance_df.iterrows():
        print(f"{row['feature']}: {row['importance']:.3f}")
    
    return importance_df

# Analyze feature importance
feature_names = ['age', 'income', 'education', 'gender']
importance_df = analyze_feature_importance(biased_model, feature_names)

# SHAP-like explanation (simplified)
def explain_prediction(model, scaler, instance, feature_names):
    """Provide explanation for a single prediction"""
    # Get prediction
    instance_scaled = scaler.transform([instance])
    prediction = model.predict(instance_scaled)[0]
    probability = model.predict_proba(instance_scaled)[0]
    
    print(f"\\nPrediction Explanation:")
    print("=" * 25)
    print(f"Prediction: {'Approved' if prediction == 1 else 'Rejected'}")
    print(f"Confidence: {probability[1]:.3f}")
    print(f"\\nFeature Contributions:")
    
    # Calculate feature contributions (simplified)
    base_prob = 0.5  # Base probability
    contributions = {}
    
    for i, feature in enumerate(feature_names):
        # Simplified contribution calculation
        contribution = (instance[i] - np.mean(biased_data[feature])) * importance_df.iloc[i]['importance']
        contributions[feature] = contribution
        print(f"{feature}: {contribution:.3f}")
    
    return contributions

# Explain a sample prediction
sample_instance = [30, 50000, 3, 1]  # age, income, education, gender
contributions = explain_prediction(biased_model, scaler, sample_instance, feature_names)

# Visualize explanations
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
importance_df.plot(x='feature', y='importance', kind='bar', color='skyblue')
plt.title('Feature Importance')
plt.ylabel('Importance')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 2)
contributions_df = pd.DataFrame(list(contributions.items()), columns=['feature', 'contribution'])
contributions_df.plot(x='feature', y='contribution', kind='bar', color='lightcoral')
plt.title('Feature Contributions to Prediction')
plt.ylabel('Contribution')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 3)
# Decision boundary visualization (2D projection)
from sklearn.decomposition import PCA

# Use PCA to reduce to 2D
pca = PCA(n_components=2)
X_pca = pca.fit_transform(scaler.transform(biased_data[['age', 'income', 'education', 'gender']]))

# Plot decision boundary
plt.scatter(X_pca[biased_data['loan_approved'] == 0, 0], 
           X_pca[biased_data['loan_approved'] == 0, 1], 
           c='red', alpha=0.5, label='Rejected')
plt.scatter(X_pca[biased_data['loan_approved'] == 1, 0], 
           X_pca[biased_data['loan_approved'] == 1, 1], 
           c='green', alpha=0.5, label='Approved')
plt.title('Decision Boundary (PCA Projection)')
plt.xlabel('PC1')
plt.ylabel('PC2')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Privacy and Data Protection

### Privacy-Preserving Techniques
\`\`\`python
# Differential Privacy
class DifferentialPrivacy:
    def __init__(self, epsilon=1.0):
        self.epsilon = epsilon
    
    def add_noise(self, data, sensitivity=1.0):
        """Add Laplace noise for differential privacy"""
        noise = np.random.laplace(0, sensitivity / self.epsilon, data.shape)
        return data + noise
    
    def private_query(self, query_result, sensitivity=1.0):
        """Make a query result differentially private"""
        noise = np.random.laplace(0, sensitivity / self.epsilon)
        return query_result + noise

# Data anonymization
class DataAnonymization:
    def __init__(self):
        self.anonymization_techniques = {
            'k-anonymity': 'Ensure each record is indistinguishable from k-1 others',
            'l-diversity': 'Ensure each group has at least l distinct values',
            't-closeness': 'Ensure distribution of sensitive attributes is close to overall distribution'
        }
    
    def k_anonymity(self, data, quasi_identifiers, k=3):
        """Implement k-anonymity"""
        print(f"\\nImplementing {k}-anonymity:")
        print("=" * 25)
        
        # Group by quasi-identifiers
        groups = data.groupby(quasi_identifiers)
        
        # Check k-anonymity
        k_anonymous_groups = []
        for name, group in groups:
            if len(group) >= k:
                k_anonymous_groups.append(group)
            else:
                print(f"Group {name} has only {len(group)} records (needs {k})")
        
        if k_anonymous_groups:
            k_anonymous_data = pd.concat(k_anonymous_groups)
            print(f"K-anonymous dataset: {len(k_anonymous_data)} records")
            return k_anonymous_data
        else:
            print("No groups satisfy k-anonymity")
            return None
    
    def generalize_data(self, data, columns, levels):
        """Generalize data for anonymization"""
        generalized_data = data.copy()
        
        for col, level in zip(columns, levels):
            if col in generalized_data.columns:
                if level == 'age':
                    # Generalize age to ranges
                    generalized_data[col] = pd.cut(generalized_data[col], 
                                                 bins=[0, 25, 35, 45, 55, 100], 
                                                 labels=['18-25', '26-35', '36-45', '46-55', '55+'])
                elif level == 'income':
                    # Generalize income to ranges
                    generalized_data[col] = pd.cut(generalized_data[col], 
                                                 bins=[0, 30000, 50000, 70000, 100000], 
                                                 labels=['Low', 'Medium', 'High', 'Very High'])
        
        return generalized_data

# Apply privacy techniques
dp = DifferentialPrivacy(epsilon=1.0)
anonymizer = DataAnonymization()

# Add differential privacy noise
print("Differential Privacy Example:")
print("=" * 30)
original_mean = biased_data['income'].mean()
private_mean = dp.private_query(original_mean, sensitivity=10000)
print("Original mean income: $" + str(original_mean))
print("Private mean income: $" + str(private_mean))

# Implement k-anonymity
quasi_identifiers = ['age', 'education']
k_anonymous_data = anonymizer.k_anonymity(biased_data, quasi_identifiers, k=3)

# Generalize data
generalized_data = anonymizer.generalize_data(biased_data, ['age', 'income'], ['age', 'income'])
print("\\nGeneralized Data Sample:")
print(generalized_data[['age', 'income', 'education', 'gender']].head())

# Privacy metrics
def calculate_privacy_metrics(original_data, anonymized_data):
    """Calculate privacy metrics"""
    print("\\nPrivacy Metrics:")
    print("=" * 20)
    
    # Information loss
    info_loss = 1 - (len(anonymized_data) / len(original_data))
    print(f"Information Loss: {info_loss:.2%}")
    
    # Utility preservation
    original_approval_rate = original_data['loan_approved'].mean()
    anonymized_approval_rate = anonymized_data['loan_approved'].mean()
    utility_preservation = 1 - abs(original_approval_rate - anonymized_approval_rate)
    print(f"Utility Preservation: {utility_preservation:.2%}")
    
    return info_loss, utility_preservation

if k_anonymous_data is not None:
    info_loss, utility = calculate_privacy_metrics(biased_data, k_anonymous_data)
\`\`\`

## Responsible AI Development

### AI Governance Framework
\`\`\`python
# AI Governance Framework
class AIGovernance:
    def __init__(self):
        self.governance_pillars = {
            'Ethics Review': 'Regular ethical review of AI systems',
            'Risk Assessment': 'Comprehensive risk assessment and mitigation',
            'Monitoring': 'Continuous monitoring of AI system performance',
            'Audit Trail': 'Maintain detailed audit trails',
            'Human Oversight': 'Ensure human oversight and control',
            'Stakeholder Engagement': 'Engage with all stakeholders'
        }
        
        self.risk_categories = {
            'Technical Risk': 'Model performance, bias, robustness',
            'Ethical Risk': 'Fairness, privacy, transparency',
            'Legal Risk': 'Compliance, liability, regulations',
            'Social Risk': 'Impact on society, employment, inequality',
            'Operational Risk': 'System reliability, security, maintenance'
        }
    
    def conduct_risk_assessment(self, system_name, risks):
        """Conduct risk assessment for an AI system"""
        print(f"Risk Assessment for {system_name}:")
        print("=" * 40)
        
        total_risk = 0
        for category, risk_level in risks.items():
            if category in self.risk_categories:
                risk_score = risk_level * 2  # Scale to 0-10
                total_risk += risk_score
                status = "High" if risk_score >= 7 else "Medium" if risk_score >= 4 else "Low"
                print(f"{category}: {risk_score:.1f}/10 - {status}")
        
        overall_risk = total_risk / len(risks)
        print(f"\\nOverall Risk Score: {overall_risk:.1f}/10")
        
        if overall_risk >= 7:
            print("Recommendation: High Risk - Requires immediate attention")
        elif overall_risk >= 4:
            print("Recommendation: Medium Risk - Monitor closely")
        else:
            print("Recommendation: Low Risk - Standard monitoring")
        
        return overall_risk
    
    def create_governance_checklist(self):
        """Create a governance checklist"""
        print("\\nAI Governance Checklist:")
        print("=" * 25)
        
        checklist_items = [
            "✓ Ethical principles defined and documented",
            "✓ Bias testing and mitigation implemented",
            "✓ Privacy protection measures in place",
            "✓ Model interpretability and explainability ensured",
            "✓ Human oversight and control mechanisms established",
            "✓ Risk assessment completed and documented",
            "✓ Monitoring and alerting systems implemented",
            "✓ Audit trail and logging configured",
            "✓ Stakeholder engagement and communication plan",
            "✓ Legal and regulatory compliance verified",
            "✓ Security measures and access controls implemented",
            "✓ Performance monitoring and evaluation metrics defined"
        ]
        
        for item in checklist_items:
            print(item)
    
    def recommend_mitigation_strategies(self, risk_level):
        """Recommend mitigation strategies based on risk level"""
        print(f"\\nMitigation Strategies (Risk Level: {risk_level:.1f}):")
        print("=" * 45)
        
        if risk_level >= 7:
            strategies = [
                "Implement comprehensive bias testing",
                "Establish human-in-the-loop controls",
                "Conduct regular ethical reviews",
                "Implement real-time monitoring",
                "Create detailed documentation and audit trails"
            ]
        elif risk_level >= 4:
            strategies = [
                "Implement bias detection and monitoring",
                "Establish regular review processes",
                "Create documentation and guidelines",
                "Implement basic monitoring systems"
            ]
        else:
            strategies = [
                "Implement standard monitoring",
                "Create basic documentation",
                "Establish periodic reviews"
            ]
        
        for i, strategy in enumerate(strategies, 1):
            print(f"{i}. {strategy}")

# Apply governance framework
governance = AIGovernance()

# Conduct risk assessment
sample_risks = {
    'Technical Risk': 3.5,
    'Ethical Risk': 4.0,
    'Legal Risk': 2.0,
    'Social Risk': 3.0,
    'Operational Risk': 2.5
}

risk_score = governance.conduct_risk_assessment("Loan Approval AI", sample_risks)

# Display governance checklist
governance.create_governance_checklist()

# Recommend mitigation strategies
governance.recommend_mitigation_strategies(risk_score)

# Create governance dashboard
def create_governance_dashboard():
    """Create a governance dashboard visualization"""
    fig, axes = plt.subplots(2, 2, figsize=(15, 10))
    
    # Risk assessment pie chart
    risk_labels = list(sample_risks.keys())
    risk_values = [score * 2 for score in sample_risks.values()]
    colors = ['red' if v >= 7 else 'orange' if v >= 4 else 'green' for v in risk_values]
    
    axes[0, 0].pie(risk_values, labels=risk_labels, colors=colors, autopct='%1.1f%%')
    axes[0, 0].set_title('Risk Assessment Distribution')
    
    # Governance pillars
    pillars = list(governance.governance_pillars.keys())
    pillar_scores = [8, 7, 6, 9, 8, 7]  # Example scores
    
    axes[0, 1].barh(pillars, pillar_scores, color='skyblue')
    axes[0, 1].set_title('Governance Pillars Score')
    axes[0, 1].set_xlabel('Score (0-10)')
    
    # Ethical principles
    principles = list(ethics_framework.principles.keys())
    principle_scores = [8, 6, 9, 7, 8, 9]  # Example scores
    
    axes[1, 0].bar(principles, principle_scores, color='lightgreen')
    axes[1, 0].set_title('Ethical Principles Score')
    axes[1, 0].set_ylabel('Score (0-10)')
    axes[1, 0].tick_params(axis='x', rotation=45)
    
    # Overall governance score
    overall_score = np.mean(pillar_scores + principle_scores)
    axes[1, 1].pie([overall_score, 10 - overall_score], 
                   labels=['Governance Score', 'Gap'], 
                   colors=['green', 'lightgray'],
                   autopct='%1.1f%%')
    axes[1, 1].set_title(f'Overall Governance Score: {overall_score:.1f}/10')
    
    plt.tight_layout()
    plt.show()

create_governance_dashboard()
\`\`\`

## Practical Exercise

Apply AI ethics and responsible AI practices:
1. Identify bias in AI systems
2. Implement bias mitigation techniques
3. Ensure model interpretability
4. Apply privacy-preserving methods
5. Conduct risk assessments
6. Establish governance frameworks
7. Create monitoring systems
8. Develop ethical guidelines

## Summary & Next Steps

AI ethics and responsible AI development are crucial for building trustworthy AI systems. Master these principles to create AI solutions that benefit society while minimizing harm.

**Next up**: Part 10 - AI in business and industry.`,
            readTime: 33,
            publishedAt: new Date(Date.now() + 37 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['AI Ethics', 'Bias Mitigation', 'Explainable AI', 'Privacy', 'Responsible AI']
          },
          {
            id: 'ai-part-10',
            partNumber: 10,
            title: 'AI in Business and Industry',
            summary: 'Explore real-world AI applications across industries and learn how to implement AI solutions in business contexts.',
            content: `# Part 10: AI in Business and Industry

Discover how AI is transforming businesses across industries and learn to implement AI solutions that drive real value.

## AI Applications Across Industries

### Industry-Specific AI Solutions
\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

# AI Industry Applications Framework
class AIIndustryApplications:
    def __init__(self):
        self.industries = {
            'Healthcare': {
                'applications': ['Medical diagnosis', 'Drug discovery', 'Personalized treatment', 'Medical imaging'],
                'technologies': ['Computer Vision', 'NLP', 'Deep Learning', 'Reinforcement Learning'],
                'benefits': ['Improved accuracy', 'Faster diagnosis', 'Cost reduction', 'Better outcomes'],
                'challenges': ['Data privacy', 'Regulatory compliance', 'Ethical considerations', 'Integration']
            },
            'Finance': {
                'applications': ['Fraud detection', 'Algorithmic trading', 'Credit scoring', 'Risk assessment'],
                'technologies': ['Machine Learning', 'Time Series Analysis', 'NLP', 'Graph Analytics'],
                'benefits': ['Reduced fraud', 'Better risk management', 'Automated processes', 'Improved accuracy'],
                'challenges': ['Regulatory compliance', 'Model interpretability', 'Data quality', 'Security']
            },
            'Retail': {
                'applications': ['Recommendation systems', 'Inventory management', 'Price optimization', 'Customer service'],
                'technologies': ['Collaborative Filtering', 'Computer Vision', 'NLP', 'Time Series'],
                'benefits': ['Increased sales', 'Better customer experience', 'Optimized operations', 'Reduced costs'],
                'challenges': ['Data integration', 'Real-time processing', 'Personalization', 'Competition']
            },
            'Manufacturing': {
                'applications': ['Predictive maintenance', 'Quality control', 'Supply chain optimization', 'Robotics'],
                'technologies': ['IoT', 'Computer Vision', 'Time Series', 'Reinforcement Learning'],
                'benefits': ['Reduced downtime', 'Improved quality', 'Cost savings', 'Increased efficiency'],
                'challenges': ['Data integration', 'Legacy systems', 'Skill gaps', 'Investment costs']
            },
            'Transportation': {
                'applications': ['Autonomous vehicles', 'Route optimization', 'Traffic management', 'Predictive maintenance'],
                'technologies': ['Computer Vision', 'Reinforcement Learning', 'Graph Analytics', 'IoT'],
                'benefits': ['Safety improvement', 'Efficiency gains', 'Cost reduction', 'Environmental benefits'],
                'challenges': ['Safety concerns', 'Regulatory issues', 'Infrastructure', 'Public acceptance']
            }
        }
    
    def display_industry_overview(self, industry):
        """Display AI applications for a specific industry"""
        if industry in self.industries:
            info = self.industries[industry]
            print(f"AI Applications in {industry}:")
            print("=" * 40)
            
            print("\\nKey Applications:")
            for app in info['applications']:
                print(f"• {app}")
            
            print("\\nTechnologies Used:")
            for tech in info['technologies']:
                print(f"• {tech}")
            
            print("\\nBenefits:")
            for benefit in info['benefits']:
                print(f"• {benefit}")
            
            print("\\nChallenges:")
            for challenge in info['challenges']:
                print(f"• {challenge}")
        else:
            print(f"Industry '{industry}' not found in database")
    
    def compare_industries(self, industries):
        """Compare AI adoption across industries"""
        comparison_data = []
        for industry in industries:
            if industry in self.industries:
                info = self.industries[industry]
                comparison_data.append({
                    'Industry': industry,
                    'Applications': len(info['applications']),
                    'Technologies': len(info['technologies']),
                    'Benefits': len(info['benefits']),
                    'Challenges': len(info['challenges'])
                })
        
        return pd.DataFrame(comparison_data)

# Initialize framework
ai_applications = AIIndustryApplications()

# Display healthcare applications
ai_applications.display_industry_overview('Healthcare')

# Compare industries
industries_to_compare = ['Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Transportation']
comparison_df = ai_applications.compare_industries(industries_to_compare)

print("\\nIndustry Comparison:")
print(comparison_df)

# Visualize industry comparison
plt.figure(figsize=(15, 10))

plt.subplot(2, 3, 1)
plt.bar(comparison_df['Industry'], comparison_df['Applications'], color='skyblue')
plt.title('Number of AI Applications by Industry')
plt.ylabel('Count')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 2)
plt.bar(comparison_df['Industry'], comparison_df['Technologies'], color='lightgreen')
plt.title('Technologies Used by Industry')
plt.ylabel('Count')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 3)
plt.bar(comparison_df['Industry'], comparison_df['Benefits'], color='orange')
plt.title('Benefits by Industry')
plt.ylabel('Count')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 4)
plt.bar(comparison_df['Industry'], comparison_df['Challenges'], color='lightcoral')
plt.title('Challenges by Industry')
plt.ylabel('Count')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 5)
# Radar chart for one industry
industry_data = comparison_df[comparison_df['Industry'] == 'Healthcare'].iloc[0]
categories = ['Applications', 'Technologies', 'Benefits', 'Challenges']
values = [industry_data['Applications'], industry_data['Technologies'], 
          industry_data['Benefits'], industry_data['Challenges']]

angles = np.linspace(0, 2 * np.pi, len(categories), endpoint=False).tolist()
values += values[:1]  # Complete the circle
angles += angles[:1]

plt.polar(angles, values, 'o-', linewidth=2)
plt.fill(angles, values, alpha=0.25)
plt.xticks(angles[:-1], categories)
plt.title('Healthcare AI Profile')
plt.grid(True)

plt.subplot(2, 3, 6)
# Heatmap of all industries
heatmap_data = comparison_df.set_index('Industry')[['Applications', 'Technologies', 'Benefits', 'Challenges']]
sns.heatmap(heatmap_data, annot=True, cmap='YlOrRd', fmt='d')
plt.title('Industry AI Profile Heatmap')

plt.tight_layout()
plt.show()
\`\`\`

## Business Value and ROI

### Measuring AI Business Impact
\`\`\`python
# AI Business Value Calculator
class AIBusinessValue:
    def __init__(self):
        self.value_drivers = {
            'Cost Reduction': {
                'automation': 'Automated processes reduce manual labor costs',
                'efficiency': 'Improved efficiency reduces operational costs',
                'maintenance': 'Predictive maintenance reduces downtime costs'
            },
            'Revenue Growth': {
                'personalization': 'Personalized recommendations increase sales',
                'pricing': 'Dynamic pricing optimizes revenue',
                'cross_sell': 'Cross-selling and upselling opportunities'
            },
            'Risk Mitigation': {
                'fraud_detection': 'AI-powered fraud detection reduces losses',
                'compliance': 'Automated compliance reduces regulatory risks',
                'quality': 'Quality control reduces defect costs'
            },
            'Customer Experience': {
                'satisfaction': 'Improved customer satisfaction and retention',
                'support': '24/7 AI-powered customer support',
                'personalization': 'Personalized customer experiences'
            }
        }
    
    def calculate_roi(self, initial_investment, annual_benefits, years=3):
        """Calculate ROI for AI investment"""
        total_benefits = annual_benefits * years
        roi = ((total_benefits - initial_investment) / initial_investment) * 100
        payback_period = initial_investment / annual_benefits
        
        return {
            'total_benefits': total_benefits,
            'roi_percentage': roi,
            'payback_period_years': payback_period,
            'net_benefit': total_benefits - initial_investment
        }
    
    def estimate_ai_value(self, use_case, company_size, industry):
        """Estimate AI value for a specific use case"""
        # Base value estimates (simplified)
        base_values = {
            'small': {'cost_reduction': 50000, 'revenue_growth': 100000, 'risk_mitigation': 25000},
            'medium': {'cost_reduction': 200000, 'revenue_growth': 500000, 'risk_mitigation': 100000},
            'large': {'cost_reduction': 1000000, 'revenue_growth': 2000000, 'risk_mitigation': 500000}
        }
        
        # Industry multipliers
        industry_multipliers = {
            'Healthcare': 1.5,
            'Finance': 1.3,
            'Retail': 1.2,
            'Manufacturing': 1.4,
            'Transportation': 1.1
        }
        
        # Use case multipliers
        use_case_multipliers = {
            'automation': 1.0,
            'personalization': 1.2,
            'fraud_detection': 1.1,
            'predictive_maintenance': 1.3,
            'recommendation_system': 1.1
        }
        
        # Calculate estimated value
        base_value = base_values[company_size][use_case]
        industry_mult = industry_multipliers.get(industry, 1.0)
        use_case_mult = use_case_multipliers.get(use_case, 1.0)
        
        estimated_value = base_value * industry_mult * use_case_mult
        
        return {
            'base_value': base_value,
            'industry_multiplier': industry_mult,
            'use_case_multiplier': use_case_mult,
            'estimated_annual_value': estimated_value
        }

# Initialize business value calculator
business_value = AIBusinessValue()

# Example ROI calculation
initial_investment = 500000  # $500K initial investment
annual_benefits = 200000     # $200K annual benefits
roi_result = business_value.calculate_roi(initial_investment, annual_benefits)

print("AI Investment ROI Analysis:")
print("=" * 30)
print("Initial Investment: $" + str(initial_investment))
print("Annual Benefits: $" + str(annual_benefits))
print("Total Benefits (3 years): $" + str(roi_result['total_benefits']))
print("ROI: " + str(roi_result['roi_percentage']) + "%")
print("Payback Period: " + str(roi_result['payback_period_years']) + " years")
print("Net Benefit: $" + str(roi_result['net_benefit']))

# Estimate value for different scenarios
scenarios = [
    ('automation', 'medium', 'Manufacturing'),
    ('personalization', 'large', 'Retail'),
    ('fraud_detection', 'large', 'Finance'),
    ('predictive_maintenance', 'medium', 'Transportation')
]

print("\\nAI Value Estimates by Scenario:")
print("=" * 40)

scenario_results = []
for use_case, size, industry in scenarios:
    value_estimate = business_value.estimate_ai_value(use_case, size, industry)
    scenario_results.append({
        'Use Case': use_case,
        'Company Size': size,
        'Industry': industry,
        'Estimated Value': value_estimate.estimated_annual_value
    })
    print(f"{use_case} ({size} {industry}): $" + str(value_estimate['estimated_annual_value']))

# Visualize value estimates
scenario_df = pd.DataFrame(scenario_results)

plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.bar(scenario_df['Use Case'], scenario_df['Estimated Value'], color='lightblue')
plt.title('AI Value Estimates by Use Case')
plt.ylabel('Estimated Annual Value ($)')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 2)
industry_values = scenario_df.groupby('Industry')['Estimated Value'].sum()
plt.pie(industry_values.values, labels=industry_values.index, autopct='%1.1f%%')
plt.title('Value Distribution by Industry')

plt.subplot(1, 3, 3)
size_values = scenario_df.groupby('Company Size')['Estimated Value'].sum()
plt.bar(size_values.index, size_values.values, color=['lightgreen', 'orange', 'red'])
plt.title('Value by Company Size')
plt.ylabel('Total Estimated Value ($)')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## AI Implementation Strategy

### Building AI Solutions for Business
\`\`\`python
# AI Implementation Framework
class AIImplementationFramework:
    def __init__(self):
        self.implementation_phases = {
            'Phase 1: Assessment': {
                'duration': '2-4 weeks',
                'activities': [
                    'Business needs analysis',
                    'Data assessment',
                    'Technology evaluation',
                    'Resource planning',
                    'Risk assessment'
                ],
                'deliverables': [
                    'Business case',
                    'Data inventory',
                    'Technology roadmap',
                    'Resource plan',
                    'Risk mitigation plan'
                ]
            },
            'Phase 2: Planning': {
                'duration': '4-6 weeks',
                'activities': [
                    'Solution design',
                    'Architecture planning',
                    'Data preparation',
                    'Model selection',
                    'Infrastructure setup'
                ],
                'deliverables': [
                    'Solution architecture',
                    'Data pipeline design',
                    'Model specifications',
                    'Infrastructure plan',
                    'Implementation timeline'
                ]
            },
            'Phase 3: Development': {
                'duration': '8-12 weeks',
                'activities': [
                    'Data preprocessing',
                    'Model development',
                    'Testing and validation',
                    'Integration development',
                    'Documentation'
                ],
                'deliverables': [
                    'Trained models',
                    'API endpoints',
                    'Test results',
                    'Integration code',
                    'Technical documentation'
                ]
            },
            'Phase 4: Deployment': {
                'duration': '2-4 weeks',
                'activities': [
                    'Production deployment',
                    'Performance monitoring',
                    'User training',
                    'Go-live support',
                    'Documentation updates'
                ],
                'deliverables': [
                    'Production system',
                    'Monitoring dashboard',
                    'User guides',
                    'Support procedures',
                    'Updated documentation'
                ]
            },
            'Phase 5: Optimization': {
                'duration': 'Ongoing',
                'activities': [
                    'Performance monitoring',
                    'Model retraining',
                    'Feature enhancement',
                    'User feedback integration',
                    'Continuous improvement'
                ],
                'deliverables': [
                    'Performance reports',
                    'Updated models',
                    'Enhanced features',
                    'User feedback analysis',
                    'Improvement roadmap'
                ]
            }
        }
    
    def display_implementation_plan(self):
        """Display the AI implementation plan"""
        print("AI Implementation Framework:")
        print("=" * 40)
        
        for phase, details in self.implementation_phases.items():
            print(f"\\n{phase}")
            print(f"Duration: {details['duration']}")
            print("\\nActivities:")
            for activity in details['activities']:
                print(f"• {activity}")
            print("\\nDeliverables:")
            for deliverable in details['deliverables']:
                print(f"• {deliverable}")
            print("-" * 40)
    
    def estimate_timeline(self, complexity='medium'):
        """Estimate implementation timeline based on complexity"""
        complexity_multipliers = {
            'simple': 0.7,
            'medium': 1.0,
            'complex': 1.5
        }
        
        base_duration = 20  # weeks
        multiplier = complexity_multipliers.get(complexity, 1.0)
        estimated_duration = base_duration * multiplier
        
        return {
            'complexity': complexity,
            'estimated_duration_weeks': estimated_duration,
            'estimated_duration_months': estimated_duration / 4
        }

# Initialize implementation framework
implementation = AIImplementationFramework()
implementation.display_implementation_plan()

# Estimate timeline
timeline_estimate = implementation.estimate_timeline('medium')
print(f"\\nTimeline Estimate for Medium Complexity:")
print(f"Estimated Duration: {timeline_estimate['estimated_duration_weeks']} weeks ({timeline_estimate['estimated_duration_months']:.1f} months)")

# AI Success Factors
class AISuccessFactors:
    def __init__(self):
        self.success_factors = {
            'Data Quality': {
                'importance': 'High',
                'description': 'Clean, relevant, and sufficient data is crucial for AI success',
                'best_practices': [
                    'Establish data governance',
                    'Implement data quality checks',
                    'Ensure data privacy and security',
                    'Maintain data documentation'
                ]
            },
            'Clear Objectives': {
                'importance': 'High',
                'description': 'Well-defined business objectives and success metrics',
                'best_practices': [
                    'Define specific business goals',
                    'Establish measurable KPIs',
                    'Align AI goals with business strategy',
                    'Set realistic expectations'
                ]
            },
            'Team Expertise': {
                'importance': 'High',
                'description': 'Skilled team with domain knowledge and AI expertise',
                'best_practices': [
                    'Hire or train AI specialists',
                    'Ensure domain expertise',
                    'Foster cross-functional collaboration',
                    'Invest in continuous learning'
                ]
            },
            'Technology Infrastructure': {
                'importance': 'Medium',
                'description': 'Robust technology infrastructure to support AI systems',
                'best_practices': [
                    'Choose appropriate technology stack',
                    'Ensure scalability and reliability',
                    'Implement security measures',
                    'Plan for maintenance and updates'
                ]
            },
            'Change Management': {
                'importance': 'Medium',
                'description': 'Effective change management to ensure user adoption',
                'best_practices': [
                    'Communicate benefits clearly',
                    'Provide comprehensive training',
                    'Address resistance to change',
                    'Celebrate early wins'
                ]
            },
            'Continuous Monitoring': {
                'importance': 'High',
                'description': 'Ongoing monitoring and optimization of AI systems',
                'best_practices': [
                    'Implement performance monitoring',
                    'Regular model retraining',
                    'User feedback collection',
                    'Continuous improvement processes'
                ]
            }
        }
    
    def assess_readiness(self, organization_profile):
        """Assess AI readiness of an organization"""
        readiness_scores = {}
        
        for factor, details in self.success_factors.items():
            if factor in organization_profile:
                score = organization_profile[factor]
                readiness_scores[factor] = {
                    'score': score,
                    'importance': details['importance'],
                    'status': 'Good' if score >= 7 else 'Needs Improvement' if score >= 4 else 'Poor'
                }
        
        return readiness_scores
    
    def recommend_improvements(self, readiness_scores):
        """Recommend improvements based on readiness assessment"""
        recommendations = []
        
        for factor, scores in readiness_scores.items():
            if scores['score'] < 7 and scores['importance'] == 'High':
                recommendations.append({
                    'factor': factor,
                    'priority': 'High',
                    'action': f"Improve {factor} - Current score: {scores['score']}/10"
                })
            elif scores['score'] < 5:
                recommendations.append({
                    'factor': factor,
                    'priority': 'Medium',
                    'action': f"Address {factor} - Current score: {scores['score']}/10"
                })
        
        return recommendations

# Initialize success factors
success_factors = AISuccessFactors()

# Example organization assessment
organization_profile = {
    'Data Quality': 8,
    'Clear Objectives': 6,
    'Team Expertise': 5,
    'Technology Infrastructure': 7,
    'Change Management': 4,
    'Continuous Monitoring': 6
}

readiness_scores = success_factors.assess_readiness(organization_profile)

print("\\nAI Readiness Assessment:")
print("=" * 30)
for factor, scores in readiness_scores.items():
    print(f"{factor}: {scores['score']}/10 - {scores['status']} ({scores['importance']} importance)")

# Get recommendations
recommendations = success_factors.recommend_improvements(readiness_scores)

print("\\nRecommendations:")
print("=" * 20)
for rec in recommendations:
    print(f"{rec['priority']} Priority: {rec['action']}")

# Visualize readiness assessment
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
factors = list(readiness_scores.keys())
scores = [scores['score'] for scores in readiness_scores.values()]
colors = ['green' if s >= 7 else 'orange' if s >= 4 else 'red' for s in scores]

plt.bar(factors, scores, color=colors)
plt.title('AI Readiness Assessment')
plt.ylabel('Score (0-10)')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 2)
# Importance vs Score
importance_map = {'High': 3, 'Medium': 2, 'Low': 1}
importance_scores = [importance_map[scores['importance']] for scores in readiness_scores.values()]

plt.scatter(importance_scores, scores, s=100, alpha=0.7)
for i, factor in enumerate(factors):
    plt.annotate(factor, (importance_scores[i], scores[i]), xytext=(5, 5), textcoords='offset points')
plt.xlabel('Importance (1=Low, 2=Medium, 3=High)')
plt.ylabel('Current Score')
plt.title('Importance vs Current Score')
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 3)
# Recommendations priority
if recommendations:
    rec_priorities = [rec['priority'] for rec in recommendations]
    priority_counts = pd.Series(rec_priorities).value_counts()
    plt.pie(priority_counts.values, labels=priority_counts.index, autopct='%1.1f%%')
    plt.title('Recommendation Priorities')
else:
    plt.text(0.5, 0.5, 'No recommendations needed', ha='center', va='center', transform=plt.gca().transAxes)
    plt.title('Recommendation Priorities')

plt.tight_layout()
plt.show()
\`\`\`

## Case Studies and Best Practices

### Real-World AI Success Stories
\`\`\`python
# AI Case Studies
class AICaseStudies:
    def __init__(self):
        self.case_studies = {
            'Netflix Recommendation System': {
                'industry': 'Entertainment',
                'challenge': 'Improve user engagement and retention',
                'solution': 'Machine learning-based recommendation engine',
                'technology': 'Collaborative filtering, Content-based filtering, Deep learning',
                'results': {
                    'user_engagement': '+75%',
                    'retention_rate': '+25%',
                    'revenue_impact': '+$1B annually',
                    'cost_savings': '$1B in content production'
                },
                'key_learnings': [
                    'Data quality is crucial for recommendation accuracy',
                    'A/B testing is essential for optimization',
                    'User feedback integration improves performance',
                    'Continuous model updates are necessary'
                ]
            },
            'Tesla Autopilot': {
                'industry': 'Automotive',
                'challenge': 'Develop safe autonomous driving technology',
                'solution': 'Computer vision and neural networks for autonomous driving',
                'technology': 'Computer Vision, Deep Learning, Sensor Fusion, Reinforcement Learning',
                'results': {
                    'safety_improvement': '40% reduction in accidents',
                    'efficiency_gain': '15% better fuel economy',
                    'user_satisfaction': '90% positive feedback',
                    'market_impact': 'Leading autonomous vehicle technology'
                },
                'key_learnings': [
                    'Safety must be the top priority',
                    'Extensive testing and validation required',
                    'Regulatory compliance is critical',
                    'User education and trust building essential'
                ]
            },
            'Amazon Supply Chain Optimization': {
                'industry': 'E-commerce',
                'challenge': 'Optimize inventory and delivery operations',
                'solution': 'AI-powered demand forecasting and route optimization',
                'technology': 'Time Series Analysis, Optimization Algorithms, Machine Learning',
                'results': {
                    'inventory_reduction': '20%',
                    'delivery_speed': '50% faster',
                    'cost_savings': '$2B annually',
                    'customer_satisfaction': '+30%'
                },
                'key_learnings': [
                    'Real-time data processing is crucial',
                    'Integration with existing systems is challenging',
                    'Scalability must be planned from the start',
                    'Continuous optimization is necessary'
                ]
            },
            'Google Search Algorithm': {
                'industry': 'Technology',
                'challenge': 'Provide relevant search results at scale',
                'solution': 'Machine learning algorithms for search ranking',
                'technology': 'Natural Language Processing, Machine Learning, Deep Learning',
                'results': {
                    'search_accuracy': '95% relevance',
                    'user_satisfaction': '90% positive feedback',
                    'market_share': '90% global search market',
                    'revenue_impact': '$100B+ annually'
                },
                'key_learnings': [
                    'User intent understanding is critical',
                    'Algorithm transparency is important',
                    'Continuous learning and adaptation needed',
                    'Ethical considerations must be addressed'
                ]
            }
        }
    
    def display_case_study(self, case_name):
        """Display a specific case study"""
        if case_name in self.case_studies:
            case = self.case_studies[case_name]
            print(f"Case Study: {case_name}")
            print("=" * 50)
            print(f"Industry: {case['industry']}")
            print(f"Challenge: {case['challenge']}")
            print(f"Solution: {case['solution']}")
            print(f"Technology: {case['technology']}")
            
            print("\\nResults:")
            for metric, value in case['results'].items():
                print(f"• {metric.replace('_', ' ').title()}: {value}")
            
            print("\\nKey Learnings:")
            for learning in case['key_learnings']:
                print(f"• {learning}")
        else:
            print(f"Case study '{case_name}' not found")
    
    def analyze_success_patterns(self):
        """Analyze common success patterns across case studies"""
        patterns = {
            'Data Quality': 0,
            'Clear Objectives': 0,
            'Technology Integration': 0,
            'User Focus': 0,
            'Continuous Improvement': 0,
            'Ethical Considerations': 0
        }
        
        for case in self.case_studies.values():
            learnings = case['key_learnings']
            for learning in learnings:
                if 'data' in learning.lower():
                    patterns['Data Quality'] += 1
                if 'objective' in learning.lower() or 'goal' in learning.lower():
                    patterns['Clear Objectives'] += 1
                if 'integration' in learning.lower() or 'system' in learning.lower():
                    patterns['Technology Integration'] += 1
                if 'user' in learning.lower() or 'customer' in learning.lower():
                    patterns['User Focus'] += 1
                if 'continuous' in learning.lower() or 'ongoing' in learning.lower():
                    patterns['Continuous Improvement'] += 1
                if 'ethical' in learning.lower() or 'safety' in learning.lower():
                    patterns['Ethical Considerations'] += 1
        
        return patterns

# Initialize case studies
case_studies = AICaseStudies()

# Display a case study
case_studies.display_case_study('Netflix Recommendation System')

# Analyze success patterns
success_patterns = case_studies.analyze_success_patterns()

print("\\nCommon Success Patterns:")
print("=" * 30)
for pattern, count in success_patterns.items():
    print(f"{pattern}: {count} mentions")

# Visualize case study results
plt.figure(figsize=(15, 10))

plt.subplot(2, 3, 1)
# Results comparison
case_names = list(case_studies.case_studies.keys())
revenue_impacts = []
for case in case_studies.case_studies.values():
    revenue = case['results'].get('revenue_impact', 'N/A')
    if revenue != 'N/A':
        # Extract numeric value (simplified)
        if 'B' in revenue:
            revenue_impacts.append(float(revenue.replace('$', '').replace('B', '')))
        else:
            revenue_impacts.append(0)
    else:
        revenue_impacts.append(0)

plt.bar(range(len(case_names)), revenue_impacts, color='lightblue')
plt.title('Revenue Impact by Case Study')
plt.ylabel('Revenue Impact ($B)')
plt.xticks(range(len(case_names)), [name.split()[0] for name in case_names], rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 2)
# Success patterns
patterns = list(success_patterns.keys())
counts = list(success_patterns.values())
plt.bar(patterns, counts, color='lightgreen')
plt.title('Common Success Patterns')
plt.ylabel('Frequency')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 3)
# Technology usage
technologies = []
for case in case_studies.case_studies.values():
    tech_list = case['technology'].split(', ')
    technologies.extend(tech_list)

tech_counts = pd.Series(technologies).value_counts()
plt.pie(tech_counts.values, labels=tech_counts.index, autopct='%1.1f%%')
plt.title('Technology Usage Distribution')

plt.subplot(2, 3, 4)
# Industry distribution
industries = [case['industry'] for case in case_studies.case_studies.values()]
industry_counts = pd.Series(industries).value_counts()
plt.bar(industry_counts.index, industry_counts.values, color='orange')
plt.title('Case Studies by Industry')
plt.ylabel('Count')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 5)
# Results metrics
metrics = ['user_engagement', 'cost_savings', 'efficiency_gain', 'safety_improvement']
metric_values = []
for metric in metrics:
    count = 0
    for case in case_studies.case_studies.values():
        if metric in case['results']:
            count += 1
    metric_values.append(count)

plt.bar(metrics, metric_values, color='lightcoral')
plt.title('Common Success Metrics')
plt.ylabel('Number of Cases')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 6)
# Key learnings word cloud (simplified)
all_learnings = []
for case in case_studies.case_studies.values():
    all_learnings.extend(case['key_learnings'])

# Count common words
common_words = ['data', 'user', 'continuous', 'integration', 'safety', 'testing', 'quality', 'performance']
word_counts = [sum(1 for learning in all_learnings if word in learning.lower()) for word in common_words]

plt.bar(common_words, word_counts, color='purple')
plt.title('Common Learning Themes')
plt.ylabel('Frequency')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Practical Exercise

Apply AI in business contexts:
1. Identify AI opportunities in your industry
2. Calculate potential ROI for AI investments
3. Develop AI implementation strategies
4. Assess organizational AI readiness
5. Learn from successful case studies
6. Plan change management approaches
7. Establish success metrics
8. Create AI governance frameworks

## Summary & Next Steps

AI in business and industry requires strategic thinking, careful planning, and focus on real business value. Master these approaches to successfully implement AI solutions that drive meaningful results.

**Next up**: Part 11 - AI tools and frameworks.`,
            readTime: 34,
            publishedAt: new Date(Date.now() + 38 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Business AI', 'ROI', 'Implementation', 'Case Studies', 'Industry Applications']
          },
          {
            id: 'ai-part-11',
            partNumber: 11,
            title: 'AI Tools and Frameworks',
            summary: 'Explore the essential AI tools, frameworks, and platforms that power modern AI development and deployment.',
            content: `# Part 11: AI Tools and Frameworks

Master the essential tools and frameworks that power modern AI development, from data processing to model deployment.

## AI Development Ecosystem

### Core AI Frameworks and Libraries
\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

# AI Tools and Frameworks Overview
class AIToolsFramework:
    def __init__(self):
        self.frameworks = {
            'Machine Learning': {
                'scikit-learn': {
                    'description': 'Comprehensive machine learning library for Python',
                    'strengths': ['Easy to use', 'Well documented', 'Wide algorithm coverage', 'Production ready'],
                    'use_cases': ['Classification', 'Regression', 'Clustering', 'Dimensionality reduction'],
                    'learning_curve': 'Beginner',
                    'performance': 'Good for small to medium datasets'
                },
                'XGBoost': {
                    'description': 'Gradient boosting framework for high performance',
                    'strengths': ['High performance', 'Handles missing values', 'Feature importance', 'Cross-platform'],
                    'use_cases': ['Tabular data', 'Competitions', 'Production systems', 'Feature engineering'],
                    'learning_curve': 'Intermediate',
                    'performance': 'Excellent for structured data'
                },
                'LightGBM': {
                    'description': 'Fast gradient boosting framework',
                    'strengths': ['Memory efficient', 'Fast training', 'Good accuracy', 'GPU support'],
                    'use_cases': ['Large datasets', 'Real-time prediction', 'Feature selection', 'Ensemble methods'],
                    'learning_curve': 'Intermediate',
                    'performance': 'Excellent for large datasets'
                }
            },
            'Deep Learning': {
                'TensorFlow': {
                    'description': 'End-to-end open source platform for machine learning',
                    'strengths': ['Production ready', 'Scalable', 'Mobile support', 'TensorBoard'],
                    'use_cases': ['Neural networks', 'Computer vision', 'NLP', 'Reinforcement learning'],
                    'learning_curve': 'Advanced',
                    'performance': 'Excellent for complex models'
                },
                'PyTorch': {
                    'description': 'Dynamic neural network framework',
                    'strengths': ['Dynamic graphs', 'Research friendly', 'Pythonic', 'Strong community'],
                    'use_cases': ['Research', 'Prototyping', 'Computer vision', 'NLP'],
                    'learning_curve': 'Intermediate',
                    'performance': 'Excellent for research and development'
                },
                'Keras': {
                    'description': 'High-level neural networks API',
                    'strengths': ['User friendly', 'Modular', 'Extensible', 'Multiple backends'],
                    'use_cases': ['Rapid prototyping', 'Education', 'Simple models', 'Transfer learning'],
                    'learning_curve': 'Beginner',
                    'performance': 'Good for rapid development'
                }
            },
            'Computer Vision': {
                'OpenCV': {
                    'description': 'Computer vision and machine learning library',
                    'strengths': ['Comprehensive', 'Optimized', 'Cross-platform', 'Real-time'],
                    'use_cases': ['Image processing', 'Object detection', 'Face recognition', 'Video analysis'],
                    'learning_curve': 'Intermediate',
                    'performance': 'Excellent for computer vision tasks'
                },
                'PIL/Pillow': {
                    'description': 'Python Imaging Library',
                    'strengths': ['Simple', 'Lightweight', 'Format support', 'Basic operations'],
                    'use_cases': ['Image manipulation', 'Format conversion', 'Basic processing', 'Thumbnails'],
                    'learning_curve': 'Beginner',
                    'performance': 'Good for basic image operations'
                }
            },
            'Natural Language Processing': {
                'NLTK': {
                    'description': 'Natural Language Toolkit',
                    'strengths': ['Comprehensive', 'Educational', 'Research tools', 'Corpora'],
                    'use_cases': ['Text preprocessing', 'Tokenization', 'POS tagging', 'Sentiment analysis'],
                    'learning_curve': 'Beginner',
                    'performance': 'Good for research and education'
                },
                'spaCy': {
                    'description': 'Industrial-strength natural language processing',
                    'strengths': ['Fast', 'Accurate', 'Production ready', 'Multilingual'],
                    'use_cases': ['Named entity recognition', 'Dependency parsing', 'Text classification', 'Information extraction'],
                    'learning_curve': 'Intermediate',
                    'performance': 'Excellent for production NLP'
                },
                'Transformers': {
                    'description': 'State-of-the-art natural language processing',
                    'strengths': ['Pre-trained models', 'Easy to use', 'Hugging Face integration', 'Latest models'],
                    'use_cases': ['Text generation', 'Question answering', 'Summarization', 'Translation'],
                    'learning_curve': 'Intermediate',
                    'performance': 'Excellent for modern NLP tasks'
                }
            }
        }
    
    def display_framework_info(self, category, framework):
        """Display detailed information about a framework"""
        if category in self.frameworks and framework in self.frameworks[category]:
            info = self.frameworks[category][framework]
            print(f"{framework} - {info['description']}")
            print("=" * 50)
            
            print("\\nStrengths:")
            for strength in info['strengths']:
                print(f"• {strength}")
            
            print("\\nUse Cases:")
            for use_case in info['use_cases']:
                print(f"• {use_case}")
            
            print(f"\\nLearning Curve: {info['learning_curve']}")
            print(f"Performance: {info['performance']}")
        else:
            print(f"Framework '{framework}' not found in category '{category}'")
    
    def compare_frameworks(self, category):
        """Compare frameworks within a category"""
        if category in self.frameworks:
            comparison_data = []
            for framework, info in self.frameworks[category].items():
                comparison_data.append({
                    'Framework': framework,
                    'Learning Curve': info['learning_curve'],
                    'Use Cases': len(info['use_cases']),
                    'Strengths': len(info['strengths'])
                })
            return pd.DataFrame(comparison_data)
        return None

# Initialize framework overview
ai_tools = AIToolsFramework()

# Display framework information
ai_tools.display_framework_info('Machine Learning', 'scikit-learn')

# Compare frameworks
ml_comparison = ai_tools.compare_frameworks('Machine Learning')
print("\\nMachine Learning Frameworks Comparison:")
print(ml_comparison)

# Visualize framework comparison
plt.figure(figsize=(15, 10))

plt.subplot(2, 3, 1)
# Learning curve distribution
learning_curves = ['Beginner', 'Intermediate', 'Advanced']
curve_counts = [0, 0, 0]
for category in ai_tools.frameworks.values():
    for framework in category.values():
        if framework['learning_curve'] == 'Beginner':
            curve_counts[0] += 1
        elif framework['learning_curve'] == 'Intermediate':
            curve_counts[1] += 1
        else:
            curve_counts[2] += 1

plt.pie(curve_counts, labels=learning_curves, autopct='%1.1f%%')
plt.title('Framework Learning Curve Distribution')

plt.subplot(2, 3, 2)
# Use cases by category
categories = list(ai_tools.frameworks.keys())
use_case_counts = [sum(len(framework['use_cases']) for framework in category.values()) 
                   for category in ai_tools.frameworks.values()]

plt.bar(categories, use_case_counts, color='lightblue')
plt.title('Use Cases by Category')
plt.ylabel('Total Use Cases')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 3)
# Strengths by category
strength_counts = [sum(len(framework['strengths']) for framework in category.values()) 
                   for category in ai_tools.frameworks.values()]

plt.bar(categories, strength_counts, color='lightgreen')
plt.title('Strengths by Category')
plt.ylabel('Total Strengths')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 4)
# Framework count by category
framework_counts = [len(category) for category in ai_tools.frameworks.values()]
plt.bar(categories, framework_counts, color='orange')
plt.title('Frameworks by Category')
plt.ylabel('Number of Frameworks')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 5)
# ML frameworks comparison
if ml_comparison is not None:
    plt.bar(ml_comparison['Framework'], ml_comparison['Use Cases'], color='lightcoral')
    plt.title('ML Frameworks - Use Cases')
    plt.ylabel('Number of Use Cases')
    plt.xticks(rotation=45)
    plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 6)
# All frameworks heatmap
all_frameworks = []
all_use_cases = []
for category, frameworks in ai_tools.frameworks.items():
    for framework, info in frameworks.items():
        all_frameworks.append(f"{category}\\n{framework}")
        all_use_cases.append(len(info['use_cases']))

# Create a simple heatmap
framework_matrix = np.array(all_use_cases).reshape(-1, 1)
sns.heatmap(framework_matrix, yticklabels=all_frameworks, annot=True, fmt='d', cmap='YlOrRd')
plt.title('Use Cases Heatmap')
plt.xlabel('Use Cases Count')

plt.tight_layout()
plt.show()
\`\`\`

## Data Processing and Management

### Essential Data Tools
\`\`\`python
# Data Processing Tools
class DataProcessingTools:
    def __init__(self):
        self.data_tools = {
            'Data Manipulation': {
                'pandas': {
                    'description': 'Data analysis and manipulation library',
                    'features': ['DataFrames', 'Data cleaning', 'Aggregation', 'Time series'],
                    'performance': 'Good for medium datasets',
                    'use_cases': ['Data exploration', 'ETL processes', 'Data analysis', 'Data cleaning']
                },
                'NumPy': {
                    'description': 'Numerical computing library',
                    'features': ['Arrays', 'Linear algebra', 'Random numbers', 'Mathematical functions'],
                    'performance': 'Excellent for numerical operations',
                    'use_cases': ['Mathematical operations', 'Array processing', 'Scientific computing', 'ML algorithms']
                },
                'Dask': {
                    'description': 'Parallel computing library',
                    'features': ['Distributed computing', 'Lazy evaluation', 'Pandas compatibility', 'Scalability'],
                    'performance': 'Excellent for large datasets',
                    'use_cases': ['Big data processing', 'Parallel computing', 'Distributed ML', 'Data pipelines']
                }
            },
            'Data Visualization': {
                'matplotlib': {
                    'description': 'Comprehensive plotting library',
                    'features': ['Static plots', 'Customizable', 'Publication quality', 'Wide format support'],
                    'performance': 'Good for static visualizations',
                    'use_cases': ['Scientific plots', 'Custom visualizations', 'Publication graphics', 'Data exploration']
                },
                'seaborn': {
                    'description': 'Statistical data visualization',
                    'features': ['Statistical plots', 'Beautiful defaults', 'Pandas integration', 'Easy styling'],
                    'performance': 'Good for statistical visualizations',
                    'use_cases': ['Statistical analysis', 'Data exploration', 'Correlation analysis', 'Distribution plots']
                },
                'plotly': {
                    'description': 'Interactive plotting library',
                    'features': ['Interactive plots', 'Web-based', '3D visualization', 'Dash integration'],
                    'performance': 'Good for interactive visualizations',
                    'use_cases': ['Interactive dashboards', 'Web applications', '3D plots', 'Real-time data']
                }
            },
            'Database Integration': {
                'SQLAlchemy': {
                    'description': 'SQL toolkit and ORM',
                    'features': ['Database abstraction', 'ORM', 'Connection pooling', 'Multiple databases'],
                    'performance': 'Good for database operations',
                    'use_cases': ['Database operations', 'Data modeling', 'API development', 'Data migration']
                },
                'psycopg2': {
                    'description': 'PostgreSQL adapter',
                    'features': ['PostgreSQL support', 'High performance', 'Connection pooling', 'Async support'],
                    'performance': 'Excellent for PostgreSQL',
                    'use_cases': ['PostgreSQL operations', 'High-performance queries', 'Data warehousing', 'Analytics']
                },
                'pymongo': {
                    'description': 'MongoDB driver',
                    'features': ['Document database', 'Flexible schema', 'Scalability', 'JSON support'],
                    'performance': 'Good for document operations',
                    'use_cases': ['Document storage', 'NoSQL operations', 'Real-time data', 'Content management']
                }
            }
        }
    
    def display_tool_info(self, category, tool):
        """Display information about a data tool"""
        if category in self.data_tools and tool in self.data_tools[category]:
            info = self.data_tools[category][tool]
            print(f"{tool} - {info['description']}")
            print("=" * 40)
            
            print("\\nFeatures:")
            for feature in info['features']:
                print(f"• {feature}")
            
            print(f"\\nPerformance: {info['performance']}")
            
            print("\\nUse Cases:")
            for use_case in info['use_cases']:
                print(f"• {use_case}")
        else:
            print(f"Tool '{tool}' not found in category '{category}'")
    
    def create_data_pipeline_example(self):
        """Create an example data processing pipeline"""
        # Simulate data processing pipeline
        print("Data Processing Pipeline Example:")
        print("=" * 40)
        
        steps = [
            "1. Data Ingestion (pandas, SQLAlchemy)",
            "2. Data Cleaning (pandas, NumPy)",
            "3. Data Transformation (pandas, Dask)",
            "4. Data Analysis (pandas, NumPy)",
            "5. Data Visualization (matplotlib, seaborn, plotly)",
            "6. Data Storage (SQLAlchemy, pymongo)"
        ]
        
        for step in steps:
            print(step)
        
        # Example pipeline code
        pipeline_code = '''
# Example Data Processing Pipeline
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sqlalchemy import create_engine

# 1. Data Ingestion
engine = create_engine('postgresql://user:pass@localhost/db')
df = pd.read_sql('SELECT * FROM data_table', engine)

# 2. Data Cleaning
df = df.dropna()
df = df.drop_duplicates()

# 3. Data Transformation
df['new_column'] = df['column1'] * df['column2']
df = df.groupby('category').agg({'value': 'mean'})

# 4. Data Analysis
summary_stats = df.describe()
correlation_matrix = df.corr()

# 5. Data Visualization
plt.figure(figsize=(10, 6))
sns.heatmap(correlation_matrix, annot=True)
plt.title('Correlation Matrix')
plt.show()

# 6. Data Storage
df.to_sql('processed_data', engine, if_exists='replace')
        '''
        
        print("\\nExample Pipeline Code:")
        print(pipeline_code)

# Initialize data tools
data_tools = DataProcessingTools()

# Display tool information
data_tools.display_tool_info('Data Manipulation', 'pandas')

# Create pipeline example
data_tools.create_data_pipeline_example()

# Visualize data tools
plt.figure(figsize=(15, 8))

plt.subplot(2, 3, 1)
# Tools by category
categories = list(data_tools.data_tools.keys())
tool_counts = [len(tools) for tools in data_tools.data_tools.values()]
plt.bar(categories, tool_counts, color='skyblue')
plt.title('Data Tools by Category')
plt.ylabel('Number of Tools')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 2)
# Performance distribution
performance_levels = ['Good', 'Excellent']
performance_counts = [0, 0]
for category in data_tools.data_tools.values():
    for tool in category.values():
        if 'Good' in tool['performance']:
            performance_counts[0] += 1
        else:
            performance_counts[1] += 1

plt.pie(performance_counts, labels=performance_levels, autopct='%1.1f%%')
plt.title('Tool Performance Distribution')

plt.subplot(2, 3, 3)
# Use cases by category
use_case_counts = []
for category in data_tools.data_tools.values():
    total_use_cases = sum(len(tool['use_cases']) for tool in category.values())
    use_case_counts.append(total_use_cases)

plt.bar(categories, use_case_counts, color='lightgreen')
plt.title('Use Cases by Category')
plt.ylabel('Total Use Cases')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 4)
# Features by category
feature_counts = []
for category in data_tools.data_tools.values():
    total_features = sum(len(tool['features']) for tool in category.values())
    feature_counts.append(total_features)

plt.bar(categories, feature_counts, color='orange')
plt.title('Features by Category')
plt.ylabel('Total Features')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 5)
# Data manipulation tools comparison
manipulation_tools = data_tools.data_tools['Data Manipulation']
tool_names = list(manipulation_tools.keys())
feature_counts = [len(tool['features']) for tool in manipulation_tools.values()]

plt.bar(tool_names, feature_counts, color='lightcoral')
plt.title('Data Manipulation Tools')
plt.ylabel('Number of Features')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 6)
# Visualization tools comparison
viz_tools = data_tools.data_tools['Data Visualization']
viz_names = list(viz_tools.keys())
viz_features = [len(tool['features']) for tool in viz_tools.values()]

plt.bar(viz_names, viz_features, color='purple')
plt.title('Visualization Tools')
plt.ylabel('Number of Features')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Model Deployment and MLOps

### Production AI Tools
\`\`\`python
# MLOps and Deployment Tools
class MLOpsTools:
    def __init__(self):
        self.mlops_tools = {
            'Model Training': {
                'MLflow': {
                    'description': 'Open source platform for ML lifecycle',
                    'features': ['Experiment tracking', 'Model registry', 'Model deployment', 'Reproducibility'],
                    'use_cases': ['Experiment management', 'Model versioning', 'Model deployment', 'Team collaboration'],
                    'deployment': 'On-premise, Cloud'
                },
                'Weights & Biases': {
                    'description': 'Experiment tracking and model management',
                    'features': ['Experiment tracking', 'Model registry', 'Visualization', 'Collaboration'],
                    'use_cases': ['Research tracking', 'Model comparison', 'Team collaboration', 'Hyperparameter tuning'],
                    'deployment': 'Cloud, On-premise'
                },
                'Neptune': {
                    'description': 'ML metadata store',
                    'features': ['Experiment tracking', 'Model registry', 'Data versioning', 'Collaboration'],
                    'use_cases': ['Experiment management', 'Model tracking', 'Data lineage', 'Team collaboration'],
                    'deployment': 'Cloud, On-premise'
                }
            },
            'Model Deployment': {
                'Docker': {
                    'description': 'Containerization platform',
                    'features': ['Containerization', 'Portability', 'Scalability', 'Isolation'],
                    'use_cases': ['Model packaging', 'Environment consistency', 'Scalable deployment', 'Microservices'],
                    'deployment': 'Any platform'
                },
                'Kubernetes': {
                    'description': 'Container orchestration',
                    'features': ['Auto-scaling', 'Load balancing', 'Service discovery', 'Rolling updates'],
                    'use_cases': ['Large-scale deployment', 'Auto-scaling', 'Service management', 'High availability'],
                    'deployment': 'Cloud, On-premise'
                },
                'FastAPI': {
                    'description': 'Modern web framework for APIs',
                    'features': ['Fast performance', 'Automatic documentation', 'Type hints', 'Async support'],
                    'use_cases': ['API development', 'Model serving', 'Microservices', 'Real-time applications'],
                    'deployment': 'Any platform'
                }
            },
            'Model Monitoring': {
                'Prometheus': {
                    'description': 'Monitoring and alerting system',
                    'features': ['Metrics collection', 'Alerting', 'Time series data', 'Service discovery'],
                    'use_cases': ['System monitoring', 'Model performance tracking', 'Alerting', 'Metrics collection'],
                    'deployment': 'Any platform'
                },
                'Grafana': {
                    'description': 'Analytics and monitoring platform',
                    'features': ['Data visualization', 'Dashboard creation', 'Alerting', 'Data source integration'],
                    'use_cases': ['Monitoring dashboards', 'Data visualization', 'Alerting', 'Performance tracking'],
                    'deployment': 'Any platform'
                },
                'Evidently AI': {
                    'description': 'ML model monitoring',
                    'features': ['Data drift detection', 'Model performance monitoring', 'Bias detection', 'Reports'],
                    'use_cases': ['Model monitoring', 'Data drift detection', 'Performance tracking', 'Bias monitoring'],
                    'deployment': 'Cloud, On-premise'
                }
            },
            'Data Versioning': {
                'DVC': {
                    'description': 'Data version control',
                    'features': ['Data versioning', 'Pipeline tracking', 'Storage optimization', 'Git integration'],
                    'use_cases': ['Data versioning', 'Pipeline management', 'Experiment tracking', 'Collaboration'],
                    'deployment': 'Any platform'
                },
                'Pachyderm': {
                    'description': 'Data versioning and pipeline platform',
                    'features': ['Data versioning', 'Pipeline automation', 'Data lineage', 'Scalability'],
                    'use_cases': ['Data versioning', 'Pipeline automation', 'Data lineage', 'Large-scale processing'],
                    'deployment': 'Cloud, On-premise'
                }
            }
        }
    
    def display_mlops_tool(self, category, tool):
        """Display information about an MLOps tool"""
        if category in self.mlops_tools and tool in self.mlops_tools[category]:
            info = self.mlops_tools[category][tool]
            print(f"{tool} - {info['description']}")
            print("=" * 40)
            
            print("\\nFeatures:")
            for feature in info['features']:
                print(f"• {feature}")
            
            print("\\nUse Cases:")
            for use_case in info['use_cases']:
                print(f"• {use_case}")
            
            print(f"\\nDeployment: {info['deployment']}")
        else:
            print(f"Tool '{tool}' not found in category '{category}'")
    
    def create_mlops_pipeline(self):
        """Create an example MLOps pipeline"""
        print("MLOps Pipeline Example:")
        print("=" * 30)
        
        pipeline_steps = [
            "1. Data Ingestion & Versioning (DVC, Pachyderm)",
            "2. Experiment Tracking (MLflow, W&B)",
            "3. Model Training & Validation",
            "4. Model Registry (MLflow, Neptune)",
            "5. Model Packaging (Docker)",
            "6. Model Deployment (Kubernetes, FastAPI)",
            "7. Model Monitoring (Prometheus, Grafana, Evidently)",
            "8. Model Retraining & Updates"
        ]
        
        for step in pipeline_steps:
            print(step)
        
        # Example MLOps code
        mlops_code = '''
# Example MLOps Pipeline
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd
import docker
import kubernetes

# 1. Start MLflow experiment
mlflow.set_experiment("customer_churn_prediction")

with mlflow.start_run():
    # 2. Load and prepare data
    df = pd.read_csv("data/customer_data.csv")
    X = df.drop('churn', axis=1)
    y = df['churn']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    # 3. Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # 4. Evaluate model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    # 5. Log parameters and metrics
    mlflow.log_param("n_estimators", 100)
    mlflow.log_metric("accuracy", accuracy)
    
    # 6. Log model
    mlflow.sklearn.log_model(model, "model")
    
    # 7. Register model
    model_uri = f"runs:/{mlflow.active_run().info.run_id}/model"
    mlflow.register_model(model_uri, "churn_prediction_model")

# 8. Deploy model (simplified)
# docker build -t churn-model .
# kubectl apply -f deployment.yaml
        '''
        
        print("\\nExample MLOps Code:")
        print(mlops_code)

# Initialize MLOps tools
mlops_tools = MLOpsTools()

# Display MLOps tool information
mlops_tools.display_mlops_tool('Model Training', 'MLflow')

# Create MLOps pipeline
mlops_tools.create_mlops_pipeline()

# Visualize MLOps tools
plt.figure(figsize=(15, 10))

plt.subplot(2, 3, 1)
# Tools by category
categories = list(mlops_tools.mlops_tools.keys())
tool_counts = [len(tools) for tools in mlops_tools.mlops_tools.values()]
plt.bar(categories, tool_counts, color='lightblue')
plt.title('MLOps Tools by Category')
plt.ylabel('Number of Tools')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 2)
# Deployment options
deployment_options = ['Cloud', 'On-premise', 'Any platform']
deployment_counts = [0, 0, 0]
for category in mlops_tools.mlops_tools.values():
    for tool in category.values():
        if 'Cloud' in tool['deployment']:
            deployment_counts[0] += 1
        if 'On-premise' in tool['deployment']:
            deployment_counts[1] += 1
        if 'Any platform' in tool['deployment']:
            deployment_counts[2] += 1

plt.pie(deployment_counts, labels=deployment_options, autopct='%1.1f%%')
plt.title('Deployment Options Distribution')

plt.subplot(2, 3, 3)
# Features by category
feature_counts = []
for category in mlops_tools.mlops_tools.values():
    total_features = sum(len(tool['features']) for tool in category.values())
    feature_counts.append(total_features)

plt.bar(categories, feature_counts, color='lightgreen')
plt.title('Features by Category')
plt.ylabel('Total Features')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 4)
# Use cases by category
use_case_counts = []
for category in mlops_tools.mlops_tools.values():
    total_use_cases = sum(len(tool['use_cases']) for tool in category.values())
    use_case_counts.append(total_use_cases)

plt.bar(categories, use_case_counts, color='orange')
plt.title('Use Cases by Category')
plt.ylabel('Total Use Cases')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 5)
# Model training tools
training_tools = mlops_tools.mlops_tools['Model Training']
tool_names = list(training_tools.keys())
feature_counts = [len(tool['features']) for tool in training_tools.values()]

plt.bar(tool_names, feature_counts, color='lightcoral')
plt.title('Model Training Tools')
plt.ylabel('Number of Features')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 6)
# Model deployment tools
deployment_tools = mlops_tools.mlops_tools['Model Deployment']
deploy_names = list(deployment_tools.keys())
deploy_features = [len(tool['features']) for tool in deployment_tools.values()]

plt.bar(deploy_names, deploy_features, color='purple')
plt.title('Model Deployment Tools')
plt.ylabel('Number of Features')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Cloud AI Platforms

### Major Cloud AI Services
\`\`\`python
# Cloud AI Platforms
class CloudAIPlatforms:
    def __init__(self):
        self.cloud_platforms = {
            'AWS': {
                'SageMaker': {
                    'description': 'Machine learning platform',
                    'services': ['Model training', 'Model deployment', 'Data labeling', 'AutoML'],
                    'pricing': 'Pay-per-use',
                    'strengths': ['Comprehensive', 'Scalable', 'Integration', 'Enterprise features']
                },
                'Bedrock': {
                    'description': 'Generative AI service',
                    'services': ['Foundation models', 'Text generation', 'Image generation', 'Embeddings'],
                    'pricing': 'Pay-per-token',
                    'strengths': ['Latest models', 'Easy integration', 'Scalable', 'Enterprise ready']
                },
                'Comprehend': {
                    'description': 'Natural language processing',
                    'services': ['Sentiment analysis', 'Entity recognition', 'Language detection', 'Topic modeling'],
                    'pricing': 'Pay-per-request',
                    'strengths': ['Pre-trained models', 'Easy to use', 'Scalable', 'Accurate']
                }
            },
            'Google Cloud': {
                'Vertex AI': {
                    'description': 'Unified AI platform',
                    'services': ['Model training', 'Model deployment', 'AutoML', 'MLOps'],
                    'pricing': 'Pay-per-use',
                    'strengths': ['Unified platform', 'AutoML', 'MLOps', 'Integration']
                },
                'AI Platform': {
                    'description': 'Machine learning platform',
                    'services': ['Model training', 'Model deployment', 'Data processing', 'Notebooks'],
                    'pricing': 'Pay-per-use',
                    'strengths': ['Flexible', 'Scalable', 'Integration', 'Open source']
                },
                'Natural Language API': {
                    'description': 'Natural language processing',
                    'services': ['Sentiment analysis', 'Entity recognition', 'Syntax analysis', 'Classification'],
                    'pricing': 'Pay-per-request',
                    'strengths': ['Pre-trained models', 'Easy integration', 'Accurate', 'Multilingual']
                }
            },
            'Azure': {
                'Machine Learning': {
                    'description': 'Machine learning platform',
                    'services': ['Model training', 'Model deployment', 'AutoML', 'MLOps'],
                    'pricing': 'Pay-per-use',
                    'strengths': ['Enterprise integration', 'Security', 'Compliance', 'Hybrid cloud']
                },
                'Cognitive Services': {
                    'description': 'AI services suite',
                    'services': ['Vision', 'Speech', 'Language', 'Decision'],
                    'pricing': 'Pay-per-request',
                    'strengths': ['Pre-built models', 'Easy integration', 'Enterprise ready', 'Comprehensive']
                },
                'OpenAI Service': {
                    'description': 'OpenAI models on Azure',
                    'services': ['GPT models', 'Embeddings', 'Code generation', 'Chat completion'],
                    'pricing': 'Pay-per-token',
                    'strengths': ['Latest models', 'Enterprise security', 'Compliance', 'Integration']
                }
            }
        }
    
    def display_platform_info(self, provider, service):
        """Display information about a cloud AI service"""
        if provider in self.cloud_platforms and service in self.cloud_platforms[provider]:
            info = self.cloud_platforms[provider][service]
            print(f"{provider} {service} - {info['description']}")
            print("=" * 50)
            
            print("\\nServices:")
            for service_item in info['services']:
                print(f"• {service_item}")
            
            print(f"\\nPricing: {info['pricing']}")
            
            print("\\nStrengths:")
            for strength in info['strengths']:
                print(f"• {strength}")
        else:
            print(f"Service '{service}' not found for provider '{provider}'")
    
    def compare_providers(self):
        """Compare cloud AI providers"""
        comparison_data = []
        for provider, services in self.cloud_platforms.items():
            total_services = len(services)
            total_features = sum(len(service['services']) for service in services.values())
            comparison_data.append({
                'Provider': provider,
                'Services': total_services,
                'Features': total_features
            })
        return pd.DataFrame(comparison_data)
    
    def create_cloud_ai_architecture(self):
        """Create an example cloud AI architecture"""
        print("Cloud AI Architecture Example:")
        print("=" * 35)
        
        architecture_components = [
            "1. Data Storage (S3, GCS, Blob Storage)",
            "2. Data Processing (EMR, Dataproc, HDInsight)",
            "3. Model Training (SageMaker, Vertex AI, ML Studio)",
            "4. Model Registry (SageMaker, Vertex AI, ML Studio)",
            "5. Model Deployment (SageMaker, Vertex AI, ML Studio)",
            "6. API Gateway (API Gateway, Cloud Endpoints, API Management)",
            "7. Monitoring (CloudWatch, Cloud Monitoring, Application Insights)",
            "8. Security (IAM, Cloud IAM, Azure AD)"
        ]
        
        for component in architecture_components:
            print(component)
        
        # Example cloud AI code
        cloud_ai_code = '''
# Example Cloud AI Implementation (AWS SageMaker)
import boto3
import sagemaker
from sagemaker.sklearn import SKLearn
from sagemaker import get_execution_role

# Initialize SageMaker
sagemaker_session = sagemaker.Session()
role = get_execution_role()

# Create SKLearn estimator
sklearn_estimator = SKLearn(
    entry_point='train.py',
    role=role,
    instance_type='ml.m5.large',
    framework_version='0.23-1',
    py_version='py3',
    sagemaker_session=sagemaker_session
)

# Train model
sklearn_estimator.fit({'training': 's3://bucket/training-data'})

# Deploy model
predictor = sklearn_estimator.deploy(
    initial_instance_count=1,
    instance_type='ml.m5.large'
)

# Make predictions
result = predictor.predict(data)
        '''
        
        print("\\nExample Cloud AI Code:")
        print(cloud_ai_code)

# Initialize cloud AI platforms
cloud_ai = CloudAIPlatforms()

# Display platform information
cloud_ai.display_platform_info('AWS', 'SageMaker')

# Compare providers
provider_comparison = cloud_ai.compare_providers()
print("\\nCloud AI Providers Comparison:")
print(provider_comparison)

# Create cloud AI architecture
cloud_ai.create_cloud_ai_architecture()

# Visualize cloud AI platforms
plt.figure(figsize=(15, 10))

plt.subplot(2, 3, 1)
# Services by provider
providers = list(cloud_ai.cloud_platforms.keys())
service_counts = [len(services) for services in cloud_ai.cloud_platforms.values()]
plt.bar(providers, service_counts, color=['orange', 'blue', 'green'])
plt.title('AI Services by Provider')
plt.ylabel('Number of Services')
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 2)
# Features by provider
feature_counts = []
for services in cloud_ai.cloud_platforms.values():
    total_features = sum(len(service['services']) for service in services.values())
    feature_counts.append(total_features)

plt.bar(providers, feature_counts, color=['orange', 'blue', 'green'])
plt.title('Features by Provider')
plt.ylabel('Total Features')
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 3)
# Pricing models
pricing_models = ['Pay-per-use', 'Pay-per-request', 'Pay-per-token']
pricing_counts = [0, 0, 0]
for services in cloud_ai.cloud_platforms.values():
    for service in services.values():
        if 'Pay-per-use' in service['pricing']:
            pricing_counts[0] += 1
        if 'Pay-per-request' in service['pricing']:
            pricing_counts[1] += 1
        if 'Pay-per-token' in service['pricing']:
            pricing_counts[2] += 1

plt.pie(pricing_counts, labels=pricing_models, autopct='%1.1f%%')
plt.title('Pricing Models Distribution')

plt.subplot(2, 3, 4)
# AWS services
aws_services = list(cloud_ai.cloud_platforms['AWS'].keys())
aws_features = [len(service['services']) for service in cloud_ai.cloud_platforms['AWS'].values()]
plt.bar(aws_services, aws_features, color='orange')
plt.title('AWS AI Services')
plt.ylabel('Number of Features')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 5)
# Google Cloud services
gcp_services = list(cloud_ai.cloud_platforms['Google Cloud'].keys())
gcp_features = [len(service['services']) for service in cloud_ai.cloud_platforms['Google Cloud'].values()]
plt.bar(gcp_services, gcp_features, color='blue')
plt.title('Google Cloud AI Services')
plt.ylabel('Number of Features')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(2, 3, 6)
# Azure services
azure_services = list(cloud_ai.cloud_platforms['Azure'].keys())
azure_features = [len(service['services']) for service in cloud_ai.cloud_platforms['Azure'].values()]
plt.bar(azure_services, azure_features, color='green')
plt.title('Azure AI Services')
plt.ylabel('Number of Features')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Practical Exercise

Master AI tools and frameworks:
1. Set up development environment with key frameworks
2. Build end-to-end ML pipeline
3. Implement MLOps practices
4. Deploy models to cloud platforms
5. Monitor model performance
6. Version control data and models
7. Create automated retraining pipelines
8. Implement CI/CD for ML

## Summary & Next Steps

AI tools and frameworks are the foundation of modern AI development. Master these tools to build, deploy, and maintain AI systems effectively.

**Next up**: Part 12 - Future of AI and emerging technologies.`,
            readTime: 35,
            publishedAt: new Date(Date.now() + 39 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['AI Tools', 'Frameworks', 'MLOps', 'Cloud AI', 'Deployment']
          },
          {
            id: 'ai-part-12',
            partNumber: 12,
            title: 'Future of AI and Emerging Technologies',
            summary: 'Explore the cutting-edge developments and future directions of AI, including quantum computing, AGI, and emerging applications.',
            content: `# Part 12: Future of AI and Emerging Technologies

Explore the cutting-edge developments and future directions of AI, including quantum computing, AGI, and emerging applications.

## Emerging AI Technologies

### Next-Generation AI Systems
\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

# Emerging AI Technologies
class EmergingAITechnologies:
    def __init__(self):
        self.emerging_technologies = {
            'Quantum AI': {
                'description': 'AI systems leveraging quantum computing principles',
                'technologies': ['Quantum Machine Learning', 'Quantum Neural Networks', 'Quantum Optimization', 'Quantum Cryptography'],
                'applications': ['Drug discovery', 'Financial modeling', 'Cryptography', 'Optimization problems'],
                'timeline': '5-10 years',
                'challenges': ['Hardware limitations', 'Error correction', 'Scalability', 'Cost'],
                'potential_impact': 'Revolutionary for specific problem classes'
            },
            'Artificial General Intelligence (AGI)': {
                'description': 'AI systems with human-level cognitive abilities',
                'technologies': ['Multi-modal learning', 'Transfer learning', 'Meta-learning', 'Cognitive architectures'],
                'applications': ['Scientific research', 'Creative tasks', 'Complex reasoning', 'Autonomous systems'],
                'timeline': '10-20 years',
                'challenges': ['Understanding consciousness', 'Common sense reasoning', 'Creativity', 'Ethical implications'],
                'potential_impact': 'Transformative across all industries'
            },
            'Neuromorphic Computing': {
                'description': 'Brain-inspired computing architectures',
                'technologies': ['Spiking neural networks', 'Memristors', 'Event-driven processing', 'Low-power computing'],
                'applications': ['Edge AI', 'Real-time processing', 'Robotics', 'IoT devices'],
                'timeline': '3-7 years',
                'challenges': ['Hardware complexity', 'Programming paradigms', 'Scalability', 'Standardization'],
                'potential_impact': 'Efficient AI at the edge'
            },
            'Federated Learning': {
                'description': 'Distributed learning without centralizing data',
                'technologies': ['Differential privacy', 'Secure aggregation', 'Federated optimization', 'Edge computing'],
                'applications': ['Healthcare', 'Finance', 'Mobile devices', 'IoT networks'],
                'timeline': '2-5 years',
                'challenges': ['Communication overhead', 'Heterogeneous data', 'Privacy guarantees', 'Convergence'],
                'potential_impact': 'Privacy-preserving AI at scale'
            },
            'Explainable AI (XAI)': {
                'description': 'AI systems that provide interpretable decisions',
                'technologies': ['Attention mechanisms', 'SHAP values', 'LIME', 'Counterfactual explanations'],
                'applications': ['Healthcare diagnosis', 'Financial decisions', 'Autonomous vehicles', 'Legal systems'],
                'timeline': '1-3 years',
                'challenges': ['Accuracy vs interpretability', 'Complexity', 'Standardization', 'User understanding'],
                'potential_impact': 'Trustworthy AI systems'
            },
            'Multimodal AI': {
                'description': 'AI systems processing multiple data types',
                'technologies': ['Vision-language models', 'Audio-visual learning', 'Cross-modal retrieval', 'Fusion architectures'],
                'applications': ['Content creation', 'Robotics', 'Virtual assistants', 'Media analysis'],
                'timeline': '2-5 years',
                'challenges': ['Data alignment', 'Computational complexity', 'Evaluation metrics', 'Generalization'],
                'potential_impact': 'More human-like AI interactions'
            }
        }
    
    def display_technology_info(self, technology):
        """Display detailed information about an emerging technology"""
        if technology in self.emerging_technologies:
            info = self.emerging_technologies[technology]
            print(f"{technology} - {info['description']}")
            print("=" * 50)
            
            print("\\nTechnologies:")
            for tech in info['technologies']:
                print(f"• {tech}")
            
            print("\\nApplications:")
            for app in info['applications']:
                print(f"• {app}")
            
            print(f"\\nTimeline: {info['timeline']}")
            
            print("\\nChallenges:")
            for challenge in info['challenges']:
                print(f"• {challenge}")
            
            print(f"\\nPotential Impact: {info['potential_impact']}")
        else:
            print(f"Technology '{technology}' not found")
    
    def analyze_technology_landscape(self):
        """Analyze the emerging technology landscape"""
        analysis_data = []
        for tech, info in self.emerging_technologies.items():
            analysis_data.append({
                'Technology': tech,
                'Technologies Count': len(info['technologies']),
                'Applications Count': len(info['applications']),
                'Challenges Count': len(info['challenges']),
                'Timeline': info['timeline']
            })
        return pd.DataFrame(analysis_data)
    
    def predict_technology_adoption(self):
        """Predict technology adoption timeline"""
        adoption_timeline = {
            'Short-term (1-3 years)': ['Explainable AI (XAI)', 'Federated Learning'],
            'Medium-term (3-7 years)': ['Neuromorphic Computing', 'Multimodal AI'],
            'Long-term (7-15 years)': ['Quantum AI', 'Artificial General Intelligence (AGI)']
        }
        return adoption_timeline

# Initialize emerging technologies
emerging_ai = EmergingAITechnologies()

# Display technology information
emerging_ai.display_technology_info('Quantum AI')

# Analyze technology landscape
tech_analysis = emerging_ai.analyze_technology_landscape()
print("\\nEmerging Technology Analysis:")
print(tech_analysis)

# Predict adoption timeline
adoption_timeline = emerging_ai.predict_technology_adoption()
print("\\nTechnology Adoption Timeline:")
for timeline, technologies in adoption_timeline.items():
    print(f"\\n{timeline}:")
    for tech in technologies:
        print(f"• {tech}")

# Visualize emerging technologies
plt.figure(figsize=(15, 12))

plt.subplot(3, 3, 1)
# Technologies by category
technologies = list(emerging_ai.emerging_technologies.keys())
tech_counts = [len(info['technologies']) for info in emerging_ai.emerging_technologies.values()]
plt.bar(technologies, tech_counts, color='lightblue')
plt.title('Technologies by Category')
plt.ylabel('Number of Technologies')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 2)
# Applications by category
app_counts = [len(info['applications']) for info in emerging_ai.emerging_technologies.values()]
plt.bar(technologies, app_counts, color='lightgreen')
plt.title('Applications by Category')
plt.ylabel('Number of Applications')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 3)
# Challenges by category
challenge_counts = [len(info['challenges']) for info in emerging_ai.emerging_technologies.values()]
plt.bar(technologies, challenge_counts, color='orange')
plt.title('Challenges by Category')
plt.ylabel('Number of Challenges')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 4)
# Timeline distribution
timeline_counts = {}
for info in emerging_ai.emerging_technologies.values():
    timeline = info['timeline']
    timeline_counts[timeline] = timeline_counts.get(timeline, 0) + 1

plt.pie(timeline_counts.values(), labels=timeline_counts.keys(), autopct='%1.1f%%')
plt.title('Technology Timeline Distribution')

plt.subplot(3, 3, 5)
# Technology complexity vs impact
complexity_scores = [len(info['technologies']) + len(info['challenges']) for info in emerging_ai.emerging_technologies.values()]
impact_scores = [len(info['applications']) for info in emerging_ai.emerging_technologies.values()]

plt.scatter(complexity_scores, impact_scores, s=100, alpha=0.7)
for i, tech in enumerate(technologies):
    plt.annotate(tech, (complexity_scores[i], impact_scores[i]), xytext=(5, 5), textcoords='offset points')
plt.xlabel('Complexity Score')
plt.ylabel('Impact Score')
plt.title('Technology Complexity vs Impact')
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 6)
# Adoption timeline
adoption_data = []
for timeline, techs in adoption_timeline.items():
    adoption_data.extend([timeline] * len(techs))

adoption_counts = pd.Series(adoption_data).value_counts()
plt.bar(adoption_counts.index, adoption_counts.values, color=['lightcoral', 'lightblue', 'lightgreen'])
plt.title('Technology Adoption Timeline')
plt.ylabel('Number of Technologies')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 7)
# Technology readiness
readiness_levels = ['Research', 'Development', 'Pilot', 'Production']
readiness_counts = [3, 2, 1, 0]  # Simplified distribution
plt.bar(readiness_levels, readiness_counts, color='purple')
plt.title('Technology Readiness Levels')
plt.ylabel('Number of Technologies')
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 8)
# Investment areas
investment_areas = ['Hardware', 'Software', 'Data', 'Talent', 'Infrastructure']
investment_priorities = [4, 5, 3, 5, 2]  # Priority scores
plt.bar(investment_areas, investment_priorities, color='gold')
plt.title('Investment Priority Areas')
plt.ylabel('Priority Score')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 9)
# Technology convergence
convergence_matrix = np.array([
    [1, 0.8, 0.6, 0.4, 0.7, 0.5],  # Quantum AI
    [0.8, 1, 0.3, 0.6, 0.9, 0.8],  # AGI
    [0.6, 0.3, 1, 0.7, 0.4, 0.6],  # Neuromorphic
    [0.4, 0.6, 0.7, 1, 0.5, 0.7],  # Federated Learning
    [0.7, 0.9, 0.4, 0.5, 1, 0.8],  # XAI
    [0.5, 0.8, 0.6, 0.7, 0.8, 1]   # Multimodal
])

sns.heatmap(convergence_matrix, annot=True, cmap='YlOrRd', 
            xticklabels=technologies, yticklabels=technologies)
plt.title('Technology Convergence Matrix')

plt.tight_layout()
plt.show()
\`\`\`

## Future AI Applications

### Revolutionary Use Cases
\`\`\`python
# Future AI Applications
class FutureAIApplications:
    def __init__(self):
        self.future_applications = {
            'Healthcare Revolution': {
                'applications': [
                    'Personalized medicine based on genetic profiles',
                    'Real-time disease prediction and prevention',
                    'AI-powered drug discovery and development',
                    'Surgical robots with human-level precision',
                    'Mental health monitoring and intervention'
                ],
                'technologies': ['Genomic AI', 'Medical imaging AI', 'Drug discovery AI', 'Robotic surgery', 'Mental health AI'],
                'timeline': '5-15 years',
                'impact': 'Transform healthcare delivery and outcomes'
            },
            'Autonomous Everything': {
                'applications': [
                    'Fully autonomous vehicles and transportation',
                    'Autonomous manufacturing and supply chains',
                    'Self-managing smart cities',
                    'Autonomous space exploration',
                    'Autonomous scientific research'
                ],
                'technologies': ['Autonomous systems', 'Robotics', 'IoT integration', 'Edge AI', 'Swarm intelligence'],
                'timeline': '3-10 years',
                'impact': 'Revolutionize transportation and infrastructure'
            },
            'Creative AI': {
                'applications': [
                    'AI-generated art, music, and literature',
                    'Virtual reality content creation',
                    'Personalized entertainment experiences',
                    'AI-assisted creative collaboration',
                    'Emotional AI for human interaction'
                ],
                'technologies': ['Generative AI', 'Creative AI', 'Emotional AI', 'VR/AR AI', 'Collaborative AI'],
                'timeline': '2-8 years',
                'impact': 'Transform creative industries and human expression'
            },
            'Scientific Discovery': {
                'applications': [
                    'AI-driven scientific hypothesis generation',
                    'Automated laboratory experiments',
                    'Climate change modeling and solutions',
                    'Space exploration and discovery',
                    'Materials science breakthroughs'
                ],
                'technologies': ['Scientific AI', 'Automated experimentation', 'Climate AI', 'Space AI', 'Materials AI'],
                'timeline': '5-20 years',
                'impact': 'Accelerate scientific progress and discovery'
            },
            'Human Augmentation': {
                'applications': [
                    'Brain-computer interfaces for enhanced cognition',
                    'AI-powered prosthetics and implants',
                    'Augmented reality for enhanced perception',
                    'AI-assisted learning and skill acquisition',
                    'Longevity and anti-aging technologies'
                ],
                'technologies': ['BCI', 'Neural interfaces', 'AR/VR', 'Learning AI', 'Longevity AI'],
                'timeline': '10-25 years',
                'impact': 'Enhance human capabilities and lifespan'
            }
        }
    
    def display_application_area(self, area):
        """Display information about a future application area"""
        if area in self.future_applications:
            info = self.future_applications[area]
            print(f"{area} - {info['impact']}")
            print("=" * 50)
            
            print("\\nApplications:")
            for app in info['applications']:
                print(f"• {app}")
            
            print("\\nTechnologies:")
            for tech in info['technologies']:
                print(f"• {tech}")
            
            print(f"\\nTimeline: {info['timeline']}")
        else:
            print(f"Application area '{area}' not found")
    
    def analyze_application_landscape(self):
        """Analyze the future application landscape"""
        analysis_data = []
        for area, info in self.future_applications.items():
            analysis_data.append({
                'Application Area': area,
                'Applications Count': len(info['applications']),
                'Technologies Count': len(info['technologies']),
                'Timeline': info['timeline']
            })
        return pd.DataFrame(analysis_data)
    
    def predict_societal_impact(self):
        """Predict societal impact of future AI applications"""
        impact_areas = {
            'Economic': {
                'positive': ['Increased productivity', 'New job creation', 'Cost reduction', 'Innovation acceleration'],
                'negative': ['Job displacement', 'Economic inequality', 'Market disruption', 'Skill gaps'],
                'mitigation': ['Reskilling programs', 'Universal basic income', 'Regulatory frameworks', 'Education reform']
            },
            'Social': {
                'positive': ['Improved healthcare', 'Enhanced education', 'Better accessibility', 'Social connection'],
                'negative': ['Privacy concerns', 'Social isolation', 'Digital divide', 'Ethical dilemmas'],
                'mitigation': ['Privacy protection', 'Digital inclusion', 'Ethical guidelines', 'Social safety nets']
            },
            'Environmental': {
                'positive': ['Climate solutions', 'Resource optimization', 'Pollution reduction', 'Sustainable development'],
                'negative': ['Energy consumption', 'E-waste', 'Resource depletion', 'Environmental monitoring'],
                'mitigation': ['Green AI', 'Circular economy', 'Renewable energy', 'Environmental regulations']
            }
        }
        return impact_areas

# Initialize future applications
future_apps = FutureAIApplications()

# Display application area
future_apps.display_application_area('Healthcare Revolution')

# Analyze application landscape
app_analysis = future_apps.analyze_application_landscape()
print("\\nFuture Application Analysis:")
print(app_analysis)

# Predict societal impact
societal_impact = future_apps.predict_societal_impact()
print("\\nSocietal Impact Predictions:")
for area, impacts in societal_impact.items():
    print(f"\\n{area} Impact:")
    print("Positive:")
    for impact in impacts['positive']:
        print(f"• {impact}")
    print("Negative:")
    for impact in impacts['negative']:
        print(f"• {impact}")
    print("Mitigation:")
    for mitigation in impacts['mitigation']:
        print(f"• {mitigation}")

# Visualize future applications
plt.figure(figsize=(15, 12))

plt.subplot(3, 3, 1)
# Applications by area
areas = list(future_apps.future_applications.keys())
app_counts = [len(info['applications']) for info in future_apps.future_applications.values()]
plt.bar(areas, app_counts, color='lightblue')
plt.title('Applications by Area')
plt.ylabel('Number of Applications')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 2)
# Technologies by area
tech_counts = [len(info['technologies']) for info in future_apps.future_applications.values()]
plt.bar(areas, tech_counts, color='lightgreen')
plt.title('Technologies by Area')
plt.ylabel('Number of Technologies')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 3)
# Timeline distribution
timeline_counts = {}
for info in future_apps.future_applications.values():
    timeline = info['timeline']
    timeline_counts[timeline] = timeline_counts.get(timeline, 0) + 1

plt.pie(timeline_counts.values(), labels=timeline_counts.keys(), autopct='%1.1f%%')
plt.title('Application Timeline Distribution')

plt.subplot(3, 3, 4)
# Societal impact analysis
impact_areas = list(societal_impact.keys())
positive_counts = [len(impacts['positive']) for impacts in societal_impact.values()]
negative_counts = [len(impacts['negative']) for impacts in societal_impact.values()]

x = np.arange(len(impact_areas))
width = 0.35

plt.bar(x - width/2, positive_counts, width, label='Positive', color='lightgreen')
plt.bar(x + width/2, negative_counts, width, label='Negative', color='lightcoral')
plt.xlabel('Impact Areas')
plt.ylabel('Number of Impacts')
plt.title('Societal Impact Analysis')
plt.xticks(x, impact_areas)
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 5)
# Technology readiness by area
readiness_scores = [4, 3, 5, 2, 1]  # Simplified readiness scores
plt.bar(areas, readiness_scores, color='orange')
plt.title('Technology Readiness by Area')
plt.ylabel('Readiness Score')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 6)
# Investment priorities
investment_priorities = [5, 4, 3, 4, 2]  # Priority scores
plt.bar(areas, investment_priorities, color='purple')
plt.title('Investment Priorities')
plt.ylabel('Priority Score')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 7)
# Risk assessment
risk_levels = ['Low', 'Medium', 'High', 'Very High']
risk_counts = [1, 2, 1, 1]  # Risk distribution
plt.bar(risk_levels, risk_counts, color=['green', 'yellow', 'orange', 'red'])
plt.title('Risk Assessment Distribution')
plt.ylabel('Number of Areas')
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 8)
# Market potential
market_potential = [5, 4, 3, 4, 2]  # Market potential scores
plt.bar(areas, market_potential, color='gold')
plt.title('Market Potential by Area')
plt.ylabel('Market Potential Score')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 9)
# Technology convergence
convergence_matrix = np.array([
    [1, 0.7, 0.5, 0.8, 0.6],  # Healthcare
    [0.7, 1, 0.6, 0.4, 0.7],  # Autonomous
    [0.5, 0.6, 1, 0.3, 0.5],  # Creative
    [0.8, 0.4, 0.3, 1, 0.8],  # Scientific
    [0.6, 0.7, 0.5, 0.8, 1]   # Human Augmentation
])

sns.heatmap(convergence_matrix, annot=True, cmap='YlOrRd', 
            xticklabels=areas, yticklabels=areas)
plt.title('Application Area Convergence')

plt.tight_layout()
plt.show()
\`\`\`

## AI Ethics and Governance

### Future Ethical Considerations
\`\`\`python
# Future AI Ethics and Governance
class FutureAIEthics:
    def __init__(self):
        self.ethical_considerations = {
            'AI Rights and Personhood': {
                'questions': [
                    'Should advanced AI systems have rights?',
                    'What constitutes AI consciousness?',
                    'How do we define AI personhood?',
                    'What are AI responsibilities and obligations?'
                ],
                'challenges': ['Defining consciousness', 'Legal frameworks', 'Moral status', 'Rights allocation'],
                'timeline': '10-20 years',
                'importance': 'Critical for AGI development'
            },
            'AI-Human Relationships': {
                'questions': [
                    'How will AI change human relationships?',
                    'What are the implications of AI companions?',
                    'How do we maintain human connection?',
                    'What are the boundaries of AI interaction?'
                ],
                'challenges': ['Social isolation', 'Emotional dependency', 'Human identity', 'Relationship dynamics'],
                'timeline': '5-15 years',
                'importance': 'High for social well-being'
            },
            'AI and Privacy': {
                'questions': [
                    'How do we protect privacy in an AI world?',
                    'What are the limits of AI surveillance?',
                    'How do we ensure data sovereignty?',
                    'What are the implications of AI profiling?'
                ],
                'challenges': ['Data protection', 'Surveillance capitalism', 'Consent mechanisms', 'Privacy by design'],
                'timeline': 'Immediate',
                'importance': 'Critical for human rights'
            },
            'AI and Democracy': {
                'questions': [
                    'How will AI affect democratic processes?',
                    'What are the risks of AI manipulation?',
                    'How do we ensure AI transparency?',
                    'What are the implications for free speech?'
                ],
                'challenges': ['Information manipulation', 'Algorithmic bias', 'Transparency', 'Democratic participation'],
                'timeline': 'Immediate',
                'importance': 'Critical for democratic values'
            },
            'AI and Work': {
                'questions': [
                    'How will AI change the nature of work?',
                    'What are the implications for employment?',
                    'How do we ensure fair AI-human collaboration?',
                    'What are the new skills needed?'
                ],
                'challenges': ['Job displacement', 'Skill gaps', 'Economic inequality', 'Work-life balance'],
                'timeline': 'Immediate',
                'importance': 'High for economic stability'
            }
        }
    
    def display_ethical_consideration(self, consideration):
        """Display information about an ethical consideration"""
        if consideration in self.ethical_considerations:
            info = self.ethical_considerations[consideration]
            print(f"{consideration} - {info['importance']}")
            print("=" * 50)
            
            print("\\nKey Questions:")
            for question in info['questions']:
                print(f"• {question}")
            
            print("\\nChallenges:")
            for challenge in info['challenges']:
                print(f"• {challenge}")
            
            print(f"\\nTimeline: {info['timeline']}")
        else:
            print(f"Ethical consideration '{consideration}' not found")
    
    def analyze_ethical_landscape(self):
        """Analyze the ethical landscape"""
        analysis_data = []
        for consideration, info in self.ethical_considerations.items():
            analysis_data.append({
                'Consideration': consideration,
                'Questions Count': len(info['questions']),
                'Challenges Count': len(info['challenges']),
                'Timeline': info['timeline'],
                'Importance': info['importance']
            })
        return pd.DataFrame(analysis_data)
    
    def propose_governance_framework(self):
        """Propose a governance framework for future AI"""
        governance_framework = {
            'Principles': [
                'Human-centric AI development',
                'Transparency and explainability',
                'Fairness and non-discrimination',
                'Privacy and data protection',
                'Safety and security',
                'Accountability and responsibility',
                'Sustainability and environmental impact',
                'International cooperation'
            ],
            'Institutions': [
                'AI Ethics Review Boards',
                'International AI Governance Council',
                'National AI Regulatory Agencies',
                'AI Safety Research Institutes',
                'Public AI Education Programs',
                'AI Impact Assessment Bodies',
                'AI Rights and Responsibilities Commission',
                'Global AI Standards Organization'
            ],
            'Mechanisms': [
                'AI impact assessments',
                'Ethical AI certification',
                'AI audit and monitoring',
                'Public participation in AI governance',
                'International AI treaties',
                'AI safety research funding',
                'AI education and awareness',
                'AI incident reporting systems'
            ]
        }
        return governance_framework

# Initialize future AI ethics
future_ethics = FutureAIEthics()

# Display ethical consideration
future_ethics.display_ethical_consideration('AI Rights and Personhood')

# Analyze ethical landscape
ethics_analysis = future_ethics.analyze_ethical_landscape()
print("\\nEthical Landscape Analysis:")
print(ethics_analysis)

# Propose governance framework
governance_framework = future_ethics.propose_governance_framework()
print("\\nProposed Governance Framework:")
for component, items in governance_framework.items():
    print(f"\\n{component}:")
    for item in items:
        print(f"• {item}")

# Visualize ethical considerations
plt.figure(figsize=(15, 12))

plt.subplot(3, 3, 1)
# Considerations by importance
considerations = list(future_ethics.ethical_considerations.keys())
importance_levels = [info['importance'] for info in future_ethics.ethical_considerations.values()]
importance_counts = pd.Series(importance_levels).value_counts()

plt.pie(importance_counts.values, labels=importance_counts.index, autopct='%1.1f%%')
plt.title('Ethical Considerations by Importance')

plt.subplot(3, 3, 2)
# Questions by consideration
question_counts = [len(info['questions']) for info in future_ethics.ethical_considerations.values()]
plt.bar(considerations, question_counts, color='lightblue')
plt.title('Questions by Consideration')
plt.ylabel('Number of Questions')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 3)
# Challenges by consideration
challenge_counts = [len(info['challenges']) for info in future_ethics.ethical_considerations.values()]
plt.bar(considerations, challenge_counts, color='lightgreen')
plt.title('Challenges by Consideration')
plt.ylabel('Number of Challenges')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 4)
# Timeline distribution
timeline_counts = {}
for info in future_ethics.ethical_considerations.values():
    timeline = info['timeline']
    timeline_counts[timeline] = timeline_counts.get(timeline, 0) + 1

plt.bar(timeline_counts.keys(), timeline_counts.values(), color='orange')
plt.title('Timeline Distribution')
plt.ylabel('Number of Considerations')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 5)
# Governance framework components
governance_components = list(governance_framework.keys())
component_counts = [len(items) for items in governance_framework.values()]
plt.bar(governance_components, component_counts, color='purple')
plt.title('Governance Framework Components')
plt.ylabel('Number of Items')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 6)
# Ethical complexity vs urgency
complexity_scores = [len(info['questions']) + len(info['challenges']) for info in future_ethics.ethical_considerations.values()]
urgency_scores = [3 if 'Immediate' in info['timeline'] else 2 if '5-15' in info['timeline'] else 1 for info in future_ethics.ethical_considerations.values()]

plt.scatter(complexity_scores, urgency_scores, s=100, alpha=0.7)
for i, consideration in enumerate(considerations):
    plt.annotate(consideration, (complexity_scores[i], urgency_scores[i]), xytext=(5, 5), textcoords='offset points')
plt.xlabel('Complexity Score')
plt.ylabel('Urgency Score')
plt.title('Ethical Complexity vs Urgency')
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 7)
# Risk assessment
risk_levels = ['Low', 'Medium', 'High', 'Critical']
risk_counts = [0, 1, 2, 2]  # Risk distribution
plt.bar(risk_levels, risk_counts, color=['green', 'yellow', 'orange', 'red'])
plt.title('Risk Assessment Distribution')
plt.ylabel('Number of Considerations')
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 8)
# Stakeholder involvement
stakeholders = ['Government', 'Industry', 'Academia', 'Civil Society', 'International']
involvement_levels = [5, 4, 4, 5, 3]  # Involvement scores
plt.bar(stakeholders, involvement_levels, color='gold')
plt.title('Stakeholder Involvement Levels')
plt.ylabel('Involvement Score')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(3, 3, 9)
# Implementation timeline
implementation_phases = ['Immediate', 'Short-term', 'Medium-term', 'Long-term']
implementation_counts = [2, 3, 2, 1]  # Implementation distribution
plt.bar(implementation_phases, implementation_counts, color='lightcoral')
plt.title('Implementation Timeline')
plt.ylabel('Number of Considerations')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Practical Exercise

Explore the future of AI:
1. Research emerging AI technologies
2. Analyze potential applications
3. Consider ethical implications
4. Develop governance frameworks
5. Plan for AI adoption
6. Assess societal impact
7. Create AI safety protocols
8. Design future AI systems

## Summary & Next Steps

The future of AI holds immense promise and challenges. By understanding emerging technologies, applications, and ethical considerations, we can shape a future where AI benefits all of humanity.

**Congratulations!** You've completed the comprehensive AI & Analytics series. You now have a deep understanding of AI fundamentals, applications, tools, and future directions.`,
            readTime: 36,
            publishedAt: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Future AI', 'Emerging Technologies', 'AGI', 'Quantum AI', 'AI Ethics', 'Governance']
          }
          // Additional episodes would continue here...
        ]
      },
      'prompt-engineering': {
        id: 'prompt-engineering',
        title: 'Prompt Engineering Mastery: AI Communication',
        description: 'Master the art of prompt engineering to get the best results from AI systems.',
        totalEpisodes: 10,
        estimatedDuration: '10 weeks',
        difficulty: 'Beginner',
        category: 'ai',
        prerequisites: ['Basic understanding of AI', 'Access to AI tools'],
        learningOutcomes: [
          'Master prompt engineering techniques',
          'Optimize AI interactions',
          'Create effective prompts',
          'Understand AI limitations',
          'Build AI-powered applications'
        ],
        episodes: [
          {
            id: 'prompt-part-1',
            partNumber: 1,
            title: 'Introduction to Prompt Engineering',
            summary: 'Learn the fundamentals of prompt engineering and how to communicate effectively with AI.',
            content: `# Part 1: Introduction to Prompt Engineering

Welcome to Prompt Engineering Mastery! Learn to communicate effectively with AI systems.

## What is Prompt Engineering?

### Definition
- **Prompt**: Input given to an AI system
- **Engineering**: Systematic approach to optimization
- **Goal**: Get the best possible results from AI

### Why Prompt Engineering Matters
- **Quality**: Better outputs with proper prompts
- **Efficiency**: Faster, more accurate results
- **Cost**: Optimize API usage and costs
- **Reliability**: Consistent, predictable outputs

## Types of AI Systems

### Large Language Models (LLMs)
- **GPT Models**: OpenAI's language models
- **BERT**: Google's bidirectional encoder
- **T5**: Text-to-text transfer transformer
- **Claude**: Anthropic's AI assistant

### AI Capabilities
- **Text Generation**: Creating written content
- **Code Generation**: Writing programming code
- **Data Analysis**: Interpreting and analyzing data
- **Creative Tasks**: Art, music, storytelling

## Basic Prompt Structure

### Components of a Good Prompt
1. **Context**: Background information
2. **Task**: What you want the AI to do
3. **Format**: How you want the output
4. **Examples**: Sample inputs and outputs
5. **Constraints**: Limitations and requirements

### Example Prompt Structure
\`\`\`
Context: You are a data analyst helping with sales analysis.
Task: Analyze the following sales data and provide insights.
Format: Provide a summary with key findings and recommendations.
Examples: [Include sample data and expected output]
Constraints: Keep the analysis under 500 words.
\`\`\`

## Common Prompt Patterns

### Zero-Shot Prompting
- **Definition**: No examples provided
- **Use Case**: Simple, straightforward tasks
- **Example**: "Explain machine learning in simple terms"

### Few-Shot Prompting
- **Definition**: Provide 2-5 examples
- **Use Case**: Complex or specific tasks
- **Example**: "Classify these emails as spam or not spam: [examples]"

### Chain-of-Thought Prompting
- **Definition**: Ask AI to show reasoning
- **Use Case**: Complex problem-solving
- **Example**: "Solve this math problem step by step"

## Best Practices

### Writing Effective Prompts
- **Be Specific**: Clear, detailed instructions
- **Provide Context**: Relevant background information
- **Use Examples**: Show what you want
- **Iterate**: Refine prompts based on results
- **Test**: Try different approaches

### Common Mistakes
- **Vague Instructions**: Unclear what you want
- **Too Much Information**: Overwhelming the AI
- **No Examples**: AI doesn't understand format
- **Ignoring Context**: Missing important details
- **Not Iterating**: Settling for first result

## Practical Exercise

Practice prompt engineering:
1. Write a prompt for data analysis
2. Create a prompt for code generation
3. Design a prompt for creative writing
4. Test different prompt variations
5. Compare results and optimize

## Summary & Next Steps

Prompt engineering is a crucial skill for AI interaction. Master these fundamentals for better results.

**Next up**: Part 2 - Advanced prompting techniques and strategies.`,
            readTime: 18,
            publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Prompt Engineering', 'AI Communication', 'LLMs', 'Prompt Patterns']
          },
          {
            id: 'prompt-part-2',
            partNumber: 2,
            title: 'Advanced Prompting Techniques',
            summary: 'Master advanced prompting strategies for complex AI interactions and better results.',
            content: `# Part 2: Advanced Prompting Techniques

Learn sophisticated prompting strategies to get the best results from AI systems.

## Chain of Thought Prompting

### What is Chain of Thought?
- **Definition**: Breaking down complex problems into logical steps
- **Purpose**: Help AI reason through problems step-by-step
- **Benefits**: More accurate results, better understanding
- **Applications**: Math problems, logical reasoning, analysis

### Basic Chain of Thought
\`\`\`
Prompt: "Solve this math problem step by step: If a store has 150 apples and sells 30% of them, how many apples are left?"

Good Response:
"Let me solve this step by step:
1. First, I need to find 30% of 150 apples
2. 30% of 150 = 0.30 × 150 = 45 apples
3. Now I subtract the sold apples from the total
4. Apples left = 150 - 45 = 105 apples
Therefore, 105 apples are left in the store."
\`\`\`

### Advanced Chain of Thought
\`\`\`
Prompt: "Analyze the following business scenario step by step:

Scenario: A company's revenue increased by 15% this quarter, but their profit margin decreased by 5%. Their customer acquisition cost went up by 20%.

Please analyze this step by step:
1. What are the key metrics mentioned?
2. What do these changes suggest about the business?
3. What potential causes could explain these trends?
4. What recommendations would you make?"

This approach encourages the AI to:
- Break down the problem systematically
- Consider multiple factors
- Provide structured analysis
- Give actionable recommendations
\`\`\`

## Few-Shot Learning

### What is Few-Shot Learning?
- **Definition**: Providing examples in the prompt to guide AI behavior
- **Purpose**: Teach the AI the desired format and style
- **Benefits**: Better consistency, improved accuracy
- **Best Practices**: 2-5 examples, diverse but consistent

### Example: Email Classification
\`\`\`
Prompt: "Classify the following emails as 'urgent', 'important', or 'routine':

Example 1:
Email: 'Server is down, customers cannot access the website'
Classification: urgent

Example 2:
Email: 'Please review the quarterly budget proposal'
Classification: important

Example 3:
Email: 'Office supplies have been restocked'
Classification: routine

Now classify this email:
Email: 'The client meeting has been rescheduled to next Tuesday'
Classification:"
\`\`\`

## Role-Based Prompting

### Defining Roles
\`\`\`
Prompt: "You are a senior data analyst with 10 years of experience in e-commerce. Your expertise includes:
- Customer behavior analysis
- Sales forecasting
- A/B testing
- Statistical modeling

Please analyze the following customer data and provide insights as a senior data analyst would:"
\`\`\`

### Multiple Role Perspectives
\`\`\`
Prompt: "Analyze this business problem from three different perspectives:

1. As a CEO: Focus on strategic implications and business impact
2. As a CFO: Focus on financial implications and cost-benefit analysis
3. As a CTO: Focus on technical feasibility and implementation challenges

Problem: The company wants to implement AI-powered customer service chatbots to reduce support costs by 30%."
\`\`\`

## Constraint-Based Prompting

### Setting Clear Constraints
\`\`\`
Prompt: "Write a product description for a new smartphone with these constraints:
- Maximum 100 words
- Focus on 3 key features only
- Use simple language (no technical jargon)
- Include a call-to-action
- Target audience: general consumers

Product: 5G smartphone with 48MP camera, 8GB RAM, 128GB storage, $299 price"
\`\`\`

## Iterative Prompting

### Refinement Process
\`\`\`
Initial Prompt: "Write a marketing email for our new product"

Refined Prompt 1: "Write a marketing email for our new fitness tracker targeting health-conscious millennials"

Refined Prompt 2: "Write a marketing email for our new fitness tracker targeting health-conscious millennials. The email should:
- Be 150-200 words
- Highlight 3 key features
- Include a 20% discount offer
- Have a friendly, encouraging tone
- End with a clear call-to-action"
\`\`\`

## Practical Exercise

Practice advanced prompting:
1. Choose a complex problem or task
2. Apply chain of thought prompting
3. Use few-shot learning with examples
4. Define a specific role for the AI
5. Set clear constraints and format requirements
6. Iterate and refine your prompt
7. Test different approaches

## Summary & Next Steps

Advanced prompting techniques significantly improve AI interactions. Master these strategies for better results.

**Next up**: Part 3 - Prompt optimization and performance tuning.`,
            readTime: 22,
            publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Advanced Prompting', 'Chain of Thought', 'Few-Shot Learning', 'Role-Based Prompting']
          },
          {
            id: 'prompt-part-3',
            partNumber: 3,
            title: 'Prompt Optimization and Performance Tuning',
            summary: 'Learn to optimize prompts for maximum effectiveness and consistent results.',
            content: `# Part 3: Prompt Optimization and Performance Tuning

Master the art of optimizing prompts for maximum effectiveness and consistent results.

## Prompt Performance Metrics

### Key Performance Indicators
- **Accuracy**: How correct are the responses?
- **Consistency**: Do similar prompts produce similar results?
- **Relevance**: Are responses on-topic and useful?
- **Completeness**: Do responses address all aspects of the prompt?
- **Efficiency**: How quickly can the AI process the prompt?

### Measuring Performance
\`\`\`
Evaluation Framework:

1. Accuracy Test:
   Prompt: "What is the capital of France?"
   Expected: "Paris"
   Actual: [AI Response]
   Score: Correct/Incorrect

2. Consistency Test:
   Run the same prompt 5 times
   Measure variation in responses
   Score: High consistency = Good

3. Relevance Test:
   Prompt: "Explain machine learning"
   Check if response stays on topic
   Score: High relevance = Good
\`\`\`

## Prompt Length Optimization

### Finding the Sweet Spot
\`\`\`
Too Short: "Write email"
Problems: Vague, unclear expectations
Result: Poor quality, inconsistent output

Too Long: "Write a professional business email that is exactly 200 words, uses formal language, includes a greeting and closing, addresses the recipient by name, mentions the purpose in the first paragraph, provides details in the second paragraph, includes a call-to-action, and follows proper email etiquette..."
Problems: Overwhelming, conflicting instructions
Result: Confused, rigid output

Optimal: "Write a professional business email (150-200 words) to [recipient] about [topic]. Include a clear purpose, relevant details, and a call-to-action."
Benefits: Clear, focused, flexible
Result: High-quality, consistent output
\`\`\`

## Keyword Optimization

### Power Words for AI
\`\`\`
High-Impact Words:
- "Analyze" vs "Look at"
- "Create" vs "Make"
- "Explain" vs "Tell me about"
- "Compare" vs "Look at both"
- "Summarize" vs "Give me the main points"

Action-Oriented Words:
- "Generate"
- "Design"
- "Evaluate"
- "Optimize"
- "Transform"
- "Implement"
\`\`\`

## Structure Optimization

### The STAR Method
\`\`\`
S - Situation: Set the context
T - Task: Define what needs to be done
A - Action: Specify the approach
R - Result: Define expected outcome

Example:
"Context: You are a business consultant helping a startup.
Task: Analyze their current marketing strategy.
Action: Provide specific recommendations with implementation steps.
Result: Deliver a 3-page report with actionable insights."
\`\`\`

## Iterative Optimization Process

### The OPTIMIZE Framework
\`\`\`
O - Objective: Define clear goals
P - Parameters: Set constraints and requirements
T - Test: Try different variations
I - Iterate: Refine based on results
M - Measure: Track performance metrics
I - Improve: Make targeted improvements
Z - Zero in: Focus on best-performing elements
E - Execute: Use optimized prompts consistently
\`\`\`

## Practical Exercise

Optimize a prompt:
1. Start with a basic prompt
2. Apply the OPTIMIZE framework
3. Test different variations
4. Measure performance
5. Iterate and improve
6. Document the final version
7. Create a template for similar tasks

## Summary & Next Steps

Prompt optimization is an ongoing process. Master these techniques for consistently better AI interactions.

**Next up**: Part 4 - Specialized prompting for different AI models.`,
            readTime: 20,
            publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Prompt Optimization', 'Performance Tuning', 'A/B Testing', 'Continuous Improvement']
          },
          {
            id: 'prompt-part-4',
            partNumber: 4,
            title: 'Specialized Prompting for Different AI Models',
            summary: 'Learn model-specific prompting strategies for GPT, Claude, and other AI systems.',
            content: `# Part 4: Specialized Prompting for Different AI Models

Master model-specific prompting strategies to get the best results from different AI systems.

## Understanding AI Model Differences

### Model Architectures
- **GPT Models**: Transformer-based, autoregressive generation
- **Claude**: Constitutional AI, safety-focused responses
- **BERT**: Bidirectional encoder, understanding-focused
- **T5**: Text-to-text transfer, task-agnostic
- **Specialized Models**: Code-specific, domain-specific models

### Key Differences
\`\`\`
GPT Models:
- Strengths: Creative writing, code generation, conversation
- Weaknesses: Factual accuracy, mathematical reasoning
- Best for: Open-ended tasks, creative content

Claude:
- Strengths: Analysis, reasoning, safety
- Weaknesses: Less creative, more conservative
- Best for: Analysis, research, ethical considerations

BERT:
- Strengths: Understanding, classification
- Weaknesses: Generation, creative tasks
- Best for: Text analysis, sentiment analysis
\`\`\`

## GPT-Specific Prompting

### GPT-4 Optimization
\`\`\`
System Message Approach:
"You are an expert data analyst with 10 years of experience. You specialize in:
- Statistical analysis and interpretation
- Data visualization best practices
- Business intelligence and reporting
- Python and R programming

When analyzing data, always:
1. Start with data quality assessment
2. Provide clear statistical interpretations
3. Include practical business insights
4. Suggest actionable recommendations

User Query: [Your specific question]"

Role-Based Prompting:
"Act as a senior software architect reviewing this code. Focus on:
- Code quality and maintainability
- Performance implications
- Security considerations
- Best practices adherence

Code to review: [Your code]"
\`\`\`

### GPT-3.5 Optimization
\`\`\`
Explicit Instruction Format:
"Task: Analyze the following sales data
Input: [Your data]
Output Format: 
- Summary statistics
- Key trends
- Recommendations
- Next steps

Constraints:
- Maximum 300 words
- Use bullet points
- Include specific numbers
- Focus on actionable insights

Context: This is for a quarterly business review meeting."
\`\`\`

## Claude-Specific Prompting

### Constitutional AI Approach
\`\`\`
Ethical Framework Prompt:
"Please analyze this business proposal while considering:
1. Ethical implications for all stakeholders
2. Potential risks and mitigation strategies
3. Long-term sustainability considerations
4. Social and environmental impact

Provide a balanced analysis that includes both benefits and concerns, with specific recommendations for addressing any ethical issues.

Proposal: [Your business proposal]"

Reasoning-Focused Prompt:
"Think through this problem systematically:

Problem: [Your problem]

Please:
1. Break down the problem into components
2. Analyze each component separately
3. Consider multiple perspectives
4. Identify potential solutions
5. Evaluate pros and cons of each solution
6. Recommend the best approach with reasoning

Show your thinking process for each step."
\`\`\`

### Analysis-Oriented Prompting
\`\`\`
Structured Analysis:
"Conduct a comprehensive analysis of the following scenario:

Scenario: [Your scenario]

Analysis Framework:
1. Current State Assessment
   - What is happening now?
   - What are the key factors?

2. Root Cause Analysis
   - Why is this happening?
   - What are the underlying causes?

3. Impact Assessment
   - Who is affected?
   - What are the consequences?

4. Solution Development
   - What are possible solutions?
   - How feasible is each solution?

5. Recommendation
   - What is the best approach?
   - What are the next steps?"
\`\`\`

## Code-Specific Model Prompting

### GitHub Copilot Style
\`\`\`
Function Documentation Approach:
"""
Calculate the compound interest for an investment.

Args:
    principal (float): Initial investment amount
    rate (float): Annual interest rate (as decimal)
    time (int): Time period in years
    compound_frequency (int): Number of times interest compounds per year

Returns:
    float: Final amount after compound interest

Example:
    >>> compound_interest(1000, 0.05, 10, 12)
    1647.01
"""

# TODO: Implement the compound interest calculation
def compound_interest(principal, rate, time, compound_frequency):
    # [AI will generate implementation]
\`\`\`

### Code Review Prompting
\`\`\`
Code Review Framework:
"Review this code for:
1. Correctness and logic
2. Performance optimization opportunities
3. Security vulnerabilities
4. Code style and best practices
5. Error handling
6. Documentation quality

Provide specific suggestions with examples of improvements.

Code to review:
[Your code here]"
\`\`\`

## Domain-Specific Model Prompting

### Medical AI Models
\`\`\`
Clinical Context Prompt:
"From a medical perspective, analyze these symptoms while considering:
- Differential diagnoses
- Red flag symptoms
- Appropriate next steps
- When to seek immediate care

Important: This is for educational purposes only. Always consult healthcare professionals for medical advice.

Symptoms: [Patient symptoms]"
\`\`\`

### Legal AI Models
\`\`\`
Legal Analysis Framework:
"Analyze this legal scenario considering:
1. Relevant laws and regulations
2. Precedent cases
3. Potential legal issues
4. Risk assessment
5. Recommended actions

Disclaimer: This is not legal advice. Consult qualified legal professionals.

Scenario: [Legal situation]"
\`\`\`

## Multi-Model Comparison Prompting

### A/B Testing Different Models
\`\`\`
Standardized Test Prompt:
"Task: Write a product description for a wireless Bluetooth headphone

Requirements:
- 150-200 words
- Include key features
- Target audience: tech enthusiasts
- Tone: professional but engaging
- Include call-to-action

Product Details:
- Model: TechSound Pro
- Battery life: 30 hours
- Noise cancellation: Active
- Price: $199
- Colors: Black, White, Blue

Please provide the product description following these exact requirements."

Use this same prompt across different models to compare:
- Quality of output
- Adherence to requirements
- Creativity and engagement
- Consistency across runs
\`\`\`

## Model-Specific Best Practices

### GPT Models
\`\`\`
Best Practices:
- Use clear, specific instructions
- Provide examples when possible
- Break complex tasks into steps
- Use system messages for context
- Iterate and refine prompts

Common Pitfalls:
- Vague or ambiguous instructions
- Too much information at once
- Inconsistent formatting
- Ignoring model limitations
- Not testing different approaches
\`\`\`

### Claude Models
\`\`\`
Best Practices:
- Emphasize reasoning and analysis
- Include ethical considerations
- Use structured frameworks
- Ask for step-by-step thinking
- Request balanced perspectives

Common Pitfalls:
- Not leveraging analytical strengths
- Ignoring safety considerations
- Overly complex prompts
- Not providing enough context
- Expecting creative outputs
\`\`\`

## Practical Exercise

Test model-specific prompting:
1. Create the same prompt for GPT and Claude
2. Compare outputs and identify differences
3. Optimize prompts for each model's strengths
4. Test specialized models for domain tasks
5. Develop model-specific prompt libraries
6. Document best practices for each model
7. Create A/B testing framework

## Summary & Next Steps

Different AI models have unique strengths and require tailored prompting approaches. Master model-specific strategies for optimal results.

**Next up**: Part 5 - Prompt engineering for specific use cases and industries.`,
            readTime: 22,
            publishedAt: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Model-Specific Prompting', 'GPT Optimization', 'Claude Strategies', 'Code Models']
          },
          {
            id: 'prompt-part-5',
            partNumber: 5,
            title: 'Industry-Specific Prompt Engineering',
            summary: 'Master prompting techniques for specific industries and professional use cases.',
            content: `# Part 5: Industry-Specific Prompt Engineering

Learn specialized prompting techniques for different industries and professional applications.

## Healthcare and Medical Prompting

### Medical Documentation
\`\`\`
Clinical Note Generation:
"Generate a comprehensive clinical note for this patient encounter:

Patient: 45-year-old male
Chief Complaint: Chest pain
History: Patient reports sharp chest pain that started 2 hours ago, rated 7/10, radiating to left arm
Vital Signs: BP 140/90, HR 95, RR 18, Temp 98.6°F, O2 Sat 98%
Physical Exam: [Include relevant findings]

Format the note as:
1. Chief Complaint
2. History of Present Illness
3. Review of Systems
4. Physical Examination
5. Assessment and Plan
6. Patient Education
7. Follow-up Instructions

Important: This is for educational purposes only. Always follow proper medical protocols."
\`\`\`

### Medical Research Analysis
\`\`\`
Research Paper Analysis:
"Analyze this medical research paper and provide:

1. Study Summary
   - Research question
   - Methodology
   - Key findings
   - Sample size and demographics

2. Critical Appraisal
   - Study strengths
   - Potential limitations
   - Bias assessment
   - Statistical significance

3. Clinical Relevance
   - Applicability to practice
   - Patient population
   - Evidence quality
   - Recommendations

4. Future Research
   - Unanswered questions
   - Suggested studies
   - Research gaps

Paper: [Research paper content]"
\`\`\`

## Legal and Compliance Prompting

### Legal Document Analysis
\`\`\`
Contract Review:
"Review this contract and identify:

1. Key Terms and Conditions
   - Payment terms
   - Delivery requirements
   - Performance obligations
   - Termination clauses

2. Risk Assessment
   - Potential liabilities
   - Unfavorable terms
   - Ambiguous language
   - Missing provisions

3. Compliance Issues
   - Regulatory requirements
   - Industry standards
   - Legal precedents
   - Jurisdiction considerations

4. Recommendations
   - Suggested modifications
   - Negotiation points
   - Risk mitigation strategies
   - Alternative approaches

Contract: [Contract text]

Disclaimer: This analysis is for educational purposes only. Consult qualified legal counsel for legal advice."
\`\`\`

### Regulatory Compliance
\`\`\`
Compliance Checklist:
"Create a compliance checklist for [specific regulation/standard] implementation:

1. Regulatory Requirements
   - Mandatory provisions
   - Optional requirements
   - Deadlines and timelines
   - Documentation needs

2. Implementation Steps
   - Immediate actions required
   - Medium-term objectives
   - Long-term goals
   - Resource requirements

3. Risk Assessment
   - High-risk areas
   - Potential violations
   - Penalty implications
   - Mitigation strategies

4. Monitoring and Auditing
   - Key performance indicators
   - Audit procedures
   - Reporting requirements
   - Continuous improvement

Regulation: [Regulation details]"
\`\`\`

## Financial Services Prompting

### Financial Analysis
\`\`\`
Investment Analysis:
"Analyze this investment opportunity:

Company: [Company details]
Financial Data: [Financial statements]
Market Data: [Market information]

Provide analysis covering:

1. Financial Health
   - Revenue trends
   - Profitability analysis
   - Cash flow assessment
   - Debt levels and structure

2. Market Position
   - Competitive landscape
   - Market share
   - Growth prospects
   - Industry trends

3. Risk Assessment
   - Business risks
   - Financial risks
   - Market risks
   - Regulatory risks

4. Investment Recommendation
   - Buy/Hold/Sell recommendation
   - Target price (if applicable)
   - Investment thesis
   - Risk-return profile

5. Key Assumptions
   - Critical assumptions
   - Sensitivity analysis
   - Scenario planning
   - Monitoring points

Note: This is for educational purposes only. Not financial advice."
\`\`\`

### Risk Management
\`\`\`
Risk Assessment Framework:
"Conduct a comprehensive risk assessment for [business/project]:

1. Risk Identification
   - Operational risks
   - Financial risks
   - Strategic risks
   - Compliance risks
   - Technology risks

2. Risk Analysis
   - Probability assessment
   - Impact evaluation
   - Risk scoring
   - Interdependencies

3. Risk Evaluation
   - Risk tolerance levels
   - Acceptable risks
   - Risks requiring action
   - Priority ranking

4. Risk Treatment
   - Mitigation strategies
   - Risk transfer options
   - Risk acceptance criteria
   - Contingency plans

5. Monitoring and Review
   - Key risk indicators
   - Review frequency
   - Reporting structure
   - Update procedures

Context: [Business/project details]"
\`\`\`

## Technology and Software Development

### Code Review and Analysis
\`\`\`
Comprehensive Code Review:
"Perform a thorough code review of this software component:

Code: [Code snippet]

Review Areas:
1. Functionality
   - Correctness and logic
   - Edge case handling
   - Error handling
   - Performance considerations

2. Code Quality
   - Readability and maintainability
   - Code organization
   - Naming conventions
   - Documentation quality

3. Security
   - Vulnerability assessment
   - Input validation
   - Authentication/authorization
   - Data protection

4. Best Practices
   - Design patterns
   - SOLID principles
   - Testing coverage
   - Version control practices

5. Recommendations
   - Specific improvements
   - Refactoring suggestions
   - Testing recommendations
   - Documentation needs

Provide specific examples and actionable feedback."
\`\`\`

### System Architecture Design
\`\`\`
Architecture Planning:
"Design a system architecture for [system requirements]:

Requirements: [System requirements]

Design Framework:
1. System Overview
   - High-level architecture
   - Key components
   - Data flow
   - Integration points

2. Technology Stack
   - Frontend technologies
   - Backend technologies
   - Database solutions
   - Infrastructure components

3. Scalability Considerations
   - Performance requirements
   - Load balancing
   - Caching strategies
   - Database scaling

4. Security Architecture
   - Authentication mechanisms
   - Authorization models
   - Data encryption
   - Network security

5. Deployment Strategy
   - Environment setup
   - CI/CD pipeline
   - Monitoring and logging
   - Disaster recovery

6. Risk Assessment
   - Technical risks
   - Mitigation strategies
   - Alternative approaches
   - Success metrics"
\`\`\`

## Marketing and Content Creation

### Content Strategy Development
\`\`\`
Content Marketing Plan:
"Develop a comprehensive content marketing strategy for [brand/product]:

Brand: [Brand details]
Target Audience: [Audience description]
Goals: [Marketing objectives]

Strategy Framework:
1. Content Audit
   - Current content analysis
   - Performance metrics
   - Content gaps
   - Competitive analysis

2. Content Pillars
   - Educational content
   - Entertainment content
   - Inspirational content
   - Promotional content

3. Content Calendar
   - Content themes
   - Publishing schedule
   - Platform distribution
   - Seasonal considerations

4. Content Formats
   - Blog posts
   - Social media content
   - Video content
   - Infographics
   - Webinars

5. Performance Metrics
   - Engagement metrics
   - Conversion metrics
   - Brand awareness metrics
   - ROI measurements

6. Distribution Strategy
   - Owned channels
   - Earned media
   - Paid promotion
   - Influencer partnerships"
\`\`\`

### SEO Content Optimization
\`\`\`
SEO Content Analysis:
"Optimize this content for search engines:

Content: [Content to optimize]
Target Keywords: [Primary and secondary keywords]
Competitor Analysis: [Competitor content]

Optimization Areas:
1. Keyword Integration
   - Primary keyword placement
   - Secondary keyword usage
   - Long-tail keyword opportunities
   - Semantic keyword variations

2. Content Structure
   - Heading optimization (H1, H2, H3)
   - Meta description
   - URL structure
   - Internal linking

3. Content Quality
   - Readability improvement
   - Value addition
   - User intent alignment
   - Content depth

4. Technical SEO
   - Page speed optimization
   - Mobile responsiveness
   - Schema markup
   - Image optimization

5. Content Enhancement
   - Additional sections
   - FAQ additions
   - Related topics
   - Call-to-action optimization

Provide specific recommendations with examples."
\`\`\`

## Education and Training

### Curriculum Development
\`\`\`
Course Design Framework:
"Design a comprehensive course curriculum for [subject/topic]:

Subject: [Course subject]
Target Audience: [Learner profile]
Duration: [Course length]
Learning Objectives: [Specific goals]

Curriculum Structure:
1. Learning Objectives
   - Knowledge objectives
   - Skill objectives
   - Attitude objectives
   - Assessment criteria

2. Course Modules
   - Module breakdown
   - Learning sequence
   - Prerequisites
   - Time allocation

3. Learning Activities
   - Interactive exercises
   - Case studies
   - Group projects
   - Individual assignments

4. Assessment Strategy
   - Formative assessments
   - Summative assessments
   - Peer evaluation
   - Self-assessment

5. Resources and Materials
   - Required readings
   - Multimedia content
   - Tools and software
   - External resources

6. Delivery Methods
   - Instructional strategies
   - Technology integration
   - Blended learning
   - Accessibility considerations"
\`\`\`

### Training Material Creation
\`\`\`
Training Module Development:
"Create a training module for [specific skill/topic]:

Topic: [Training topic]
Audience: [Target learners]
Duration: [Session length]
Format: [Delivery method]

Module Components:
1. Learning Objectives
   - Specific, measurable goals
   - Performance indicators
   - Success criteria
   - Assessment methods

2. Content Structure
   - Introduction and overview
   - Core concepts
   - Practical applications
   - Summary and review

3. Interactive Elements
   - Hands-on exercises
   - Case studies
   - Group discussions
   - Q&A sessions

4. Assessment Tools
   - Knowledge checks
   - Skill demonstrations
   - Practical exercises
   - Feedback mechanisms

5. Supporting Materials
   - Handouts and guides
   - Reference materials
   - Online resources
   - Follow-up activities

6. Evaluation Plan
   - Learning effectiveness
   - Participant feedback
   - Performance improvement
   - ROI measurement"
\`\`\`

## Practical Exercise

Apply industry-specific prompting:
1. Choose an industry you're interested in
2. Identify common tasks and challenges
3. Create specialized prompts for key scenarios
4. Test prompts with relevant examples
5. Refine based on industry best practices
6. Document industry-specific guidelines
7. Build a prompt library for your industry

## Summary & Next Steps

Industry-specific prompting requires understanding domain knowledge and professional requirements. Master these techniques for specialized applications.

**Next up**: Part 6 - Advanced prompt engineering tools and automation.`,
            readTime: 24,
            publishedAt: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Healthcare Prompting', 'Legal Analysis', 'Financial Services', 'Tech Development']
          },
          {
            id: 'prompt-part-6',
            partNumber: 6,
            title: 'Advanced Prompt Engineering Tools',
            summary: 'Explore tools and frameworks for advanced prompt engineering and automation.',
            content: `# Part 6: Advanced Prompt Engineering Tools

Master professional tools and frameworks for advanced prompt engineering and automation.

## Prompt Engineering Frameworks

### LangChain Framework
\`\`\`python
from langchain import PromptTemplate, LLMChain
from langchain.llms import OpenAI

# Create a prompt template
template = """
You are a {role} with expertise in {domain}.
Task: {task}
Context: {context}
Output Format: {format}

Please provide your response following these guidelines:
- Be specific and actionable
- Include relevant examples
- Consider best practices
- Address potential challenges

Response:
"""

prompt = PromptTemplate(
    input_variables=["role", "domain", "task", "context", "format"],
    template=template
)

# Create a chain
llm = OpenAI(temperature=0.7)
chain = LLMChain(llm=llm, prompt=prompt)

# Use the chain
result = chain.run(
    role="Data Scientist",
    domain="Machine Learning",
    task="Design a model evaluation strategy",
    context="Binary classification problem with imbalanced data",
    format="Step-by-step plan with code examples"
)
\`\`\`

### Prompt Engineering Libraries
\`\`\`python
# Using prompt-toolkit for interactive prompting
from prompt_toolkit import prompt
from prompt_toolkit.completion import WordCompleter

# Define completions
role_completer = WordCompleter(['Data Scientist', 'Software Engineer', 'Product Manager'])
domain_completer = WordCompleter(['AI/ML', 'Web Development', 'Data Analysis'])

# Interactive prompt builder
def build_prompt():
    role = prompt('Select role: ', completer=role_completer)
    domain = prompt('Select domain: ', completer=domain_completer)
    task = prompt('Describe the task: ')
    
    return f"You are a {role} with expertise in {domain}. {task}"

# Advanced prompt templates
class PromptBuilder:
    def __init__(self):
        self.templates = {
            'analysis': self._analysis_template,
            'creative': self._creative_template,
            'technical': self._technical_template
        }
    
    def _analysis_template(self, context, requirements):
        return f"""
        Analyze the following {context}:
        
        Requirements:
        {requirements}
        
        Provide:
        1. Key findings
        2. Insights and implications
        3. Recommendations
        4. Next steps
        """
    
    def _creative_template(self, brief, constraints):
        return f"""
        Creative Brief: {brief}
        
        Constraints:
        {constraints}
        
        Deliverables:
        - Concept development
        - Creative execution
        - Implementation plan
        """
    
    def _technical_template(self, problem, specifications):
        return f"""
        Technical Problem: {problem}
        
        Specifications:
        {specifications}
        
        Solution Requirements:
        1. Technical approach
        2. Implementation details
        3. Testing strategy
        4. Documentation
        """
\`\`\`

## Prompt Automation Tools

### Automated Prompt Generation
\`\`\`python
import json
from typing import Dict, List, Any

class PromptAutomator:
    def __init__(self):
        self.prompt_templates = self._load_templates()
        self.optimization_rules = self._load_optimization_rules()
    
    def _load_templates(self) -> Dict[str, str]:
        return {
            'data_analysis': """
            Analyze this {data_type} data:
            {data}
            
            Focus on:
            - Statistical insights
            - Trends and patterns
            - Anomalies and outliers
            - Business implications
            
            Format: {output_format}
            """,
            
            'code_review': """
            Review this {language} code:
            {code}
            
            Check for:
            - Correctness and logic
            - Performance issues
            - Security vulnerabilities
            - Best practices
            
            Provide specific recommendations.
            """,
            
            'content_creation': """
            Create {content_type} about {topic}:
            
            Target audience: {audience}
            Tone: {tone}
            Length: {length}
            Key points: {key_points}
            
            Include: {requirements}
            """
        }
    
    def generate_prompt(self, task_type: str, parameters: Dict[str, Any]) -> str:
        """Generate optimized prompt based on task type and parameters"""
        template = self.prompt_templates.get(task_type)
        if not template:
            raise ValueError(f"Unknown task type: {task_type}")
        
        # Fill template with parameters
        prompt = template.format(**parameters)
        
        # Apply optimization rules
        optimized_prompt = self._optimize_prompt(prompt, task_type)
        
        return optimized_prompt
    
    def _optimize_prompt(self, prompt: str, task_type: str) -> str:
        """Apply optimization rules to improve prompt effectiveness"""
        rules = self.optimization_rules.get(task_type, [])
        
        for rule in rules:
            prompt = rule.apply(prompt)
        
        return prompt
    
    def _load_optimization_rules(self) -> Dict[str, List]:
        return {
            'data_analysis': [
                ClarityRule(),
                SpecificityRule(),
                ExampleRule()
            ],
            'code_review': [
                TechnicalAccuracyRule(),
                SecurityRule(),
                BestPracticeRule()
            ]
        }

class ClarityRule:
    def apply(self, prompt: str) -> str:
        # Add clarity improvements
        return prompt.replace("analyze", "thoroughly analyze and explain")

class SpecificityRule:
    def apply(self, prompt: str) -> str:
        # Add specificity requirements
        return prompt + "\n\nProvide specific examples and metrics where applicable."

class ExampleRule:
    def apply(self, prompt: str) -> str:
        # Add example requirements
        return prompt + "\n\nInclude concrete examples to illustrate your points."
\`\`\`

### Prompt Testing Framework
\`\`\`python
import time
from typing import List, Dict, Any
from dataclasses import dataclass

@dataclass
class TestCase:
    input_data: Any
    expected_output: str
    success_criteria: List[str]
    timeout: int = 30

class PromptTester:
    def __init__(self, llm_client):
        self.llm_client = llm_client
        self.test_results = []
    
    def run_test_suite(self, prompt: str, test_cases: List[TestCase]) -> Dict[str, Any]:
        """Run a comprehensive test suite on a prompt"""
        results = {
            'total_tests': len(test_cases),
            'passed_tests': 0,
            'failed_tests': 0,
            'average_response_time': 0,
            'detailed_results': []
        }
        
        total_time = 0
        
        for i, test_case in enumerate(test_cases):
            result = self._run_single_test(prompt, test_case, i)
            results['detailed_results'].append(result)
            total_time += result['response_time']
            
            if result['passed']:
                results['passed_tests'] += 1
            else:
                results['failed_tests'] += 1
        
        results['average_response_time'] = total_time / len(test_cases)
        return results
    
    def _run_single_test(self, prompt: str, test_case: TestCase, test_id: int) -> Dict[str, Any]:
        """Run a single test case"""
        start_time = time.time()
        
        try:
            # Format prompt with test input
            formatted_prompt = prompt.format(**test_case.input_data)
            
            # Get AI response
            response = self.llm_client.generate(formatted_prompt)
            
            response_time = time.time() - start_time
            
            # Evaluate response against success criteria
            passed = self._evaluate_response(response, test_case.success_criteria)
            
            return {
                'test_id': test_id,
                'passed': passed,
                'response_time': response_time,
                'response': response,
                'expected': test_case.expected_output,
                'criteria_met': self._check_criteria(response, test_case.success_criteria)
            }
            
        except Exception as e:
            return {
                'test_id': test_id,
                'passed': False,
                'response_time': time.time() - start_time,
                'error': str(e),
                'expected': test_case.expected_output
            }
    
    def _evaluate_response(self, response: str, criteria: List[str]) -> bool:
        """Evaluate if response meets success criteria"""
        return all(self._check_criterion(response, criterion) for criterion in criteria)
    
    def _check_criterion(self, response: str, criterion: str) -> bool:
        """Check if response meets a specific criterion"""
        # Implement criterion checking logic
        if "length" in criterion.lower():
            # Check length requirements
            min_length = self._extract_number(criterion)
            return len(response) >= min_length
        
        elif "format" in criterion.lower():
            # Check format requirements
            return self._check_format(response, criterion)
        
        elif "contains" in criterion.lower():
            # Check if response contains required elements
            required_text = criterion.split("contains")[1].strip()
            return required_text.lower() in response.lower()
        
        return True
    
    def _extract_number(self, text: str) -> int:
        """Extract number from text"""
        import re
        numbers = re.findall(r'\\d+', text)
        return int(numbers[0]) if numbers else 0
    
    def _check_format(self, response: str, format_requirement: str) -> bool:
        """Check if response follows required format"""
        # Implement format checking logic
        if "bullet points" in format_requirement.lower():
            return any(line.strip().startswith('-') or line.strip().startswith('*') 
                      for line in response.split('\n'))
        
        if "numbered list" in format_requirement.lower():
            return any(line.strip().startswith(tuple('123456789')) 
                      for line in response.split('\n'))
        
        return True

# Example usage
def test_prompt_effectiveness():
    """Example of testing prompt effectiveness"""
    
    # Define test cases
    test_cases = [
        TestCase(
            input_data={'topic': 'machine learning', 'audience': 'beginners'},
            expected_output='Educational content about ML basics',
            success_criteria=['contains "machine learning"', 'length >= 200', 'format: bullet points']
        ),
        TestCase(
            input_data={'topic': 'data analysis', 'audience': 'experts'},
            expected_output='Technical content about data analysis',
            success_criteria=['contains technical terms', 'length >= 300', 'format: numbered list']
        )
    ]
    
    # Test prompt
    prompt = """
    Create educational content about {topic} for {audience}.
    
    Requirements:
    - Use appropriate language level
    - Include practical examples
    - Provide actionable insights
    - Format as bullet points or numbered list
    """
    
    # Run tests
    tester = PromptTester(llm_client)
    results = tester.run_test_suite(prompt, test_cases)
    
    return results
\`\`\`

## Prompt Version Control

### Git-Based Prompt Management
\`\`\`bash
# Initialize prompt repository
git init prompt-repository
cd prompt-repository

# Create directory structure
mkdir -p prompts/{templates,optimized,experiments}
mkdir -p tests/{unit,integration,performance}
mkdir -p docs/{guidelines,examples,results}

# Create prompt template
cat > prompts/templates/data_analysis.md << EOF
# Data Analysis Prompt Template

## Version: 1.0
## Last Updated: $(date)
## Author: [Your Name]

## Template
\`\`\`
Analyze the following {data_type} data:

{data}

Focus Areas:
- Statistical insights
- Trends and patterns
- Anomalies and outliers
- Business implications

Output Format: {format}
\`\`\`

## Usage Examples
[Include examples here]

## Performance Metrics
- Average response time: [X] seconds
- Accuracy rate: [X]%
- User satisfaction: [X]/10

## Changelog
- v1.0: Initial version
EOF

# Track changes
git add prompts/templates/data_analysis.md
git commit -m "Add data analysis prompt template v1.0"
\`\`\`

### Prompt Versioning System
\`\`\`python
import json
from datetime import datetime
from typing import Dict, List, Optional
from dataclasses import dataclass, asdict

@dataclass
class PromptVersion:
    version: str
    content: str
    metadata: Dict[str, Any]
    performance_metrics: Dict[str, float]
    created_at: datetime
    author: str
    changelog: List[str]

class PromptVersionControl:
    def __init__(self, repository_path: str):
        self.repository_path = repository_path
        self.versions = {}
        self.current_version = None
    
    def create_version(self, prompt_id: str, content: str, author: str, 
                      metadata: Dict[str, Any] = None) -> str:
        """Create a new version of a prompt"""
        version_number = self._get_next_version(prompt_id)
        
        version = PromptVersion(
            version=version_number,
            content=content,
            metadata=metadata or {},
            performance_metrics={},
            created_at=datetime.now(),
            author=author,
            changelog=[]
        )
        
        if prompt_id not in self.versions:
            self.versions[prompt_id] = []
        
        self.versions[prompt_id].append(version)
        self.current_version = version_number
        
        # Save to file
        self._save_version(prompt_id, version)
        
        return version_number
    
    def get_version(self, prompt_id: str, version: str = None) -> Optional[PromptVersion]:
        """Get a specific version of a prompt"""
        if prompt_id not in self.versions:
            return None
        
        if version is None:
            version = self.current_version
        
        for v in self.versions[prompt_id]:
            if v.version == version:
                return v
        
        return None
    
    def compare_versions(self, prompt_id: str, version1: str, version2: str) -> Dict[str, Any]:
        """Compare two versions of a prompt"""
        v1 = self.get_version(prompt_id, version1)
        v2 = self.get_version(prompt_id, version2)
        
        if not v1 or not v2:
            return {"error": "One or both versions not found"}
        
        return {
            "content_diff": self._diff_content(v1.content, v2.content),
            "metadata_diff": self._diff_metadata(v1.metadata, v2.metadata),
            "performance_comparison": self._compare_performance(
                v1.performance_metrics, v2.performance_metrics
            )
        }
    
    def _get_next_version(self, prompt_id: str) -> str:
        """Get the next version number for a prompt"""
        if prompt_id not in self.versions or not self.versions[prompt_id]:
            return "1.0"
        
        last_version = self.versions[prompt_id][-1].version
        major, minor = map(int, last_version.split('.'))
        
        if minor < 9:
            return f"{major}.{minor + 1}"
        else:
            return f"{major + 1}.0"
    
    def _save_version(self, prompt_id: str, version: PromptVersion):
        """Save version to file"""
        filename = f"{self.repository_path}/prompts/{prompt_id}_v{version.version}.json"
        
        with open(filename, 'w') as f:
            json.dump(asdict(version), f, indent=2, default=str)
    
    def _diff_content(self, content1: str, content2: str) -> Dict[str, Any]:
        """Compare content between two versions"""
        # Implement content diff logic
        return {
            "length_change": len(content2) - len(content1),
            "word_count_change": len(content2.split()) - len(content1.split()),
            "structural_changes": self._detect_structural_changes(content1, content2)
        }
    
    def _detect_structural_changes(self, content1: str, content2: str) -> List[str]:
        """Detect structural changes between versions"""
        changes = []
        
        # Check for section additions/removals
        sections1 = self._extract_sections(content1)
        sections2 = self._extract_sections(content2)
        
        if sections1 != sections2:
            changes.append("Section structure modified")
        
        # Check for format changes
        if self._has_format_change(content1, content2):
            changes.append("Output format modified")
        
        return changes
    
    def _extract_sections(self, content: str) -> List[str]:
        """Extract section headers from content"""
        import re
        headers = re.findall(r'^#+\\s+(.+)$', content, re.MULTILINE)
        return headers
    
    def _has_format_change(self, content1: str, content2: str) -> bool:
        """Check if output format has changed"""
        format_indicators = ['format:', 'output:', 'structure:']
        
        for indicator in format_indicators:
            if indicator in content1.lower() != indicator in content2.lower():
                return True
        
        return False
\`\`\`

## Practical Exercise

Implement advanced prompt engineering tools:
1. Set up a prompt version control system
2. Create automated prompt testing framework
3. Build prompt optimization tools
4. Develop prompt templates for your use cases
5. Implement A/B testing for prompts
6. Create prompt performance monitoring
7. Document your prompt engineering workflow

## Summary & Next Steps

Advanced tools and frameworks significantly enhance prompt engineering capabilities. Master these tools for professional prompt development.

**Next up**: Part 7 - Prompt engineering best practices and common pitfalls.`,
            readTime: 26,
            publishedAt: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Prompt Tools', 'Automation', 'Version Control', 'Testing Framework']
          },
          {
            id: 'prompt-part-7',
            partNumber: 7,
            title: 'Best Practices and Common Pitfalls',
            summary: 'Learn essential best practices and avoid common mistakes in prompt engineering.',
            content: `# Part 7: Best Practices and Common Pitfalls

Master essential best practices and avoid common mistakes in prompt engineering.

## Core Best Practices

### 1. Clarity and Specificity
\`\`\`
❌ Poor Prompt:
"Analyze this data and give me insights."

✅ Good Prompt:
"Analyze the following sales data for Q3 2024:
- Revenue by product category
- Customer acquisition trends
- Regional performance

Provide insights in this format:
1. Key findings (3-5 bullet points)
2. Trends and patterns
3. Recommendations for Q4
4. Potential risks to monitor

Focus on actionable insights for the marketing team."
\`\`\`

### 2. Context and Background
\`\`\`
❌ Poor Prompt:
"Write a product description for our new app."

✅ Good Prompt:
"Write a product description for our new mobile app 'FitTracker Pro':

Context:
- Target audience: Fitness enthusiasts aged 25-45
- Key features: Workout tracking, nutrition logging, social challenges
- Competitive advantage: AI-powered personalized recommendations
- Pricing: $9.99/month subscription

Requirements:
- 150-200 words
- Professional but engaging tone
- Include call-to-action
- Highlight unique value proposition
- Optimize for app store SEO"
\`\`\`

### 3. Output Format Specification
\`\`\`
❌ Poor Prompt:
"Review this code and tell me what's wrong."

✅ Good Prompt:
"Review this Python code for a data processing function:

[Code here]

Provide feedback in this format:

## Code Review Report

### 1. Functionality Issues
- [List any bugs or logic errors]

### 2. Performance Concerns
- [Identify performance bottlenecks]

### 3. Security Vulnerabilities
- [Highlight security issues]

### 4. Code Quality
- [Comment on readability, maintainability]

### 5. Best Practices
- [Suggest improvements for Python best practices]

### 6. Recommendations
- [Prioritized list of fixes]

Rate each issue: Critical/High/Medium/Low"
\`\`\`

## Advanced Best Practices

### 4. Iterative Refinement
\`\`\`
Initial Prompt:
"Create a marketing strategy for a new product."

Refined Prompt (Version 2):
"Create a comprehensive marketing strategy for 'EcoClean', a new eco-friendly cleaning product line.

Product Details:
- Target market: Environmentally conscious consumers
- Price point: Premium ($15-25 per product)
- Launch timeline: 6 months
- Budget: $500K for first year

Strategy Requirements:
1. Market positioning and messaging
2. Channel strategy (digital, retail, partnerships)
3. Launch campaign timeline
4. Success metrics and KPIs
5. Budget allocation recommendations

Format: Executive summary + detailed sections + implementation timeline"
\`\`\`

### 5. Constraint Management
\`\`\`
Balanced Constraints:
"Write a technical blog post about machine learning model deployment.

Constraints:
- Length: 800-1000 words
- Audience: Software engineers with basic ML knowledge
- Tone: Technical but accessible
- Include: Code examples, diagrams, practical tips
- Avoid: Overly complex mathematical formulas
- Deadline: Content should be actionable within 2 weeks

Structure:
1. Introduction (problem statement)
2. Technical approach
3. Implementation steps
4. Common challenges and solutions
5. Best practices
6. Conclusion with next steps"
\`\`\`

### 6. Example-Driven Prompting
\`\`\`
Few-Shot Learning Example:
"Classify these customer support tickets by priority level:

Example 1:
Ticket: 'Website is completely down, customers cannot place orders'
Priority: Critical
Reason: System-wide outage affecting revenue

Example 2:
Ticket: 'Minor typo in product description on page 3'
Priority: Low
Reason: Cosmetic issue, no functional impact

Example 3:
Ticket: 'Payment processing is slow, taking 30+ seconds'
Priority: High
Reason: Performance issue affecting user experience

Now classify this ticket:
Ticket: 'User cannot reset password, getting error message'
Priority: [Your classification]
Reason: [Your reasoning]"
\`\`\`

## Common Pitfalls and How to Avoid Them

### 1. The Vague Instruction Trap
\`\`\`
❌ Problem: "Make this better"
✅ Solution: "Improve this content by:
- Adding specific examples
- Including data points
- Making language more engaging
- Adding a clear call-to-action
- Ensuring it's under 300 words"
\`\`\`

### 2. The Information Overload Problem
\`\`\`
❌ Problem: Including too much context
\`\`\`
"Analyze this 50-page market research report about the global smartphone industry, including all the charts, graphs, competitor analysis, consumer surveys, pricing data, technology trends, regulatory changes, supply chain issues, and future predictions, and give me a comprehensive analysis covering every aspect mentioned..."

✅ Solution: Focused approach
\`\`\`
"Analyze this market research report focusing on:
1. Key market trends (top 3)
2. Competitive landscape (major players)
3. Consumer preferences (primary insights)
4. Growth opportunities (2-3 specific areas)

Provide a 2-page executive summary with actionable recommendations."
\`\`\`

### 3. The Format Confusion Issue
\`\`\`
❌ Problem: Unclear output expectations
"Write a report about our Q3 performance."

✅ Solution: Clear format specification
"Write a Q3 performance report in this format:

## Executive Summary
[2-3 sentences highlighting key results]

## Financial Performance
- Revenue: $X (vs. target $Y)
- Profit margin: X% (vs. target Y%)
- Key drivers: [list top 3]

## Operational Metrics
- Customer acquisition: X new customers
- Retention rate: X%
- Key operational wins: [list 2-3]

## Challenges and Risks
- [List main challenges]
- Mitigation strategies: [brief actions]

## Q4 Priorities
- [List top 3 priorities with rationale]"
\`\`\`

### 4. The Context Mismatch Problem
\`\`\`
❌ Problem: Wrong audience assumptions
"Explain quantum computing to a general audience" (but using technical jargon)

✅ Solution: Audience-specific approach
"Explain quantum computing to business executives who need to understand:
- What it is (simple analogy)
- Why it matters for business
- Current applications and limitations
- Timeline for practical adoption
- Investment considerations

Use analogies and avoid technical jargon. Focus on business implications."
\`\`\`

### 5. The Constraint Overload Issue
\`\`\`
❌ Problem: Too many conflicting constraints
"Write a 50-word product description that's detailed, engaging, includes all features, appeals to everyone, and fits in a tweet."

✅ Solution: Prioritized constraints
"Write a product description for our new fitness app:

Primary constraints:
- Length: 50 words maximum
- Audience: Fitness beginners
- Tone: Encouraging and simple

Secondary considerations:
- Include key benefit
- Add call-to-action
- Use active voice

Focus on the main value proposition rather than listing all features."
\`\`\`

## Quality Assurance Checklist

### Pre-Prompt Review
\`\`\`
Before sending any prompt, ask:

1. **Clarity Check**
   - Is the task clearly defined?
   - Are the requirements specific?
   - Is the expected output format specified?

2. **Context Check**
   - Is sufficient background provided?
   - Is the target audience clear?
   - Are constraints realistic and achievable?

3. **Completeness Check**
   - Are all necessary inputs provided?
   - Are examples included if helpful?
   - Is the scope appropriately defined?

4. **Feasibility Check**
   - Can the AI realistically complete this task?
   - Are the constraints reasonable?
   - Is the expected output achievable?
\`\`\`

### Post-Response Evaluation
\`\`\`
After receiving a response, evaluate:

1. **Accuracy**
   - Is the information correct?
   - Are the recommendations sound?
   - Does it address the original request?

2. **Completeness**
   - Does it cover all requested aspects?
   - Are any important points missing?
   - Is the depth appropriate?

3. **Format**
   - Does it follow the specified format?
   - Is the structure clear?
   - Are the sections well-organized?

4. **Quality**
   - Is the language appropriate?
   - Is the tone consistent?
   - Is it actionable and practical?
\`\`\`

## Prompt Optimization Strategies

### A/B Testing Prompts
\`\`\`
Test different approaches:

Version A (Direct):
"Write a job description for a data scientist position."

Version B (Context-Rich):
"Write a job description for a Senior Data Scientist position at a fintech startup. The role involves building ML models for fraud detection and credit risk assessment. Company has 50 employees, Series A funding, and values innovation and work-life balance."

Version C (Template-Based):
"Write a job description using this template:
- Company overview (2 sentences)
- Role summary (1 paragraph)
- Key responsibilities (5-7 bullet points)
- Required qualifications (4-6 items)
- Preferred qualifications (3-4 items)
- Benefits and culture (3-4 items)
- Application instructions (1-2 sentences)

Context: Senior Data Scientist at fintech startup, focus on fraud detection and credit risk."
\`\`\`

### Iterative Improvement Process
\`\`\`
1. **Initial Prompt**: Start with basic requirements
2. **Test Response**: Evaluate the output quality
3. **Identify Gaps**: What's missing or unclear?
4. **Refine Prompt**: Add specificity, examples, constraints
5. **Test Again**: Compare with previous version
6. **Document Changes**: Track what works
7. **Create Template**: Build reusable version
\`\`\`

## Practical Exercise

Apply best practices:
1. Take a poorly written prompt and improve it
2. Create a prompt optimization checklist
3. Test different prompt variations
4. Document your prompt engineering process
5. Build a library of effective prompts
6. Practice iterative refinement
7. Develop quality assurance procedures

## Summary & Next Steps

Following best practices and avoiding common pitfalls significantly improves prompt effectiveness. Master these principles for consistent, high-quality results.

**Next up**: Part 8 - Advanced techniques and cutting-edge strategies.`,
            readTime: 23,
            publishedAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Best Practices', 'Common Pitfalls', 'Quality Assurance', 'Prompt Optimization']
          },
          {
            id: 'prompt-part-8',
            partNumber: 8,
            title: 'Advanced Techniques and Strategies',
            summary: 'Master cutting-edge prompt engineering techniques and advanced strategies.',
            content: `# Part 8: Advanced Techniques and Strategies

Explore cutting-edge prompt engineering techniques and advanced strategies for maximum AI performance.

## Meta-Prompting and Self-Improvement

### Self-Reflective Prompting
\`\`\`
Meta-Analysis Prompt:
"Analyze this prompt and suggest improvements:

Original Prompt: [Your prompt here]

Please evaluate:
1. Clarity and specificity
2. Context completeness
3. Output format specification
4. Constraint balance
5. Example quality (if any)

Provide:
- Specific improvement suggestions
- Alternative phrasings
- Additional context that might help
- Potential issues or ambiguities
- An optimized version of the prompt

Then, test your optimized version and compare results."
\`\`\`

### Recursive Prompt Optimization
\`\`\`
Iterative Improvement Loop:
"Step 1: Initial Prompt
[Your basic prompt]

Step 2: Self-Analysis
'Analyze the above prompt and identify 3 specific areas for improvement. Provide concrete suggestions.'

Step 3: Refinement
'Based on the analysis, create an improved version of the prompt that addresses the identified issues.'

Step 4: Validation
'Test both versions with the same input and compare outputs. Which performs better and why?'

Step 5: Final Optimization
'Create the final optimized prompt based on the validation results.'"
\`\`\`

## Advanced Chain-of-Thought Techniques

### Multi-Step Reasoning Chains
\`\`\`
Complex Problem Solving:
"Solve this business problem using a multi-step reasoning approach:

Problem: A SaaS company's customer churn rate increased from 5% to 12% over the last quarter.

Step 1: Data Analysis
- What data would you need to analyze this problem?
- What metrics would be most relevant?
- How would you segment the data?

Step 2: Root Cause Investigation
- What are the potential causes of increased churn?
- How would you prioritize these causes?
- What additional research would you conduct?

Step 3: Solution Development
- What solutions would you propose for each root cause?
- How would you evaluate solution effectiveness?
- What resources would be required?

Step 4: Implementation Planning
- What would be your implementation timeline?
- How would you measure success?
- What risks would you monitor?

Step 5: Validation and Iteration
- How would you test your solutions?
- What feedback mechanisms would you establish?
- How would you iterate based on results?

Provide detailed reasoning for each step."
\`\`\`

### Hierarchical Thinking
\`\`\`
Layered Analysis:
"Analyze this market opportunity using hierarchical thinking:

Level 1: Macro Analysis
- Market size and growth trends
- Regulatory environment
- Technology landscape
- Competitive dynamics

Level 2: Industry Analysis
- Value chain structure
- Key success factors
- Barriers to entry
- Profitability drivers

Level 3: Company Analysis
- Competitive positioning
- Core competencies
- Resource requirements
- Strategic options

Level 4: Implementation Analysis
- Go-to-market strategy
- Operational requirements
- Risk assessment
- Success metrics

For each level, provide:
- Key insights
- Critical assumptions
- Dependencies on other levels
- Actionable recommendations"
\`\`\`

## Dynamic Prompt Adaptation

### Context-Aware Prompting
\`\`\`
Adaptive Prompt System:
"Create a dynamic prompt that adapts based on input characteristics:

Base Template:
'Analyze this [CONTENT_TYPE] and provide [ANALYSIS_TYPE] insights.'

Adaptation Rules:
- If content is technical → Use technical language, focus on implementation details
- If content is business-focused → Use business terminology, focus on ROI and strategy
- If content is creative → Use creative language, focus on innovation and design
- If content is data-heavy → Use analytical language, focus on patterns and trends

Content: [Your content here]

Automatically detect the content type and adapt the analysis approach accordingly."
\`\`\`

### Conditional Prompting
\`\`\`
Multi-Path Prompting:
"Analyze this customer feedback using conditional logic:

IF the feedback is positive:
- Focus on strengths and success factors
- Identify replication opportunities
- Suggest expansion strategies

IF the feedback is negative:
- Focus on problem identification
- Analyze root causes
- Propose improvement solutions

IF the feedback is mixed:
- Categorize positive and negative aspects
- Prioritize issues by impact
- Develop balanced improvement plan

IF the feedback is unclear:
- Ask clarifying questions
- Suggest data collection methods
- Provide analysis framework

Customer Feedback: [Feedback text here]

Automatically determine the feedback type and apply the appropriate analysis approach."
\`\`\`

## Advanced Constraint Engineering

### Multi-Dimensional Constraints
\`\`\`
Complex Constraint System:
"Write a product launch announcement with these constraints:

Content Constraints:
- Length: 200-250 words
- Tone: Professional but exciting
- Include: Key features, benefits, availability
- Avoid: Technical jargon, competitor comparisons

Format Constraints:
- Structure: Hook, problem, solution, call-to-action
- Style: Active voice, present tense
- Language: Clear, concise, engaging
- Visual: Include emoji suggestions

Audience Constraints:
- Primary: Tech-savvy professionals
- Secondary: General consumers
- Knowledge level: Intermediate
- Interests: Innovation, productivity

Business Constraints:
- Brand voice: Innovative, reliable, user-friendly
- Key message: Revolutionary productivity tool
- Competitive advantage: AI-powered automation
- Launch timeline: Next month

Product: [Product details here]"
\`\`\`

### Constraint Optimization
\`\`\`
Balanced Constraint Management:
"Optimize this prompt by balancing competing constraints:

Original Constraints:
- Detailed analysis (conflicts with: concise output)
- Technical depth (conflicts with: general audience)
- Comprehensive coverage (conflicts with: time limit)
- Creative approach (conflicts with: formal format)

Optimization Strategy:
1. Identify constraint priorities
2. Find compromise solutions
3. Use conditional formatting
4. Implement tiered responses

Optimized Prompt:
'Provide a [DETAIL_LEVEL] analysis of [TOPIC] for [AUDIENCE].

Detail Levels:
- Executive: High-level insights, key recommendations
- Manager: Detailed analysis, implementation steps
- Technical: In-depth analysis, technical specifications

Audience Adaptation:
- General: Simple language, broad concepts
- Professional: Industry terminology, practical focus
- Expert: Technical language, advanced concepts

Format Options:
- Summary: Bullet points, key takeaways
- Report: Structured sections, detailed analysis
- Presentation: Slide format, visual elements

Select the most appropriate combination based on the specific request.'"
\`\`\`

## Prompt Composition and Modularity

### Modular Prompt Architecture
\`\`\`
Component-Based Prompting:
"Build prompts using modular components:

Core Components:
1. Role Definition: 'You are a [ROLE] with expertise in [DOMAIN]'
2. Task Specification: 'Your task is to [TASK]'
3. Context Provision: 'Given this context: [CONTEXT]'
4. Format Requirements: 'Format your response as: [FORMAT]'
5. Quality Criteria: 'Ensure your response is: [CRITERIA]'

Optional Components:
- Examples: 'Here are examples: [EXAMPLES]'
- Constraints: 'Follow these constraints: [CONSTRAINTS]'
- Success Metrics: 'Success means: [METRICS]'
- Iteration Instructions: 'If needed, iterate by: [INSTRUCTIONS]'

Composition Rules:
- Always include: Role, Task, Format
- Add Context when relevant
- Include Examples for complex tasks
- Add Constraints for specific requirements
- Use Quality Criteria for high-stakes outputs

Example Composition:
Role: Senior Data Analyst
Task: Analyze customer churn data
Context: SaaS company, 6-month dataset
Format: Executive summary + detailed findings
Examples: [Include sample analysis]
Constraints: Focus on actionable insights
Quality: Accurate, clear, business-focused"
\`\`\`

### Prompt Template Inheritance
\`\`\`
Template Hierarchy:
"Base Template:
'You are a [ROLE] analyzing [DOMAIN] data. Provide [ANALYSIS_TYPE] insights in [FORMAT] format.'

Specialized Templates:

Data Analysis Template:
'You are a [ROLE] analyzing [DATA_TYPE] data. Focus on [FOCUS_AREAS]. Provide [ANALYSIS_TYPE] insights in [FORMAT] format.'

Business Analysis Template:
'You are a [ROLE] analyzing [BUSINESS_METRIC] data. Focus on [BUSINESS_OBJECTIVES]. Provide [ANALYSIS_TYPE] insights in [FORMAT] format.'

Technical Analysis Template:
'You are a [ROLE] analyzing [TECHNICAL_SYSTEM] data. Focus on [TECHNICAL_ASPECTS]. Provide [ANALYSIS_TYPE] insights in [FORMAT] format.'

Usage:
1. Select base template
2. Choose specialization
3. Fill in specific parameters
4. Add domain-specific requirements
5. Test and refine"
\`\`\`

## Advanced Evaluation Techniques

### Multi-Criteria Evaluation
\`\`\`
Comprehensive Assessment:
"Evaluate this AI response using multiple criteria:

Response: [AI response here]

Evaluation Criteria:

1. Accuracy (0-10)
   - Factual correctness
   - Logical consistency
   - Data interpretation

2. Completeness (0-10)
   - Addresses all requirements
   - Covers necessary aspects
   - Appropriate depth

3. Clarity (0-10)
   - Language clarity
   - Structure organization
   - Readability

4. Relevance (0-10)
   - Stays on topic
   - Addresses user needs
   - Appropriate focus

5. Actionability (0-10)
   - Practical recommendations
   - Clear next steps
   - Implementable suggestions

6. Originality (0-10)
   - Creative insights
   - Novel perspectives
   - Unique contributions

Overall Score: [Weighted average]
Strengths: [List top 3]
Areas for Improvement: [List top 3]
Recommendations: [Specific suggestions]"
\`\`\`

### Comparative Analysis
\`\`\`
Multi-Model Comparison:
"Compare responses from different AI models for the same prompt:

Prompt: [Your prompt here]

Model A Response: [Response A]
Model B Response: [Response B]
Model C Response: [Response C]

Comparison Framework:

1. Content Quality
   - Accuracy and correctness
   - Depth and comprehensiveness
   - Relevance and focus

2. Format Adherence
   - Structure compliance
   - Style consistency
   - Length appropriateness

3. User Experience
   - Clarity and readability
   - Actionability
   - Engagement level

4. Technical Performance
   - Response time
   - Token efficiency
   - Consistency

Ranking:
1. Best Overall: [Model] - [Reason]
2. Most Accurate: [Model] - [Reason]
3. Most Creative: [Model] - [Reason]
4. Most Practical: [Model] - [Reason]

Recommendations:
- Use [Model] for [specific use case]
- Combine approaches from [Models] for [scenario]
- Avoid [Model] for [limitation]"
\`\`\`

## Practical Exercise

Master advanced techniques:
1. Create a meta-prompting system for self-improvement
2. Build modular prompt components
3. Develop dynamic adaptation rules
4. Implement multi-criteria evaluation
5. Test comparative analysis methods
6. Design constraint optimization strategies
7. Build a prompt composition framework

## Summary & Next Steps

Advanced techniques significantly enhance prompt engineering capabilities. Master these strategies for sophisticated AI interactions.

**Next up**: Part 9 - Real-world applications and case studies.`,
            readTime: 25,
            publishedAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Meta-Prompting', 'Advanced Techniques', 'Dynamic Adaptation', 'Modular Architecture']
          },
          {
            id: 'prompt-part-9',
            partNumber: 9,
            title: 'Real-World Applications and Case Studies',
            summary: 'Explore real-world applications and case studies of effective prompt engineering.',
            content: `# Part 9: Real-World Applications and Case Studies

Learn from real-world applications and case studies of effective prompt engineering across industries.

## Enterprise Applications

### Case Study 1: Customer Service Automation
\`\`\`
Company: Global E-commerce Platform
Challenge: Handle 10,000+ daily customer inquiries with consistent quality
Solution: Multi-tier prompt system

Tier 1: Initial Classification
"Classify this customer inquiry into one of these categories:
- Order Status
- Product Information
- Returns/Refunds
- Technical Support
- Billing Issues
- General Questions

Inquiry: [Customer message]

Provide:
1. Primary category
2. Confidence level (1-10)
3. Urgency level (Low/Medium/High)
4. Suggested response template"

Tier 2: Response Generation
"Generate a customer service response for this [CATEGORY] inquiry:

Customer Inquiry: [Inquiry text]
Customer History: [Previous interactions]
Product Context: [Relevant product info]

Requirements:
- Professional and empathetic tone
- Address all customer concerns
- Include relevant information
- Provide clear next steps
- Keep under 200 words

Template: [Selected response template]"

Results:
- 85% reduction in response time
- 92% customer satisfaction rate
- 60% reduction in escalations
- 40% cost savings
\`\`\`

### Case Study 2: Content Marketing Automation
\`\`\`
Company: SaaS Startup
Challenge: Scale content production for multiple channels
Solution: Modular content generation system

Content Planning Prompt:
"Create a content calendar for [TOPIC] targeting [AUDIENCE]:

Business Context:
- Industry: [Industry]
- Company stage: [Stage]
- Key messages: [Messages]
- Competitors: [Competitors]

Content Requirements:
- 4 blog posts (1,500-2,000 words each)
- 8 social media posts (LinkedIn, Twitter)
- 2 email newsletters
- 1 webinar script outline

Format: Weekly calendar with:
- Content type and title
- Key points to cover
- Target keywords
- Call-to-action
- Distribution channels"

Blog Post Generation:
"Write a comprehensive blog post about [TOPIC] for [AUDIENCE]:

Research Data:
- Industry statistics: [Stats]
- Case studies: [Cases]
- Expert quotes: [Quotes]
- Competitor analysis: [Analysis]

Structure:
1. Hook (compelling opening)
2. Problem identification
3. Solution explanation
4. Implementation steps
5. Results and benefits
6. Call-to-action

SEO Requirements:
- Target keyword: [Keyword]
- Secondary keywords: [Keywords]
- Meta description: [Description]
- Internal links: [Links]

Tone: [Professional/Conversational/Technical]
Length: 1,500-2,000 words"

Results:
- 300% increase in content output
- 45% improvement in SEO rankings
- 25% increase in lead generation
- 50% reduction in content creation costs
\`\`\`

## Healthcare Applications

### Case Study 3: Medical Documentation
\`\`\`
Organization: Regional Hospital Network
Challenge: Standardize medical documentation across departments
Solution: Specialized documentation prompts

Clinical Note Generation:
"Generate a comprehensive clinical note for this patient encounter:

Patient Information:
- Age: [Age]
- Gender: [Gender]
- Chief Complaint: [Complaint]
- Medical History: [History]
- Current Medications: [Medications]

Encounter Details:
- Vital Signs: [Vitals]
- Physical Examination: [Exam]
- Assessment: [Assessment]
- Plan: [Plan]

Format Requirements:
- SOAP note structure
- ICD-10 codes where applicable
- Medication dosages and instructions
- Follow-up recommendations
- Patient education points

Compliance:
- HIPAA compliant language
- Standard medical terminology
- Evidence-based recommendations
- Clear documentation standards"

Discharge Summary:
"Create a discharge summary for this patient:

Admission Details:
- Date: [Date]
- Reason: [Reason]
- Length of stay: [Days]
- Procedures: [Procedures]

Discharge Information:
- Condition: [Condition]
- Medications: [Medications]
- Instructions: [Instructions]
- Follow-up: [Follow-up]

Format:
1. Admission summary
2. Hospital course
3. Discharge condition
4. Medications
5. Instructions
6. Follow-up plan
7. Patient education"

Results:
- 70% reduction in documentation time
- 95% compliance with standards
- 40% improvement in note quality
- 60% reduction in documentation errors
\`\`\`

## Financial Services Applications

### Case Study 4: Risk Assessment Automation
\`\`\`
Company: Investment Management Firm
Challenge: Standardize investment risk assessments
Solution: Structured risk analysis prompts

Investment Analysis:
"Conduct a comprehensive risk assessment for this investment opportunity:

Investment Details:
- Company: [Company]
- Industry: [Industry]
- Investment Type: [Type]
- Amount: [Amount]
- Timeline: [Timeline]

Financial Data:
- Revenue: [Revenue]
- Profitability: [Profitability]
- Debt levels: [Debt]
- Cash flow: [Cash flow]

Market Context:
- Market size: [Size]
- Growth rate: [Growth]
- Competition: [Competition]
- Regulatory environment: [Regulatory]

Risk Assessment Framework:
1. Financial Risk (0-10)
   - Revenue stability
   - Profitability trends
   - Debt burden
   - Cash flow adequacy

2. Market Risk (0-10)
   - Market volatility
   - Competitive position
   - Industry trends
   - Regulatory changes

3. Operational Risk (0-10)
   - Management quality
   - Business model
   - Operational efficiency
   - Technology infrastructure

4. Liquidity Risk (0-10)
   - Market liquidity
   - Exit options
   - Time to liquidity
   - Market conditions

Provide:
- Overall risk score (0-10)
- Risk breakdown by category
- Key risk factors
- Mitigation strategies
- Investment recommendation"

Portfolio Analysis:
"Analyze this investment portfolio for risk concentration:

Portfolio Holdings: [Holdings data]
Market Data: [Market data]
Risk Parameters: [Risk limits]

Analysis Requirements:
1. Concentration Analysis
   - Sector concentration
   - Geographic concentration
   - Asset class concentration
   - Individual position sizes

2. Risk Metrics
   - Portfolio volatility
   - Value at Risk (VaR)
   - Maximum drawdown
   - Correlation analysis

3. Stress Testing
   - Market stress scenarios
   - Liquidity stress scenarios
   - Credit stress scenarios
   - Operational stress scenarios

4. Recommendations
   - Rebalancing suggestions
   - Risk reduction strategies
   - Diversification opportunities
   - Monitoring requirements"

Results:
- 80% reduction in analysis time
- 90% consistency in risk ratings
- 35% improvement in risk prediction accuracy
- 50% reduction in manual errors
\`\`\`

## Technology Applications

### Case Study 5: Code Review Automation
\`\`\`
Company: Software Development Firm
Challenge: Standardize code review process across teams
Solution: Automated code review prompts

Code Review Framework:
"Review this [LANGUAGE] code for a [PROJECT_TYPE] project:

Code: [Code snippet]
Context: [Project context]
Requirements: [Functional requirements]

Review Areas:

1. Functionality (0-10)
   - Correctness and logic
   - Edge case handling
   - Error handling
   - Input validation

2. Performance (0-10)
   - Algorithm efficiency
   - Memory usage
   - Time complexity
   - Resource optimization

3. Security (0-10)
   - Vulnerability assessment
   - Data protection
   - Authentication/authorization
   - Input sanitization

4. Maintainability (0-10)
   - Code readability
   - Documentation quality
   - Modularity
   - Test coverage

5. Best Practices (0-10)
   - Language conventions
   - Design patterns
   - Architecture compliance
   - Standards adherence

Provide:
- Overall score (0-10)
- Detailed feedback for each area
- Specific improvement suggestions
- Priority ranking of issues
- Approval recommendation"

Security Review:
"Conduct a security-focused review of this code:

Code: [Code snippet]
Security Context: [Security requirements]
Threat Model: [Potential threats]

Security Analysis:
1. Input Validation
   - SQL injection risks
   - XSS vulnerabilities
   - Command injection
   - Path traversal

2. Authentication & Authorization
   - Access control implementation
   - Session management
   - Password handling
   - Privilege escalation

3. Data Protection
   - Sensitive data handling
   - Encryption implementation
   - Data transmission security
   - Storage security

4. Error Handling
   - Information disclosure
   - Error message security
   - Logging security
   - Exception handling

Provide:
- Security risk assessment
- Vulnerability identification
- Remediation recommendations
- Security best practices
- Compliance considerations"

Results:
- 75% reduction in security vulnerabilities
- 60% improvement in code quality
- 85% consistency in review standards
- 40% reduction in review time
\`\`\`

## Education Applications

### Case Study 6: Personalized Learning
\`\`\`
Institution: Online Learning Platform
Challenge: Create personalized learning experiences
Solution: Adaptive learning prompts

Learning Assessment:
"Assess this student's understanding of [TOPIC]:

Student Information:
- Level: [Beginner/Intermediate/Advanced]
- Learning Style: [Visual/Auditory/Kinesthetic]
- Previous Knowledge: [Background]
- Learning Goals: [Objectives]

Assessment Data:
- Quiz Results: [Scores]
- Assignment Performance: [Performance]
- Engagement Metrics: [Metrics]
- Time Spent: [Time]

Assessment Framework:
1. Knowledge Gaps
   - Missing concepts
   - Misunderstandings
   - Skill deficiencies
   - Prerequisite gaps

2. Learning Preferences
   - Content format preferences
   - Pace preferences
   - Interaction preferences
   - Feedback preferences

3. Progress Tracking
   - Mastery levels
   - Improvement areas
   - Strengths
   - Challenges

4. Recommendations
   - Next learning steps
   - Resource suggestions
   - Practice opportunities
   - Support needs"

Personalized Content Generation:
"Create personalized learning content for this student:

Student Profile: [Profile data]
Learning Objectives: [Objectives]
Current Level: [Level]
Preferred Format: [Format]

Content Requirements:
- Topic: [Topic]
- Duration: [Duration]
- Difficulty: [Difficulty]
- Style: [Style]

Personalization Elements:
1. Content Adaptation
   - Examples relevant to student interests
   - Difficulty appropriate explanations
   - Learning style optimization
   - Cultural considerations

2. Interactive Elements
   - Practice exercises
   - Self-assessment questions
   - Discussion prompts
   - Reflection activities

3. Progress Tracking
   - Learning checkpoints
   - Skill assessments
   - Achievement milestones
   - Feedback mechanisms

4. Support Resources
   - Additional explanations
   - Related resources
   - Help options
   - Community connections"

Results:
- 45% improvement in learning outcomes
- 60% increase in student engagement
- 35% reduction in dropout rates
- 50% improvement in completion rates
\`\`\`

## Best Practices from Case Studies

### Common Success Factors
\`\`\`
1. **Clear Problem Definition**
   - Specific business objectives
   - Measurable success criteria
   - Clear scope and constraints

2. **Iterative Development**
   - Start with simple prompts
   - Test and refine continuously
   - Gather user feedback
   - Measure performance metrics

3. **Domain Expertise Integration**
   - Include subject matter experts
   - Validate outputs with professionals
   - Incorporate industry best practices
   - Maintain quality standards

4. **Scalability Considerations**
   - Design for high volume
   - Implement quality controls
   - Plan for maintenance
   - Monitor performance

5. **User Experience Focus**
   - Optimize for end users
   - Provide clear instructions
   - Include error handling
   - Offer support resources
\`\`\`

### Implementation Strategies
\`\`\`
1. **Pilot Testing**
   - Start with small-scale tests
   - Validate with real users
   - Measure key metrics
   - Iterate based on results

2. **Gradual Rollout**
   - Phase implementation
   - Train users progressively
   - Monitor adoption rates
   - Address issues quickly

3. **Quality Assurance**
   - Implement review processes
   - Monitor output quality
   - Provide feedback mechanisms
   - Maintain standards

4. **Continuous Improvement**
   - Regular performance reviews
   - User feedback collection
   - Prompt optimization
   - System updates
\`\`\`

## Practical Exercise

Apply case study insights:
1. Identify a real-world problem in your domain
2. Design a prompt engineering solution
3. Create a pilot implementation
4. Test with real users
5. Measure performance metrics
6. Iterate and improve
7. Document lessons learned

## Summary & Next Steps

Real-world applications demonstrate the practical value of prompt engineering. Learn from these case studies to implement effective solutions.

**Next up**: Part 10 - The future of prompt engineering and emerging trends.`,
            readTime: 27,
            publishedAt: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Real-World Applications', 'Case Studies', 'Enterprise Solutions', 'Industry Examples']
          },
          {
            id: 'prompt-part-10',
            partNumber: 10,
            title: 'The Future of Prompt Engineering',
            summary: 'Explore emerging trends and the future landscape of prompt engineering.',
            content: `# Part 10: The Future of Prompt Engineering

Explore emerging trends and the future landscape of prompt engineering and AI interaction.

## Emerging Trends

### 1. Multimodal Prompt Engineering
\`\`\`
Future Vision: Seamless integration of text, images, audio, and video

Example Applications:
"Analyze this product launch video and create a comprehensive marketing strategy:

Video Content: [Video file]
Audio Transcript: [Transcript]
Visual Elements: [Image descriptions]
Brand Context: [Brand guidelines]

Analysis Requirements:
1. Visual Analysis
   - Product presentation quality
   - Brand consistency
   - Visual appeal assessment
   - Target audience alignment

2. Audio Analysis
   - Message clarity
   - Tone and pacing
   - Emotional impact
   - Call-to-action effectiveness

3. Content Strategy
   - Key message identification
   - Channel optimization
   - Audience segmentation
   - Campaign recommendations

4. Performance Prediction
   - Engagement forecasts
   - Conversion estimates
   - Viral potential
   - Risk assessment

Provide:
- Comprehensive analysis report
- Optimization recommendations
- Multi-channel strategy
- Implementation timeline"
\`\`\`

### 2. Real-Time Prompt Adaptation
\`\`\`
Dynamic Learning Systems:
"Create a self-improving prompt system that adapts based on user feedback:

Base Prompt: [Initial prompt]
User Interactions: [Interaction history]
Feedback Data: [User ratings and comments]
Performance Metrics: [Success rates and outcomes]

Adaptation Rules:
- If user satisfaction < 7/10 → Analyze feedback and suggest improvements
- If completion rate < 80% → Simplify language and reduce complexity
- If accuracy < 90% → Add more specific instructions and examples
- If response time > 30s → Optimize for efficiency

Learning Mechanisms:
1. Pattern Recognition
   - Identify successful prompt patterns
   - Detect failure modes
   - Recognize user preferences
   - Track performance trends

2. Automatic Optimization
   - A/B test prompt variations
   - Implement best-performing versions
   - Remove ineffective elements
   - Add successful components

3. Personalization
   - Adapt to individual user styles
   - Learn from user corrections
   - Customize output formats
   - Optimize for user goals

4. Continuous Improvement
   - Regular performance reviews
   - User feedback integration
   - Prompt version updates
   - Quality monitoring"
\`\`\`

### 3. Collaborative Prompt Engineering
\`\`\`
Team-Based Prompt Development:
"Design a collaborative prompt engineering workflow:

Team Structure:
- Prompt Engineers: Design and optimize prompts
- Domain Experts: Provide subject matter expertise
- Quality Assurance: Test and validate outputs
- End Users: Provide feedback and requirements

Collaboration Tools:
1. Version Control System
   - Track prompt changes
   - Manage different versions
   - Enable rollback capabilities
   - Document modifications

2. Review Process
   - Peer review requirements
   - Expert validation
   - User testing protocols
   - Quality metrics

3. Knowledge Sharing
   - Best practices documentation
   - Success case studies
   - Failure analysis
   - Training materials

4. Performance Monitoring
   - Real-time metrics
   - User satisfaction tracking
   - Output quality assessment
   - System performance monitoring

Workflow:
1. Requirements Gathering
   - User needs analysis
   - Business objectives
   - Technical constraints
   - Success criteria

2. Prompt Design
   - Initial prompt creation
   - Expert review
   - Iterative refinement
   - Testing and validation

3. Implementation
   - System integration
   - User training
   - Performance monitoring
   - Feedback collection

4. Maintenance
   - Regular updates
   - Performance optimization
   - User feedback integration
   - Continuous improvement"
\`\`\`

## Advanced AI Integration

### 4. AI-to-AI Communication
\`\`\`
Inter-AI Prompting:
"Design a system where AI models communicate and collaborate:

AI Agent 1 (Data Analyst):
"Analyze this dataset and provide insights for the marketing team."

AI Agent 2 (Marketing Strategist):
"Based on the data analysis, create a marketing strategy that addresses the identified opportunities."

AI Agent 3 (Content Creator):
"Develop content pieces that support the marketing strategy and resonate with the target audience."

AI Agent 4 (Performance Monitor):
"Track the effectiveness of the marketing strategy and content, providing recommendations for optimization."

Communication Protocol:
1. Data Handoff
   - Structured data format
   - Context preservation
   - Quality validation
   - Error handling

2. Task Coordination
   - Dependency management
   - Timeline coordination
   - Resource allocation
   - Progress tracking

3. Quality Assurance
   - Output validation
   - Consistency checking
   - Error detection
   - Performance monitoring

4. Feedback Loops
   - Performance feedback
   - Improvement suggestions
   - Learning opportunities
   - System optimization"
\`\`\`

### 5. Autonomous Prompt Generation
\`\`\`
Self-Creating Prompt Systems:
"Develop a system that automatically generates optimized prompts:

Input: [User request or task description]
Context: [Available data and constraints]
Objectives: [Success criteria and metrics]

Generation Process:
1. Task Analysis
   - Understand user intent
   - Identify required capabilities
   - Determine output format
   - Assess complexity level

2. Prompt Construction
   - Select appropriate template
   - Add relevant context
   - Include necessary examples
   - Apply optimization rules

3. Validation and Testing
   - Test with sample inputs
   - Validate output quality
   - Check for edge cases
   - Measure performance

4. Optimization
   - Identify improvement areas
   - Apply optimization techniques
   - Test variations
   - Select best version

5. Deployment
   - Integrate with system
   - Monitor performance
   - Collect user feedback
   - Iterate improvements

Example Output:
"Based on your request for 'analyze customer feedback and provide actionable insights,' I've generated this optimized prompt:

'You are a customer experience analyst with expertise in feedback analysis and business strategy.

Task: Analyze the following customer feedback data and provide actionable insights for improving customer satisfaction.

Data: [Customer feedback data]

Analysis Framework:
1. Sentiment Analysis
   - Overall sentiment trends
   - Key positive themes
   - Major pain points
   - Emotional drivers

2. Categorization
   - Feedback categories
   - Issue prioritization
   - Impact assessment
   - Frequency analysis

3. Insights Generation
   - Root cause analysis
   - Pattern identification
   - Opportunity recognition
   - Risk assessment

4. Recommendations
   - Immediate actions
   - Strategic initiatives
   - Process improvements
   - Monitoring metrics

Format: Executive summary + detailed analysis + action plan
Tone: Professional, data-driven, actionable
Length: 2-3 pages maximum'"
\`\`\`

## Future Applications

### 6. Personalized AI Assistants
\`\`\`
Individual AI Companions:
"Create a personalized AI assistant that learns and adapts to individual users:

User Profile:
- Professional background: [Background]
- Learning style: [Style]
- Communication preferences: [Preferences]
- Goals and objectives: [Goals]

Personalization Features:
1. Communication Style
   - Tone adaptation
   - Language complexity
   - Cultural considerations
   - Personal preferences

2. Task Optimization
   - Workflow customization
   - Tool integration
   - Automation preferences
   - Efficiency optimization

3. Learning and Growth
   - Skill development tracking
   - Knowledge gap identification
   - Learning recommendations
   - Progress monitoring

4. Proactive Assistance
   - Anticipated needs
   - Opportunity identification
   - Risk prevention
   - Optimization suggestions

Example Interaction:
"Good morning! Based on your calendar and recent work patterns, I've prepared:

1. Priority tasks for today (based on deadlines and importance)
2. Relevant industry news (filtered for your interests)
3. Learning opportunities (aligned with your growth goals)
4. Meeting preparation (for your 2 PM client call)

Would you like me to:
- Adjust any of these recommendations?
- Provide more detail on any item?
- Suggest additional optimizations?
- Help with specific tasks?"
\`\`\`

### 7. Industry-Specific AI Solutions
\`\`\`
Specialized Domain Applications:

Healthcare AI:
"Develop a medical AI assistant for healthcare professionals:

Capabilities:
- Clinical decision support
- Medical literature analysis
- Patient communication assistance
- Treatment plan optimization

Compliance:
- HIPAA compliance
- Medical accuracy standards
- Professional liability considerations
- Regulatory requirements

Example Prompt:
'You are a medical AI assistant designed to support healthcare professionals. Your role is to provide evidence-based information and decision support while maintaining the highest standards of medical accuracy and patient safety.

When responding to medical queries:
1. Always emphasize the importance of professional medical judgment
2. Provide evidence-based information with sources
3. Include appropriate disclaimers
4. Suggest consultation with specialists when appropriate
5. Maintain patient confidentiality standards

Medical Query: [Query here]

Response Format:
- Evidence-based answer
- Relevant medical literature
- Clinical considerations
- Follow-up recommendations
- Disclaimer and limitations'"

Legal AI:
"Create a legal AI assistant for law firms:

Capabilities:
- Legal research assistance
- Document analysis
- Case law research
- Contract review

Compliance:
- Attorney-client privilege
- Legal accuracy requirements
- Professional responsibility
- Bar association guidelines

Example Prompt:
'You are a legal AI assistant designed to support legal professionals. Your role is to provide legal research assistance and analysis while maintaining the highest standards of legal accuracy and professional responsibility.

When responding to legal queries:
1. Always emphasize the importance of professional legal judgment
2. Provide accurate legal information with citations
3. Include appropriate disclaimers
4. Suggest consultation with specialists when appropriate
5. Maintain client confidentiality standards

Legal Query: [Query here]

Response Format:
- Legal analysis
- Relevant case law and statutes
- Practical considerations
- Risk assessment
- Disclaimer and limitations'"
\`\`\`

## Ethical Considerations

### 8. Responsible AI Development
\`\`\`
Ethical Prompt Engineering:
"Develop ethical guidelines for prompt engineering:

Core Principles:
1. Transparency
   - Clear AI disclosure
   - Honest capability representation
   - Transparent limitations
   - Open communication

2. Fairness
   - Bias prevention
   - Equal treatment
   - Diversity consideration
   - Inclusive design

3. Privacy
   - Data protection
   - Confidentiality maintenance
   - Consent respect
   - Security implementation

4. Accountability
   - Responsibility assignment
   - Error handling
   - Quality assurance
   - Continuous monitoring

Ethical Prompt Design:
"Create prompts that adhere to ethical principles:

Guidelines:
- Avoid biased language
- Include diversity considerations
- Respect privacy requirements
- Ensure accuracy and honesty
- Provide appropriate disclaimers
- Consider potential misuse
- Implement safety measures

Example Ethical Prompt:
'You are an AI assistant designed to provide helpful and accurate information while maintaining the highest ethical standards.

When responding to queries:
1. Provide accurate, evidence-based information
2. Acknowledge limitations and uncertainties
3. Avoid biased or discriminatory language
4. Respect privacy and confidentiality
5. Consider potential misuse of information
6. Include appropriate disclaimers
7. Suggest professional consultation when appropriate

Query: [User query]

Response Requirements:
- Accurate and helpful information
- Appropriate disclaimers
- Bias-free language
- Privacy considerations
- Safety measures'"
\`\`\`

## Future Challenges and Opportunities

### 9. Technical Challenges
\`\`\`
Emerging Challenges:
1. **Scalability**
   - Handling massive prompt volumes
   - Real-time processing requirements
   - Resource optimization
   - Performance maintenance

2. **Quality Assurance**
   - Automated quality testing
   - Bias detection and prevention
   - Accuracy validation
   - Consistency maintenance

3. **Integration Complexity**
   - Multi-system integration
   - Legacy system compatibility
   - Data synchronization
   - Workflow optimization

4. **Security and Privacy**
   - Data protection
   - Access control
   - Audit trails
   - Compliance management

Solutions:
- Advanced automation tools
- Machine learning optimization
- Cloud-based infrastructure
- Enhanced security protocols
\`\`\`

### 10. Career Opportunities
\`\`\`
Future Career Paths:
1. **Prompt Engineering Specialist**
   - Design and optimize prompts
   - Develop prompt systems
   - Train and mentor teams
   - Research new techniques

2. **AI Interaction Designer**
   - Design user-AI interactions
   - Create intuitive interfaces
   - Optimize user experience
   - Conduct user research

3. **AI Ethics Consultant**
   - Ensure ethical AI practices
   - Develop compliance frameworks
   - Conduct bias audits
   - Provide ethical guidance

4. **AI System Architect**
   - Design AI system architectures
   - Integrate multiple AI components
   - Optimize system performance
   - Manage technical complexity

Skills Development:
- Technical prompt engineering
- AI system design
- Ethical AI practices
- User experience design
- Project management
- Communication skills
\`\`\`

## Practical Exercise

Prepare for the future:
1. Explore emerging AI technologies
2. Develop advanced prompt engineering skills
3. Build ethical AI practices
4. Create future-ready solutions
5. Stay updated with industry trends
6. Network with AI professionals
7. Contribute to AI community

## Summary & Next Steps

The future of prompt engineering is bright and full of opportunities. Master current techniques while preparing for emerging trends.

**Congratulations on completing Prompt Engineering Mastery!**

You now have the knowledge and skills to:
- Design effective prompts for any situation
- Optimize AI interactions for maximum results
- Apply advanced techniques and strategies
- Implement real-world solutions
- Navigate ethical considerations
- Prepare for future developments

Continue learning, experimenting, and innovating in the exciting field of prompt engineering!`,
            readTime: 28,
            publishedAt: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Future Trends', 'Emerging Technologies', 'Ethical AI', 'Career Development']
          }
          // Additional episodes would continue here...
        ]
      },
      'statistics': {
        id: 'statistics',
        title: 'Statistics Mastery: Data Analysis Foundation',
        description: 'Master statistical analysis, hypothesis testing, and data modeling for data professionals.',
        totalEpisodes: 12,
        estimatedDuration: '12 weeks',
        difficulty: 'Beginner',
        category: 'statistics',
        prerequisites: ['Basic math knowledge', 'Understanding of data types'],
        learningOutcomes: [
          'Master descriptive statistics',
          'Understand probability distributions',
          'Perform hypothesis testing',
          'Apply statistical modeling',
          'Interpret statistical results'
        ],
        episodes: [
          {
            id: 'stats-part-1',
            partNumber: 1,
            title: 'Introduction to Statistics and Data Types',
            summary: 'Learn the fundamentals of statistics and understand different types of data.',
            content: `# Part 1: Introduction to Statistics and Data Types

Welcome to Statistics Mastery! This series will build your statistical foundation for data analysis.

## What is Statistics?

### Definition
- **Statistics**: Science of collecting, analyzing, and interpreting data
- **Purpose**: Make informed decisions based on data
- **Applications**: Business, science, medicine, social sciences

### Types of Statistics
- **Descriptive Statistics**: Summarizing and describing data
- **Inferential Statistics**: Drawing conclusions from data
- **Exploratory Data Analysis**: Discovering patterns in data

## Types of Data

### Categorical Data
- **Nominal**: Categories without order (colors, brands)
- **Ordinal**: Categories with order (ratings, grades)
- **Binary**: Two categories (yes/no, pass/fail)

### Numerical Data
- **Discrete**: Whole numbers (counts, scores)
- **Continuous**: Any value in a range (height, weight, time)

### Data Collection Methods
- **Surveys**: Questionnaires and interviews
- **Experiments**: Controlled studies
- **Observational Studies**: Natural observation
- **Secondary Data**: Existing datasets

## Descriptive Statistics

### Measures of Central Tendency
- **Mean**: Average value
- **Median**: Middle value
- **Mode**: Most frequent value

### Measures of Variability
- **Range**: Difference between max and min
- **Variance**: Average squared deviation from mean
- **Standard Deviation**: Square root of variance
- **Interquartile Range**: Range of middle 50% of data

### Measures of Shape
- **Skewness**: Asymmetry of distribution
- **Kurtosis**: "Peakedness" of distribution

## Data Visualization

### Types of Charts
- **Histogram**: Distribution of numerical data
- **Bar Chart**: Comparison of categories
- **Box Plot**: Distribution summary
- **Scatter Plot**: Relationship between variables

### Best Practices
- Choose appropriate chart types
- Use clear labels and titles
- Avoid misleading scales
- Consider your audience

## Practical Exercise

Analyze a sample dataset:
1. Identify data types
2. Calculate descriptive statistics
3. Create appropriate visualizations
4. Interpret the results
5. Identify any patterns or outliers

## Summary & Next Steps

Statistics provides the foundation for data analysis. Understanding data types and descriptive statistics is essential.

**Next up**: Part 2 - Probability fundamentals and distributions.`,
            readTime: 15,
            publishedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Statistics Fundamentals', 'Data Types', 'Descriptive Statistics', 'Data Visualization']
          },
          {
            id: 'stats-part-2',
            partNumber: 2,
            title: 'Probability Fundamentals and Distributions',
            summary: 'Master probability concepts and understand common probability distributions.',
            content: `# Part 2: Probability Fundamentals and Distributions

Probability is the foundation of statistical inference. Learn these essential concepts.

## Probability Basics

### What is Probability?
- **Definition**: Likelihood of an event occurring
- **Range**: 0 (impossible) to 1 (certain)
- **Applications**: Risk assessment, decision making

### Probability Rules
- **Addition Rule**: P(A or B) = P(A) + P(B) - P(A and B)
- **Multiplication Rule**: P(A and B) = P(A) × P(B|A)
- **Complement Rule**: P(not A) = 1 - P(A)

### Conditional Probability
- **Definition**: Probability of A given B
- **Formula**: P(A|B) = P(A and B) / P(B)
- **Independence**: Events are independent if P(A|B) = P(A)

## Common Probability Distributions

### Discrete Distributions

#### Binomial Distribution
- **Use Case**: Success/failure experiments
- **Parameters**: n (trials), p (success probability)
- **Example**: Coin flips, survey responses

#### Poisson Distribution
- **Use Case**: Rare events in fixed intervals
- **Parameter**: λ (average rate)
- **Example**: Customer arrivals, defects

### Continuous Distributions

#### Normal Distribution
- **Use Case**: Many natural phenomena
- **Parameters**: μ (mean), σ (standard deviation)
- **Properties**: Bell-shaped, symmetric

#### Standard Normal Distribution
- **Mean**: 0
- **Standard Deviation**: 1
- **Z-scores**: Standardized values

## Central Limit Theorem

### What is CLT?
- **Definition**: Sample means approach normal distribution
- **Conditions**: Large sample size, independent observations
- **Importance**: Foundation of inferential statistics

### Applications
- **Confidence Intervals**: Estimating population parameters
- **Hypothesis Testing**: Making statistical decisions
- **Quality Control**: Process monitoring

## Practical Exercise

Work with probability distributions:
1. Calculate probabilities for different distributions
2. Generate random samples
3. Compare theoretical vs empirical distributions
4. Apply probability rules to real scenarios
5. Interpret results in context

## Summary & Next Steps

Probability provides the mathematical foundation for statistical inference. Master these concepts for advanced analysis.

**Next up**: Part 3 - Sampling and estimation techniques.`,
            readTime: 18,
            publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Probability', 'Distributions', 'Central Limit Theorem', 'Statistical Inference']
          },
          {
            id: 'stats-part-3',
            partNumber: 3,
            title: 'Sampling and Estimation',
            summary: 'Master sampling techniques and statistical estimation methods for reliable data analysis.',
            content: `# Part 3: Sampling and Estimation

Learn to collect representative samples and make reliable estimates about populations.

## Sampling Fundamentals

### Why Sampling?
- **Population**: Entire group of interest
- **Sample**: Subset of the population
- **Representativeness**: Sample should reflect population
- **Efficiency**: Cost and time considerations

### Sampling Methods
- **Simple Random Sampling**: Every unit has equal chance
- **Stratified Sampling**: Divide into groups, sample from each
- **Cluster Sampling**: Sample groups, then all units in selected groups
- **Systematic Sampling**: Select every nth unit

## Random Sampling Techniques

### Simple Random Sampling
\`\`\`python
import random
import pandas as pd

# Generate random sample
population = list(range(1000))
sample_size = 100
random_sample = random.sample(population, sample_size)

# Using pandas
df = pd.read_csv('population_data.csv')
sample_df = df.sample(n=100, random_state=42)
\`\`\`

### Stratified Sampling
\`\`\`python
# Stratified sampling by category
def stratified_sample(df, strata_col, sample_size):
    samples = []
    for stratum in df[strata_col].unique():
        stratum_data = df[df[strata_col] == stratum]
        stratum_sample = stratum_data.sample(
            n=min(sample_size, len(stratum_data)),
            random_state=42
        )
        samples.append(stratum_sample)
    return pd.concat(samples)
\`\`\`

## Sampling Distributions

### Central Limit Theorem in Practice
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# Simulate sampling distribution
population_mean = 100
population_std = 15
sample_size = 30
num_samples = 1000

sample_means = []
for _ in range(num_samples):
    sample = np.random.normal(population_mean, population_std, sample_size)
    sample_means.append(np.mean(sample))

# Plot sampling distribution
plt.hist(sample_means, bins=30, density=True, alpha=0.7)
plt.axvline(np.mean(sample_means), color='red', linestyle='--', label='Sample Mean')
plt.axvline(population_mean, color='green', linestyle='--', label='Population Mean')
plt.legend()
plt.show()
\`\`\`

### Standard Error
\`\`\`python
# Calculate standard error
def standard_error(sample_std, sample_size):
    return sample_std / np.sqrt(sample_size)

# Example
sample_std = 15
sample_size = 30
se = standard_error(sample_std, sample_size)
print(f"Standard Error: {se:.2f}")
\`\`\`

## Point Estimation

### Estimators and Properties
- **Unbiased**: Expected value equals parameter
- **Consistent**: Approaches parameter as sample size increases
- **Efficient**: Smallest variance among unbiased estimators
- **Sufficient**: Uses all information in sample

### Common Estimators
\`\`\`python
# Sample mean (unbiased estimator of population mean)
def sample_mean(data):
    return np.mean(data)

# Sample variance (unbiased estimator)
def sample_variance(data):
    n = len(data)
    return np.sum((data - np.mean(data))**2) / (n - 1)

# Sample proportion
def sample_proportion(data, success_value):
    return np.sum(data == success_value) / len(data)
\`\`\`

## Confidence Intervals

### Confidence Interval for Mean
\`\`\`python
from scipy import stats

def confidence_interval_mean(data, confidence=0.95):
    n = len(data)
    mean = np.mean(data)
    std = np.std(data, ddof=1)
    se = std / np.sqrt(n)
    
    # Calculate critical value
    alpha = 1 - confidence
    critical_value = stats.t.ppf(1 - alpha/2, df=n-1)
    
    # Calculate margin of error
    margin_error = critical_value * se
    
    return mean - margin_error, mean + margin_error

# Example
data = np.random.normal(100, 15, 30)
ci_lower, ci_upper = confidence_interval_mean(data, 0.95)
print(f"95% Confidence Interval: ({ci_lower:.2f}, {ci_upper:.2f})")
\`\`\`

### Confidence Interval for Proportion
\`\`\`python
def confidence_interval_proportion(successes, trials, confidence=0.95):
    p_hat = successes / trials
    se = np.sqrt(p_hat * (1 - p_hat) / trials)
    
    # Z-score for normal approximation
    z_score = stats.norm.ppf(1 - (1 - confidence) / 2)
    margin_error = z_score * se
    
    return p_hat - margin_error, p_hat + margin_error

# Example
successes = 45
trials = 100
ci_lower, ci_upper = confidence_interval_proportion(successes, trials)
print(f"95% CI for proportion: ({ci_lower:.3f}, {ci_upper:.3f})")
\`\`\`

## Sample Size Determination

### Sample Size for Mean
\`\`\`python
def sample_size_mean(margin_error, std_dev, confidence=0.95):
    z_score = stats.norm.ppf(1 - (1 - confidence) / 2)
    n = (z_score * std_dev / margin_error) ** 2
    return int(np.ceil(n))

# Example
margin_error = 2
std_dev = 15
confidence = 0.95
n = sample_size_mean(margin_error, std_dev, confidence)
print(f"Required sample size: {n}")
\`\`\`

### Sample Size for Proportion
\`\`\`python
def sample_size_proportion(margin_error, estimated_prop=0.5, confidence=0.95):
    z_score = stats.norm.ppf(1 - (1 - confidence) / 2)
    n = (z_score ** 2) * estimated_prop * (1 - estimated_prop) / (margin_error ** 2)
    return int(np.ceil(n))

# Example
margin_error = 0.05
estimated_prop = 0.5
n = sample_size_proportion(margin_error, estimated_prop)
print(f"Required sample size: {n}")
\`\`\`

## Bias and Sampling Errors

### Types of Bias
- **Selection Bias**: Non-random selection
- **Response Bias**: Incorrect responses
- **Non-response Bias**: Missing data
- **Measurement Bias**: Systematic errors

### Reducing Bias
\`\`\`python
# Random sampling to reduce selection bias
def random_sample_no_replacement(population, sample_size):
    return random.sample(population, sample_size)

# Stratified sampling to ensure representation
def ensure_representation(df, strata_col, target_proportions):
    samples = []
    for stratum, proportion in target_proportions.items():
        stratum_data = df[df[strata_col] == stratum]
        sample_size = int(len(df) * proportion)
        sample = stratum_data.sample(n=sample_size, random_state=42)
        samples.append(sample)
    return pd.concat(samples)
\`\`\`

## Practical Exercise

Design and implement a sampling study:
1. Define the population and research question
2. Choose appropriate sampling method
3. Calculate required sample size
4. Collect the sample
5. Calculate point estimates
6. Construct confidence intervals
7. Interpret results

## Summary & Next Steps

Sampling and estimation are fundamental to statistical inference. Master these techniques for reliable data analysis.

**Next up**: Part 4 - Hypothesis testing fundamentals.`,
            readTime: 18,
            publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Sampling', 'Estimation', 'Confidence Intervals', 'Sample Size']
          },
          {
            id: 'stats-part-4',
            partNumber: 4,
            title: 'Hypothesis Testing Fundamentals',
            summary: 'Learn the fundamentals of hypothesis testing for making data-driven decisions.',
            content: `# Part 4: Hypothesis Testing Fundamentals

Master hypothesis testing to make informed decisions based on statistical evidence.

## Hypothesis Testing Concepts

### What is Hypothesis Testing?
- **Purpose**: Test claims about population parameters
- **Process**: Use sample data to make decisions
- **Logic**: Assume null hypothesis is true, look for evidence against it
- **Decision**: Reject or fail to reject null hypothesis

### Key Components
- **Null Hypothesis (H₀)**: Statement of no effect or no difference
- **Alternative Hypothesis (H₁)**: Statement we want to test
- **Test Statistic**: Calculated from sample data
- **P-value**: Probability of observing test statistic or more extreme
- **Significance Level (α)**: Threshold for decision making

## Types of Hypotheses

### One-tailed vs Two-tailed Tests
\`\`\`python
# One-tailed test (right-tailed)
# H₀: μ ≤ 100, H₁: μ > 100

# Two-tailed test
# H₀: μ = 100, H₁: μ ≠ 100

# One-tailed test (left-tailed)
# H₀: μ ≥ 100, H₁: μ < 100
\`\`\`

### Setting Up Hypotheses
\`\`\`python
def setup_hypotheses(test_type, null_value):
    if test_type == "two_tailed":
        return f"H₀: μ = {null_value}, H₁: μ ≠ {null_value}"
    elif test_type == "right_tailed":
        return f"H₀: μ ≤ {null_value}, H₁: μ > {null_value}"
    elif test_type == "left_tailed":
        return f"H₀: μ ≥ {null_value}, H₁: μ < {null_value}"
\`\`\`

## Z-Test for Population Mean

### When to Use Z-Test
- **Population standard deviation known**
- **Large sample size (n ≥ 30)**
- **Normal distribution or large sample**

### Z-Test Implementation
\`\`\`python
from scipy import stats

def z_test_mean(sample_data, population_mean, population_std, alpha=0.05, test_type="two_tailed"):
    n = len(sample_data)
    sample_mean = np.mean(sample_data)
    
    # Calculate test statistic
    z_stat = (sample_mean - population_mean) / (population_std / np.sqrt(n))
    
    # Calculate p-value
    if test_type == "two_tailed":
        p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))
    elif test_type == "right_tailed":
        p_value = 1 - stats.norm.cdf(z_stat)
    elif test_type == "left_tailed":
        p_value = stats.norm.cdf(z_stat)
    
    # Make decision
    decision = "Reject H₀" if p_value < alpha else "Fail to reject H₀"
    
    return {
        'z_statistic': z_stat,
        'p_value': p_value,
        'decision': decision,
        'alpha': alpha
    }

# Example
sample_data = np.random.normal(105, 15, 50)  # Sample from population with mean 105
result = z_test_mean(sample_data, 100, 15, alpha=0.05, test_type="two_tailed")
print(f"Z-statistic: {result['z_statistic']:.3f}")
print(f"P-value: {result['p_value']:.3f}")
print(f"Decision: {result['decision']}")
\`\`\`

## T-Test for Population Mean

### When to Use T-Test
- **Population standard deviation unknown**
- **Small sample size (n < 30)**
- **Normal distribution assumed**

### One-Sample T-Test
\`\`\`python
def t_test_mean(sample_data, population_mean, alpha=0.05, test_type="two_tailed"):
    n = len(sample_data)
    sample_mean = np.mean(sample_data)
    sample_std = np.std(sample_data, ddof=1)
    
    # Calculate test statistic
    t_stat = (sample_mean - population_mean) / (sample_std / np.sqrt(n))
    df = n - 1  # degrees of freedom
    
    # Calculate p-value
    if test_type == "two_tailed":
        p_value = 2 * (1 - stats.t.cdf(abs(t_stat), df))
    elif test_type == "right_tailed":
        p_value = 1 - stats.t.cdf(t_stat, df)
    elif test_type == "left_tailed":
        p_value = stats.t.cdf(t_stat, df)
    
    # Make decision
    decision = "Reject H₀" if p_value < alpha else "Fail to reject H₀"
    
    return {
        't_statistic': t_stat,
        'degrees_of_freedom': df,
        'p_value': p_value,
        'decision': decision,
        'alpha': alpha
    }

# Example
sample_data = np.random.normal(102, 12, 20)
result = t_test_mean(sample_data, 100, alpha=0.05, test_type="two_tailed")
print(f"T-statistic: {result['t_statistic']:.3f}")
print(f"P-value: {result['p_value']:.3f}")
print(f"Decision: {result['decision']}")
\`\`\`

## Two-Sample Tests

### Independent Samples T-Test
\`\`\`python
def independent_t_test(sample1, sample2, alpha=0.05, test_type="two_tailed"):
    n1, n2 = len(sample1), len(sample2)
    mean1, mean2 = np.mean(sample1), np.mean(sample2)
    std1, std2 = np.std(sample1, ddof=1), np.std(sample2, ddof=1)
    
    # Pooled standard error
    pooled_std = np.sqrt(((n1-1)*std1**2 + (n2-1)*std2**2) / (n1+n2-2))
    se = pooled_std * np.sqrt(1/n1 + 1/n2)
    
    # Test statistic
    t_stat = (mean1 - mean2) / se
    df = n1 + n2 - 2
    
    # P-value
    if test_type == "two_tailed":
        p_value = 2 * (1 - stats.t.cdf(abs(t_stat), df))
    elif test_type == "right_tailed":
        p_value = 1 - stats.t.cdf(t_stat, df)
    elif test_type == "left_tailed":
        p_value = stats.t.cdf(t_stat, df)
    
    decision = "Reject H₀" if p_value < alpha else "Fail to reject H₀"
    
    return {
        't_statistic': t_stat,
        'degrees_of_freedom': df,
        'p_value': p_value,
        'decision': decision
    }
\`\`\`

## Type I and Type II Errors

### Error Types
- **Type I Error**: Rejecting true null hypothesis (α)
- **Type II Error**: Failing to reject false null hypothesis (β)
- **Power**: Probability of correctly rejecting false null (1 - β)

### Power Analysis
\`\`\`python
def calculate_power(effect_size, sample_size, alpha=0.05):
    # Calculate power for t-test
    df = sample_size - 1
    critical_t = stats.t.ppf(1 - alpha/2, df)
    
    # Non-centrality parameter
    ncp = effect_size * np.sqrt(sample_size)
    
    # Power calculation
    power = 1 - stats.t.cdf(critical_t, df, ncp) + stats.t.cdf(-critical_t, df, ncp)
    
    return power

# Example
effect_size = 0.5  # Cohen's d
sample_size = 30
power = calculate_power(effect_size, sample_size)
print(f"Power: {power:.3f}")
\`\`\`

## Practical Exercise

Conduct hypothesis tests:
1. Formulate null and alternative hypotheses
2. Choose appropriate test and significance level
3. Calculate test statistic and p-value
4. Make statistical decision
5. Interpret results in context
6. Consider practical significance
7. Report findings

## Summary & Next Steps

Hypothesis testing provides a framework for making data-driven decisions. Master these fundamentals for statistical analysis.

**Next up**: Part 5 - Analysis of variance (ANOVA).`,
            readTime: 20,
            publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Hypothesis Testing', 'Z-Test', 'T-Test', 'P-Value']
          },
          {
            id: 'statistics-part-5',
            partNumber: 5,
            title: 'Analysis of Variance (ANOVA)',
            summary: 'Master ANOVA techniques for comparing multiple groups and understanding variance components.',
            content: `# Part 5: Analysis of Variance (ANOVA)

Learn to use ANOVA for comparing multiple groups and understanding sources of variation in data.

## Introduction to ANOVA

### What is ANOVA?
- **Definition**: Statistical method for comparing means of three or more groups
- **Purpose**: Test if there are significant differences between group means
- **Assumptions**: Normality, independence, equal variances
- **Types**: One-way, Two-way, Repeated measures, Mixed models

### ANOVA vs. T-tests
\`\`\`
Comparison:
1. T-tests
   - Compare 2 groups only
   - Simple and straightforward
   - Multiple comparisons increase Type I error

2. ANOVA
   - Compare 3+ groups simultaneously
   - Controls overall Type I error rate
   - More complex but more powerful
\`\`\`

## One-Way ANOVA

### Conceptual Framework
\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from scipy.stats import f_oneway
import statsmodels.api as sm
from statsmodels.stats.anova import anova_lm
from statsmodels.formula.api import ols

# Generate sample data for three groups
np.random.seed(42)

# Group 1: Control
group1 = np.random.normal(50, 10, 30)

# Group 2: Treatment A
group2 = np.random.normal(55, 10, 30)

# Group 3: Treatment B
group3 = np.random.normal(60, 10, 30)

# Combine data
data = pd.DataFrame({
    'value': np.concatenate([group1, group2, group3]),
    'group': ['Control'] * 30 + ['Treatment A'] * 30 + ['Treatment B'] * 30
})

print("Sample Data:")
print(data.head())
print(f"\\nGroup means:")
print(data.groupby('group')['value'].mean())
\`\`\`

### ANOVA Calculations
\`\`\`python
# Manual ANOVA calculation
def calculate_anova(data, group_col, value_col):
    # Calculate group statistics
    groups = data.groupby(group_col)[value_col]
    n_groups = len(groups)
    n_total = len(data)
    
    # Grand mean
    grand_mean = data[value_col].mean()
    
    # Sum of Squares Between (SSB)
    ssb = 0
    for name, group in groups:
        n_group = len(group)
        group_mean = group.mean()
        ssb += n_group * (group_mean - grand_mean) ** 2
    
    # Sum of Squares Within (SSW)
    ssw = 0
    for name, group in groups:
        group_mean = group.mean()
        ssw += ((group - group_mean) ** 2).sum()
    
    # Total Sum of Squares (SST)
    sst = ssb + ssw
    
    # Degrees of freedom
    df_between = n_groups - 1
    df_within = n_total - n_groups
    df_total = n_total - 1
    
    # Mean Squares
    msb = ssb / df_between
    msw = ssw / df_within
    
    # F-statistic
    f_statistic = msb / msw
    
    # P-value
    p_value = 1 - stats.f.cdf(f_statistic, df_between, df_within)
    
    return {
        'SSB': ssb,
        'SSW': ssw,
        'SST': sst,
        'df_between': df_between,
        'df_within': df_within,
        'MSB': msb,
        'MSW': msw,
        'F_statistic': f_statistic,
        'p_value': p_value
    }

# Calculate ANOVA
anova_results = calculate_anova(data, 'group', 'value')
print("ANOVA Results:")
for key, value in anova_results.items():
    print(f"{key}: {value:.4f}")
\`\`\`

### Using Statistical Libraries
\`\`\`python
# Using scipy.stats
f_stat, p_value = f_oneway(group1, group2, group3)
print(f"\\nScipy Results:")
print(f"F-statistic: {f_stat:.4f}")
print(f"P-value: {p_value:.4f}")

# Using statsmodels
model = ols('value ~ group', data=data).fit()
anova_table = anova_lm(model, typ=2)
print(f"\\nStatsmodels ANOVA Table:")
print(anova_table)

# Effect size (Eta-squared)
eta_squared = anova_results['SSB'] / anova_results['SST']
print(f"\\nEffect size (η²): {eta_squared:.4f}")

# Interpretation
if p_value < 0.05:
    print("\\nResult: Significant difference between groups (p < 0.05)")
else:
    print("\\nResult: No significant difference between groups (p ≥ 0.05)")
\`\`\`

## Post-Hoc Tests

### Multiple Comparisons Problem
\`\`\`python
from statsmodels.stats.multicomp import pairwise_tukeyhsd
from scipy.stats import ttest_ind
import itertools

# The problem: Multiple comparisons increase Type I error
# If we do 3 pairwise t-tests with α = 0.05:
# Overall Type I error = 1 - (0.95)^3 = 0.1426 (14.26%)

# Bonferroni correction
alpha = 0.05
n_comparisons = 3
bonferroni_alpha = alpha / n_comparisons
print(f"Bonferroni corrected α: {bonferroni_alpha:.4f}")

# Tukey's HSD test
tukey_results = pairwise_tukeyhsd(data['value'], data['group'], alpha=0.05)
print(f"\\nTukey's HSD Results:")
print(tukey_results)

# Manual pairwise comparisons with Bonferroni correction
groups = ['Control', 'Treatment A', 'Treatment B']
group_data = [group1, group2, group3]

print(f"\\nPairwise t-tests with Bonferroni correction:")
for i, j in itertools.combinations(range(3), 2):
    t_stat, p_val = ttest_ind(group_data[i], group_data[j])
    corrected_p = p_val * 3  # Bonferroni correction
    significance = "***" if corrected_p < 0.05 else "ns"
    print(f"{groups[i]} vs {groups[j]}: t={t_stat:.3f}, p={p_val:.4f}, "
          f"corrected_p={corrected_p:.4f} {significance}")
\`\`\`

## Two-Way ANOVA

### Factorial Design
\`\`\`python
# Generate data for two-way ANOVA
np.random.seed(42)

# Factors: Treatment (A, B, C) and Gender (Male, Female)
n_per_group = 20

data_2way = []
for treatment in ['A', 'B', 'C']:
    for gender in ['Male', 'Female']:
        # Different means for each combination
        if treatment == 'A':
            mean = 50 if gender == 'Male' else 55
        elif treatment == 'B':
            mean = 60 if gender == 'Male' else 65
        else:  # treatment == 'C'
            mean = 70 if gender == 'Male' else 75
        
        values = np.random.normal(mean, 10, n_per_group)
        for value in values:
            data_2way.append({
                'value': value,
                'treatment': treatment,
                'gender': gender
            })

df_2way = pd.DataFrame(data_2way)

# Visualize the data
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
sns.boxplot(data=df_2way, x='treatment', y='value', hue='gender')
plt.title('Two-Way ANOVA: Treatment × Gender')
plt.ylabel('Value')

plt.subplot(1, 2, 2)
sns.barplot(data=df_2way, x='treatment', y='value', hue='gender', ci=95)
plt.title('Means with 95% Confidence Intervals')
plt.ylabel('Mean Value')

plt.tight_layout()
plt.show()

# Two-way ANOVA
model_2way = ols('value ~ C(treatment) + C(gender) + C(treatment):C(gender)', 
                 data=df_2way).fit()
anova_2way = anova_lm(model_2way, typ=2)

print("Two-Way ANOVA Results:")
print(anova_2way)

# Check for interaction effect
interaction_p = anova_2way.loc['C(treatment):C(gender)', 'PR(>F)']
print(f"\\nInteraction effect p-value: {interaction_p:.4f}")

if interaction_p < 0.05:
    print("Significant interaction between treatment and gender")
    print("The effect of treatment depends on gender")
else:
    print("No significant interaction")
    print("The effect of treatment is consistent across genders")
\`\`\`

## Assumptions and Diagnostics

### Checking ANOVA Assumptions
\`\`\`python
from scipy.stats import shapiro, levene
import statsmodels.stats.diagnostic as diag

def check_anova_assumptions(data, group_col, value_col):
    print("ANOVA Assumptions Check:")
    print("=" * 40)
    
    # 1. Normality within each group
    print("1. Normality Test (Shapiro-Wilk):")
    groups = data.groupby(group_col)[value_col]
    for name, group in groups:
        stat, p_val = shapiro(group)
        result = "Normal" if p_val > 0.05 else "Not Normal"
        print(f"   {name}: W={stat:.4f}, p={p_val:.4f} ({result})")
    
    # 2. Homogeneity of variances (Levene's test)
    print("\\n2. Homogeneity of Variances (Levene's test):")
    group_lists = [group.values for name, group in groups]
    stat, p_val = levene(*group_lists)
    result = "Equal variances" if p_val > 0.05 else "Unequal variances"
    print(f"   Levene statistic: {stat:.4f}, p={p_val:.4f} ({result})")
    
    # 3. Independence (assumed based on study design)
    print("\\n3. Independence: Assumed based on study design")
    
    # 4. Residuals analysis
    print("\\n4. Residuals Analysis:")
    model = ols(f'{value_col} ~ C({group_col})', data=data).fit()
    residuals = model.resid
    
    # Normality of residuals
    stat, p_val = shapiro(residuals)
    result = "Normal" if p_val > 0.05 else "Not Normal"
    print(f"   Residuals normality: W={stat:.4f}, p={p_val:.4f} ({result})")
    
    # Homoscedasticity (constant variance)
    # Breusch-Pagan test
    bp_stat, bp_p, _, _ = diag.het_breuschpagan(model.resid, model.model.exog)
    result = "Constant variance" if bp_p > 0.05 else "Non-constant variance"
    print(f"   Homoscedasticity: χ²={bp_stat:.4f}, p={bp_p:.4f} ({result})")

# Check assumptions for our data
check_anova_assumptions(data, 'group', 'value')
\`\`\`

### Visual Diagnostics
\`\`\`python
# Create diagnostic plots
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 1. Box plots
sns.boxplot(data=data, x='group', y='value', ax=axes[0, 0])
axes[0, 0].set_title('Box Plots by Group')

# 2. Q-Q plot for residuals
model = ols('value ~ group', data=data).fit()
stats.probplot(model.resid, dist="norm", plot=axes[0, 1])
axes[0, 1].set_title('Q-Q Plot of Residuals')

# 3. Residuals vs Fitted
axes[1, 0].scatter(model.fittedvalues, model.resid, alpha=0.6)
axes[1, 0].axhline(y=0, color='r', linestyle='--')
axes[1, 0].set_xlabel('Fitted Values')
axes[1, 0].set_ylabel('Residuals')
axes[1, 0].set_title('Residuals vs Fitted Values')

# 4. Histogram of residuals
axes[1, 1].hist(model.resid, bins=15, alpha=0.7, edgecolor='black')
axes[1, 1].set_xlabel('Residuals')
axes[1, 1].set_ylabel('Frequency')
axes[1, 1].set_title('Distribution of Residuals')

plt.tight_layout()
plt.show()
\`\`\`

## Effect Sizes and Power Analysis

### Effect Size Measures
\`\`\`python
def calculate_effect_sizes(data, group_col, value_col):
    groups = data.groupby(group_col)[value_col]
    n_groups = len(groups)
    n_total = len(data)
    
    # Calculate ANOVA components
    grand_mean = data[value_col].mean()
    
    ssb = 0
    for name, group in groups:
        n_group = len(group)
        group_mean = group.mean()
        ssb += n_group * (group_mean - grand_mean) ** 2
    
    ssw = 0
    for name, group in groups:
        group_mean = group.mean()
        ssw += ((group - group_mean) ** 2).sum()
    
    sst = ssb + ssw
    
    # Eta-squared (η²)
    eta_squared = ssb / sst
    
    # Partial eta-squared (ηp²)
    partial_eta_squared = ssb / (ssb + ssw)
    
    # Omega-squared (ω²) - less biased estimate
    df_between = n_groups - 1
    df_within = n_total - n_groups
    ms_within = ssw / df_within
    omega_squared = (ssb - df_between * ms_within) / (sst + ms_within)
    
    # Cohen's f
    cohens_f = np.sqrt(eta_squared / (1 - eta_squared))
    
    return {
        'eta_squared': eta_squared,
        'partial_eta_squared': partial_eta_squared,
        'omega_squared': omega_squared,
        'cohens_f': cohens_f
    }

# Calculate effect sizes
effect_sizes = calculate_effect_sizes(data, 'group', 'value')
print("Effect Size Measures:")
for measure, value in effect_sizes.items():
    print(f"{measure}: {value:.4f}")

# Interpret effect sizes
eta_sq = effect_sizes['eta_squared']
if eta_sq < 0.01:
    effect_interpretation = "negligible"
elif eta_sq < 0.06:
    effect_interpretation = "small"
elif eta_sq < 0.14:
    effect_interpretation = "medium"
else:
    effect_interpretation = "large"

print(f"\\nEffect size interpretation: {effect_interpretation} (η² = {eta_sq:.4f})")
\`\`\`

## Practical Exercise

Conduct a complete ANOVA analysis:
1. Generate or load data with multiple groups
2. Check ANOVA assumptions
3. Perform one-way ANOVA
4. Calculate effect sizes
5. Conduct post-hoc tests if needed
6. Interpret results
7. Create visualizations

## Summary & Next Steps

ANOVA is a powerful tool for comparing multiple groups. Master these techniques for robust statistical analysis.

**Next up**: Part 6 - Regression analysis and correlation.`,
            readTime: 25,
            publishedAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['ANOVA', 'Multiple Comparisons', 'Effect Size', 'Post-Hoc Tests']
          },
          {
            id: 'statistics-part-6',
            partNumber: 6,
            title: 'Regression Analysis and Correlation',
            summary: 'Master linear regression, correlation analysis, and predictive modeling techniques.',
            content: `# Part 6: Regression Analysis and Correlation

Learn to build predictive models and understand relationships between variables using regression analysis.

## Introduction to Regression

### What is Regression Analysis?
- **Definition**: Statistical method for modeling relationships between variables
- **Purpose**: Predict outcomes and understand variable relationships
- **Types**: Simple linear, multiple linear, polynomial, logistic
- **Applications**: Forecasting, causal inference, pattern recognition

### Correlation vs. Regression
\`\`\`
Key Differences:
1. Correlation
   - Measures strength of relationship
   - Symmetric (X↔Y)
   - No cause-effect implication
   - Range: -1 to +1

2. Regression
   - Models functional relationship
   - Asymmetric (X→Y)
   - Implies causation
   - Predicts Y from X
\`\`\`

## Simple Linear Regression

### Conceptual Framework
\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
import statsmodels.api as sm
from statsmodels.stats.diagnostic import het_breuschpagan

# Generate sample data
np.random.seed(42)
n = 100
x = np.random.normal(50, 15, n)
y = 2 * x + 10 + np.random.normal(0, 20, n)  # y = 2x + 10 + noise

# Create DataFrame
data = pd.DataFrame({'x': x, 'y': y})

# Visualize the relationship
plt.figure(figsize=(10, 6))
plt.scatter(data['x'], data['y'], alpha=0.6)
plt.xlabel('X Variable')
plt.ylabel('Y Variable')
plt.title('Scatter Plot: X vs Y')
plt.grid(True, alpha=0.3)
plt.show()

# Calculate correlation
correlation = data['x'].corr(data['y'])
print(f"Correlation coefficient: {correlation:.4f}")
\`\`\`

### Manual Regression Calculation
\`\`\`python
def simple_linear_regression(x, y):
    """Calculate simple linear regression manually"""
    n = len(x)
    
    # Calculate means
    x_mean = np.mean(x)
    y_mean = np.mean(y)
    
    # Calculate slope (b1)
    numerator = np.sum((x - x_mean) * (y - y_mean))
    denominator = np.sum((x - x_mean) ** 2)
    slope = numerator / denominator
    
    # Calculate intercept (b0)
    intercept = y_mean - slope * x_mean
    
    # Calculate predictions
    y_pred = intercept + slope * x
    
    # Calculate residuals
    residuals = y - y_pred
    
    # Calculate R-squared
    ss_res = np.sum(residuals ** 2)
    ss_tot = np.sum((y - y_mean) ** 2)
    r_squared = 1 - (ss_res / ss_tot)
    
    # Calculate standard errors
    mse = ss_res / (n - 2)
    se_slope = np.sqrt(mse / denominator)
    se_intercept = np.sqrt(mse * (1/n + x_mean**2 / denominator))
    
    return {
        'slope': slope,
        'intercept': intercept,
        'r_squared': r_squared,
        'se_slope': se_slope,
        'se_intercept': se_intercept,
        'predictions': y_pred,
        'residuals': residuals
    }

# Calculate regression manually
regression_results = simple_linear_regression(data['x'], data['y'])
print("Manual Regression Results:")
for key, value in regression_results.items():
    if key not in ['predictions', 'residuals']:
        print(f"{key}: {value:.4f}")
\`\`\`

### Using Statistical Libraries
\`\`\`python
# Using scikit-learn
X = data[['x']]
y = data['y']

model_sklearn = LinearRegression()
model_sklearn.fit(X, y)

print(f"\\nScikit-learn Results:")
print(f"Intercept: {model_sklearn.intercept_:.4f}")
print(f"Slope: {model_sklearn.coef_[0]:.4f}")
print(f"R²: {model_sklearn.score(X, y):.4f}")

# Using statsmodels
X_sm = sm.add_constant(data['x'])
model_sm = sm.OLS(data['y'], X_sm).fit()
print(f"\\nStatsmodels Results:")
print(model_sm.summary())
\`\`\`

## Multiple Linear Regression

### Multiple Predictors
\`\`\`python
# Generate data with multiple predictors
np.random.seed(42)
n = 200

# Create multiple predictors
x1 = np.random.normal(50, 15, n)
x2 = np.random.normal(30, 10, n)
x3 = np.random.normal(20, 5, n)

# Create dependent variable with multiple predictors
y = 1.5 * x1 + 2.0 * x2 - 0.8 * x3 + 25 + np.random.normal(0, 15, n)

# Create DataFrame
data_multi = pd.DataFrame({
    'x1': x1, 'x2': x2, 'x3': x3, 'y': y
})

# Correlation matrix
correlation_matrix = data_multi.corr()
print("Correlation Matrix:")
print(correlation_matrix.round(4))

# Visualize correlations
plt.figure(figsize=(8, 6))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('Correlation Matrix')
plt.show()
\`\`\`

### Multiple Regression Analysis
\`\`\`python
# Multiple regression using statsmodels
X_multi = data_multi[['x1', 'x2', 'x3']]
y_multi = data_multi['y']

# Add constant for intercept
X_multi_sm = sm.add_constant(X_multi)

# Fit the model
model_multi = sm.OLS(y_multi, X_multi_sm).fit()

print("Multiple Regression Results:")
print(model_multi.summary())

# Extract key statistics
print(f"\\nKey Statistics:")
print(f"R-squared: {model_multi.rsquared:.4f}")
print(f"Adjusted R-squared: {model_multi.rsquared_adj:.4f}")
print(f"F-statistic: {model_multi.fvalue:.4f}")
print(f"F p-value: {model_multi.f_pvalue:.4f}")

# Coefficient interpretation
print(f"\\nCoefficient Interpretation:")
for i, var in enumerate(['const', 'x1', 'x2', 'x3']):
    coef = model_multi.params[var]
    p_val = model_multi.pvalues[var]
    significance = "***" if p_val < 0.001 else "**" if p_val < 0.01 else "*" if p_val < 0.05 else ""
    print(f"{var}: {coef:.4f} (p={p_val:.4f}) {significance}")
\`\`\`

## Model Diagnostics

### Assumptions Checking
\`\`\`python
def check_regression_assumptions(model, X, y):
    """Check regression assumptions"""
    print("Regression Assumptions Check:")
    print("=" * 40)
    
    # Get residuals and fitted values
    residuals = model.resid
    fitted_values = model.fittedvalues
    
    # 1. Linearity
    print("1. Linearity: Check residual vs fitted plot")
    
    # 2. Independence (assumed based on study design)
    print("\\n2. Independence: Assumed based on study design")
    
    # 3. Homoscedasticity (constant variance)
    print("\\n3. Homoscedasticity (Breusch-Pagan test):")
    bp_stat, bp_p, _, _ = het_breuschpagan(residuals, X)
    result = "Constant variance" if bp_p > 0.05 else "Non-constant variance"
    print(f"   Breusch-Pagan: χ²={bp_stat:.4f}, p={bp_p:.4f} ({result})")
    
    # 4. Normality of residuals
    print("\\n4. Normality of residuals (Shapiro-Wilk test):")
    from scipy.stats import shapiro
    stat, p_val = shapiro(residuals)
    result = "Normal" if p_val > 0.05 else "Not normal"
    print(f"   Shapiro-Wilk: W={stat:.4f}, p={p_val:.4f} ({result})")
    
    # 5. No multicollinearity (VIF)
    print("\\n5. Multicollinearity (VIF):")
    from statsmodels.stats.outliers_influence import variance_inflation_factor
    vif_data = pd.DataFrame()
    vif_data["Variable"] = X.columns
    vif_data["VIF"] = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]
    print(vif_data)
    
    return residuals, fitted_values

# Check assumptions
residuals, fitted_values = check_regression_assumptions(model_multi, X_multi_sm, y_multi)
\`\`\`

### Diagnostic Plots
\`\`\`python
# Create diagnostic plots
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 1. Residuals vs Fitted
axes[0, 0].scatter(fitted_values, residuals, alpha=0.6)
axes[0, 0].axhline(y=0, color='r', linestyle='--')
axes[0, 0].set_xlabel('Fitted Values')
axes[0, 0].set_ylabel('Residuals')
axes[0, 0].set_title('Residuals vs Fitted Values')

# 2. Q-Q plot
from scipy import stats
stats.probplot(residuals, dist="norm", plot=axes[0, 1])
axes[0, 1].set_title('Q-Q Plot of Residuals')

# 3. Scale-Location plot
sqrt_std_resid = np.sqrt(np.abs(residuals))
axes[1, 0].scatter(fitted_values, sqrt_std_resid, alpha=0.6)
axes[1, 0].set_xlabel('Fitted Values')
axes[1, 0].set_ylabel('√|Standardized Residuals|')
axes[1, 0].set_title('Scale-Location Plot')

# 4. Residuals vs Leverage
from statsmodels.stats.outliers_influence import OLSInfluence
influence = OLSInfluence(model_multi)
leverage = influence.hat_matrix_diag
axes[1, 1].scatter(leverage, residuals, alpha=0.6)
axes[1, 1].set_xlabel('Leverage')
axes[1, 1].set_ylabel('Residuals')
axes[1, 1].set_title('Residuals vs Leverage')

plt.tight_layout()
plt.show()
\`\`\`

## Model Selection and Validation

### Feature Selection
\`\`\`python
from sklearn.feature_selection import f_regression, SelectKBest
from sklearn.model_selection import cross_val_score

# Feature selection using F-test
f_scores, p_values = f_regression(X_multi, y_multi)
feature_scores = pd.DataFrame({
    'Feature': X_multi.columns,
    'F_Score': f_scores,
    'P_Value': p_values
}).sort_values('F_Score', ascending=False)

print("Feature Selection Results:")
print(feature_scores)

# Select best features
selector = SelectKBest(score_func=f_regression, k=2)
X_selected = selector.fit_transform(X_multi, y_multi)
selected_features = X_multi.columns[selector.get_support()]

print(f"\\nSelected features: {list(selected_features)}")

# Compare models
models_comparison = {}

# Full model
model_full = LinearRegression()
scores_full = cross_val_score(model_full, X_multi, y_multi, cv=5, scoring='r2')
models_comparison['Full Model'] = scores_full.mean()

# Selected features model
model_selected = LinearRegression()
scores_selected = cross_val_score(model_selected, X_selected, y_multi, cv=5, scoring='r2')
models_comparison['Selected Features'] = scores_selected.mean()

print(f"\\nModel Comparison (Cross-validated R²):")
for model_name, score in models_comparison.items():
    print(f"{model_name}: {score:.4f}")
\`\`\`

### Cross-Validation
\`\`\`python
from sklearn.model_selection import cross_val_score, KFold
from sklearn.metrics import make_scorer

# Define custom scoring functions
def rmse_scorer(y_true, y_pred):
    return np.sqrt(mean_squared_error(y_true, y_pred))

# Cross-validation with different metrics
cv = KFold(n_splits=5, shuffle=True, random_state=42)

# R² scores
r2_scores = cross_val_score(model_multi, X_multi, y_multi, cv=cv, scoring='r2')
print(f"R² scores: {r2_scores}")
print(f"Mean R²: {r2_scores.mean():.4f} (+/- {r2_scores.std() * 2:.4f})")

# RMSE scores
rmse_scores = cross_val_score(model_multi, X_multi, y_multi, cv=cv, 
                             scoring=make_scorer(rmse_scorer))
print(f"\\nRMSE scores: {rmse_scores}")
print(f"Mean RMSE: {rmse_scores.mean():.4f} (+/- {rmse_scores.std() * 2:.4f})")

# MAE scores
mae_scores = cross_val_score(model_multi, X_multi, y_multi, cv=cv, scoring='neg_mean_absolute_error')
mae_scores = -mae_scores  # Convert back to positive
print(f"\\nMAE scores: {mae_scores}")
print(f"Mean MAE: {mae_scores.mean():.4f} (+/- {mae_scores.std() * 2:.4f})")
\`\`\`

## Advanced Regression Techniques

### Polynomial Regression
\`\`\`python
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import Pipeline

# Generate non-linear data
np.random.seed(42)
x_poly = np.linspace(-3, 3, 100)
y_poly = 0.5 * x_poly**2 + 2 * x_poly + 1 + np.random.normal(0, 0.5, 100)

# Fit polynomial regression
poly_features = PolynomialFeatures(degree=2)
x_poly_features = poly_features.fit_transform(x_poly.reshape(-1, 1))

model_poly = LinearRegression()
model_poly.fit(x_poly_features, y_poly)

# Predictions
x_pred = np.linspace(-3, 3, 1000)
x_pred_features = poly_features.transform(x_pred.reshape(-1, 1))
y_pred_poly = model_poly.predict(x_pred_features)

# Visualize
plt.figure(figsize=(10, 6))
plt.scatter(x_poly, y_poly, alpha=0.6, label='Data')
plt.plot(x_pred, y_pred_poly, 'r-', label='Polynomial Fit')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Polynomial Regression')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

print(f"Polynomial R²: {model_poly.score(x_poly_features, y_poly):.4f}")
\`\`\`

### Regularization Techniques
\`\`\`python
from sklearn.linear_model import Ridge, Lasso, ElasticNet
from sklearn.preprocessing import StandardScaler

# Generate data with multicollinearity
np.random.seed(42)
n = 100
X_reg = np.random.normal(0, 1, (n, 5))
# Create multicollinearity
X_reg[:, 1] = X_reg[:, 0] + np.random.normal(0, 0.1, n)
X_reg[:, 2] = X_reg[:, 0] + np.random.normal(0, 0.1, n)

y_reg = 2 * X_reg[:, 0] + 1.5 * X_reg[:, 1] + np.random.normal(0, 0.5, n)

# Standardize features
scaler = StandardScaler()
X_reg_scaled = scaler.fit_transform(X_reg)

# Compare different regularization methods
models = {
    'OLS': LinearRegression(),
    'Ridge': Ridge(alpha=1.0),
    'Lasso': Lasso(alpha=0.1),
    'ElasticNet': ElasticNet(alpha=0.1, l1_ratio=0.5)
}

results = {}
for name, model in models.items():
    model.fit(X_reg_scaled, y_reg)
    r2 = model.score(X_reg_scaled, y_reg)
    results[name] = {
        'R²': r2,
        'Coefficients': model.coef_
    }

# Display results
print("Regularization Comparison:")
for name, result in results.items():
    print(f"\\n{name}:")
    print(f"  R²: {result['R²']:.4f}")
    print(f"  Coefficients: {result['Coefficients']}")
\`\`\`

## Practical Exercise

Build a complete regression analysis:
1. Load or generate data with multiple variables
2. Explore correlations and relationships
3. Fit simple and multiple regression models
4. Check model assumptions
5. Perform feature selection
6. Validate model performance
7. Interpret results and make predictions

## Summary & Next Steps

Regression analysis is fundamental for predictive modeling. Master these techniques for data-driven decision making.

**Next up**: Part 7 - Non-parametric statistics and robust methods.`,
            readTime: 30,
            publishedAt: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Regression Analysis', 'Correlation', 'Model Diagnostics', 'Feature Selection']
          },
          {
            id: 'statistics-part-7',
            partNumber: 7,
            title: 'Non-Parametric Statistics and Robust Methods',
            summary: 'Learn non-parametric alternatives when data doesn\'t meet parametric assumptions.',
            content: `# Part 7: Non-Parametric Statistics and Robust Methods

Master non-parametric statistical methods for data that doesn't meet traditional assumptions.

## Introduction to Non-Parametric Statistics

### When to Use Non-Parametric Methods
- **Non-normal distributions**: Data doesn't follow normal distribution
- **Small sample sizes**: Insufficient data for parametric tests
- **Ordinal data**: Rankings or categorical data
- **Outliers present**: Extreme values affect parametric tests
- **Unknown distribution**: Distribution shape is unclear

### Advantages and Disadvantages
\`\`\`
Advantages:
- Fewer assumptions required
- Robust to outliers
- Work with ordinal data
- Applicable to small samples

Disadvantages:
- Less powerful when assumptions are met
- Limited to hypothesis testing
- Less informative about effect sizes
- More complex interpretation
\`\`\`

## Rank-Based Tests

### Mann-Whitney U Test (Wilcoxon Rank-Sum)
\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from scipy.stats import mannwhitneyu, wilcoxon, kruskal, friedmanchisquare
import statsmodels.stats.nonparametric as nonparam

# Generate non-normal data
np.random.seed(42)

# Group 1: Exponential distribution
group1 = np.random.exponential(2, 30)

# Group 2: Different exponential distribution
group2 = np.random.exponential(3, 30)

# Visualize distributions
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.hist(group1, alpha=0.7, label='Group 1', bins=15)
plt.hist(group2, alpha=0.7, label='Group 2', bins=15)
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.title('Distribution of Groups')
plt.legend()

plt.subplot(1, 2, 2)
sns.boxplot(data=pd.DataFrame({
    'Group 1': group1,
    'Group 2': group2
}).melt(), x='variable', y='value')
plt.title('Box Plots by Group')

plt.tight_layout()
plt.show()

# Mann-Whitney U test
statistic, p_value = mannwhitneyu(group1, group2, alternative='two-sided')
print(f"Mann-Whitney U Test:")
print(f"Statistic: {statistic:.4f}")
print(f"P-value: {p_value:.4f}")

# Effect size (r)
n1, n2 = len(group1), len(group2)
r = 1 - (2 * statistic) / (n1 * n2)
print(f"Effect size (r): {r:.4f}")

# Interpretation
if p_value < 0.05:
    print("Result: Significant difference between groups")
else:
    print("Result: No significant difference between groups")
\`\`\`

### Wilcoxon Signed-Rank Test
\`\`\`python
# Generate paired data (before/after treatment)
np.random.seed(42)
n = 25

# Before treatment
before = np.random.normal(50, 10, n)

# After treatment (with improvement)
after = before + np.random.normal(5, 3, n)  # Average improvement of 5

# Create DataFrame
paired_data = pd.DataFrame({
    'Before': before,
    'After': after,
    'Difference': after - before
})

print("Paired Data Sample:")
print(paired_data.head())

# Visualize paired data
plt.figure(figsize=(12, 4))

plt.subplot(1, 3, 1)
plt.scatter(paired_data['Before'], paired_data['After'], alpha=0.6)
plt.plot([paired_data['Before'].min(), paired_data['Before'].max()], 
         [paired_data['Before'].min(), paired_data['Before'].max()], 'r--')
plt.xlabel('Before Treatment')
plt.ylabel('After Treatment')
plt.title('Before vs After Treatment')

plt.subplot(1, 3, 2)
plt.hist(paired_data['Difference'], bins=10, alpha=0.7)
plt.xlabel('Difference (After - Before)')
plt.ylabel('Frequency')
plt.title('Distribution of Differences')

plt.subplot(1, 3, 3)
sns.boxplot(data=paired_data[['Before', 'After']].melt(), x='variable', y='value')
plt.title('Box Plots: Before vs After')

plt.tight_layout()
plt.show()

# Wilcoxon signed-rank test
statistic, p_value = wilcoxon(paired_data['Before'], paired_data['After'])
print(f"\\nWilcoxon Signed-Rank Test:")
print(f"Statistic: {statistic:.4f}")
print(f"P-value: {p_value:.4f}")

# Effect size
z_score = stats.norm.ppf(p_value/2)
n = len(paired_data)
r = abs(z_score) / np.sqrt(n)
print(f"Effect size (r): {r:.4f}")
\`\`\`

## Multiple Group Comparisons

### Kruskal-Wallis Test
\`\`\`python
# Generate data for three groups
np.random.seed(42)

# Group 1: Normal distribution
group1 = np.random.normal(50, 10, 30)

# Group 2: Different mean
group2 = np.random.normal(60, 10, 30)

# Group 3: Different distribution (exponential)
group3 = np.random.exponential(2, 30) * 20 + 40

# Combine data
data_kw = pd.DataFrame({
    'value': np.concatenate([group1, group2, group3]),
    'group': ['Group 1'] * 30 + ['Group 2'] * 30 + ['Group 3'] * 30
})

# Visualize
plt.figure(figsize=(10, 6))
sns.boxplot(data=data_kw, x='group', y='value')
plt.title('Kruskal-Wallis Test: Three Groups')
plt.ylabel('Value')
plt.show()

# Kruskal-Wallis test
statistic, p_value = kruskal(group1, group2, group3)
print(f"Kruskal-Wallis Test:")
print(f"H-statistic: {statistic:.4f}")
print(f"P-value: {p_value:.4f}")

# Post-hoc pairwise comparisons
from scipy.stats import mannwhitneyu
from itertools import combinations

groups = [group1, group2, group3]
group_names = ['Group 1', 'Group 2', 'Group 3']

print(f"\\nPost-hoc Pairwise Comparisons (Mann-Whitney U):")
for i, j in combinations(range(3), 2):
    stat, p_val = mannwhitneyu(groups[i], groups[j], alternative='two-sided')
    # Bonferroni correction
    corrected_p = p_val * 3
    significance = "***" if corrected_p < 0.05 else "ns"
    print(f"{group_names[i]} vs {group_names[j]}: U={stat:.1f}, p={p_val:.4f}, "
          f"corrected_p={corrected_p:.4f} {significance}")
\`\`\`

### Friedman Test (Repeated Measures)
\`\`\`python
# Generate repeated measures data
np.random.seed(42)
n_subjects = 20
n_conditions = 4

# Create data with subject effects and condition effects
data_friedman = []
for subject in range(n_subjects):
    subject_effect = np.random.normal(0, 5)  # Random subject effect
    for condition in range(n_conditions):
        condition_effect = condition * 2 + np.random.normal(0, 1)
        value = 50 + subject_effect + condition_effect
        data_friedman.append({
            'subject': subject,
            'condition': condition,
            'value': value
        })

df_friedman = pd.DataFrame(data_friedman)

# Pivot for Friedman test
pivot_data = df_friedman.pivot(index='subject', columns='condition', values='value')

# Visualize
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
sns.boxplot(data=df_friedman, x='condition', y='value')
plt.title('Friedman Test: Repeated Measures')
plt.xlabel('Condition')
plt.ylabel('Value')

plt.subplot(1, 2, 2)
# Plot individual subject trajectories
for subject in range(min(10, n_subjects)):  # Show first 10 subjects
    subject_data = df_friedman[df_friedman['subject'] == subject]
    plt.plot(subject_data['condition'], subject_data['value'], 'o-', alpha=0.6)
plt.xlabel('Condition')
plt.ylabel('Value')
plt.title('Individual Subject Trajectories')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Friedman test
statistic, p_value = friedmanchisquare(*[pivot_data[col].values for col in pivot_data.columns])
print(f"\\nFriedman Test:")
print(f"Chi-square statistic: {statistic:.4f}")
print(f"P-value: {p_value:.4f}")

# Post-hoc pairwise comparisons (Wilcoxon signed-rank)
print(f"\\nPost-hoc Pairwise Comparisons (Wilcoxon signed-rank):")
for i, j in combinations(range(n_conditions), 2):
    stat, p_val = wilcoxon(pivot_data[i], pivot_data[j])
    # Bonferroni correction
    corrected_p = p_val * 6  # 6 pairwise comparisons
    significance = "***" if corrected_p < 0.05 else "ns"
    print(f"Condition {i} vs Condition {j}: W={stat:.1f}, p={p_val:.4f}, "
          f"corrected_p={corrected_p:.4f} {significance}")
\`\`\`

## Correlation and Association

### Spearman Rank Correlation
\`\`\`python
# Generate non-linear relationship
np.random.seed(42)
n = 100
x = np.random.uniform(0, 10, n)
y = x**2 + np.random.normal(0, 5, n)  # Quadratic relationship

# Create DataFrame
data_corr = pd.DataFrame({'x': x, 'y': y})

# Visualize relationship
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.scatter(data_corr['x'], data_corr['y'], alpha=0.6)
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Non-linear Relationship')
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
# Rank the data
data_corr['x_rank'] = data_corr['x'].rank()
data_corr['y_rank'] = data_corr['y'].rank()
plt.scatter(data_corr['x_rank'], data_corr['y_rank'], alpha=0.6)
plt.xlabel('X Rank')
plt.ylabel('Y Rank')
plt.title('Ranked Data')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Calculate correlations
pearson_corr, pearson_p = stats.pearsonr(data_corr['x'], data_corr['y'])
spearman_corr, spearman_p = stats.spearmanr(data_corr['x'], data_corr['y'])
kendall_corr, kendall_p = stats.kendalltau(data_corr['x'], data_corr['y'])

print("Correlation Analysis:")
print(f"Pearson correlation: r={pearson_corr:.4f}, p={pearson_p:.4f}")
print(f"Spearman correlation: ρ={spearman_corr:.4f}, p={spearman_p:.4f}")
print(f"Kendall's tau: τ={kendall_corr:.4f}, p={kendall_p:.4f}")

# Interpretation
print(f"\\nInterpretation:")
print(f"Pearson: Assumes linear relationship - may miss non-linear patterns")
print(f"Spearman: Captures monotonic relationships - more robust")
print(f"Kendall: Alternative rank correlation - less sensitive to outliers")
\`\`\`

### Chi-Square Tests
\`\`\`python
from scipy.stats import chi2_contingency, chi2

# Generate categorical data
np.random.seed(42)

# Create contingency table
# Treatment vs Outcome
data_chi = pd.DataFrame({
    'Treatment': ['Drug A'] * 50 + ['Drug B'] * 50 + ['Placebo'] * 50,
    'Outcome': ['Success'] * 35 + ['Failure'] * 15 +  # Drug A
               ['Success'] * 40 + ['Failure'] * 10 +  # Drug B
               ['Success'] * 20 + ['Failure'] * 30    # Placebo
})

# Create contingency table
contingency_table = pd.crosstab(data_chi['Treatment'], data_chi['Outcome'])
print("Contingency Table:")
print(contingency_table)

# Visualize
plt.figure(figsize=(10, 6))
sns.heatmap(contingency_table, annot=True, fmt='d', cmap='Blues')
plt.title('Treatment vs Outcome Contingency Table')
plt.show()

# Chi-square test of independence
chi2_stat, p_value, dof, expected = chi2_contingency(contingency_table)

print(f"\\nChi-square Test of Independence:")
print(f"Chi-square statistic: {chi2_stat:.4f}")
print(f"P-value: {p_value:.4f}")
print(f"Degrees of freedom: {dof}")

# Expected frequencies
print(f"\\nExpected Frequencies:")
expected_df = pd.DataFrame(expected, 
                          index=contingency_table.index, 
                          columns=contingency_table.columns)
print(expected_df.round(2))

# Effect size (Cramer's V)
n = contingency_table.sum().sum()
cramers_v = np.sqrt(chi2_stat / (n * (min(contingency_table.shape) - 1)))
print(f"\\nCramer's V (effect size): {cramers_v:.4f}")

# Interpretation
if p_value < 0.05:
    print("Result: Significant association between treatment and outcome")
else:
    print("Result: No significant association between treatment and outcome")
\`\`\`

## Robust Statistical Methods

### Robust Measures of Central Tendency
\`\`\`python
from scipy.stats import trim_mean, gmean, hmean

# Generate data with outliers
np.random.seed(42)
normal_data = np.random.normal(50, 10, 100)
outliers = np.array([150, 160, 170, 180, 190])  # Extreme outliers
data_with_outliers = np.concatenate([normal_data, outliers])

# Calculate different measures of central tendency
measures = {
    'Mean': np.mean(data_with_outliers),
    'Median': np.median(data_with_outliers),
    'Trimmed Mean (10%)': trim_mean(data_with_outliers, 0.1),
    'Trimmed Mean (20%)': trim_mean(data_with_outliers, 0.2),
    'Geometric Mean': gmean(data_with_outliers[data_with_outliers > 0]),
    'Harmonic Mean': hmean(data_with_outliers[data_with_outliers > 0])
}

print("Measures of Central Tendency:")
for measure, value in measures.items():
    print(f"{measure}: {value:.4f}")

# Visualize impact of outliers
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.hist(normal_data, bins=20, alpha=0.7, label='Normal Data')
plt.hist(outliers, bins=5, alpha=0.7, label='Outliers', color='red')
plt.axvline(np.mean(normal_data), color='blue', linestyle='--', label='Mean (normal)')
plt.axvline(np.mean(data_with_outliers), color='red', linestyle='--', label='Mean (with outliers)')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.title('Impact of Outliers on Mean')
plt.legend()

plt.subplot(1, 2, 2)
plt.boxplot([normal_data, data_with_outliers], labels=['Normal', 'With Outliers'])
plt.ylabel('Value')
plt.title('Box Plots: Impact of Outliers')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

### Robust Measures of Dispersion
\`\`\`python
from scipy.stats import iqr, mad

# Calculate different measures of dispersion
dispersion_measures = {
    'Standard Deviation': np.std(data_with_outliers),
    'Variance': np.var(data_with_outliers),
    'Range': np.ptp(data_with_outliers),
    'IQR': iqr(data_with_outliers),
    'MAD (Median Absolute Deviation)': mad(data_with_outliers),
    'Robust Standard Deviation': 1.4826 * mad(data_with_outliers)  # Scaled MAD
}

print("\\nMeasures of Dispersion:")
for measure, value in dispersion_measures.items():
    print(f"{measure}: {value:.4f}")

# Compare with and without outliers
print(f"\\nComparison:")
print(f"Standard deviation (normal): {np.std(normal_data):.4f}")
print(f"Standard deviation (with outliers): {np.std(data_with_outliers):.4f}")
print(f"Robust std (MAD-based): {1.4826 * mad(data_with_outliers):.4f}")
\`\`\`

## Practical Exercise

Apply non-parametric methods:
1. Generate or load non-normal data
2. Test normality assumptions
3. Apply appropriate non-parametric tests
4. Compare with parametric alternatives
5. Calculate effect sizes
6. Interpret results
7. Document findings

## Summary & Next Steps

Non-parametric methods provide robust alternatives when data doesn't meet parametric assumptions. Master these techniques for reliable statistical analysis.

**Next up**: Part 8 - Time series analysis and forecasting.`,
            readTime: 28,
            publishedAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Non-Parametric Tests', 'Rank-Based Methods', 'Robust Statistics', 'Chi-Square Tests']
          },
          {
            id: 'statistics-part-8',
            partNumber: 8,
            title: 'Time Series Analysis and Forecasting',
            summary: 'Master time series analysis, trend detection, and forecasting methods.',
            content: `# Part 8: Time Series Analysis and Forecasting

Learn to analyze temporal data patterns and build forecasting models for business and scientific applications.

## Introduction to Time Series

### What is Time Series Analysis?
- **Definition**: Statistical analysis of data points collected over time
- **Components**: Trend, seasonality, cyclical patterns, noise
- **Applications**: Sales forecasting, stock prices, weather prediction, economic indicators
- **Challenges**: Non-stationarity, autocorrelation, missing data

### Time Series Components
\`\`\`
Decomposition:
1. Trend (T): Long-term direction
2. Seasonality (S): Regular patterns within a year
3. Cyclical (C): Irregular patterns over longer periods
4. Noise (E): Random variation

Additive: Y(t) = T(t) + S(t) + C(t) + E(t)
Multiplicative: Y(t) = T(t) × S(t) × C(t) × E(t)
\`\`\`

## Time Series Visualization and Exploration

### Basic Time Series Plotting
\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

# Generate sample time series data
np.random.seed(42)
dates = pd.date_range(start='2020-01-01', end='2023-12-31', freq='D')

# Create time series with trend, seasonality, and noise
n = len(dates)
trend = np.linspace(100, 200, n)  # Linear trend
seasonality = 10 * np.sin(2 * np.pi * np.arange(n) / 365.25)  # Annual seasonality
noise = np.random.normal(0, 5, n)  # Random noise

# Combine components
ts_data = trend + seasonality + noise

# Create DataFrame
ts_df = pd.DataFrame({
    'date': dates,
    'value': ts_data
})

# Set date as index
ts_df.set_index('date', inplace=True)

# Basic time series plot
plt.figure(figsize=(12, 6))
plt.plot(ts_df.index, ts_df['value'], linewidth=1)
plt.title('Time Series Data with Trend and Seasonality')
plt.xlabel('Date')
plt.ylabel('Value')
plt.grid(True, alpha=0.3)
plt.show()

# Plot components separately
fig, axes = plt.subplots(2, 2, figsize=(15, 10))

# Original time series
axes[0, 0].plot(ts_df.index, ts_df['value'])
axes[0, 0].set_title('Original Time Series')
axes[0, 0].grid(True, alpha=0.3)

# Trend component
axes[0, 1].plot(ts_df.index, trend)
axes[0, 1].set_title('Trend Component')
axes[0, 1].grid(True, alpha=0.3)

# Seasonality component
axes[1, 0].plot(ts_df.index, seasonality)
axes[1, 0].set_title('Seasonality Component')
axes[1, 0].grid(True, alpha=0.3)

# Noise component
axes[1, 1].plot(ts_df.index, noise)
axes[1, 1].set_title('Noise Component')
axes[1, 1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

### Time Series Decomposition
\`\`\`python
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller

# Perform seasonal decomposition
decomposition = seasonal_decompose(ts_df['value'], model='additive', period=365)

# Plot decomposition
fig, axes = plt.subplots(4, 1, figsize=(15, 12))

decomposition.observed.plot(ax=axes[0], title='Original')
decomposition.trend.plot(ax=axes[1], title='Trend')
decomposition.seasonal.plot(ax=axes[2], title='Seasonal')
decomposition.resid.plot(ax=axes[3], title='Residual')

for ax in axes:
    ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Stationarity test (Augmented Dickey-Fuller test)
def test_stationarity(timeseries):
    """Test for stationarity using ADF test"""
    result = adfuller(timeseries.dropna())
    print('ADF Statistic:', result[0])
    print('p-value:', result[1])
    print('Critical Values:')
    for key, value in result[4].items():
        print(f'\\t{key}: {value:.3f}')
    
    if result[1] <= 0.05:
        print("Series is stationary (reject null hypothesis)")
    else:
        print("Series is non-stationary (fail to reject null hypothesis)")

print("Stationarity Test for Original Series:")
test_stationarity(ts_df['value'])

print("\\nStationarity Test for Trend Component:")
test_stationarity(decomposition.trend)
\`\`\`

## Moving Averages and Smoothing

### Simple and Exponential Moving Averages
\`\`\`python
# Calculate different types of moving averages
ts_df['MA_7'] = ts_df['value'].rolling(window=7).mean()
ts_df['MA_30'] = ts_df['value'].rolling(window=30).mean()
ts_df['MA_90'] = ts_df['value'].rolling(window=90).mean()

# Exponential moving averages
ts_df['EMA_7'] = ts_df['value'].ewm(span=7).mean()
ts_df['EMA_30'] = ts_df['value'].ewm(span=30).mean()

# Plot moving averages
plt.figure(figsize=(15, 8))
plt.plot(ts_df.index, ts_df['value'], alpha=0.3, label='Original', linewidth=1)
plt.plot(ts_df.index, ts_df['MA_7'], label='MA(7)', linewidth=2)
plt.plot(ts_df.index, ts_df['MA_30'], label='MA(30)', linewidth=2)
plt.plot(ts_df.index, ts_df['MA_90'], label='MA(90)', linewidth=2)
plt.plot(ts_df.index, ts_df['EMA_7'], label='EMA(7)', linewidth=2)
plt.plot(ts_df.index, ts_df['EMA_30'], label='EMA(30)', linewidth=2)

plt.title('Moving Averages Comparison')
plt.xlabel('Date')
plt.ylabel('Value')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

# Calculate and plot volatility (rolling standard deviation)
ts_df['volatility_30'] = ts_df['value'].rolling(window=30).std()

plt.figure(figsize=(12, 6))
plt.subplot(2, 1, 1)
plt.plot(ts_df.index, ts_df['value'])
plt.title('Original Time Series')
plt.ylabel('Value')
plt.grid(True, alpha=0.3)

plt.subplot(2, 1, 2)
plt.plot(ts_df.index, ts_df['volatility_30'])
plt.title('30-Day Rolling Volatility')
plt.xlabel('Date')
plt.ylabel('Volatility')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Autocorrelation and Partial Autocorrelation

### ACF and PACF Analysis
\`\`\`python
from statsmodels.tsa.stattools import acf, pacf
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf

# Calculate ACF and PACF
lags = 40
acf_values = acf(ts_df['value'].dropna(), nlags=lags)
pacf_values = pacf(ts_df['value'].dropna(), nlags=lags)

# Plot ACF and PACF
fig, axes = plt.subplots(2, 1, figsize=(12, 8))

plot_acf(ts_df['value'].dropna(), lags=lags, ax=axes[0])
axes[0].set_title('Autocorrelation Function (ACF)')

plot_pacf(ts_df['value'].dropna(), lags=lags, ax=axes[1])
axes[1].set_title('Partial Autocorrelation Function (PACF)')

plt.tight_layout()
plt.show()

# Analyze autocorrelation patterns
print("ACF Analysis:")
print(f"ACF at lag 1: {acf_values[1]:.4f}")
print(f"ACF at lag 7: {acf_values[7]:.4f}")
print(f"ACF at lag 30: {acf_values[30]:.4f}")

print("\\nPACF Analysis:")
print(f"PACF at lag 1: {pacf_values[1]:.4f}")
print(f"PACF at lag 2: {pacf_values[2]:.4f}")
print(f"PACF at lag 3: {pacf_values[3]:.4f}")

# Check for significant autocorrelation
significant_lags_acf = np.where(np.abs(acf_values) > 1.96/np.sqrt(len(ts_df)))[0]
significant_lags_pacf = np.where(np.abs(pacf_values) > 1.96/np.sqrt(len(ts_df)))[0]

print(f"\\nSignificant ACF lags: {significant_lags_acf}")
print(f"Significant PACF lags: {significant_lags_pacf}")
\`\`\`

## ARIMA Models

### ARIMA Model Building
\`\`\`python
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.metrics import mean_squared_error, mean_absolute_error

# Split data into train and test sets
split_date = '2023-06-01'
train_data = ts_df[ts_df.index < split_date]['value']
test_data = ts_df[ts_df.index >= split_date]['value']

print(f"Training data: {len(train_data)} observations")
print(f"Test data: {len(test_data)} observations")

# Fit ARIMA model
# Start with simple ARIMA(1,1,1)
model_arima = ARIMA(train_data, order=(1, 1, 1))
fitted_model = model_arima.fit()

print("\\nARIMA Model Summary:")
print(fitted_model.summary())

# Make predictions
forecast_steps = len(test_data)
forecast = fitted_model.forecast(steps=forecast_steps)
forecast_ci = fitted_model.get_forecast(steps=forecast_steps).conf_int()

# Calculate forecast accuracy
mse = mean_squared_error(test_data, forecast)
mae = mean_absolute_error(test_data, forecast)
rmse = np.sqrt(mse)

print(f"\\nForecast Accuracy:")
print(f"RMSE: {rmse:.4f}")
print(f"MAE: {mae:.4f}")

# Plot forecasts
plt.figure(figsize=(15, 8))
plt.plot(train_data.index, train_data.values, label='Training Data', linewidth=1)
plt.plot(test_data.index, test_data.values, label='Actual Test Data', linewidth=1)
plt.plot(test_data.index, forecast, label='ARIMA Forecast', linewidth=2)
plt.fill_between(test_data.index, 
                forecast_ci.iloc[:, 0], 
                forecast_ci.iloc[:, 1], 
                alpha=0.3, label='95% Confidence Interval')

plt.title('ARIMA Model Forecast')
plt.xlabel('Date')
plt.ylabel('Value')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

### Model Selection and Validation
\`\`\`python
from statsmodels.tsa.arima.model import ARIMA
import itertools

def evaluate_arima_model(data, order):
    """Evaluate ARIMA model with given order"""
    try:
        model = ARIMA(data, order=order)
        fitted_model = model.fit()
        aic = fitted_model.aic
        bic = fitted_model.bic
        return aic, bic, fitted_model
    except:
        return None, None, None

# Grid search for best ARIMA parameters
p_values = range(0, 3)
d_values = range(0, 2)
q_values = range(0, 3)

best_aic = float('inf')
best_bic = float('inf')
best_order = None
best_model = None

print("ARIMA Model Selection:")
print("Order\\tAIC\\t\\tBIC")
print("-" * 30)

for p, d, q in itertools.product(p_values, d_values, q_values):
    aic, bic, model = evaluate_arima_model(train_data, (p, d, q))
    if aic is not None:
        print(f"({p},{d},{q})\\t{aic:.2f}\\t\\t{bic:.2f}")
        if aic < best_aic:
            best_aic = aic
            best_order = (p, d, q)
            best_model = model

print(f"\\nBest ARIMA order: {best_order}")
print(f"Best AIC: {best_aic:.2f}")

# Fit best model and make predictions
if best_model is not None:
    forecast_best = best_model.forecast(steps=forecast_steps)
    forecast_ci_best = best_model.get_forecast(steps=forecast_steps).conf_int()
    
    # Calculate accuracy for best model
    mse_best = mean_squared_error(test_data, forecast_best)
    mae_best = mean_absolute_error(test_data, forecast_best)
    rmse_best = np.sqrt(mse_best)
    
    print(f"\\nBest Model Forecast Accuracy:")
    print(f"RMSE: {rmse_best:.4f}")
    print(f"MAE: {mae_best:.4f}")
    
    # Plot best model forecasts
    plt.figure(figsize=(15, 8))
    plt.plot(train_data.index, train_data.values, label='Training Data', linewidth=1)
    plt.plot(test_data.index, test_data.values, label='Actual Test Data', linewidth=1)
    plt.plot(test_data.index, forecast_best, label=f'ARIMA{best_order} Forecast', linewidth=2)
    plt.fill_between(test_data.index, 
                    forecast_ci_best.iloc[:, 0], 
                    forecast_ci_best.iloc[:, 1], 
                    alpha=0.3, label='95% Confidence Interval')
    
    plt.title(f'Best ARIMA{best_order} Model Forecast')
    plt.xlabel('Date')
    plt.ylabel('Value')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.show()
\`\`\`

## Seasonal ARIMA (SARIMA)

### SARIMA Model Implementation
\`\`\`python
# Fit SARIMA model to capture seasonality
# SARIMA(p,d,q)(P,D,Q,s) where s is the seasonal period
sarima_model = SARIMAX(train_data, 
                      order=(1, 1, 1), 
                      seasonal_order=(1, 1, 1, 365))  # Annual seasonality

fitted_sarima = sarima_model.fit(disp=False)

print("SARIMA Model Summary:")
print(fitted_sarima.summary())

# Make SARIMA predictions
sarima_forecast = fitted_sarima.forecast(steps=forecast_steps)
sarima_forecast_ci = fitted_sarima.get_forecast(steps=forecast_steps).conf_int()

# Calculate SARIMA accuracy
mse_sarima = mean_squared_error(test_data, sarima_forecast)
mae_sarima = mean_absolute_error(test_data, sarima_forecast)
rmse_sarima = np.sqrt(mse_sarima)

print(f"\\nSARIMA Forecast Accuracy:")
print(f"RMSE: {rmse_sarima:.4f}")
print(f"MAE: {mae_sarima:.4f}")

# Compare models
models_comparison = pd.DataFrame({
    'Model': ['ARIMA(1,1,1)', f'ARIMA{best_order}', 'SARIMA(1,1,1)(1,1,1,365)'],
    'RMSE': [rmse, rmse_best, rmse_sarima],
    'MAE': [mae, mae_best, mae_sarima]
})

print("\\nModel Comparison:")
print(models_comparison)

# Plot SARIMA forecasts
plt.figure(figsize=(15, 8))
plt.plot(train_data.index, train_data.values, label='Training Data', linewidth=1)
plt.plot(test_data.index, test_data.values, label='Actual Test Data', linewidth=1)
plt.plot(test_data.index, sarima_forecast, label='SARIMA Forecast', linewidth=2)
plt.fill_between(test_data.index, 
                sarima_forecast_ci.iloc[:, 0], 
                sarima_forecast_ci.iloc[:, 1], 
                alpha=0.3, label='95% Confidence Interval')

plt.title('SARIMA Model Forecast')
plt.xlabel('Date')
plt.ylabel('Value')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

## Advanced Forecasting Methods

### Exponential Smoothing
\`\`\`python
from statsmodels.tsa.holtwinters import ExponentialSmoothing

# Simple Exponential Smoothing
ses_model = ExponentialSmoothing(train_data, trend=None, seasonal=None)
ses_fitted = ses_model.fit()
ses_forecast = ses_fitted.forecast(steps=forecast_steps)

# Holt's Linear Trend
holt_model = ExponentialSmoothing(train_data, trend='add', seasonal=None)
holt_fitted = holt_model.fit()
holt_forecast = holt_fitted.forecast(steps=forecast_steps)

# Holt-Winters (with seasonality)
hw_model = ExponentialSmoothing(train_data, trend='add', seasonal='add', seasonal_periods=365)
hw_fitted = hw_model.fit()
hw_forecast = hw_fitted.forecast(steps=forecast_steps)

# Calculate accuracies
ses_rmse = np.sqrt(mean_squared_error(test_data, ses_forecast))
holt_rmse = np.sqrt(mean_squared_error(test_data, holt_forecast))
hw_rmse = np.sqrt(mean_squared_error(test_data, hw_forecast))

print("Exponential Smoothing Models Comparison:")
print(f"Simple ES RMSE: {ses_rmse:.4f}")
print(f"Holt's Linear RMSE: {holt_rmse:.4f}")
print(f"Holt-Winters RMSE: {hw_rmse:.4f}")

# Plot all exponential smoothing forecasts
plt.figure(figsize=(15, 8))
plt.plot(train_data.index, train_data.values, label='Training Data', linewidth=1)
plt.plot(test_data.index, test_data.values, label='Actual Test Data', linewidth=1)
plt.plot(test_data.index, ses_forecast, label='Simple ES', linewidth=2)
plt.plot(test_data.index, holt_forecast, label="Holt's Linear", linewidth=2)
plt.plot(test_data.index, hw_forecast, label='Holt-Winters', linewidth=2)

plt.title('Exponential Smoothing Forecasts Comparison')
plt.xlabel('Date')
plt.ylabel('Value')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

## Practical Exercise

Build a complete time series analysis:
1. Load or generate time series data
2. Explore and visualize the data
3. Perform decomposition analysis
4. Test for stationarity
5. Build and compare ARIMA models
6. Implement seasonal models
7. Evaluate forecast accuracy

## Summary & Next Steps

Time series analysis enables prediction of future values based on historical patterns. Master these techniques for forecasting applications.

**Next up**: Part 9 - Bayesian statistics and inference.`,
            readTime: 32,
            publishedAt: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Time Series', 'ARIMA', 'Forecasting', 'Seasonality']
          },
          {
            id: 'statistics-part-9',
            partNumber: 9,
            title: 'Bayesian Statistics and Inference',
            summary: 'Learn Bayesian methods for statistical inference and decision making.',
            content: `# Part 9: Bayesian Statistics and Inference

Master Bayesian statistical methods for probabilistic inference and decision making.

## Introduction to Bayesian Statistics

### Bayesian vs. Frequentist Approach
- **Frequentist**: Parameters are fixed, data is random
- **Bayesian**: Parameters are random, data is fixed
- **Key Difference**: Incorporates prior knowledge through prior distributions
- **Advantages**: Natural uncertainty quantification, incorporates expert knowledge

### Bayes' Theorem
\`\`\`
P(θ|data) = P(data|θ) × P(θ) / P(data)

Where:
- P(θ|data): Posterior probability
- P(data|θ): Likelihood
- P(θ): Prior probability
- P(data): Marginal likelihood (evidence)
\`\`\`

## Basic Bayesian Inference

### Simple Example: Coin Tossing
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from scipy.stats import beta, binom
import pandas as pd

# Generate coin toss data
np.random.seed(42)
n_tosses = 100
true_prob = 0.6  # True probability of heads
data = np.random.binomial(1, true_prob, n_tosses)
n_heads = np.sum(data)

print(f"Number of heads: {n_heads}")
print(f"Number of tails: {n_tosses - n_heads}")
print(f"Observed proportion: {n_heads/n_tosses:.3f}")

# Prior distribution (Beta distribution)
# Beta(1,1) is uniform prior
alpha_prior = 1
beta_prior = 1

# Posterior distribution (Beta distribution)
# Beta(α + heads, β + tails)
alpha_posterior = alpha_prior + n_heads
beta_posterior = beta_prior + (n_tosses - n_heads)

print(f"\\nPrior: Beta({alpha_prior}, {beta_prior})")
print(f"Posterior: Beta({alpha_posterior}, {beta_posterior})")

# Plot prior and posterior
theta_range = np.linspace(0, 1, 1000)
prior_pdf = beta.pdf(theta_range, alpha_prior, beta_prior)
posterior_pdf = beta.pdf(theta_range, alpha_posterior, beta_posterior)

plt.figure(figsize=(12, 6))
plt.plot(theta_range, prior_pdf, label='Prior', linewidth=2)
plt.plot(theta_range, posterior_pdf, label='Posterior', linewidth=2)
plt.axvline(true_prob, color='red', linestyle='--', label='True Probability')
plt.axvline(n_heads/n_tosses, color='green', linestyle='--', label='Observed Proportion')
plt.xlabel('Probability of Heads (θ)')
plt.ylabel('Density')
plt.title('Bayesian Inference: Coin Tossing')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

# Posterior statistics
posterior_mean = alpha_posterior / (alpha_posterior + beta_posterior)
posterior_mode = (alpha_posterior - 1) / (alpha_posterior + beta_posterior - 2)
posterior_var = (alpha_posterior * beta_posterior) / ((alpha_posterior + beta_posterior)**2 * (alpha_posterior + beta_posterior + 1))

print(f"\\nPosterior Statistics:")
print(f"Mean: {posterior_mean:.4f}")
print(f"Mode: {posterior_mode:.4f}")
print(f"Variance: {posterior_var:.4f}")
print(f"Standard deviation: {np.sqrt(posterior_var):.4f}")

# Credible intervals
credible_interval_95 = beta.interval(0.95, alpha_posterior, beta_posterior)
credible_interval_90 = beta.interval(0.90, alpha_posterior, beta_posterior)

print(f"\\nCredible Intervals:")
print(f"95% CI: [{credible_interval_95[0]:.4f}, {credible_interval_95[1]:.4f}]")
print(f"90% CI: [{credible_interval_90[0]:.4f}, {credible_interval_90[1]:.4f}]")
\`\`\`

### Different Prior Distributions
\`\`\`python
# Compare different priors
priors = {
    'Uniform (Beta(1,1))': (1, 1),
    'Weakly informative (Beta(2,2))': (2, 2),
    'Informative (Beta(10,10))': (10, 10),
    'Biased (Beta(2,8))': (2, 8)
}

plt.figure(figsize=(15, 10))

for i, (prior_name, (alpha, beta)) in enumerate(priors.items()):
    # Calculate posterior
    alpha_post = alpha + n_heads
    beta_post = beta + (n_tosses - n_heads)
    
    # Plot
    plt.subplot(2, 2, i+1)
    
    # Prior
    prior_pdf = beta.pdf(theta_range, alpha, beta)
    plt.plot(theta_range, prior_pdf, label='Prior', linewidth=2, alpha=0.7)
    
    # Posterior
    posterior_pdf = beta.pdf(theta_range, alpha_post, beta_post)
    plt.plot(theta_range, posterior_pdf, label='Posterior', linewidth=2)
    
    # True value
    plt.axvline(true_prob, color='red', linestyle='--', label='True Probability')
    plt.axvline(n_heads/n_tosses, color='green', linestyle='--', label='Observed')
    
    plt.title(f'{prior_name}')
    plt.xlabel('Probability of Heads')
    plt.ylabel('Density')
    plt.legend()
    plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Compare posterior means
print("Posterior Means with Different Priors:")
for prior_name, (alpha, beta) in priors.items():
    alpha_post = alpha + n_heads
    beta_post = beta + (n_tosses - n_heads)
    posterior_mean = alpha_post / (alpha_post + beta_post)
    print(f"{prior_name}: {posterior_mean:.4f}")
\`\`\`

## Bayesian Linear Regression

### Normal-Gamma Conjugate Prior
\`\`\`python
# Generate regression data
np.random.seed(42)
n = 50
x = np.random.normal(0, 1, n)
true_slope = 2.0
true_intercept = 1.0
true_sigma = 1.5
y = true_intercept + true_slope * x + np.random.normal(0, true_sigma, n)

# Create DataFrame
reg_data = pd.DataFrame({'x': x, 'y': y})

# Visualize data
plt.figure(figsize=(10, 6))
plt.scatter(reg_data['x'], reg_data['y'], alpha=0.6)
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Regression Data')
plt.grid(True, alpha=0.3)
plt.show()

# Bayesian linear regression with conjugate priors
# Prior parameters
mu_0 = np.array([0, 0])  # Prior mean for [intercept, slope]
V_0 = np.array([[100, 0], [0, 100]])  # Prior covariance
a_0 = 1  # Prior shape for precision
b_0 = 1  # Prior rate for precision

# Design matrix
X = np.column_stack([np.ones(n), x])

# Posterior parameters
V_n = np.linalg.inv(np.linalg.inv(V_0) + X.T @ X)
mu_n = V_n @ (np.linalg.inv(V_0) @ mu_0 + X.T @ y)
a_n = a_0 + n/2
b_n = b_0 + 0.5 * (y.T @ y + mu_0.T @ np.linalg.inv(V_0) @ mu_0 - mu_n.T @ np.linalg.inv(V_n) @ mu_n)

print("Bayesian Linear Regression Results:")
print(f"Posterior mean (intercept, slope): {mu_n}")
print(f"Posterior covariance:\\n{V_n}")
print(f"Posterior precision parameters: a={a_n:.2f}, b={b_n:.2f}")

# Sample from posterior
n_samples = 10000
posterior_samples = []

for _ in range(n_samples):
    # Sample precision
    tau = stats.gamma.rvs(a_n, scale=1/b_n)
    
    # Sample coefficients
    beta_sample = np.random.multivariate_normal(mu_n, V_n/tau)
    posterior_samples.append(beta_sample)

posterior_samples = np.array(posterior_samples)

# Plot posterior distributions
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Intercept
axes[0].hist(posterior_samples[:, 0], bins=50, alpha=0.7, density=True)
axes[0].axvline(true_intercept, color='red', linestyle='--', label='True Value')
axes[0].axvline(np.mean(posterior_samples[:, 0]), color='blue', linestyle='-', label='Posterior Mean')
axes[0].set_title('Posterior: Intercept')
axes[0].set_xlabel('Intercept')
axes[0].set_ylabel('Density')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Slope
axes[1].hist(posterior_samples[:, 1], bins=50, alpha=0.7, density=True)
axes[1].axvline(true_slope, color='red', linestyle='--', label='True Value')
axes[1].axvline(np.mean(posterior_samples[:, 1]), color='blue', linestyle='-', label='Posterior Mean')
axes[1].set_title('Posterior: Slope')
axes[1].set_xlabel('Slope')
axes[1].set_ylabel('Density')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

# Precision
tau_samples = stats.gamma.rvs(a_n, scale=1/b_n, size=n_samples)
axes[2].hist(tau_samples, bins=50, alpha=0.7, density=True)
axes[2].axvline(1/true_sigma**2, color='red', linestyle='--', label='True Value')
axes[2].axvline(np.mean(tau_samples), color='blue', linestyle='-', label='Posterior Mean')
axes[2].set_title('Posterior: Precision')
axes[2].set_xlabel('Precision (τ)')
axes[2].set_ylabel('Density')
axes[2].legend()
axes[2].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Credible intervals
intercept_ci = np.percentile(posterior_samples[:, 0], [2.5, 97.5])
slope_ci = np.percentile(posterior_samples[:, 1], [2.5, 97.5])

print(f"\\n95% Credible Intervals:")
print(f"Intercept: [{intercept_ci[0]:.3f}, {intercept_ci[1]:.3f}]")
print(f"Slope: [{slope_ci[0]:.3f}, {slope_ci[1]:.3f}]")
\`\`\`

## Markov Chain Monte Carlo (MCMC)

### Metropolis-Hastings Algorithm
\`\`\`python
def metropolis_hastings(target_log_pdf, proposal_sampler, proposal_log_pdf, 
                       initial_state, n_samples, burn_in=1000):
    """Metropolis-Hastings MCMC algorithm"""
    samples = []
    current_state = initial_state
    current_log_pdf = target_log_pdf(current_state)
    
    for i in range(n_samples + burn_in):
        # Propose new state
        proposed_state = proposal_sampler(current_state)
        proposed_log_pdf = target_log_pdf(proposed_state)
        
        # Calculate acceptance probability
        log_alpha = proposed_log_pdf - current_log_pdf + \
                   proposal_log_pdf(current_state, proposed_state) - \
                   proposal_log_pdf(proposed_state, current_state)
        
        alpha = min(1, np.exp(log_alpha))
        
        # Accept or reject
        if np.random.random() < alpha:
            current_state = proposed_state
            current_log_pdf = proposed_log_pdf
        
        # Store sample (after burn-in)
        if i >= burn_in:
            samples.append(current_state)
    
    return np.array(samples)

# Example: Sampling from a bimodal distribution
def target_log_pdf(x):
    """Log PDF of target distribution (mixture of two normals)"""
    return np.log(0.5 * stats.norm.pdf(x, -2, 1) + 0.5 * stats.norm.pdf(x, 2, 1))

def proposal_sampler(current):
    """Proposal distribution (normal centered at current state)"""
    return np.random.normal(current, 1)

def proposal_log_pdf(from_state, to_state):
    """Log PDF of proposal distribution"""
    return stats.norm.logpdf(to_state, from_state, 1)

# Run MCMC
np.random.seed(42)
initial_state = 0
n_samples = 10000
samples = metropolis_hastings(target_log_pdf, proposal_sampler, proposal_log_pdf, 
                             initial_state, n_samples)

# Plot results
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Trace plot
axes[0, 0].plot(samples)
axes[0, 0].set_title('MCMC Trace Plot')
axes[0, 0].set_xlabel('Iteration')
axes[0, 0].set_ylabel('Sample Value')
axes[0, 0].grid(True, alpha=0.3)

# Histogram of samples
axes[0, 1].hist(samples, bins=50, density=True, alpha=0.7)
x_range = np.linspace(-6, 6, 1000)
target_pdf = np.exp([target_log_pdf(x) for x in x_range])
axes[0, 1].plot(x_range, target_pdf, 'r-', linewidth=2, label='Target Distribution')
axes[0, 1].set_title('MCMC Samples vs Target')
axes[0, 1].set_xlabel('Value')
axes[0, 1].set_ylabel('Density')
axes[0, 1].legend()
axes[0, 1].grid(True, alpha=0.3)

# Autocorrelation
from statsmodels.tsa.stattools import acf
lags = 50
autocorr = acf(samples, nlags=lags)
axes[1, 0].plot(range(lags+1), autocorr)
axes[1, 0].set_title('Autocorrelation Function')
axes[1, 0].set_xlabel('Lag')
axes[1, 0].set_ylabel('Autocorrelation')
axes[1, 0].grid(True, alpha=0.3)

# Running mean
running_mean = np.cumsum(samples) / np.arange(1, len(samples) + 1)
axes[1, 1].plot(running_mean)
axes[1, 1].axhline(np.mean(samples), color='red', linestyle='--', label='Final Mean')
axes[1, 1].set_title('Running Mean')
axes[1, 1].set_xlabel('Iteration')
axes[1, 1].set_ylabel('Running Mean')
axes[1, 1].legend()
axes[1, 1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# MCMC diagnostics
print("MCMC Diagnostics:")
print(f"Sample mean: {np.mean(samples):.4f}")
print(f"Sample std: {np.std(samples):.4f}")
print(f"Effective sample size: {len(samples) / (1 + 2 * np.sum(autocorr[1:])):.0f}")
\`\`\`

## Bayesian Model Comparison

### Model Selection with Bayes Factors
\`\`\`python
# Compare two models using Bayes factors
# Model 1: Simple linear regression
# Model 2: Quadratic regression

# Generate data
np.random.seed(42)
n = 100
x = np.random.uniform(-2, 2, n)
y = 1 + 2*x + 0.5*x**2 + np.random.normal(0, 0.5, n)  # True model is quadratic

# Visualize data
plt.figure(figsize=(10, 6))
plt.scatter(x, y, alpha=0.6)
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Data for Model Comparison')
plt.grid(True, alpha=0.3)
plt.show()

# Model 1: Linear regression
X1 = np.column_stack([np.ones(n), x])
# Model 2: Quadratic regression
X2 = np.column_stack([np.ones(n), x, x**2])

# Prior parameters (same for both models)
mu_0 = np.zeros(X1.shape[1])  # For model 1
V_0 = np.eye(X1.shape[1]) * 100
a_0 = 1
b_0 = 1

# Calculate marginal likelihood for Model 1
V_n1 = np.linalg.inv(np.linalg.inv(V_0) + X1.T @ X1)
mu_n1 = V_n1 @ (np.linalg.inv(V_0) @ mu_0 + X1.T @ y)
a_n1 = a_0 + n/2
b_n1 = b_0 + 0.5 * (y.T @ y + mu_0.T @ np.linalg.inv(V_0) @ mu_0 - mu_n1.T @ np.linalg.inv(V_n1) @ mu_n1)

# Marginal likelihood for Model 1
log_ml1 = (0.5 * np.log(np.linalg.det(V_n1)) - 0.5 * np.log(np.linalg.det(V_0)) + 
           a_0 * np.log(b_0) - a_n1 * np.log(b_n1) + 
           stats.gamma.logpdf(1, a_n1, scale=1/b_n1))

# Calculate marginal likelihood for Model 2
mu_0_2 = np.zeros(X2.shape[1])
V_0_2 = np.eye(X2.shape[1]) * 100

V_n2 = np.linalg.inv(np.linalg.inv(V_0_2) + X2.T @ X2)
mu_n2 = V_n2 @ (np.linalg.inv(V_0_2) @ mu_0_2 + X2.T @ y)
a_n2 = a_0 + n/2
b_n2 = b_0 + 0.5 * (y.T @ y + mu_0_2.T @ np.linalg.inv(V_0_2) @ mu_0_2 - mu_n2.T @ np.linalg.inv(V_n2) @ mu_n2)

log_ml2 = (0.5 * np.log(np.linalg.det(V_n2)) - 0.5 * np.log(np.linalg.det(V_0_2)) + 
           a_0 * np.log(b_0) - a_n2 * np.log(b_n2) + 
           stats.gamma.logpdf(1, a_n2, scale=1/b_n2))

# Bayes factor
log_bf = log_ml2 - log_ml1
bf = np.exp(log_bf)

print("Bayesian Model Comparison:")
print(f"Log Marginal Likelihood Model 1 (Linear): {log_ml1:.4f}")
print(f"Log Marginal Likelihood Model 2 (Quadratic): {log_ml2:.4f}")
print(f"Log Bayes Factor (Model 2 / Model 1): {log_bf:.4f}")
print(f"Bayes Factor: {bf:.4f}")

# Interpretation
if bf > 10:
    interpretation = "Strong evidence for Model 2"
elif bf > 3:
    interpretation = "Moderate evidence for Model 2"
elif bf > 1:
    interpretation = "Weak evidence for Model 2"
elif bf > 1/3:
    interpretation = "Weak evidence for Model 1"
elif bf > 1/10:
    interpretation = "Moderate evidence for Model 1"
else:
    interpretation = "Strong evidence for Model 1"

print(f"Interpretation: {interpretation}")

# Model probabilities (assuming equal prior probabilities)
p_model1 = 1 / (1 + bf)
p_model2 = bf / (1 + bf)

print(f"\\nModel Probabilities:")
print(f"P(Model 1): {p_model1:.4f}")
print(f"P(Model 2): {p_model2:.4f}")
\`\`\`

## Practical Exercise

Apply Bayesian methods:
1. Choose a statistical problem
2. Define prior distributions
3. Calculate posterior distributions
4. Perform Bayesian inference
5. Compare models using Bayes factors
6. Interpret results
7. Validate conclusions

## Summary & Next Steps

Bayesian statistics provides a powerful framework for incorporating prior knowledge and quantifying uncertainty. Master these methods for robust statistical inference.

**Next up**: Part 10 - Experimental design and A/B testing.`,
            readTime: 35,
            publishedAt: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Bayesian Statistics', 'MCMC', 'Prior Distributions', 'Model Comparison']
          },
          {
            id: 'statistics-part-10',
            partNumber: 10,
            title: 'Experimental Design and A/B Testing',
            summary: 'Master experimental design principles and A/B testing methodologies.',
            content: `# Part 10: Experimental Design and A/B Testing

Learn to design robust experiments and conduct A/B tests for data-driven decision making.

## Introduction to Experimental Design

### What is Experimental Design?
- **Definition**: Systematic approach to planning and conducting experiments
- **Purpose**: Establish cause-and-effect relationships
- **Principles**: Randomization, replication, control, blocking
- **Applications**: Product development, marketing, user experience, scientific research

### Key Concepts
\`\`\`
Experimental Elements:
1. Treatment: The intervention being tested
2. Control: Baseline condition for comparison
3. Response Variable: Outcome being measured
4. Confounding Variables: Factors that could influence results
5. Randomization: Random assignment of subjects to treatments
\`\`\`

## A/B Testing Fundamentals

### A/B Test Structure
\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from scipy.stats import chi2_contingency, ttest_ind
import warnings
warnings.filterwarnings('ignore')

# Generate A/B test data
np.random.seed(42)
n_users = 10000

# Control group (A)
control_users = n_users // 2
control_conversions = np.random.binomial(control_users, 0.12)  # 12% baseline conversion

# Treatment group (B)
treatment_users = n_users - control_users
treatment_conversions = np.random.binomial(treatment_users, 0.15)  # 15% improved conversion

# Create results DataFrame
ab_results = pd.DataFrame({
    'group': ['Control', 'Treatment'],
    'users': [control_users, treatment_users],
    'conversions': [control_conversions, treatment_conversions]
})

ab_results['conversion_rate'] = ab_results['conversions'] / ab_results['users']
ab_results['non_conversions'] = ab_results['users'] - ab_results['conversions']

print("A/B Test Results:")
print(ab_results)

# Visualize results
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Conversion rates
axes[0].bar(ab_results['group'], ab_results['conversion_rate'], 
           color=['skyblue', 'lightcoral'], alpha=0.7)
axes[0].set_title('Conversion Rates by Group')
axes[0].set_ylabel('Conversion Rate')
axes[0].set_ylim(0, max(ab_results['conversion_rate']) * 1.2)

# Add value labels on bars
for i, v in enumerate(ab_results['conversion_rate']):
    axes[0].text(i, v + 0.001, f'{v:.3f}', ha='center', va='bottom')

# Absolute numbers
x = np.arange(len(ab_results['group']))
width = 0.35

axes[1].bar(x - width/2, ab_results['conversions'], width, 
           label='Conversions', color='lightgreen', alpha=0.7)
axes[1].bar(x + width/2, ab_results['non_conversions'], width, 
           label='Non-conversions', color='lightcoral', alpha=0.7)

axes[1].set_title('Users by Group and Conversion Status')
axes[1].set_ylabel('Number of Users')
axes[1].set_xticks(x)
axes[1].set_xticklabels(ab_results['group'])
axes[1].legend()

plt.tight_layout()
plt.show()

# Calculate lift
control_rate = ab_results.loc[0, 'conversion_rate']
treatment_rate = ab_results.loc[1, 'conversion_rate']
lift = (treatment_rate - control_rate) / control_rate * 100

print(f"\\nLift Analysis:")
print(f"Control conversion rate: {control_rate:.3f}")
print(f"Treatment conversion rate: {treatment_rate:.3f}")
print(f"Absolute difference: {treatment_rate - control_rate:.3f}")
print(f"Relative lift: {lift:.1f}%")
\`\`\`

### Statistical Significance Testing
\`\`\`python
# Chi-square test for proportions
contingency_table = ab_results[['conversions', 'non_conversions']].values
chi2_stat, p_value, dof, expected = chi2_contingency(contingency_table)

print("Chi-square Test Results:")
print(f"Chi-square statistic: {chi2_stat:.4f}")
print(f"P-value: {p_value:.4f}")
print(f"Degrees of freedom: {dof}")

# Two-proportion z-test
def two_proportion_z_test(x1, n1, x2, n2):
    """Two-proportion z-test"""
    p1 = x1 / n1
    p2 = x2 / n2
    p_pooled = (x1 + x2) / (n1 + n2)
    
    se = np.sqrt(p_pooled * (1 - p_pooled) * (1/n1 + 1/n2))
    z_score = (p1 - p2) / se
    p_value = 2 * (1 - stats.norm.cdf(abs(z_score)))
    
    return z_score, p_value

z_score, z_p_value = two_proportion_z_test(
    control_conversions, control_users,
    treatment_conversions, treatment_users
)

print(f"\\nTwo-Proportion Z-Test:")
print(f"Z-score: {z_score:.4f}")
print(f"P-value: {z_p_value:.4f}")

# Confidence interval for difference
def proportion_diff_ci(x1, n1, x2, n2, confidence=0.95):
    """Confidence interval for difference in proportions"""
    p1 = x1 / n1
    p2 = x2 / n2
    
    se = np.sqrt(p1 * (1 - p1) / n1 + p2 * (1 - p2) / n2)
    z_critical = stats.norm.ppf((1 + confidence) / 2)
    
    diff = p2 - p1
    margin_error = z_critical * se
    
    return diff - margin_error, diff + margin_error

ci_lower, ci_upper = proportion_diff_ci(
    control_conversions, control_users,
    treatment_conversions, treatment_users
)

print(f"\\n95% Confidence Interval for Difference:")
print(f"Lower bound: {ci_lower:.4f}")
print(f"Upper bound: {ci_upper:.4f}")

# Interpretation
alpha = 0.05
if p_value < alpha:
    print(f"\\nResult: Statistically significant difference (p < {alpha})")
    print("Reject null hypothesis - treatment has significant effect")
else:
    print(f"\\nResult: No statistically significant difference (p ≥ {alpha})")
    print("Fail to reject null hypothesis - no significant effect detected")
\`\`\`

## Power Analysis and Sample Size

### Statistical Power
\`\`\`python
def calculate_power(n1, n2, p1, p2, alpha=0.05):
    """Calculate statistical power for two-proportion test"""
    p_pooled = (p1 * n1 + p2 * n2) / (n1 + n2)
    se = np.sqrt(p_pooled * (1 - p_pooled) * (1/n1 + 1/n2))
    
    z_alpha = stats.norm.ppf(1 - alpha/2)
    z_beta = (abs(p2 - p1) - z_alpha * se) / se
    
    power = stats.norm.cdf(z_beta)
    return power

def calculate_sample_size(p1, p2, power=0.8, alpha=0.05):
    """Calculate required sample size for two-proportion test"""
    z_alpha = stats.norm.ppf(1 - alpha/2)
    z_beta = stats.norm.ppf(power)
    
    p_pooled = (p1 + p2) / 2
    effect_size = abs(p2 - p1)
    
    n = (z_alpha + z_beta)**2 * 2 * p_pooled * (1 - p_pooled) / effect_size**2
    return int(np.ceil(n))

# Calculate power for current test
current_power = calculate_power(
    control_users, treatment_users,
    control_rate, treatment_rate
)

print(f"Current Test Power Analysis:")
print(f"Statistical power: {current_power:.3f}")

# Calculate required sample size for 80% power
required_n = calculate_sample_size(control_rate, treatment_rate, power=0.8)
print(f"\\nRequired sample size per group for 80% power: {required_n}")

# Power analysis for different effect sizes
effect_sizes = np.arange(0.01, 0.05, 0.005)
powers = []

for effect in effect_sizes:
    p2_test = control_rate + effect
    power = calculate_power(control_users, treatment_users, control_rate, p2_test)
    powers.append(power)

# Plot power curve
plt.figure(figsize=(10, 6))
plt.plot(effect_sizes, powers, 'b-', linewidth=2)
plt.axhline(y=0.8, color='r', linestyle='--', label='80% Power')
plt.axvline(x=treatment_rate - control_rate, color='g', linestyle='--', 
           label=f'Observed Effect ({treatment_rate - control_rate:.3f})')
plt.xlabel('Effect Size (Difference in Conversion Rates)')
plt.ylabel('Statistical Power')
plt.title('Power Analysis: Effect Size vs Power')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

# Sample size calculation for different power levels
power_levels = [0.7, 0.8, 0.9, 0.95]
sample_sizes = []

for power in power_levels:
    n = calculate_sample_size(control_rate, treatment_rate, power=power)
    sample_sizes.append(n)

power_df = pd.DataFrame({
    'Power': power_levels,
    'Sample Size per Group': sample_sizes
})

print("\\nSample Size Requirements:")
print(power_df)
\`\`\`

## Advanced A/B Testing

### Multiple Variants Testing
\`\`\`python
# A/B/C/D test with multiple variants
np.random.seed(42)
n_total = 20000
n_variants = 4

# Generate data for multiple variants
variant_data = []
conversion_rates = [0.12, 0.13, 0.15, 0.14]  # True conversion rates

for i, rate in enumerate(conversion_rates):
    n_users = n_total // n_variants
    conversions = np.random.binomial(n_users, rate)
    
    variant_data.append({
        'variant': f'Variant {chr(65+i)}',  # A, B, C, D
        'users': n_users,
        'conversions': conversions,
        'conversion_rate': conversions / n_users
    })

variant_df = pd.DataFrame(variant_data)
variant_df['non_conversions'] = variant_df['users'] - variant_df['conversions']

print("Multi-Variant Test Results:")
print(variant_df)

# Visualize multi-variant results
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
bars = plt.bar(variant_df['variant'], variant_df['conversion_rate'], 
               color=['skyblue', 'lightcoral', 'lightgreen', 'gold'], alpha=0.7)
plt.title('Conversion Rates by Variant')
plt.ylabel('Conversion Rate')
plt.ylim(0, max(variant_df['conversion_rate']) * 1.2)

# Add value labels
for bar, rate in zip(bars, variant_df['conversion_rate']):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.001, 
             f'{rate:.3f}', ha='center', va='bottom')

plt.subplot(1, 2, 2)
# Stacked bar chart
bottom = np.zeros(len(variant_df))
plt.bar(variant_df['variant'], variant_df['conversions'], 
        label='Conversions', color='lightgreen', alpha=0.7)
plt.bar(variant_df['variant'], variant_df['non_conversions'], 
        bottom=variant_df['conversions'], label='Non-conversions', 
        color='lightcoral', alpha=0.7)
plt.title('Users by Variant and Conversion Status')
plt.ylabel('Number of Users')
plt.legend()

plt.tight_layout()
plt.show()

# Chi-square test for multiple proportions
contingency_multi = variant_df[['conversions', 'non_conversions']].values
chi2_multi, p_value_multi, dof_multi, expected_multi = chi2_contingency(contingency_multi)

print(f"\\nMulti-Variant Chi-square Test:")
print(f"Chi-square statistic: {chi2_multi:.4f}")
print(f"P-value: {p_value_multi:.4f}")
print(f"Degrees of freedom: {dof_multi}")

# Post-hoc pairwise comparisons
from itertools import combinations

print(f"\\nPost-hoc Pairwise Comparisons:")
for i, j in combinations(range(len(variant_df)), 2):
    var1 = variant_df.iloc[i]
    var2 = variant_df.iloc[j]
    
    z_score, p_val = two_proportion_z_test(
        var1['conversions'], var1['users'],
        var2['conversions'], var2['users']
    )
    
    # Bonferroni correction
    corrected_p = p_val * 6  # 6 pairwise comparisons
    significance = "***" if corrected_p < 0.05 else "ns"
    
    print(f"{var1['variant']} vs {var2['variant']}: "
          f"z={z_score:.3f}, p={p_val:.4f}, corrected_p={corrected_p:.4f} {significance}")
\`\`\`

## Practical Exercise

Design and analyze an A/B test:
1. Define hypothesis and success metrics
2. Calculate required sample size
3. Set up randomization
4. Collect and analyze data
5. Test statistical significance
6. Calculate confidence intervals
7. Make business recommendations

## Summary & Next Steps

Experimental design and A/B testing enable data-driven decision making. Master these techniques for reliable business insights.

**Next up**: Part 11 - Statistical modeling and machine learning integration.`,
            readTime: 30,
            publishedAt: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Experimental Design', 'A/B Testing', 'Statistical Power', 'Sample Size']
          },
          {
            id: 'statistics-part-11',
            partNumber: 11,
            title: 'Statistical Modeling and Machine Learning Integration',
            summary: 'Bridge traditional statistics with modern machine learning techniques.',
            content: `# Part 11: Statistical Modeling and Machine Learning Integration

Learn to integrate traditional statistical methods with modern machine learning approaches.

## Statistical vs. Machine Learning Approaches

### Key Differences
- **Statistics**: Focus on inference, hypothesis testing, uncertainty quantification
- **Machine Learning**: Focus on prediction, pattern recognition, generalization
- **Integration**: Combine both approaches for comprehensive data analysis

### When to Use Each Approach
\`\`\`
Statistical Methods:
- Causal inference
- Hypothesis testing
- Confidence intervals
- Model interpretability

Machine Learning:
- High-dimensional data
- Complex patterns
- Prediction accuracy
- Feature engineering
\`\`\`

## Linear Models: Statistical vs ML Perspective

### Statistical Linear Regression
\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score
import statsmodels.api as sm
from statsmodels.stats.diagnostic import het_breuschpagan
import warnings
warnings.filterwarnings('ignore')

# Generate data with known relationships
np.random.seed(42)
n = 200
x1 = np.random.normal(0, 1, n)
x2 = np.random.normal(0, 1, n)
x3 = np.random.normal(0, 1, n)

# True relationship with some noise
y = 2 + 1.5*x1 + 0.8*x2 - 0.3*x3 + np.random.normal(0, 0.5, n)

# Create DataFrame
data = pd.DataFrame({'x1': x1, 'x2': x2, 'x3': x3, 'y': y})

# Statistical approach: OLS with inference
X_stat = sm.add_constant(data[['x1', 'x2', 'x3']])
model_stat = sm.OLS(data['y'], X_stat).fit()

print("Statistical Linear Regression:")
print(model_stat.summary())

# Machine Learning approach: Focus on prediction
X_ml = data[['x1', 'x2', 'x3']]
y_ml = data['y']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_ml, y_ml, test_size=0.3, random_state=42)

# Fit ML model
model_ml = LinearRegression()
model_ml.fit(X_train, y_train)

# Predictions
y_pred_train = model_ml.predict(X_train)
y_pred_test = model_ml.predict(X_test)

# Performance metrics
train_r2 = r2_score(y_train, y_pred_train)
test_r2 = r2_score(y_test, y_pred_test)
train_rmse = np.sqrt(mean_squared_error(y_train, y_pred_train))
test_rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))

print(f"\\nMachine Learning Linear Regression:")
print(f"Training R²: {train_r2:.4f}")
print(f"Test R²: {test_r2:.4f}")
print(f"Training RMSE: {train_rmse:.4f}")
print(f"Test RMSE: {test_rmse:.4f}")

# Compare coefficients
print(f"\\nCoefficient Comparison:")
print(f"Statistical model coefficients: {model_stat.params.values}")
print(f"ML model coefficients: {np.concatenate([[model_ml.intercept_], model_ml.coef_])}")

# Cross-validation for ML model
cv_scores = cross_val_score(model_ml, X_ml, y_ml, cv=5, scoring='r2')
print(f"\\nCross-validation R² scores: {cv_scores}")
print(f"Mean CV R²: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")
\`\`\`

### Regularization: Statistical vs ML Perspective
\`\`\`python
# Generate data with multicollinearity
np.random.seed(42)
n = 100
p = 10  # Number of features

# Create correlated features
X_corr = np.random.normal(0, 1, (n, p))
# Make some features highly correlated
X_corr[:, 1] = X_corr[:, 0] + np.random.normal(0, 0.1, n)
X_corr[:, 2] = X_corr[:, 0] + np.random.normal(0, 0.1, n)

# True relationship (only first 3 features matter)
true_coefs = np.array([2, 1.5, 0.8, 0, 0, 0, 0, 0, 0, 0])
y_corr = X_corr @ true_coefs + np.random.normal(0, 0.5, n)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_corr, y_corr, test_size=0.3, random_state=42)

# Compare different approaches
models = {
    'OLS': LinearRegression(),
    'Ridge (α=1)': Ridge(alpha=1.0),
    'Ridge (α=10)': Ridge(alpha=10.0),
    'Lasso (α=0.1)': Lasso(alpha=0.1),
    'Lasso (α=1)': Lasso(alpha=1.0)
}

results = {}
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    
    r2 = r2_score(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    
    results[name] = {
        'R²': r2,
        'RMSE': rmse,
        'Coefficients': model.coef_ if hasattr(model, 'coef_') else None
    }

# Display results
results_df = pd.DataFrame({name: {k: v for k, v in result.items() if k != 'Coefficients'} 
                          for name, result in results.items()}).T
print("Model Comparison:")
print(results_df)

# Visualize coefficient shrinkage
fig, axes = plt.subplots(1, 2, figsize=(15, 6))

# Ridge coefficients
ridge_alphas = [0.1, 1, 10, 100]
ridge_coefs = []

for alpha in ridge_alphas:
    ridge = Ridge(alpha=alpha)
    ridge.fit(X_train, y_train)
    ridge_coefs.append(ridge.coef_)

ridge_coefs = np.array(ridge_coefs)

axes[0].plot(ridge_alphas, ridge_coefs)
axes[0].set_xlabel('Ridge Alpha')
axes[0].set_ylabel('Coefficient Value')
axes[0].set_title('Ridge Regularization Path')
axes[0].set_xscale('log')
axes[0].legend([f'Feature {i}' for i in range(p)])
axes[0].grid(True, alpha=0.3)

# Lasso coefficients
lasso_alphas = [0.01, 0.1, 1, 10]
lasso_coefs = []

for alpha in lasso_alphas:
    lasso = Lasso(alpha=alpha)
    lasso.fit(X_train, y_train)
    lasso_coefs.append(lasso.coef_)

lasso_coefs = np.array(lasso_coefs)

axes[1].plot(lasso_alphas, lasso_coefs)
axes[1].set_xlabel('Lasso Alpha')
axes[1].set_ylabel('Coefficient Value')
axes[1].set_title('Lasso Regularization Path')
axes[1].set_xscale('log')
axes[1].legend([f'Feature {i}' for i in range(p)])
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Generalized Linear Models

### Logistic Regression: Statistical vs ML
\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from scipy.special import expit

# Generate binary classification data
np.random.seed(42)
n = 500
x1 = np.random.normal(0, 1, n)
x2 = np.random.normal(0, 1, n)

# True logistic relationship
logit_p = 0.5 + 1.2*x1 - 0.8*x2
p = expit(logit_p)
y_binary = np.random.binomial(1, p, n)

# Create DataFrame
binary_data = pd.DataFrame({'x1': x1, 'x2': x2, 'y': y_binary})

# Statistical approach: GLM with logistic link
X_binary = sm.add_constant(binary_data[['x1', 'x2']])
model_logistic_stat = sm.GLM(binary_data['y'], X_binary, family=sm.families.Binomial()).fit()

print("Statistical Logistic Regression:")
print(model_logistic_stat.summary())

# Machine Learning approach
X_ml_binary = binary_data[['x1', 'x2']]
y_ml_binary = binary_data['y']

X_train, X_test, y_train, y_test = train_test_split(X_ml_binary, y_ml_binary, test_size=0.3, random_state=42)

model_logistic_ml = LogisticRegression(random_state=42)
model_logistic_ml.fit(X_train, y_train)

# Predictions
y_pred_proba = model_logistic_ml.predict_proba(X_test)[:, 1]
y_pred = model_logistic_ml.predict(X_test)

# Performance metrics
auc_score = roc_auc_score(y_test, y_pred_proba)
print(f"\\nMachine Learning Logistic Regression:")
print(f"AUC Score: {auc_score:.4f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred))

# Compare coefficients
print(f"\\nCoefficient Comparison:")
print(f"Statistical model coefficients: {model_logistic_stat.params.values}")
print(f"ML model coefficients: {np.concatenate([[model_logistic_ml.intercept_[0]], model_logistic_ml.coef_[0]])}")

# Visualize decision boundary
def plot_decision_boundary(X, y, model, title):
    h = 0.02
    x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
                         np.arange(y_min, y_max, h))
    
    Z = model.predict_proba(np.c_[xx.ravel(), yy.ravel()])[:, 1]
    Z = Z.reshape(xx.shape)
    
    plt.contourf(xx, yy, Z, levels=50, alpha=0.8, cmap=plt.cm.RdYlBu)
    scatter = plt.scatter(X[:, 0], X[:, 1], c=y, cmap=plt.cm.RdYlBu, edgecolors='black')
    plt.colorbar(scatter)
    plt.title(title)
    plt.xlabel('X1')
    plt.ylabel('X2')

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plot_decision_boundary(X_train.values, y_train.values, model_logistic_ml, 'ML Logistic Regression')

plt.subplot(1, 2, 2)
# Statistical model decision boundary
def stat_predict_proba(X):
    X_with_const = sm.add_constant(X)
    return model_logistic_stat.predict(X_with_const)

# Create a wrapper for the statistical model
class StatModelWrapper:
    def predict_proba(self, X):
        return np.column_stack([1 - stat_predict_proba(X), stat_predict_proba(X)])

stat_wrapper = StatModelWrapper()
plot_decision_boundary(X_train.values, y_train.values, stat_wrapper, 'Statistical Logistic Regression')

plt.tight_layout()
plt.show()
\`\`\`

## Model Selection and Validation

### Cross-Validation Strategies
\`\`\`python
from sklearn.model_selection import KFold, StratifiedKFold, LeaveOneOut
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.svm import SVR, SVC

# Generate more complex data
np.random.seed(42)
n = 300
X_complex = np.random.normal(0, 1, (n, 5))
y_complex = (X_complex[:, 0]**2 + X_complex[:, 1] + 
            0.5*X_complex[:, 2] + np.random.normal(0, 0.5, n))

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_complex, y_complex, test_size=0.3, random_state=42)

# Compare different models
models_comparison = {
    'Linear Regression': LinearRegression(),
    'Ridge Regression': Ridge(alpha=1.0),
    'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),
    'SVR': SVR(kernel='rbf', C=1.0)
}

# Cross-validation comparison
cv_results = {}
cv = KFold(n_splits=5, shuffle=True, random_state=42)

for name, model in models_comparison.items():
    scores = cross_val_score(model, X_train, y_train, cv=cv, scoring='r2')
    cv_results[name] = {
        'Mean R²': scores.mean(),
        'Std R²': scores.std(),
        'Scores': scores
    }

# Display results
cv_df = pd.DataFrame({name: {k: v for k, v in result.items() if k != 'Scores'} 
                     for name, result in cv_results.items()}).T
print("Cross-Validation Results:")
print(cv_df)

# Visualize cross-validation scores
plt.figure(figsize=(12, 6))
plt.boxplot([cv_results[name]['Scores'] for name in cv_results.keys()], 
           labels=list(cv_results.keys()))
plt.title('Cross-Validation R² Scores Distribution')
plt.ylabel('R² Score')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)
plt.show()

# Model selection with different validation strategies
validation_strategies = {
    '5-Fold CV': KFold(n_splits=5, shuffle=True, random_state=42),
    '10-Fold CV': KFold(n_splits=10, shuffle=True, random_state=42),
    'Leave-One-Out': LeaveOneOut()
}

best_models = {}
for strategy_name, cv_strategy in validation_strategies.items():
    best_score = -np.inf
    best_model_name = None
    
    for model_name, model in models_comparison.items():
        if strategy_name == 'Leave-One-Out' and model_name in ['SVR']:
            continue  # Skip slow models for LOO
        
        scores = cross_val_score(model, X_train, y_train, cv=cv_strategy, scoring='r2')
        mean_score = scores.mean()
        
        if mean_score > best_score:
            best_score = mean_score
            best_model_name = model_name
    
    best_models[strategy_name] = {
        'Best Model': best_model_name,
        'Best Score': best_score
    }

print("\\nBest Model by Validation Strategy:")
for strategy, result in best_models.items():
    print(f"{strategy}: {result['Best Model']} (R² = {result['Best Score']:.4f})")
\`\`\`

## Practical Exercise

Integrate statistical and ML approaches:
1. Choose a dataset with both prediction and inference goals
2. Apply statistical modeling for inference
3. Apply ML modeling for prediction
4. Compare and interpret results
5. Combine insights from both approaches
6. Validate model assumptions
7. Make recommendations

## Summary & Next Steps

Integrating statistical and ML approaches provides comprehensive data analysis capabilities. Master both perspectives for robust insights.

**Next up**: Part 12 - Advanced topics and real-world applications.`,
            readTime: 32,
            publishedAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Statistical Modeling', 'Machine Learning', 'Model Selection', 'Cross-Validation']
          },
          {
            id: 'statistics-part-12',
            partNumber: 12,
            title: 'Advanced Topics and Real-World Applications',
            summary: 'Apply statistical knowledge to complex real-world problems and advanced techniques.',
            content: `# Part 12: Advanced Topics and Real-World Applications

Apply your statistical knowledge to complex real-world problems and advanced analytical techniques.

## Causal Inference and Causal Modeling

### Understanding Causation vs. Correlation
- **Correlation**: Statistical association between variables
- **Causation**: One variable directly influences another
- **Confounding**: Variables that affect both treatment and outcome
- **Methods**: Randomized experiments, natural experiments, instrumental variables

### Causal Inference Methods
\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
import statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor
import warnings
warnings.filterwarnings('ignore')

# Generate data with confounding
np.random.seed(42)
n = 1000

# Confounding variable (affects both treatment and outcome)
confounder = np.random.normal(0, 1, n)

# Treatment assignment (affected by confounder)
treatment_prob = 1 / (1 + np.exp(-confounder + np.random.normal(0, 0.5, n)))
treatment = np.random.binomial(1, treatment_prob, n)

# Outcome (affected by both treatment and confounder)
outcome = 2 + 1.5*treatment + 2*confounder + np.random.normal(0, 0.5, n)

# Create DataFrame
causal_data = pd.DataFrame({
    'treatment': treatment,
    'confounder': confounder,
    'outcome': outcome
})

# Naive analysis (ignoring confounder)
naive_model = LinearRegression()
naive_model.fit(causal_data[['treatment']], causal_data['outcome'])
naive_effect = naive_model.coef_[0]

print(f"Naive treatment effect (ignoring confounder): {naive_effect:.3f}")

# Correct analysis (controlling for confounder)
correct_model = LinearRegression()
correct_model.fit(causal_data[['treatment', 'confounder']], causal_data['outcome'])
correct_effect = correct_model.coef_[0]

print(f"Correct treatment effect (controlling for confounder): {correct_effect:.3f}")
print(f"True treatment effect: 1.5")

# Visualize the confounding
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Treatment vs Outcome (naive)
axes[0].scatter(causal_data['treatment'], causal_data['outcome'], alpha=0.6)
axes[0].set_xlabel('Treatment')
axes[0].set_ylabel('Outcome')
axes[0].set_title('Naive Analysis: Treatment vs Outcome')
axes[0].grid(True, alpha=0.3)

# Confounder vs Treatment
axes[1].scatter(causal_data['confounder'], causal_data['treatment'], alpha=0.6)
axes[1].set_xlabel('Confounder')
axes[1].set_ylabel('Treatment')
axes[1].set_title('Confounder vs Treatment')
axes[1].grid(True, alpha=0.3)

# Confounder vs Outcome
axes[2].scatter(causal_data['confounder'], causal_data['outcome'], alpha=0.6)
axes[2].set_xlabel('Confounder')
axes[2].set_ylabel('Outcome')
axes[2].set_title('Confounder vs Outcome')
axes[2].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Propensity Score Matching (simplified)
def propensity_score_matching(data, treatment_col, outcome_col, confounders):
    """Simple propensity score matching"""
    # Calculate propensity scores
    X = data[confounders]
    y = data[treatment_col]
    
    ps_model = LinearRegression()
    ps_model.fit(X, y)
    propensity_scores = ps_model.predict(X)
    
    data['propensity_score'] = propensity_scores
    
    # Simple matching (nearest neighbor)
    treated = data[data[treatment_col] == 1]
    control = data[data[treatment_col] == 0]
    
    matched_pairs = []
    for _, treated_row in treated.iterrows():
        # Find closest control unit
        distances = np.abs(control['propensity_score'] - treated_row['propensity_score'])
        closest_idx = distances.idxmin()
        matched_pairs.append((treated_row.name, closest_idx))
    
    return matched_pairs, data

# Apply propensity score matching
matched_pairs, data_with_ps = propensity_score_matching(
    causal_data, 'treatment', 'outcome', ['confounder']
)

# Calculate treatment effect using matched pairs
matched_outcomes = []
for treated_idx, control_idx in matched_pairs:
    treated_outcome = data_with_ps.loc[treated_idx, 'outcome']
    control_outcome = data_with_ps.loc[control_idx, 'outcome']
    matched_outcomes.append(treated_outcome - control_outcome)

ps_effect = np.mean(matched_outcomes)
print(f"\\nPropensity Score Matching effect: {ps_effect:.3f}")
\`\`\`

## High-Dimensional Statistics

### Dimensionality Reduction and Feature Selection
\`\`\`python
from sklearn.decomposition import PCA
from sklearn.feature_selection import SelectKBest, f_regression, mutual_info_regression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

# Generate high-dimensional data
np.random.seed(42)
n_samples = 200
n_features = 50

# Create data with some relevant features and noise
X_high_dim = np.random.normal(0, 1, (n_samples, n_features))
# Only first 5 features are relevant
true_coefs = np.zeros(n_features)
true_coefs[:5] = [2, 1.5, 1, 0.8, 0.5]
y_high_dim = X_high_dim @ true_coefs + np.random.normal(0, 0.5, n_samples)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_high_dim, y_high_dim, test_size=0.3, random_state=42)

# Standardize features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# PCA analysis
pca = PCA()
pca.fit(X_train_scaled)

# Plot explained variance ratio
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(range(1, min(20, n_features) + 1), pca.explained_variance_ratio_[:20], 'bo-')
plt.xlabel('Principal Component')
plt.ylabel('Explained Variance Ratio')
plt.title('PCA: Explained Variance by Component')
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
cumulative_variance = np.cumsum(pca.explained_variance_ratio_)
plt.plot(range(1, min(20, n_features) + 1), cumulative_variance[:20], 'ro-')
plt.axhline(y=0.95, color='g', linestyle='--', label='95% Variance')
plt.xlabel('Number of Components')
plt.ylabel('Cumulative Explained Variance')
plt.title('PCA: Cumulative Explained Variance')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Feature selection methods
feature_selectors = {
    'F-test': SelectKBest(score_func=f_regression, k=10),
    'Mutual Information': SelectKBest(score_func=mutual_info_regression, k=10)
}

feature_selection_results = {}
for name, selector in feature_selectors.items():
    X_selected = selector.fit_transform(X_train_scaled, y_train)
    selected_features = selector.get_support(indices=True)
    
    # Train model on selected features
    model = LinearRegression()
    model.fit(X_selected, y_train)
    
    # Test on selected features
    X_test_selected = selector.transform(X_test_scaled)
    y_pred = model.predict(X_test_selected)
    
    r2 = r2_score(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    
    feature_selection_results[name] = {
        'Selected Features': selected_features,
        'R²': r2,
        'RMSE': rmse
    }

print("Feature Selection Results:")
for name, result in feature_selection_results.items():
    print(f"\\n{name}:")
    print(f"  Selected features: {result['Selected Features']}")
    print(f"  R²: {result['R²']:.4f}")
    print(f"  RMSE: {result['RMSE']:.4f}")

# Compare with PCA
n_components = 10
pca_reduced = PCA(n_components=n_components)
X_train_pca = pca_reduced.fit_transform(X_train_scaled)
X_test_pca = pca_reduced.transform(X_test_scaled)

pca_model = LinearRegression()
pca_model.fit(X_train_pca, y_train)
y_pred_pca = pca_model.predict(X_test_pca)

pca_r2 = r2_score(y_test, y_pred_pca)
pca_rmse = np.sqrt(mean_squared_error(y_test, y_pred_pca))

print(f"\\nPCA Results ({n_components} components):")
print(f"  R²: {pca_r2:.4f}")
print(f"  RMSE: {pca_rmse:.4f}")
\`\`\`

## Bayesian Machine Learning

### Bayesian Neural Networks and Gaussian Processes
\`\`\`python
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import RBF, WhiteKernel
from sklearn.neural_network import MLPRegressor

# Generate non-linear data
np.random.seed(42)
n = 100
x = np.linspace(-3, 3, n).reshape(-1, 1)
y = np.sin(x.flatten()) + 0.1 * np.random.normal(0, 1, n)

# Split data
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=42)

# Gaussian Process Regression
kernel = RBF(length_scale=1.0) + WhiteKernel(noise_level=0.1)
gp = GaussianProcessRegressor(kernel=kernel, random_state=42)
gp.fit(X_train, y_train)

# Predictions with uncertainty
y_pred_gp, y_std_gp = gp.predict(X_test, return_std=True)

# Neural Network (for comparison)
nn = MLPRegressor(hidden_layer_sizes=(50, 50), random_state=42, max_iter=1000)
nn.fit(X_train, y_train)
y_pred_nn = nn.predict(X_test)

# Visualize results
plt.figure(figsize=(15, 5))

# Training data and true function
x_true = np.linspace(-3, 3, 200)
y_true = np.sin(x_true)

plt.subplot(1, 3, 1)
plt.scatter(X_train, y_train, alpha=0.6, label='Training Data')
plt.plot(x_true, y_true, 'r-', label='True Function')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Training Data and True Function')
plt.legend()
plt.grid(True, alpha=0.3)

# Gaussian Process predictions
plt.subplot(1, 3, 2)
plt.scatter(X_test, y_test, alpha=0.6, label='Test Data')
plt.scatter(X_test, y_pred_gp, alpha=0.8, label='GP Predictions')
plt.fill_between(X_test.flatten(), 
                y_pred_gp - 2*y_std_gp, 
                y_pred_gp + 2*y_std_gp, 
                alpha=0.3, label='95% Confidence Interval')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Gaussian Process Regression')
plt.legend()
plt.grid(True, alpha=0.3)

# Neural Network predictions
plt.subplot(1, 3, 3)
plt.scatter(X_test, y_test, alpha=0.6, label='Test Data')
plt.scatter(X_test, y_pred_nn, alpha=0.8, label='NN Predictions')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Neural Network Regression')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Performance comparison
gp_r2 = r2_score(y_test, y_pred_gp)
gp_rmse = np.sqrt(mean_squared_error(y_test, y_pred_gp))

nn_r2 = r2_score(y_test, y_pred_nn)
nn_rmse = np.sqrt(mean_squared_error(y_test, y_pred_nn))

print("Model Comparison:")
print(f"Gaussian Process - R²: {gp_r2:.4f}, RMSE: {gp_rmse:.4f}")
print(f"Neural Network - R²: {nn_r2:.4f}, RMSE: {nn_rmse:.4f}")

# Uncertainty quantification
print(f"\\nUncertainty Analysis:")
print(f"GP Mean Uncertainty: {np.mean(y_std_gp):.4f}")
print(f"GP Max Uncertainty: {np.max(y_std_gp):.4f}")
print(f"GP Min Uncertainty: {np.min(y_std_gp):.4f}")
\`\`\`

## Real-World Case Study: Customer Churn Analysis

### Comprehensive Statistical Analysis
\`\`\`python
# Generate realistic customer churn data
np.random.seed(42)
n_customers = 5000

# Customer features
tenure = np.random.exponential(24, n_customers)  # months
monthly_charges = np.random.normal(65, 20, n_customers)
total_charges = tenure * monthly_charges + np.random.normal(0, 100, n_customers)
contract_type = np.random.choice(['Month-to-month', 'One year', 'Two year'], 
                                n_customers, p=[0.55, 0.21, 0.24])
internet_service = np.random.choice(['DSL', 'Fiber optic', 'No'], 
                                  n_customers, p=[0.34, 0.44, 0.22])

# Churn probability based on features
churn_prob = (0.1 + 
              0.3 * (contract_type == 'Month-to-month') +
              0.2 * (internet_service == 'Fiber optic') +
              0.001 * (monthly_charges - 65) +
              -0.01 * (tenure - 24) +
              np.random.normal(0, 0.1, n_customers))

churn_prob = np.clip(churn_prob, 0, 1)
churn = np.random.binomial(1, churn_prob, n_customers)

# Create DataFrame
churn_data = pd.DataFrame({
    'tenure': tenure,
    'monthly_charges': monthly_charges,
    'total_charges': total_charges,
    'contract_type': contract_type,
    'internet_service': internet_service,
    'churn': churn
})

print("Customer Churn Dataset:")
print(churn_data.head())
print(f"\\nChurn Rate: {churn_data['churn'].mean():.3f}")

# Exploratory Data Analysis
fig, axes = plt.subplots(2, 3, figsize=(18, 12))

# Tenure distribution
axes[0, 0].hist(churn_data['tenure'], bins=30, alpha=0.7)
axes[0, 0].set_title('Tenure Distribution')
axes[0, 0].set_xlabel('Tenure (months)')
axes[0, 0].set_ylabel('Frequency')

# Monthly charges by churn
churn_data.boxplot(column='monthly_charges', by='churn', ax=axes[0, 1])
axes[0, 1].set_title('Monthly Charges by Churn Status')

# Contract type by churn
contract_churn = pd.crosstab(churn_data['contract_type'], churn_data['churn'])
contract_churn.plot(kind='bar', ax=axes[0, 2])
axes[0, 2].set_title('Churn by Contract Type')
axes[0, 2].legend(['No Churn', 'Churn'])

# Internet service by churn
internet_churn = pd.crosstab(churn_data['internet_service'], churn_data['churn'])
internet_churn.plot(kind='bar', ax=axes[1, 0])
axes[1, 0].set_title('Churn by Internet Service')
axes[1, 0].legend(['No Churn', 'Churn'])

# Tenure vs Monthly Charges colored by churn
scatter = axes[1, 1].scatter(churn_data['tenure'], churn_data['monthly_charges'], 
                           c=churn_data['churn'], cmap='RdYlBu', alpha=0.6)
axes[1, 1].set_title('Tenure vs Monthly Charges')
axes[1, 1].set_xlabel('Tenure (months)')
axes[1, 1].set_ylabel('Monthly Charges')
plt.colorbar(scatter, ax=axes[1, 1])

# Total charges distribution
axes[1, 2].hist(churn_data['total_charges'], bins=30, alpha=0.7)
axes[1, 2].set_title('Total Charges Distribution')
axes[1, 2].set_xlabel('Total Charges')
axes[1, 2].set_ylabel('Frequency')

plt.tight_layout()
plt.show()

# Statistical Analysis
# Prepare data for modeling
churn_encoded = pd.get_dummies(churn_data, columns=['contract_type', 'internet_service'])
X_churn = churn_encoded.drop('churn', axis=1)
y_churn = churn_encoded['churn']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_churn, y_churn, test_size=0.3, random_state=42)

# Logistic Regression
logistic_model = LogisticRegression(random_state=42)
logistic_model.fit(X_train, y_train)

# Predictions
y_pred_proba = logistic_model.predict_proba(X_test)[:, 1]
y_pred = logistic_model.predict(X_test)

# Performance metrics
from sklearn.metrics import roc_auc_score, precision_recall_curve, roc_curve

auc_score = roc_auc_score(y_test, y_pred_proba)
print(f"\\nLogistic Regression Results:")
print(f"AUC Score: {auc_score:.4f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred))

# Feature importance
feature_importance = pd.DataFrame({
    'feature': X_churn.columns,
    'coefficient': logistic_model.coef_[0]
}).sort_values('coefficient', key=abs, ascending=False)

print("\\nFeature Importance (Logistic Regression):")
print(feature_importance)

# ROC Curve
fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, label=f'ROC Curve (AUC = {auc_score:.3f})')
plt.plot([0, 1], [0, 1], 'k--', label='Random Classifier')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve - Customer Churn Prediction')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

# Business insights
print("\\nBusiness Insights:")
print("1. Key factors driving churn:")
for _, row in feature_importance.head(5).iterrows():
    direction = "increases" if row['coefficient'] > 0 else "decreases"
    print(f"   - {row['feature']}: {direction} churn probability")

print("\\n2. Recommendations:")
print("   - Focus on month-to-month contract customers")
print("   - Review pricing strategy for high monthly charges")
print("   - Implement retention programs for new customers")
print("   - Monitor fiber optic service customers closely")
\`\`\`

## Practical Exercise

Apply advanced statistical techniques:
1. Choose a complex real-world problem
2. Perform comprehensive exploratory analysis
3. Apply multiple statistical and ML methods
4. Compare model performance
5. Interpret results in business context
6. Provide actionable recommendations
7. Document methodology and limitations

## Summary & Next Steps

You've completed the Statistics Mastery series! You now have comprehensive knowledge of:
- Descriptive and inferential statistics
- Hypothesis testing and confidence intervals
- Regression analysis and modeling
- Experimental design and A/B testing
- Bayesian statistics and advanced methods
- Integration with machine learning
- Real-world applications

Continue practicing with real datasets and stay updated with the latest statistical methods and tools.

**Congratulations on completing Statistics Mastery!**`,
            readTime: 40,
            publishedAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Causal Inference', 'High-Dimensional Data', 'Bayesian ML', 'Real-World Applications']
          }
          // Additional episodes would continue here...
        ]
      },
      'machine-learning': {
        id: 'machine-learning',
        title: 'Machine Learning Mastery: From Theory to Practice',
        description: 'Complete machine learning series covering algorithms, model training, and deployment.',
        totalEpisodes: 12,
        estimatedDuration: '12 weeks',
        difficulty: 'Intermediate',
        category: 'ml',
        prerequisites: ['Python programming', 'Statistics knowledge', 'Linear algebra basics'],
        learningOutcomes: [
          'Master ML algorithms and techniques',
          'Build and train ML models',
          'Evaluate model performance',
          'Deploy ML solutions',
          'Apply ML to real-world problems'
        ],
        episodes: [
          {
            id: 'ml-part-1',
            partNumber: 1,
            title: 'Introduction to Machine Learning',
            summary: 'Learn the fundamentals of machine learning and its applications in data analysis.',
            content: `# Part 1: Introduction to Machine Learning

Welcome to Machine Learning Mastery! This series will transform you into an ML expert.

## What is Machine Learning?

### Definition
- **Machine Learning**: Algorithms that learn patterns from data
- **Goal**: Make predictions or decisions without explicit programming
- **Difference from Traditional Programming**: Learn from examples rather than rules

### Types of Machine Learning

#### Supervised Learning
- **Definition**: Learn from labeled examples
- **Tasks**: Classification, regression
- **Examples**: Email spam detection, house price prediction

#### Unsupervised Learning
- **Definition**: Find patterns in unlabeled data
- **Tasks**: Clustering, dimensionality reduction
- **Examples**: Customer segmentation, anomaly detection

#### Reinforcement Learning
- **Definition**: Learn through interaction and feedback
- **Tasks**: Decision making, optimization
- **Examples**: Game playing, autonomous vehicles

## Machine Learning Workflow

### 1. Problem Definition
- **Business Understanding**: What problem are we solving?
- **Success Metrics**: How do we measure success?
- **Data Requirements**: What data do we need?

### 2. Data Collection and Preparation
- **Data Sources**: Databases, APIs, files
- **Data Cleaning**: Handle missing values, outliers
- **Feature Engineering**: Create relevant features

### 3. Model Training
- **Algorithm Selection**: Choose appropriate algorithms
- **Training Process**: Learn from training data
- **Validation**: Test on unseen data

### 4. Model Evaluation
- **Performance Metrics**: Accuracy, precision, recall
- **Cross-Validation**: Robust performance estimation
- **Error Analysis**: Understand model limitations

### 5. Model Deployment
- **Production Environment**: Deploy to real systems
- **Monitoring**: Track performance over time
- **Maintenance**: Update and improve models

## Common ML Algorithms

### Supervised Learning Algorithms
- **Linear Regression**: Predicting continuous values
- **Logistic Regression**: Binary classification
- **Decision Trees**: Rule-based classification
- **Random Forest**: Ensemble of decision trees
- **Support Vector Machines**: High-dimensional classification
- **Neural Networks**: Deep learning models

### Unsupervised Learning Algorithms
- **K-Means Clustering**: Group similar data points
- **Hierarchical Clustering**: Tree-based clustering
- **PCA**: Dimensionality reduction
- **DBSCAN**: Density-based clustering

## ML Tools and Libraries

### Python Libraries
- **Scikit-learn**: General ML algorithms
- **TensorFlow**: Deep learning framework
- **PyTorch**: Dynamic neural networks
- **Pandas**: Data manipulation
- **NumPy**: Numerical computing

### Cloud Platforms
- **AWS SageMaker**: Amazon's ML platform
- **Azure ML**: Microsoft's ML service
- **Google Cloud AI**: Google's ML tools
- **Databricks**: Unified analytics platform

## Practical Exercise

Set up your ML environment:
1. Install Python and required libraries
2. Load and explore a sample dataset
3. Perform basic data preprocessing
4. Train your first ML model
5. Evaluate the model performance

## Summary & Next Steps

Machine learning is a powerful tool for data analysis. Understanding the fundamentals is essential for success.

**Next up**: Part 2 - Data preprocessing and feature engineering.`,
            readTime: 20,
            publishedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Machine Learning Fundamentals', 'ML Types', 'ML Workflow', 'ML Algorithms']
          },
          {
            id: 'ml-part-2',
            partNumber: 2,
            title: 'Data Preprocessing and Feature Engineering',
            summary: 'Master data preprocessing techniques and feature engineering for better ML models.',
            content: `# Part 2: Data Preprocessing and Feature Engineering

Data quality is crucial for ML success. Learn to prepare your data effectively.

## Data Preprocessing

### Handling Missing Data
- **Detection**: Identify missing values
- **Strategies**: 
  - Deletion: Remove rows/columns with missing values
  - Imputation: Fill missing values (mean, median, mode)
  - Advanced: Use ML models to predict missing values

### Outlier Detection and Treatment
- **Detection Methods**:
  - Statistical: Z-score, IQR method
  - Visual: Box plots, scatter plots
  - ML-based: Isolation Forest, One-Class SVM

- **Treatment Options**:
  - Removal: Delete outlier records
  - Transformation: Log, square root transformations
  - Capping: Limit extreme values

### Data Scaling and Normalization
- **Standardization**: (x - mean) / std
- **Min-Max Scaling**: (x - min) / (max - min)
- **Robust Scaling**: (x - median) / IQR
- **Normalization**: Scale to unit length

## Feature Engineering

### Creating New Features
- **Mathematical Operations**: Sum, difference, ratio
- **Binning**: Convert continuous to categorical
- **Polynomial Features**: Create interaction terms
- **Domain Knowledge**: Business-specific features

### Categorical Encoding
- **Label Encoding**: Convert to integers
- **One-Hot Encoding**: Binary columns for each category
- **Target Encoding**: Use target variable statistics
- **Embedding**: Learn dense representations

### Feature Selection
- **Filter Methods**: Statistical tests, correlation
- **Wrapper Methods**: Forward/backward selection
- **Embedded Methods**: L1 regularization, tree-based
- **Dimensionality Reduction**: PCA, LDA

## Text Data Preprocessing

### Text Cleaning
- **Lowercasing**: Convert to lowercase
- **Removing Punctuation**: Clean special characters
- **Tokenization**: Split into words/tokens
- **Stop Word Removal**: Remove common words

### Text Vectorization
- **Bag of Words**: Count word frequencies
- **TF-IDF**: Term frequency-inverse document frequency
- **Word Embeddings**: Word2Vec, GloVe
- **Character-level**: Character n-grams

## Time Series Preprocessing

### Time-based Features
- **Date Components**: Year, month, day, hour
- **Lag Features**: Previous time period values
- **Rolling Statistics**: Moving averages, standard deviations
- **Seasonal Decomposition**: Trend, seasonal, residual

### Handling Time Series Issues
- **Missing Values**: Forward fill, interpolation
- **Irregular Frequencies**: Resampling, alignment
- **Stationarity**: Differencing, detrending

## Practical Exercise

Preprocess a real dataset:
1. Load and explore the data
2. Handle missing values and outliers
3. Create new features
4. Encode categorical variables
5. Scale numerical features
6. Split into train/test sets

## Summary & Next Steps

Data preprocessing is crucial for ML success. Good features lead to better models.

**Next up**: Part 3 - Supervised learning algorithms and implementation.`,
            readTime: 22,
            publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Data Preprocessing', 'Feature Engineering', 'Missing Data', 'Feature Selection']
          },
          {
            id: 'ml-part-3',
            partNumber: 3,
            title: 'Supervised Learning Algorithms',
            summary: 'Master supervised learning algorithms for classification and regression tasks.',
            content: `# Part 3: Supervised Learning Algorithms

Learn the most important supervised learning algorithms for real-world machine learning applications.

## Linear Models

### Linear Regression
\`\`\`python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Create and train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse:.2f}")
print(f"R² Score: {r2:.2f}")
\`\`\`

### Logistic Regression
\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# Create and train model
model = LogisticRegression(random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)
y_pred_proba = model.predict_proba(X_test)

# Evaluate model
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.3f}")
print(classification_report(y_test, y_pred))
\`\`\`

## Tree-Based Models

### Decision Trees
\`\`\`python
from sklearn.tree import DecisionTreeClassifier, plot_tree
import matplotlib.pyplot as plt

# Create and train model
model = DecisionTreeClassifier(
    max_depth=5,
    min_samples_split=20,
    min_samples_leaf=10,
    random_state=42
)
model.fit(X_train, y_train)

# Visualize tree
plt.figure(figsize=(15, 10))
plot_tree(model, feature_names=feature_names, class_names=class_names, filled=True)
plt.show()

# Feature importance
feature_importance = model.feature_importances_
for name, importance in zip(feature_names, feature_importance):
    print(f"{name}: {importance:.3f}")
\`\`\`

### Random Forest
\`\`\`python
from sklearn.ensemble import RandomForestClassifier

# Create and train model
model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42
)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Feature importance
feature_importance = model.feature_importances_
\`\`\`

### Gradient Boosting
\`\`\`python
from sklearn.ensemble import GradientBoostingClassifier

# Create and train model
model = GradientBoostingClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3,
    random_state=42
)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)
\`\`\`

## Support Vector Machines

### SVM for Classification
\`\`\`python
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler

# Scale features (important for SVM)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Create and train model
model = SVC(
    kernel='rbf',
    C=1.0,
    gamma='scale',
    random_state=42
)
model.fit(X_train_scaled, y_train)

# Make predictions
y_pred = model.predict(X_test_scaled)
\`\`\`

### SVM for Regression
\`\`\`python
from sklearn.svm import SVR

# Create and train model
model = SVR(
    kernel='rbf',
    C=1.0,
    gamma='scale'
)
model.fit(X_train_scaled, y_train)

# Make predictions
y_pred = model.predict(X_test_scaled)
\`\`\`

## Naive Bayes

### Gaussian Naive Bayes
\`\`\`python
from sklearn.naive_bayes import GaussianNB

# Create and train model
model = GaussianNB()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)
y_pred_proba = model.predict_proba(X_test)
\`\`\`

### Multinomial Naive Bayes
\`\`\`python
from sklearn.naive_bayes import MultinomialNB

# For text classification
model = MultinomialNB(alpha=1.0)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)
\`\`\`

## K-Nearest Neighbors

### KNN Classification
\`\`\`python
from sklearn.neighbors import KNeighborsClassifier

# Create and train model
model = KNeighborsClassifier(
    n_neighbors=5,
    weights='distance',
    metric='euclidean'
)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)
\`\`\`

### KNN Regression
\`\`\`python
from sklearn.neighbors import KNeighborsRegressor

# Create and train model
model = KNeighborsRegressor(
    n_neighbors=5,
    weights='distance'
)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)
\`\`\`

## Model Selection and Hyperparameter Tuning

### Grid Search
\`\`\`python
from sklearn.model_selection import GridSearchCV

# Define parameter grid
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [3, 5, 10],
    'min_samples_split': [2, 5, 10]
}

# Create model
model = RandomForestClassifier(random_state=42)

# Grid search
grid_search = GridSearchCV(
    model,
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1
)
grid_search.fit(X_train, y_train)

# Best parameters
print(f"Best parameters: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_:.3f}")

# Use best model
best_model = grid_search.best_estimator_
y_pred = best_model.predict(X_test)
\`\`\`

### Random Search
\`\`\`python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint, uniform

# Define parameter distributions
param_dist = {
    'n_estimators': randint(50, 200),
    'max_depth': randint(3, 15),
    'min_samples_split': randint(2, 20),
    'min_samples_leaf': randint(1, 10)
}

# Random search
random_search = RandomizedSearchCV(
    model,
    param_dist,
    n_iter=50,
    cv=5,
    scoring='accuracy',
    random_state=42,
    n_jobs=-1
)
random_search.fit(X_train, y_train)
\`\`\`

## Model Evaluation

### Cross-Validation
\`\`\`python
from sklearn.model_selection import cross_val_score

# Perform cross-validation
scores = cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy')

print(f"Cross-validation scores: {scores}")
print(f"Mean score: {scores.mean():.3f} (+/- {scores.std() * 2:.3f})")
\`\`\`

### Learning Curves
\`\`\`python
from sklearn.model_selection import learning_curve
import matplotlib.pyplot as plt

# Generate learning curves
train_sizes, train_scores, val_scores = learning_curve(
    model, X_train, y_train, cv=5, n_jobs=-1,
    train_sizes=np.linspace(0.1, 1.0, 10)
)

# Plot learning curves
plt.figure(figsize=(10, 6))
plt.plot(train_sizes, train_scores.mean(axis=1), 'o-', label='Training score')
plt.plot(train_sizes, val_scores.mean(axis=1), 'o-', label='Validation score')
plt.xlabel('Training set size')
plt.ylabel('Score')
plt.legend()
plt.show()
\`\`\`

## Practical Exercise

Build and compare multiple models:
1. Load and preprocess a dataset
2. Split into train/test sets
3. Train different algorithms
4. Tune hyperparameters
5. Evaluate model performance
6. Compare results
7. Select the best model

## Summary & Next Steps

Supervised learning algorithms are the foundation of machine learning. Master these techniques for classification and regression tasks.

**Next up**: Part 4 - Unsupervised learning and clustering.`,
            readTime: 22,
            publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Supervised Learning', 'Linear Models', 'Tree Models', 'SVM']
          },
          {
            id: 'ml-part-4',
            partNumber: 4,
            title: 'Unsupervised Learning and Clustering',
            summary: 'Master unsupervised learning techniques for pattern discovery and data exploration.',
            content: `# Part 4: Unsupervised Learning and Clustering

Discover hidden patterns in data using unsupervised learning techniques.

## Clustering Fundamentals

### What is Clustering?
- **Purpose**: Group similar data points together
- **Applications**: Customer segmentation, anomaly detection, data compression
- **Types**: Partitional, hierarchical, density-based
- **Challenges**: Determining optimal number of clusters

### Distance Metrics
\`\`\`python
from scipy.spatial.distance import pdist, squareform
import numpy as np

# Euclidean distance
def euclidean_distance(x, y):
    return np.sqrt(np.sum((x - y) ** 2))

# Manhattan distance
def manhattan_distance(x, y):
    return np.sum(np.abs(x - y))

# Cosine similarity
def cosine_similarity(x, y):
    return np.dot(x, y) / (np.linalg.norm(x) * np.linalg.norm(y))

# Example
data = np.array([[1, 2], [3, 4], [5, 6]])
distances = pdist(data, metric='euclidean')
distance_matrix = squareform(distances)
print(distance_matrix)
\`\`\`

## K-Means Clustering

### Basic K-Means
\`\`\`python
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Create and fit model
kmeans = KMeans(n_clusters=3, random_state=42)
kmeans.fit(X)

# Get cluster labels and centers
labels = kmeans.labels_
centers = kmeans.cluster_centers_

# Visualize clusters
plt.figure(figsize=(10, 6))
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis')
plt.scatter(centers[:, 0], centers[:, 1], c='red', marker='x', s=200)
plt.title('K-Means Clustering')
plt.show()
\`\`\`

### Determining Optimal K
\`\`\`python
# Elbow method
inertias = []
K_range = range(1, 11)

for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X)
    inertias.append(kmeans.inertia_)

# Plot elbow curve
plt.figure(figsize=(10, 6))
plt.plot(K_range, inertias, 'bo-')
plt.xlabel('Number of Clusters (K)')
plt.ylabel('Inertia')
plt.title('Elbow Method for Optimal K')
plt.show()
\`\`\`

### Silhouette Analysis
\`\`\`python
from sklearn.metrics import silhouette_score, silhouette_samples

# Calculate silhouette scores
silhouette_scores = []
for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    labels = kmeans.fit_predict(X)
    score = silhouette_score(X, labels)
    silhouette_scores.append(score)

# Plot silhouette scores
plt.figure(figsize=(10, 6))
plt.plot(K_range, silhouette_scores, 'bo-')
plt.xlabel('Number of Clusters (K)')
plt.ylabel('Silhouette Score')
plt.title('Silhouette Analysis')
plt.show()
\`\`\`

## Hierarchical Clustering

### Agglomerative Clustering
\`\`\`python
from sklearn.cluster import AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram, linkage

# Perform hierarchical clustering
linkage_matrix = linkage(X, method='ward')

# Plot dendrogram
plt.figure(figsize=(12, 8))
dendrogram(linkage_matrix, truncate_mode='level', p=5)
plt.title('Hierarchical Clustering Dendrogram')
plt.xlabel('Sample Index')
plt.ylabel('Distance')
plt.show()

# Create clusters
cluster = AgglomerativeClustering(n_clusters=3, linkage='ward')
labels = cluster.fit_predict(X)
\`\`\`

### Different Linkage Methods
\`\`\`python
# Compare linkage methods
linkage_methods = ['ward', 'complete', 'average', 'single']

fig, axes = plt.subplots(2, 2, figsize=(15, 12))
axes = axes.ravel()

for i, method in enumerate(linkage_methods):
    linkage_matrix = linkage(X, method=method)
    dendrogram(linkage_matrix, ax=axes[i], truncate_mode='level', p=5)
    axes[i].set_title(f'Dendrogram - {method.title()} Linkage')
    axes[i].set_xlabel('Sample Index')
    axes[i].set_ylabel('Distance')

plt.tight_layout()
plt.show()
\`\`\`

## DBSCAN Clustering

### Density-Based Clustering
\`\`\`python
from sklearn.cluster import DBSCAN

# Create and fit model
dbscan = DBSCAN(eps=0.5, min_samples=5)
labels = dbscan.fit_predict(X)

# Number of clusters
n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
n_noise = list(labels).count(-1)

print(f'Number of clusters: {n_clusters}')
print(f'Number of noise points: {n_noise}')

# Visualize clusters
plt.figure(figsize=(10, 6))
unique_labels = set(labels)
colors = plt.cm.Spectral(np.linspace(0, 1, len(unique_labels)))

for k, col in zip(unique_labels, colors):
    if k == -1:
        col = 'black'  # Noise points
    class_member_mask = (labels == k)
    xy = X[class_member_mask]
    plt.scatter(xy[:, 0], xy[:, 1], c=[col], marker='o', s=50)

plt.title('DBSCAN Clustering')
plt.show()
\`\`\`

### Parameter Tuning for DBSCAN
\`\`\`python
from sklearn.neighbors import NearestNeighbors

# Find optimal eps using k-distance graph
neighbors = NearestNeighbors(n_neighbors=5)
neighbors_fit = neighbors.fit(X)
distances, indices = neighbors_fit.kneighbors(X)

# Sort distances
distances = np.sort(distances[:, 4], axis=0)

# Plot k-distance graph
plt.figure(figsize=(10, 6))
plt.plot(distances)
plt.xlabel('Points')
plt.ylabel('5th Nearest Neighbor Distance')
plt.title('K-Distance Graph for DBSCAN')
plt.show()
\`\`\`

## Gaussian Mixture Models

### GMM Clustering
\`\`\`python
from sklearn.mixture import GaussianMixture

# Create and fit model
gmm = GaussianMixture(n_components=3, random_state=42)
gmm.fit(X)

# Get cluster labels and probabilities
labels = gmm.predict(X)
probabilities = gmm.predict_proba(X)

# Visualize clusters
plt.figure(figsize=(10, 6))
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis', alpha=0.7)
plt.title('Gaussian Mixture Model Clustering')
plt.show()
\`\`\`

### Model Selection for GMM
\`\`\`python
# AIC and BIC for model selection
aic_scores = []
bic_scores = []
n_components_range = range(1, 11)

for n_components in n_components_range:
    gmm = GaussianMixture(n_components=n_components, random_state=42)
    gmm.fit(X)
    aic_scores.append(gmm.aic(X))
    bic_scores.append(gmm.bic(X))

# Plot AIC and BIC
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(n_components_range, aic_scores, 'bo-')
plt.xlabel('Number of Components')
plt.ylabel('AIC')
plt.title('AIC for GMM')

plt.subplot(1, 2, 2)
plt.plot(n_components_range, bic_scores, 'ro-')
plt.xlabel('Number of Components')
plt.ylabel('BIC')
plt.title('BIC for GMM')

plt.tight_layout()
plt.show()
\`\`\`

## Clustering Evaluation

### Internal Validation Metrics
\`\`\`python
from sklearn.metrics import adjusted_rand_score, normalized_mutual_info_score

# Compare clustering results
def evaluate_clustering(X, labels_true, labels_pred):
    ari = adjusted_rand_score(labels_true, labels_pred)
    nmi = normalized_mutual_info_score(labels_true, labels_pred)
    silhouette = silhouette_score(X, labels_pred)
    
    return {
        'ARI': ari,
        'NMI': nmi,
        'Silhouette': silhouette
    }

# Example evaluation
results = evaluate_clustering(X, true_labels, predicted_labels)
for metric, score in results.items():
    print(f"{metric}: {score:.3f}")
\`\`\`

## Dimensionality Reduction

### Principal Component Analysis (PCA)
\`\`\`python
from sklearn.decomposition import PCA

# Apply PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# Explained variance ratio
print(f"Explained variance ratio: {pca.explained_variance_ratio_}")
print(f"Cumulative explained variance: {np.cumsum(pca.explained_variance_ratio_)}")

# Visualize in reduced dimensions
plt.figure(figsize=(10, 6))
plt.scatter(X_pca[:, 0], X_pca[:, 1], c=labels, cmap='viridis')
plt.xlabel('First Principal Component')
plt.ylabel('Second Principal Component')
plt.title('PCA Visualization')
plt.show()
\`\`\`

### t-SNE
\`\`\`python
from sklearn.manifold import TSNE

# Apply t-SNE
tsne = TSNE(n_components=2, random_state=42)
X_tsne = tsne.fit_transform(X)

# Visualize
plt.figure(figsize=(10, 6))
plt.scatter(X_tsne[:, 0], X_tsne[:, 1], c=labels, cmap='viridis')
plt.xlabel('t-SNE Component 1')
plt.ylabel('t-SNE Component 2')
plt.title('t-SNE Visualization')
plt.show()
\`\`\`

## Practical Exercise

Apply clustering to real data:
1. Load and explore a dataset
2. Preprocess the data
3. Apply different clustering algorithms
4. Determine optimal number of clusters
5. Evaluate clustering quality
6. Visualize results
7. Interpret findings

## Summary & Next Steps

Unsupervised learning reveals hidden patterns in data. Master these techniques for data exploration and pattern discovery.

**Next up**: Part 5 - Model evaluation and validation techniques.`,
            readTime: 25,
            publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Unsupervised Learning', 'Clustering', 'K-Means', 'DBSCAN']
          },
          {
            id: 'ml-part-5',
            partNumber: 5,
            title: 'Model Evaluation and Validation',
            summary: 'Master techniques for evaluating and validating machine learning models effectively.',
            content: `# Part 5: Model Evaluation and Validation

Learn comprehensive techniques for evaluating and validating machine learning models to ensure reliable performance.

## Evaluation Metrics for Classification

### Accuracy and Confusion Matrix
\`\`\`python
import numpy as np
from sklearn.metrics import confusion_matrix, accuracy_score, classification_report
import matplotlib.pyplot as plt
import seaborn as sns

# Generate sample predictions and true labels
y_true = np.array([0, 1, 1, 0, 1, 0, 1, 1, 0, 1])
y_pred = np.array([0, 1, 0, 0, 1, 1, 1, 1, 0, 1])

# Calculate accuracy
accuracy = accuracy_score(y_true, y_pred)
print(f"Accuracy: {accuracy:.3f}")

# Confusion Matrix
cm = confusion_matrix(y_true, y_pred)
print("Confusion Matrix:")
print(cm)

# Visualize confusion matrix
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
            xticklabels=['Predicted 0', 'Predicted 1'],
            yticklabels=['Actual 0', 'Actual 1'])
plt.title('Confusion Matrix')
plt.ylabel('True Label')
plt.xlabel('Predicted Label')
plt.show()

# Detailed classification report
print("\\nClassification Report:")
print(classification_report(y_true, y_pred))
\`\`\`

### Precision, Recall, and F1-Score
\`\`\`python
from sklearn.metrics import precision_score, recall_score, f1_score, precision_recall_curve
from sklearn.metrics import roc_curve, auc

# Calculate precision, recall, and F1-score
precision = precision_score(y_true, y_pred)
recall = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)

print(f"Precision: {precision:.3f}")
print(f"Recall: {recall:.3f}")
print(f"F1-Score: {f1:.3f}")

# For binary classification with probability scores
y_scores = np.array([0.1, 0.9, 0.3, 0.2, 0.8, 0.4, 0.7, 0.9, 0.1, 0.8])

# Precision-Recall Curve
precision_vals, recall_vals, pr_thresholds = precision_recall_curve(y_true, y_scores)
pr_auc = auc(recall_vals, precision_vals)

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(recall_vals, precision_vals, 'b-', label=f'PR Curve (AUC = {pr_auc:.3f})')
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.title('Precision-Recall Curve')
plt.legend()
plt.grid(True)

# ROC Curve
fpr, tpr, roc_thresholds = roc_curve(y_true, y_scores)
roc_auc = auc(fpr, tpr)

plt.subplot(1, 2, 2)
plt.plot(fpr, tpr, 'r-', label=f'ROC Curve (AUC = {roc_auc:.3f})')
plt.plot([0, 1], [0, 1], 'k--', label='Random Classifier')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve')
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.show()
\`\`\`

## Evaluation Metrics for Regression

### Mean Squared Error and R²
\`\`\`python
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.linear_model import LinearRegression
from sklearn.datasets import make_regression

# Generate sample regression data
X, y = make_regression(n_samples=100, n_features=1, noise=10, random_state=42)

# Split data
X_train, X_test = X[:80], X[80:]
y_train, y_test = y[:80], y[80:]

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate regression metrics
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse:.3f}")
print(f"Root Mean Squared Error: {rmse:.3f}")
print(f"Mean Absolute Error: {mae:.3f}")
print(f"R² Score: {r2:.3f}")

# Visualize predictions
plt.figure(figsize=(10, 6))
plt.scatter(X_test, y_test, color='blue', alpha=0.6, label='Actual')
plt.scatter(X_test, y_pred, color='red', alpha=0.6, label='Predicted')
plt.plot(X_test, y_pred, color='red', linewidth=2, label='Regression Line')
plt.xlabel('Feature')
plt.ylabel('Target')
plt.title('Regression Model Performance')
plt.legend()
plt.grid(True)
plt.show()
\`\`\`

## Cross-Validation Techniques

### K-Fold Cross-Validation
\`\`\`python
from sklearn.model_selection import cross_val_score, KFold, StratifiedKFold
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Initialize model
rf = RandomForestClassifier(n_estimators=100, random_state=42)

# K-Fold Cross-Validation
kfold = KFold(n_splits=5, shuffle=True, random_state=42)
cv_scores = cross_val_score(rf, X, y, cv=kfold, scoring='accuracy')

print("K-Fold Cross-Validation Scores:")
print(cv_scores)
print(f"Mean CV Score: {cv_scores.mean():.3f} (+/- {cv_scores.std() * 2:.3f})")

# Stratified K-Fold for classification
skfold = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
stratified_scores = cross_val_score(rf, X, y, cv=skfold, scoring='accuracy')

print("\\nStratified K-Fold Cross-Validation Scores:")
print(stratified_scores)
print(f"Mean Stratified CV Score: {stratified_scores.mean():.3f} (+/- {stratified_scores.std() * 2:.3f})")
\`\`\`

### Leave-One-Out Cross-Validation
\`\`\`python
from sklearn.model_selection import LeaveOneOut
from sklearn.linear_model import LogisticRegression

# Leave-One-Out Cross-Validation
loo = LeaveOneOut()
log_reg = LogisticRegression(random_state=42)

# Note: LOO can be computationally expensive for large datasets
loo_scores = cross_val_score(log_reg, X, y, cv=loo, scoring='accuracy')

print("Leave-One-Out Cross-Validation:")
print(f"Number of iterations: {len(loo_scores)}")
print(f"Mean LOO Score: {loo_scores.mean():.3f}")
print(f"Standard Deviation: {loo_scores.std():.3f}")
\`\`\`

## Advanced Validation Techniques

### Time Series Cross-Validation
\`\`\`python
from sklearn.model_selection import TimeSeriesSplit
import pandas as pd

# Create time series data
dates = pd.date_range('2020-01-01', periods=100, freq='D')
ts_data = pd.DataFrame({
    'date': dates,
    'value': np.cumsum(np.random.randn(100)) + 100
})

# Time Series Split
tscv = TimeSeriesSplit(n_splits=5)

print("Time Series Cross-Validation Splits:")
for i, (train_idx, test_idx) in enumerate(tscv.split(ts_data)):
    train_dates = ts_data.iloc[train_idx]['date']
    test_dates = ts_data.iloc[test_idx]['date']
    print(f"Split {i+1}: Train {train_dates.min()} to {train_dates.max()}, "
          f"Test {test_dates.min()} to {test_dates.max()}")
\`\`\`

### Nested Cross-Validation
\`\`\`python
from sklearn.model_selection import GridSearchCV, cross_val_score
from sklearn.svm import SVC

# Nested Cross-Validation for hyperparameter tuning
param_grid = {
    'C': [0.1, 1, 10],
    'gamma': ['scale', 'auto', 0.001, 0.01]
}

# Outer CV loop
outer_cv = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)
nested_scores = []

for train_idx, test_idx in outer_cv.split(X, y):
    X_train_outer, X_test_outer = X[train_idx], X[test_idx]
    y_train_outer, y_test_outer = y[train_idx], y[test_idx]
    
    # Inner CV loop for hyperparameter tuning
    inner_cv = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)
    grid_search = GridSearchCV(
        SVC(random_state=42), 
        param_grid, 
        cv=inner_cv, 
        scoring='accuracy'
    )
    
    grid_search.fit(X_train_outer, y_train_outer)
    
    # Evaluate best model on outer test set
    best_model = grid_search.best_estimator_
    score = best_model.score(X_test_outer, y_test_outer)
    nested_scores.append(score)
    
    print(f"Best parameters: {grid_search.best_params_}")
    print(f"Best inner CV score: {grid_search.best_score_:.3f}")
    print(f"Outer test score: {score:.3f}\\n")

print(f"Nested CV Mean Score: {np.mean(nested_scores):.3f} (+/- {np.std(nested_scores) * 2:.3f})")
\`\`\`

## Model Selection and Comparison

### Multiple Model Comparison
\`\`\`python
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import cross_val_score

# Define models to compare
models = {
    'Logistic Regression': LogisticRegression(random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'Gradient Boosting': GradientBoostingClassifier(random_state=42),
    'SVM': SVC(random_state=42),
    'Naive Bayes': GaussianNB()
}

# Compare models using cross-validation
cv_results = {}
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

for name, model in models.items():
    scores = cross_val_score(model, X, y, cv=cv, scoring='accuracy')
    cv_results[name] = {
        'mean_score': scores.mean(),
        'std_score': scores.std(),
        'scores': scores
    }
    print(f"{name}: {scores.mean():.3f} (+/- {scores.std() * 2:.3f})")

# Visualize model comparison
model_names = list(cv_results.keys())
mean_scores = [cv_results[name]['mean_score'] for name in model_names]
std_scores = [cv_results[name]['std_score'] for name in model_names]

plt.figure(figsize=(12, 6))
bars = plt.bar(model_names, mean_scores, yerr=std_scores, capsize=5, alpha=0.7)
plt.ylabel('Cross-Validation Accuracy')
plt.title('Model Comparison')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

# Add value labels on bars
for bar, score in zip(bars, mean_scores):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01, 
             f'{score:.3f}', ha='center', va='bottom')

plt.tight_layout()
plt.show()
\`\`\`

## Bias-Variance Tradeoff

### Understanding Bias and Variance
\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Generate sample data
np.random.seed(42)
X = np.linspace(0, 1, 100).reshape(-1, 1)
y = 2 * X.ravel() + np.random.normal(0, 0.1, 100)

# Different polynomial degrees to demonstrate bias-variance tradeoff
degrees = [1, 3, 5, 10, 15]
train_errors = []
test_errors = []

for degree in degrees:
    # Create polynomial features
    poly_features = PolynomialFeatures(degree=degree)
    X_poly = poly_features.fit_transform(X)
    
    # Split data
    X_train, X_test = X_poly[:80], X_poly[80:]
    y_train, y_test = y[:80], y[80:]
    
    # Train model
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    # Calculate errors
    train_pred = model.predict(X_train)
    test_pred = model.predict(X_test)
    
    train_error = mean_squared_error(y_train, train_pred)
    test_error = mean_squared_error(y_test, test_pred)
    
    train_errors.append(train_error)
    test_errors.append(test_error)

# Plot bias-variance tradeoff
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(degrees, train_errors, 'o-', label='Training Error', linewidth=2)
plt.plot(degrees, test_errors, 's-', label='Test Error', linewidth=2)
plt.xlabel('Polynomial Degree')
plt.ylabel('Mean Squared Error')
plt.title('Bias-Variance Tradeoff')
plt.legend()
plt.grid(True)

# Visualize model complexity
plt.subplot(1, 2, 2)
X_plot = np.linspace(0, 1, 100).reshape(-1, 1)
plt.scatter(X, y, alpha=0.6, label='Data')

for degree in [1, 5, 15]:
    poly_features = PolynomialFeatures(degree=degree)
    X_poly = poly_features.fit_transform(X)
    model = LinearRegression()
    model.fit(X_poly, y)
    
    X_plot_poly = poly_features.transform(X_plot)
    y_plot = model.predict(X_plot_poly)
    plt.plot(X_plot, y_plot, label=f'Degree {degree}', linewidth=2)

plt.xlabel('X')
plt.ylabel('y')
plt.title('Model Complexity Visualization')
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.show()
\`\`\`

## Practical Exercise

Apply model evaluation techniques:
1. Load a real dataset and split it appropriately
2. Train multiple models and compare their performance
3. Use different cross-validation strategies
4. Analyze bias-variance tradeoff
5. Implement nested cross-validation for hyperparameter tuning
6. Create comprehensive evaluation reports
7. Visualize results and draw conclusions

## Summary & Next Steps

Model evaluation and validation are crucial for building reliable ML systems. Master these techniques to ensure your models perform well in production.

**Next up**: Part 6 - Feature engineering and selection techniques.`,
            readTime: 26,
            publishedAt: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Model Evaluation', 'Cross-Validation', 'Metrics', 'Bias-Variance']
          },
          {
            id: 'ml-part-6',
            partNumber: 6,
            title: 'Feature Engineering and Selection',
            summary: 'Master techniques for creating and selecting the most effective features for machine learning.',
            content: `# Part 6: Feature Engineering and Selection

Learn advanced techniques for creating, transforming, and selecting the most effective features for machine learning models.

## Feature Engineering Fundamentals

### Creating New Features
\`\`\`python
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.feature_selection import SelectKBest, f_classif
import matplotlib.pyplot as plt
import seaborn as sns

# Create sample dataset
np.random.seed(42)
data = {
    'age': np.random.randint(18, 80, 1000),
    'income': np.random.normal(50000, 15000, 1000),
    'education_years': np.random.randint(8, 20, 1000),
    'experience': np.random.randint(0, 40, 1000),
    'city': np.random.choice(['NYC', 'LA', 'Chicago', 'Houston'], 1000),
    'target': np.random.choice([0, 1], 1000, p=[0.7, 0.3])
}

df = pd.DataFrame(data)

# 1. Mathematical Transformations
df['income_log'] = np.log1p(df['income'])  # Log transformation
df['age_squared'] = df['age'] ** 2
df['income_per_age'] = df['income'] / df['age']
df['experience_ratio'] = df['experience'] / (df['age'] - 18)

# 2. Binning and Categorization
df['age_group'] = pd.cut(df['age'], bins=[0, 30, 50, 100], labels=['Young', 'Middle', 'Senior'])
df['income_quartile'] = pd.qcut(df['income'], q=4, labels=['Q1', 'Q2', 'Q3', 'Q4'])

# 3. Interaction Features
df['age_income_interaction'] = df['age'] * df['income']
df['education_experience'] = df['education_years'] * df['experience']

print("Original features:", df.columns.tolist()[:5])
print("Engineered features:", df.columns.tolist()[5:])
print("\\nSample of engineered features:")
print(df[['age', 'income', 'age_group', 'income_quartile', 'age_income_interaction']].head())
\`\`\`

### Handling Categorical Variables
\`\`\`python
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer

# 1. Label Encoding
le = LabelEncoder()
df['city_encoded'] = le.fit_transform(df['city'])

# 2. One-Hot Encoding
ohe = OneHotEncoder(sparse=False, drop='first')
city_encoded = ohe.fit_transform(df[['city']])
city_columns = [f'city_{cat}' for cat in le.classes_[1:]]  # Skip first to avoid multicollinearity
df_city_ohe = pd.DataFrame(city_encoded, columns=city_columns)

# 3. Target Encoding (Mean Encoding)
def target_encode(df, categorical_col, target_col, smoothing=1):
    """Target encoding with smoothing to prevent overfitting"""
    target_mean = df[target_col].mean()
    category_stats = df.groupby(categorical_col)[target_col].agg(['count', 'mean'])
    category_stats['smoothing'] = 1 / (1 + np.exp(-(category_stats['count'] - smoothing) / smoothing))
    category_stats['encoded'] = (category_stats['smoothing'] * category_stats['mean'] + 
                                (1 - category_stats['smoothing']) * target_mean)
    return df[categorical_col].map(category_stats['encoded'])

df['city_target_encoded'] = target_encode(df, 'city', 'target')

print("\\nCategorical encoding comparison:")
print(df[['city', 'city_encoded', 'city_target_encoded']].head())
print("\\nOne-hot encoded features:")
print(df_city_ohe.head())
\`\`\`

## Feature Scaling and Normalization

### Different Scaling Techniques
\`\`\`python
from sklearn.preprocessing import MinMaxScaler, RobustScaler, PowerTransformer
from sklearn.preprocessing import QuantileTransformer

# Create sample data with different distributions
np.random.seed(42)
data = {
    'normal': np.random.normal(100, 15, 1000),
    'exponential': np.random.exponential(2, 1000),
    'uniform': np.random.uniform(0, 100, 1000),
    'skewed': np.random.gamma(2, 2, 1000)
}

df_scaling = pd.DataFrame(data)

# 1. Standard Scaling (Z-score normalization)
scaler_std = StandardScaler()
df_scaling['normal_std'] = scaler_std.fit_transform(df_scaling[['normal']])

# 2. Min-Max Scaling
scaler_minmax = MinMaxScaler()
df_scaling['normal_minmax'] = scaler_minmax.fit_transform(df_scaling[['normal']])

# 3. Robust Scaling (using median and IQR)
scaler_robust = RobustScaler()
df_scaling['normal_robust'] = scaler_robust.fit_transform(df_scaling[['normal']])

# 4. Power Transformation (Box-Cox)
pt = PowerTransformer(method='box-cox')
df_scaling['skewed_boxcox'] = pt.fit_transform(df_scaling[['skewed']])

# 5. Quantile Transformation
qt = QuantileTransformer(output_distribution='normal')
df_scaling['exponential_quantile'] = qt.fit_transform(df_scaling[['exponential']])

# Visualize transformations
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes = axes.ravel()

columns_to_plot = ['normal', 'normal_std', 'normal_minmax', 'normal_robust', 'skewed', 'skewed_boxcox']
titles = ['Original Normal', 'Standard Scaled', 'Min-Max Scaled', 'Robust Scaled', 'Original Skewed', 'Box-Cox Transformed']

for i, (col, title) in enumerate(zip(columns_to_plot, titles)):
    axes[i].hist(df_scaling[col], bins=50, alpha=0.7, edgecolor='black')
    axes[i].set_title(title)
    axes[i].set_xlabel('Value')
    axes[i].set_ylabel('Frequency')

plt.tight_layout()
plt.show()

print("\\nScaling statistics:")
print(df_scaling[['normal', 'normal_std', 'normal_minmax', 'normal_robust']].describe())
\`\`\`

## Feature Selection Techniques

### Univariate Feature Selection
\`\`\`python
from sklearn.feature_selection import SelectKBest, f_classif, mutual_info_classif
from sklearn.feature_selection import SelectPercentile, chi2
from sklearn.datasets import load_breast_cancer

# Load dataset
cancer = load_breast_cancer()
X, y = cancer.data, cancer.target
feature_names = cancer.feature_names

# 1. SelectKBest with F-test
selector_f = SelectKBest(score_func=f_classif, k=10)
X_selected_f = selector_f.fit_transform(X, y)
selected_features_f = feature_names[selector_f.get_support()]

print("Top 10 features selected by F-test:")
for i, feature in enumerate(selected_features_f):
    score = selector_f.scores_[selector_f.get_support()][i]
    print(f"{i+1}. {feature}: {score:.2f}")

# 2. Mutual Information
selector_mi = SelectKBest(score_func=mutual_info_classif, k=10)
X_selected_mi = selector_mi.fit_transform(X, y)
selected_features_mi = feature_names[selector_mi.get_support()]

print("\\nTop 10 features selected by Mutual Information:")
for i, feature in enumerate(selected_features_mi):
    score = selector_mi.scores_[selector_mi.get_support()][i]
    print(f"{i+1}. {feature}: {score:.4f}")

# 3. SelectPercentile
selector_percentile = SelectPercentile(score_func=f_classif, percentile=50)
X_selected_percentile = selector_percentile.fit_transform(X, y)
selected_features_percentile = feature_names[selector_percentile.get_support()]

print(f"\\nFeatures selected by top 50% percentile: {len(selected_features_percentile)}")
\`\`\`

### Recursive Feature Elimination
\`\`\`python
from sklearn.feature_selection import RFE, RFECV
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression

# 1. Recursive Feature Elimination
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rfe = RFE(estimator=rf, n_features_to_select=10)
X_rfe = rfe.fit_transform(X, y)
selected_features_rfe = feature_names[rfe.get_support()]

print("Features selected by RFE:")
for i, feature in enumerate(selected_features_rfe):
    ranking = rfe.ranking_[rfe.get_support()][i]
    print(f"{i+1}. {feature} (ranking: {ranking})")

# 2. Recursive Feature Elimination with Cross-Validation
rfecv = RFECV(estimator=rf, step=1, cv=5, scoring='accuracy')
X_rfecv = rfecv.fit_transform(X, y)

print(f"\\nOptimal number of features: {rfecv.n_features_}")
print("Features selected by RFECV:")
selected_features_rfecv = feature_names[rfecv.get_support()]
for i, feature in enumerate(selected_features_rfecv):
    print(f"{i+1}. {feature}")

# Plot RFECV results
plt.figure(figsize=(10, 6))
plt.plot(range(1, len(rfecv.cv_results_['mean_test_score']) + 1), 
         rfecv.cv_results_['mean_test_score'])
plt.fill_between(range(1, len(rfecv.cv_results_['mean_test_score']) + 1),
                 rfecv.cv_results_['mean_test_score'] - rfecv.cv_results_['std_test_score'],
                 rfecv.cv_results_['mean_test_score'] + rfecv.cv_results_['std_test_score'],
                 alpha=0.2)
plt.axvline(x=rfecv.n_features_, color='red', linestyle='--', 
           label=f'Optimal: {rfecv.n_features_} features')
plt.xlabel('Number of Features')
plt.ylabel('Cross-Validation Score')
plt.title('Recursive Feature Elimination with Cross-Validation')
plt.legend()
plt.grid(True)
plt.show()
\`\`\`

## Advanced Feature Engineering

### Time Series Features
\`\`\`python
import pandas as pd
from datetime import datetime, timedelta

# Create time series data
dates = pd.date_range('2020-01-01', periods=365, freq='D')
ts_data = pd.DataFrame({
    'date': dates,
    'value': np.cumsum(np.random.randn(365)) + 100,
    'sales': np.random.poisson(50, 365)
})

# 1. Time-based features
ts_data['year'] = ts_data['date'].dt.year
ts_data['month'] = ts_data['date'].dt.month
ts_data['day'] = ts_data['date'].dt.day
ts_data['dayofweek'] = ts_data['date'].dt.dayofweek
ts_data['quarter'] = ts_data['date'].dt.quarter
ts_data['is_weekend'] = ts_data['dayofweek'].isin([5, 6]).astype(int)

# 2. Lag features
ts_data['value_lag1'] = ts_data['value'].shift(1)
ts_data['value_lag7'] = ts_data['value'].shift(7)
ts_data['value_lag30'] = ts_data['value'].shift(30)

# 3. Rolling window features
ts_data['value_ma7'] = ts_data['value'].rolling(window=7).mean()
ts_data['value_ma30'] = ts_data['value'].rolling(window=30).mean()
ts_data['value_std7'] = ts_data['value'].rolling(window=7).std()
ts_data['value_max7'] = ts_data['value'].rolling(window=7).max()
ts_data['value_min7'] = ts_data['value'].rolling(window=7).min()

# 4. Difference features
ts_data['value_diff1'] = ts_data['value'].diff(1)
ts_data['value_diff7'] = ts_data['value'].diff(7)

# 5. Percentage change
ts_data['value_pct_change'] = ts_data['value'].pct_change()

print("Time series features created:")
print(ts_data.columns.tolist())
print("\\nSample of engineered features:")
print(ts_data[['date', 'value', 'month', 'dayofweek', 'value_lag1', 'value_ma7', 'value_diff1']].head(10))
\`\`\`

### Text Feature Engineering
\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.feature_extraction.text import HashingVectorizer
import re

# Sample text data
texts = [
    "Machine learning is amazing for data analysis",
    "Deep learning models require large datasets",
    "Natural language processing helps with text analysis",
    "Computer vision can identify objects in images",
    "Data science combines statistics and programming"
]

# 1. Bag of Words
bow_vectorizer = CountVectorizer(max_features=100, stop_words='english')
bow_matrix = bow_vectorizer.fit_transform(texts)
bow_features = bow_vectorizer.get_feature_names_out()

print("Bag of Words features:")
print(bow_features[:10])

# 2. TF-IDF
tfidf_vectorizer = TfidfVectorizer(max_features=100, stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(texts)
tfidf_features = tfidf_vectorizer.get_feature_names_out()

print("\\nTF-IDF features:")
print(tfidf_features[:10])

# 3. Custom text features
def extract_text_features(texts):
    features = []
    for text in texts:
        feature_dict = {
            'word_count': len(text.split()),
            'char_count': len(text),
            'avg_word_length': np.mean([len(word) for word in text.split()]),
            'sentence_count': len(re.split(r'[.!?]+', text)),
            'uppercase_ratio': sum(1 for c in text if c.isupper()) / len(text),
            'digit_count': sum(1 for c in text if c.isdigit()),
            'special_char_count': len(re.findall(r'[^a-zA-Z0-9\\s]', text))
        }
        features.append(feature_dict)
    return pd.DataFrame(features)

text_features_df = extract_text_features(texts)
print("\\nCustom text features:")
print(text_features_df)
\`\`\`

## Feature Selection with Model-Based Methods

### L1 Regularization (Lasso)
\`\`\`python
from sklearn.linear_model import LassoCV, ElasticNetCV
from sklearn.preprocessing import StandardScaler

# Prepare data
X_scaled = StandardScaler().fit_transform(X)
y = cancer.target

# 1. Lasso with Cross-Validation
lasso_cv = LassoCV(cv=5, random_state=42, max_iter=1000)
lasso_cv.fit(X_scaled, y)

# Get selected features
lasso_coef = lasso_cv.coef_
selected_features_lasso = feature_names[lasso_coef != 0]

print(f"Lasso selected {len(selected_features_lasso)} features:")
for i, feature in enumerate(selected_features_lasso):
    coef = lasso_coef[lasso_coef != 0][i]
    print(f"{i+1}. {feature}: {coef:.4f}")

# 2. Elastic Net
elastic_net = ElasticNetCV(cv=5, random_state=42, max_iter=1000)
elastic_net.fit(X_scaled, y)

elastic_coef = elastic_net.coef_
selected_features_elastic = feature_names[elastic_coef != 0]

print(f"\\nElastic Net selected {len(selected_features_elastic)} features:")
for i, feature in enumerate(selected_features_elastic):
    coef = elastic_coef[elastic_coef != 0][i]
    print(f"{i+1}. {feature}: {coef:.4f}")

# Visualize feature importance
plt.figure(figsize=(12, 8))
plt.subplot(2, 1, 1)
plt.barh(range(len(selected_features_lasso)), lasso_coef[lasso_coef != 0])
plt.yticks(range(len(selected_features_lasso)), selected_features_lasso)
plt.xlabel('Coefficient Value')
plt.title('Lasso Feature Selection')

plt.subplot(2, 1, 2)
plt.barh(range(len(selected_features_elastic)), elastic_coef[elastic_coef != 0])
plt.yticks(range(len(selected_features_elastic)), selected_features_elastic)
plt.xlabel('Coefficient Value')
plt.title('Elastic Net Feature Selection')

plt.tight_layout()
plt.show()
\`\`\`

## Feature Engineering Pipeline

### Complete Pipeline Example
\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Create comprehensive dataset
np.random.seed(42)
n_samples = 1000

data = {
    'age': np.random.randint(18, 80, n_samples),
    'income': np.random.normal(50000, 15000, n_samples),
    'education': np.random.choice(['High School', 'Bachelor', 'Master', 'PhD'], n_samples),
    'city': np.random.choice(['NYC', 'LA', 'Chicago', 'Houston'], n_samples),
    'experience': np.random.randint(0, 40, n_samples),
    'target': np.random.choice([0, 1], n_samples, p=[0.7, 0.3])
}

df_pipeline = pd.DataFrame(data)

# Create additional features
df_pipeline['income_log'] = np.log1p(df_pipeline['income'])
df_pipeline['age_income_ratio'] = df_pipeline['age'] / df_pipeline['income']
df_pipeline['experience_ratio'] = df_pipeline['experience'] / (df_pipeline['age'] - 18)

# Split data
X = df_pipeline.drop('target', axis=1)
y = df_pipeline['target']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define numerical and categorical features
numerical_features = ['age', 'income', 'experience', 'income_log', 'age_income_ratio', 'experience_ratio']
categorical_features = ['education', 'city']

# Create preprocessing pipeline
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numerical_features),
        ('cat', OneHotEncoder(drop='first'), categorical_features)
    ]
)

# Create complete pipeline
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('feature_selection', SelectKBest(score_func=f_classif, k=10)),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# Fit and evaluate pipeline
pipeline.fit(X_train, y_train)
score = pipeline.score(X_test, y_test)

print(f"Pipeline accuracy: {score:.3f}")

# Get selected features
selected_features = pipeline.named_steps['feature_selection'].get_support()
feature_names = numerical_features + list(pipeline.named_steps['preprocessor'].named_transformers_['cat'].get_feature_names_out(categorical_features))
selected_feature_names = [name for name, selected in zip(feature_names, selected_features) if selected]

print(f"\\nSelected features ({len(selected_feature_names)}):")
for i, feature in enumerate(selected_feature_names):
    print(f"{i+1}. {feature}")
\`\`\`

## Practical Exercise

Apply feature engineering techniques:
1. Load a real dataset and explore its features
2. Create new features using mathematical transformations
3. Handle categorical variables with different encoding methods
4. Apply various scaling techniques
5. Use different feature selection methods
6. Build a complete feature engineering pipeline
7. Compare model performance with and without feature engineering

## Summary & Next Steps

Feature engineering and selection are crucial for building effective ML models. Master these techniques to improve model performance and interpretability.

**Next up**: Part 7 - Ensemble methods and advanced modeling techniques.`,
            readTime: 28,
            publishedAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Feature Engineering', 'Feature Selection', 'Data Preprocessing', 'Pipeline']
          },
          {
            id: 'ml-part-7',
            partNumber: 7,
            title: 'Ensemble Methods',
            summary: 'Master ensemble learning techniques to combine multiple models for superior performance.',
            content: `# Part 7: Ensemble Methods

Learn advanced ensemble learning techniques to combine multiple models for superior predictive performance.

## Ensemble Learning Fundamentals

### Why Ensemble Methods Work
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import VotingClassifier, BaggingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score

# Generate sample data
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, 
                          n_redundant=5, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Individual models
models = {
    'Decision Tree': DecisionTreeClassifier(random_state=42),
    'Logistic Regression': LogisticRegression(random_state=42),
    'SVM': SVC(probability=True, random_state=42),
    'Naive Bayes': GaussianNB()
}

# Train individual models and evaluate
individual_scores = {}
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    score = accuracy_score(y_test, y_pred)
    individual_scores[name] = score
    print(f"{name}: {score:.3f}")

# Calculate average individual performance
avg_individual = np.mean(list(individual_scores.values()))
print(f"\\nAverage individual model performance: {avg_individual:.3f}")

# Demonstrate ensemble diversity
def calculate_diversity(models, X_test, y_test):
    """Calculate prediction diversity among models"""
    predictions = []
    for model in models.values():
        pred = model.predict(X_test)
        predictions.append(pred)
    
    predictions = np.array(predictions)
    diversity = 0
    n_models = len(predictions)
    
    for i in range(n_models):
        for j in range(i+1, n_models):
            disagreement = np.mean(predictions[i] != predictions[j])
            diversity += disagreement
    
    return diversity / (n_models * (n_models - 1) / 2)

diversity = calculate_diversity(models, X_test, y_test)
print(f"Model diversity: {diversity:.3f}")
\`\`\`

### Bias-Variance Decomposition in Ensembles
\`\`\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
import pandas as pd

# Create models with different complexity levels
simple_models = {
    'Shallow Tree': DecisionTreeClassifier(max_depth=3, random_state=42),
    'Logistic Regression': LogisticRegression(random_state=42),
    'Naive Bayes': GaussianNB()
}

complex_models = {
    'Deep Tree': DecisionTreeClassifier(max_depth=20, random_state=42),
    'SVM RBF': SVC(kernel='rbf', C=100, random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42)
}

# Calculate bias and variance estimates
def estimate_bias_variance(model, X, y, n_iterations=10):
    """Estimate bias and variance using bootstrap sampling"""
    scores = []
    predictions = []
    
    for i in range(n_iterations):
        # Bootstrap sample
        indices = np.random.choice(len(X), size=len(X), replace=True)
        X_boot, y_boot = X[indices], y[indices]
        
        # Train and predict
        model.fit(X_boot, y_boot)
        y_pred = model.predict(X_test)
        predictions.append(y_pred)
        
        # Calculate accuracy
        score = accuracy_score(y_test, y_pred)
        scores.append(score)
    
    # Estimate bias (1 - average accuracy)
    bias = 1 - np.mean(scores)
    
    # Estimate variance (variance of predictions)
    predictions = np.array(predictions)
    variance = np.mean(np.var(predictions, axis=0))
    
    return bias, variance, np.mean(scores)

print("Bias-Variance Analysis:")
print("=" * 50)

for category, model_dict in [("Simple Models", simple_models), ("Complex Models", complex_models)]:
    print(f"\\n{category}:")
    for name, model in model_dict.items():
        bias, variance, accuracy = estimate_bias_variance(model, X_train, y_train)
        print(f"  {name}:")
        print(f"    Accuracy: {accuracy:.3f}")
        print(f"    Bias: {bias:.3f}")
        print(f"    Variance: {variance:.3f}")
\`\`\`

## Voting Classifiers

### Hard Voting vs Soft Voting
\`\`\`python
from sklearn.ensemble import VotingClassifier

# Create base models
base_models = [
    ('dt', DecisionTreeClassifier(random_state=42)),
    ('lr', LogisticRegression(random_state=42)),
    ('svm', SVC(probability=True, random_state=42)),
    ('nb', GaussianNB())
]

# Hard Voting (majority vote)
hard_voting = VotingClassifier(
    estimators=base_models,
    voting='hard'
)

# Soft Voting (probability average)
soft_voting = VotingClassifier(
    estimators=base_models,
    voting='soft'
)

# Train and evaluate
voting_methods = {
    'Hard Voting': hard_voting,
    'Soft Voting': soft_voting
}

print("Voting Classifier Comparison:")
print("=" * 40)

for name, voting_clf in voting_methods.items():
    voting_clf.fit(X_train, y_train)
    y_pred = voting_clf.predict(X_test)
    score = accuracy_score(y_test, y_pred)
    print(f"{name}: {score:.3f}")

# Demonstrate the difference between hard and soft voting
print("\\nDetailed Comparison:")
print("-" * 30)

# Get predictions for a few samples
sample_indices = [0, 1, 2]
for idx in sample_indices:
    print(f"\\nSample {idx}:")
    print(f"True label: {y_test[idx]}")
    
    # Individual model predictions
    for model_name, model in models.items():
        pred = model.predict([X_test[idx]])[0]
        prob = model.predict_proba([X_test[idx]])[0] if hasattr(model, 'predict_proba') else [0.5, 0.5]
        print(f"  {model_name}: {pred} (prob: {prob[1]:.3f})")
    
    # Voting predictions
    hard_pred = hard_voting.predict([X_test[idx]])[0]
    soft_pred = soft_voting.predict([X_test[idx]])[0]
    soft_proba = soft_voting.predict_proba([X_test[idx]])[0]
    
    print(f"  Hard Voting: {hard_pred}")
    print(f"  Soft Voting: {soft_pred} (prob: {soft_proba[1]:.3f})")
\`\`\`

### Weighted Voting
\`\`\`python
# Create weighted voting classifier
weighted_voting = VotingClassifier(
    estimators=base_models,
    voting='soft',
    weights=[1, 2, 1, 1]  # Give more weight to logistic regression
)

weighted_voting.fit(X_train, y_train)
weighted_score = accuracy_score(y_test, weighted_voting.predict(X_test))

print(f"Weighted Voting (LR weight=2): {weighted_score:.3f}")

# Optimize weights using cross-validation
from sklearn.model_selection import GridSearchCV

# Define weight combinations to test
weight_combinations = [
    [1, 1, 1, 1],  # Equal weights
    [1, 2, 1, 1],  # LR weight=2
    [1, 3, 1, 1],  # LR weight=3
    [2, 1, 1, 1],  # DT weight=2
    [1, 1, 2, 1],  # SVM weight=2
    [1, 1, 1, 2],  # NB weight=2
]

best_score = 0
best_weights = None

for weights in weight_combinations:
    voting_clf = VotingClassifier(
        estimators=base_models,
        voting='soft',
        weights=weights
    )
    
    # Use cross-validation to evaluate
    cv_scores = cross_val_score(voting_clf, X_train, y_train, cv=5)
    mean_score = cv_scores.mean()
    
    if mean_score > best_score:
        best_score = mean_score
        best_weights = weights
    
    print(f"Weights {weights}: CV Score = {mean_score:.3f}")

print(f"\\nBest weights: {best_weights}")
print(f"Best CV score: {best_score:.3f}")

# Train with best weights and evaluate on test set
best_voting = VotingClassifier(
    estimators=base_models,
    voting='soft',
    weights=best_weights
)
best_voting.fit(X_train, y_train)
final_score = accuracy_score(y_test, best_voting.predict(X_test))
print(f"Final test score: {final_score:.3f}")
\`\`\`

## Bagging Methods

### Bootstrap Aggregating
\`\`\`python
from sklearn.ensemble import BaggingClassifier, RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier

# Create bagging classifier with decision trees
bagging_clf = BaggingClassifier(
    base_estimator=DecisionTreeClassifier(random_state=42),
    n_estimators=100,
    max_samples=0.8,  # Use 80% of samples for each tree
    max_features=0.8,  # Use 80% of features for each tree
    bootstrap=True,  # Bootstrap sampling
    random_state=42
)

# Compare with individual decision tree
single_tree = DecisionTreeClassifier(random_state=42)

# Train and evaluate
models_to_compare = {
    'Single Decision Tree': single_tree,
    'Bagging (100 trees)': bagging_clf,
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42)
}

print("Bagging Comparison:")
print("=" * 30)

for name, model in models_to_compare.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    score = accuracy_score(y_test, y_pred)
    print(f"{name}: {score:.3f}")

# Demonstrate bagging stability
def evaluate_bagging_stability(n_estimators_list, X_train, y_train, X_test, y_test):
    """Evaluate how bagging performance changes with number of estimators"""
    results = []
    
    for n_est in n_estimators_list:
        bagging = BaggingClassifier(
            base_estimator=DecisionTreeClassifier(random_state=42),
            n_estimators=n_est,
            random_state=42
        )
        
        bagging.fit(X_train, y_train)
        score = accuracy_score(y_test, bagging.predict(X_test))
        results.append(score)
    
    return results

n_estimators_range = [1, 5, 10, 20, 50, 100, 200]
bagging_scores = evaluate_bagging_stability(n_estimators_range, X_train, y_train, X_test, y_test)

# Plot bagging performance vs number of estimators
plt.figure(figsize=(10, 6))
plt.plot(n_estimators_range, bagging_scores, 'o-', linewidth=2, markersize=8)
plt.axhline(y=accuracy_score(y_test, single_tree.predict(X_test)), 
           color='red', linestyle='--', label='Single Tree')
plt.xlabel('Number of Estimators')
plt.ylabel('Accuracy')
plt.title('Bagging Performance vs Number of Estimators')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

### Random Forest Deep Dive
\`\`\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance

# Create Random Forest with different configurations
rf_configs = {
    'Default RF': RandomForestClassifier(random_state=42),
    'Deep Trees': RandomForestClassifier(max_depth=20, random_state=42),
    'Shallow Trees': RandomForestClassifier(max_depth=5, random_state=42),
    'Many Trees': RandomForestClassifier(n_estimators=500, random_state=42),
    'Few Trees': RandomForestClassifier(n_estimators=10, random_state=42),
    'High Features': RandomForestClassifier(max_features=0.9, random_state=42),
    'Low Features': RandomForestClassifier(max_features=0.3, random_state=42)
}

print("Random Forest Configuration Comparison:")
print("=" * 45)

rf_results = {}
for name, rf in rf_configs.items():
    rf.fit(X_train, y_train)
    score = accuracy_score(y_test, rf.predict(X_test))
    rf_results[name] = score
    print(f"{name}: {score:.3f}")

# Feature importance analysis
best_rf = RandomForestClassifier(n_estimators=100, random_state=42)
best_rf.fit(X_train, y_train)

# Get feature importance
feature_importance = best_rf.feature_importances_
feature_names = [f'Feature_{i}' for i in range(X.shape[1])]

# Sort features by importance
importance_df = pd.DataFrame({
    'feature': feature_names,
    'importance': feature_importance
}).sort_values('importance', ascending=False)

print("\\nTop 10 Most Important Features:")
print(importance_df.head(10))

# Plot feature importance
plt.figure(figsize=(12, 8))
top_features = importance_df.head(15)
plt.barh(range(len(top_features)), top_features['importance'])
plt.yticks(range(len(top_features)), top_features['feature'])
plt.xlabel('Feature Importance')
plt.title('Random Forest Feature Importance')
plt.gca().invert_yaxis()
plt.tight_layout()
plt.show()

# Permutation importance
perm_importance = permutation_importance(best_rf, X_test, y_test, n_repeats=10, random_state=42)
perm_df = pd.DataFrame({
    'feature': feature_names,
    'importance': perm_importance.importances_mean,
    'std': perm_importance.importances_std
}).sort_values('importance', ascending=False)

print("\\nTop 10 Features by Permutation Importance:")
print(perm_df.head(10))
\`\`\`

## Boosting Methods

### AdaBoost
\`\`\`python
from sklearn.ensemble import AdaBoostClassifier, GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier

# AdaBoost with different base estimators
ada_configs = {
    'AdaBoost (Decision Stump)': AdaBoostClassifier(
        base_estimator=DecisionTreeClassifier(max_depth=1),
        n_estimators=100,
        random_state=42
    ),
    'AdaBoost (Deep Trees)': AdaBoostClassifier(
        base_estimator=DecisionTreeClassifier(max_depth=5),
        n_estimators=100,
        random_state=42
    ),
    'AdaBoost (SVM)': AdaBoostClassifier(
        base_estimator=SVC(probability=True, kernel='linear'),
        n_estimators=50,
        random_state=42
    )
}

print("AdaBoost Configuration Comparison:")
print("=" * 40)

for name, ada in ada_configs.items():
    ada.fit(X_train, y_train)
    score = accuracy_score(y_test, ada.predict(X_test))
    print(f"{name}: {score:.3f}")

# Demonstrate AdaBoost learning process
ada_learning = AdaBoostClassifier(
    base_estimator=DecisionTreeClassifier(max_depth=1),
    n_estimators=100,
    random_state=42
)

# Track performance as we add more estimators
ada_scores = []
estimator_range = range(1, 101, 5)

for n_est in estimator_range:
    ada_temp = AdaBoostClassifier(
        base_estimator=DecisionTreeClassifier(max_depth=1),
        n_estimators=n_est,
        random_state=42
    )
    ada_temp.fit(X_train, y_train)
    score = accuracy_score(y_test, ada_temp.predict(X_test))
    ada_scores.append(score)

# Plot AdaBoost learning curve
plt.figure(figsize=(10, 6))
plt.plot(estimator_range, ada_scores, 'o-', linewidth=2, markersize=4)
plt.xlabel('Number of Estimators')
plt.ylabel('Accuracy')
plt.title('AdaBoost Learning Curve')
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

### Gradient Boosting
\`\`\`python
from sklearn.ensemble import GradientBoostingClassifier
import xgboost as xgb
from sklearn.ensemble import HistGradientBoostingClassifier

# Different gradient boosting implementations
gb_configs = {
    'Sklearn GBM': GradientBoostingClassifier(
        n_estimators=100,
        learning_rate=0.1,
        max_depth=3,
        random_state=42
    ),
    'XGBoost': xgb.XGBClassifier(
        n_estimators=100,
        learning_rate=0.1,
        max_depth=3,
        random_state=42
    ),
    'Histogram GBM': HistGradientBoostingClassifier(
        max_iter=100,
        learning_rate=0.1,
        max_depth=3,
        random_state=42
    )
}

print("Gradient Boosting Comparison:")
print("=" * 35)

for name, gb in gb_configs.items():
    gb.fit(X_train, y_train)
    score = accuracy_score(y_test, gb.predict(X_test))
    print(f"{name}: {score:.3f}")

# Hyperparameter tuning for Gradient Boosting
from sklearn.model_selection import GridSearchCV

# Define parameter grid
param_grid = {
    'n_estimators': [50, 100, 200],
    'learning_rate': [0.01, 0.1, 0.2],
    'max_depth': [3, 5, 7]
}

# Grid search for best parameters
gb = GradientBoostingClassifier(random_state=42)
grid_search = GridSearchCV(
    gb, param_grid, cv=5, scoring='accuracy', n_jobs=-1
)

grid_search.fit(X_train, y_train)

print(f"\\nBest parameters: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.3f}")

# Evaluate best model
best_gb = grid_search.best_estimator_
final_score = accuracy_score(y_test, best_gb.predict(X_test))
print(f"Final test score: {final_score:.3f}")

# Feature importance for best model
gb_importance = best_gb.feature_importances_
gb_importance_df = pd.DataFrame({
    'feature': feature_names,
    'importance': gb_importance
}).sort_values('importance', ascending=False)

print("\\nTop 10 Features by Gradient Boosting Importance:")
print(gb_importance_df.head(10))
\`\`\`

## Stacking

### Stacking Classifier
\`\`\`python
from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

# Define base models
base_models = [
    ('rf', RandomForestClassifier(n_estimators=100, random_state=42)),
    ('gb', GradientBoostingClassifier(n_estimators=100, random_state=42)),
    ('svm', SVC(probability=True, random_state=42))
]

# Define meta-model
meta_model = LogisticRegression(random_state=42)

# Create stacking classifier
stacking_clf = StackingClassifier(
    estimators=base_models,
    final_estimator=meta_model,
    cv=5,  # 5-fold cross-validation for meta-features
    stack_method='predict_proba'  # Use probabilities as meta-features
)

# Train and evaluate
stacking_clf.fit(X_train, y_train)
stacking_score = accuracy_score(y_test, stacking_clf.predict(X_test))

print("Stacking Classifier Performance:")
print("=" * 35)

# Compare with individual models
for name, model in base_models:
    model[1].fit(X_train, y_train)
    score = accuracy_score(y_test, model[1].predict(X_test))
    print(f"{name}: {score:.3f}")

print(f"Stacking: {stacking_score:.3f}")

# Compare different meta-models
meta_models = {
    'Logistic Regression': LogisticRegression(random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=50, random_state=42),
    'SVM': SVC(probability=True, random_state=42),
    'Naive Bayes': GaussianNB()
}

print("\\nMeta-Model Comparison:")
print("=" * 25)

for name, meta in meta_models.items():
    stacking_temp = StackingClassifier(
        estimators=base_models,
        final_estimator=meta,
        cv=5,
        stack_method='predict_proba'
    )
    
    stacking_temp.fit(X_train, y_train)
    score = accuracy_score(y_test, stacking_temp.predict(X_test))
    print(f"{name}: {score:.3f}")
\`\`\`

### Multi-Level Stacking
\`\`\`python
# Create a more complex stacking setup
level1_models = [
    ('rf1', RandomForestClassifier(n_estimators=50, max_depth=5, random_state=42)),
    ('rf2', RandomForestClassifier(n_estimators=50, max_depth=10, random_state=42)),
    ('gb1', GradientBoostingClassifier(n_estimators=50, learning_rate=0.1, random_state=42)),
    ('gb2', GradientBoostingClassifier(n_estimators=50, learning_rate=0.2, random_state=42)),
    ('svm1', SVC(probability=True, C=1, random_state=42)),
    ('svm2', SVC(probability=True, C=10, random_state=42))
]

# Level 1 meta-model
level1_meta = RandomForestClassifier(n_estimators=50, random_state=42)

# Level 1 stacking
level1_stacking = StackingClassifier(
    estimators=level1_models,
    final_estimator=level1_meta,
    cv=3,
    stack_method='predict_proba'
)

# Level 2 models
level2_models = [
    ('level1_stacking', level1_stacking),
    ('rf_final', RandomForestClassifier(n_estimators=100, random_state=42)),
    ('gb_final', GradientBoostingClassifier(n_estimators=100, random_state=42))
]

# Final meta-model
final_meta = LogisticRegression(random_state=42)

# Final stacking
final_stacking = StackingClassifier(
    estimators=level2_models,
    final_estimator=final_meta,
    cv=3,
    stack_method='predict_proba'
)

# Train and evaluate
final_stacking.fit(X_train, y_train)
final_score = accuracy_score(y_test, final_stacking.predict(X_test))

print(f"Multi-Level Stacking: {final_score:.3f}")

# Compare with simpler approaches
simple_stacking = StackingClassifier(
    estimators=[
        ('rf', RandomForestClassifier(n_estimators=100, random_state=42)),
        ('gb', GradientBoostingClassifier(n_estimators=100, random_state=42))
    ],
    final_estimator=LogisticRegression(random_state=42),
    cv=5
)

simple_stacking.fit(X_train, y_train)
simple_score = accuracy_score(y_test, simple_stacking.predict(X_test))

print(f"Simple Stacking: {simple_score:.3f}")
print(f"Improvement: {final_score - simple_score:.3f}")
\`\`\`

## Practical Exercise

Apply ensemble methods:
1. Load a real dataset and split it appropriately
2. Train individual models and evaluate their performance
3. Implement different voting strategies
4. Compare bagging and boosting methods
5. Build stacking classifiers with different meta-models
6. Optimize ensemble hyperparameters
7. Analyze feature importance across different ensemble methods

## Summary & Next Steps

Ensemble methods significantly improve model performance by combining multiple weak learners. Master these techniques to build robust and accurate ML models.

**Next up**: Part 8 - Deep learning fundamentals and neural networks.`,
            readTime: 29,
            publishedAt: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Ensemble Methods', 'Voting', 'Bagging', 'Boosting', 'Stacking']
          },
          {
            id: 'ml-part-8',
            partNumber: 8,
            title: 'Deep Learning Fundamentals',
            summary: 'Master the fundamentals of deep learning and neural network architectures.',
            content: `# Part 8: Deep Learning Fundamentals

Learn the core concepts and architectures of deep learning, the foundation of modern AI systems.

## Introduction to Neural Networks

### Perceptron and Multi-Layer Perceptron
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# Generate sample data
X, y = make_classification(n_samples=1000, n_features=2, n_redundant=0, 
                          n_informative=2, n_clusters_per_class=1, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Scale the data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Simple Perceptron implementation
class Perceptron:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None
    
    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0
        
        for _ in range(self.n_iterations):
            for idx, x_i in enumerate(X):
                linear_output = np.dot(x_i, self.weights) + self.bias
                y_predicted = self.activation(linear_output)
                
                # Update weights
                update = self.learning_rate * (y[idx] - y_predicted)
                self.weights += update * x_i
                self.bias += update
    
    def activation(self, x):
        return 1 if x >= 0 else 0
    
    def predict(self, X):
        linear_output = np.dot(X, self.weights) + self.bias
        return [self.activation(x) for x in linear_output]

# Train perceptron
perceptron = Perceptron()
perceptron.fit(X_train_scaled, y_train)
perceptron_pred = perceptron.predict(X_test_scaled)
perceptron_accuracy = np.mean(perceptron_pred == y_test)

print(f"Perceptron Accuracy: {perceptron_accuracy:.3f}")

# Multi-Layer Perceptron with TensorFlow/Keras
def create_mlp(input_dim, hidden_layers=[64, 32], output_dim=1, activation='relu'):
    model = keras.Sequential()
    
    # Input layer
    model.add(layers.Dense(hidden_layers[0], activation=activation, input_shape=(input_dim,)))
    
    # Hidden layers
    for units in hidden_layers[1:]:
        model.add(layers.Dense(units, activation=activation))
        model.add(layers.Dropout(0.2))  # Add dropout for regularization
    
    # Output layer
    model.add(layers.Dense(output_dim, activation='sigmoid'))
    
    return model

# Create and train MLP
mlp_model = create_mlp(input_dim=2, hidden_layers=[64, 32, 16])
mlp_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
history = mlp_model.fit(X_train_scaled, y_train, epochs=100, batch_size=32, 
                       validation_split=0.2, verbose=0)

# Evaluate
mlp_loss, mlp_accuracy = mlp_model.evaluate(X_test_scaled, y_test, verbose=0)
print(f"MLP Accuracy: {mlp_accuracy:.3f}")

# Plot training history
plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Model Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Model Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.tight_layout()
plt.show()
\`\`\`

### Activation Functions
\`\`\`python
# Visualize different activation functions
x = np.linspace(-5, 5, 100)

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def tanh(x):
    return np.tanh(x)

def relu(x):
    return np.maximum(0, x)

def leaky_relu(x, alpha=0.01):
    return np.where(x > 0, x, alpha * x)

def elu(x, alpha=1.0):
    return np.where(x > 0, x, alpha * (np.exp(x) - 1))

def swish(x):
    return x * sigmoid(x)

# Plot activation functions
plt.figure(figsize=(15, 10))
activations = {
    'Sigmoid': sigmoid(x),
    'Tanh': tanh(x),
    'ReLU': relu(x),
    'Leaky ReLU': leaky_relu(x),
    'ELU': elu(x),
    'Swish': swish(x)
}

for i, (name, y_vals) in enumerate(activations.items(), 1):
    plt.subplot(2, 3, i)
    plt.plot(x, y_vals, linewidth=2)
    plt.title(f'{name} Activation Function')
    plt.xlabel('x')
    plt.ylabel('f(x)')
    plt.grid(True, alpha=0.3)
    plt.axhline(y=0, color='k', linestyle='-', alpha=0.3)
    plt.axvline(x=0, color='k', linestyle='-', alpha=0.3)

plt.tight_layout()
plt.show()

# Compare models with different activation functions
activation_functions = ['relu', 'sigmoid', 'tanh', 'elu']
activation_results = {}

for activation in activation_functions:
    model = create_mlp(input_dim=2, hidden_layers=[64, 32], activation=activation)
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    
    # Train model
    model.fit(X_train_scaled, y_train, epochs=50, batch_size=32, 
              validation_split=0.2, verbose=0)
    
    # Evaluate
    _, accuracy = model.evaluate(X_test_scaled, y_test, verbose=0)
    activation_results[activation] = accuracy

print("\\nActivation Function Comparison:")
for activation, accuracy in activation_results.items():
    print(f"{activation.upper()}: {accuracy:.3f}")
\`\`\`

## Backpropagation and Gradient Descent

### Understanding Backpropagation
\`\`\`python
# Manual implementation of a simple neural network with backpropagation
class SimpleNeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size, learning_rate=0.1):
        self.learning_rate = learning_rate
        
        # Initialize weights randomly
        self.W1 = np.random.randn(input_size, hidden_size) * 0.1
        self.b1 = np.zeros((1, hidden_size))
        self.W2 = np.random.randn(hidden_size, output_size) * 0.1
        self.b2 = np.zeros((1, output_size))
    
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))  # Clip to prevent overflow
    
    def sigmoid_derivative(self, x):
        return x * (1 - x)
    
    def forward(self, X):
        # Forward propagation
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.sigmoid(self.z2)
        return self.a2
    
    def backward(self, X, y, output):
        m = X.shape[0]
        
        # Calculate gradients
        dz2 = output - y
        dW2 = (1/m) * np.dot(self.a1.T, dz2)
        db2 = (1/m) * np.sum(dz2, axis=0, keepdims=True)
        
        da1 = np.dot(dz2, self.W2.T)
        dz1 = da1 * self.sigmoid_derivative(self.a1)
        dW1 = (1/m) * np.dot(X.T, dz1)
        db1 = (1/m) * np.sum(dz1, axis=0, keepdims=True)
        
        # Update weights
        self.W2 -= self.learning_rate * dW2
        self.b2 -= self.learning_rate * db2
        self.W1 -= self.learning_rate * dW1
        self.b1 -= self.learning_rate * db1
    
    def train(self, X, y, epochs=1000):
        losses = []
        for epoch in range(epochs):
            # Forward pass
            output = self.forward(X)
            
            # Calculate loss
            loss = -np.mean(y * np.log(output + 1e-8) + (1 - y) * np.log(1 - output + 1e-8))
            losses.append(loss)
            
            # Backward pass
            self.backward(X, y, output)
            
            if epoch % 100 == 0:
                print(f"Epoch {epoch}, Loss: {loss:.4f}")
        
        return losses
    
    def predict(self, X):
        output = self.forward(X)
        return (output > 0.5).astype(int)

# Train the simple neural network
nn = SimpleNeuralNetwork(input_size=2, hidden_size=4, output_size=1, learning_rate=0.1)
losses = nn.train(X_train_scaled, y_train.reshape(-1, 1), epochs=1000)

# Make predictions
nn_predictions = nn.predict(X_test_scaled)
nn_accuracy = np.mean(nn_predictions.flatten() == y_test)
print(f"\\nSimple Neural Network Accuracy: {nn_accuracy:.3f}")

# Plot training loss
plt.figure(figsize=(10, 6))
plt.plot(losses)
plt.title('Training Loss Over Time')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

### Gradient Descent Variants
\`\`\`python
# Compare different optimizers
optimizers = {
    'SGD': keras.optimizers.SGD(learning_rate=0.01),
    'Adam': keras.optimizers.Adam(learning_rate=0.001),
    'RMSprop': keras.optimizers.RMSprop(learning_rate=0.001),
    'Adagrad': keras.optimizers.Adagrad(learning_rate=0.01),
    'Adadelta': keras.optimizers.Adadelta(learning_rate=1.0)
}

optimizer_results = {}

for name, optimizer in optimizers.items():
    model = create_mlp(input_dim=2, hidden_layers=[64, 32])
    model.compile(optimizer=optimizer, loss='binary_crossentropy', metrics=['accuracy'])
    
    # Train model
    history = model.fit(X_train_scaled, y_train, epochs=100, batch_size=32, 
                       validation_split=0.2, verbose=0)
    
    # Evaluate
    _, accuracy = model.evaluate(X_test_scaled, y_test, verbose=0)
    optimizer_results[name] = {
        'accuracy': accuracy,
        'history': history.history
    }

print("\\nOptimizer Comparison:")
for name, results in optimizer_results.items():
    print(f"{name}: {results['accuracy']:.3f}")

# Plot training curves for different optimizers
plt.figure(figsize=(15, 5))
for i, (name, results) in enumerate(optimizer_results.items(), 1):
    plt.subplot(1, 3, i)
    plt.plot(results['history']['loss'], label='Training Loss')
    plt.plot(results['history']['val_loss'], label='Validation Loss')
    plt.title(f'{name} - Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Regularization Techniques

### Dropout and Batch Normalization
\`\`\`python
# Create models with different regularization techniques
def create_regularized_model(input_dim, hidden_layers=[64, 32], dropout_rate=0.2, use_batch_norm=True):
    model = keras.Sequential()
    
    # Input layer
    model.add(layers.Dense(hidden_layers[0], activation='relu', input_shape=(input_dim,)))
    if use_batch_norm:
        model.add(layers.BatchNormalization())
    model.add(layers.Dropout(dropout_rate))
    
    # Hidden layers
    for units in hidden_layers[1:]:
        model.add(layers.Dense(units, activation='relu'))
        if use_batch_norm:
            model.add(layers.BatchNormalization())
        model.add(layers.Dropout(dropout_rate))
    
    # Output layer
    model.add(layers.Dense(1, activation='sigmoid'))
    
    return model

# Compare different regularization approaches
regularization_configs = {
    'No Regularization': {'dropout_rate': 0.0, 'use_batch_norm': False},
    'Dropout Only': {'dropout_rate': 0.3, 'use_batch_norm': False},
    'Batch Norm Only': {'dropout_rate': 0.0, 'use_batch_norm': True},
    'Both': {'dropout_rate': 0.3, 'use_batch_norm': True}
}

regularization_results = {}

for name, config in regularization_configs.items():
    model = create_regularized_model(input_dim=2, hidden_layers=[128, 64, 32], **config)
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    
    # Train model
    history = model.fit(X_train_scaled, y_train, epochs=100, batch_size=32, 
                       validation_split=0.2, verbose=0)
    
    # Evaluate
    _, accuracy = model.evaluate(X_test_scaled, y_test, verbose=0)
    regularization_results[name] = {
        'accuracy': accuracy,
        'history': history.history
    }

print("\\nRegularization Comparison:")
for name, results in regularization_results.items():
    print(f"{name}: {results['accuracy']:.3f}")

# Plot training curves
plt.figure(figsize=(15, 10))
for i, (name, results) in enumerate(regularization_results.items(), 1):
    plt.subplot(2, 2, i)
    plt.plot(results['history']['loss'], label='Training Loss')
    plt.plot(results['history']['val_loss'], label='Validation Loss')
    plt.title(f'{name} - Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

### L1 and L2 Regularization
\`\`\`python
# Create models with different weight regularization
def create_l1_l2_model(input_dim, hidden_layers=[64, 32], l1_reg=0.01, l2_reg=0.01):
    model = keras.Sequential()
    
    # Input layer
    model.add(layers.Dense(hidden_layers[0], activation='relu', 
                          kernel_regularizer=keras.regularizers.l1_l2(l1=l1_reg, l2=l2_reg),
                          input_shape=(input_dim,)))
    
    # Hidden layers
    for units in hidden_layers[1:]:
        model.add(layers.Dense(units, activation='relu',
                              kernel_regularizer=keras.regularizers.l1_l2(l1=l1_reg, l2=l2_reg)))
    
    # Output layer
    model.add(layers.Dense(1, activation='sigmoid'))
    
    return model

# Compare different regularization strengths
regularization_strengths = {
    'No Regularization': {'l1_reg': 0.0, 'l2_reg': 0.0},
    'Light L2': {'l1_reg': 0.0, 'l2_reg': 0.001},
    'Medium L2': {'l1_reg': 0.0, 'l2_reg': 0.01},
    'Heavy L2': {'l1_reg': 0.0, 'l2_reg': 0.1},
    'L1 Regularization': {'l1_reg': 0.01, 'l2_reg': 0.0},
    'L1 + L2': {'l1_reg': 0.01, 'l2_reg': 0.01}
}

reg_results = {}

for name, config in regularization_strengths.items():
    model = create_l1_l2_model(input_dim=2, hidden_layers=[128, 64, 32], **config)
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    
    # Train model
    history = model.fit(X_train_scaled, y_train, epochs=100, batch_size=32, 
                       validation_split=0.2, verbose=0)
    
    # Evaluate
    _, accuracy = model.evaluate(X_test_scaled, y_test, verbose=0)
    reg_results[name] = {
        'accuracy': accuracy,
        'history': history.history
    }

print("\\nWeight Regularization Comparison:")
for name, results in reg_results.items():
    print(f"{name}: {results['accuracy']:.3f}")

# Analyze weight distributions
def analyze_weights(model, layer_idx=0):
    weights = model.layers[layer_idx].get_weights()[0]
    return {
        'mean': np.mean(weights),
        'std': np.std(weights),
        'l1_norm': np.sum(np.abs(weights)),
        'l2_norm': np.sqrt(np.sum(weights**2))
    }

print("\\nWeight Analysis (First Hidden Layer):")
for name, results in reg_results.items():
    # Recreate model to get weights
    config = regularization_strengths[name]
    model = create_l1_l2_model(input_dim=2, hidden_layers=[128, 64, 32], **config)
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    model.fit(X_train_scaled, y_train, epochs=100, batch_size=32, verbose=0)
    
    weight_stats = analyze_weights(model)
    print(f"{name}:")
    print(f"  Mean: {weight_stats['mean']:.4f}")
    print(f"  Std: {weight_stats['std']:.4f}")
    print(f"  L1 Norm: {weight_stats['l1_norm']:.4f}")
    print(f"  L2 Norm: {weight_stats['l2_norm']:.4f}")
\`\`\`

## Advanced Architectures

### Autoencoders
\`\`\`python
from tensorflow.keras.datasets import mnist

# Load MNIST dataset
(x_train, _), (x_test, _) = mnist.load_data()
x_train = x_train.astype('float32') / 255.0
x_test = x_test.astype('float32') / 255.0
x_train = x_train.reshape((len(x_train), 28 * 28))
x_test = x_test.reshape((len(x_test), 28 * 28))

# Create autoencoder
def create_autoencoder(input_dim, encoding_dim):
    # Encoder
    encoder = keras.Sequential([
        layers.Dense(128, activation='relu', input_shape=(input_dim,)),
        layers.Dense(64, activation='relu'),
        layers.Dense(encoding_dim, activation='relu')
    ])
    
    # Decoder
    decoder = keras.Sequential([
        layers.Dense(64, activation='relu', input_shape=(encoding_dim,)),
        layers.Dense(128, activation='relu'),
        layers.Dense(input_dim, activation='sigmoid')
    ])
    
    # Autoencoder
    autoencoder = keras.Sequential([encoder, decoder])
    
    return autoencoder, encoder, decoder

# Create and train autoencoder
autoencoder, encoder, decoder = create_autoencoder(input_dim=784, encoding_dim=32)
autoencoder.compile(optimizer='adam', loss='binary_crossentropy')

# Train autoencoder
autoencoder.fit(x_train, x_train, epochs=50, batch_size=256, 
                validation_data=(x_test, x_test), verbose=0)

# Test reconstruction
decoded_imgs = autoencoder.predict(x_test[:10])

# Visualize results
plt.figure(figsize=(20, 4))
for i in range(10):
    # Original
    plt.subplot(2, 10, i + 1)
    plt.imshow(x_test[i].reshape(28, 28), cmap='gray')
    plt.axis('off')
    
    # Reconstructed
    plt.subplot(2, 10, i + 11)
    plt.imshow(decoded_imgs[i].reshape(28, 28), cmap='gray')
    plt.axis('off')

plt.suptitle('Original (top) vs Reconstructed (bottom)')
plt.show()

# Analyze encoding
encoded_imgs = encoder.predict(x_test[:100])
print(f"Original dimension: {x_test.shape[1]}")
print(f"Encoded dimension: {encoded_imgs.shape[1]}")
print(f"Compression ratio: {x_test.shape[1] / encoded_imgs.shape[1]:.1f}:1")
\`\`\`

### Variational Autoencoders (VAE)
\`\`\`python
class VAE(keras.Model):
    def __init__(self, latent_dim, **kwargs):
        super(VAE, self).__init__(**kwargs)
        self.latent_dim = latent_dim
        
        # Encoder
        self.encoder = keras.Sequential([
            layers.Dense(128, activation='relu'),
            layers.Dense(64, activation='relu'),
            layers.Dense(latent_dim * 2)  # mean and log variance
        ])
        
        # Decoder
        self.decoder = keras.Sequential([
            layers.Dense(64, activation='relu'),
            layers.Dense(128, activation='relu'),
            layers.Dense(784, activation='sigmoid')
        ])
    
    def encode(self, x):
        mean, log_var = tf.split(self.encoder(x), num_or_size_splits=2, axis=1)
        return mean, log_var
    
    def reparameterize(self, mean, log_var):
        eps = tf.random.normal(shape=tf.shape(mean))
        return eps * tf.exp(log_var * 0.5) + mean
    
    def decode(self, z):
        return self.decoder(z)
    
    def call(self, x):
        mean, log_var = self.encode(x)
        z = self.reparameterize(mean, log_var)
        reconstructed = self.decode(z)
        
        # Add KL divergence loss
        kl_loss = -0.5 * tf.reduce_mean(
            tf.reduce_sum(1 + log_var - tf.square(mean) - tf.exp(log_var), axis=1)
        )
        self.add_loss(kl_loss)
        
        return reconstructed

# Create and train VAE
vae = VAE(latent_dim=32)
vae.compile(optimizer='adam', loss='binary_crossentropy')

# Train VAE
vae.fit(x_train, x_train, epochs=50, batch_size=256, 
        validation_data=(x_test, x_test), verbose=0)

# Generate new samples
def generate_samples(vae, n_samples=10):
    z = tf.random.normal(shape=(n_samples, vae.latent_dim))
    generated = vae.decode(z)
    return generated.numpy()

# Generate and visualize samples
generated_samples = generate_samples(vae, 10)

plt.figure(figsize=(20, 4))
for i in range(10):
    plt.subplot(1, 10, i + 1)
    plt.imshow(generated_samples[i].reshape(28, 28), cmap='gray')
    plt.axis('off')

plt.suptitle('Generated Samples from VAE')
plt.show()
\`\`\`

## Practical Exercise

Apply deep learning fundamentals:
1. Build a simple neural network from scratch
2. Compare different activation functions
3. Implement various regularization techniques
4. Create and train an autoencoder
5. Experiment with different optimizers
6. Analyze the effect of network depth and width
7. Build a VAE for generative modeling

## Summary & Next Steps

Deep learning fundamentals provide the foundation for understanding modern neural networks. Master these concepts to build sophisticated AI systems.

**Next up**: Part 9 - Neural networks and CNNs for computer vision.`,
            readTime: 30,
            publishedAt: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Deep Learning', 'Neural Networks', 'Backpropagation', 'Regularization', 'Autoencoders']
          },
          {
            id: 'ml-part-9',
            partNumber: 9,
            title: 'Neural Networks and CNNs',
            summary: 'Master Convolutional Neural Networks and advanced neural network architectures for computer vision.',
            content: `# Part 9: Neural Networks and CNNs

Learn Convolutional Neural Networks and advanced neural network architectures for computer vision and beyond.

## Convolutional Neural Networks (CNNs)

### CNN Fundamentals
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import cifar10, mnist
from tensorflow.keras.utils import to_categorical
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns

# Load CIFAR-10 dataset
(x_train, y_train), (x_test, y_test) = cifar10.load_data()

# Normalize pixel values
x_train = x_train.astype('float32') / 255.0
x_test = x_test.astype('float32') / 255.0

# Convert labels to categorical
y_train = to_categorical(y_train, 10)
y_test = to_categorical(y_test, 10)

print(f"Training data shape: {x_train.shape}")
print(f"Test data shape: {x_test.shape}")
print(f"Number of classes: {y_train.shape[1]}")

# CIFAR-10 class names
class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer', 
               'dog', 'frog', 'horse', 'ship', 'truck']

# Visualize sample images
plt.figure(figsize=(15, 6))
for i in range(15):
    plt.subplot(3, 5, i + 1)
    plt.imshow(x_train[i])
    plt.title(class_names[np.argmax(y_train[i])])
    plt.axis('off')
plt.tight_layout()
plt.show()

# Basic CNN architecture
def create_basic_cnn(input_shape, num_classes):
    model = keras.Sequential([
        # First convolutional block
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.MaxPooling2D((2, 2)),
        
        # Second convolutional block
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        
        # Third convolutional block
        layers.Conv2D(64, (3, 3), activation='relu'),
        
        # Dense layers
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    return model

# Create and compile model
basic_cnn = create_basic_cnn(input_shape=(32, 32, 3), num_classes=10)
basic_cnn.compile(optimizer='adam',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])

# Display model architecture
basic_cnn.summary()

# Train the model
history_basic = basic_cnn.fit(x_train, y_train, epochs=10, batch_size=32,
                             validation_data=(x_test, y_test), verbose=1)

# Evaluate model
test_loss, test_accuracy = basic_cnn.evaluate(x_test, y_test, verbose=0)
print(f"\\nBasic CNN Test Accuracy: {test_accuracy:.3f}")
\`\`\`

### Advanced CNN Architectures
\`\`\`python
# Improved CNN with batch normalization and more layers
def create_improved_cnn(input_shape, num_classes):
    model = keras.Sequential([
        # First block
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.BatchNormalization(),
        layers.Conv2D(32, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Second block
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Third block
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Dense layers
        layers.Flatten(),
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    return model

# Create improved model
improved_cnn = create_improved_cnn(input_shape=(32, 32, 3), num_classes=10)
improved_cnn.compile(optimizer='adam',
                     loss='categorical_crossentropy',
                     metrics=['accuracy'])

# Train improved model
history_improved = improved_cnn.fit(x_train, y_train, epochs=20, batch_size=32,
                                   validation_data=(x_test, y_test), verbose=1)

# Evaluate improved model
test_loss_improved, test_accuracy_improved = improved_cnn.evaluate(x_test, y_test, verbose=0)
print(f"\\nImproved CNN Test Accuracy: {test_accuracy_improved:.3f}")

# Compare training histories
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.plot(history_basic.history['accuracy'], label='Basic CNN - Train')
plt.plot(history_basic.history['val_accuracy'], label='Basic CNN - Val')
plt.plot(history_improved.history['accuracy'], label='Improved CNN - Train')
plt.plot(history_improved.history['val_accuracy'], label='Improved CNN - Val')
plt.title('Model Accuracy Comparison')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 2)
plt.plot(history_basic.history['loss'], label='Basic CNN - Train')
plt.plot(history_basic.history['val_loss'], label='Basic CNN - Val')
plt.plot(history_improved.history['loss'], label='Improved CNN - Train')
plt.plot(history_improved.history['val_loss'], label='Improved CNN - Val')
plt.title('Model Loss Comparison')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 3)
models = ['Basic CNN', 'Improved CNN']
accuracies = [test_accuracy, test_accuracy_improved]
plt.bar(models, accuracies, color=['skyblue', 'lightcoral'])
plt.title('Final Test Accuracy')
plt.ylabel('Accuracy')
for i, v in enumerate(accuracies):
    plt.text(i, v + 0.01, f'{v:.3f}', ha='center', va='bottom')
plt.ylim(0, 1)
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

### Data Augmentation
\`\`\`python
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Create data augmentation generator
datagen = ImageDataGenerator(
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True,
    zoom_range=0.1,
    fill_mode='nearest'
)

# Create model for data augmentation experiment
augmented_cnn = create_improved_cnn(input_shape=(32, 32, 3), num_classes=10)
augmented_cnn.compile(optimizer='adam',
                      loss='categorical_crossentropy',
                      metrics=['accuracy'])

# Train with data augmentation
history_augmented = augmented_cnn.fit(
    datagen.flow(x_train, y_train, batch_size=32),
    epochs=20,
    validation_data=(x_test, y_test),
    steps_per_epoch=len(x_train) // 32,
    verbose=1
)

# Evaluate augmented model
test_loss_aug, test_accuracy_aug = augmented_cnn.evaluate(x_test, y_test, verbose=0)
print(f"\\nAugmented CNN Test Accuracy: {test_accuracy_aug:.3f}")

# Visualize augmented images
plt.figure(figsize=(15, 6))
for i in range(15):
    plt.subplot(3, 5, i + 1)
    # Generate augmented image
    augmented = datagen.flow(x_train[i:i+1], batch_size=1).next()[0]
    plt.imshow(augmented[0])
    plt.title(f'Augmented {class_names[np.argmax(y_train[i])]}')
    plt.axis('off')
plt.tight_layout()
plt.show()

# Compare all models
plt.figure(figsize=(12, 5))
models = ['Basic CNN', 'Improved CNN', 'Augmented CNN']
accuracies = [test_accuracy, test_accuracy_improved, test_accuracy_aug]

plt.subplot(1, 2, 1)
bars = plt.bar(models, accuracies, color=['skyblue', 'lightcoral', 'lightgreen'])
plt.title('Model Performance Comparison')
plt.ylabel('Test Accuracy')
plt.ylim(0, 1)
for i, v in enumerate(accuracies):
    plt.text(i, v + 0.01, f'{v:.3f}', ha='center', va='bottom')
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
plt.plot(history_basic.history['val_accuracy'], label='Basic CNN', linewidth=2)
plt.plot(history_improved.history['val_accuracy'], label='Improved CNN', linewidth=2)
plt.plot(history_augmented.history['val_accuracy'], label='Augmented CNN', linewidth=2)
plt.title('Validation Accuracy Over Time')
plt.xlabel('Epoch')
plt.ylabel('Validation Accuracy')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Transfer Learning

### Using Pre-trained Models
\`\`\`python
from tensorflow.keras.applications import VGG16, ResNet50, MobileNetV2
from tensorflow.keras.applications.vgg16 import preprocess_input

# Load pre-trained VGG16 model
base_model = VGG16(weights='imagenet', include_top=False, input_shape=(32, 32, 3))

# Freeze base model layers
base_model.trainable = False

# Create transfer learning model
def create_transfer_model(base_model, num_classes):
    model = keras.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.5),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    return model

# Create transfer learning model
transfer_model = create_transfer_model(base_model, 10)
transfer_model.compile(optimizer='adam',
                       loss='categorical_crossentropy',
                       metrics=['accuracy'])

# Display model architecture
print("Transfer Learning Model Architecture:")
transfer_model.summary()

# Train transfer learning model
history_transfer = transfer_model.fit(x_train, y_train, epochs=10, batch_size=32,
                                     validation_data=(x_test, y_test), verbose=1)

# Evaluate transfer learning model
test_loss_transfer, test_accuracy_transfer = transfer_model.evaluate(x_test, y_test, verbose=0)
print(f"\\nTransfer Learning Test Accuracy: {test_accuracy_transfer:.3f}")

# Fine-tuning: Unfreeze some layers
base_model.trainable = True
fine_tune_at = 10  # Freeze layers before this index

for layer in base_model.layers[:fine_tune_at]:
    layer.trainable = False

# Recompile with lower learning rate
transfer_model.compile(optimizer=keras.optimizers.Adam(learning_rate=0.0001),
                       loss='categorical_crossentropy',
                       metrics=['accuracy'])

# Fine-tune the model
history_finetune = transfer_model.fit(x_train, y_train, epochs=5, batch_size=32,
                                     validation_data=(x_test, y_test), verbose=1)

# Evaluate fine-tuned model
test_loss_finetune, test_accuracy_finetune = transfer_model.evaluate(x_test, y_test, verbose=0)
print(f"\\nFine-tuned Model Test Accuracy: {test_accuracy_finetune:.3f}")
\`\`\`

### Multiple Pre-trained Models Comparison
\`\`\`python
# Compare different pre-trained models
pre_trained_models = {
    'VGG16': VGG16(weights='imagenet', include_top=False, input_shape=(32, 32, 3)),
    'ResNet50': ResNet50(weights='imagenet', include_top=False, input_shape=(32, 32, 3)),
    'MobileNetV2': MobileNetV2(weights='imagenet', include_top=False, input_shape=(32, 32, 3))
}

transfer_results = {}

for name, base_model in pre_trained_models.items():
    print(f"\\nTraining {name}...")
    
    # Freeze base model
    base_model.trainable = False
    
    # Create model
    model = create_transfer_model(base_model, 10)
    model.compile(optimizer='adam',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    
    # Train model
    history = model.fit(x_train, y_train, epochs=5, batch_size=32,
                       validation_data=(x_test, y_test), verbose=0)
    
    # Evaluate
    _, accuracy = model.evaluate(x_test, y_test, verbose=0)
    transfer_results[name] = {
        'accuracy': accuracy,
        'history': history.history
    }
    
    print(f"{name} Test Accuracy: {accuracy:.3f}")

# Compare transfer learning results
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
model_names = list(transfer_results.keys())
accuracies = [transfer_results[name]['accuracy'] for name in model_names]
bars = plt.bar(model_names, accuracies, color=['skyblue', 'lightcoral', 'lightgreen'])
plt.title('Transfer Learning Model Comparison')
plt.ylabel('Test Accuracy')
plt.ylim(0, 1)
for i, v in enumerate(accuracies):
    plt.text(i, v + 0.01, f'{v:.3f}', ha='center', va='bottom')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 2)
for name, results in transfer_results.items():
    plt.plot(results['history']['val_accuracy'], label=name, linewidth=2)
plt.title('Validation Accuracy Over Time')
plt.xlabel('Epoch')
plt.ylabel('Validation Accuracy')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 3)
for name, results in transfer_results.items():
    plt.plot(results['history']['val_loss'], label=name, linewidth=2)
plt.title('Validation Loss Over Time')
plt.xlabel('Epoch')
plt.ylabel('Validation Loss')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Advanced CNN Architectures

### Residual Networks (ResNet)
\`\`\`python
# Implement ResNet block
class ResidualBlock(keras.layers.Layer):
    def __init__(self, filters, kernel_size=3, stride=1, **kwargs):
        super(ResidualBlock, self).__init__(**kwargs)
        self.filters = filters
        self.kernel_size = kernel_size
        self.stride = stride
        
        self.conv1 = layers.Conv2D(filters, kernel_size, strides=stride, 
                                   padding='same', activation='relu')
        self.bn1 = layers.BatchNormalization()
        self.conv2 = layers.Conv2D(filters, kernel_size, strides=1, 
                                   padding='same', activation='relu')
        self.bn2 = layers.BatchNormalization()
        
        # Shortcut connection
        if stride != 1:
            self.shortcut = keras.Sequential([
                layers.Conv2D(filters, 1, strides=stride, padding='same'),
                layers.BatchNormalization()
            ])
        else:
            self.shortcut = lambda x: x
    
    def call(self, inputs, training=None):
        residual = self.shortcut(inputs)
        
        x = self.conv1(inputs)
        x = self.bn1(x, training=training)
        x = layers.ReLU()(x)
        
        x = self.conv2(x)
        x = self.bn2(x, training=training)
        
        x = layers.Add()([x, residual])
        x = layers.ReLU()(x)
        
        return x

# Create ResNet model
def create_resnet(input_shape, num_classes):
    inputs = keras.Input(shape=input_shape)
    
    # Initial convolution
    x = layers.Conv2D(64, 7, strides=2, padding='same', activation='relu')(inputs)
    x = layers.BatchNormalization()(x)
    x = layers.MaxPooling2D(3, strides=2, padding='same')(x)
    
    # Residual blocks
    x = ResidualBlock(64)(x)
    x = ResidualBlock(64)(x)
    
    x = ResidualBlock(128, stride=2)(x)
    x = ResidualBlock(128)(x)
    
    x = ResidualBlock(256, stride=2)(x)
    x = ResidualBlock(256)(x)
    
    # Global average pooling and classification
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dense(512, activation='relu')(x)
    x = layers.Dropout(0.5)(x)
    outputs = layers.Dense(num_classes, activation='softmax')(x)
    
    model = keras.Model(inputs, outputs)
    return model

# Create and train ResNet
resnet_model = create_resnet(input_shape=(32, 32, 3), num_classes=10)
resnet_model.compile(optimizer='adam',
                     loss='categorical_crossentropy',
                     metrics=['accuracy'])

print("ResNet Model Architecture:")
resnet_model.summary()

# Train ResNet (with fewer epochs due to complexity)
history_resnet = resnet_model.fit(x_train, y_train, epochs=10, batch_size=32,
                                 validation_data=(x_test, y_test), verbose=1)

# Evaluate ResNet
test_loss_resnet, test_accuracy_resnet = resnet_model.evaluate(x_test, y_test, verbose=0)
print(f"\\nResNet Test Accuracy: {test_accuracy_resnet:.3f}")
\`\`\`

### Attention Mechanisms
\`\`\`python
# Implement attention mechanism
class AttentionBlock(keras.layers.Layer):
    def __init__(self, **kwargs):
        super(AttentionBlock, self).__init__(**kwargs)
        
    def build(self, input_shape):
        self.W = self.add_weight(shape=(input_shape[-1], input_shape[-1]),
                                initializer='random_normal',
                                trainable=True)
        self.b = self.add_weight(shape=(input_shape[-1],),
                                initializer='zeros',
                                trainable=True)
        
    def call(self, inputs):
        # Self-attention mechanism
        attention_weights = tf.nn.softmax(tf.matmul(inputs, self.W) + self.b)
        attended_features = tf.matmul(attention_weights, inputs)
        return attended_features

# Create CNN with attention
def create_attention_cnn(input_shape, num_classes):
    inputs = keras.Input(shape=input_shape)
    
    # Convolutional layers
    x = layers.Conv2D(32, (3, 3), activation='relu')(inputs)
    x = layers.BatchNormalization()(x)
    x = layers.MaxPooling2D((2, 2))(x)
    
    x = layers.Conv2D(64, (3, 3), activation='relu')(x)
    x = layers.BatchNormalization()(x)
    x = layers.MaxPooling2D((2, 2))(x)
    
    x = layers.Conv2D(128, (3, 3), activation='relu')(x)
    x = layers.BatchNormalization()(x)
    
    # Global average pooling
    x = layers.GlobalAveragePooling2D()(x)
    
    # Attention mechanism
    x = layers.Reshape((1, -1))(x)
    x = AttentionBlock()(x)
    x = layers.Flatten()(x)
    
    # Classification layers
    x = layers.Dense(256, activation='relu')(x)
    x = layers.Dropout(0.5)(x)
    outputs = layers.Dense(num_classes, activation='softmax')(x)
    
    model = keras.Model(inputs, outputs)
    return model

# Create and train attention CNN
attention_cnn = create_attention_cnn(input_shape=(32, 32, 3), num_classes=10)
attention_cnn.compile(optimizer='adam',
                      loss='categorical_crossentropy',
                      metrics=['accuracy'])

print("Attention CNN Model Architecture:")
attention_cnn.summary()

# Train attention CNN
history_attention = attention_cnn.fit(x_train, y_train, epochs=10, batch_size=32,
                                     validation_data=(x_test, y_test), verbose=1)

# Evaluate attention CNN
test_loss_attention, test_accuracy_attention = attention_cnn.evaluate(x_test, y_test, verbose=0)
print(f"\\nAttention CNN Test Accuracy: {test_accuracy_attention:.3f}")
\`\`\`

## Model Analysis and Visualization

### Feature Maps Visualization
\`\`\`python
# Visualize feature maps from different layers
def visualize_feature_maps(model, image, layer_names):
    # Create a model that outputs feature maps
    feature_extractor = keras.Model(
        inputs=model.input,
        outputs=[model.get_layer(name).output for name in layer_names]
    )
    
    # Get feature maps
    feature_maps = feature_extractor(np.expand_dims(image, axis=0))
    
    # Visualize feature maps
    fig, axes = plt.subplots(len(layer_names), 8, figsize=(20, 3*len(layer_names)))
    if len(layer_names) == 1:
        axes = axes.reshape(1, -1)
    
    for i, (layer_name, feature_map) in enumerate(zip(layer_names, feature_maps)):
        # Get first 8 feature maps
        for j in range(min(8, feature_map.shape[-1])):
            axes[i, j].imshow(feature_map[0, :, :, j], cmap='viridis')
            axes[i, j].set_title(f'{layer_name}\\nFeature {j+1}')
            axes[i, j].axis('off')
    
    plt.tight_layout()
    plt.show()

# Visualize feature maps from the improved CNN
sample_image = x_test[0]
layer_names = ['conv2d_1', 'conv2d_3', 'conv2d_5']
visualize_feature_maps(improved_cnn, sample_image, layer_names)

# Show original image
plt.figure(figsize=(5, 5))
plt.imshow(sample_image)
plt.title(f'Original Image: {class_names[np.argmax(y_test[0])]}')
plt.axis('off')
plt.show()
\`\`\`

### Model Predictions Analysis
\`\`\`python
# Analyze model predictions
def analyze_predictions(model, x_test, y_test, class_names):
    # Get predictions
    predictions = model.predict(x_test)
    predicted_classes = np.argmax(predictions, axis=1)
    true_classes = np.argmax(y_test, axis=1)
    
    # Calculate accuracy
    accuracy = np.mean(predicted_classes == true_classes)
    print(f"Model Accuracy: {accuracy:.3f}")
    
    # Confusion matrix
    cm = confusion_matrix(true_classes, predicted_classes)
    
    plt.figure(figsize=(12, 5))
    
    plt.subplot(1, 2, 1)
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=class_names, yticklabels=class_names)
    plt.title('Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    
    # Classification report
    plt.subplot(1, 2, 2)
    report = classification_report(true_classes, predicted_classes, 
                                 target_names=class_names, output_dict=True)
    
    # Plot per-class accuracy
    class_accuracies = [report[class_name]['precision'] for class_name in class_names]
    bars = plt.bar(class_names, class_accuracies, color='lightcoral')
    plt.title('Per-Class Precision')
    plt.xlabel('Class')
    plt.ylabel('Precision')
    plt.xticks(rotation=45)
    for i, v in enumerate(class_accuracies):
        plt.text(i, v + 0.01, f'{v:.2f}', ha='center', va='bottom')
    plt.ylim(0, 1)
    
    plt.tight_layout()
    plt.show()
    
    return predictions, predicted_classes, true_classes

# Analyze predictions for the best model
predictions, predicted_classes, true_classes = analyze_predictions(
    improved_cnn, x_test, y_test, class_names
)

# Show some misclassified examples
misclassified_indices = np.where(predicted_classes != true_classes)[0]
if len(misclassified_indices) > 0:
    plt.figure(figsize=(15, 6))
    for i in range(min(10, len(misclassified_indices))):
        idx = misclassified_indices[i]
        plt.subplot(2, 5, i + 1)
        plt.imshow(x_test[idx])
        plt.title(f'True: {class_names[true_classes[idx]]}\\n'
                 f'Pred: {class_names[predicted_classes[idx]]}')
        plt.axis('off')
    plt.suptitle('Misclassified Examples')
    plt.tight_layout()
    plt.show()
\`\`\`

## Practical Exercise

Apply CNN techniques:
1. Build a basic CNN from scratch
2. Implement data augmentation
3. Use transfer learning with pre-trained models
4. Create advanced architectures (ResNet, Attention)
5. Visualize feature maps and model behavior
6. Analyze model predictions and errors
7. Compare different CNN architectures

## Summary & Next Steps

CNNs are powerful tools for computer vision tasks. Master these architectures and techniques to build state-of-the-art image recognition systems.

**Next up**: Part 10 - Natural language processing with neural networks.`,
            readTime: 31,
            publishedAt: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['CNNs', 'Computer Vision', 'Transfer Learning', 'ResNet', 'Attention']
          },
          {
            id: 'ml-part-10',
            partNumber: 10,
            title: 'Natural Language Processing',
            summary: 'Master NLP techniques with neural networks, including RNNs, LSTMs, and Transformers.',
            content: `# Part 10: Natural Language Processing

Learn advanced NLP techniques using neural networks, from RNNs and LSTMs to modern Transformer architectures.

## Text Preprocessing and Representation

### Text Preprocessing Pipeline
\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer, WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Download required NLTK data
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

# Sample text data
texts = [
    "I love machine learning and artificial intelligence!",
    "Natural language processing is fascinating.",
    "Deep learning models are getting better every day.",
    "I hate when my code doesn't work properly.",
    "This movie was absolutely terrible and boring.",
    "The weather is beautiful today, perfect for a walk.",
    "I'm so excited about the new AI developments!",
    "This product is amazing and worth every penny.",
    "I can't believe how bad this service is.",
    "The food at this restaurant is delicious and fresh."
]

labels = [1, 1, 1, 0, 0, 1, 1, 1, 0, 1]  # 1: positive, 0: negative

# Text preprocessing functions
def preprocess_text(text, remove_stopwords=True, lemmatize=True):
    """Comprehensive text preprocessing"""
    # Convert to lowercase
    text = text.lower()
    
    # Remove special characters and digits
    text = re.sub(r'[^a-zA-Z\\s]', '', text)
    
    # Tokenize
    tokens = word_tokenize(text)
    
    # Remove stopwords
    if remove_stopwords:
        stop_words = set(stopwords.words('english'))
        tokens = [token for token in tokens if token not in stop_words]
    
    # Lemmatize
    if lemmatize:
        lemmatizer = WordNetLemmatizer()
        tokens = [lemmatizer.lemmatize(token) for token in tokens]
    
    return ' '.join(tokens)

# Apply preprocessing
processed_texts = [preprocess_text(text) for text in texts]

print("Original vs Processed Text:")
for i in range(3):
    print(f"Original: {texts[i]}")
    print(f"Processed: {processed_texts[i]}")
    print()

# Create DataFrame
df = pd.DataFrame({'text': texts, 'processed_text': processed_texts, 'label': labels})
print("Dataset Info:")
print(f"Total samples: {len(df)}")
print(f"Positive samples: {sum(labels)}")
print(f"Negative samples: {len(labels) - sum(labels)}")
\`\`\`

### Text Vectorization
\`\`\`python
# Different text vectorization methods
vectorizers = {
    'Count Vectorizer': CountVectorizer(max_features=1000),
    'TF-IDF Vectorizer': TfidfVectorizer(max_features=1000),
    'TF-IDF (Bigrams)': TfidfVectorizer(max_features=1000, ngram_range=(1, 2)),
    'TF-IDF (Trigrams)': TfidfVectorizer(max_features=1000, ngram_range=(1, 3))
}

vectorization_results = {}

for name, vectorizer in vectorizers.items():
    # Fit and transform
    X = vectorizer.fit_transform(processed_texts)
    
    # Convert to dense array for visualization
    X_dense = X.toarray()
    
    vectorization_results[name] = {
        'X': X_dense,
        'feature_names': vectorizer.get_feature_names_out(),
        'shape': X_dense.shape
    }
    
    print(f"{name}:")
    print(f"  Shape: {X_dense.shape}")
    print(f"  Sample features: {vectorizer.get_feature_names_out()[:10]}")
    print()

# Visualize TF-IDF matrix
tfidf_matrix = vectorization_results['TF-IDF Vectorizer']['X']
feature_names = vectorization_results['TF-IDF Vectorizer']['feature_names']

plt.figure(figsize=(12, 8))
sns.heatmap(tfidf_matrix[:5, :20], 
            xticklabels=feature_names[:20], 
            yticklabels=[f"Doc {i+1}" for i in range(5)],
            cmap='Blues', annot=True, fmt='.2f')
plt.title('TF-IDF Matrix (First 5 documents, Top 20 features)')
plt.xlabel('Features')
plt.ylabel('Documents')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
\`\`\`

## Recurrent Neural Networks (RNNs)

### Basic RNN Implementation
\`\`\`python
# Prepare data for RNN
tokenizer = Tokenizer(num_words=1000, oov_token='<OOV>')
tokenizer.fit_on_texts(processed_texts)

# Convert texts to sequences
sequences = tokenizer.texts_to_sequences(processed_texts)

# Pad sequences
max_length = 20
padded_sequences = pad_sequences(sequences, maxlen=max_length, padding='post')

print("Text to Sequence Conversion:")
for i in range(3):
    print(f"Original: {processed_texts[i]}")
    print(f"Sequence: {sequences[i]}")
    print(f"Padded: {padded_sequences[i]}")
    print()

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    padded_sequences, labels, test_size=0.3, random_state=42
)

# Basic RNN model
def create_basic_rnn(vocab_size, embedding_dim, max_length, num_classes):
    model = keras.Sequential([
        layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
        layers.SimpleRNN(64, return_sequences=False),
        layers.Dense(32, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='sigmoid')
    ])
    
    return model

# Create and train basic RNN
basic_rnn = create_basic_rnn(
    vocab_size=1000, 
    embedding_dim=128, 
    max_length=max_length, 
    num_classes=1
)

basic_rnn.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
basic_rnn.summary()

# Train basic RNN
history_basic_rnn = basic_rnn.fit(
    X_train, y_train, 
    epochs=50, 
    batch_size=8, 
    validation_data=(X_test, y_test),
    verbose=1
)

# Evaluate basic RNN
test_loss, test_accuracy = basic_rnn.evaluate(X_test, y_test, verbose=0)
print(f"\\nBasic RNN Test Accuracy: {test_accuracy:.3f}")
\`\`\`

### LSTM and GRU Networks
\`\`\`python
# LSTM model
def create_lstm_model(vocab_size, embedding_dim, max_length, num_classes):
    model = keras.Sequential([
        layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
        layers.LSTM(64, return_sequences=True),
        layers.LSTM(32, return_sequences=False),
        layers.Dense(32, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='sigmoid')
    ])
    
    return model

# GRU model
def create_gru_model(vocab_size, embedding_dim, max_length, num_classes):
    model = keras.Sequential([
        layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
        layers.GRU(64, return_sequences=True),
        layers.GRU(32, return_sequences=False),
        layers.Dense(32, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='sigmoid')
    ])
    
    return model

# Bidirectional LSTM
def create_bidirectional_lstm(vocab_size, embedding_dim, max_length, num_classes):
    model = keras.Sequential([
        layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
        layers.Bidirectional(layers.LSTM(64, return_sequences=True)),
        layers.Bidirectional(layers.LSTM(32, return_sequences=False)),
        layers.Dense(32, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='sigmoid')
    ])
    
    return model

# Create models
models = {
    'LSTM': create_lstm_model(1000, 128, max_length, 1),
    'GRU': create_gru_model(1000, 128, max_length, 1),
    'Bidirectional LSTM': create_bidirectional_lstm(1000, 128, max_length, 1)
}

# Train and evaluate models
model_results = {}

for name, model in models.items():
    print(f"\\nTraining {name}...")
    
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    
    history = model.fit(
        X_train, y_train,
        epochs=50,
        batch_size=8,
        validation_data=(X_test, y_test),
        verbose=0
    )
    
    # Evaluate
    test_loss, test_accuracy = model.evaluate(X_test, y_test, verbose=0)
    
    model_results[name] = {
        'accuracy': test_accuracy,
        'history': history.history
    }
    
    print(f"{name} Test Accuracy: {test_accuracy:.3f}")

# Compare model performance
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
model_names = list(model_results.keys())
accuracies = [model_results[name]['accuracy'] for name in model_names]
bars = plt.bar(model_names, accuracies, color=['skyblue', 'lightcoral', 'lightgreen'])
plt.title('RNN Model Comparison')
plt.ylabel('Test Accuracy')
plt.ylim(0, 1)
for i, v in enumerate(accuracies):
    plt.text(i, v + 0.01, f'{v:.3f}', ha='center', va='bottom')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 2)
for name, results in model_results.items():
    plt.plot(results['history']['val_accuracy'], label=name, linewidth=2)
plt.title('Validation Accuracy Over Time')
plt.xlabel('Epoch')
plt.ylabel('Validation Accuracy')
plt.legend()
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 3)
for name, results in model_results.items():
    plt.plot(results['history']['val_loss'], label=name, linewidth=2)
plt.title('Validation Loss Over Time')
plt.xlabel('Epoch')
plt.ylabel('Validation Loss')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Word Embeddings

### Pre-trained Word Embeddings
\`\`\`python
# Load pre-trained GloVe embeddings (simplified example)
def load_glove_embeddings(embedding_dim=100):
    """Load GloVe embeddings (in practice, you'd load from file)"""
    # This is a simplified example - in practice, you'd load from GloVe file
    vocab_size = len(tokenizer.word_index) + 1
    embedding_matrix = np.random.normal(size=(vocab_size, embedding_dim))
    
    # In practice, you'd populate this with actual GloVe vectors
    return embedding_matrix

# Create model with pre-trained embeddings
def create_embedding_model(vocab_size, embedding_dim, max_length, embedding_matrix, num_classes):
    model = keras.Sequential([
        layers.Embedding(
            vocab_size, 
            embedding_dim, 
            input_length=max_length,
            weights=[embedding_matrix],
            trainable=False  # Freeze embeddings
        ),
        layers.LSTM(64, return_sequences=True),
        layers.LSTM(32, return_sequences=False),
        layers.Dense(32, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='sigmoid')
    ])
    
    return model

# Create embedding matrix
embedding_matrix = load_glove_embeddings(embedding_dim=100)

# Create model with pre-trained embeddings
embedding_model = create_embedding_model(
    vocab_size=1000,
    embedding_dim=100,
    max_length=max_length,
    embedding_matrix=embedding_matrix,
    num_classes=1
)

embedding_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train model with pre-trained embeddings
history_embedding = embedding_model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=8,
    validation_data=(X_test, y_test),
    verbose=0
)

# Evaluate
test_loss_embedding, test_accuracy_embedding = embedding_model.evaluate(X_test, y_test, verbose=0)
print(f"\\nModel with Pre-trained Embeddings Test Accuracy: {test_accuracy_embedding:.3f}")

# Compare with trainable embeddings
trainable_embedding_model = create_lstm_model(1000, 100, max_length, 1)
trainable_embedding_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

history_trainable = trainable_embedding_model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=8,
    validation_data=(X_test, y_test),
    verbose=0
)

test_loss_trainable, test_accuracy_trainable = trainable_embedding_model.evaluate(X_test, y_test, verbose=0)
print(f"Model with Trainable Embeddings Test Accuracy: {test_accuracy_trainable:.3f}")

# Visualize embedding comparison
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
embedding_types = ['Pre-trained', 'Trainable']
embedding_accuracies = [test_accuracy_embedding, test_accuracy_trainable]
bars = plt.bar(embedding_types, embedding_accuracies, color=['skyblue', 'lightcoral'])
plt.title('Embedding Type Comparison')
plt.ylabel('Test Accuracy')
plt.ylim(0, 1)
for i, v in enumerate(embedding_accuracies):
    plt.text(i, v + 0.01, f'{v:.3f}', ha='center', va='bottom')
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
plt.plot(history_embedding.history['val_accuracy'], label='Pre-trained Embeddings', linewidth=2)
plt.plot(history_trainable.history['val_accuracy'], label='Trainable Embeddings', linewidth=2)
plt.title('Validation Accuracy Over Time')
plt.xlabel('Epoch')
plt.ylabel('Validation Accuracy')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## Attention Mechanisms

### Self-Attention Implementation
\`\`\`python
# Self-attention layer
class SelfAttention(keras.layers.Layer):
    def __init__(self, d_model, **kwargs):
        super(SelfAttention, self).__init__(**kwargs)
        self.d_model = d_model
        
    def build(self, input_shape):
        self.W_q = self.add_weight(
            shape=(input_shape[-1], self.d_model),
            initializer='random_normal',
            trainable=True,
            name='W_q'
        )
        self.W_k = self.add_weight(
            shape=(input_shape[-1], self.d_model),
            initializer='random_normal',
            trainable=True,
            name='W_k'
        )
        self.W_v = self.add_weight(
            shape=(input_shape[-1], self.d_model),
            initializer='random_normal',
            trainable=True,
            name='W_v'
        )
        
    def call(self, inputs):
        # Compute Q, K, V
        Q = tf.matmul(inputs, self.W_q)
        K = tf.matmul(inputs, self.W_k)
        V = tf.matmul(inputs, self.W_v)
        
        # Compute attention scores
        attention_scores = tf.matmul(Q, K, transpose_b=True)
        attention_scores = attention_scores / tf.sqrt(tf.cast(self.d_model, tf.float32))
        
        # Apply softmax
        attention_weights = tf.nn.softmax(attention_scores, axis=-1)
        
        # Apply attention to values
        output = tf.matmul(attention_weights, V)
        
        return output, attention_weights

# Model with self-attention
def create_attention_model(vocab_size, embedding_dim, max_length, d_model, num_classes):
    inputs = keras.Input(shape=(max_length,))
    
    # Embedding layer
    x = layers.Embedding(vocab_size, embedding_dim, input_length=max_length)(inputs)
    
    # Self-attention
    attention_output, attention_weights = SelfAttention(d_model)(x)
    
    # Global average pooling
    x = layers.GlobalAveragePooling1D()(attention_output)
    
    # Classification layers
    x = layers.Dense(32, activation='relu')(x)
    x = layers.Dropout(0.5)(x)
    outputs = layers.Dense(num_classes, activation='sigmoid')(x)
    
    model = keras.Model(inputs, outputs)
    return model

# Create attention model
attention_model = create_attention_model(
    vocab_size=1000,
    embedding_dim=128,
    max_length=max_length,
    d_model=64,
    num_classes=1
)

attention_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train attention model
history_attention = attention_model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=8,
    validation_data=(X_test, y_test),
    verbose=0
)

# Evaluate attention model
test_loss_attention, test_accuracy_attention = attention_model.evaluate(X_test, y_test, verbose=0)
print(f"\\nAttention Model Test Accuracy: {test_accuracy_attention:.3f}")
\`\`\`

## Transformer Architecture

### Simplified Transformer Implementation
\`\`\`python
# Multi-head attention
class MultiHeadAttention(keras.layers.Layer):
    def __init__(self, d_model, num_heads, **kwargs):
        super(MultiHeadAttention, self).__init__(**kwargs)
        self.d_model = d_model
        self.num_heads = num_heads
        self.depth = d_model // num_heads
        
    def build(self, input_shape):
        self.W_q = self.add_weight(
            shape=(input_shape[-1], self.d_model),
            initializer='random_normal',
            trainable=True
        )
        self.W_k = self.add_weight(
            shape=(input_shape[-1], self.d_model),
            initializer='random_normal',
            trainable=True
        )
        self.W_v = self.add_weight(
            shape=(input_shape[-1], self.d_model),
            initializer='random_normal',
            trainable=True
        )
        self.dense = layers.Dense(input_shape[-1])
        
    def call(self, inputs):
        batch_size = tf.shape(inputs)[0]
        
        # Linear transformations
        Q = tf.matmul(inputs, self.W_q)
        K = tf.matmul(inputs, self.W_k)
        V = tf.matmul(inputs, self.W_v)
        
        # Reshape for multi-head attention
        Q = tf.reshape(Q, (batch_size, -1, self.num_heads, self.depth))
        K = tf.reshape(K, (batch_size, -1, self.num_heads, self.depth))
        V = tf.reshape(V, (batch_size, -1, self.num_heads, self.depth))
        
        # Transpose for attention computation
        Q = tf.transpose(Q, perm=[0, 2, 1, 3])
        K = tf.transpose(K, perm=[0, 2, 1, 3])
        V = tf.transpose(V, perm=[0, 2, 1, 3])
        
        # Scaled dot-product attention
        attention_scores = tf.matmul(Q, K, transpose_b=True)
        attention_scores = attention_scores / tf.sqrt(tf.cast(self.depth, tf.float32))
        
        attention_weights = tf.nn.softmax(attention_scores, axis=-1)
        
        # Apply attention to values
        attention_output = tf.matmul(attention_weights, V)
        
        # Reshape and apply final linear transformation
        attention_output = tf.transpose(attention_output, perm=[0, 2, 1, 3])
        attention_output = tf.reshape(attention_output, (batch_size, -1, self.d_model))
        
        return self.dense(attention_output)

# Transformer block
class TransformerBlock(keras.layers.Layer):
    def __init__(self, d_model, num_heads, dff, rate=0.1, **kwargs):
        super(TransformerBlock, self).__init__(**kwargs)
        self.d_model = d_model
        self.num_heads = num_heads
        self.dff = dff
        self.rate = rate
        
        self.mha = MultiHeadAttention(d_model, num_heads)
        self.ffn = keras.Sequential([
            layers.Dense(dff, activation='relu'),
            layers.Dense(d_model)
        ])
        self.layernorm1 = layers.LayerNormalization(epsilon=1e-6)
        self.layernorm2 = layers.LayerNormalization(epsilon=1e-6)
        self.dropout1 = layers.Dropout(rate)
        self.dropout2 = layers.Dropout(rate)
        
    def call(self, inputs, training=None):
        # Multi-head attention
        attn_output = self.mha(inputs)
        attn_output = self.dropout1(attn_output, training=training)
        out1 = self.layernorm1(inputs + attn_output)
        
        # Feed forward network
        ffn_output = self.ffn(out1)
        ffn_output = self.dropout2(ffn_output, training=training)
        out2 = self.layernorm2(out1 + ffn_output)
        
        return out2

# Transformer model
def create_transformer_model(vocab_size, embedding_dim, max_length, d_model, num_heads, dff, num_classes):
    inputs = keras.Input(shape=(max_length,))
    
    # Embedding layer
    x = layers.Embedding(vocab_size, embedding_dim, input_length=max_length)(inputs)
    
    # Positional encoding (simplified)
    x = layers.Dense(d_model)(x)
    
    # Transformer block
    x = TransformerBlock(d_model, num_heads, dff)(x)
    
    # Global average pooling
    x = layers.GlobalAveragePooling1D()(x)
    
    # Classification layers
    x = layers.Dense(32, activation='relu')(x)
    x = layers.Dropout(0.5)(x)
    outputs = layers.Dense(num_classes, activation='sigmoid')(x)
    
    model = keras.Model(inputs, outputs)
    return model

# Create transformer model
transformer_model = create_transformer_model(
    vocab_size=1000,
    embedding_dim=128,
    max_length=max_length,
    d_model=64,
    num_heads=4,
    dff=128,
    num_classes=1
)

transformer_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train transformer model
history_transformer = transformer_model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=8,
    validation_data=(X_test, y_test),
    verbose=0
)

# Evaluate transformer model
test_loss_transformer, test_accuracy_transformer = transformer_model.evaluate(X_test, y_test, verbose=0)
print(f"\\nTransformer Model Test Accuracy: {test_accuracy_transformer:.3f}")
\`\`\`

## Model Comparison and Analysis

### Comprehensive Model Comparison
\`\`\`python
# Collect all model results
all_model_results = {
    'Basic RNN': {'accuracy': test_accuracy, 'history': history_basic_rnn.history},
    'LSTM': model_results['LSTM'],
    'GRU': model_results['GRU'],
    'Bidirectional LSTM': model_results['Bidirectional LSTM'],
    'Attention Model': {'accuracy': test_accuracy_attention, 'history': history_attention.history},
    'Transformer': {'accuracy': test_accuracy_transformer, 'history': history_transformer.history}
}

# Visualize comprehensive comparison
plt.figure(figsize=(20, 10))

# Accuracy comparison
plt.subplot(2, 3, 1)
model_names = list(all_model_results.keys())
accuracies = [all_model_results[name]['accuracy'] for name in model_names]
colors = ['skyblue', 'lightcoral', 'lightgreen', 'gold', 'plum', 'lightcyan']
bars = plt.bar(model_names, accuracies, color=colors)
plt.title('Model Accuracy Comparison')
plt.ylabel('Test Accuracy')
plt.ylim(0, 1)
plt.xticks(rotation=45)
for i, v in enumerate(accuracies):
    plt.text(i, v + 0.01, f'{v:.3f}', ha='center', va='bottom')
plt.grid(True, alpha=0.3)

# Training accuracy over time
plt.subplot(2, 3, 2)
for name, results in all_model_results.items():
    plt.plot(results['history']['accuracy'], label=name, linewidth=2)
plt.title('Training Accuracy Over Time')
plt.xlabel('Epoch')
plt.ylabel('Training Accuracy')
plt.legend()
plt.grid(True, alpha=0.3)

# Validation accuracy over time
plt.subplot(2, 3, 3)
for name, results in all_model_results.items():
    plt.plot(results['history']['val_accuracy'], label=name, linewidth=2)
plt.title('Validation Accuracy Over Time')
plt.xlabel('Epoch')
plt.ylabel('Validation Accuracy')
plt.legend()
plt.grid(True, alpha=0.3)

# Training loss over time
plt.subplot(2, 3, 4)
for name, results in all_model_results.items():
    plt.plot(results['history']['loss'], label=name, linewidth=2)
plt.title('Training Loss Over Time')
plt.xlabel('Epoch')
plt.ylabel('Training Loss')
plt.legend()
plt.grid(True, alpha=0.3)

# Validation loss over time
plt.subplot(2, 3, 5)
for name, results in all_model_results.items():
    plt.plot(results['history']['val_loss'], label=name, linewidth=2)
plt.title('Validation Loss Over Time')
plt.xlabel('Epoch')
plt.ylabel('Validation Loss')
plt.legend()
plt.grid(True, alpha=0.3)

# Model complexity vs performance
plt.subplot(2, 3, 6)
# Approximate model complexity (number of parameters)
model_complexity = {
    'Basic RNN': 50000,
    'LSTM': 80000,
    'GRU': 70000,
    'Bidirectional LSTM': 120000,
    'Attention Model': 100000,
    'Transformer': 150000
}

complexities = [model_complexity[name] for name in model_names]
plt.scatter(complexities, accuracies, s=100, c=colors, alpha=0.7)
for i, name in enumerate(model_names):
    plt.annotate(name, (complexities[i], accuracies[i]), 
                xytext=(5, 5), textcoords='offset points', fontsize=8)
plt.xlabel('Model Complexity (Approximate Parameters)')
plt.ylabel('Test Accuracy')
plt.title('Model Complexity vs Performance')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print summary
print("\\nModel Performance Summary:")
print("=" * 50)
for name, results in all_model_results.items():
    print(f"{name:20}: {results['accuracy']:.3f}")

# Find best model
best_model_name = max(all_model_results.keys(), key=lambda x: all_model_results[x]['accuracy'])
print(f"\\nBest Model: {best_model_name} with accuracy {all_model_results[best_model_name]['accuracy']:.3f}")
\`\`\`

## Practical Exercise

Apply NLP techniques:
1. Preprocess text data comprehensively
2. Implement different RNN architectures (RNN, LSTM, GRU)
3. Use pre-trained word embeddings
4. Implement attention mechanisms
5. Build a simplified Transformer model
6. Compare different architectures
7. Analyze model performance and complexity

## Summary & Next Steps

NLP with neural networks opens up powerful possibilities for text understanding. Master these techniques to build sophisticated language models.

**Next up**: Part 11 - Model deployment and MLOps for production systems.`,
            readTime: 32,
            publishedAt: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['NLP', 'RNN', 'LSTM', 'GRU', 'Attention', 'Transformer']
          },
          {
            id: 'ml-part-11',
            partNumber: 11,
            title: 'Model Deployment and MLOps',
            summary: 'Master the complete MLOps pipeline from model deployment to monitoring and maintenance.',
            content: `# Part 11: Model Deployment and MLOps

Learn the complete MLOps pipeline for deploying, monitoring, and maintaining machine learning models in production.

## Model Serialization and Versioning

### Model Saving and Loading
\`\`\`python
import pickle
import joblib
import json
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow import keras
import mlflow
import mlflow.sklearn
import mlflow.tensorflow
from datetime import datetime
import os

# Generate sample data
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15, 
                          n_redundant=5, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Scale the data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train a model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Different model serialization methods
def save_model_multiple_formats(model, scaler, model_name="ml_model"):
    """Save model in multiple formats for different deployment scenarios"""
    
    # 1. Pickle format
    with open(f'{model_name}.pkl', 'wb') as f:
        pickle.dump(model, f)
    
    # 2. Joblib format (better for scikit-learn models)
    joblib.dump(model, f'{model_name}.joblib')
    
    # 3. JSON format for metadata
    model_metadata = {
        'model_type': 'RandomForestClassifier',
        'n_estimators': model.n_estimators,
        'feature_count': model.n_features_in_,
        'classes': model.classes_.tolist(),
        'training_date': datetime.now().isoformat(),
        'accuracy': model.score(X_test_scaled, y_test)
    }
    
    with open(f'{model_name}_metadata.json', 'w') as f:
        json.dump(model_metadata, f, indent=2)
    
    # 4. Save scaler separately
    joblib.dump(scaler, f'{model_name}_scaler.joblib')
    
    print(f"Model saved in multiple formats:")
    print(f"- {model_name}.pkl (pickle)")
    print(f"- {model_name}.joblib (joblib)")
    print(f"- {model_name}_metadata.json (metadata)")
    print(f"- {model_name}_scaler.joblib (scaler)")

# Save model
save_model_multiple_formats(model, scaler)

# Load model function
def load_model_and_scaler(model_name="ml_model"):
    """Load model and scaler from saved files"""
    
    # Load model
    model = joblib.load(f'{model_name}.joblib')
    
    # Load scaler
    scaler = joblib.load(f'{model_name}_scaler.joblib')
    
    # Load metadata
    with open(f'{model_name}_metadata.json', 'r') as f:
        metadata = json.load(f)
    
    return model, scaler, metadata

# Test loading
loaded_model, loaded_scaler, metadata = load_model_and_scaler()
print(f"\\nLoaded model accuracy: {loaded_model.score(X_test_scaled, y_test):.3f}")
print(f"Model metadata: {metadata}")
\`\`\`

### MLflow for Experiment Tracking
\`\`\`python
# Initialize MLflow
mlflow.set_tracking_uri("file:./mlruns")
mlflow.set_experiment("MLOps_Demo")

# MLflow experiment tracking
def train_and_log_model(X_train, X_test, y_train, y_test, model_name, model_params):
    """Train model and log to MLflow"""
    
    with mlflow.start_run(run_name=model_name):
        # Train model
        model = RandomForestClassifier(**model_params, random_state=42)
        model.fit(X_train, y_train)
        
        # Evaluate model
        train_accuracy = model.score(X_train, y_train)
        test_accuracy = model.score(X_test, y_test)
        
        # Log parameters
        mlflow.log_params(model_params)
        
        # Log metrics
        mlflow.log_metric("train_accuracy", train_accuracy)
        mlflow.log_metric("test_accuracy", test_accuracy)
        
        # Log model
        mlflow.sklearn.log_model(model, "model")
        
        # Log additional artifacts
        mlflow.log_artifact(f"{model_name}_metadata.json")
        
        print(f"{model_name} - Train: {train_accuracy:.3f}, Test: {test_accuracy:.3f}")
        
        return model

# Train multiple models with different parameters
model_configs = {
    "RF_50_trees": {"n_estimators": 50, "max_depth": 10},
    "RF_100_trees": {"n_estimators": 100, "max_depth": 10},
    "RF_200_trees": {"n_estimators": 200, "max_depth": 10},
    "RF_deep": {"n_estimators": 100, "max_depth": 20},
    "RF_shallow": {"n_estimators": 100, "max_depth": 5}
}

trained_models = {}
for name, params in model_configs.items():
    model = train_and_log_model(X_train_scaled, X_test_scaled, y_train, y_test, name, params)
    trained_models[name] = model

# Find best model from MLflow
runs = mlflow.search_runs(experiment_ids=[mlflow.get_experiment_by_name("MLOps_Demo").experiment_id])
best_run = runs.loc[runs['metrics.test_accuracy'].idxmax()]
print(f"\\nBest model: {best_run['tags.mlflow.runName']}")
print(f"Best test accuracy: {best_run['metrics.test_accuracy']:.3f}")
\`\`\`

## Model Deployment Strategies

### Flask API Deployment
\`\`\`python
from flask import Flask, request, jsonify
import numpy as np
import joblib
import os

# Flask app for model serving
app = Flask(__name__)

# Load model and scaler
model = joblib.load('ml_model.joblib')
scaler = joblib.load('ml_model_scaler.joblib')

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})

@app.route('/predict', methods=['POST'])
def predict():
    """Prediction endpoint"""
    try:
        # Get input data
        data = request.get_json()
        
        if not data or 'features' not in data:
            return jsonify({"error": "No features provided"}), 400
        
        # Convert to numpy array
        features = np.array(data['features']).reshape(1, -1)
        
        # Validate input shape
        if features.shape[1] != model.n_features_in_:
            return jsonify({
                "error": f"Expected {model.n_features_in_} features, got {features.shape[1]}"
            }), 400
        
        # Preprocess
        features_scaled = scaler.transform(features)
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0].tolist()
        
        return jsonify({
            "prediction": int(prediction),
            "probability": probability,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/model_info', methods=['GET'])
def model_info():
    """Model information endpoint"""
    return jsonify({
        "model_type": "RandomForestClassifier",
        "n_estimators": model.n_estimators,
        "n_features": model.n_features_in_,
        "classes": model.classes_.tolist(),
        "accuracy": model.score(X_test_scaled, y_test)
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

# Example API usage
def test_api():
    """Test the API endpoints"""
    import requests
    
    # Test health check
    response = requests.get('http://localhost:5000/health')
    print(f"Health check: {response.json()}")
    
    # Test prediction
    sample_features = X_test_scaled[0].tolist()
    response = requests.post('http://localhost:5000/predict', 
                           json={'features': sample_features})
    print(f"Prediction: {response.json()}")
    
    # Test model info
    response = requests.get('http://localhost:5000/model_info')
    print(f"Model info: {response.json()}")

# Uncomment to test API
# test_api()
\`\`\`

### Docker Containerization
\`\`\`python
# Dockerfile content
dockerfile_content = '''
FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY app.py .
COPY ml_model.joblib .
COPY ml_model_scaler.joblib .

# Expose port
EXPOSE 5000

# Run application
CMD ["python", "app.py"]
'''

# Requirements file
requirements_content = '''
Flask==2.3.3
scikit-learn==1.3.0
numpy==1.24.3
pandas==2.0.3
joblib==1.3.2
'''

# Save files
with open('Dockerfile', 'w') as f:
    f.write(dockerfile_content)

with open('requirements.txt', 'w') as f:
    f.write(requirements_content)

print("Docker files created:")
print("- Dockerfile")
print("- requirements.txt")
print("\\nTo build and run:")
print("docker build -t ml-api .")
print("docker run -p 5000:5000 ml-api")
\`\`\`

## Model Monitoring and Drift Detection

### Data Drift Detection
\`\`\`python
from scipy import stats
import matplotlib.pyplot as plt
import seaborn as sns

# Simulate data drift
np.random.seed(42)
# Original training data (baseline)
baseline_data = np.random.normal(0, 1, 1000)

# New data with drift (shifted mean)
drifted_data = np.random.normal(0.5, 1, 1000)

# Statistical drift detection
def detect_drift(baseline, new_data, alpha=0.05):
    """Detect statistical drift between baseline and new data"""
    
    # Kolmogorov-Smirnov test
    ks_stat, ks_pvalue = stats.ks_2samp(baseline, new_data)
    
    # Mann-Whitney U test
    mw_stat, mw_pvalue = stats.mannwhitneyu(baseline, new_data, alternative='two-sided')
    
    # T-test
    t_stat, t_pvalue = stats.ttest_ind(baseline, new_data)
    
    drift_detected = any(p < alpha for p in [ks_pvalue, mw_pvalue, t_pvalue])
    
    return {
        'drift_detected': drift_detected,
        'ks_test': {'statistic': ks_stat, 'pvalue': ks_pvalue},
        'mw_test': {'statistic': mw_stat, 'pvalue': mw_pvalue},
        't_test': {'statistic': t_stat, 'pvalue': t_pvalue}
    }

# Detect drift
drift_results = detect_drift(baseline_data, drifted_data)
print("Drift Detection Results:")
print(f"Drift detected: {drift_results['drift_detected']}")
print(f"KS test p-value: {drift_results['ks_test']['pvalue']:.4f}")
print(f"MW test p-value: {drift_results['mw_test']['pvalue']:.4f}")
print(f"T-test p-value: {drift_results['t_test']['pvalue']:.4f}")

# Visualize drift
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.hist(baseline_data, alpha=0.7, label='Baseline', bins=30)
plt.hist(drifted_data, alpha=0.7, label='New Data', bins=30)
plt.title('Data Distribution Comparison')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.legend()

plt.subplot(1, 3, 2)
plt.boxplot([baseline_data, drifted_data], labels=['Baseline', 'New Data'])
plt.title('Box Plot Comparison')
plt.ylabel('Value')

plt.subplot(1, 3, 3)
# Q-Q plot
stats.probplot(baseline_data, dist="norm", plot=plt)
plt.title('Q-Q Plot: Baseline vs Normal')
plt.tight_layout()
plt.show()
\`\`\`

### Model Performance Monitoring
\`\`\`python
import time
from collections import deque
import threading

class ModelMonitor:
    """Real-time model performance monitoring"""
    
    def __init__(self, window_size=100):
        self.window_size = window_size
        self.predictions = deque(maxlen=window_size)
        self.actuals = deque(maxlen=window_size)
        self.response_times = deque(maxlen=window_size)
        self.accuracy_history = deque(maxlen=window_size)
        self.lock = threading.Lock()
    
    def log_prediction(self, prediction, actual, response_time):
        """Log a prediction result"""
        with self.lock:
            self.predictions.append(prediction)
            self.actuals.append(actual)
            self.response_times.append(response_time)
            
            # Calculate accuracy
            if len(self.predictions) > 0:
                accuracy = sum(p == a for p, a in zip(self.predictions, self.actuals)) / len(self.predictions)
                self.accuracy_history.append(accuracy)
    
    def get_metrics(self):
        """Get current performance metrics"""
        with self.lock:
            if len(self.predictions) == 0:
                return None
            
            accuracy = sum(p == a for p, a in zip(self.predictions, self.actuals)) / len(self.predictions)
            avg_response_time = sum(self.response_times) / len(self.response_times)
            
            return {
                'accuracy': accuracy,
                'avg_response_time': avg_response_time,
                'total_predictions': len(self.predictions),
                'recent_accuracy': self.accuracy_history[-1] if self.accuracy_history else None
            }
    
    def check_performance_degradation(self, threshold=0.05):
        """Check if performance has degraded significantly"""
        if len(self.accuracy_history) < 10:
            return False
        
        recent_accuracy = np.mean(list(self.accuracy_history)[-10:])
        baseline_accuracy = np.mean(list(self.accuracy_history)[:10])
        
        degradation = baseline_accuracy - recent_accuracy
        return degradation > threshold

# Initialize monitor
monitor = ModelMonitor()

# Simulate model predictions
def simulate_predictions(monitor, n_predictions=100):
    """Simulate model predictions with some degradation over time"""
    for i in range(n_predictions):
        # Simulate response time
        response_time = np.random.exponential(0.1)
        
        # Simulate prediction accuracy degradation
        if i < 50:
            accuracy = 0.95
        else:
            accuracy = 0.85  # Performance degradation
        
        # Make prediction
        prediction = 1 if np.random.random() < accuracy else 0
        actual = 1 if np.random.random() < 0.5 else 0
        
        # Log to monitor
        monitor.log_prediction(prediction, actual, response_time)
        
        time.sleep(0.01)  # Simulate processing time

# Run simulation
simulate_predictions(monitor)

# Check metrics
metrics = monitor.get_metrics()
print("\\nModel Performance Metrics:")
print(f"Accuracy: {metrics['accuracy']:.3f}")
print(f"Average Response Time: {metrics['avg_response_time']:.3f}s")
print(f"Total Predictions: {metrics['total_predictions']}")

# Check for performance degradation
degradation_detected = monitor.check_performance_degradation()
print(f"\\nPerformance Degradation Detected: {degradation_detected}")

# Plot performance over time
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(list(monitor.accuracy_history))
plt.title('Accuracy Over Time')
plt.xlabel('Prediction Number')
plt.ylabel('Accuracy')
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
plt.plot(list(monitor.response_times))
plt.title('Response Time Over Time')
plt.xlabel('Prediction Number')
plt.ylabel('Response Time (s)')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## A/B Testing for Models

### Model A/B Testing Framework
\`\`\`python
import random
from scipy.stats import chi2_contingency, ttest_ind

class ABTestFramework:
    """A/B testing framework for model comparison"""
    
    def __init__(self, traffic_split=0.5):
        self.traffic_split = traffic_split
        self.model_a_results = []
        self.model_b_results = []
        self.user_assignments = {}
    
    def assign_user(self, user_id):
        """Assign user to model A or B"""
        if user_id not in self.user_assignments:
            self.user_assignments[user_id] = 'A' if random.random() < self.traffic_split else 'B'
        return self.user_assignments[user_id]
    
    def log_result(self, user_id, prediction, actual, response_time):
        """Log prediction result for assigned model"""
        model = self.assign_user(user_id)
        result = {
            'prediction': prediction,
            'actual': actual,
            'response_time': response_time,
            'correct': prediction == actual
        }
        
        if model == 'A':
            self.model_a_results.append(result)
        else:
            self.model_b_results.append(result)
    
    def get_model_metrics(self, model):
        """Get metrics for specific model"""
        results = self.model_a_results if model == 'A' else self.model_b_results
        
        if not results:
            return None
        
        accuracy = sum(r['correct'] for r in results) / len(results)
        avg_response_time = sum(r['response_time'] for r in results) / len(results)
        
        return {
            'accuracy': accuracy,
            'avg_response_time': avg_response_time,
            'total_predictions': len(results)
        }
    
    def run_significance_test(self):
        """Run statistical significance test"""
        if len(self.model_a_results) < 10 or len(self.model_b_results) < 10:
            return None
        
        # Accuracy comparison
        a_correct = sum(r['correct'] for r in self.model_a_results)
        a_total = len(self.model_a_results)
        b_correct = sum(r['correct'] for r in self.model_b_results)
        b_total = len(self.model_b_results)
        
        # Chi-square test for accuracy
        contingency_table = [[a_correct, a_total - a_correct],
                           [b_correct, b_total - b_correct]]
        chi2, p_value_accuracy, _, _ = chi2_contingency(contingency_table)
        
        # T-test for response time
        a_times = [r['response_time'] for r in self.model_a_results]
        b_times = [r['response_time'] for r in self.model_b_results]
        t_stat, p_value_time = ttest_ind(a_times, b_times)
        
        return {
            'accuracy_p_value': p_value_accuracy,
            'response_time_p_value': p_value_time,
            'significant_accuracy': p_value_accuracy < 0.05,
            'significant_response_time': p_value_time < 0.05
        }

# Initialize A/B test
ab_test = ABTestFramework(traffic_split=0.5)

# Simulate A/B test
def simulate_ab_test(ab_test, n_users=1000):
    """Simulate A/B test with different model performances"""
    for user_id in range(n_users):
        # Simulate different performance for each model
        model = ab_test.assign_user(user_id)
        
        if model == 'A':
            # Model A: 95% accuracy, 0.1s response time
            accuracy = 0.95
            response_time = np.random.exponential(0.1)
        else:
            # Model B: 90% accuracy, 0.08s response time
            accuracy = 0.90
            response_time = np.random.exponential(0.08)
        
        # Make prediction
        prediction = 1 if np.random.random() < accuracy else 0
        actual = 1 if np.random.random() < 0.5 else 0
        
        # Log result
        ab_test.log_result(user_id, prediction, actual, response_time)

# Run A/B test
simulate_ab_test(ab_test)

# Get results
model_a_metrics = ab_test.get_model_metrics('A')
model_b_metrics = ab_test.get_model_metrics('B')

print("A/B Test Results:")
print(f"Model A - Accuracy: {model_a_metrics['accuracy']:.3f}, Response Time: {model_a_metrics['avg_response_time']:.3f}s")
print(f"Model B - Accuracy: {model_b_metrics['accuracy']:.3f}, Response Time: {model_b_metrics['avg_response_time']:.3f}s")

# Run significance test
significance_results = ab_test.run_significance_test()
if significance_results:
    print(f"\\nSignificance Test Results:")
    print(f"Accuracy difference significant: {significance_results['significant_accuracy']}")
    print(f"Response time difference significant: {significance_results['significant_response_time']}")
    print(f"Accuracy p-value: {significance_results['accuracy_p_value']:.4f}")
    print(f"Response time p-value: {significance_results['response_time_p_value']:.4f}")

# Visualize A/B test results
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
models = ['Model A', 'Model B']
accuracies = [model_a_metrics['accuracy'], model_b_metrics['accuracy']]
bars = plt.bar(models, accuracies, color=['skyblue', 'lightcoral'])
plt.title('A/B Test: Accuracy Comparison')
plt.ylabel('Accuracy')
plt.ylim(0, 1)
for i, v in enumerate(accuracies):
    plt.text(i, v + 0.01, f'{v:.3f}', ha='center', va='bottom')
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
response_times = [model_a_metrics['avg_response_time'], model_b_metrics['avg_response_time']]
bars = plt.bar(models, response_times, color=['skyblue', 'lightcoral'])
plt.title('A/B Test: Response Time Comparison')
plt.ylabel('Response Time (s)')
for i, v in enumerate(response_times):
    plt.text(i, v + 0.001, f'{v:.3f}', ha='center', va='bottom')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## CI/CD for Machine Learning

### Automated Model Training Pipeline
\`\`\`python
import subprocess
import yaml
from pathlib import Path

# MLOps pipeline configuration
pipeline_config = {
    'data': {
        'source': 'data/training_data.csv',
        'target_column': 'target',
        'test_size': 0.3
    },
    'model': {
        'type': 'RandomForestClassifier',
        'hyperparameters': {
            'n_estimators': [50, 100, 200],
            'max_depth': [5, 10, 20],
            'min_samples_split': [2, 5, 10]
        }
    },
    'evaluation': {
        'metrics': ['accuracy', 'precision', 'recall', 'f1'],
        'threshold': 0.85
    },
    'deployment': {
        'staging': True,
        'production': False
    }
}

# Save configuration
with open('pipeline_config.yaml', 'w') as f:
    yaml.dump(pipeline_config, f, default_flow_style=False)

# Automated training script
training_script = '''
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report
import joblib
import yaml
import mlflow
import mlflow.sklearn

def load_config():
    with open('pipeline_config.yaml', 'r') as f:
        return yaml.safe_load(f)

def train_model():
    config = load_config()
    
    # Load data
    data = pd.read_csv(config['data']['source'])
    X = data.drop(config['data']['target_column'], axis=1)
    y = data[config['data']['target_column']]
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=config['data']['test_size'], random_state=42
    )
    
    # Hyperparameter tuning
    model = RandomForestClassifier(random_state=42)
    grid_search = GridSearchCV(
        model, 
        config['model']['hyperparameters'], 
        cv=5, 
        scoring='accuracy'
    )
    
    grid_search.fit(X_train, y_train)
    
    # Evaluate model
    y_pred = grid_search.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    # Log to MLflow
    with mlflow.start_run():
        mlflow.log_params(grid_search.best_params_)
        mlflow.log_metric('accuracy', accuracy)
        mlflow.sklearn.log_model(grid_search.best_estimator_, 'model')
    
    # Save model if meets threshold
    if accuracy >= config['evaluation']['threshold']:
        joblib.dump(grid_search.best_estimator_, 'best_model.joblib')
        print(f"Model saved with accuracy: {accuracy:.3f}")
    else:
        print(f"Model accuracy {accuracy:.3f} below threshold {config['evaluation']['threshold']}")
    
    return accuracy

if __name__ == "__main__":
    train_model()
'''

# Save training script
with open('train_model.py', 'w') as f:
    f.write(training_script)

print("MLOps pipeline files created:")
print("- pipeline_config.yaml (configuration)")
print("- train_model.py (training script)")
print("\\nTo run the pipeline:")
print("python train_model.py")
\`\`\`

## Practical Exercise

Apply MLOps techniques:
1. Serialize and version your models
2. Set up MLflow for experiment tracking
3. Create a Flask API for model serving
4. Containerize your model with Docker
5. Implement drift detection
6. Set up model performance monitoring
7. Design an A/B testing framework
8. Create an automated training pipeline

## Summary & Next Steps

MLOps ensures your models are reliable, scalable, and maintainable in production. Master these practices to build robust ML systems.

**Next up**: Part 12 - Advanced topics and real-world applications.`,
            readTime: 33,
            publishedAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['MLOps', 'Deployment', 'Monitoring', 'A/B Testing', 'CI/CD']
          },
          {
            id: 'ml-part-12',
            partNumber: 12,
            title: 'Advanced Topics and Real-World Applications',
            summary: 'Explore advanced ML concepts and real-world applications across different industries.',
            content: `# Part 12: Advanced Topics and Real-World Applications

Explore advanced machine learning concepts and their applications in real-world scenarios across various industries.

## Advanced ML Concepts

### Reinforcement Learning Fundamentals
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
import gym
from collections import defaultdict
import random

# Q-Learning implementation
class QLearningAgent:
    def __init__(self, state_size, action_size, learning_rate=0.1, discount_factor=0.95, epsilon=1.0):
        self.state_size = state_size
        self.action_size = action_size
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.epsilon = epsilon
        self.epsilon_decay = 0.995
        self.epsilon_min = 0.01
        
        # Q-table
        self.q_table = defaultdict(lambda: np.zeros(action_size))
    
    def choose_action(self, state):
        """Choose action using epsilon-greedy policy"""
        if random.random() < self.epsilon:
            return random.choice(range(self.action_size))
        else:
            return np.argmax(self.q_table[state])
    
    def update_q_table(self, state, action, reward, next_state):
        """Update Q-table using Q-learning formula"""
        current_q = self.q_table[state][action]
        max_next_q = np.max(self.q_table[next_state])
        
        new_q = current_q + self.learning_rate * (reward + self.discount_factor * max_next_q - current_q)
        self.q_table[state][action] = new_q
    
    def decay_epsilon(self):
        """Decay epsilon for exploration"""
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay

# Train Q-Learning agent on CartPole
def train_q_learning_agent(episodes=1000):
    """Train Q-Learning agent on CartPole environment"""
    env = gym.make('CartPole-v1')
    
    # Discretize state space
    def discretize_state(state):
        return tuple(np.round(state, 1))
    
    agent = QLearningAgent(state_size=4, action_size=2)
    
    episode_rewards = []
    episode_lengths = []
    
    for episode in range(episodes):
        state = discretize_state(env.reset()[0])
        total_reward = 0
        steps = 0
        
        while True:
            action = agent.choose_action(state)
            next_state, reward, done, truncated, _ = env.step(action)
            next_state = discretize_state(next_state)
            
            # Modify reward for better learning
            if done or truncated:
                reward = -10
            
            agent.update_q_table(state, action, reward, next_state)
            
            state = next_state
            total_reward += reward
            steps += 1
            
            if done or truncated:
                break
        
        agent.decay_epsilon()
        episode_rewards.append(total_reward)
        episode_lengths.append(steps)
        
        if episode % 100 == 0:
            avg_reward = np.mean(episode_rewards[-100:])
            print(f"Episode {episode}, Average Reward: {avg_reward:.2f}, Epsilon: {agent.epsilon:.3f}")
    
    env.close()
    return agent, episode_rewards, episode_lengths

# Train agent
print("Training Q-Learning agent on CartPole...")
agent, rewards, lengths = train_q_learning_agent(episodes=500)

# Plot training results
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.plot(rewards)
plt.title('Episode Rewards')
plt.xlabel('Episode')
plt.ylabel('Total Reward')
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 2)
plt.plot(lengths)
plt.title('Episode Lengths')
plt.xlabel('Episode')
plt.ylabel('Steps')
plt.grid(True, alpha=0.3)

plt.subplot(1, 3, 3)
# Moving average
window = 50
moving_avg = np.convolve(rewards, np.ones(window)/window, mode='valid')
plt.plot(moving_avg)
plt.title(f'Moving Average Reward (window={window})')
plt.xlabel('Episode')
plt.ylabel('Average Reward')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print(f"\\nFinal Q-table size: {len(agent.q_table)}")
print(f"Final epsilon: {agent.epsilon:.3f}")
\`\`\`

### Generative Adversarial Networks (GANs)
\`\`\`python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt

# Simple GAN implementation
class SimpleGAN:
    def __init__(self, latent_dim=100, img_shape=(28, 28, 1)):
        self.latent_dim = latent_dim
        self.img_shape = img_shape
        
        # Build generator and discriminator
        self.generator = self.build_generator()
        self.discriminator = self.build_discriminator()
        
        # Combined model
        self.combined = self.build_combined()
    
    def build_generator(self):
        """Build generator network"""
        model = keras.Sequential([
            layers.Dense(256, input_dim=self.latent_dim),
            layers.LeakyReLU(alpha=0.2),
            layers.Dense(512),
            layers.LeakyReLU(alpha=0.2),
            layers.Dense(1024),
            layers.LeakyReLU(alpha=0.2),
            layers.Dense(np.prod(self.img_shape), activation='tanh'),
            layers.Reshape(self.img_shape)
        ])
        return model
    
    def build_discriminator(self):
        """Build discriminator network"""
        model = keras.Sequential([
            layers.Flatten(input_shape=self.img_shape),
            layers.Dense(512),
            layers.LeakyReLU(alpha=0.2),
            layers.Dense(256),
            layers.LeakyReLU(alpha=0.2),
            layers.Dense(1, activation='sigmoid')
        ])
        return model
    
    def build_combined(self):
        """Build combined model for training generator"""
        self.discriminator.trainable = False
        model = keras.Sequential([
            self.generator,
            self.discriminator
        ])
        return model
    
    def compile_models(self):
        """Compile all models"""
        self.discriminator.compile(
            optimizer=keras.optimizers.Adam(learning_rate=0.0002, beta_1=0.5),
            loss='binary_crossentropy',
            metrics=['accuracy']
        )
        
        self.combined.compile(
            optimizer=keras.optimizers.Adam(learning_rate=0.0002, beta_1=0.5),
            loss='binary_crossentropy'
        )
    
    def train(self, x_train, epochs=100, batch_size=32):
        """Train the GAN"""
        self.compile_models()
        
        # Normalize data to [-1, 1]
        x_train = (x_train.astype('float32') - 127.5) / 127.5
        
        half_batch = batch_size // 2
        
        for epoch in range(epochs):
            # Train discriminator
            idx = np.random.randint(0, x_train.shape[0], half_batch)
            real_imgs = x_train[idx]
            
            noise = np.random.normal(0, 1, (half_batch, self.latent_dim))
            fake_imgs = self.generator.predict(noise, verbose=0)
            
            # Labels
            real_labels = np.ones((half_batch, 1))
            fake_labels = np.zeros((half_batch, 1))
            
            # Train discriminator
            d_loss_real = self.discriminator.train_on_batch(real_imgs, real_labels)
            d_loss_fake = self.discriminator.train_on_batch(fake_imgs, fake_labels)
            d_loss = 0.5 * np.add(d_loss_real, d_loss_fake)
            
            # Train generator
            noise = np.random.normal(0, 1, (batch_size, self.latent_dim))
            valid_labels = np.ones((batch_size, 1))
            
            g_loss = self.combined.train_on_batch(noise, valid_labels)
            
            if epoch % 100 == 0:
                print(f"Epoch {epoch}, D Loss: {d_loss[0]:.4f}, G Loss: {g_loss:.4f}")
                
                # Generate sample images
                self.generate_samples(epoch)

# Load MNIST data
(x_train, _), (_, _) = keras.datasets.mnist.load_data()
x_train = x_train[:1000]  # Use subset for faster training

# Create and train GAN
gan = SimpleGAN(latent_dim=100, img_shape=(28, 28, 1))
print("Training GAN on MNIST...")
gan.train(x_train, epochs=200, batch_size=32)

# Generate final samples
def generate_samples(gan, n_samples=16):
    """Generate and display sample images"""
    noise = np.random.normal(0, 1, (n_samples, gan.latent_dim))
    generated_imgs = gan.generator.predict(noise, verbose=0)
    
    # Rescale to [0, 1]
    generated_imgs = (generated_imgs + 1) / 2
    
    plt.figure(figsize=(8, 8))
    for i in range(n_samples):
        plt.subplot(4, 4, i + 1)
        plt.imshow(generated_imgs[i], cmap='gray')
        plt.axis('off')
    plt.suptitle('Generated Images')
    plt.tight_layout()
    plt.show()

generate_samples(gan)
\`\`\`

## Real-World Applications

### Healthcare: Medical Image Analysis
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns

# Simulate medical image data (X-ray images)
def create_medical_dataset(n_samples=1000):
    """Create simulated medical image dataset"""
    np.random.seed(42)
    
    # Simulate image features (in practice, these would be extracted from images)
    # Features: texture, contrast, brightness, edge density, etc.
    features = np.random.randn(n_samples, 50)
    
    # Simulate labels (0: normal, 1: abnormal)
    # Add some correlation between features and labels
    risk_score = np.sum(features[:, :10], axis=1) + np.random.randn(n_samples) * 0.5
    labels = (risk_score > np.percentile(risk_score, 70)).astype(int)
    
    return features, labels

# Create dataset
X, y = create_medical_dataset()
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train medical diagnosis model
medical_model = RandomForestClassifier(n_estimators=100, random_state=42)
medical_model.fit(X_train, y_train)

# Evaluate model
y_pred = medical_model.predict(X_test)
accuracy = medical_model.score(X_test, y_test)

print("Medical Image Analysis Results:")
print(f"Accuracy: {accuracy:.3f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=['Normal', 'Abnormal']))

# Feature importance analysis
feature_importance = medical_model.feature_importances_
top_features = np.argsort(feature_importance)[-10:]

plt.figure(figsize=(12, 8))

plt.subplot(2, 2, 1)
plt.barh(range(len(top_features)), feature_importance[top_features])
plt.yticks(range(len(top_features)), [f'Feature {i}' for i in top_features])
plt.xlabel('Feature Importance')
plt.title('Top 10 Most Important Features')

plt.subplot(2, 2, 2)
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
            xticklabels=['Normal', 'Abnormal'],
            yticklabels=['Normal', 'Abnormal'])
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')

plt.subplot(2, 2, 3)
# Simulate ROC curve
from sklearn.metrics import roc_curve, auc
y_proba = medical_model.predict_proba(X_test)[:, 1]
fpr, tpr, _ = roc_curve(y_test, y_proba)
roc_auc = auc(fpr, tpr)

plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC curve (AUC = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve')
plt.legend(loc="lower right")

plt.subplot(2, 2, 4)
# Simulate precision-recall curve
from sklearn.metrics import precision_recall_curve
precision, recall, _ = precision_recall_curve(y_test, y_proba)
plt.plot(recall, precision, color='blue', lw=2)
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.title('Precision-Recall Curve')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

### Finance: Fraud Detection
\`\`\`python
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt
import seaborn as sns

# Simulate financial transaction data
def create_fraud_dataset(n_samples=10000, fraud_rate=0.05):
    """Create simulated financial transaction dataset"""
    np.random.seed(42)
    
    # Normal transactions
    n_normal = int(n_samples * (1 - fraud_rate))
    n_fraud = n_samples - n_normal
    
    # Generate normal transactions
    normal_data = {
        'amount': np.random.lognormal(4, 1, n_normal),
        'hour': np.random.randint(0, 24, n_normal),
        'day_of_week': np.random.randint(0, 7, n_normal),
        'merchant_category': np.random.randint(0, 10, n_normal),
        'distance_from_home': np.random.exponential(10, n_normal),
        'transaction_frequency': np.random.poisson(5, n_normal)
    }
    
    # Generate fraudulent transactions (different patterns)
    fraud_data = {
        'amount': np.random.lognormal(6, 2, n_fraud),  # Higher amounts
        'hour': np.random.choice([2, 3, 4, 5], n_fraud),  # Unusual hours
        'day_of_week': np.random.choice([0, 6], n_fraud),  # Weekends
        'merchant_category': np.random.choice([8, 9], n_fraud),  # High-risk categories
        'distance_from_home': np.random.exponential(50, n_fraud),  # Far from home
        'transaction_frequency': np.random.poisson(20, n_fraud)  # High frequency
    }
    
    # Combine data
    normal_df = pd.DataFrame(normal_data)
    fraud_df = pd.DataFrame(fraud_data)
    
    normal_df['is_fraud'] = 0
    fraud_df['is_fraud'] = 1
    
    # Combine and shuffle
    df = pd.concat([normal_df, fraud_df], ignore_index=True)
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)
    
    return df

# Create fraud dataset
fraud_data = create_fraud_dataset()
print(f"Dataset shape: {fraud_data.shape}")
print(f"Fraud rate: {fraud_data['is_fraud'].mean():.3f}")

# Prepare features
feature_columns = ['amount', 'hour', 'day_of_week', 'merchant_category', 
                  'distance_from_home', 'transaction_frequency']
X = fraud_data[feature_columns]
y = fraud_data['is_fraud']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train fraud detection model
fraud_model = IsolationForest(contamination=0.05, random_state=42)
fraud_model.fit(X_train_scaled)

# Predict fraud
fraud_predictions = fraud_model.predict(X_test_scaled)
fraud_predictions = (fraud_predictions == -1).astype(int)  # Convert to binary

# Evaluate model
accuracy = (fraud_predictions == y_test).mean()
print(f"\\nFraud Detection Results:")
print(f"Accuracy: {accuracy:.3f}")
print("\\nClassification Report:")
print(classification_report(y_test, fraud_predictions, target_names=['Normal', 'Fraud']))

# Visualize results
plt.figure(figsize=(15, 10))

plt.subplot(2, 3, 1)
plt.hist(fraud_data[fraud_data['is_fraud'] == 0]['amount'], alpha=0.7, label='Normal', bins=50)
plt.hist(fraud_data[fraud_data['is_fraud'] == 1]['amount'], alpha=0.7, label='Fraud', bins=50)
plt.xlabel('Transaction Amount')
plt.ylabel('Frequency')
plt.title('Transaction Amount Distribution')
plt.legend()
plt.yscale('log')

plt.subplot(2, 3, 2)
plt.hist(fraud_data[fraud_data['is_fraud'] == 0]['hour'], alpha=0.7, label='Normal', bins=24)
plt.hist(fraud_data[fraud_data['is_fraud'] == 1]['hour'], alpha=0.7, label='Fraud', bins=24)
plt.xlabel('Hour of Day')
plt.ylabel('Frequency')
plt.title('Transaction Hour Distribution')
plt.legend()

plt.subplot(2, 3, 3)
plt.hist(fraud_data[fraud_data['is_fraud'] == 0]['distance_from_home'], alpha=0.7, label='Normal', bins=50)
plt.hist(fraud_data[fraud_data['is_fraud'] == 1]['distance_from_home'], alpha=0.7, label='Fraud', bins=50)
plt.xlabel('Distance from Home')
plt.ylabel('Frequency')
plt.title('Distance from Home Distribution')
plt.legend()

plt.subplot(2, 3, 4)
cm = confusion_matrix(y_test, fraud_predictions)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
            xticklabels=['Normal', 'Fraud'],
            yticklabels=['Normal', 'Fraud'])
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')

plt.subplot(2, 3, 5)
# Feature importance (anomaly scores)
anomaly_scores = fraud_model.decision_function(X_test_scaled)
plt.hist(anomaly_scores[y_test == 0], alpha=0.7, label='Normal', bins=50)
plt.hist(anomaly_scores[y_test == 1], alpha=0.7, label='Fraud', bins=50)
plt.xlabel('Anomaly Score')
plt.ylabel('Frequency')
plt.title('Anomaly Score Distribution')
plt.legend()

plt.subplot(2, 3, 6)
# ROC curve
from sklearn.metrics import roc_curve, auc
fpr, tpr, _ = roc_curve(y_test, -anomaly_scores)  # Negative because lower scores = more anomalous
roc_auc = auc(fpr, tpr)

plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC curve (AUC = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve')
plt.legend(loc="lower right")

plt.tight_layout()
plt.show()
\`\`\`

### E-commerce: Recommendation Systems
\`\`\`python
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
import matplotlib.pyplot as plt

# Simulate e-commerce data
def create_recommendation_dataset(n_users=1000, n_items=500, n_ratings=10000):
    """Create simulated e-commerce recommendation dataset"""
    np.random.seed(42)
    
    # Generate user-item ratings matrix
    ratings_data = []
    
    for _ in range(n_ratings):
        user_id = np.random.randint(0, n_users)
        item_id = np.random.randint(0, n_items)
        rating = np.random.randint(1, 6)  # 1-5 star rating
        ratings_data.append([user_id, item_id, rating])
    
    ratings_df = pd.DataFrame(ratings_data, columns=['user_id', 'item_id', 'rating'])
    
    # Create user-item matrix
    user_item_matrix = ratings_df.pivot_table(
        index='user_id', 
        columns='item_id', 
        values='rating', 
        fill_value=0
    )
    
    return ratings_df, user_item_matrix

# Create dataset
ratings_df, user_item_matrix = create_recommendation_dataset()
print(f"Ratings dataset shape: {ratings_df.shape}")
print(f"User-item matrix shape: {user_item_matrix.shape}")
print(f"Matrix sparsity: {(user_item_matrix == 0).sum().sum() / user_item_matrix.size:.3f}")

# Collaborative Filtering: User-based
def user_based_recommendations(user_item_matrix, user_id, n_recommendations=5):
    """Generate user-based recommendations"""
    # Calculate user similarity
    user_similarity = cosine_similarity(user_item_matrix)
    
    # Get similar users
    user_scores = user_similarity[user_id]
    similar_users = np.argsort(user_scores)[::-1][1:11]  # Top 10 similar users
    
    # Get items rated by similar users but not by target user
    target_user_ratings = user_item_matrix.iloc[user_id]
    recommendations = {}
    
    for similar_user in similar_users:
        similar_user_ratings = user_item_matrix.iloc[similar_user]
        
        # Find items rated by similar user but not by target user
        for item_id in similar_user_ratings.index:
            if target_user_ratings[item_id] == 0 and similar_user_ratings[item_id] > 0:
                if item_id not in recommendations:
                    recommendations[item_id] = 0
                recommendations[item_id] += user_scores[similar_user] * similar_user_ratings[item_id]
    
    # Sort by recommendation score
    sorted_recommendations = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)
    return sorted_recommendations[:n_recommendations]

# Matrix Factorization: SVD
def svd_recommendations(user_item_matrix, user_id, n_recommendations=5, n_components=50):
    """Generate recommendations using SVD"""
    # Apply SVD
    svd = TruncatedSVD(n_components=n_components, random_state=42)
    user_item_svd = svd.fit_transform(user_item_matrix)
    
    # Reconstruct matrix
    reconstructed_matrix = svd.inverse_transform(user_item_svd)
    
    # Get recommendations for user
    user_predictions = reconstructed_matrix[user_id]
    user_actual = user_item_matrix.iloc[user_id]
    
    # Find items not rated by user
    unrated_items = user_actual[user_actual == 0].index
    unrated_predictions = [(item_id, user_predictions[item_id]) for item_id in unrated_items]
    
    # Sort by predicted rating
    sorted_recommendations = sorted(unrated_predictions, key=lambda x: x[1], reverse=True)
    return sorted_recommendations[:n_recommendations]

# Generate recommendations for a sample user
sample_user = 0
user_based_recs = user_based_recommendations(user_item_matrix, sample_user)
svd_recs = svd_recommendations(user_item_matrix, sample_user)

print(f"\\nRecommendations for User {sample_user}:")
print("\\nUser-based recommendations:")
for item_id, score in user_based_recs:
    print(f"Item {item_id}: Score {score:.3f}")

print("\\nSVD-based recommendations:")
for item_id, score in svd_recs:
    print(f"Item {item_id}: Predicted Rating {score:.3f}")

# Evaluate recommendation systems
def evaluate_recommendations(user_item_matrix, n_test_users=100):
    """Evaluate recommendation systems using cross-validation"""
    test_users = np.random.choice(user_item_matrix.index, n_test_users, replace=False)
    
    user_based_precision = []
    svd_precision = []
    
    for user_id in test_users:
        # Get user's actual ratings
        user_ratings = user_item_matrix.iloc[user_id]
        high_rated_items = user_ratings[user_ratings >= 4].index.tolist()
        
        if len(high_rated_items) < 2:
            continue
        
        # Generate recommendations
        user_based_recs = user_based_recommendations(user_item_matrix, user_id, n_recommendations=10)
        svd_recs = svd_recommendations(user_item_matrix, user_id, n_recommendations=10)
        
        # Calculate precision
        user_based_items = [item_id for item_id, _ in user_based_recs]
        svd_items = [item_id for item_id, _ in svd_recs]
        
        user_based_prec = len(set(user_based_items) & set(high_rated_items)) / len(user_based_items)
        svd_prec = len(set(svd_items) & set(high_rated_items)) / len(svd_items)
        
        user_based_precision.append(user_based_prec)
        svd_precision.append(svd_prec)
    
    return user_based_precision, svd_precision

# Evaluate systems
print("\\nEvaluating recommendation systems...")
user_based_precision, svd_precision = evaluate_recommendations(user_item_matrix)

print(f"User-based average precision: {np.mean(user_based_precision):.3f}")
print(f"SVD-based average precision: {np.mean(svd_precision):.3f}")

# Visualize results
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.hist(user_based_precision, alpha=0.7, label='User-based', bins=20)
plt.hist(svd_precision, alpha=0.7, label='SVD-based', bins=20)
plt.xlabel('Precision')
plt.ylabel('Frequency')
plt.title('Recommendation System Precision')
plt.legend()

plt.subplot(1, 3, 2)
# User-item matrix heatmap (subset)
subset_matrix = user_item_matrix.iloc[:50, :50]
plt.imshow(subset_matrix, cmap='viridis', aspect='auto')
plt.xlabel('Items')
plt.ylabel('Users')
plt.title('User-Item Rating Matrix (Subset)')
plt.colorbar()

plt.subplot(1, 3, 3)
# Rating distribution
plt.hist(ratings_df['rating'], bins=5, alpha=0.7, edgecolor='black')
plt.xlabel('Rating')
plt.ylabel('Frequency')
plt.title('Rating Distribution')
plt.xticks(range(1, 6))

plt.tight_layout()
plt.show()
\`\`\`

## Industry-Specific Applications

### Manufacturing: Predictive Maintenance
\`\`\`python
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt

# Simulate manufacturing sensor data
def create_maintenance_dataset(n_machines=100, n_days=365):
    """Create simulated manufacturing sensor data"""
    np.random.seed(42)
    
    data = []
    
    for machine_id in range(n_machines):
        for day in range(n_days):
            # Simulate normal operation
            if day < 300:
                vibration = np.random.normal(2.5, 0.5)
                temperature = np.random.normal(75, 5)
                pressure = np.random.normal(100, 10)
                noise_level = np.random.normal(60, 5)
                failure_risk = 0
            else:
                # Simulate degradation
                degradation_factor = (day - 300) / 65
                vibration = np.random.normal(2.5 + degradation_factor * 2, 0.5)
                temperature = np.random.normal(75 + degradation_factor * 10, 5)
                pressure = np.random.normal(100 + degradation_factor * 20, 10)
                noise_level = np.random.normal(60 + degradation_factor * 15, 5)
                failure_risk = 1 if day > 350 else 0
            
            data.append({
                'machine_id': machine_id,
                'day': day,
                'vibration': vibration,
                'temperature': temperature,
                'pressure': pressure,
                'noise_level': noise_level,
                'failure_risk': failure_risk
            })
    
    return pd.DataFrame(data)

# Create dataset
maintenance_data = create_maintenance_dataset()
print(f"Maintenance dataset shape: {maintenance_data.shape}")
print(f"Failure rate: {maintenance_data['failure_risk'].mean():.3f}")

# Prepare features
feature_columns = ['vibration', 'temperature', 'pressure', 'noise_level']
X = maintenance_data[feature_columns]
y = maintenance_data['failure_risk']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train predictive maintenance model
maintenance_model = RandomForestClassifier(n_estimators=100, random_state=42)
maintenance_model.fit(X_train_scaled, y_train)

# Evaluate model
y_pred = maintenance_model.predict(X_test_scaled)
accuracy = maintenance_model.score(X_test_scaled, y_test)

print(f"\\nPredictive Maintenance Results:")
print(f"Accuracy: {accuracy:.3f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=['Normal', 'Failure Risk']))

# Visualize results
plt.figure(figsize=(15, 10))

plt.subplot(2, 3, 1)
plt.hist(maintenance_data[maintenance_data['failure_risk'] == 0]['vibration'], 
         alpha=0.7, label='Normal', bins=50)
plt.hist(maintenance_data[maintenance_data['failure_risk'] == 1]['vibration'], 
         alpha=0.7, label='Failure Risk', bins=50)
plt.xlabel('Vibration')
plt.ylabel('Frequency')
plt.title('Vibration Distribution')
plt.legend()

plt.subplot(2, 3, 2)
plt.hist(maintenance_data[maintenance_data['failure_risk'] == 0]['temperature'], 
         alpha=0.7, label='Normal', bins=50)
plt.hist(maintenance_data[maintenance_data['failure_risk'] == 1]['temperature'], 
         alpha=0.7, label='Failure Risk', bins=50)
plt.xlabel('Temperature')
plt.ylabel('Frequency')
plt.title('Temperature Distribution')
plt.legend()

plt.subplot(2, 3, 3)
plt.hist(maintenance_data[maintenance_data['failure_risk'] == 0]['pressure'], 
         alpha=0.7, label='Normal', bins=50)
plt.hist(maintenance_data[maintenance_data['failure_risk'] == 1]['pressure'], 
         alpha=0.7, label='Failure Risk', bins=50)
plt.xlabel('Pressure')
plt.ylabel('Frequency')
plt.title('Pressure Distribution')
plt.legend()

plt.subplot(2, 3, 4)
# Feature importance
feature_importance = maintenance_model.feature_importances_
plt.barh(feature_columns, feature_importance)
plt.xlabel('Feature Importance')
plt.title('Feature Importance for Failure Prediction')

plt.subplot(2, 3, 5)
# Confusion matrix
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
            xticklabels=['Normal', 'Failure Risk'],
            yticklabels=['Normal', 'Failure Risk'])
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')

plt.subplot(2, 3, 6)
# Time series of sensor readings for one machine
machine_0_data = maintenance_data[maintenance_data['machine_id'] == 0]
plt.plot(machine_0_data['day'], machine_0_data['vibration'], label='Vibration')
plt.plot(machine_0_data['day'], machine_0_data['temperature']/10, label='Temperature/10')
plt.plot(machine_0_data['day'], machine_0_data['pressure']/10, label='Pressure/10')
plt.axvline(x=300, color='red', linestyle='--', label='Degradation Start')
plt.xlabel('Day')
plt.ylabel('Sensor Reading')
plt.title('Sensor Readings Over Time (Machine 0)')
plt.legend()

plt.tight_layout()
plt.show()
\`\`\`

## Practical Exercise

Apply advanced ML concepts:
1. Implement a reinforcement learning agent
2. Build a simple GAN for image generation
3. Create a medical diagnosis system
4. Develop a fraud detection model
5. Build a recommendation system
6. Implement predictive maintenance
7. Analyze real-world datasets
8. Deploy models for production use

## Summary & Next Steps

Advanced ML concepts and real-world applications demonstrate the power and versatility of machine learning. Continue exploring and applying these techniques to solve complex problems.

**Congratulations!** You've completed the comprehensive Machine Learning series. You now have the knowledge and skills to tackle real-world ML challenges across various industries.`,
            readTime: 34,
            publishedAt: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['Reinforcement Learning', 'GANs', 'Healthcare', 'Finance', 'E-commerce', 'Manufacturing']
          }
          // Additional episodes would continue here...
        ]
      }
      // Additional modules would be added here...
    };
  }

  /**
   * Get default series for unknown modules
   */
  private getDefaultSeries(moduleId: string): SeriesData {
    return {
      id: moduleId,
      title: `${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)} Learning Series`,
      description: `Comprehensive learning series for ${moduleId}.`,
      totalEpisodes: 8,
      estimatedDuration: '8 weeks',
      difficulty: 'Beginner',
      category: moduleId,
      learningOutcomes: [
        'Master fundamental concepts',
        'Apply practical techniques',
        'Build real-world projects'
      ],
      episodes: []
    };
  }
}

export const seriesService = new SeriesService();
