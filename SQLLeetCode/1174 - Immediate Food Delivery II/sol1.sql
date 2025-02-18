select round((sum(immediate)/sum(rowTable))*100, 2) as immediate_percentage 
from (
    select 
    sum(if(order_date=customer_pref_delivery_date, 1, 0)) as 'immediate',
    sum(if(order_date<>customer_pref_delivery_date, 1, 0)) as 'scheduled',
    count(*) as 'rowTable'
    from(
        select customer_id, min(order_date) as order_date, min(customer_pref_delivery_date) as customer_pref_delivery_date
        from Delivery 
        group by customer_id
    ) as aux
    group by customer_id
) as aux2


