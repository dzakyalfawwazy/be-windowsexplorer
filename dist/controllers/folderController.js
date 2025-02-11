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
exports.FolderController = void 0;
const folderService_1 = require("../services/folderService");
class FolderController {
    static getAllFolders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const folders = yield folderService_1.FolderService.getAllFolders();
                res.json(folders);
            }
            catch (error) {
                res.status(500).json({ message: "Gagal mengambil semua folder" });
            }
        });
    }
    static getSubfolders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { parentId } = req.params;
                const subfolders = yield folderService_1.FolderService.getSubfolders(Number(parentId));
                res.json(subfolders);
            }
            catch (error) {
                res.status(500).json({ message: "Gagal mengambil subfolder" });
            }
        });
    }
    static getFolderTree(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tree = yield folderService_1.FolderService.getFolderTree();
                res.json(tree);
            }
            catch (error) {
                res.status(500).json({ message: "Gagal mengambil struktur folder" });
            }
        });
    }
    // **Insert Folder**
    static createFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // res.json({ message: "Data yang dikirim", data: req.body });
                const { name, parentId } = req.body;
                const folder = yield folderService_1.FolderService.createFolder(name, parentId || null);
                res.status(201).json(folder);
            }
            catch (error) {
                res.status(500).json({ message: "Gagal membuat folder" });
            }
        });
    }
    // **Update Folder (Rename atau Ubah Parent)**
    static updateFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, parentId } = req.body;
                const updatedFolder = yield folderService_1.FolderService.updateFolder(Number(id), name, parentId);
                res.json(updatedFolder);
            }
            catch (error) {
                res.status(500).json({ message: "Gagal memperbarui folder" });
            }
        });
    }
    // **Delete Folder**
    static deleteFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield folderService_1.FolderService.deleteFolder(Number(id));
                res.json({ message: "Folder berhasil dihapus" });
            }
            catch (error) {
                res.status(500).json({ message: "Gagal menghapus folder" });
            }
        });
    }
    // **Insert File**
    static createFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // res.json({ message: "Data yang dikirim", data: req.body });
                const { name, extension, folderId } = req.body;
                const file = yield folderService_1.FolderService.createFile(name, extension, folderId);
                res.status(201).json(file);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    // **Delete Folder**
    static deleteFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield folderService_1.FolderService.deleteFile(Number(id));
                res.json({ message: "File berhasil dihapus" });
            }
            catch (error) {
                res.status(500).json({ message: "Gagal menghapus File" });
            }
        });
    }
}
exports.FolderController = FolderController;
