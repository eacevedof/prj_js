# Instalando node en shared hosting 1and1.es
[Manual desplegado en shared hosting](http://vinyll.scopyleft.fr/installing-a-custom-version-of-node-on-a-shared-hosting/)

# notas
- Al ejecutar: `wget -qO- https://cdn.rawgit.com/creationix/nvm/master/install.sh | bash`

```
=> Downloading nvm from git to '/<sharedpath>/3/<userid>/htdocs/.nvm'
=> Cloning into '/<sharedpath>/3/<userid>/htdocs/.nvm'...
remote: Counting objects: 263, done.
remote: Compressing objects: 100% (228/228), done.
remote: Total 263 (delta 31), reused 108 (delta 25), pack-reused 0
Receiving objects: 100% (263/263), 116.03 KiB | 0 bytes/s, done.
Resolving deltas: 100% (31/31), done.
Checking connectivity... done.
Note: checking out 'b546436113084d6de584c57b259b947dd467a900'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b new_branch_name

=> Compressing and cleaning up git repository

=> Appending nvm source string to /<sharedpath>/3/<userid>/htdocs/.bashrc
=> Appending bash_completion source string to /<sharedpath>/3/<userid>/htdocs/.bashrc
=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

# errores

```
No ha funcionado :S
-bash: nvm: command not found
```