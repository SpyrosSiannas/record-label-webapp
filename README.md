# record-label-webapp
A repository for the university project on web design

Steps for updating and viewing the repo
---
Initally, make sure you are in the develop branch

`git switch develop`

First, we have to get the updated files from the repository

`git fetch --all`

Afterwards, we can check the available branches by typing

`git switch `

followed by a double TAB so that it shows all available branches

Then, we select which branch we want to view and go there by filling the name

`git switch [branch-name]`

After this, we make sure we have pulled the changes to our local branch

`git pull origin [branch name]`

Now, we can open the directory in VSCode and setup the live server

`code .`

After we have made all the changes we want, we add them

`git add [filename]`

or if you want to add **everything**

`git add . `

Then commit the changes with a short description

`git commit -m [message]`

And finally, push the changes to github

`git push origin [branch-name]` 


Note
---
Try not to switch branches while making changes since that can lead to confusion. Make changes, commit, push and _then_ change branches.

If you want to copy a remote branch, do this

`git checkout -b [branch-name] origin/[branch-name]`
