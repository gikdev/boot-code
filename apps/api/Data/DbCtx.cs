using Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data;

public class DbCtx(DbContextOptions<DbCtx> options) : DbContext(options) {
  public DbSet<Course> Courses => Set<Course>();
  public DbSet<Module> Modules => Set<Module>();
  public DbSet<Lesson> Lessons => Set<Lesson>();
  public DbSet<Curriculum> Curricula => Set<Curriculum>();
  public DbSet<Asset> Assets => Set<Asset>();
  public DbSet<Step> Steps => Set<Step>();

  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    base.OnModelCreating(modelBuilder);

    ConfigEntity(modelBuilder.Entity<Course>());
    ConfigEntity(modelBuilder.Entity<Module>());
    ConfigEntity(modelBuilder.Entity<Lesson>());
    ConfigEntity(modelBuilder.Entity<Step>());
  }

  private static void ConfigEntity(EntityTypeBuilder<Course> course) {
    // RELATION: Course <-M 1-> Thumbnail
    course
      .HasOne(c => c.Thumbnail)
      .WithMany()
      .HasForeignKey(c => c.ThumbnailId)
      .OnDelete(DeleteBehavior.Restrict);
  }

  private static void ConfigEntity(EntityTypeBuilder<Module> module) {
    // RELATION: Module <-M 1-> Course
    module
      .HasOne(m => m.Course)
      .WithMany(c => c.Modules)
      .HasForeignKey(m => m.CourseId)
      .OnDelete(DeleteBehavior.Restrict);
  }

  private static void ConfigEntity(EntityTypeBuilder<Lesson> lesson) {
    // RELATION: Lesson <-M 1-> Module
    lesson
      .HasOne(l => l.Module)
      .WithMany(m => m.Lessons)
      .HasForeignKey(l => l.ModuleId)
      .OnDelete(DeleteBehavior.Restrict);
  }

  private static void ConfigEntity(EntityTypeBuilder<Step> step) {
    // RELATION: Step <-M 1-> Lesson
    step
      .HasOne(l => l.Lesson)
      .WithMany(m => m.Steps)
      .HasForeignKey(l => l.LessonId)
      .OnDelete(DeleteBehavior.Restrict);

    // RELATION: Step <-M 1-> Lesson
    step
      .HasOne(l => l.Curriculum)
      .WithMany(c => c.Steps)
      .HasForeignKey(l => l.CurriculumId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}
