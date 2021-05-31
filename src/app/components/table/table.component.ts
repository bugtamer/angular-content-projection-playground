import { Component, Input, TemplateRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { InjectorDirective } from 'src/app/directives/injector/injector.directive';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterContentInit {

  @Input() data: Array<Employee> = [];

  @ContentChildren(InjectorDirective) templateList!: QueryList<InjectorDirective>;

  captTemplateRef!: TemplateRef<any>;
  headTemplateRef!: TemplateRef<any>;
  bodyTemplateRef!: TemplateRef<any>;
  footTemplateRef!: TemplateRef<any>;

  ngAfterContentInit(): void {
    this.templateBinding();
  }

  private templateBinding(): void {
    this.templateList.forEach(template => {
      switch (template.name) {
        case 'caption': this.captTemplateRef = template.templateRef; break;
        case 'header':  this.headTemplateRef = template.templateRef; break;
        case 'body':    this.bodyTemplateRef = template.templateRef; break;
        case 'footer':  this.footTemplateRef = template.templateRef; break;
        default:
          throw new Error(`The template name '${template.name}' does not found.`);
      }
    });
  }

}
