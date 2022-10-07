# build step

FROM node:16.15 as build
WORKDIR /usr/src/hubla
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./prisma ./prisma
RUN yarn install
COPY . .
RUN yarn build

# run step

FROM node:16.15
WORKDIR /usr/src/hubla
COPY ./package*.json ./
COPY ./prisma ./prisma
COPY ./tsconfig*.json ./
RUN yarn add bcrypt
RUN yarn install --only=production --ignore-scripts
COPY --from=build /usr/src/hubla/dist ./dist
