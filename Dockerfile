FROM node:20.18.0

WORKDIR /front

COPY . .

ENV HOST=0.0.0.0
ENV PORT=3003

RUN npm install
RUN npm run build

RUN npm install -g serve

CMD ["serve", "-l", "3003", "-s", "build"]
