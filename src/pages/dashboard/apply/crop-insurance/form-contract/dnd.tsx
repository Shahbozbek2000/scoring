import React, { useState } from 'react'
import { LayoutGrid, Image, GripVertical } from 'lucide-react'

interface Block {
  id: string
  left: number
  top: number
  width: number
  height: number
}

export default function Dashboard() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    if (e.target instanceof HTMLElement) {
      e.dataTransfer.setData('text/plain', 'new-block')
      setIsDragging(true)
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropArea = document.getElementById('dropArea')
    if (!dropArea) return

    const rect = dropArea.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const blockType = e.dataTransfer.getData('text/plain')

    if (blockType === 'new-block') {
      const newBlock: Block = {
        id: `block-${Date.now()}`,
        left: x,
        top: y,
        width: 200,
        height: 200,
      }
      setBlocks(prev => [...prev, newBlock])
    }
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Chap panel */}
      <div className='w-64 bg-slate-800'>
        <div className='p-4'>
          <h1 className='text-xl font-bold mb-6 text-white'>Fido-biznes</h1>

          <div className='flex items-center space-x-2 p-2 bg-slate-700 rounded mb-4 text-white'>
            <LayoutGrid size={20} />
            <span>Dashboard</span>
          </div>

          {/* Drag qilinadigan block */}
          <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={`p-3 bg-slate-900 rounded mb-2 cursor-move text-white 
              ${isDragging ? 'opacity-50' : ''}`}
          >
            <div className='flex items-center justify-between'>
              <span>Block</span>
              <GripVertical size={20} />
            </div>
          </div>

          {[1, 2, 3, 4, 5, 6].map(num => (
            <div key={num} className='p-3 hover:bg-slate-700 rounded cursor-pointer text-white'>
              <div className='flex items-center justify-between'>
                <span>Picture{num}</span>
                <Image size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Asosiy maydon */}
      <div
        id='dropArea'
        className='flex-1 p-6 relative bg-gray-50'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {blocks.map(block => (
          <div
            key={block.id}
            className='absolute bg-white rounded-lg shadow-lg p-4'
            style={{
              left: block.left,
              top: block.top,
              width: block.width,
              height: block.height,
            }}
          >
            <div className='h-full border-2 border-dashed border-gray-300 flex items-center justify-center'>
              <div className='text-center'>
                <Image size={48} className='mx-auto mb-4 text-gray-400' />
                <p className='text-gray-500'>Rasmni bu yerga tashlang</p>
                <input
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={e => {
                    // Rasm yuklash logikasi
                    console.log('Rasm yuklandi:', e.target.files?.[0])
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
