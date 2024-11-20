# MySQL

### Core Commands & Queries

```sql
-- list of advanced mysql query syntax
-- inserting data into a table where data is fetch from another table
INSERT INTO first_table_name (column1, column2, columnN...) VALUES (value1, value2, value3,...valueN);
SELECT column1, column2, columnN FROM second_table_name WHERE condition;

-- group by clause
-- The GROUP BY clause must follow the conditions in the WHERE clause and must precede the ORDER BY clause if one is used
SELECT column1, column2...
FROM table_name
WHERE condition
GROUP BY column1, column2
ORDER BY column1, column2

-- distinct keyword
-- The SQL DISTINCT keyword is used in conjunction with the SELECT statement
-- eliminate all the duplicate records and fetching only unique records
SELECT DISTINCT column1, column2, columnN..
FROM table_name
WHERE condition

-- order by clause
-- sort data in a table
SELECT column1, column2, columnN..
FROM table_name
WHERE condition
ORDER BY column1, column2, columnN ASC | DESC;

-- order with condition
SELECT * FROM CUSTOMERS
ORDER BY (CASE column1
WHEN condition THEN order e.g. 1
WHEN condition THEN order
WHEN condition THEN order
WHEN condition THEN order
WHEN condition THEN order
ELSE 100 END) ASC, column1 DESC;
```

### Join Statements

```sql
-- join
-- note: to avoid ambiguity specify the table and column name (table.column) in select clause
-- combine data from 2 or more tables with common values
SELECT table1.column1, table1.column2, table1.column3, table2.column1...
FROM table1, table2

-- joining with primary key and foreign key
SELECT table1.column1, table1.column2, table1.column3, table2.column1...
FROM table1, table2
WHERE table1.pk = table2.fk;

-- inner join
-- returns rows when there is a match in both tables that satisfies the ON condition
SELECT table1.column1, table2.column2...
FROM table1
INNER JOIN table2
ON table1.common_field = table2.common_field; -- common fields are primary key or foreign key values

-- left join
-- returns all rows from the left table, even if there are no matches in the right table
SELECT table1.column1, table2.column2...
FROM table1
LEFT JOIN table2
ON table1.common_field = table2.common_field;

-- right join
-- returns all rows from the right table, even if there are no matches in the left table
SELECT table1.column1, table2.column2...
FROM table1
RIGHT JOIN table2
ON table1.common_field = table2.common_field;

-- full join
-- returns rows when there is a match in one of the tables
SELECT table1.column1, table2.column2...
FROM table1
FULL JOIN table2
ON table1.common_field = table2.common_field;

-- multiple joins
-- chaining join statements
SELECT table1.column1, table2.column2, table3.column3..
FROM table1
LEFT JOIN table2
ON table1.common_field = table2.common_field;
LEFT JOIN table3
ON table1.common_field = table3.common_field;


```

### Unions

```sql
-- union
-- used to combine the results of two or more SELECT statements without returning any duplicate rows
SELECT column1 [, column2 ]
FROM table1 [, table2 ]
WHERE condition

UNION

SELECT column1 [, column2 ]
FROM table1 , table2
WHERE condition

-- union all
-- used to combine the results of two SELECT statements including duplicate rows
SELECT column1 [, column2 ]
FROM table1 [, table2 ]
WHERE condition

UNION ALL

SELECT column1 [, column2 ]
FROM table1 [, table2 ]
WHERE condition

-- checking field for NULL or NOT NULL values
SELECT column1, column2, column3,
FROM table_name
WHERE column1 IS NULL | IS NOT NULL;

-- alias
-- creating aliases of tables makes syntax more cleaner and shorter
SELECT t1.column, t1.column2, t2.column, t2.column2...
FROM table1 AS t1
INNER JOIN table2 AS t2
ON t1.common_field = t2.common_field

-- you can also give aliases for column names on their respective tables
SELECT t1.column AS t1c, t1.column2 AS t1c2, t2.column AS t2c, t2.column2 AS t2c2...
FROM table1 AS t1
INNER JOIN table2 AS t2
ON t1.common_field = t2.common_field

```

### Building Complex Queries

```sql

-- subquery
-- subquerying is creating a nested queries
SELECT *
FROM (SELECT * FROM table2 WHERE column_id = 1) AS i -- here we select data from the result of another select statement
RIGHT JOIN table1 AS s
ON i.column_id = s.column_id;


-- creating table with foreign key constraints
CREATE TABLE rooms (
    id INT AUTO_INCREMENT,
    street VARCHAR(255),
    owner_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES users(id) -- this will be imposible to delete any user with associated data in a room table
);

-- updating table with date format 'Jan 10, 2024 11:19 am' into '2024-01-12 08:46:10'
-- updating only with date matching the regex expression
-- using REGEX
-- with string column
UPDATE form_history
SET review_date = DATE_FORMAT(STR_TO_DATE(review_date, '%Y-%m-%d %H:%i:%s'), '%b %d, %Y %h:%i %p')
WHERE review_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$';

-- Check for rows with NULL values or blank strings in sss_no column
SELECT *
FROM your_table_name
WHERE sss_no IS NULL OR sss_no = '';

-- Check for rows with duplicate sss_no values
SELECT *
FROM your_table_name
WHERE sss_no IN (
    SELECT sss_no
    FROM your_table_name
    GROUP BY sss_no
    HAVING COUNT(*) > 1
);

-- Check for birthdate values not in the expected format 'AUGUST 01, 1998'
SELECT *
FROM employee_table
WHERE NOT (
    SUBSTRING(birthdate, 1, INSTR(birthdate, ' ') - 1) IN ('JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER')
    AND SUBSTRING(birthdate, INSTR(birthdate, ' ') + 1, INSTR(birthdate, ',') - INSTR(birthdate, ' ') - 1) BETWEEN '01' AND '31'
    AND SUBSTRING(birthdate, -4) BETWEEN '1900' AND '9999'
);
```
