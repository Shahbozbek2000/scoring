# Use Node.js 20.11-alpine as the base image
FROM node:20.11-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN yarn build

# Use Nginx as the base image for serving the application
FROM nginx:1.25.3

# Copy the custom nginx configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output from the first stage to the Nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
