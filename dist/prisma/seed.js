"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Seeding database...");
        const totalRootFolders = 10; // Banyak root folder
        const maxSubFolders = 10; // Banyak subfolder per folder
        const maxFiles = 10; // Banyak file per folder
        for (let i = 0; i < totalRootFolders; i++) {
            const rootFolder = yield prisma.folder.create({
                data: {
                    name: faker_1.faker.word.noun(), // Nama folder random
                    children: {
                        create: Array.from({
                            length: faker_1.faker.number.int({ min: 1, max: maxSubFolders }),
                        }).map(() => ({
                            name: faker_1.faker.word.noun(),
                            files: {
                                create: Array.from({
                                    length: faker_1.faker.number.int({ min: 1, max: maxFiles }),
                                }).map(() => ({
                                    name: faker_1.faker.word.noun(),
                                    extension: faker_1.faker.system.fileExt(),
                                })),
                            },
                        })),
                    },
                    files: {
                        create: Array.from({
                            length: faker_1.faker.number.int({ min: 1, max: maxFiles }),
                        }).map(() => ({
                            name: faker_1.faker.word.noun(),
                            extension: faker_1.faker.system.fileExt(),
                        })),
                    },
                },
            });
            console.log(`Root Folder Created: ${rootFolder.name}`);
        }
        console.log("Seeding complete!");
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
