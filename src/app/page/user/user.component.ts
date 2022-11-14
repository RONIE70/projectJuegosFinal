// import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
// import { Router } from '@angular/router';
// import { Usuario } from 'src/app/models/usuario.model';
// import { EstadisticasService } from 'src/app/services/estadisticas.service';



// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css'],
// })
// export class UserComponent implements OnInit {
//   usuarios:Usuario[];
//   identificadorUsuario: string;
//   loading:boolean;
//   titulo:boolean;


//   constructor(private route: Router,
//     private estadisticaServicio:EstadisticasService) {

//    this.identificadorUsuario = localStorage.getItem('email');
//    this.loading = true;
//    this.titulo = false;

//    this.estadisticaServicio
//    .traerUsuario()
//    .subscribe((response: Usuario[]) => {

//      this.usuarios = response;

//      console.log(JSON.stringify(this.usuarios));

//     // alert(JSON.stringify(response));
//      this.loading = false;
//      this.titulo = true;
//    });
// }

// ngOnInit(): void {}

// }
