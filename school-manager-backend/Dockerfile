# Utilisez une image de base avec Java 8
FROM openjdk:8-jdk

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le fichier JAR de l'API REST dans le conteneur
COPY target/scool-manager-backend-0.0.1-SNAPSHOT.jar school-manager-backend.jar

# Exposez le port sur lequel l'API REST écoute
#EXPOSE 9090

# Démarrez l'API REST lorsque le conteneur démarre
CMD ["java", "-jar", "school-manager-backend.jar"]