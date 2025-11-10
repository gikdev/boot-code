using Api.Data;
using Api.Entities;
using Api.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface ICurriculaService {
  Task<Curriculum> CreateAsync(Curriculum curriculum);
  Task<IEnumerable<Curriculum>> GetAllAsync();
  Task<Curriculum> GetOneAsync(int id);
  Task UpdateAsync(int id, Curriculum curriculum);
  Task DeleteAsync(int id);
}

public class CurriculaService(DbCtx db) : ICurriculaService {
  public async Task<Curriculum> CreateAsync(Curriculum curriculum) {
    db.Curricula.Add(curriculum);

    await db.SaveChangesAsync();

    return curriculum;
  }

  public async Task<IEnumerable<Curriculum>> GetAllAsync()
    => await db.Curricula.ToListAsync();

  public async Task<Curriculum> GetOneAsync(int id) {
    var curriculum = await db.Curricula.SingleOrDefaultAsync(c => c.Id == id)
                     ?? throw new NotFoundException("کوریکولوم");

    return curriculum;
  }

  public async Task UpdateAsync(int id, Curriculum curriculum) {
    var existingCurriculum = await db.Curricula.SingleOrDefaultAsync(c => c.Id == id)
                             ?? throw new NotFoundException("کوریکولوم");

    existingCurriculum.Title = curriculum.Title;
    existingCurriculum.Description = curriculum.Description;

    await db.SaveChangesAsync();
  }

  public async Task DeleteAsync(int id) {
    var curriculum = await db.Curricula.SingleOrDefaultAsync(c => c.Id == id)
                     ?? throw new NotFoundException("کوریکولوم");

    db.Remove(curriculum);

    await db.SaveChangesAsync();
  }
}
