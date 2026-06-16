-- ============================================================
-- ESQUEMA: Reacciones (corazones), comentarios y visitas
-- Sitio Aury & Mike
-- ============================================================

-- Tabla de reacciones (corazones) por foto
create table if not exists reacciones (
  id bigint generated always as identity primary key,
  foto_key text not null,
  nombre text not null,
  created_at timestamptz not null default now(),
  unique (foto_key, nombre)
);

-- Tabla de comentarios por foto
create table if not exists comentarios (
  id bigint generated always as identity primary key,
  foto_key text not null,
  nombre text not null,
  texto text not null,
  created_at timestamptz not null default now()
);

-- Tabla de registro de visitas al sitio
create table if not exists visitas (
  id bigint generated always as identity primary key,
  nombre text not null,
  created_at timestamptz not null default now()
);

-- Índices para consultas rápidas por foto
create index if not exists idx_reacciones_foto_key on reacciones(foto_key);
create index if not exists idx_comentarios_foto_key on comentarios(foto_key);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Permitimos lectura y escritura pública controlada,
-- ya que es un sitio cerrado solo para familia/pareja.
-- ============================================================
alter table reacciones enable row level security;
alter table comentarios enable row level security;
alter table visitas enable row level security;

-- Cualquiera con la clave pública (publishable key) puede leer y escribir
create policy "lectura publica reacciones" on reacciones for select using (true);
create policy "escritura publica reacciones" on reacciones for insert with check (true);
create policy "borrado publico reacciones" on reacciones for delete using (true);

create policy "lectura publica comentarios" on comentarios for select using (true);
create policy "escritura publica comentarios" on comentarios for insert with check (true);

create policy "lectura publica visitas" on visitas for select using (true);
create policy "escritura publica visitas" on visitas for insert with check (true);
