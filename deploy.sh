#!/bin/bash

git add .
git commit -m "📦 Struct: Deploy"

git push origin
git push server

sleep 1
