CREATE TABLE Users (
	id			SERIAL PRIMARY KEY,
    first_name	varchar(255),
    last_name	varchar(255),
    username	varchar(255),
    password	varchar(255),
    email		varchar(255) 
);