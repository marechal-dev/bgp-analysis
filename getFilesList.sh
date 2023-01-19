#!/usr/bin/env bash

if [[ -z "$1" ]]; then
  echo 'Please pass a path of files to parse'
  exit 1
fi

filespath=$1

if [ -d "$filespath" ]; then
  for file in "$filespath"/*.bz2; do
    echo "$file" >>files.txt
  done
fi
