FROM node:22 AS frontend-build
WORKDIR /app
COPY frontend/ .
RUN npm ci && npm run build

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend-build
WORKDIR /app
COPY backend/ .
RUN dotnet restore && \
    dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=frontend-build /app/dist /app/wwwroot
COPY --from=backend-build /app/publish .
EXPOSE 8080
CMD dotnet game-store.dll
