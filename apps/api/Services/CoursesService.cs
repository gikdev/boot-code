using Api.Data;
using Api.Entities;
using Api.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface ICoursesService {
  Task<Course> CreateAsync(Course course);
  Task<IEnumerable<Course>> GetAllAsync();
  Task<Course> GetOneAsync(int id);
  Task UpdateAsync(int id, Course course);
  Task DeleteAsync(int id);
}

public class CoursesService(
  DbCtx db,
  IAssetsService assetsService
) : ICoursesService {
  public async Task<Course> CreateAsync(Course course) {
    var exists = await assetsService.ExistsAsync(course.ThumbnailId.ToString());
    if (!exists) throw new NotFoundException("فایل");

    db.Courses.Add(course);
    await db.SaveChangesAsync();

    return course;
  }

  public async Task<IEnumerable<Course>> GetAllAsync()
    => await db.Courses.Include(c => c.Thumbnail).ToListAsync();

  public async Task<Course> GetOneAsync(int id) {
    var course = await db.Courses
      .Include(c => c.Thumbnail)
      .SingleOrDefaultAsync(c => c.Id == id)
      ?? throw new NotFoundException("دوره");

    return course;
  }

  public async Task UpdateAsync(int id, Course course) {
    var existingCourse = await db.Courses.SingleOrDefaultAsync(c => c.Id == id)
                 ?? throw new NotFoundException("دوره");

    var exists = await assetsService.ExistsAsync(course.ThumbnailId.ToString());
    if (!exists) throw new NotFoundException("فایل");

    existingCourse.Title = course.Title;
    existingCourse.Description = course.Description;
    existingCourse.ThumbnailId = course.ThumbnailId;

    await db.SaveChangesAsync();
  }

  public async Task DeleteAsync(int id) {
    var course = await db.Courses.SingleOrDefaultAsync(c => c.Id == id)
                     ?? throw new NotFoundException("دوره");

    db.Remove(course);

    await db.SaveChangesAsync();
  }
}
