using Api.Data;
using Api.DTOs;
using Api.Entities;
using Api.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface ILessonsService {
  Task<Lesson> CreateAsync(Lesson lesson);
  Task<IEnumerable<Lesson>> GetAllAsync(int moduleId);
  Task<Lesson> GetOneAsync(int id);
  Task UpdateAsync(int id, Lesson lesson);
  Task UpdateContentAsync(int id, LessonContentDto dto);
  Task DeleteAsync(int id);
}

public class LessonsService(DbCtx db) : ILessonsService {
  public async Task<Lesson> CreateAsync(Lesson lesson) {
    db.Lessons.Add(lesson);
    await db.SaveChangesAsync();
    return lesson;
  }

  public async Task<IEnumerable<Lesson>> GetAllAsync(int moduleId)
    => await db.Lessons.Where(m => m.ModuleId == moduleId).ToListAsync();

  public async Task<Lesson> GetOneAsync(int id)
    => await db.Lessons
        .SingleOrDefaultAsync(l => l.Id == id)
        ?? throw new NotFoundException("درس");

  public async Task UpdateAsync(int id, Lesson lesson) {
    var countOfModules = await db.Lessons.Where(m => m.Id == lesson.ModuleId).CountAsync();
    if (countOfModules < 1) throw new NotFoundException("فصل");

    var existingLesson = await db.Lessons.SingleOrDefaultAsync(m => m.Id == id)
                 ?? throw new NotFoundException("درس");

    existingLesson.Title = lesson.Title;
    existingLesson.Description = lesson.Description;
    existingLesson.ModuleId = lesson.ModuleId;
    existingLesson.Position = lesson.Position;

    await db.SaveChangesAsync();
  }

  public async Task UpdateContentAsync(int id, LessonContentDto dto) {
    var existingLesson = await db.Lessons.SingleOrDefaultAsync(m => m.Id == id)
                 ?? throw new NotFoundException("درس");

    existingLesson.ContentJson = dto.ContentJson;

    await db.SaveChangesAsync();
  }

  public async Task DeleteAsync(int id) {
    var lesson = await db.Lessons.SingleOrDefaultAsync(m => m.Id == id)
                 ?? throw new NotFoundException("درس");

    db.Lessons.Remove(lesson);

    await db.SaveChangesAsync();
  }
}
