import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.scss']
})
export class AddPromoComponent implements OnInit {

  formGroupPromo:FormGroup;
  imagenPromo:string = "../../../assets/imagenes/photo-image.png";

  constructor(public dialogRef: MatDialogRef<AddPromoComponent>, private fb:FormBuilder) { }

  ngOnInit(): void {

    this.formGroupPromo = this.fb.group({
      nombreDeLaPromo:[''],
      imagen:['', Validators.required],
      descripcion:['', Validators.required],
      precioAnterior:['', Validators.required],
      precioActual:['', Validators.required],
      descuento:[{value:'', disabled:true}, Validators.required]
    });

  }

  onNoClick(){
    this.dialogRef.close();
  }

  //Manejador de Foto de Promo
  openInputPromoFoto($event){
    document.getElementById("fileInput-promoFoto").click();
  }

  showPreviewPromo(event){
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imagenPromo = reader.result as string;
     
        this.formGroupPromo.patchValue({
          imagen: file
        });
   
      };
   
    }
    
 }

public formatPrecioAnterior(){
  let nuevoValor = Number(this.formGroupPromo.get('precioAnterior').value).toLocaleString("es-PY");
  const precioAnterior = this.formGroupPromo.get('precioAnterior').value;
  const precioActual = this.parseLocaleNumber(this.formGroupPromo.get('precioActual').value,'es');
  console.log('Precio actual:', precioActual);
  if(precioActual>0){
    const descuento = this.calcular_descuento(precioAnterior, precioActual)
    this.formGroupPromo.patchValue({
      precioAnterior:nuevoValor,
      descuento: descuento
    })
  }
  this.formGroupPromo.patchValue({
    precioAnterior:nuevoValor
  })
}

private calcular_descuento(precioAnterior, precioActual):Number{
  const descuento = Math.round((precioAnterior-precioActual)/(precioAnterior)*100);
  return ( descuento);
}
public onChangePrecioActual(){
  let precioActualFormated = Number(this.formGroupPromo.get('precioActual').value).toLocaleString("es-PY");
  let precioActual = this.formGroupPromo.get('precioActual').value;
  let precioAnterior = this.parseLocaleNumber(this.formGroupPromo.get('precioAnterior').value,'es');
  const descuento = this.calcular_descuento(precioAnterior, precioActual)
  this.formGroupPromo.patchValue({
    precioActual:precioActualFormated,
    descuento: descuento
  })

}
private parseLocaleNumber(stringNumber, locale) {
  var thousandSeparator = Intl.NumberFormat(locale).format(11111).replace(/\p{Number}/gu, '');
  var decimalSeparator = Intl.NumberFormat(locale).format(1.1).replace(/\p{Number}/gu, '');

  return parseFloat(stringNumber
      .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
      .replace(new RegExp('\\' + decimalSeparator), '.')
  );
}

public submitPromo(){

 }
}
