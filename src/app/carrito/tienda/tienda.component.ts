import { Component, EventEmitter, Output, } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCarrito } from 'src/app/interfaces/ItemCarrito';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'pmc-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  @Output() pagoRealizado = new EventEmitter<string>();

  listaItemCarrito: ItemCarrito[] | undefined;
  totalCarrito: number = 0;


  metodoPago: string = 'efectivo'; // Valor predeterminado

  realizarPago(): void {
    // Aquí puedes implementar la lógica según el método de pago seleccionado
    this.pagoRealizado.emit(this.metodoPago);
    this.toastr.success('¡Pago exitoso!', 'Confirmación de Pago');
    window.location.reload();
    this.downloadPDF();
    this.vaciarCarrito() 
  }

  constructor(private router: Router,
    private toastr: ToastrService) { 
     
    }

  ngOnInit(): void {
    let carritoStorage = localStorage.getItem('carrito') as string;
    let carrito = JSON.parse(carritoStorage);
    this.listaItemCarrito = carrito;
  }

  vaciarCarrito() {
    localStorage.removeItem('carrito');
    this.listaItemCarrito = [];
  }
  calcularSubtotal(item: any): number {
    return item.precio * item.cantidad;
  }

  calcularTotal(): number {
    this.totalCarrito = 0;
    if (this.listaItemCarrito) {
      this.listaItemCarrito.forEach(item => {
        this.totalCarrito += this.calcularSubtotal(item);
      });
    }
    return this.totalCarrito;
  }


  public downloadPDF(): void {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const margen = 10;

    
    doc.setLineWidth(0.1);
    doc.line(margen, margen, 210 - margen, margen); 
    doc.line(margen, 297 - margen, 210 - margen, 297 - margen);
    doc.line(margen, margen, margen, 297 - margen);
    doc.line(210 - margen, margen, 210 - margen, 297 - margen);

    
    if (this.listaItemCarrito && this.listaItemCarrito.length > 0) {
      let posY = margen;

      
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255); 
      doc.setFillColor(51, 122, 183); 
      doc.rect(margen, posY, 190, 10, 'F');
      doc.text('Ítem', margen + 5, posY + 5);
      doc.text('Precio', margen + 60, posY + 5);
      doc.text('Cantidad', margen + 110, posY + 5);
      doc.text('Subtotal', margen + 160, posY + 5);
      
      posY += 6; 
      doc.text(' ', margen + 5, posY); 
      
      posY += 4; 
      
      this.listaItemCarrito.forEach((item, index) => {
        const subtotal = this.calcularSubtotal(item);
        
       
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0); 
        doc.text(`${index + 1}. ${item.name}`, margen + 5, posY);
        doc.text(`${item.precio}`, margen + 60, posY);
        doc.text(`${item.cantidad}`, margen + 110, posY);
        doc.text(`${subtotal} $`, margen + 160, posY);
      
        posY += 10; 
      });


      posY += 10;
      doc.setFont('helvetica', 'bold');
      doc.text(`Total: ${this.totalCarrito} $`, margen + 5, posY);
    } else {
      doc.text('No hay elementos en el carrito.', margen, margen + 10);
    }

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Factura', margen, margen);
    doc.save('factura.pdf');
  }
}
