import { Request, Response } from "express";
import { FolderService } from "../services/folderService";

export class FolderController {
  static async getAllFolders(req: Request, res: Response) {
    try {
      const folders = await FolderService.getAllFolders();
      res.json(folders);
    } catch (error) {
      res.status(500).json({ message: "Gagal mengambil semua folder" });
    }
  }

  static async getSubfolders(req: Request, res: Response) {
    try {
      const { parentId } = req.params;
      const subfolders = await FolderService.getSubfolders(Number(parentId));
      res.json(subfolders);
    } catch (error) {
      res.status(500).json({ message: "Gagal mengambil subfolder" });
    }
  }

  static async getFolderTree(req: Request, res: Response) {
    try {
      const tree = await FolderService.getFolderTree();
      res.json(tree);
    } catch (error) {
      res.status(500).json({ message: "Gagal mengambil struktur folder" });
    }
  }
  // **Insert Folder**
  static async createFolder(req: Request, res: Response) {
    try {
      // res.json({ message: "Data yang dikirim", data: req.body });
      const { name, parentId } = req.body;
      const folder = await FolderService.createFolder(name, parentId || null);
      res.status(201).json(folder);
    } catch (error) {
      res.status(500).json({ message: "Gagal membuat folder" });
    }
  }

  // **Update Folder (Rename atau Ubah Parent)**
  static async updateFolder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, parentId } = req.body;
      const updatedFolder = await FolderService.updateFolder(
        Number(id),
        name,
        parentId
      );
      res.json(updatedFolder);
    } catch (error) {
      res.status(500).json({ message: "Gagal memperbarui folder" });
    }
  }

  // **Delete Folder**
  static async deleteFolder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await FolderService.deleteFolder(Number(id));
      res.json({ message: "Folder berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: "Gagal menghapus folder" });
    }
  }

  // **Insert File**
  static async createFile(req: Request, res: Response) {
    try {
      // res.json({ message: "Data yang dikirim", data: req.body });
      const { name, extension, folderId } = req.body;
      const file = await FolderService.createFile(name, extension, folderId);
      res.status(201).json(file);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  // **Delete Folder**
  static async deleteFile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await FolderService.deleteFile(Number(id));
      res.json({ message: "File berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: "Gagal menghapus File" });
    }
  }
}
