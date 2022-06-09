export interface Usuario {
  id:     number;
  rol:    Rol;
  nombre: string;
  correo: string;
  clave:  string;
  admin:  boolean;
}

export interface Rol {
  id:  number;
  rol: string;
}
