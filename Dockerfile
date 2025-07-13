FROM node
WORKDIR /app
COPY backend ./backend
CMD ["node","backend/app.js"]
EXPOSE 8080
