import {Injectable} from '@angular/core';
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
  url = 'https://02fmrhxod5.execute-api.us-east-2.amazonaws.com/Prod/MyResource';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * get Get all active chat sessions
   *
   * @returns test
   */
  public async getActiveChatSessions(): Promise<any> {

    try {
      const chatSessions: ChatSession[] = await
        this.httpClient.get<any>(this.url).pipe(
          map(result => {
            const chatSess: ChatSession[] = [];
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

  public async takeChat(chatSession: ChatSession) {
    try {
      const response = await
        this.httpClient.put<any>(this.url,
          {
            id: chatSession.id,
            chatResponderName: chatSession.chatResponderName
          }).toPromise();
      return response;

    } catch (e) {
      console.log('error getting messages', e);
      return [];
    }


  }

}
