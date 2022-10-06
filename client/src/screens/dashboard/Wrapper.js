import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import { useState } from 'react';

function Wrapper({ children }) {
  const [sideBar, setSidebar] = useState('-left-64');

  const openSidebar = () => {
    setSidebar('-left-0');
  }

  const closeSidebar = () => {
    setSidebar('-left-64');
  }

  return (
    <>
      <Sidebar side={sideBar} closeSidebar={closeSidebar} />
      <AdminNav openSidebar={openSidebar} />
      <section className="ml-0 sm:ml-64 bg-slate-200 min-h-screen pt-28 px-4">
        {children}
      </section>
  </>
  )
}

export default Wrapper