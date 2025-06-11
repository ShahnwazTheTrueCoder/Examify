import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'examify-quiz-results-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    template: `
    <h2 mat-dialog-title class="text-indigo-600 text-xl font-semibold text-center">
        Your Quiz Results
    </h2>

    <div class="flex justify-between text-sm font-medium text-gray-800 px-2">
    <div class="text-green-600">✔ Correct: {{ totalCorrect }}</div>
    <div class="text-red-600">✘ Wrong: {{ totalWrong }}</div>
    </div>

    <mat-dialog-content class="space-y-4 max-h-[70vh] overflow-y-auto mt-2">
    <div *ngFor="let q of data.questions; let i = index" class="border-b pb-3">
        <div class="text-sm font-medium text-gray-800">
        {{ i + 1 }}. {{ q.question }}
        </div>
        <div class="text-sm mt-1">
        <span
            [ngClass]="{
            'text-green-600 font-semibold': q.selected === q.answer,
            'text-red-600 font-semibold': q.selected && q.selected !== q.answer
            }"
        >
            Your Answer: {{ q.options[q.selected] || 'Not Answered' }}
        </span>
        </div>
        <div class="text-sm text-gray-600">
        Correct Answer: {{ q.options[q.answer] }}
        </div>
    </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close color="primary">Close</button>
    </mat-dialog-actions>`,
    styleUrls: []

})
export class QuizResultsDialogComponent {
    totalCorrect = 0;
    totalWrong = 0;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.data.questions.forEach((q: any) => {
            if (q.selected === q.answer) {
                this.totalCorrect++;
            } else if (q.selected) {
                this.totalWrong++;
            }
        });
    }
}
