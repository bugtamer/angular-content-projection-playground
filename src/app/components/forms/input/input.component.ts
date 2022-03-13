import { FormControl } from '@angular/forms';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { UuidService } from './../../../services/uuid/uuid.service';


const FOCUS_OPTIONS: FocusOptions = { preventScroll: true };


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit {

  @Input() type: 'text' | 'number' = 'text';
  @Input() name!: string;
  @Input() control!: FormControl;
  @Input() placeholder!: string;

  @Input() hideLabel: boolean = false;
  @Input() labelClasses!: NgClass;
  @Input() inputClasses!: NgClass;

  @Input() min!: number;
  @Input() max!: number;


  readonly uuid = this.uuidService.v4();


  constructor(private uuidService: UuidService) { }


  ngOnInit(): void {
  }


  get isResetHidden(): boolean {
    const value = this.control.value;
    return this.control.disabled || (value === undefined) || (value === null) || (value.length === 0);
  }


  reset(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.control.reset(null);
    this.inputRef.nativeElement.focus(FOCUS_OPTIONS);
  }


  // IMPLEMENTATION DETAILS


  @ViewChild('inputRef') private inputRef!: ElementRef;

}
