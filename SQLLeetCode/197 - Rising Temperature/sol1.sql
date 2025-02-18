select w1.id as Id
from Weather w1
where w1.temperature > (
    select w2.temperature
    from Weather w2
    where DATEDIFF(w1.recordDate , w2.recordDate ) = 1
)