export type RequiredRolesOpts = {
    hasAny?: string[]
    hasAll?: string[]
}

export const roleToArray = (val: unknown): string[] => {
    return Array.isArray(val) ? (val as string[]) : []
}