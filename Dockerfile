# Stage 1: Build the TypeScript code
FROM node:22 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy source files and build
COPY tsconfig.json ./
COPY src ./src
RUN npx tsc

# Stage 2: Create the Lambda deployment image
FROM public.ecr.aws/lambda/nodejs:22

# Copy compiled code from build stage
COPY --from=build /app/dist ${LAMBDA_TASK_ROOT}

# Optional: If you use layers or want to include node_modules
COPY --from=build /app/node_modules ${LAMBDA_TASK_ROOT}/node_modules

# Set the handler function (file.handler)
CMD ["handler.handler"]
