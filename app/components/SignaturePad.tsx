"use client";
import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PdfViewer from './PdfViewer';
import { useRouter } from "next/navigation";
//import { useRouter } from 'next/router';
import Link from 'next/link';


interface Registro {
  _id: string;
  signature: string;
  pdf: string ;
  pdf_signature: string;
}



const SignaturePadBase: React.FC<Registro> = ({ _id, signature, pdf, pdf_signature }) => {
  //function SignaturePadBase() {
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);
  const [pdfv, setPdfv] = useState(pdf);
  const [pdfSignature, setPdfSignature] = useState(pdf_signature);
  const router = useRouter();

  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
    }
  };

  

  const redirectToIndex = () => {
    router.refresh();
    router.push('/'); // Redirigir a la página de inicio (index)
    
    
    setTimeout(() => {
      window.location.reload(); // Recargar la nueva página después de un breve retardo
    }, 1000);
    
    
  };

  const saveSignature = async () => {
    if (sigCanvasRef.current) {
      const signatureData = sigCanvasRef.current.toDataURL();
      // You can send the signatureData to your server or store it as needed.
      //console.log('Signature Data:', signatureData);

      try {
        const res = await fetch(process.env.apiUrl+"sign_pdf_put/" + _id, {
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ "signature":signatureData.split(',')[1] ,"pdf":pdf }),
        });
  
        if (res.ok) {
          console.log("OK");
          
          const responseData = await res.json();
          setPdfSignature(responseData.pdf_signature);

        } else {
          throw new Error("Failed to create a category");
        }
      } catch (error) {
        console.log(error);
      }

    }
  };

  return (
    <div className='flex min-h-screen flex-col  p-24'>
      <button className=" font-bold text-black py-4 px-6 w-fit m-4 " onClick={redirectToIndex}>&#8592; Volver</button>
  
      <h3>Firma del documento</h3><br />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        <div className="col-span-1">
          <SignatureCanvas
            ref={sigCanvasRef}
            canvasProps={{ width: 500, height: 200, className: 'signatureCanvas' }}
          />
          <br />
          <div>
            <button onClick={clearSignature} className='bg-red-500 hover:bg-red-700  font-bold text-white py-3 px-6 w-fit'>Limpiar</button>
            <button onClick={saveSignature} className='bg-blue-500 hover:bg-blue-700  font-bold text-white py-3 px-6 w-fit mx-3'>Firmar</button>
          </div>
         
        </div>
        <div className="col-span-1">
          <PdfViewer pdfData={pdfSignature == ''?pdfv:pdfSignature}/>
        </div>
      </div>

    </div>
  );
}

export default SignaturePadBase;
