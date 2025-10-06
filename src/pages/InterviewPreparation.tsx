import React, { useState, memo } from 'react';
import { ArrowLeft, Users, MessageSquare, BarChart3, Database, Code, TrendingUp, CheckCircle, Lightbulb, Target, Clock, BookOpen, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const InterviewPreparation: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('communication');

  const categories = [
    { id: 'communication', name: 'Communication', icon: MessageSquare, color: 'from-orange-400 to-orange-500' },
    { id: 'excel', name: 'Excel & Data Cleaning', icon: BarChart3, color: 'from-orange-400 to-orange-500' },
    { id: 'sql', name: 'SQL', icon: Database, color: 'from-orange-400 to-orange-500' },
    { id: 'powerbi', name: 'Power BI/Tableau', icon: BarChart3, color: 'from-orange-400 to-orange-500' },
    { id: 'python', name: 'Python for Data Analysis', icon: Code, color: 'from-orange-400 to-orange-500' },
    { id: 'statistics', name: 'Statistics & Logic', icon: TrendingUp, color: 'from-orange-400 to-orange-500' },
    { id: 'behavioral', name: 'Behavioral/HR', icon: Users, color: 'from-orange-400 to-orange-500' }
  ];

  const communicationQuestions = [
    {
      category: "Data Analyst Communication Interview Questions (With Suggestions)",
      questions: [
        {
          question: "Tell me about a data project you worked on that you're passionate about.",
          sampleResponse: "I built a Power BI dashboard to track student performance trends for an NGO. It helped them identify drop-out risks early and allocate resources more effectively. The dashboard reduced their intervention time by 40% and improved student retention rates by 15%. I loved seeing how visual insights made their decision-making faster and more data-driven.",
          tip: "Use the STAR method: Situation, Task, Action, Result. Include specific metrics and business impact."
        },
        {
          question: "How would you convince senior executives that data matters?",
          sampleResponse: "I'd present a concrete example: 'Last quarter, our data analysis revealed that 30% of customer churn was due to poor onboarding experience. By implementing our data-driven recommendations, we reduced churn by 25% and increased revenue by $2M. Data transforms gut feelings into measurable strategies that directly impact the bottom line.'",
          tip: "Always quantify your examples with specific numbers, timeframes, and financial impact."
        },
        {
          question: "How do you handle stakeholders who don't trust your data analysis?",
          sampleResponse: "I start by understanding their concerns and walk them through my methodology step-by-step. I show them the raw data, explain my cleaning process, and demonstrate how I arrived at conclusions. I also offer to validate findings with additional data sources or different analytical approaches to build confidence.",
          tip: "Transparency and collaboration build trust. Always be open to feedback and alternative perspectives."
        }
      ]
    },
    {
      category: "Advanced Data Analyst Communication Questions",
      subcategory: "Explaining Concepts to Non-Technical Stakeholders",
      questions: [
        {
          question: "How would you explain data cleaning to someone unfamiliar with it?",
          sampleResponse: "Just like proofreading a document, data cleaning fixes errors — like removing duplicates, correcting typos, or handling missing values — so our analysis is accurate."
        },
        {
          question: "How would you explain correlation vs causation to a marketing team?",
          sampleResponse: "Correlation means two things happen together, like more ice cream and more sunburns. But one doesn't cause the other. Causation means one actually impacts the other."
        },
        {
          question: "How would you explain the value of dashboards to a senior executive?",
          sampleResponse: "Dashboards show real-time business health — like a car dashboard shows speed, fuel, and alerts. It helps you act fast."
        },
        {
          question: "How do you present complex data to someone who doesn't understand numbers?",
          sampleResponse: "I use visuals — like charts or color-coded KPIs — and focus on what the data means, not how it's calculated."
        },
        {
          question: "How would you explain what an outlier is and why it matters?",
          sampleResponse: "It's a data point far from others. Like one customer spending ₹1,00,000 when everyone else spends ₹5,000. It can affect averages or indicate an issue."
        }
      ]
    },
    {
      category: "Reporting, Presenting & Storytelling",
      questions: [
        {
          question: "How do you make a report engaging for senior management?",
          sampleResponse: "By keeping it visual, focusing on KPIs, and including recommendations — not just charts."
        },
        {
          question: "How would you handle presenting data with bad news (e.g., sales drop)?",
          sampleResponse: "I'd focus on what happened, why, and suggest next steps — not just highlight the problem."
        },
        {
          question: "Give an example of turning a raw dataset into a business decision.",
          sampleResponse: "I analyzed customer support data and found that 40% of delays came from one region — that insight helped the company prioritize hiring locally."
        },
        {
          question: "How do you handle disagreements when stakeholders interpret your data differently?",
          sampleResponse: "I walk them through the data logic, show them how it was processed, and stay open to feedback or alternative views."
        },
        {
          question: "How would you summarize a month's worth of sales data in 2 minutes?",
          sampleResponse: "Use a formula: Total revenue, key region performance, top/worst products, key takeaway."
        }
      ]
    },
    {
      category: "Communication in Collaboration & Interviews",
      questions: [
        {
          question: "How do you explain gaps or missing values to a project lead?",
          sampleResponse: "I flag it early, explain the impact, and suggest how we can treat or estimate the missing data."
        },
        {
          question: "Have you ever simplified a complex problem for someone else?",
          sampleResponse: "During my internship, I simplified SQL filters by showing the team how to use Excel to test conditions first."
        },
        {
          question: "How would you train someone in Power BI if they're completely new?",
          sampleResponse: "I'd start by explaining the flow: get data → clean data → build visuals. Then walk them through a small dashboard together."
        },
        {
          question: "How do you keep your communication clear when under pressure or deadlines?",
          sampleResponse: "I prepare bullet points, stay to the facts, and follow up with a summary in writing if needed."
        },
        {
          question: "Tell me about a time you had to explain something you didn't fully understand yourself.",
          sampleResponse: "I admitted I wasn't sure, researched it fast, and came back with a solution the next day."
        }
      ]
    }
  ];

  const technicalQuestions = {
    excel: [
      {
        question: "What are Pivot Tables? How do you use them?",
        sampleResponse: "Pivot Tables are Excel's most powerful feature for data analysis. They help summarize large datasets by grouping, filtering, and calculating data dynamically. For example, I used them to analyze quarterly sales performance by creating a pivot table with 'Product Category' as rows, 'Quarter' as columns, and 'Sales Amount' as values. This allowed me to quickly identify which products performed best in each quarter and spot seasonal trends."
      },
      {
        question: "What is VLOOKUP and when would you use it?",
        sampleResponse: "VLOOKUP searches for a value in the first column of a table and returns a value from the same row in a specified column. I use it to merge data from different sheets, like matching employee IDs with their department names. However, it has limitations - it can only look right, and if the lookup column isn't first, it fails. That's why I prefer INDEX-MATCH for more complex scenarios."
      },
      {
        question: "Difference between VLOOKUP and INDEX-MATCH?",
        sampleResponse: "INDEX-MATCH is more flexible and powerful. VLOOKUP can only search the leftmost column and return values to the right. INDEX-MATCH can search any column and return values from any direction. It's also more efficient with large datasets and doesn't break when columns are inserted. For example, if I need to find a product name based on its ID in the middle of a table, INDEX-MATCH handles this easily while VLOOKUP would require restructuring the data."
      },
      {
        question: "How do you handle missing values in Excel?",
        sampleResponse: "I first identify the pattern of missing data using conditional formatting or COUNTBLANK functions. For numerical data, I might use AVERAGE or MEDIAN to fill gaps. For categorical data, I use MODE or create a 'Missing' category. I always document my approach and its potential impact on analysis. In one project, I used linear interpolation for time-series data where missing values were clearly random, but excluded records with systematic missing patterns."
      },
      {
        question: "Explain conditional formatting and give a practical example.",
        sampleResponse: "Conditional formatting automatically applies formatting based on cell values or formulas. I use it extensively for data quality checks and highlighting insights. For example, I created a sales dashboard where cells turn red if sales drop below target, yellow for 80-100% of target, and green for above target. I also use data bars to create in-cell bar charts for quick visual comparisons across products or regions."
      },
      {
        question: "What are some Excel functions every analyst should know?",
        sampleResponse: "Essential functions include: IF/IFS for logical operations, COUNTIF/COUNTIFS for conditional counting, SUMIF/SUMIFS for conditional summing, VLOOKUP/XLOOKUP for lookups, INDEX-MATCH for flexible lookups, CONCATENATE/TEXTJOIN for text manipulation, LEFT/RIGHT/MID for text extraction, RANK/RANK.AVG for ranking, and array functions like SUMPRODUCT. I also use newer functions like XLOOKUP, FILTER, and UNIQUE for modern data analysis workflows."
      },
      {
        question: "What is data validation and where have you used it?",
        sampleResponse: "Data validation restricts what users can enter in cells. I use it to ensure data quality and consistency. For example, I created a survey form with dropdown lists for 'Department' (HR, Finance, IT, etc.) and date pickers for 'Start Date'. I also use custom validation rules, like ensuring percentages are between 0-100% or that email addresses contain '@'. This prevents data entry errors and makes analysis more reliable."
      },
      {
        question: "How would you merge two datasets in Excel?",
        sampleResponse: "For small datasets, I use VLOOKUP or XLOOKUP. For larger datasets or complex merges, I use Power Query (Get & Transform Data). Power Query is more powerful - it can handle multiple join types, clean data during import, and refresh automatically. For example, I merged customer data from a CSV file with sales data from a database, performing left joins and cleaning inconsistent customer names all in one Power Query workflow."
      }
    ],
    sql: [
      {
        question: "What is SQL and why is it important for analysts?",
        sampleResponse: "SQL (Structured Query Language) is the standard language for managing and analyzing relational databases. It's crucial for analysts because most business data is stored in databases, and SQL allows us to extract, filter, aggregate, and transform this data efficiently. Unlike Excel, SQL can handle millions of records and perform complex joins across multiple tables, making it essential for real-world data analysis."
      },
      {
        question: "Write a SQL query to find top 5 highest-selling products.",
        sampleResponse: "SELECT product_name, SUM(quantity_sold) as total_sales FROM sales_table GROUP BY product_name ORDER BY total_sales DESC LIMIT 5; This query groups sales by product, sums the quantities, orders by total sales in descending order, and limits to top 5 results."
      },
      {
        question: "What are JOINS? Explain the different types.",
        sampleResponse: "JOINS combine data from multiple tables based on related columns. INNER JOIN returns only matching records from both tables. LEFT JOIN returns all records from the left table and matching records from the right table. RIGHT JOIN does the opposite. FULL OUTER JOIN returns all records from both tables. I use INNER JOIN most frequently, like joining customer data with order data to analyze purchase patterns."
      },
      {
        question: "Difference between WHERE and HAVING clause?",
        sampleResponse: "WHERE filters individual rows before grouping and aggregation, while HAVING filters groups after GROUP BY. For example, 'WHERE price > 100' filters products before grouping, while 'HAVING COUNT(*) > 5' filters groups that have more than 5 products. I use WHERE for row-level conditions and HAVING for aggregate conditions like 'HAVING AVG(sales) > 1000'."
      },
      {
        question: "What is a subquery and when would you use it?",
        sampleResponse: "A subquery is a query nested inside another query. I use it when I need to filter based on calculated values. For example, to find products with above-average sales: SELECT product_name FROM products WHERE sales > (SELECT AVG(sales) FROM products). Subqueries are useful for complex filtering, but I also consider CTEs (Common Table Expressions) for better readability in complex scenarios."
      },
      {
        question: "What are window functions? Give a practical example.",
        sampleResponse: "Window functions perform calculations across a set of rows related to the current row without grouping. They're powerful for rankings, running totals, and moving averages. For example, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) ranks employees by salary within each department. I use RANK() for handling ties, LAG()/LEAD() for comparing with previous/next rows, and SUM() OVER for running totals."
      },
      {
        question: "Difference between UNION and UNION ALL?",
        sampleResponse: "UNION combines results from multiple SELECT statements and removes duplicate rows, while UNION ALL keeps all rows including duplicates. UNION ALL is faster because it doesn't need to check for duplicates. I use UNION ALL when I know there are no duplicates or when I want to preserve all records. For example, combining monthly sales data where I want all records, I'd use UNION ALL."
      },
      {
        question: "What is a primary key and foreign key?",
        sampleResponse: "A primary key uniquely identifies each row in a table and cannot be null. A foreign key is a column that references the primary key of another table, establishing relationships. For example, in an orders table, 'order_id' is the primary key, and 'customer_id' is a foreign key referencing the customers table. This maintains referential integrity and enables proper joins between related tables."
      },
      {
        question: "How would you troubleshoot a slow SQL query?",
        sampleResponse: "I start by using EXPLAIN to see the execution plan and identify bottlenecks. I check for missing indexes on JOIN and WHERE columns, avoid SELECT * by specifying only needed columns, and ensure proper indexing strategy. I also look for expensive operations like subqueries that could be converted to JOINs, check for data type mismatches in JOINs, and consider query rewriting for better performance."
      },
      {
        question: "Explain a complex SQL problem you solved.",
        sampleResponse: "I needed to identify customers who made purchases in consecutive months. I used window functions with LAG() to compare each purchase date with the previous one, calculated month differences, and filtered for customers with consecutive purchases. The query helped identify loyal customers and their purchase patterns, leading to targeted retention campaigns that increased customer lifetime value by 20%."
      }
    ],
    powerbi: [
      {
        question: "Why use Power BI/Tableau over Excel for data visualization?",
        sampleResponse: "Power BI and Tableau are designed specifically for business intelligence and can handle much larger datasets than Excel. They offer interactive dashboards, real-time data connections, and advanced visualizations that aren't possible in Excel. For example, I can connect directly to databases, create drill-down capabilities, and share interactive reports with stakeholders. Excel is great for analysis, but Power BI excels at storytelling and presenting insights to executives."
      },
      {
        question: "What is a slicer in Power BI and how do you use it effectively?",
        sampleResponse: "Slicers are interactive filters that allow users to dynamically filter data across multiple visuals. I use them strategically - for example, placing a 'Year' slicer at the top of a sales dashboard so users can quickly switch between years. I also use cross-filtering to ensure all charts respond to the same slicer selections. For better UX, I group related slicers together and use consistent formatting across the dashboard."
      },
      {
        question: "What's the difference between a table and a matrix in Power BI?",
        sampleResponse: "A table displays data in a flat, row-by-row format, while a matrix can pivot data with both row and column groupings. I use tables for detailed data views and matrices for summary analysis. For example, a matrix with 'Product Category' as rows and 'Quarter' as columns with 'Sales' as values creates a cross-tabulation that's perfect for trend analysis. Matrices also support subtotals and grand totals automatically."
      },
      {
        question: "Explain a complex DAX formula you've created and its purpose.",
        sampleResponse: "I created a DAX measure: 'Sales YoY Growth = DIVIDE([Sales Current Year] - [Sales Previous Year], [Sales Previous Year])'. This calculates year-over-year growth percentage. I also used CALCULATE to filter it by specific regions: 'East Region Growth = CALCULATE([Sales YoY Growth], Region[Region] = \"East\")'. DAX is powerful because it's context-aware - the same measure can show different results depending on the visual's filters and groupings."
      },
      {
        question: "What is the difference between a measure and a calculated column in Power BI?",
        sampleResponse: "Measures are calculated on-the-fly based on the current context (filters, groupings) and don't store values in the data model. Calculated columns are computed once and stored as new columns. I use measures for aggregations like SUM(Sales) or ratios that change based on what's selected. Calculated columns are for row-level calculations like concatenating first and last names. Measures are more memory-efficient and flexible for interactive dashboards."
      },
      {
        question: "How would you design a dashboard for C-level executives?",
        sampleResponse: "I focus on high-level KPIs and strategic insights. I use a clean layout with 4-6 key metrics at the top, followed by trend charts showing performance over time. I include drill-down capabilities but keep the main view simple. I use consistent color coding (red for problems, green for good performance) and include context with brief explanations. I also add a 'Key Insights' text box highlighting the most important findings and recommendations."
      },
      {
        question: "Tell me about a complex dashboard you built and the business impact.",
        sampleResponse: "I built a customer analytics dashboard that tracked acquisition, retention, and lifetime value across different channels. It included cohort analysis, funnel visualizations, and predictive churn indicators. The dashboard helped the marketing team identify that social media had the highest customer lifetime value but lowest acquisition volume. They reallocated 30% of their budget to social media, resulting in a 25% increase in high-value customers and $2M additional revenue over 6 months."
      }
    ],
    python: [
      {
        question: "Which Python libraries have you used for data analysis?",
        sampleResponse: "I primarily use pandas for data manipulation, NumPy for numerical operations, matplotlib and seaborn for visualization, and scikit-learn for machine learning. I also use requests for API data extraction, beautifulsoup for web scraping, and plotly for interactive visualizations. For time series analysis, I use statsmodels, and for big data, I've worked with PySpark. Each library serves a specific purpose in the data analysis pipeline."
      },
      {
        question: "How do you handle missing values in Python?",
        sampleResponse: "I first analyze the pattern of missing data using df.isnull().sum() and visualization. For numerical data, I might use mean, median, or forward/backward fill depending on the context. For categorical data, I create a 'Missing' category or use mode. I also use advanced techniques like KNN imputation for complex datasets. I always document my approach and test the impact on results. In one project, I used interpolation for time series data where missing values were clearly random."
      },
      {
        question: "What's the difference between Series and DataFrame in pandas?",
        sampleResponse: "A Series is a one-dimensional array with labels (like a single column), while a DataFrame is a two-dimensional table with rows and columns (like a spreadsheet). Series are useful for single-variable analysis, while DataFrames handle multiple variables. For example, df['sales'] returns a Series, while df[['sales', 'profit']] returns a DataFrame. Series operations are faster, but DataFrames provide more functionality for complex data manipulation."
      },
      {
        question: "How do you group and summarize data in pandas?",
        sampleResponse: "I use groupby() with various aggregation functions. For example, df.groupby('category')['sales'].sum() groups by category and sums sales. I also use multiple aggregations: df.groupby('region').agg({'sales': 'sum', 'profit': 'mean', 'count': 'count'}). For more complex analysis, I use pivot tables with pd.pivot_table() or create custom aggregation functions. I often combine groupby with transform() for group-level calculations that maintain the original DataFrame structure."
      },
      {
        question: "How do you merge two DataFrames in pandas?",
        sampleResponse: "I use pd.merge() with different join types. For example, pd.merge(df1, df2, on='id', how='left') performs a left join. I specify the join type (inner, left, right, outer) based on the data relationship. For concatenating DataFrames with the same columns, I use pd.concat(). I also use join() for index-based merging. I always check for duplicate keys and handle them appropriately, and I verify the merge results to ensure data integrity."
      },
      {
        question: "How do you create effective visualizations in Python?",
        sampleResponse: "I use matplotlib for basic plots and seaborn for statistical visualizations. I create a consistent style with sns.set_style() and use appropriate plot types: histograms for distributions, scatter plots for correlations, box plots for comparisons, and line plots for trends. I always add proper labels, titles, and legends. For interactive dashboards, I use plotly. I also create subplots for multiple visualizations and use color palettes that are accessible and meaningful to the audience."
      },
      {
        question: "Write a function to detect and handle outliers in a dataset.",
        sampleResponse: "def handle_outliers(df, column, method='iqr'):\n    if method == 'iqr':\n        Q1 = df[column].quantile(0.25)\n        Q3 = df[column].quantile(0.75)\n        IQR = Q3 - Q1\n        lower_bound = Q1 - 1.5 * IQR\n        upper_bound = Q3 + 1.5 * IQR\n        return df[(df[column] >= lower_bound) & (df[column] <= upper_bound)]\n    elif method == 'zscore':\n        from scipy import stats\n        z_scores = np.abs(stats.zscore(df[column]))\n        return df[z_scores < 3]\n    return df"
      },
      {
        question: "What's the difference between EDA and predictive modeling?",
        sampleResponse: "EDA (Exploratory Data Analysis) is about understanding the data - finding patterns, distributions, correlations, and anomalies. It's descriptive and helps formulate hypotheses. Predictive modeling uses statistical/machine learning techniques to make predictions on new data. EDA comes first and informs the modeling process. For example, EDA might reveal that certain features are highly correlated, which would influence feature selection in modeling. EDA is about 'what happened' while modeling is about 'what will happen'."
      }
    ],
    statistics: [
      {
        question: "What's the difference between mean, median, and mode? When would you use each?",
        sampleResponse: "Mean is the average of all values, median is the middle value when sorted, and mode is the most frequent value. I use mean for normally distributed data, median for skewed data (like income data), and mode for categorical data. For example, in salary analysis, median is often more representative than mean because it's not affected by extreme outliers. I always check the distribution first to decide which measure of central tendency to use."
      },
      {
        question: "Explain standard deviation and its practical significance.",
        sampleResponse: "Standard deviation measures how spread out data points are from the mean. A low standard deviation means data points are close to the mean, while a high one means they're spread out. In business, I use it to assess risk and variability. For example, if two investment options have the same average return but different standard deviations, the one with lower standard deviation is less risky. I also use it to identify outliers and understand data quality."
      },
      {
        question: "What is correlation and how do you interpret it?",
        sampleResponse: "Correlation measures the linear relationship between two variables, ranging from -1 to +1. A correlation of 0.8 means strong positive relationship, -0.3 means weak negative relationship. I use df.corr() in pandas and visualize with heatmaps. However, correlation doesn't imply causation. For example, ice cream sales and drowning incidents are correlated (both increase in summer), but one doesn't cause the other. I always consider external factors and use additional analysis to establish causality."
      },
      {
        question: "Explain A/B testing and how you would design one.",
        sampleResponse: "A/B testing compares two versions to determine which performs better. I start by defining a clear hypothesis (e.g., 'New button color increases clicks by 10%'), determine sample size using statistical power analysis, randomly assign users to groups, run the test for sufficient duration, and analyze results using statistical significance tests. I ensure both groups are similar except for the tested variable and account for external factors like seasonality. The goal is to make data-driven decisions with confidence."
      },
      {
        question: "What is p-value and how do you interpret it?",
        sampleResponse: "P-value is the probability of observing the results (or more extreme) if the null hypothesis is true. A p-value < 0.05 means there's less than 5% chance the results occurred by random chance, so we reject the null hypothesis. However, p-value alone isn't enough - I also consider effect size and practical significance. For example, a statistically significant result with tiny effect size might not be practically meaningful. I use p-values as one piece of evidence, not the final answer."
      },
      {
        question: "What is the difference between Type I and Type II errors?",
        sampleResponse: "Type I error (false positive) occurs when we reject a true null hypothesis - saying there's an effect when there isn't. Type II error (false negative) occurs when we fail to reject a false null hypothesis - missing a real effect. In business, Type I errors might lead to implementing ineffective changes, while Type II errors might cause us to miss profitable opportunities. I balance these risks by choosing appropriate significance levels and sample sizes based on the business context."
      },
      {
        question: "How do you handle skewed data in your analysis?",
        sampleResponse: "I first identify the type of skewness using histograms and skewness statistics. For right-skewed data, I might use log transformation or square root transformation. For left-skewed data, I might use square transformation. I also consider using median instead of mean and interquartile range instead of standard deviation. In some cases, I might use non-parametric tests that don't assume normal distribution. I always document my approach and test whether transformations improve the analysis."
      }
    ],
    behavioral: [
      {
        question: "Tell me about yourself.",
        sampleResponse: "I'm a data analyst with a strong foundation in Excel, SQL, and Python, backed by [X years] of experience in [industry]. I'm passionate about transforming raw data into actionable insights that drive business decisions. For example, in my recent project, I analyzed customer behavior data and identified key patterns that led to a 15% increase in conversion rates. I'm particularly drawn to this role because it combines my analytical skills with my interest in [specific company/industry], and I'm excited about the opportunity to contribute to your data-driven initiatives.",
        tip: "Structure: Current role + Key skills + Recent achievement + Why this role. Keep it 2-3 minutes and relevant to the position."
      },
      {
        question: "Why do you want to become a Data Analyst?",
        sampleResponse: "I'm naturally curious about patterns and trends in data. I love the detective work aspect of data analysis - starting with a business question, digging through data to find answers, and presenting insights that actually impact decisions. What excites me most is that data analysis sits at the intersection of technology, business, and storytelling. I get to use technical tools like SQL and Python while also communicating findings to non-technical stakeholders. It's the perfect blend of analytical thinking and creative problem-solving.",
        tip: "Show genuine passion, mention specific aspects you enjoy, and connect it to business impact."
      },
      {
        question: "Tell me about a data project you're proud of.",
        sampleResponse: "I worked on a customer churn analysis project where I identified that 30% of customers were leaving within 90 days. I used SQL to extract data, Python for analysis, and created a Power BI dashboard showing key churn indicators. The insights revealed that customers who didn't engage with our onboarding emails had a 60% higher churn rate. I recommended an automated email sequence, which we implemented and saw a 25% reduction in churn within 3 months, saving the company approximately $500K annually.",
        tip: "Use the STAR method: Situation, Task, Action, Result. Include specific metrics and business impact."
      },
      {
        question: "How do you handle tight deadlines and competing priorities?",
        sampleResponse: "I prioritize tasks based on business impact and urgency. I break large projects into smaller milestones and communicate progress regularly with stakeholders. For example, when I had to deliver a quarterly sales analysis while also working on an urgent customer segmentation project, I created a detailed timeline, identified dependencies, and negotiated realistic deadlines. I also use project management tools like Trello to track progress and ensure nothing falls through the cracks.",
        tip: "Show specific strategies, mention tools you use, and give a concrete example."
      },
      {
        question: "How do you deal with incomplete or messy data?",
        sampleResponse: "I start by assessing data quality and documenting what's missing or inconsistent. I use exploratory data analysis to understand patterns in missing data - is it random or systematic? For missing values, I might use imputation techniques or create 'missing' categories depending on the context. I always document my assumptions and their potential impact on results. In one project, I found that 20% of customer records were missing phone numbers, but this was random and didn't affect the analysis, so I proceeded while noting this limitation in my report.",
        tip: "Show systematic approach, mention specific techniques, and emphasize documentation and transparency."
      },
      {
        question: "Tell me about a time you made a mistake in your analysis. How did you handle it?",
        sampleResponse: "In my first month, I made an error in a sales forecast by using the wrong date range, which led to an overestimate of 15%. When I discovered the mistake, I immediately informed my manager, corrected the analysis, and re-sent the updated report with an explanation. I also implemented a double-check process where I always validate date ranges and key assumptions before finalizing any analysis. This experience taught me the importance of thorough validation and transparent communication when errors occur.",
        tip: "Choose a real but not catastrophic mistake, show accountability, and focus on learning and improvement."
      },
      {
        question: "What's your biggest strength as a data analyst?",
        sampleResponse: "My ability to translate complex data into clear, actionable insights for non-technical stakeholders. I can take a dataset with thousands of rows and distill it into a compelling story that drives business decisions. For example, I once presented a customer segmentation analysis to executives using simple visualizations and business language, which led to a new marketing strategy that increased customer engagement by 30%. I believe that the value of analysis lies not just in the technical work, but in how well you communicate the findings.",
        tip: "Choose a strength relevant to the role, provide a specific example, and show business impact."
      },
      {
        question: "How do you stay updated with new tools and techniques in data analysis?",
        sampleResponse: "I follow a multi-pronged approach: I take online courses on platforms like Coursera and DataCamp, participate in Kaggle competitions to practice with real datasets, follow industry experts on LinkedIn and Twitter, and read blogs from companies like Tableau and Microsoft. I also work on personal projects using new tools - recently, I learned Power BI by recreating an Excel dashboard, which helped me understand its capabilities better. I believe in hands-on learning and applying new skills immediately.",
        tip: "Show diverse learning methods, mention specific resources, and demonstrate practical application."
      },
      {
        question: "Where do you see yourself in 2-3 years?",
        sampleResponse: "I see myself as a senior data analyst leading end-to-end analytics projects and mentoring junior team members. I'd like to develop expertise in machine learning and advanced statistical modeling to provide more sophisticated insights. I'm also interested in learning about data engineering to better understand the full data pipeline. Ultimately, I want to become a data science manager who can bridge the gap between technical analysis and business strategy.",
        tip: "Show ambition but realistic progression, mention specific skills you want to develop, and align with the role's growth path."
      },
      {
        question: "Why should we hire you over other candidates?",
        sampleResponse: "I bring a unique combination of technical skills and business acumen. Not only do I have hands-on experience with the tools you use, but I also understand how to translate technical findings into business value. My recent project experience directly relates to your industry challenges, and I'm known for my attention to detail and ability to work under pressure. I'm also a quick learner who can adapt to new tools and methodologies. Most importantly, I'm genuinely excited about this role and the opportunity to contribute to your team's success.",
        tip: "Differentiate yourself with specific examples, show knowledge of the company/role, and demonstrate enthusiasm."
      },
      {
        question: "Do you have any questions for us?",
        sampleResponse: "I'd love to learn more about your current data infrastructure and the types of projects the team is working on. What are the biggest data challenges the company is facing right now? How does the data team collaborate with other departments? What opportunities are there for professional development and learning new tools? Also, what does success look like in this role in the first 6 months?",
        tip: "Ask thoughtful questions about the role, team, company, and growth opportunities. Show genuine interest and preparation."
      }
    ]
  };

  const getQuestionsForCategory = (categoryId: string) => {
    if (categoryId === 'communication') {
      return communicationQuestions;
    }
    return technicalQuestions[categoryId as keyof typeof technicalQuestions] || [];
  };

  const renderQuestionCard = (question: { question: string; answer: string; category: string }, index: number) => (
    <NeumorphicCard key={index} padding="lg" className="mb-6">
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-100 mb-3">
          {question.question}
        </h4>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-start gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-medium text-green-400">Sample Response:</span>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed">
            {question.sampleResponse}
          </p>
        </div>

        {question.tip && (
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-sm font-medium text-orange-400">💡 Tip:</span>
                <p className="text-gray-200 text-sm mt-1">{question.tip}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </NeumorphicCard>
  );

  const renderCategoryContent = (categoryId: string) => {
    const questions = getQuestionsForCategory(categoryId);
    
    if (categoryId === 'communication') {
      return (
        <div className="space-y-8">
          {questions.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                {section.category}
              </h3>
              
              {section.subcategory && (
                <h4 className="text-xl font-semibold text-gray-200 mb-4 ml-4">
                  {section.subcategory}
                </h4>
              )}
              
              <div className="space-y-4">
                {section.questions.map((question, questionIndex) => 
                  renderQuestionCard(question, questionIndex)
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {questions.map((question, index) => renderQuestionCard(question, index))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <NeumorphicButton
              onClick={() => navigate('/news/job-kit')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </NeumorphicButton>
            <div>
              <h1 className="text-3xl font-bold text-gray-100 mb-2">
                Data Analyst Interview Preparation
              </h1>
              <p className="text-gray-200">
                Comprehensive interview questions and answers for freshers and experienced professionals
              </p>
            </div>
          </div>
          <NeumorphicButton
            variant="accent"
            onClick={() => navigate('/news/job-kit/mock-interview')}
            className="flex items-center gap-2"
            icon={Video}
          >
            Mock Interview
          </NeumorphicButton>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <NeumorphicCard hoverable className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
                <Target className="w-5 h-5 text-gray-100" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-high-contrast">7</h3>
                <p className="text-secondary-contrast text-xs">Categories</p>
              </div>
            </div>
          </NeumorphicCard>

          <NeumorphicCard hoverable className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
                <BookOpen className="w-5 h-5 text-gray-100" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-high-contrast">50+</h3>
                <p className="text-secondary-contrast text-xs">Total Questions</p>
              </div>
            </div>
          </NeumorphicCard>

          <NeumorphicCard hoverable className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
                <Clock className="w-5 h-5 text-gray-100" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-high-contrast">2-3 Hours</h3>
                <p className="text-secondary-contrast text-xs">Prep Time</p>
              </div>
            </div>
          </NeumorphicCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Sidebar */}
        <div className="lg:col-span-1">
          <NeumorphicCard padding="lg" className="sticky top-6">
            <h3 className="text-lg font-bold text-gray-100 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <NeumorphicButton
                    key={category.id}
                    variant={activeCategory === category.id ? 'accent' : 'ghost'}
                    className="w-full justify-start mb-2 text-left"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <div className="flex items-center w-full">
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mr-3 flex-shrink-0`}>
                        <IconComponent className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-left flex-1">{category.name}</span>
                    </div>
                  </NeumorphicButton>
                );
              })}
            </div>
          </NeumorphicCard>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <NeumorphicCard padding="lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-100 mb-2">
                {categories.find(cat => cat.id === activeCategory)?.name} Questions
              </h2>
              <p className="text-gray-200">
                Practice these questions to ace your data analyst interview
              </p>
            </div>

            {renderCategoryContent(activeCategory)}
          </NeumorphicCard>
        </div>
      </div>
    </div>
  );
};

export default memo(InterviewPreparation);
