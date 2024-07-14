declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PUBLIC_URL: string;
            // Add other Webpack environment variables if needed
        }
    }
}
