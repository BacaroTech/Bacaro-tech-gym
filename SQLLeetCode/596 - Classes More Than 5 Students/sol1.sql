select class
from (
  select c1.class, count(*) as countMember
  from Courses c1
  group by c1.class
) groupCourses 
where countMember >= 5