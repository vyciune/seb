import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() name = '';

  background: string = '';

  constructor() { }

  ngOnInit(): void {
    this.background = `rgb(${this.getRandom()}, ${this.getRandom()}, ${this.getRandom()}`
  }

  getRandom(): number {
    return Math.floor(Math.random() * 130) + 70;
  }

}
