import SignaturePadBase from "@/app/components/SignaturePad";

interface Registro {
    _id: string;
    signature: string;
    pdf: string | null;
    pdf_signature: string | null;
  }
  

const getSignById = async (id:any) => {
  try {
    const res = await fetch(`${process.env.apiUrl}signature/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch signature");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};


export default async function Edit({ params  }: any) {
  const { id } = params;
  const reg = await getSignById(id);
  return <SignaturePadBase _id={reg._id} signature={reg.signature} pdf={reg.pdf} pdf_signature={reg.pdf_signature} />;
}