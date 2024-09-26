import React, { useState } from 'react';
import { File, Folder, MoreVertical, Download, Share2 } from 'lucide-react';
import './cardsforflash.css'

export default function FileCard({ fileName, fileType, fileSize, lastModified }){
  const [isHovered, setIsHovered] = useState(false);
  const isFolder = fileType === 'folder';

  return (
    <div
      className={`cool-card ${isFolder ? 'folder' : 'file'} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-content">
        <div className="card-header">
          <div className="file-info">
            <h3 className="file-name">{fileName}</h3>
            <p className="last-modified">{lastModified}</p>
          </div>
          <button className="more-button">
            <MoreVertical size={24} />
          </button>
        </div>
        
        <div className="icon-container">
          {isFolder ? (
            <Folder size={96} />
          ) : (
            <File size={96} />
          )}
        </div>

      </div>
    </div>
  );
};
