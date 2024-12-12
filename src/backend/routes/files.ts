import { FastifyInstance } from 'fastify';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { randomUUID } from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export function registerFileRoutes(fastify: FastifyInstance) {
  // Upload file
  fastify.post('/files/upload', async (request, reply) => {
    const data = await request.file();
    if (!data) {
      throw { statusCode: 400, message: 'No file uploaded' };
    }

    const fileId = randomUUID();
    const extension = path.extname(data.filename);
    const filename = `${fileId}${extension}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    await pipeline(
      data.file,
      createWriteStream(filepath)
    );

    return {
      id: fileId,
      filename: data.filename,
      mimetype: data.mimetype,
      filepath: `/files/${filename}`
    };
  });

  // Get file metadata
  fastify.get('/files/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    // TODO: Implement file metadata retrieval from database
    throw { statusCode: 501, message: 'Not implemented' };
  });

  // Delete file
  fastify.delete('/files/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    // TODO: Implement file deletion
    throw { statusCode: 501, message: 'Not implemented' };
  });
}
