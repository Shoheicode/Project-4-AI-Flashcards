import React, { useState } from 'react';
import { File, Folder, MoreVertical, Download, Share2 } from 'lucide-react';
import './cardsforflash.css'

import { useRouter } from 'next/navigation';

export default function FileCard({ fileName, fileType, fileSize, lastModified }){
  const [isHovered, setIsHovered] = useState(false);
  const isFolder = fileType === 'folder';
  const router = useRouter()

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

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
            <Folder size={96} color='black'/>
          ) : (
            <File size={96} />
          )}
        </div>
        
        <div className="card-footer">
          <p className="file-size">{fileSize}</p>
          <div className="action-buttons">
            <button className="action-button" onClick={() => handleCardClick(fileName)}>
              <Download size={16} />
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
