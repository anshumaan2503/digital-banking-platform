FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

RUN ./mvnw -B dependency:go-offline

COPY src src

RUN ./mvnw -B clean package -DskipTests

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "target/digital-banking-0.0.1-SNAPSHOT.jar"]
