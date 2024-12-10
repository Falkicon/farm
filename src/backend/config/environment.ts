export const getDatabaseConfig = () => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return {
                url: process.env.DATABASE_URL,
                ssl: true,
                pool: {
                    min: 2,
                    max: 10
                },
                // Production-specific settings
                logging: false,
                connectionTimeout: 20000
            };

        case 'staging':
            return {
                url: process.env.STAGING_DATABASE_URL,
                ssl: true,
                pool: {
                    min: 1,
                    max: 5
                }
            };

        default: // development
            return {
                url: 'postgresql://postgres:password@localhost:5432/mydb',
                ssl: false,
                pool: {
                    min: 1,
                    max: 2
                },
                logging: true
            };
    }
}; 