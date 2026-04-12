# neppari.net
Homepage for neppari.net

## Local development

```
docker build -t neppari . && docker rm -f neppari-run 2>/dev/null; docker run -it --rm --volume="$PWD":/usr/src/app -p 4000:4000 -p 35729:35729 --name neppari-run neppari
```

Site will be accessible at http://localhost:4000

## Generating new `Gemfile.lock`

```
docker run --rm -v "$PWD":/usr/src/app -w /usr/src/app ruby:3.3 bundle install
```
