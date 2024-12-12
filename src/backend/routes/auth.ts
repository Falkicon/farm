import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function registerAuthRoutes(fastify: FastifyInstance) {
  // Login route
  fastify.post('/auth/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 }
        }
      }
    }
  }, async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };

    // TODO: Implement actual user authentication
    // This is just a mock implementation
    if (email === 'test@example.com' && password === 'password123') {
      const token = jwt.sign(
        { userId: '1', role: 'user', email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return { token };
    }

    throw { statusCode: 401, message: 'Invalid credentials' };
  });

  // Logout route
  fastify.post('/auth/logout', async (request, reply) => {
    // TODO: Implement token invalidation
    return { success: true };
  });

  // Refresh token route
  fastify.post('/auth/refresh', async (request, reply) => {
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw { statusCode: 401, message: 'No token provided' };
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string; email: string };
      const newToken = jwt.sign(
        { userId: decoded.userId, role: decoded.role, email: decoded.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return { token: newToken };
    } catch (error) {
      throw { statusCode: 401, message: 'Invalid token' };
    }
  });
}
