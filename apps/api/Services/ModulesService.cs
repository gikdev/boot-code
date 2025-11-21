using Api.Data;
using Api.DTOs;
using Api.Entities;
using Api.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface IModulesService {
  Task<Module> CreateAsync(int courseId, Module module);
  Task<IEnumerable<Module>> GetAllAsync(int courseId);
  Task<Module> GetOneAsync(int id);
  Task UpdatePositionsAsync(IEnumerable<PositionDto> dto);
  Task UpdateAsync(int id, Module module);
  Task DeleteAsync(int id);
}

public class ModulesService(DbCtx db) : IModulesService {
  public async Task<Module> CreateAsync(int courseId, Module module) {
    db.Modules.Add(module);
    await db.SaveChangesAsync();
    return module;
  }

  public async Task<IEnumerable<Module>> GetAllAsync(int courseId)
    => await db.Modules.Where(m => m.CourseId == courseId).ToListAsync();

  public async Task<Module> GetOneAsync(int id)
    => await db.Modules
         .Include(m => m.Lessons)
         .SingleOrDefaultAsync(m => m.Id == id)
       ?? throw new NotFoundException("فصل");

  public async Task UpdateAsync(int id, Module module) {
    var countOfCourses = await db.Courses.Where(c => c.Id == module.CourseId).CountAsync();
    if (countOfCourses < 1) throw new NotFoundException("دوره");

    var existingModule = await db.Modules.SingleOrDefaultAsync(m => m.Id == id)
                         ?? throw new NotFoundException("فصل");

    existingModule.Title = module.Title;
    existingModule.Description = module.Description;
    existingModule.CourseId = module.CourseId;
    existingModule.Position = module.Position;

    await db.SaveChangesAsync();
  }

  public async Task DeleteAsync(int id) {
    var module = await db.Modules.SingleOrDefaultAsync(m => m.Id == id)
                 ?? throw new NotFoundException("فصل");

    db.Modules.Remove(module);

    await db.SaveChangesAsync();
  }

  public async Task UpdatePositionsAsync(IEnumerable<PositionDto> dtos) {
    // ReSharper disable once PossibleMultipleEnumeration
    var ids = dtos.Select(d => d.Id);
    var modules = await db.Modules.Where(m => ids.Contains(m.Id)).ToListAsync();

    foreach (var module in modules) {
      // ReSharper disable once PossibleMultipleEnumeration
      var newPosition = dtos.FirstOrDefault(d => d.Id == module.Id)?.Position
                        ?? throw new NotFoundException();

      module.Position = newPosition;
    }

    await db.SaveChangesAsync();
  }
}
