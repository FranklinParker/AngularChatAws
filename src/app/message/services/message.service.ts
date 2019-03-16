import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

/**
 *
 * https://blog.panoply.io/dynamodb-vs-mongodb
 * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.Tutorial.html
 * https://github.com/simalexan/dynamodb-lambda-publisher-sns
 */

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private httpClient: HttpClient) { }

  /**
   * get Get all account execs
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
