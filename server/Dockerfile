FROM node:20-alpine
WORKDIR /app

# Install only what package.json declares
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# If your app reads PORT, set a default
ENV PORT=5000
EXPOSE 5000

# Start your API
# Use one of:
CMD ["node", "app.js"]
# or:
# CMD ["npm", "start"]
