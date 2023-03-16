import React from "react";
import DownloadIcon from '../assets/downloading.png';

// component for the export button icon on the tab component
const ExportButton = (props) => {
    return (
        <a href="/export">
             <img src={DownloadIcon} style={{height: 'auto', width: '50%', marginTop: '10px',  marginLeft: '15px'}}></img> 
        </a> 
    );
}

export default ExportButton;