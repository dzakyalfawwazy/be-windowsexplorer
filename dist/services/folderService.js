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
exports.FolderService = void 0;
const folderRepository_1 = require("../repositories/folderRepository");
class FolderService {
    static getAllFolders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield folderRepository_1.FolderRepository.getAllFolders();
        });
    }
    static getSubfolders(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield folderRepository_1.FolderRepository.getSubfolders(parentId);
        });
    }
    static getFolderTree() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield folderRepository_1.FolderRepository.getFolderTree();
        });
    }
    // **Insert Folder**
    static createFolder(name_1) {
        return __awaiter(this, arguments, void 0, function* (name, parentId = null) {
            return yield folderRepository_1.FolderRepository.insertFolder(name, parentId);
        });
    }
    // **Update Folder (Rename atau ubah parent)**
    static updateFolder(id, name, parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield folderRepository_1.FolderRepository.updateFolder(id, name, parentId);
        });
    }
    // **Delete Folder**
    static deleteFolder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield folderRepository_1.FolderRepository.deleteFolder(id);
        });
    }
    // **Insert Folder**
    static createFile(name, extension, folderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield folderRepository_1.FolderRepository.insertFile(name, extension, folderId);
        });
    }
    // **Delete File**
    static deleteFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield folderRepository_1.FolderRepository.deleteFile(id);
        });
    }
}
exports.FolderService = FolderService;
