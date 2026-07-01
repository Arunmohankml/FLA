import pg from "pg";
const { Client } = pg;

const sql = `
create table if not exists demo_bookings (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null,
  preferred_date text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists careers (
  id text primary key,
  title text not null,
  description text not null,
  location text not null,
  work_mode text not null,
  employment_type text not null,
  code text not null,
  accent text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists career_applications (
  id text primary key,
  career_id text,
  job_title text not null,
  job_code text not null,
  name text not null,
  email text not null,
  phone text not null,
  experience text,
  message text,
  resume_url text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
`;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  await client.query(sql);
  console.log("Tables created successfully");
  await client.end();
}

main().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
