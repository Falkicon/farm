import { FastifyInstance } from 'fastify';
import { createWriteStream, promises as fs } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { randomUUID } from 'crypto';

/** Directory where uploaded files are stored */
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

/**
 * Error response interface
 */
interface ErrorResponse {
  /** HTTP status code */
  statusCode: number;
  /** Error message */
  message: string;
}

/**
 * File metadata interface
 */
interface FileMetadata {
  /** Original filename */
  filename: string;
  /** File MIME type */
  mimetype: string;
  /** File size in bytes */
  size: number;
  /** Upload timestamp */
  uploadedAt: string;
}

/**
 * File upload response interface
 */
interface FileUploadResponse {
  /** Unique identifier for the uploaded file */
  id: string;
  /** Original filename from the upload */
  filename: string;
  /** MIME type of the uploaded file */
  mimetype: string;
  /** Public URL path to access the file */
  filepath: string;
  /** File size in bytes */
  size: number;
  /** Upload timestamp */
  uploadedAt: string;
}

/**
 * Ensures upload directory exists
 * @throws {Error} If directory creation fails
 */
async function ensureUploadDir(): Promise<void> {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

/**
 * Registers file management routes for the application.
 * Handles file uploads, metadata retrieval, and deletion.
 *
 * @group File Management
 * @category Routes
 *
 * @example
 * ```ts
 * // Register file routes
 * await fastify.register(registerFileRoutes);
 *
 * // Upload a file
 * const formData = new FormData();
 * formData.append('file', file);
 * const response = await fetch('/files/upload', {
 *   method: 'POST',
 *   body: formData
 * });
 * const result = await response.json();
 * ```
 *
 * @param fastify - The Fastify instance to register routes with
 */
export async function registerFileRoutes(fastify: FastifyInstance): Promise<void> {
  // Ensure upload directory exists
  await ensureUploadDir();

  /**
   * Upload a file to the server
   *
   * @name POST /files/upload
   * @summary Upload a file
   * @description Handles file upload using multipart form data. Generates a unique
   * identifier for the file and stores it in the uploads directory.
   *
   * @throws {ErrorResponse} 400 - If no file is provided in the request
   * @throws {ErrorResponse} 500 - If file upload fails
   * @returns {FileUploadResponse} Upload result with file metadata
   *
   * @example
   * ```ts
   * const formData = new FormData();
   * formData.append('file', file);
   * const response = await fetch('/files/upload', {
   *   method: 'POST',
   *   body: formData
   * });
   *
   * if (response.ok) {
   *   const result = await response.json();
   *   console.log('File uploaded:', result.filepath);
   * }
   * ```
   */
  fastify.post<{ Reply: FileUploadResponse }>(
    '/files/upload',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            required: ['id', 'filename', 'mimetype', 'filepath', 'size', 'uploadedAt'],
            properties: {
              id: { type: 'string', format: 'uuid' },
              filename: { type: 'string' },
              mimetype: { type: 'string' },
              filepath: { type: 'string' },
              size: { type: 'number' },
              uploadedAt: { type: 'string', format: 'date-time' },
            },
          },
          400: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
            },
          },
          500: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request): Promise<FileUploadResponse> => {
      try {
        const data = await request.file();
        if (!data) {
          throw { statusCode: 400, message: 'No file uploaded' } as ErrorResponse;
        }

        const fileId = randomUUID();
        const extension = path.extname(data.filename);
        const filename = `${fileId}${extension}`;
        const filepath = path.join(UPLOAD_DIR, filename);

        await pipeline(data.file, createWriteStream(filepath));

        const stats = await fs.stat(filepath);

        return {
          id: fileId,
          filename: data.filename,
          mimetype: data.mimetype,
          filepath: `/files/${filename}`,
          size: stats.size,
          uploadedAt: new Date().toISOString(),
        };
      } catch (error) {
        if ((error as ErrorResponse).statusCode) {
          throw error;
        }
        fastify.log.error('File upload failed:', error);
        throw {
          statusCode: 500,
          message: 'File upload failed',
        } as ErrorResponse;
      }
    },
  );

  /**
   * Get file metadata by ID
   *
   * @name GET /files/:id
   * @summary Get file metadata
   * @description Retrieves metadata for a previously uploaded file.
   * Currently returns 501 Not Implemented.
   *
   * @param {string} id - Unique identifier of the file
   * @throws {ErrorResponse} 501 - Feature not implemented
   *
   * @example
   * ```ts
   * const response = await fetch(`/files/${fileId}`);
   * const metadata = await response.json();
   * ```
   */
  fastify.get<{ Params: { id: string }; Reply: FileMetadata }>(
    '/files/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
        },
        response: {
          501: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (): Promise<never> => {
      // TODO: Implement file metadata retrieval from database
      throw { statusCode: 501, message: 'Not implemented' } as ErrorResponse;
    },
  );

  /**
   * Delete a file by ID
   *
   * @name DELETE /files/:id
   * @summary Delete a file
   * @description Removes a previously uploaded file and its metadata.
   * Currently returns 501 Not Implemented.
   *
   * @param {string} id - Unique identifier of the file to delete
   * @throws {ErrorResponse} 501 - Feature not implemented
   *
   * @example
   * ```ts
   * const response = await fetch(`/files/${fileId}`, {
   *   method: 'DELETE'
   * });
   *
   * if (response.ok) {
   *   console.log('File deleted successfully');
   * }
   * ```
   */
  fastify.delete<{ Params: { id: string }; Reply: void }>(
    '/files/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
        },
        response: {
          501: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (): Promise<never> => {
      // TODO: Implement file deletion
      throw { statusCode: 501, message: 'Not implemented' } as ErrorResponse;
    },
  );
}
