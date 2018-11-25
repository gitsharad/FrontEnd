import { CartitemComponent } from "./cartitem/cartitem.component";

import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector
} from '@angular/core';


@Injectable()
export class CartitemloaderService {
public rootViewContainer 
  constructor(private factoryResolver: ComponentFactoryResolver) { }
  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  addDynamicComponent() {
    const factory = this.factoryResolver
                        .resolveComponentFactory(CartitemComponent)
    const component = factory
      .create(this.rootViewContainer.parentInjector)
    this.rootViewContainer.insert(component.hostView)
  }
}



 