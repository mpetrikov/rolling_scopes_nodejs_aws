CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table products (
	id uuid primary key default uuid_generate_v4(),
	title text not null,
	description text,
	price integer not null,
	image text
);

create table stocks(
	product_id uuid primary key not null,
	count integer not null,
	foreign key ("product_id") references "products" ("id")
);
