import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.book.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const users = await Promise.all([
    createUser({
      name: "Aman Varshney",
      email: "aman@mail.com",
      password: "password123",
    }),
    createUser({
      name: "Aditya Shankar",
      email: "aditya@mail.com",
      password: "password123",
    }),
    createUser({
      name: "Tarun Varshney",
      email: "tarun@mail.com",
      password: "password123",
    }),
    createUser({
      name: "Govind Singh",
      email: "govind@mail.com",
      password: "password123",
    }),
  ]);

  for (const user of users) {
    await createBooksForUser(user);
  }

  console.log("Seed data created successfully!");
}

async function createUser({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      accounts: {
        create: {
          id: Math.random().toString(36).substr(2, 9),
          accountId: Math.random().toString(36).substr(2, 9),
          providerId: "credentials",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    },
  });

  return user;
}

async function createBooksForUser(user) {
  const books = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description:
        "A story of decadence and excess, Gatsby explores the darker aspects of the American Dream.",
      isPublic: true,
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description:
        "A powerful story of racial injustice and the loss of innocence in the American South.",
      isPublic: true,
    },
    {
      title: "1984",
      author: "George Orwell",
      description:
        "A dystopian social science fiction that explores the dangers of totalitarian rule.",
      isPublic: false,
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      description:
        "A romantic novel of manners that satirizes the British landed gentry.",
      isPublic: true,
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      description:
        "A fantasy novel about the adventures of hobbit Bilbo Baggins.",
      isPublic: false,
    },
  ];

  const randomBooks = shuffleArray(books).slice(0, 3);

  for (const book of randomBooks) {
    await prisma.book.create({
      data: {
        id: Math.random().toString(36).substr(2, 9),
        ...book,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
