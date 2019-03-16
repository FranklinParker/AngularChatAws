import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private httpClient: HttpClient) { }

  /**
   * get contractor records and number of records
   *
   * @returns test
   */
  async getAccountExecs(): Promise<any> {

    const url = 'https://cc2w8knx6k.execute-api.us-east-2.amazonaws.com/Prod/MyResource' ;
    try {
      const data = await
        this.httpClient.get<any>(url).toPromise();
      console.log('got acct execs', data);
      return data;

    } catch (e) {
      console.log('error getting messages', e);
      return [];
    }


  }

}
