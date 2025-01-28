# Étape 1 : Construire l'application Angular
FROM node:18 AS build

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build --prod

# Étape 2 : Servir l'application Angular avec Nginx
FROM nginx:alpine

# Copier les fichiers de construction de l'étape précédente
COPY --from=build /app/dist/sakai-ng /usr/share/nginx/html

# Copier le fichier de configuration Nginx personnalisé
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 4200 pour accéder à l'application
EXPOSE 4200

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]