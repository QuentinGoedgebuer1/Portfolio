# Étape 1 : Construire l'application Angular
FROM node:18 AS build

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install -g

# Copier le reste de l'application
COPY . .

# Construire l'application Angular pour la production sans sourcemaps pour réduire la consommation mémoire
RUN npm run build -- --configuration=production --source-map=false

# Étape 2 : Servir l'application Angular avec Nginx
FROM nginx:alpine

# Supprimer la configuration par défaut si elle existe
RUN rm -f /etc/nginx/conf.d/default.conf

# Copier les fichiers de build Angular vers le dossier Nginx
COPY --from=build /app/dist/sakai-ng /usr/share/nginx/html

# Copier la configuration personnalisée de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 4200 comme demandé
EXPOSE 4200

# Démarrer Nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]
