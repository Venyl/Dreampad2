import React, { createContext, useState } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://dreampad2.fly.dev');
export const UserContext = createContext({ pb });

export default function MyContext({ children }: { children: React.ReactNode }) {
    return (
        <UserContext.Provider value={{ pb }}>{children}</UserContext.Provider>
    );
}
