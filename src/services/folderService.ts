import { FolderRepository } from "../repositories/folderRepository";

export class FolderService {
  static async getAllFolders() {
    return await FolderRepository.getAllFolders();
  }

  static async getSubfolders(parentId: number) {
    return await FolderRepository.getSubfolders(parentId);
  }

  static async getFolderTree() {
    return await FolderRepository.getFolderTree();
  }
  // **Insert Folder**
  static async createFolder(name: string, parentId: number | null = null) {
    return await FolderRepository.insertFolder(name, parentId);
  }

  // **Update Folder (Rename atau ubah parent)**
  static async updateFolder(
    id: number,
    name?: string,
    parentId?: number | null
  ) {
    return await FolderRepository.updateFolder(id, name, parentId);
  }

  // **Delete Folder**
  static async deleteFolder(id: number) {
    return await FolderRepository.deleteFolder(id);
  }
  // **Insert Folder**
  static async createFile(name: string, extension: string, folderId: number) {
    return await FolderRepository.insertFile(name, extension, folderId);
  }
  // **Delete File**
  static async deleteFile(id: number) {
    return await FolderRepository.deleteFile(id);
  }
}
