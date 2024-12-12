import { FastifyInstance } from 'fastify';

// Mock user data
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin' }
];

export function registerUserRoutes(fastify: FastifyInstance) {
  // Get all users
  fastify.get('/users', async (request, reply) => {
    return { users };
  });

  // Get user by ID
  fastify.get('/users/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = users.find(u => u.id === id);

    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    return { user };
  });

  // Create user
  fastify.post('/users', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          role: { type: 'string', enum: ['user', 'admin'], default: 'user' }
        }
      }
    }
  }, async (request, reply) => {
    const { name, email, role } = request.body as { name: string; email: string; role?: string };
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      role: role || 'user'
    };

    users.push(newUser);
    return { user: newUser };
  });

  // Update user
  fastify.put('/users/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          role: { type: 'string', enum: ['user', 'admin'] }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const updates = request.body as Partial<typeof users[0]>;
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      throw { statusCode: 404, message: 'User not found' };
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    return { user: users[userIndex] };
  });

  // Delete user
  fastify.delete('/users/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      throw { statusCode: 404, message: 'User not found' };
    }

    users.splice(userIndex, 1);
    return { success: true };
  });
}
