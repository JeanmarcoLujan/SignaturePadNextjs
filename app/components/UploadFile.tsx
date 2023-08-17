
"use client";
import { useRef, useState } from 'react';
import { useData } from '@/context/DataContext';

interface Registro {
    _id: string;
    signature: string;
    pdf: string | null;
    pdf_signature: string | null;
}

export default function UploadFile() {

    const { agregarRegistro } = useData();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    
    const [nuevoRegistro, setNuevoRegistro] = useState<Registro>({
        _id: '',
        signature: '',
        pdf: '',
        pdf_signature: ''
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setNuevoRegistro({ ...nuevoRegistro, pdf: reader.result?.toString()?.split(',')[1] || '' as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        //console.log(nuevoRegistro);
        await agregarRegistro(nuevoRegistro);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the file input
        }
        setNuevoRegistro({
            _id: '',
            signature: '',
            pdf: '',
            pdf_signature:''
        });
    };

    /*
    const [pdfBase64, setPdfBase64] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);



    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const base64String = await convertToBase64(file);
            setPdfBase64(base64String);
        }
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result?.toString()?.split(',')[1] || '');
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!pdfBase64) {
            alert("file is required.");
            return;
        }

        console.log(pdfBase64);

        //const router = useRouter();
        
        
        try {
          const res = await fetch(process.env.apiUrl+"signature", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({ "signature":'no',"pdf":pdfBase64,"pdf_signature":'no' }),
          });
    
          if (res.ok) {
            //router.refresh();
            setPdfBase64('');
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear the file input
            }
            router.push("/");
          } else {
            throw new Error("Failed to create a category");
          }
        } catch (error) {
          console.log(error);
        }
        

    };
    */

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                type="file"
                id="pdfFile"
                accept=".pdf"
                onChange={handleFileChange}
                className="border rounded p-1 mt-1"
                ref={fileInputRef}
            />
            <div>
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 font-bold text-white py-3 px-6 w-fit"
                >
                    Agregar
                </button>

            </div>

        </form>
    );
};
