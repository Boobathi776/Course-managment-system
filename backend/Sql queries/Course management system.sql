create database CourseDb;
go;


use CourseDb;
go;

create table Roles(
Id int primary key not null identity(1,1),
RoleName varchar(100) not null,
);

insert into Roles(RoleName) values ('Admin'),('User');

go;


create table Users (
Id uniqueidentifier not null primary key default newsequentialid(),
Name varchar(200) not null,
Email varchar(150) not null unique,
DateOfBirth date not null default cast(getDate() as date),
Password varchar(100) not null,
RoleId int foreign key references Roles(Id) on delete cascade,
CreatedOn datetime not null default getdate(),
IsActive bit not null default 1
);

go;

create table Courses(
Id int primary key not null identity(1,1),
Name varchar(100) not null,
StartDate datetime not null default getdate(),
CourseDuration smallint not null check(CourseDuration>0 and CourseDuration<30),
MinimumAgeRequired smallint not null check (MinimumAgeRequired > 0 and MinimumAgeRequired<180),
CreatedOn datetime not null default getDate(),
);

go;

create table Enrollments(
UserId Uniqueidentifier not null foreign key references Users(Id) on delete cascade,
CourseId int not null foreign key references Courses(Id) on delete cascade,
EnrolledOn datetime not null default getdate(),
);

go;


select * from Users;
select * from Roles;
select * from Courses;
select * from Enrollments;



INSERT INTO Courses (Name, StartDate, CourseDuration, MinimumAgeRequired)
VALUES
('Full Stack Web Development', '2025-11-01', 6, 18),

('Data Science with Python', '2025-12-10', 8, 20),

('Cloud Computing Fundamentals', '2025-10-25', 4, 16),

('Advanced SQL and Database Design', '2025-11-15', 5, 18);


create table FileUploads(
Id int not null identity(1,1) primary key,
FileName varchar(100) not null,
FilePath varchar(100) not null,
FileSize int not null ,
ContentType varchar(100) not null
);


select * from FileUploads;

