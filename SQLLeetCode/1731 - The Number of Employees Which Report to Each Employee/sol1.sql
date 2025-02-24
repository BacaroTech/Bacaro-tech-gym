select e.employee_id, e.name, sub.reports_count, sub.average_age
from (
    select reports_to,
    count(reports_to) as reports_count,
    round(avg(age)) as average_age
    from Employees
    group by reports_to
    having count(reports_to)>=1
) as sub
left join
Employees as e
on sub.reports_to=e.employee_id
order by e.employee_id asc