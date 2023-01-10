---
title: Blog redesign and move away from Gatsby
date: 2023-01-09 21:10:29
tags: [blog, js, html, hugo, gatsby]
---

After seeing [Get Blogging!](https://getblogging.org/) website I decided to take a dedust my own blog. So after changing node version to some ancient one (like 8.x!), installing dependencies and upgrading some packages, I decided it was time to move on from the current solution.

## ~~Current~~ stack

~~Current~~ Past solution was based on [gatsby-starter-blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog) template. I also created my own comment module inspired by [blog post written by Tania Rascia](https://www.taniarascia.com/add-comments-to-static-site/).

Hosting was provided by Netlify with automatic deployments from Github. One great thing was that all posts were written in markdown, so there was no weird database or other proprietary cms solution.

## New bright future with [Hugo](https://gohugo.io/)

TBH I just picked the top generator from [JAMSTACK list](https://jamstack.org/generators/), which was not JavaScript based. After a quick search, I settled for [Paper theme](https://github.com/nanxiaobei/hugo-paper).
Data migration was mainly painless, I copied markdown files to the right directories, and all was good to go!

I was really surprised how simple the transition was, now site generation is Blazingly™ Fast.

Overall I'm happy with end result and maybe will create more posts then one per year 🤡
