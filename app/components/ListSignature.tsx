"use client";
import { useData } from "@/context/DataContext";
import Link from "next/link";
import { useEffect } from "react";

/*
async function getData() {
  //const res = await fetch('http://localhost:3001/api/categories')

  const res = await fetch(process.env.apiUrl + "signature", {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
*/

export default function ListSignature() {
  //const categories = await getData();

  const { registros, loading } = useData();


  
  

  return (
    <>
      {loading ? (
        <p className="text-green-600">Cargando la información...</p>
      ) : (
        registros.map((t: any) => (
          <div
            key={t._id}
            className="p-4  flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold ">{t._id}</h2>
  
            </div>
  
            <div className="flex gap-2">
              <Link href={`/sign/${t._id}`} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 w-fit">
                {t.pdf_signature == '' ? 'Por firmar' : 'Firmado'}
              </Link>
            </div>
          </div>
        ))
      )}

      
    </>
  );
}