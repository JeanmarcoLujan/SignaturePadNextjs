import UploadFile from './components/UploadFile'
import ListSignature from './components/ListSignature'


export default function Home() {

  
  return (
    <main className="flex min-h-screen flex-col  p-24">

        <h1>Subir PDF</h1>
        <hr /><br />
        <UploadFile /><br />

        <h1>Listado</h1>
        <hr /><br />
        <ListSignature />
      
    </main>
  )
}
