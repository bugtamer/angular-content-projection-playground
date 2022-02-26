import { FormControl } from '@angular/forms';
import { UuidService } from './../../../services/uuid/uuid.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

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

}
