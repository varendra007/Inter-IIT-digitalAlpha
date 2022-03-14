/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
// import { getEnvironmentVariables } from '../environments/env';

interface DataType {
  '10-k': string[];
  '10-q': string[];
  '8-k': string[];
}

export class DataController {
  static computeUrl(acno: string, cik: string) {
    let ans = '';
    for (const ch of acno) {
      if (ch !== '-') {
        ans += ch;
      }
    }
    return `https://www.sec.gov/Archives/edgar/data/${Number(
      cik
    )}/${ans}/${acno}-index.htm`;
  }

  static async getAccessionNumber(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { cik } = req.query;
      const response = await axios(
        `https://data.sec.gov/submissions/CIK${cik}.json`
      );
      const data = response?.data;
      const acnos = data?.filings.recent.accessionNumber;
      const forms = data?.filings.recent.form;
      const results: DataType = {
        '10-k': [],
        '10-q': [],
        '8-k': []
      };
      acnos.forEach((acno: string, index: string) => {
        if (forms[index] === '10-K') {
          results['10-k'].push(DataController.computeUrl(acno, String(cik)));
        } else if (forms[index] === '10-Q') {
          results['10-q'].push(DataController.computeUrl(acno, String(cik)));
        } else if (forms[index] === '8-K') {
          results['8-k'].push(DataController.computeUrl(acno, String(cik)));
        }
      });
      return res.status(200).json({
        data: results,
        success: true
      });
    } catch (err) {
      next(err);
    }
  }
}
