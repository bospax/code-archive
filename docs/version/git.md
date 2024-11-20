# Git / Github

1. First install the Git software in your pc
2. List of file to ignore by git
3. Create a file named: ".gitignore"
4. Sample code in .gitignore file:

`.vscode`
`.DS_Store`

### Basic Command lines

```bash
cd.. - up one directory
cd [foldername] - go to directory
ls - list files inside folder
mkdir - create directory (folder)
touch - create file
rm - remove file
rmdir - remove directory (folder)
cls - clear screen
netstat -aon - list all used ports
netstat -aon | findstr :80 - list all apps that uses specific port
```

### Initialization

```bash
<!-- initializing git -->

git config --global user.name [username] - define username
git config --global user.email [email] - define email
git init - initialize git
```

```bash
<!-- modifying, staging, committing -->

git status - show file status if modified, on stage, committed

git add [filename] - add a file to staging area (staging is simply selecting a file you want to commit)
git add . - add all files to staging area
git add folder/filename - add specific file and folder

git commit -m [commit name] - create a commit
git commit - create a commit in the message editor
git commit --amend - edit the most recent commit message

git log - show log with details
git log --oneline - show log in one line

```

### Checkout, Revert, Reset

```bash
<!-- use checkout commit to go back in a certain commit point -->

git checkout [commit id] - go back to a certain commit point

<!-- use revert commit to undo a certain commit point -->
<!-- after revert, type :wq to exit the revert editor -->

git revert [commit id] - undo a certain commit point

<!-- use reset commit to permanently delete commit points but preserve current code state -->

git reset [commit id] - remove all previous commit points

<!-- use hard reset to permanently delete commit points including the code state -->

git reset [commit id] --hard - remove all previous commit points including code state

```

### Branching

```bash
<!-- create branch if you want to isolate a new feature from the master branch -->

git branch [branch name] - create a branch
git branch -a - show all branches

<!-- * master, an asterisk indicate your current branch your working with -->
<!-- moving to a certain branch -->

git checkout [branch name] - go to a certain branch

<!-- deleting a branch -->
<!-- before deleting a branch, make sure you are on the master branch -->
<!-- lowercase "d" will only work on merged branch -->

git branch -d [branch name] - delete merged branch

<!-- use uppercase "D" to delete unmerged branch -->

git branch -D [branch name] - delete unmerged branch

<!-- use shorthand for creating a branch and checking out at the sametime -->

git checkout -b [branch name] - create and checkout branch

<!-- merging a certain branch to the master branch -->
<!-- first make sure your on the master branch before merging -->

git merge [branch name] - merge a branch

<!-- in dealing with conflict, just remove the comment and,
merged the branch on the master branch -->

git merge - merging the conflict branch

```

### Github Repository

```bash
<!-- uploading your local repository to remote (github) -->
<!-- first step is to authenticate github repo account to local -->
<!-- input the Personal Access Token when prompt -->
<!-- then create a remote repo -->
<!-- copy the url of the remote repo -->
<!-- creating an alias for remote repo link -->
<!-- 'origin' most used remote alias -->

<!-- authenticate github connection -->
<!-- set up github user credential -->

git remote set-url origin https://[username]@[repo link]

git credential reject - clear credentials for current repo

<!-- establising a connection from remote to local repository -->

git remote add origin [repo link] - creating alias for remote repo
git remote -v - show alias details
git remote get-url origin - show url of the remote repo
git remote rm origin - delete a connection to a remote repo

```

### Repo Management

```bash
<!-- fetching files from remote to local repo -->

git pull [alias] [branch name] - fetching from remote to local
git pull origin main

<!-- better way of fetching with rebase -->

git pull --rebase

<!-- undo action and pull if there is conflict -->

git rebase --abort
git pull

<!-- merge unrelated histories and resolve conflicts -->

git pull [alias] [branch name] --allow-unrelated-histories
git pull origin master --allow-unrelated-histories

<!-- push your local repo to remote -->

git push [repo link or alias] [branch name] - push local to remote repo
git push origin main/master
git push [alias] [branch name] - using the push with alias / nickname
git push --all origin - push all branch on remote repo
git push --set-upstream origin main - register repo for faster push no need to type 'origin main'
git push -u origin main - another way to setup upstream command

```

```bash
<!-- best practice:
- work on a new branch for new feature to avoid
messing up with the master branch
- always pull the master branch from remote repo before working on new feature
to stay updated from changes -->

---

```

### Collaboration on Github

```bash

1. Cloning

<!-- pulling from remote repo or someone's repo to local -->
<!-- clone the remote repo to your local directory -->

git clone [repo link] - cloning remote repo
git clone [repo link] [folder name] - cloning and indicate folder name

<!-- note: cloned repo already has an alias (origin) and connections -->

2. Creating issue

<!-- creating 'Issues' also useful to collaborate on other's github repo
then the owner of the repo can add people as a Collaborators in repo settings to grant them permissions
to work on the repository -->

<!-- after granting permission token or as collaborator you can register the connection link
with your github credential -->

git remote set-url origin https://[username]@[repo link]

<!-- you can push your new feature to others remote repo, then you have to create a pull request -->
<!-- on original repo account create a pull request -->

<!-- in creating Pull Requests you can also link an issue by tagging its Issue #Number -->

<!-- then you can delete the branch in remote repo if it
is already been merged (optional). -->

3. Forking

<!-- forking from different github repo -->
<!-- first you have to fork the repo from someone's account to your account,
then you can clone it to your local directory -->

<!-- create new pull request -->
<!-- on original repo account create a pull request -->
<!-- then the owner of the repo can now review and merge your changes -->
```

### Github Conventions

```bash
1. Commit Messages

 <!-- Structure Format: -->

<type>(<scope>): <subject>

<body>
<footer>

<!-- Type: -->

feat: A new feature
fix: A bug fix
docs: Documentation only changes
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
refactor: A code change that neither fixes a bug nor adds a feature
perf: A code change that improves performance
test: Adding missing or correcting existing tests
chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

<!-- Example: -->

feat(ui): add new button component

-   Added a button component with default styles
-   Updated button styles in the stylesheet

Closes #123

---

```

```bash

2. Branching Strategies

<!-- Branch Naming Conventions  -->

Feature branches: feature/<feature-name>
Bugfix branches: bugfix/<bug-name>
Hotfix branches: hotfix/<hotfix-name>
Release branches: release/<version-number>
Experimental branches: experiment/<experiment-name>

<!-- Example -->

feature/user-authentication
bugfix/fix-login-error
release/v1.0.0

---
```

```bash
3. Pull Requests (PRs)

<!-- Guidelines for Creating PRs -->

Descriptive title: Use a clear and concise title.
Detailed description: Explain what the PR does, why it's necessary, and any related issues.
Link issues: Reference any issues that the PR addresses (e.g., "Closes #123").
Assign reviewers: Select appropriate team members to review your PR.

<!-- Example PR Description -->

### Summary

This PR adds user authentication to the application.

### Changes

-   Implemented login and registration functionality.
-   Updated the UI for the authentication pages.

### Related Issues

-   Closes #456 (Add user authentication)

---
```

```bash
4. Repository Management

<!-- Directory Structure -->

Keep it organized: Organize files into directories like src, docs, tests, and build.
Use a README: Provide a clear README.md file to explain the project, its purpose, and how to contribute.
Add a license: Include a LICENSE file to specify the licensing of your project.

<!-- Example Directory Structure -->

/project-root
├── /src
├── /docs
├── /tests
├── README.md
├── LICENSE

---
```

```bash
5. Code Review

<!-- Guidelines -->

Conduct thorough reviews: Review code for logic, readability, and adherence to conventions.
Provide constructive feedback: Offer suggestions for improvements rather than just pointing out mistakes.
Request changes if necessary: Use GitHub's "Request Changes" option for significant issues.

---
```

```bash
6. Versioning
 <!-- Semantic Versioning -->

Format: MAJOR.MINOR.PATCH
MAJOR: Breaking changes
MINOR: New features, backward-compatible
PATCH: Backward-compatible bug fixes

---
```

```bash
7. Documentation

<!-- Documentation Conventions -->

Use Markdown: Write documentation using Markdown for readability.
Include examples: Provide usage examples in the documentation.
Maintain up-to-date documentation: Ensure that all documentation is kept current with the codebase.

---
```

```bash
8. Issues and Milestones

<!-- Issue Management -->

Use labels: Tag issues with appropriate labels (e.g., bug, feature, help wanted).
Set milestones: Group related issues into milestones for better tracking and planning.
```
