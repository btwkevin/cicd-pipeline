FROM node
WORKDIR /app
COPY . .
CMD ["node","backend/app.js"]
EXPOSE 8080
