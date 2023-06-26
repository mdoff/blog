---
title: Clone git repo with submodules
date: 2023-06-26 11:09:19
tags: [git, bash]
---

I'm using [hugo-paper](https://github.com/nanxiaobei/hugo-paper/) as my blog theme. To avoid manually cloning theme files it's recommended to install it via [git submodule](https://www.atlassian.com/git/tutorials/git-submodule) by using this command:

```bash
git submodule add https://github.com/nanxiaobei/hugo-paper themes/paper
```

But if you will forget to pull submodule with your blog theme on freshly cloned repo, hugo will welcome us with this error message:

```log
WARN 2023/06/26 22:07:33 found no layout file for "HTML" for kind "home": You should create a template file which matches Hugo Layouts Lookup Rules for this combination.
```

Our submodule needs to be pulled as well, we can do that by using this command:
```bash
git submodule update --init --recursive
```

Nice! Now we pulled our submodules as well. But what if we want to update our theme?
```
git submodule update --remote
```

Now we only need to commit this change (since now our submodule points to latest commit)
