import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ChatSession} from '../models/chatSession';

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
      const chatSessions: ChatSession[] = await
        this.httpClient.get<any>(url).pipe(
          map(result => {
            const chatSess: ChatSession[] = [];
          console.log('result', result);
          result['Items'].forEach(item => {
            chatSess.push({
              id: item['id'],
              chatResponderName: item['chatResponderName'],
              chatInitiatorName: item['chatInitiatorName'],
              chatSessionActive: item['chatSessionActive']
            });
          });
          return chatSess;
        })).toPromise();
      console.log('got activeChat sessions', chatSessions);
      return chatSessions;

    } catch (e) {
      console.log('error getting messages', e);
      return [];
    }


  }

}
