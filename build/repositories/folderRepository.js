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
exports.FolderRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FolderRepository {
    // Ambil semua folder
    static getAllFolders() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(r);
            return prisma.folder.findMany({
                where: { parentId: null },
                include: {
                    children: true, // Ambil sub-folder langsung
                    files: true,
                },
            });
        });
    }
    // Ambil sub-folder berdasarkan parentId
    static getSubfolders(folderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.folder.findUnique({
                where: { id: folderId },
                include: {
                    children: true, // Pastikan subfolder disertakan
                    files: true, // Pastikan file juga disertakan
                },
            });
        });
    }
    // Ambil folder dengan rekursi (nested tree)
    static getFolderTree() {
        return __awaiter(this, arguments, void 0, function* (parentId = null) {
            const folders = yield prisma.folder.findMany({
                where: { parentId },
            });
            return yield Promise.all(folders.map((folder) => __awaiter(this, void 0, void 0, function* () {
                return (Object.assign(Object.assign({}, folder), { children: yield FolderRepository.getFolderTree(folder.id) }));
            })));
        });
    }
    // **Insert Folder**
    static insertFolder(name_1) {
        return __awaiter(this, arguments, void 0, function* (name, parentId = null) {
            return yield prisma.folder.create({
                data: { name, parentId },
            });
        });
    }
    // **Update Folder (Rename atau ubah parent)**
    static updateFolder(id, name, parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.folder.update({
                where: { id },
                data: { name, parentId },
            });
        });
    }
    // **Delete Folder**
    static deleteFolder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.folder.delete({
                where: { id },
            });
        });
    }
    // **Insert File**
    static insertFile(name, extension, folderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.file.create({
                data: { name, extension, folderId },
            });
        });
    }
    // **Delete File**
    static deleteFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.file.delete({
                where: { id },
            });
        });
    }
}
exports.FolderRepository = FolderRepository;
