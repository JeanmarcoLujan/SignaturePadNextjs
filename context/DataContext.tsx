"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Registro {
    _id: string;
    signature: string;
    pdf: string | null;
    pdf_signature: string | null;
}

interface DataContextValue {
    registros: Registro[];
    loading:boolean;
    agregarRegistro: (nuevoRegistro: Registro) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [registros, setRegistros] = useState<Registro[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Hoaaaa");
        cargarRegistrosDesdeAPI();
      }, []);

    const cargarRegistrosDesdeAPI = async () => {
        try {
            const response = await fetch(process.env.apiUrl + "signature");
            const data = await response.json();

            if (response.ok) {
                setRegistros(data);
                setLoading(false);
            } else {
                // Manejar el caso de error si es necesario
            }
        } catch (error) {
            // Manejar errores de conexión u otros
        }
    };

    const agregarRegistro = async (nuevoRegistro: Registro) => {
        try {
            const response = await fetch(process.env.apiUrl + "signature", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoRegistro),
            });

            const data = await response.json();

            if (response.ok) {
                setRegistros((prevRegistros) => [...prevRegistros, data]);
            } else {
                // Manejar el caso de error si es necesario
            }
        } catch (error) {
            // Manejar errores de conexión u otros
        }
    };

    return (
        <DataContext.Provider value={{ registros,loading, agregarRegistro }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData debe ser usado dentro de un DataProvider');
    }
    return context;
}