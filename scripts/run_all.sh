#!/bin/bash

# get all the .js files in this folder
# run all of them

PATH="$(pwd)"
echo $PATH
cd src
SCRIPTS=$(ls | grep .js)

for el in $SCRIPTS
do
  printf "Running $el file .. "
  $(node $el)
  printf " done 😊\n"
done

cd $PATH