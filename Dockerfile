FROM ruby:2.7

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

RUN mkdir -p /usr/src/gemfile
RUN mkdir -p /usr/src/gems
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Gemfile /usr/src/gemfile/
COPY Gemfile.lock /usr/src/gemfile/
RUN bundle config set path '/usr/src/gems'
RUN bundle install --gemfile /usr/src/gemfile/Gemfile

EXPOSE 4000
CMD [ "bundle", "exec", "jekyll", "serve", "--config", "_config.yml,_config_local.yml", "-H", "0.0.0.0", "-P", "4000", "--force_polling", "--livereload" ]