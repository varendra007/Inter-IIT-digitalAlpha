# API Documentation
## Search API
#### Search by CIK Number
Route:

```js
/search
```

Request:

```js
/search?cik=##########
```

Query: cik number to be searched for

Response:

```js
{
    data: {
        '10-k': [
            // Array containing urls of pages from where 10-k files can be accessed
        ],
        '10-q': [
            // Array containing urls of pages from where 10-k files can be accessed
        ],
        '8-k': [
            // Array containing urls of pages from where 10-k files can be accessed
        ],
        success: boolean
    }
}
```

Example:

```js
Request: 'http://localhost:5000/search?cik=0001556753'

Response: {
    "data": {
        "10-k": [
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724013000348/0001557240-13-000348-index.htm"
        ],
        "10-q": [
            "https://www.sec.gov/Archives/edgar/data/1556753/000149315221011278/0001493152-21-011278-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000353/0001557240-14-000353-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000156/0001557240-14-000156-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724013000439/0001557240-13-000439-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724013000160/0001557240-13-000160-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724013000035/0001557240-13-000035-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724012000060/0001557240-12-000060-index.htm"
        ],
        "8-k": [
            "https://www.sec.gov/Archives/edgar/data/1556753/000149315221015502/0001493152-21-015502-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000149315221014744/0001493152-21-014744-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000149315221011779/0001493152-21-011779-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000149315221005286/0001493152-21-005286-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000564/0001557240-14-000564-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000420/0001557240-14-000420-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000190/0001557240-14-000190-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000189/0001557240-14-000189-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000181/0001557240-14-000181-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000176/0001557240-14-000176-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000162/0001557240-14-000162-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000141/0001557240-14-000141-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000099/0001557240-14-000099-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000063/0001557240-14-000063-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000051/0001557240-14-000051-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724014000022/0001557240-14-000022-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724013000354/0001557240-13-000354-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724013000351/0001557240-13-000351-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724013000344/0001557240-13-000344-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724013000288/0001557240-13-000288-index.htm",
            "https://www.sec.gov/Archives/edgar/data/1556753/000155724013000002/0001557240-13-000002-index.htm"
        ]
    },
    "success": true
}
```