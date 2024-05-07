For installation
############### General ######################
1. Copy .env.example to .env
2. Change the values in .env


############### Moodle Configuration ######################
1. Copy ./app_envs/config-example.php to ./moodle/config.php
2. Change the credential in ./moodle/config.php
3. Create folder ./moodledata
4. Chnage folder permission for ./moodledata to 777

############### Laravel Configuration ######################
    -> Initial install

1. Copy ./app_envs/laravel.example.env to ./laravel_project/.env
2. Change the credential in ./laravel_project/.env
3. Get inside the container: docker exec -it {container_id/container_name} /bin/bash
4. RUN composer install
4. RUN php artisan migrate

    -> Install package with composer

1. Get inside the container: docker exec -it {container_id/container_name} /bin/bash
2. Run composer require/install commands

############### Angular Configuration ######################
Here the angular app is built with node:18.16.0 first before serving via nginx server. So instructions regarding angular development is as follows.

1. Angular local development environment can be used.
2. node:18.16.0 should be used as node version in local.
3. environtment.ts file should be added to gitignore before push.
4. To check app build, run docker compose build --no-cache and see the angular container is being successfully served or not.
5. After running container,
6. Get inside the container: docker exec -it {container_id/container_name} /bin/bash
7. RUN npm install 


############### Finally ######################
1. Change entire project folder permission to 777 (sudo chmod -R 777 /path-to-project-folder)
2. RUN docker compose build
3. docker compose up -d