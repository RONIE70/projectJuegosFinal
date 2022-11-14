import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuario: Usuario[];
  identificadorUsuario: string;
  loading: boolean;
  titulo: boolean;

  constructor(
    private route: Router,
    private estadisticaServicio: EstadisticasService
  ) {
    this.identificadorUsuario = localStorage.getItem('email');
    this.loading = true;
    this.titulo = false;

    this.estadisticaServicio
       .traerUsuarioPerfil(this.identificadorUsuario)
       .subscribe((response: Usuario[]) => {

          this.usuario= response;

        //console.log(JSON.stringify(this.usuario));

     //alert(JSON.stringify(response));
        this.loading = false;
        this.titulo = true;
        });
  }

  ngOnInit(): void {}
}
