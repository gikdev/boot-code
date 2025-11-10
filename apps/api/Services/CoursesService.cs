using Api.Contracts.Requests.V1;
using Api.Data;
using Api.Entities;
using Api.Exceptions;
using Api.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface ICoursesService {
  Task<Course> CreateAsync(CourseReq req);
  Task<IEnumerable<Course>> GetAllAsync();
  Task<Course> GetOneAsync(int id);
  Task UpdateAsync(int id, CourseReq req);
  Task DeleteAsync(int id);
}

public class CoursesService(
  DbCtx db,
  IAssetsService assetsService
) : ICoursesService {
  public async Task<Course> CreateAsync(CourseReq req) {
    var exists = await assetsService.ExistsAsync(req.ThumbnailId.ToString());
    if (!exists) throw new NotFoundException("فایل");

    var newCourse = req.ToEntity();
    db.Courses.Add(newCourse);
    await db.SaveChangesAsync();

    return newCourse;
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

  public async Task UpdateAsync(int id, CourseReq req) {
    var course = await db.Courses.SingleOrDefaultAsync(c => c.Id == id)
                 ?? throw new NotFoundException("دوره");

    var exists = await assetsService.ExistsAsync(req.ThumbnailId.ToString());
    if (!exists) throw new NotFoundException("فایل");

    course.Title = req.Title;
    course.Description = req.Description;
    course.ThumbnailId = req.ThumbnailId;

    await db.SaveChangesAsync();
  }

  public async Task DeleteAsync(int id) {
    var course = await db.Courses.SingleOrDefaultAsync(c => c.Id == id)
                     ?? throw new NotFoundException("دوره");

    db.Remove(course);

    await db.SaveChangesAsync();
  }
}
