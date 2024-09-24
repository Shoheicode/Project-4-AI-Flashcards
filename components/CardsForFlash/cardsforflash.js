import React, { useState } from 'react';
import { File, Folder, MoreVertical, Download, Share2 } from 'lucide-react';

const CoolCard = ({ fileName, fileType, fileSize, lastModified }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isFolder = fileType === 'folder';

  const gradientClass = isFolder
    ? 'from-yellow-400 to-orange-500'
    : 'from-blue-400 to-indigo-500';

  return (
    <div
      className={`w-72 h-96 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out ${
        isHovered ? 'scale-105 shadow-xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-full bg-gradient-to-br ${gradientClass} p-6 flex flex-col`}>
        <div className="flex justify-between items-start mb-4">
          <div className="text-white">
            <h3 className="font-bold text-xl mb-1 truncate">{fileName}</h3>
            <p className="text-sm opacity-80">{lastModified}</p>
          </div>
          <button className="text-white opacity-80 hover:opacity-100 transition-opacity">
            <MoreVertical size={24} />
          </button>
        </div>
        
        <div className="flex-grow flex items-center justify-center">
          {isFolder ? (
            <Folder size={96} className="text-white opacity-90" />
          ) : (
            <File size={96} className="text-white opacity-90" />
          )}
        </div>
        
        <div className="mt-4">
          <p className="text-white text-sm mb-2">{fileSize}</p>
          <div className="flex justify-between">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white py-2 px-4 rounded-lg flex items-center">
              <Download size={16} className="mr-2" />
              Download
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white py-2 px-4 rounded-lg flex items-center">
              <Share2 size={16} className="mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="flex space-x-6 p-10 bg-gray-100 min-h-screen items-center justify-center">
      <CoolCard
        fileName="Project Files"
        fileType="folder"
        fileSize="1.2 GB"
        lastModified="Modified 2 days ago"
      />
      <CoolCard
        fileName="Annual_Report.pdf"
        fileType="file"
        fileSize="15.7 MB"
        lastModified="Modified yesterday"
      />
    </div>
  );
}