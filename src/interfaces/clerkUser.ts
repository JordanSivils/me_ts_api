export interface ClerkUser {
    tokenType: string
    actor?: string
    sessionClaims?: SessionClaims
    sessionId: string
    sessionStatus?: string
    userId: string
    isAuthenticated: boolean
    factorVerificationAge?: [number, number]
    orgId?: string
    orgRole?: string
    orgSlug?: string
    getToken?: () => Promise<string | null> 
    has: (key: string) => boolean
    debug: () => void
}

export interface SessionClaims {
    metadata: Metadata
    azp?: string
    exp?: number
    fva?: [number, number]
    iat?: number
    iss?: string
    jti?: string
    nbf?: number
    sid?: string
    sub?: string
    v?: number
 }

export interface Metadata {
    role?: string
}