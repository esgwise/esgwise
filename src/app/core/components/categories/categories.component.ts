import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CategoryNode } from '../../models/categories';


@Component({
  selector: 'esg-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @Input() parentCategoryName: string;
  @Input() currentCategories: CategoryNode[];
  @Output() previousSelection = new EventEmitter();
  @Output() categorySelection = new EventEmitter<CategoryNode>();
}
