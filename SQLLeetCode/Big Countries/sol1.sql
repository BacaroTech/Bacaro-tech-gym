# Write your MySQL query statement below
select w1.name, w1.population, w1.area
from World w1
where w1.area >= 3000000 or w1.population >= 25000000