"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const folderController_1 = require("../controllers/folderController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/folders:
 *   get:
 *     summary: Get the Folder with File
 *     responses:
 *       200:
 *         description: All Folder with Children dan File
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 parentId:
 *                   type: integer
 *                   nullable: true
 *                 children:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       parentId:
 *                         type: integer
 *                 files:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       parentId:
 *                         type: integer
 *             example:
 *               id: 1
 *               name: Root
 *               parentId: null
 *               children:
 *                 - id: 2
 *                   name: Documents
 *                   parentId: 1
 *                 - id: 3
 *                   name: Pictures
 *                   parentId: 1
 *               files:
 *                 - id: 2
 *                   name: Documents
 *                   parentId: 1
 *                 - id: 3
 *                   name: Pictures
 *                   parentId: 1
 */
router.get("/folders", folderController_1.FolderController.getAllFolders);
/**
 * @swagger
 * /api/folders/{id}:
 *   get:
 *     summary: Get the Detail Folder with children and File
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Name of the folder or file to filter the result
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of file system data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 parentId:
 *                   type: integer
 *                   nullable: true
 *                 children:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       parentId:
 *                         type: integer
 *                 files:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       parentId:
 *                         type: integer
 *             example:
 *               id: 1
 *               name: Root
 *               parentId: null
 *               children:
 *                 - id: 2
 *                   name: Documents
 *                   parentId: 1
 *                 - id: 3
 *                   name: Pictures
 *                   parentId: 1
 *               files:
 *                 - id: 2
 *                   name: Documents
 *                   parentId: 1
 *                 - id: 3
 *                   name: Pictures
 *                   parentId: 1
 */
router.post("/folders", folderController_1.FolderController.createFolder);
router.delete("/folders/:id", folderController_1.FolderController.deleteFolder);
router.get("/folders/:parentId", folderController_1.FolderController.getSubfolders);
router.get("/folders/tree", folderController_1.FolderController.getFolderTree);
router.post("/files", folderController_1.FolderController.createFile);
router.delete("/files/:id", folderController_1.FolderController.deleteFile);
exports.default = router;
