FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .
RUN npm run build


FROM node:18

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
