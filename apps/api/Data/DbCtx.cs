using Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public class DbCtx(DbContextOptions<DbCtx> options) : DbContext(options) {
  public DbSet<Course> Courses => Set<Course>();
  public DbSet<Module> Modules => Set<Module>();
  public DbSet<Lesson> Lessons => Set<Lesson>();
  public DbSet<Curriculum> Curricula => Set<Curriculum>();
  public DbSet<Asset> Assets => Set<Asset>();
  public DbSet<Step> Steps => Set<Step>();
}
