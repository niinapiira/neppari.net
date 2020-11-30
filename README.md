# neppari.net
Homepage for neppari.net

## Local development

```
docker build -t neppari . && docker run -it --rm --volume="$PWD":/usr/src/app -p 4000:4000 -p 35729:35729 --name neppari-run neppari
```

Site will be accessible at http://localhost:4000

## Generating new `Gemfile.lock`

```
docker run --rm -v "$PWD":/usr/src/app -w /usr/src/app ruby:2.7 bundle install
```
