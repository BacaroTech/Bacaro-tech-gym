select p.firstName, p.lastName, a.city, a.state
from Person p left join Address a on p.personId = a.personId
order by p.firstname
