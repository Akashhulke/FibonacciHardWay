import { Component } from '@angular/core';
import { FibService } from '../services/fib.service';

@Component({
    selector: 'app-fibonacci',
    templateUrl: './fibonacci.component.html',
    styleUrls: ['./fibonacci.component.css']
})
export class FibonacciComponent {
    seenIndices: number[] = [];
    values: { [key: string]: string } = {};
    index: number = 0;

    constructor(private fibService: FibService) { }

    ngOnInit(): void {
        this.fetchValues();
        this.fetchIndices();

        setInterval(() => {
            this.fetchValues();
        }, 3000);
    }

    fetchValues() {
        this.fibService.getCurrentValues().subscribe((data: any) => {
            this.values = data || {};
        });
    }

    fetchIndices() {
        this.fibService.getAllIndices().subscribe((data: any) => {
            this.seenIndices = data.map((item: any) => item.number);
        });
    }

    onSubmit() {
        this.fibService.submitIndex(this.index).subscribe(() => {
            this.index = 0;
            this.fetchValues();
            this.fetchIndices();
        });
    }

    get seenIndicesDisplay(): string {
        return this.seenIndices.join(', ');
    }

    get valuesDisplay(): string[] {
        return Object.keys(this.values).map(key => {
            return `Index ${key} -> ${this.values[key]}`;
        });
    }
}
