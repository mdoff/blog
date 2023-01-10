---
title: Custom alises with Parcel and React
date: 2022-01-31 18:40:22
tags: [js, node, react, parcel, vscode]
description: "Making aliases work for parcel and Visual Studio Code"
aliases:
  - /2022/custom-aliases-with-parcel
---

Recently I migrated from [snowpack](https://www.snowpack.dev/) (which works great until it doesn't) to [Parcel JS](https://parceljs.org/), and so far I love the simplicity. All I needed to do was point Parcel to source html file and it just worked!

But I needed one more thing to became fully satisfied and happy: some aliases. There is [some documentation](https://en.parceljs.org/module_resolution.html) on this topic, but it didn't cover all my needs.

My case is pretty straightforward: I need one alias `@components` to point to directory with, well, components.

To make it work, we need it add `alias` section i `package.json` file:

```json
  "alias": {
    "@components/*": "./src/components/$1"
  }
```

And that would be it, unless we also want VS Code Intelisense to work. If that's the case, `jsconfig.json` file is needed:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "es6",
    "module": "commonjs",
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
    "paths": {
      "@components/*": ["./src/components/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

On my first try, I forgot about `"jsx": "react"` option and since I'm using `.jsx` files I wasted 20 minutes figuring out why alias resolving is still not working.

Demo project for this solution is [under this link](https://github.com/mdoff/parcel-react-alias-demo).
