import { FastifyInstance } from 'fastify';

/**
 * Error response interface
 */
interface ErrorResponse {
  statusCode: number;
  message: string;
}

/**
 * User interface representing a system user
 */
interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's full name */
  name: string;
  /** User's email address */
  email: string;
  /** User's role in the system */
  role: 'user' | 'admin';
}

/**
 * User list response interface
 */
interface UserListResponse {
  users: User[];
}

/**
 * Single user response interface
 */
interface UserResponse {
  user: User;
}

/**
 * Success response interface
 */
interface SuccessResponse {
  success: boolean;
}

// Mock user data for development
const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin' }
];

/**
 * Registers user management routes for the application.
 * Provides CRUD operations for user management.
 *
 * @group User Management
 * @category Routes
 *
 * @example
 * ```typescript
 * // Register user routes
 * await fastify.register(registerUserRoutes);
 *
 * // Get all users
 * const response = await fetch('/users');
 * const { users } = await response.json();
 * ```
 *
 * @param fastify - The Fastify instance to register routes with
 */
export async function registerUserRoutes(fastify: FastifyInstance): Promise<void> {
  /**
   * Get all users
   *
   * @name GET /users
   * @summary List all users
   * @description Returns a list of all users in the system
   *
   * @returns {UserListResponse} List of users
   *
   * @example
   * ```typescript
   * const response = await fetch('/users');
   * const { users } = await response.json();
   * console.log('Total users:', users.length);
   * ```
   */
  fastify.get<{ Reply: UserListResponse }>('/users', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  role: { type: 'string', enum: ['user', 'admin'] }
                }
              }
            }
          }
        }
      }
    }
  }, async (): Promise<UserListResponse> => {
    return { users };
  });

  /**
   * Get user by ID
   *
   * @name GET /users/:id
   * @summary Get user details
   * @description Retrieves detailed information for a specific user
   *
   * @param {string} id - User's unique identifier
   * @throws {ErrorResponse} 404 - If user is not found
   * @returns {UserResponse} User details
   *
   * @example
   * ```typescript
   * const response = await fetch(`/users/${userId}`);
   * if (response.ok) {
   *   const { user } = await response.json();
   *   console.log('User details:', user);
   * }
   * ```
   */
  fastify.get<{ Params: { id: string }; Reply: UserResponse }>('/users/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                role: { type: 'string', enum: ['user', 'admin'] }
              }
            }
          }
        },
        404: {
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request): Promise<UserResponse> => {
    const { id } = request.params;
    const user = users.find(u => u.id === id);

    if (!user) {
      throw { statusCode: 404, message: 'User not found' } as ErrorResponse;
    }

    return { user };
  });

  /**
   * Create a new user
   *
   * @name POST /users
   * @summary Create user
   * @description Creates a new user with the provided information
   *
   * @param {object} body.name - User's full name
   * @param {object} body.email - User's email address
   * @param {object} [body.role=user] - User's role (user or admin)
   * @returns {UserResponse} Created user details
   *
   * @example
   * ```typescript
   * const response = await fetch('/users', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({
   *     name: 'New User',
   *     email: 'user@example.com',
   *     role: 'user'
   *   })
   * });
   *
   * if (response.ok) {
   *   const { user } = await response.json();
   *   console.log('Created user:', user);
   * }
   * ```
   */
  fastify.post<{
    Body: { name: string; email: string; role?: 'user' | 'admin' };
    Reply: UserResponse;
  }>('/users', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          role: { type: 'string', enum: ['user', 'admin'], default: 'user' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                role: { type: 'string', enum: ['user', 'admin'] }
              }
            }
          }
        }
      }
    }
  }, async (request): Promise<UserResponse> => {
    const { name, email, role = 'user' } = request.body;

    const newUser: User = {
      id: String(users.length + 1),
      name,
      email,
      role
    };

    users.push(newUser);
    return { user: newUser };
  });

  /**
   * Update user details
   *
   * @name PUT /users/:id
   * @summary Update user
   * @description Updates an existing user's information
   *
   * @param {string} id - User's unique identifier
   * @param {object} body - Fields to update
   * @param {string} [body.name] - User's new name
   * @param {string} [body.email] - User's new email
   * @param {string} [body.role] - User's new role
   * @throws {ErrorResponse} 404 - If user is not found
   * @returns {UserResponse} Updated user details
   *
   * @example
   * ```typescript
   * const response = await fetch(`/users/${userId}`, {
   *   method: 'PUT',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({
   *     name: 'Updated Name',
   *     email: 'updated@example.com'
   *   })
   * });
   *
   * if (response.ok) {
   *   const { user } = await response.json();
   *   console.log('Updated user:', user);
   * }
   * ```
   */
  fastify.put<{
    Params: { id: string };
    Body: Partial<User>;
    Reply: UserResponse;
  }>('/users/:id', {
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
      },
      response: {
        200: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                role: { type: 'string', enum: ['user', 'admin'] }
              }
            }
          }
        },
        404: {
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request): Promise<UserResponse> => {
    const { id } = request.params;
    const updates = request.body;
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      throw { statusCode: 404, message: 'User not found' } as ErrorResponse;
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    return { user: users[userIndex] };
  });

  /**
   * Delete a user
   *
   * @name DELETE /users/:id
   * @summary Delete user
   * @description Removes a user from the system
   *
   * @param {string} id - User's unique identifier
   * @throws {ErrorResponse} 404 - If user is not found
   * @returns {SuccessResponse} Deletion confirmation
   *
   * @example
   * ```typescript
   * const response = await fetch(`/users/${userId}`, {
   *   method: 'DELETE'
   * });
   *
   * if (response.ok) {
   *   const { success } = await response.json();
   *   console.log('User deleted:', success);
   * }
   * ```
   */
  fastify.delete<{
    Params: { id: string };
    Reply: SuccessResponse;
  }>('/users/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' }
          }
        },
        404: {
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request): Promise<SuccessResponse> => {
    const { id } = request.params;
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      throw { statusCode: 404, message: 'User not found' } as ErrorResponse;
    }

    users.splice(userIndex, 1);
    return { success: true };
  });
}
