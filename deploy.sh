
set -e

npm run generate

cd dist
git init 
git add -A
git commit -m 'deploy'

git push -f https://github.com/fandowg/fandow-shop-nuxt.git master:gh-pages

cd -