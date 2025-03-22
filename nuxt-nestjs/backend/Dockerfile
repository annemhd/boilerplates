# Stage 1: Install dependencies
FROM node:latest AS dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Stage 2: Build the application (for production)
FROM node:latest AS builder
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Run the application (for production)
FROM node:latest AS production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY prisma ./prisma
RUN npx prisma generate #if you use prisma.
EXPOSE 3001
CMD [ "node", "dist/main.js" ]

# Stage 4: Development
FROM node:latest AS development
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 3001
CMD [ "npm", "run", "start:dev" ]