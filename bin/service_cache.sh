#!/bin/bash

echo "Turn service cache ON $1"
sed -i "" "s/const doCache = false;/const doCache = true;/" $1