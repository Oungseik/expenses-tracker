POST {{url}}/expenses
{
    "title": "Dinner",
    "amount": 3000,
    "currency":  "MMK",
    "category": "Home",
    "date": "2024-12-25T08:39:53.307Z"
}
HTTP 200
[Asserts]
jsonpath "$.status" == "success"


# ----------------------------------------
# Invalid amount 
# ----------------------------------------
POST {{url}}/expenses
{
    "title": "Dinner",
    "amount": "30_000",
    "currency":  "MMK",
    "category": "Home",
    "date": "2024-12-25T08:39:53.307Z"
}
HTTP 400
[Asserts]
jsonpath "$.issues[0].path[0]" == "amount"


# ----------------------------------------
# Invalid currency 
# ----------------------------------------
POST {{url}}/expenses
{
    "title": "Dinner",
    "amount": 3000,
    "currency":  "mmk",
    "category": "Home",
    "date": "2024-12-25T08:39:53.307Z"
}
HTTP 400
[Asserts]
jsonpath "$.issues[0].path[0]" == "currency"


# ----------------------------------------
# Invalid Category 
# ----------------------------------------
POST {{url}}/expenses
{
    "title": "Dinner",
    "amount": 3000,
    "currency":  "MMK",
    "category": "Homie",
    "date": "2024-12-25T08:39:53.307Z"
}
HTTP 400
[Asserts]
jsonpath "$.issues[0].path[0]" == "category"
