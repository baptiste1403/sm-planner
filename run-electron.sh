#!/bin/bash

ng build;
sed -i 's/<base href="\/">/<base href=".\/">/' ./dist/sm-planner/index.html
electron ./electron/main.js