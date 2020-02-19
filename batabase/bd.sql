create table IF NOT EXISTS students(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name varchar(40),
  birth_date DATE,
  address_town varchar(20),
  address_street varchar(20),
  address_house varchar(20),
  id_group INT
);

create table IF NOT EXISTS gruppa(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name varchar(20)
);

insert gruppa(name)
values ("Group 1"), ("Group 2"), ("Group 3"), ("Group 4"), ("Group 5")

insert students(name, birth_date, address_town, address_street, address_house)
values
("Student 1", "2001-01-01", "Town 1", "Street 1", "House 1"),
("Student 2", "2002-02-02", "Town 2", "Street 2", "House 2"),
("Student 3", "2003-03-03", "Town 3", "Street 3", "House 3"),
("Student 4", "2004-04-04", "Town 4", "Street 4", "House 4"),
("Student 5", "2005-05-05", "Town 5", "Street 5", "House 5")

