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
  async getAllMessages(): Promise<any> {

    const url = 'https://x8ggdptith.execute-api.us-east-2.amazonaws.com/Prod/MyResource?TableName=CONTACT' ;
    try {
      const data = await
        this.httpClient.get<any>(url).toPromise();
      console.log('got messages', data);
      return data;

    } catch (e) {
      console.log('error getting messages', e);
      return [];
    }


  }

}
