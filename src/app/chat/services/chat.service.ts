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
export class ChatService {
  constructor(private httpClient: HttpClient) { }

  /**
   * get Get all account execs
   *
   * @returns test
   */
  async getActiveChatSessions(): Promise<any> {

    const url = 'https://02fmrhxod5.execute-api.us-east-2.amazonaws.com/Prod/MyResource' ;
    try {
      const data = await
        this.httpClient.get<any>(url).toPromise();
      console.log('got activeChat sessions', data);
      return data;

    } catch (e) {
      console.log('error getting messages', e);
      return [];
    }


  }

}
