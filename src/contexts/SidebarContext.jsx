import React, { createContext, useContext, useState } from 'react'

const SidebarContext = createContext()

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar doit être utilisé dans un SidebarProvider')
  }
  return context
}

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  const value = {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar
  }

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}
