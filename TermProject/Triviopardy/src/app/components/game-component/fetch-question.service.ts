import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchQuestionService {

  constructor(private http: HttpClient) { }

  getQuestion(numQuestions) : Observable<object> {
    return this.http.get(`https://opentdb.com/api.php?amount=${numQuestions}&type=multiple`)

    // return {"response_code":0,"results":[{"category":"Entertainment: Music","type":"multiple","difficulty":"hard","question":"Which band is the longest active band in the world with no breaks or line-up changes?","correct_answer":"U2","incorrect_answers":["Radiohead","Rush","Rolling Stones"]}]}
  }
}
