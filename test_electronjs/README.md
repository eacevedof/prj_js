# prj_electronjs

## [Guía de instalación](https://electronjs.org/docs/tutorial/installation)

1. [Indice](https://electronjs.org/docs/tutorial/)
2. [First App](https://electronjs.org/docs/tutorial/quick-start)

# comandos

1. `npm upgrade --global yarn`  este si actualiza yarn
2. `npm init`
3. `yarn add electron` -> crea un yarn.lock
```ssh
$ yarn add electron
yarn add v1.3.2
info No lockfile found.
[1/4] Resolving packages...
warning electron > electron-download > nugget > progress-stream > through2 > xtend > object-keys@0.4.0:
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 147 new dependencies.
```
4. `npx electron .`  -> OK!!

1. ~~`npm i`  i: acronimo de install~~
2. ~~`npm install electron` -> da error~~
3. ~~`curl -o- -L https://yarnpkg.com/install.sh | bas`   actualiza yarn, da error :S~~
<hr/>

# comandos con create-react-app

1. npm  i --global yarn
1. yarn global add create-react-app
2. create-react-app prj_electronjs
3. yarn add electron 
- He tomado como maestra la app creada con create_react-app y sobre esta he instalado elctron
```js
{
  "name": "prj_electron",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "electron": "^1.7.9",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-scripts": "1.0.17"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

#### solución

- Se rompia pq el nombre de la ruta a la cache (carpeta roaming) lleva espacios y partia la ruta con lo cual cuando se intentaba crear la carpeta temporal se rompia.
- He tenido que cambiar la ruta de la cache siguiendo [este manual](https://blog.jsinh.in/change-default-nodejs-npm-and-npm-cache-directory-on-windows/#.Wi6b1lXibZ4)
- El cambio de cache lo hice con: `npm config set cache C:\\xampp\\htdocs\\nodejs\\npm-cache --global `, con una sola barra `npm config set cache C:\xampp\htdocs\nodejs\npm-cache --global ` generaba la carpeta extraña
- Del manual el archivo .npmrc dentro de la carpeta del usuario no lo he tocado
- He reinstalado nuevamente con `npm install electron --save`
- Ejecuto `npx electron .` ya lanza la ventana, me crea una carpeta temporal  `xampphtdocsnodejsnpm-cache`, no se si es normal.

## Nuevas pruebas con React
- [John Alexis Guerra Gómez](https://www.youtube.com/watch?v=wRSzf8QqpvY)
- https://github.com/facebookincubator/create-react-app
- https://github.com/electron/electron-quick-start
- https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c

### indice
- [Pasando archivo main.js a react](https://youtu.be/wRSzf8QqpvY?t=631) 
- [en `electron-starter.js` configurando la ruta a index.html](https://youtu.be/wRSzf8QqpvY?t=689)
- configuro `package.json` con "electron": "electron ."
- [en `electron src/electron-starter.js` lanzando electron con electron-starter.js](https://youtu.be/wRSzf8QqpvY?t=744)
- se ejecuta en dos pasos: 
  1. Se lanza en una consola npm start
  2. Se lanza en otra consola nmp run electron 

- con react instalado (2018/01/07 17:50), la app se lanza de la siguiente manera:
  1. En una consola: `yarn start (ejecuta react-scripts start)`
  2. En otra consola: `yarn build (ejecuta react-scripts build)`
  3. `yarn electron-dev (ejecuta set ELECTRON_START_URL=http://localhost:3000 && electron .)`

```js
{
  "name": "prj_electron",
  "version": "0.1.0",
  "private": true,

  "dependencies": {
    "electron": "^1.7.9",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-scripts": "1.0.17"
  },

  "main":"src/electron-starter.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "electron": "electron ."
  }
}
```

# errores

- Al ejecutar `npm install electron` 

```
C:\<path>\prj_electronjs\node_modules\electron\install.js:48
  throw err
  ^

Error: read ECONNRESET
    at _errnoException (util.js:1024:11)
    at TLSWrap.onread (net.js:615:25)
npm WARN Error: EPERM: operation not permitted, rmdir 'C:\<path>\prj_electronjs\node_modules\@types'
npm WARN  { Error: EPERM: operation not permitted, rmdir 'C:\<path>\prj_electronjs\node_modules\@types'
npm WARN   stack: 'Error: EPERM: operation not permitted, rmdir \'C:\\<path>\\prj_electronjs\\node_modules\\@types\'',
npm WARN   errno: -4048,
npm WARN   code: 'EPERM',
npm WARN   syscall: 'rmdir',
npm WARN   path: 'C:\\<path>\\prj_electronjs\\node_modules\\@types' }
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! electron@1.7.9 postinstall: `node install.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the electron@1.7.9 postinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\<path>\AppData\Roaming\npm-cache\_logs\2017-12-11T13_19_10_105Z-debug.log
```

- `curl -o- -L https://yarnpkg.com/install.sh | bas`

```
bash: bas: command not found
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  5201    0  5201    0     0   5468      0 --:--:-- --:--:-- --:--:--  5468
curl: (23) Failed writing body (264 != 1369)
```

- `npx electron .` 
```
npm ERR! code ENOLOCAL
npm ERR! Could not install from "<miusuario>\AppData\Roaming\npm-cache\_npx\24220" as it does not contain a package.json file.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\<miusuario>\AppData\Roaming\npm-cache\_logs\2017-12-11T14_04_43_503Z-debug.log
Install for prefix@latest failed with code 1
C:\<path>\prj_electronjs\node_modules\electron\cli.js

-- despues de limpiar cache sigue el error
7 silly fetchPackageMetaData error for file:alexei\AppData\Roaming\npm-cache\_npx\17340 Could not install from "alexei\AppData\Roaming\npm-cache\_npx\17340" as it does not contain a package.json file.

```

```
$ npm i  --> esto es para instalar
npm WARN saveError ENOENT: no such file or directory, open 'C:\xampp\htdocs\prj_electronjs\borra\package.json'
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open 'C:\xampp\htdocs\prj_electronjs\borra\package.json'
npm WARN borra No description
npm WARN borra No repository field.
npm WARN borra No README data
npm WARN borra No license field.
```