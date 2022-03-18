# API Documentation
## Search API
#### Search by CIK Number
Route:

```js
/search
```

Request:

```js
/search?companies=##########&startDate=yyyy-mm-dd&endDate=yyyy-mm-dd
```

Query: cik number to be searched for. In case you need multiple searches (for example, from an arry), you have to call the api multiple times.

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
            "https://www.sec.gov/Archives/edgar/data/1459417/000104746918001109/a2234625z10-k.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918008566/a18-5877_110ka.htm"
        ],
        "10-q": [
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918065981/a18-19025_410q.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918049189/a18-14083_110q.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918030256/a18-8655_110q.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918008573/a18-5877_410qa.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918008571/a18-5877_310qa.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918008570/a18-5877_210qa.htm"
        ],
        "8-k": [
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918071972/a18-41232_18k.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918065972/a18-39512_18k.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918049171/a18-18170_18k.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918042583/a18-16143_18k.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918036724/a18-14580_18k.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918035996/a18-13827_48k.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918034799/a18-13950_18k.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918031712/a18-13240_18k.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918030244/a18-12689_18k.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918027744/a18-12366_18ka.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918012174/a18-1008_48k.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918010942/a18-6519_18k.htm",
            "https://www.sec.gov/Archives/edgar/data/1459417/000110465918003147/a18-3543_18k.htm"
        ]
    },
    "success": true
}
```