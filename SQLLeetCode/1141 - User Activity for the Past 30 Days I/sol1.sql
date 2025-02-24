# Write your MySQL query statement below
select activity_date as "day", count(*) as active_users 
from (
    select distinct user_id, activity_date
    from Activity 
) as aux
where activity_date > "2019-06-27" AND activity_date <= "2019-07-27"
group by activity_date