import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Router, NavigationEnd} from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { CreativaLoginService } from 'src/app/services/creativaLogin.service';
import { user } from '@angular/fire/auth';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 usuario:Usuario;

  public contactForm: FormGroup;

  // tslint:disable-next-line: max-line-length
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  email='';
  nombre='';
  apellido='';
  password='';
  passwordRep='';
  fecha_nacido='';
  nacionalidad='';
  messageError='';
  errors='';

  constructor(private router:Router,
    private creaLogin: CreativaLoginService,private fb: FormBuilder,private authService:AuthService ) {
    this.usuario = new Usuario();

  }

  registro(){
  this.usuario.nombre=this.contactForm.get('nombre').value;
  this.usuario.email=this.contactForm.get('email').value;
  this.usuario.password=this.contactForm.get('password').value;
  this.usuario.fecha_nacido=this.contactForm.get('fecha_nacido').value;
  this.usuario.nacionalidad= this.contactForm.get('nacionalidad').value;
  this.usuario.apellido= this.contactForm.get('apellido').value;

    this.creaLogin.guardarDatosUsuario(this.usuario)
    .subscribe((response: Usuario[]) => {

      this.usuario= response[0];
      console.log(JSON.stringify(this.usuario));
  });
  }

  addUser(){
    this.authService.registerUser(this.email,this.password)
    .then((res)=>{
      console.log (res);
      this.router.navigate(['login']);
    }).catch(err => {
      console.log(err);

    });

  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({

      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
      'passwordRep': ['', Validators.required],
      'fecha_nacido': ['', Validators.required],
      'nacionalidad' : ['', Validators.required],
      'nombre': ['', Validators.required],
      'apellido' : ['', Validators.required]
    });
}

  //VerificaClave (){
   // this.UsuarioAuthService.registrarUsuario(this.contactForm.value);
  //}

  VerificaClave (){
    if(this.contactForm.valid){
      if(this.contactForm.get('password').value == this.contactForm.get('passwordRep').value)
      {
        this.usuario.nombre=this.contactForm.get('nombre').value;
        this.usuario.email=this.contactForm.get('email').value;
        this.usuario.password=this.contactForm.get('password').value;

        this.usuario.registrar();

        this.router.navigate(['login']);
      }
      else{
        alert("Las claves no son iguales, verificalas")
        this.router.navigate(['registro']);
      }
    }

  }

  onExit(){
    if (this.contactForm.valid){
      location.href = 'login';
    }
    if(this.contactForm.dirty){
      Swal.fire({
        title: 'Seguro que desea Salir?',
        text: "Estabas completando el registro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if(result.value){
          Swal.fire(
            'SALIDA ACEPTADA',
            'TE REDIRIGIMOS',
            'success',
        ).then(function () {
          location.href= 'bienvenido'
          // this.router.navigate(['login'])
        })
        }else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
              'Cancelado',
              'podes seguir completando el form',
              'error'
          )
        }
      })
      return false;
    }else{
      return true;
    }
  }

  private spacesValidator(control: AbstractControl): null
| object {
const nombre = <string>control.value;
const spaces = nombre.includes(' ');

return spaces
  ? { containsSpaces: true }
  : null;
}

}

