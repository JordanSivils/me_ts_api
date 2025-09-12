import { Config } from "jest"

const config: Config = {
    testEnvironment: 'node',
    testMatch: ["**/?(*.)+(test|spec).ts"],
    modulePathIgnorePatterns: ["<rootDir/dist/>"],
    transform: { "^.+\\.ts$": ["ts-jest", { tsconfig: 'tsconfig.json'}] },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    verbose: false,
    testTimeout: 15000
}

export default config;