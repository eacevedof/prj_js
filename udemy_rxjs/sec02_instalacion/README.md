## [7. Entorno e instalaciones: Git, Node y NPM 2 min](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13690888)

## [8. Repositorio y estructura del curso](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648798)
- [Repo del curso](https://github.com/kaikcreator/rxjs-school)
```js
/*
Make a bare Git repository. That is, instead of creating <directory> and placing 
the administrative files in <directory>/.git, make the <directory> itself the $GIT_DIR. 
This obviously implies the --no-checkout because there is nowhere to check out the
working tree. Also the branch heads at the remote are copied directly to corresponding 
local branch heads, without mapping them to refs/remotes/origin/. When this option is 
used, neither remote-tracking branches nor the related configuration variables are created.
*/
git clone --bare https://github.com/kaikcreator/rxjs-school course-rxjs/.git

//deleting the entry for bare
//If this is the case a number of commands that require a working directory will 
//be disabled, such as git-add[1] or git-merge[1].
git config --unset  core.bare

//Resets the index and working tree. Any changes to tracked files in the working 
//tree since <commit> are discarded.
git reset --hard
```
- En este punto ya tenemos el proyecto clonado. Procedemos a instalar las dependencias
```js
$ npm install
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: 
{"os":"win32","arch":"x64"})

added 513 packages from 380 contributors and audited 7702 packages in 11.691s
found 100 high severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details
```
- Aplicamos los parches que sugiere node
```js
$ npm audit fix
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.9 (node_modules\webpack-dev-server\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.9: wanted {"os":"darwin","arch":"any"} (current: 
{"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: 
{"os":"win32","arch":"x64"})
```
- Con los parches de seguridad aplicados. Lanzamos el proyecto
```js
$ npm start
```
- Ramas
```js
$ git branch
  dev/01-observable-create   
  dev/...
  dev/30-tic-tac-toe-reducers
  intro-to-rxjs
* master
  solutions/01-observable-create
  solutions/...
  solutions/30-tic-tac-toe-reducers
  tic-tac-toe
```
- Comparando diferencias
```js
//diferencias entre la rama actual y la solución seleccionada
git diff solutions/01-observable-create

//Ejemplo:
$ git checkout dev/01-observable-create
Switched to branch 'dev/01-observable-create'

$ git diff solutions/01-observable-create
diff --git a/src/create.js b/src/create.js
``` 
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```