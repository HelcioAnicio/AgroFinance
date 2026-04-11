do $$
begin
  if not exists (
    select 1 from pg_type where typname = 'transaction_type'
  ) then
    create type public.transaction_type as enum ('income', 'expense');
  end if;
end
$$;

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  type public.transaction_type not null,
  category text not null,
  amount numeric(14, 2) not null check (amount >= 0),
  date date not null,
  description text,
  status boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists transactions_user_id_idx
  on public.transactions (user_id);

create index if not exists transactions_user_id_date_idx
  on public.transactions (user_id, date desc);

create index if not exists transactions_user_id_type_idx
  on public.transactions (user_id, type);

comment on table public.transactions is
  'Fluxo financeiro rural por usuario: entradas e saidas com foco no agronegocio.';

comment on column public.transactions.type is
  'income para entradas e expense para saidas.';

comment on column public.transactions.category is
  'Categorias especificas do agronegocio, como Racao, Vacinas, Venda de Gado e Combustivel.';

comment on column public.transactions.status is
  'true quando o lancamento foi pago/recebido e false quando ainda esta pendente.';
