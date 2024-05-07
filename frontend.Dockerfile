# Stage 1: Compile and Build angular codebase
# Use official node image as the base image
FROM node:18.16.0 as build
# Set the working directory
# ARG frontend_port

WORKDIR /usr/local/app
# Add the source code to app
COPY ./frontend /usr/local/app/
# Install all the dependencies
RUN npm install
# Generate the build of the application
RUN npm run build
# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:latest

ARG frontend_port
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/frontend /usr/share/nginx/html



COPY ./app_envs/nginx.angular.conf /etc/nginx/conf.d/angular.conf
RUN sed -si 's/listen       8024/listen       '$frontend_port'/' /etc/nginx/conf.d/angular.conf
RUN sed -si 's/listen  [::]:8024/listen  [::]:'$frontend_port'/' /etc/nginx/conf.d/angular.conf


# Expose port 80
EXPOSE $frontend_port