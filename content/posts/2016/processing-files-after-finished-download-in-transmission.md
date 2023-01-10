---
title: Processing files after finished download in Transmission
date: 2016-10-23 13:06:46
tags: [torrent, linux, bash]
description: "Run a bash script after finished download in Transmission"
aliases:
  - /2016/10/23/processing-files-after-finished-download-in-transmission
---

Transmission provides a way to run a script, after downloading torrent is finished. But surprisingly you cannot simply get a list of downloaded files, you have to use a `transmission-remote` command to get it.
Script allow to perform any action on all downloaded files.

```bash
#!/bin/bash
MOVIE_FILES=`transmission-remote http://localhost:9000/transmission -t $TR_TORRENT_ID -if | tail -n +3 | cut -c 35-`
for FILE in $MOVIE_FILES;
do
  example_command "$TR_TORRENT_DIR/$FILE"
done
```
