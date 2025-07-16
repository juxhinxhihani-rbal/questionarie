"use client";

import React, {createContext, useContext, useEffect, useState} from "react";
import Keycloak, {KeycloakInstance} from "keycloak-js";

interface AuthContextType {
    keycloak?: KeycloakInstance;
    loggedIn: boolean;
    /** Initiates login through Keycloak when configured */
    login: () => void;
    /** Performs a local login when Keycloak is not used */
    localLogin: () => void;
    logout: () => void;
    hasRole: (role: string) => boolean;
    token?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [keycloak, setKeycloak] = useState<KeycloakInstance | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const url = undefined;
    const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
    const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;

    useEffect(() => {
        if (!url || !realm || !clientId) {
            console.warn("Keycloak is disabled: missing environment variables.");
            setInitialized(true); // Let the app continue
            return;
        }
        const kc = new Keycloak({ url, realm, clientId });

        kc.init({onLoad: "check-sso", pkceMethod: "S256", checkLoginIframe: false})
            .then((authenticated) => {
                setKeycloak(kc);
                setLoggedIn(authenticated);
                setInitialized(true);
            })
            .catch(() => setInitialized(true));
    }, []);

    const login = () => {
        keycloak?.login();
    };

    const localLogin = () => {
        setLoggedIn(true);
    };

    const logout = () => {
        if (keycloak) {
            keycloak.logout({redirectUri: window.location.origin + "/login"});
        }
        setLoggedIn(false);
    };

    const hasRole = (role: string) => {
        const roles = (keycloak?.tokenParsed as any)?.realm_access?.roles || [];
        return roles.includes(role);
    };

    return (
        <AuthContext.Provider
            value={{
                keycloak: keycloak ?? undefined,
                loggedIn,
                login,
                localLogin,
                logout,
                hasRole,
                token: keycloak?.token,
            }}
        >
            {initialized && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const getEnv = (name: string, fallback = ""): string => {
    return process.env[name] ?? fallback;
}
