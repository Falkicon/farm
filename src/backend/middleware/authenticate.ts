import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JWTPayload {
  userId: string;
  role: string;
  [key: string]: unknown;
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw { statusCode: 401, message: 'No authorization header' };
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      throw { statusCode: 401, message: 'No token provided' };
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    // Add user info to request
    request.user = decoded;

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid token'
      };
    }

    if (error instanceof jwt.TokenExpiredError) {
      throw {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Token expired'
      };
    }

    throw error;
  }
}

// Extend FastifyRequest to include user property
declare module 'fastify' {
  interface FastifyRequest {
    user?: JWTPayload;
  }
}
