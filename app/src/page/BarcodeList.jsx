import React, { useRef } from 'react';
import Barcode from 'react-barcode';

const BarcodeList = ({ records }) => {
  const barcodeRefs = useRef([]);

  const handlePrint = (record) => {
    const barcodeIndex = records.findIndex((r) => r.uin === record.uin);
    if (barcodeIndex === -1) {
      console.error(`Record not found: ${record.uin}`);
      return;
    }

    const svgElement = barcodeRefs.current[barcodeIndex]?.querySelector('svg');
    if (!svgElement) {
      console.error(`SVG element not found for record: ${record.uin}`);
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svgElement);
    printSVG(svgData);
  };

  const printSVG = (svgData) => {
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write(`<html><body>${svgData}</body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  const stylebtn = {
   width:"fit-content",
   height:"2rem",
   fontSize:"0.8rem",
   margin:"0.5rem",
   padding:"0.5rem",
   borderRadius:"0.5rem",
  //  backgroundColor:"blue",
  };
  return (
    <div>
      {records.map((record, index) => (
        <div key={record.uin} ref={(ref) => (barcodeRefs.current[index] = ref)}>
          <Barcode value={record.uin} />
          <button onClick={() => handlePrint(record)} style={stylebtn}>Print Barcode</button>
        </div>
      ))}
    </div>
  );
};

export default BarcodeList;
