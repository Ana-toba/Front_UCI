import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

type LoginForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
// Define el componente de login y lo exporta
export class LoginComponent {

  // Formulario reactivo tipado
  form: FormGroup<LoginForm>;

  // Indica si el login está en proceso
  loading = false;

  // Mensaje de error a mostrar en UI
  errorMsg = '';

  // Señal reactiva para guardar una razón (ej: sesión expirada) detectChanges() ?reason=expired
  reason = signal<string | null>(null);

  // Controla si la contraseña se muestra o se oculta
  showPassword = false;

  // Constructor con inyección de dependencias
  constructor(
    // Builder para formularios
    private fb: FormBuilder,
    // Servicio de autenticación
    private auth: AuthService,
    // Navegación entre rutas
    private router: Router,
    // Acceso a parámetros de la URL
    private route: ActivatedRoute,
    // Control manual de detección de cambios
    private cdr: ChangeDetectorRef,
  ) {

    // Obtiene el parámetro "reason" desde la URL
    const r = this.route.snapshot.queryParamMap.get('reason');

    // Guarda el valor en la señal
    this.reason.set(r);

    // Crea el formulario
    this.form = this.fb.group({

      // Campo email (no permite null)
      email: this.fb.nonNullable.control('', [

        // Validación: obligatorio
        Validators.required,

        // Validación: formato email
        Validators.email,

        // Validación: dominio específico @ces.edu.co
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@ces\.edu\.co$/),
      ]),

      // Campo contraseña (no permite null)
      password: this.fb.nonNullable.control('', [

        // Validación: obligatorio
        Validators.required,

        // Validación: mínimo 4 caracteres
        Validators.minLength(4)
      ]),
    });
  }

  // Método para mostrar u ocultar la contraseña
  togglePassword() {

    // Cambia el estado actual
    this.showPassword = !this.showPassword;
  }

  // Getter para acceder fácilmente al control email
  get emailCtrl() {

    // Retorna el control email
    return this.form.controls.email;
  }

  // Getter para acceder fácilmente al control password
  get passwordCtrl() {

    // Retorna el control password
    return this.form.controls.password;
  }

  // Método principal para enviar el formulario (login)
  async submit() {

    // Limpia mensajes de error previos
    this.errorMsg = '';

    // Verifica si el formulario es inválido
    if (this.form.invalid) {

      // Marca todos los campos como tocados para mostrar errores
      this.form.markAllAsTouched();

      // Detiene la ejecución
      return;
    }

    // Obtiene los valores del formulario
    const { email, password } = this.form.getRawValue();

    // Activa estado de carga
    this.loading = true;

    try {

      // Llama al servicio de login (convierte Observable a Promise)
      await firstValueFrom(this.auth.login(email, password));

      // Desactiva loading
      this.loading = false;

      // Redirige al usuario al home
      this.router.navigateByUrl('/home');

    } catch (err: any) {

      // Muestra error en consola
      console.error('LOGIN ERROR =>', err);

      // Desactiva loading
      this.loading = false;

      // Construye el mensaje de error desde distintas fuentes posibles
      this.errorMsg =
        err?.error?.message ||
        err?.error?.errors?.message ||
        err?.message ||
        JSON.stringify(err?.error) ||
        'Error al iniciar sesión. Verifica tu correo institucional y contraseña.';

      // Fuerza actualización de la vista
      this.cdr.detectChanges();

    } finally {

      // Asegura que loading siempre se desactive
      this.loading = false;

      // Fuerza actualización de la vista
      this.cdr.detectChanges();
    }
  }
}