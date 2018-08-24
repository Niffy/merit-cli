* merit-gift - is a fork of gift but with some added extra things
* merit-core - this carries out the operations
* merit-cli - a way for the user to use merit-core

# Dev notes

Adding new commands in merit_bin will need to be chmod'd to 755

# How to install 

Pull down merit-cli, merit-gift, merit-core repo's

In merit-core run 

```
npm link
```

Then in merit-cli run

```
npm link merit-core
```

in a clean brand new folder do the following

```
ln -s /PATH/TO/MERIT-CLI/merit_bin/merit merit
```

In the same folder create a deps.json which looks like things

```
[
  {
    "name": "testone",
    "path": "/Users/paulrobinson/workspace/test_repos/testone",
    "file": "package.json",
    "defaultRemote": "origin",
    "alias": ["testone"]
  },
  {
    "name": "testtwo",
    "path": "/Users/paulrobinson/workspace/test_repos/testtwo",
    "defaultRemote": "origin",
    "alias": ["testtwo"]
  },
  {
    "name": "testthree",
    "path": "/Users/paulrobinson/workspace/test_repos/testthree",
    "defaultRemote": "origin",
    "alias": ["testthree"]
  }
]
```

Then run
```
./merit init
```

* This will create a directory called .merit

* You can now run operations against all repos in the provided deps.json

* You can remove deps.json if you like

# Commands

## status 
This will fetch the current status of each repo, it will output a table which the following columns

```
 -f --fetch = Do a git fetch from default remote to help determine status
```

- name - Repo name
- branch - Current branch
- clean - Is the git staging area clean
- status - Current status compared to remote branch
  - Ahead by 1 - Means local branch is ahead by 1 commit
  - Diverged - Means local branch has changes which the remote does not have and the remote has changes which the local does not have
  - Behind by 1 - Means local branch is behind by 1 commits
  
## branch
  
Branch operations
```
-B --newbranch = Checkout a new branch
e.g ./merit branch mynewbranch -B 

-d --delete = Delete a branch 
e.g ./merit branch myoldbranch -d

--push = Push branch to remote
e.g ./merit branch mybranch --push

--pull = Pull branch updates from remote
e.g ./merit branch mybranch --pull

--tags = Push tags to remote
e.g ./merit branch mybranch --tags

--follow-tags = Push tags along with commits (this needs more testing)
e.g ./merit branch mybranch --push --follow-tags 

--remote = remote to user
e.g ./merit branch mybranch --push --remote otherremote
```

## add
Add files to staging area, currently only supports adding all
```
-a --all = Add all files to staging area
e.g ./merit add -a
```  

## commit 
Commit files, message should be in quotes (single or double)

```
./merit commit 'MESSAGE HERE'
```  

## tag 

Tag the current commit in all repos with the given Tag

```
./merit tag 1.2.3
./merit tag 'something'
```

## target
This will go and update the given dependency name in each repo to use either the provided branch or semver 
```
-p --package = Package dependency name to update
-b --branch = Set branch to use, if one is not set then it will be set to use the provided branch
-s --semver = semver version to use

e.g
./merit target -p lodash -s 1.2.x

Say a dependency 'test_one' is pointing to git+https://github.com/somerepo/test_one.git#foobar

./merit target -p -b master

becomes git+https://github.com/somerepo/test_one.git#master
```
