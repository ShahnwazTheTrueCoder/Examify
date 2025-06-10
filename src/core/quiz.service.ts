import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
    constructor(private api: ApiService) {}

loadQuizzes(type : string) {
  return this.api.post('',type)
}

}