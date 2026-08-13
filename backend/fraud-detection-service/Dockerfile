FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["FraudDetectionService.csproj", "./"]
RUN dotnet restore "FraudDetectionService.csproj"
COPY . .
RUN dotnet publish "FraudDetectionService.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "FraudDetectionService.dll"]
