FROM php:8.1-apache

ARG laravel_app_port


RUN sed -si 's/Listen 80/Listen '$laravel_app_port'/' /etc/apache2/ports.conf

COPY ./app_envs/laravel.apache.conf /etc/apache2/sites-enabled/000-default.conf
RUN sed -si 's/VirtualHost .:80/VirtualHost *:'$laravel_app_port'/' /etc/apache2/sites-enabled/000-default.conf

RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    libzip-dev \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libicu-dev \
    libxml2-dev \
    libpq-dev



# RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# RUN apt install php-mysql 

RUN docker-php-ext-install zip && docker-php-ext-enable zip
RUN docker-php-ext-install gd && docker-php-ext-enable gd
RUN docker-php-ext-configure intl && docker-php-ext-install intl && docker-php-ext-enable intl
RUN docker-php-ext-install soap && docker-php-ext-enable soap
RUN docker-php-ext-install pgsql pdo_pgsql && docker-php-ext-enable pgsql pdo_pgsql

# RUN docker-php-ext-install xmlrpc && docker-php-ext-enable xmlrpc
RUN docker-php-ext-install xml && docker-php-ext-enable xml

RUN docker-php-ext-install exif && docker-php-ext-enable exif
RUN docker-php-ext-install opcache


COPY ./php_conf/* /usr/local/etc/php/conf.d/
# COPY ./app_envs/laravel.env /var/www/html/.env

RUN pecl install xdebug \
    && apt update \
    && apt install libzip-dev -y \
    && docker-php-ext-enable xdebug \
    && a2enmod rewrite \
    && docker-php-ext-install zip \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-enable pdo_mysql \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY ./laravel_project /var/www/html
# COPY composer.lock composer.lock

# RUN groupadd -r user && useradd -r -g user user
# USER user
RUN chmod -R 777 /var/www/html
# RUN chmod -R 755 /var/www/html
# RUN chmod -R o+w /var/www/html/storage
RUN composer install --no-dev

RUN php artisan key:generate
# RUN php artisan migrate
# RUN php artisan optimize:clear

RUN a2enmod rewrite
# RUN a2ensite 000-default.conf
RUN service apache2 restart

# COPY ./moodle311 /var/www/html
WORKDIR /var/www/html
EXPOSE $laravel_app_port
# RUN php admin/cli/install.php

