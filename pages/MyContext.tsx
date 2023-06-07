import React, { createContext, useState } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
export const UserContext = createContext({ pb });

export default function MyContext({ children }: { children: React.ReactNode }) {
    return <UserContext.Provider value={{ pb }}>{children}</UserContext.Provider>;
}
