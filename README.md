
## What will you learn?
* How to build relationships between data with prisma
* Querying relationships
* Creating data with relationships

## Relationships
## One to one relationship (1-1)
A user has one profile and a profile belongs to one user

## One to many relationship (1-m)
An order has one user, a user can have many orders

## Many to many relationship (m-m)
Docs: https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations

A product can have multiple categories and a category can belong to multiple products

- Explicit m-m
    - Manually create join table
    - More control
- Implicit m-m
    - Prisma defines join table
    - Less code

## One to many relationship that references itself
A category can have a parent category and a parent category can have multiple children