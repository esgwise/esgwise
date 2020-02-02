import { Component, ViewChild, ComponentRef, ComponentFactoryResolver, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CategoriesDirective } from '../directives/categories.directive';
import { Stack } from 'src/app/utility/stack';
import { CategoriesService } from '../../services/catgories/categories.service';
import { CategoryNode } from '../../models/categories';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'esg-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  @ViewChild(CategoriesDirective, { static: true }) categoriesHost: CategoriesDirective;

  private subs = new Subscription();

  private componentRef: ComponentRef<any>;
  private categoriesSelectionStack = new Stack<string>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private resolver: ComponentFactoryResolver,
    private categoriesService: CategoriesService
   ) {}

  ngOnInit(): void {
    const rootCategories = this.categoriesService.getRootCategories();
    this.categoriesSelectionStack.push(null);
    this.createCategoriesComponent(null, rootCategories);
  }


   ngOnDestroy(): void {
    if (this.subs && !this.subs.closed) {
      this.subs.unsubscribe();
    }

    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private createCategoriesComponent(parentCategoryName: string, currentCategories: CategoryNode[]): void {
    const componentFactory = this.resolver.resolveComponentFactory(CategoriesComponent);
    const viewContainerRef = this.categoriesHost.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.currentCategories = currentCategories;
    this.componentRef.instance.parentCategoryName = parentCategoryName;

    this.setupSubscriptions();
  }

  private setupSubscriptions(): void {
    this.subs.add(this.componentRef.instance.categorySelection.subscribe((categoryNode: CategoryNode) => {
      const currentCategories = this.categoriesService.getCategoriesByParent(categoryNode.name);
      if (currentCategories && currentCategories.length > 0) {
        this.categoriesSelectionStack.push(categoryNode.name);
        this.createCategoriesComponent(categoryNode.name, currentCategories);
      }
    }));

    this.subs.add(this.componentRef.instance.previousSelection.subscribe(() => {
      this.categoriesSelectionStack.pop();
      const currentCategories = this.categoriesService.getCategoriesByParent(this.categoriesSelectionStack.top());
      this.createCategoriesComponent(this.categoriesSelectionStack.top(), currentCategories);
    }));
  }

}
