import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCrudToastDirective]'
})
export class CrudToastDirectiveDirective implements OnInit{

  @Input() crudAction: string = '';

  constructor(private el: ElementRef,private renderer: Renderer2) {}

  ngOnInit(): void {
    this.showCrudToast();
  }

  private showCrudToast(): void {
    let message = '';

    switch (this.crudAction.toLowerCase()) {
      case 'create':
        message = 'Nouvel élément créé avec succès.';
        break;
      case 'update':
        message = 'Élément mis à jour avec succès.';
        break;
      case 'delete':
        message = 'Élément supprimé avec succès.';
        break;
        case 'Affecter':
        message = 'Élément affectee avec succès.';
        break;
      default:
             console.log('Bonjour')
        break;
    }

    this.displayToast(message);
  }

  private displayToast(message: string): void {
    // Creating a dynamic template with Tailwind CSS classes
    const toastElement = this.renderer.createElement('div');
    this.renderer.addClass(toastElement, 'toast-container');
    this.renderer.addClass(toastElement, 'top-0');
    this.renderer.addClass(toastElement, 'end-0');

    this.renderer.addClass(toastElement, 'bg-yellow-500');
    this.renderer.addClass(toastElement, 'text-white');
    this.renderer.addClass(toastElement, 'p-3');
    this.renderer.addClass(toastElement, 'rounded');

    const textNode = this.renderer.createText(message);
    this.renderer.appendChild(toastElement, textNode);

    // Appending the toast to the body
    this.renderer.appendChild(document.body, toastElement);

    // Automatically removing the toast after a delay (e.g., 3000 milliseconds)
    setTimeout(() => {
      this.renderer.removeChild(document.body, toastElement);
    }, 3000);
  }

}
