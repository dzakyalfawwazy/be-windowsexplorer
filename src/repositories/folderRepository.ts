import { PrismaClient, Folder } from "@prisma/client";

const prisma = new PrismaClient();
export type FolderWithChildren = Folder & { children: FolderWithChildren[] };

export class FolderRepository {
  // Ambil semua folder
  static async getAllFolders() {
    // console.log(r);
    return prisma.folder.findMany({
      where: { parentId: null },
      include: {
        children: true, // Ambil sub-folder langsung
        files: true,
      },
    });
  }

  // Ambil sub-folder berdasarkan parentId
  static async getSubfolders(folderId: number) {
    return prisma.folder.findUnique({
      where: { id: folderId },
      include: {
        children: true, // Pastikan subfolder disertakan
        files: true, // Pastikan file juga disertakan
      },
    });
  }

  // Ambil folder dengan rekursi (nested tree)
  static async getFolderTree(
    parentId: number | null = null
  ): Promise<FolderWithChildren[]> {
    const folders = await prisma.folder.findMany({
      where: { parentId },
    });

    return await Promise.all(
      folders.map(async (folder) => ({
        ...folder,
        children: await FolderRepository.getFolderTree(folder.id),
      }))
    );
  }
  // **Insert Folder**
  static async insertFolder(name: string, parentId: number | null = null) {
    return await prisma.folder.create({
      data: { name, parentId },
    });
  }

  // **Update Folder (Rename atau ubah parent)**
  static async updateFolder(
    id: number,
    name?: string,
    parentId?: number | null
  ) {
    return await prisma.folder.update({
      where: { id },
      data: { name, parentId },
    });
  }

  // **Delete Folder**
  static async deleteFolder(id: number) {
    return await prisma.folder.delete({
      where: { id },
    });
  }
  // **Insert File**
  static async insertFile(name: string, extension: string, folderId: number) {
    return await prisma.file.create({
      data: { name, extension, folderId },
    });
  }
  // **Delete File**
  static async deleteFile(id: number) {
    return await prisma.file.delete({
      where: { id },
    });
  }
}
