FROM node:16.19.0

RUN mkdir /frontend
WORKDIR /frontend

RUN npm install -g @angular/cli

COPY package.json package-lock.json ./

RUN npm ci
ARG frontend_port
# RUN port=$((frontend_port))
# RUN echo ${port}

COPY . .

CMD ["sh","-c","ng serve --host 0.0.0.0 --port ${frontend_port}"]
