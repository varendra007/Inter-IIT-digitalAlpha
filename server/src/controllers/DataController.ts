/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';
// import { queryApi } from 'sec-api';
import { Request, Response, NextFunction } from 'express';

import { getEnvironmentVariables } from '../environments/env';

interface DataType {
  '10-k': string[];
  '10-q': string[];
  '8-k': string[];
}

export class DataController {
  // static computeUrl(acno: string, cik: string) {
  //   let ans = '';
  //   for (const ch of acno) {
  //     if (ch !== '-') {
  //       ans += ch;
  //     }
  //   }
  //   return `https://www.sec.gov/Archives/edgar/data/${Number(
  //     cik
  //   )}/${ans}/${acno}-index.htm`;
  // }

  // static async getAccessionNumber(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const { cik } = req.query;
  //     const response = await axios(
  //       `https://data.sec.gov/submissions/CIK${cik}.json`
  //     );
  //     const data = response?.data;
  //     const acnos = data?.filings.recent.accessionNumber;
  //     const forms = data?.filings.recent.form;
  //     const results: DataType = {
  //       '10-k': [],
  //       '10-q': [],
  //       '8-k': []
  //     };
  //     acnos.forEach((acno: string, index: string) => {
  //       if (forms[index] === '10-K') {
  //         results['10-k'].push(DataController.computeUrl(acno, String(cik)));
  //       } else if (forms[index] === '10-Q') {
  //         results['10-q'].push(DataController.computeUrl(acno, String(cik)));
  //       } else if (forms[index] === '8-K') {
  //         results['8-k'].push(DataController.computeUrl(acno, String(cik)));
  //       }
  //     });
  //     return res.status(200).json({
  //       data: results,
  //       success: true
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  static async getFilings(req: Request, res: Response, next: NextFunction) {
    try {
      const { companies, startDate, endDate } = req.query;
      console.log(companies, startDate, endDate);
      let start = false;
      let end = false;
      let query = '';
      if (companies) {
        for (const company of companies as string[]) {
          const index = (companies as string[]).indexOf(company);
          query += `cik:${company} `;
          if(index !== (companies as string[]).length - 1) {
            query += `OR `;
          }
        }
      }
      if (startDate) {
        start = true;
      }
      if (endDate) {
        end = true;
      }
     const date = new Date();
      query += `${start && ` AND filedAt:[${startDate}`}${(start && end) ? ` TO ${endDate}]` : ` TO ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}]`}`;
      console.log(query);
      const queryObj10k = {
        query: {
          query_string: {
            query: query+' AND formType:\"10-K\"'
          }
        },
        from: '0',
        sort: [{ filedAt: { order: 'desc' } }]
      };

      const queryObj10q = {
        query: {
          query_string: {
            query: query+' AND formType:\"10-Q\"'
          }
        },
        from: '0',
        sort: [{ filedAt: { order: 'desc' } }]
      };

      const queryObj8k = {
        query: {
          query_string: {
            query: query+' AND formType:\"8-K\"'
          }
        },
        from: '0',
        sort: [{ filedAt: { order: 'desc' } }]
      };

      const response10k = await axios({
        method: 'POST',
        url: `https://api.sec-api.io?token=${
          getEnvironmentVariables().api_key
        }`,
        data: queryObj10k
      });

      const response10q = await axios({
        method: 'POST',
        url: `https://api.sec-api.io?token=${
          getEnvironmentVariables().api_key
        }`,
        data: queryObj10q
      });

      const response8k = await axios({
        method: 'POST',
        url: `https://api.sec-api.io?token=${
          getEnvironmentVariables().api_key
        }`,
        data: queryObj8k
      });

      let ret: any[] = [];

      if(response10k.data) {
        const filings = response10k.data.filings;
        let required: any[] = [];
        for(const filing of filings) {
          required = [ ...required, filing.linkToFilingDetails ];
        }
        ret = [ ...ret, required ];
      }

      if(response10q.data) {
        const filings = response10q.data.filings;
        let required: any[] = [];
        for(const filing of filings) {
          required = [ ...required, filing.linkToFilingDetails ];
        }
        ret = [ ...ret, required ];
      }

      if(response8k.data) {
        const filings = response8k.data.filings;
        let required: any[] = [];
        for(const filing of filings) {
          required = [ ...required, filing.linkToFilingDetails ];
        }
        ret = [ ...ret, required ];
      }

      return res.status(200).json({
        data: ret,
        success: true
      });
    } catch (error) {
      next(error);
    }
  }
}
