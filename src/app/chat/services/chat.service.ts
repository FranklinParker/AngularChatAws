import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ChatSession} from '../models/chatSession';
import {User} from '../../shared/models/user';

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
  url = 'https://npkkkpl1gi.execute-api.us-east-2.amazonaws.com/dev/serverlessrepo-chatSessio-microservicehttpendpoint-4V46OS50EN84'

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
                chatSessionActive: item['chatSessionActive'],
                messages: item['messages']
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

  public async takeChat(chatSession: ChatSession, user: User) {
    try {
      const response = await
        this.httpClient.put<any>(this.url,
          {
            id: chatSession.id,
            chatResponderName: user.name
          }).toPromise();
      return response;

    } catch (e) {
      console.log('error getting messages', e);
      return [];
    }


  }



  public async requestChat(name: string, uid: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const options =  {
      headers: headers
    };
    try {
      const response = await
        this.httpClient.post<any>(this.url,
          {
            chatInitiatorName: name,
            id: uid
          }, options).toPromise();
      return response;

    } catch (e) {
      console.log('error getting messages', e);
      return [];
    }


  }
}
