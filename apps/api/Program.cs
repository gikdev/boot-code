using Api.Extensions;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

builder.Services.AddControllers();
builder.Services.AddApiDocs(config);
builder.Services.AddCorsForDev();
builder.Services.AddAppServices();
builder.Services.AddGlobalExceptionHandler();
builder.Services.AddDatabases(config);

var app = builder.Build();

app.UseStatusCodePages();

app.UseGlobalExceptionHandler();

app.UseHttpsRedirection();
app.UseDevCorsInDevEnv();

app.UseHostStaticFiles();

app.MapControllers();
app.MapApiDocs();

app.Run();
