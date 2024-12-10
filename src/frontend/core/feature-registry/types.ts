import type { Route } from 'universal-router';

export interface Feature {
    name: string;
    routes: Route[];
    initialize(): Promise<void>;
} 