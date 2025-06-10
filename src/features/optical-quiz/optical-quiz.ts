import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizService } from '../../core/quiz.service';

@Component({
  selector: 'app-optical-quiz',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './optical-quiz.html',
  styleUrl: './optical-quiz.scss'
})
export class OpticalQuiz {
  // questions: any[] = [
  //   {
  //     "answer": "b",
  //     "options": {
  //       "a": "TypeScript",
  //       "b": "JavaScript",
  //       "c": "Java",
  //       "d": "Python"
  //     },
  //     "question": "Angular is primarily written in what language?",
  //     "selected": null
  //   },
  //   {
  //     "answer": "a",
  //     "options": {
  //       "a": "Component",
  //       "b": "Module",
  //       "c": "Service",
  //       "d": "Directive"
  //     },
  //     "question": "Which of the following is the fundamental building block of an Angular application's UI?",
  //     "selected": null
  //   },
  //   {
  //     "answer": "c",
  //     "options": {
  //       "a": "ngIf",
  //       "b": "ngFor",
  //       "c": "ngModel",
  //       "d": "ngSwitch"
  //     },
  //     "question": "Which directive is used for two-way data binding in Angular?",
  //     "selected": null
  //   },
  //   {
  //     "answer": "d",
  //     "options": {
  //       "a": "HttpClientModule",
  //       "b": "FormsModule",
  //       "c": "RouterModule",
  //       "d": "All of the above"
  //     },
  //     "question": "Which of the following modules need to be imported for making HTTP requests, working with forms, and enabling routing in Angular?",
  //     "selected": null
  //   },
  //   {
  //     "answer": "a",
  //     "options": {
  //       "a": "A container for a cohesive block of code dedicated to a specific application domain or workflow.",
  //       "b": "A reusable piece of code that can be injected into components.",
  //       "c": "A template that defines the view of a component.",
  //       "d": "A class that handles user events."
  //     },
  //     "question": "What is the primary purpose of an Angular module?",
  //     "selected": null
  //   },
  //   {
  //     "answer": "b",
  //     "options": {
  //       "a": "ng generate service",
  //       "b": "ng add @angular/pwa",
  //       "c": "ng build --prod",
  //       "d": "ng new my-app"
  //     },
  //     "question": "Which Angular CLI command is used to add Progressive Web App (PWA) support to an existing Angular project?",
  //     "selected": null
  //   },
  //   {
  //     "answer": "c",
  //     "options": {
  //       "a": "To define the structure of the data.",
  //       "b": "To handle HTTP requests.",
  //       "c": "To transform data before displaying it in the view.",
  //       "d": "To create custom HTML elements."
  //     },
  //     "question": "What is the main purpose of pipes in Angular?",
  //     "selected": null
  //   },
  //   {
  //     "answer": "d",
  //     "options": {
  //       "a": "Component inheritance",
  //       "b": "Dependency Injection",
  //       "c": "Change Detection",
  //       "d": "All of the above"
  //     },
  //     "question": "Which of the following are key features of the Angular framework?",
  //     "selected": null
  //   },
  //   {
  //     "answer": "a",
  //     "options": {
  //       "a": "A decorator that marks a class as an Angular component and provides metadata about the component.",
  //       "b": "A special type of module.",
  //       "c": "A built-in directive.",
  //       "d": "A way to define custom events."
  //     },
  //     "question": "What is @Component in Angular?",
  //     "selected": null
  //   },
  //   {
  //     "answer": "b",
  //     "options": {
  //       "a": "To style components with CSS.",
  //       "b": "To manage asynchronous data streams.",
  //       "c": "To define custom HTML elements.",
  //       "d": "To create reusable templates."
  //     },
  //     "question": "What is the primary use of RxJS in Angular?",
  //     "selected": null
  //   }
  // ];
  questions: any[] = []
  type: string[] = [
    'Angular',
    'JavaScript',
    'Biology',
    'Physics',
    'Chemistry',
    'Mathematics',
    'TypeScript',
    'HTML',
    'CSS',
    'Node.js',
    'React',
    'Geography',
    'History',
    'English',
    'Computer Science',
    'Economics',
    'General Knowledge',
    'Logical Reasoning',
    'Python',
    'Data Structures'
  ];
  selectedType: string = ''
  quizForm!: FormGroup;
  currentQuestionIndex = 0;
  isLoading: boolean = false
  constructor(
    private fb: FormBuilder,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizForm = this.fb.group({});
  }

  get totalQuestions(): number {
    return this.questions.length;
  }

  get attendedQuestions(): number {
    return this.questions.filter(q => q.selected !== null && q.selected !== undefined).length;
  }
  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  get optionKeys() {
    return Object.keys(this.currentQuestion.options);
  }

  getQuizData(type: string) {
    this.isLoading = true
    if (type) {
      this.quizService.loadQuizzes(type).subscribe({
        next: (data: any) => {
          console.log('Quiz Data:', data)
          this.questions = data.map((item: any) => {
            return {
              ...item,
              selected: null
            }
          })
          this.questions.forEach((q, index) => {
            this.quizForm.addControl(index.toString(), this.fb.control(null));
          });
          this.isLoading = false
        },
        error: (err: Error) => {
          this.isLoading = false
          console.error('Error fetching quizzes', err)
        }

      })
    }
  }

  selectOption(option: string) {
    const qIndex = this.currentQuestionIndex.toString();
    this.questions[this.currentQuestionIndex].selected = true
    this.quizForm.get(qIndex)?.setValue(option);

  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  submitQuiz() {
    console.log('User Answers:', this.quizForm.value);
  }


}
