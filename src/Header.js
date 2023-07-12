import React from 'react'

export default function Header() {

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  const handleView = () =>{
    
  }
  
  return (
    <header className="flex items-center justify-between bg-blue-500 py-4 px-6">
        <h1 className="text-white text-2xl font-bold">ABC Bank</h1>
        <nav className="ml-auto">
          <a href="#" className="text-white hover:text-blue-200 mx-2">
            Link 1
          </a>
          <a href="#" className="text-white hover:text-blue-200 mx-2">
            Link 2
          </a>
        </nav>
        <button className="text-black hover:text-blue-200" onClick={handleLogout}>Logout</button>
      </header>
  )
}
