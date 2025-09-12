jest.spyOn(console, 'error').mockImplementation(() => {})
jest.spyOn(console, 'warn').mockImplementation(() => {})
jest.mock('@clerk/express', () => ({
    clerkMiddleware: () =>(_req: any, _res: any, next: any) => next()
}))