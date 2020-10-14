use prism_johnson;
select * from dealer;
select * from article;
delete from article where id > 0;
LOAD DATA INFILE '/Users/Babu/Documents/1-projects-docs/prism-johnson-docs/Prism-Mock-Data-Article-6-Multi-Lingual.csv' INTO TABLE article FIELDS TERMINATED BY ','  ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;