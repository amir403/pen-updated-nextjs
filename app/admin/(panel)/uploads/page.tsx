import {UploadForm} from '@/components/admin/upload-form';

export const metadata={title:'File uploads'};

export default function Uploads(){
 return <>
  <header className="admin-header"><div><h1>File uploads</h1><p>Upload a PDF, Word, Excel, PowerPoint or image file (max 10 MB), then paste its link into any link field, for example a disclosure document line.</p></div></header>
  <UploadForm/>
 </>;
}
