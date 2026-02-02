# Pokedex hecha por Antonio

Este es un proyecto desarrollado por Antonio Piedra para una prueba técnica para la empresa a2r.

Se trata de hacer una Pokedex haciendo uso de la api pública [PokeApi](https://pokeapi.co/). Se entiende que la idea es no hacer persistencia pero hacer uso de cachés para acelerar la aplicación.

Una demo de la aplicación estará disponible en [pokedex.antoniopiedra.es](https://pokedex.antoniopiedra.es).

## Prerrequisitos
 - [pnpm](https://pnpm.io/installation)
 - [playwright](https://playwright.dev/) (opcional si se quieren ejecutar los tests)

## Instalación

Para instalar este proyecto se deberá hacer:

```bash
git clone https://github.com/apfgijon/pokedex.git
cd pokedex
pnpm install
```
## Inicio de aplicación

Para iniciar la aplicación se deberá hacer:

```bash
pnpm dev
```

## Tests

Se realizaron unit tests sobre una única función y smoke tests básicos sobre la aplicación.
Para poder ejecutar los tests se deberá instalar [playwright](https://playwright.dev/).

Para ejecutar los tests se deberá tener la aplicación corriendo en el puerto 3000 de localhost y hacer:

```bash
pnpm test
```

Si se desea realizar solo los tests unitarios no será necesario ni playwright ni la aplicación corriendo y se podrá hacer:

```bash
pnpm test:unit
```

