FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

COPY backend/ backend/
COPY frontend/ frontend/

WORKDIR /app/frontend
RUN npm ci && npm run build

WORKDIR /app/backend
RUN dotnet publish -c Release -o /app/publish && \
    mkdir -p /app/publish/wwwroot && \
    cp -r /app/frontend/dist/* /app/publish/wwwroot/

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish ./
CMD dotnet game-store.dll --urls http://0.0.0.0:${PORT:-8080}
