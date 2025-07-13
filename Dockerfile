FROM node
WORKDIR /kevin/backend
COPY . .
CMD ["node","app.js"]
EXPOSE 8080
