import { InfoService } from '@/service/info-service';
import { cookies } from 'next/headers';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import AddDocButton from '@/components/info/AddDocButton';

interface PageProps {
  params: Promise<{ apartmentId: string }>;
}

const DocsPage = async ({ params }: PageProps) => {
  const { apartmentId } = await params;
  const c = await cookies();
  const authToken = c.get('auth-token')?.value ?? '';
  const resp = await InfoService.nextGetDocs(authToken, apartmentId);

  return (
    <div className={'flex flex-col'}>
      <AddDocButton />
      <ul className={'px-4'}>
        {resp.map((doc) => (
          <Card key={doc.id} className={'mb-4 px-3 py-2'}>
            <h3 className={'font-semibold text-lg'}>{doc.title}</h3>
            <Separator className={'mt-1'} />
            {doc.fileType == 'TEXT' ? (
              <p>{doc.textFileId}</p>
            ) : (
              <ul>
                {doc.pdfFiles.map((info) => (
                  <div key={info.pdfFileId}>{info.title}</div>
                ))}
              </ul>
            )}
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default DocsPage;
