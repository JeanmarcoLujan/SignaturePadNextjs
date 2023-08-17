import React from 'react';

interface PdfViewerProps {
    pdfData: string;
}

function PdfViewer({ pdfData }: PdfViewerProps) {

    const pdfSrc = `data:application/pdf;base64,${pdfData}`;

    return (
        <div className="flex justify-center items-center h-screen">
            <iframe
                src={pdfSrc}
                className="w-full h-full"
                title="PDF Viewer"
            />
        </div>
    );
}

export default PdfViewer;