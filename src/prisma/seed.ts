import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const totalRootFolders = 10; // Banyak root folder
  const maxSubFolders = 10; // Banyak subfolder per folder
  const maxFiles = 10; // Banyak file per folder

  for (let i = 0; i < totalRootFolders; i++) {
    const rootFolder = await prisma.folder.create({
      data: {
        name: faker.word.noun(), // Nama folder random
        children: {
          create: Array.from({
            length: faker.number.int({ min: 1, max: maxSubFolders }),
          }).map(() => ({
            name: faker.word.noun(),
            files: {
              create: Array.from({
                length: faker.number.int({ min: 1, max: maxFiles }),
              }).map(() => ({
                name: faker.word.noun(),
                extension: faker.system.fileExt(),
              })),
            },
          })),
        },
        files: {
          create: Array.from({
            length: faker.number.int({ min: 1, max: maxFiles }),
          }).map(() => ({
            name: faker.word.noun(),
            extension: faker.system.fileExt(),
          })),
        },
      },
    });

    console.log(`Root Folder Created: ${rootFolder.name}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
