
---
title: tmux, nvim and colors
date: 2024-04-16 21:03:32
tags: [nvim, tmux, bash, linux, ubuntu]
description: "How to fix colors inside nvim while using tmux"
---

Recently, I installed Ubuntu on my old laptop. Since I use Neovim together with Tmux for my daily work, I wanted to duplicate my environment. So I copied both my configs to new system.

It looked like it worked! Both Neovim and Tmux had the correct color schemes, and all plugins were in place. However, only after I ran Neovim inside Tmux did I realize that something was off – the colorscheme was a mess!

After some time searching for solution I found this [thread](https://unix.stackexchange.com/a/734894) that suggested adding these lines to `~/.tmux.conf`:
```
set -g default-terminal xterm-256color
set-option -ga terminal-overrides ",xterm-256color:Tc"
```
But unfortunately, it didn't work. After some further investigation it turned out that my `$TERM` variable was not set.

Adding `export TERM=xterm-256color` to my `.zshrc` file fixed it.


