import { Feature } from './types';
import type { Route } from 'universal-router';

export class FeatureRegistry {
    private static instance: FeatureRegistry;
    private features: Map<string, Feature> = new Map();

    private constructor() { }

    static getInstance(): FeatureRegistry {
        if (!FeatureRegistry.instance) {
            FeatureRegistry.instance = new FeatureRegistry();
        }
        return FeatureRegistry.instance;
    }

    registerFeature(feature: Feature): void {
        this.features.set(feature.name, feature);
    }

    getAllRoutes(): Route[] {
        const routes: Route[] = [];
        this.features.forEach(feature => {
            routes.push(...feature.routes);
        });
        return routes;
    }
} 