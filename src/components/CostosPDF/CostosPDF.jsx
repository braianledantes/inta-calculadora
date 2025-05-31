import { Document, Page, Image, Text} from '@react-pdf/renderer';

const PDFDocument =({imageChartData}) => (
    <Document>
        <Page size="A4">
            <Text>Grafico</Text>
            <Image src={imageChartData} />
        </Page>
    </Document>
);

export default PDFDocument; 