import { Injectable } from '@angular/core';
import { CategoryNode } from '../../models/categories';

@Injectable()
export class CategoriesService {

  private categoriesData: CategoryNode[] = [
    {
      name: 'Night Dress',
      parent: 'Dress'
    },
    {
      name: 'Dress',
      parent: 'Women'
    },
    {
      name: 'Breach Wear',
      parent: 'Women'
    },
    {
      name: 'Bikini',
      parent: 'Breach Wear'
    },
    {
      name: 'Dark Dress',
      parent: 'Dress'
    },
    {
      name: 'Women',
      parent: null
    },
    {
      name: 'Men',
      parent: null
    },
    {
      name: 'Suit',
      parent: 'Men'
    }
  ];

  constructor() { }

  getRootCategories(): CategoryNode[] {
   return this.getCategoriesByParent(null);
  }

  getCategoriesByParent(parentName: string): CategoryNode[] {
    return this.categoriesData.filter((catNode: CategoryNode) => {
      return catNode.parent === parentName;
    });
  }
}
