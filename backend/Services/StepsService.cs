using Api.Data;
using Api.Entities;
using Api.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface IStepsService {
  Task<Step> CreateAsync(Step step);
  Task<IEnumerable<Step>> GetAllAsync(int curriculumId);
  Task UpdatePositionAsync(int id, int newPosition);
  Task DeleteAsync(int id);
}

public class StepsService(DbCtx db) : IStepsService {
  public async Task<Step> CreateAsync(Step step) {
    db.Steps.Add(step);
    await db.SaveChangesAsync();
    return step;
  }

  public async Task<IEnumerable<Step>> GetAllAsync(int curriculumId)
    => await db.Steps.Where(s => s.CurriculumId == curriculumId).ToListAsync();

  public async Task UpdatePositionAsync(int id, int newPosition) {
    var step = await db.Steps.SingleOrDefaultAsync(s => s.Id == id)
               ?? throw new NotFoundException("مرحله");

    step.Position = newPosition;

    await db.SaveChangesAsync();
  }

  public async Task DeleteAsync(int id) {
    var step = await db.Steps.SingleOrDefaultAsync(s => s.Id == id)
               ?? throw new NotFoundException("مرحله");

    db.Steps.Remove(step);

    await db.SaveChangesAsync();
  }
}
