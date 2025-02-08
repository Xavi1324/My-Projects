using DataBase.Entities.Genero;
using DataBase.Entities.Productora;
using DataBase.Entities.Serie;
using Microsoft.EntityFrameworkCore;

namespace DataBase.Contexts
{
    public class StreamingAppContextWeb : DbContext
    {
        public StreamingAppContextWeb(DbContextOptions<StreamingAppContextWeb> options) : base(options) { }
        public DbSet<Generos> Generos { get; set; }
        public DbSet<Productoras> Productoras { get; set; }
        public DbSet<Series> Series { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Tablas 
            modelBuilder.Entity<Series>().ToTable("Series");
            modelBuilder.Entity<Generos>().ToTable("Generos");
            modelBuilder.Entity<Productoras>().ToTable("Productoras");
            #endregion

            #region PK
            modelBuilder.Entity<Series>().HasKey(s => s.Id);
            modelBuilder.Entity<Generos>().HasKey(g => g.Id);
            modelBuilder.Entity<Productoras>().HasKey(p => p.Id);
            #endregion

            #region Relaciones
            modelBuilder.Entity<Series>()
                .HasOne(s => s.Productora)
                .WithMany(p => p.Series)
                .HasForeignKey(s => s.IdProductora)
                .OnDelete(DeleteBehavior.SetNull); // Si se elimina una productora, la serie no se borra

            modelBuilder.Entity<Series>()
                .HasOne(s => s.Genero)
                .WithMany(g => g.Series)
                .HasForeignKey(s => s.IdGenero)
                .OnDelete(DeleteBehavior.Restrict); // No eliminar género si hay series asociadas

            modelBuilder.Entity<Series>()
                .HasOne(s => s.GeneroSec)
                .WithMany()
                .HasForeignKey(s => s.IdGeneroSec)
                .OnDelete(DeleteBehavior.Restrict);
            #endregion

            #region Configurations

            #region Serie
            modelBuilder.Entity<Series>().Property(s => s.Titulo).HasMaxLength(150).IsRequired();
            modelBuilder.Entity<Series>().Property(s => s.PortadaUrl).IsRequired();
            modelBuilder.Entity<Series>().Property(s => s.VideoUrl).IsRequired();
            #endregion

            #region Productora
            modelBuilder.Entity<Productoras>().Property(p => p.NombreProductora).HasMaxLength(150).IsRequired();
            #endregion

            #region Genero
            modelBuilder.Entity<Generos>().Property(g => g.NombreGenero).HasMaxLength(150).IsRequired();
            #endregion

            #endregion

            base.OnModelCreating(modelBuilder);
        }
    }
}
