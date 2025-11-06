using Api.Extensions;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

builder.Services.AddControllers();
builder.Services.AddApiDocs(config);
builder.Services.AddCorsForDev();
// builder.Services.AddAppServices();
builder.Services.AddProblemDetails();
builder.Services.AddDatabases(config);

var app = builder.Build();

app.UseStatusCodePages();

// app.UseExceptionHandler();

app.UseHttpsRedirection();
app.UseDevCorsInDevEnv();

app.UseHostStaticFiles();

app.MapControllers();
app.MapApiDocs();

app.Run();
