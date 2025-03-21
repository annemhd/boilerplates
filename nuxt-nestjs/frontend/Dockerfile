# Stage 1: Install dependencies
FROM node:18-alpine AS dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Stage 2: Build the application (for production)
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Run the application (for production)
FROM node:18-alpine AS production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY prisma ./prisma
RUN npx prisma generate #if you use prisma.
EXPOSE 3000
CMD [ "node", "dist/main.js" ]

# Stage 4: Development
FROM node:18-alpine AS development
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]