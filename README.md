# Prueba técnica Frontend BP

Este proyecto fue realizado para una prueba técnica frontend con Angular para Banco Pichincha.

## Configuración previa:

Antes de ejecutar el proyecto debe configurar las variables de entorno para un correcto funcionamiento. Se encuentran en los archivos `src\environments\environment.development.ts` y `src\environments\environment.ts` dependiendo el ambiente (desarrollo o producción).
Un ejemplo de las variables de entorno para desarrollo son:
```TS
export const environment = {
  production: false,
  authorId: '500',
  apiUrl:
    'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros',
  defaultProductImageUrl: 'https://via.placeholder.com/150',
};

```

## Servidor de desarrollo:

Ejecutar `ng serve` para un servidor de deesarrollo. Navegar a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambia alguno de los archivos fuente.

## Compilar:

Ejecutar `ng build` para compilar el proyecto. El resultado estará disponible en el directorio `dist/`.

## Pruebas unitarias:

Ejecutar `ng test` para ejecutar las pruebas unitarias vía [Karma](https://karma-runner.github.io).

## Ayuda:

Para obtener más ayuda sobre Angular CLI, use `ng help` o consulte el [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
