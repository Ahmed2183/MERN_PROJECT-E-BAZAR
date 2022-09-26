import { useState } from "react";
import AdminNav from "../../components/AdminNav";
import SideBar from "../../components/SideBar";

//using Wrapper.js to send data as a props we only send data through wrapper without wrapper data not send
const Wrapper = ({children}) => { //children catch data from where we import used Wrapper.js

 const [sidebar,setSidebar] = useState('-left-64'); //-left-64 means hide Sidebar

 const openSidebar = () => {
     setSidebar("left-0");  //left-0 means show Sidebar, left-0 for show something and -left-64 for hide something
 }

 const closeSidebar = () => {
     setSidebar("-left-64");
 }

  return (
    <>
    {/* <div className="bg-navyblue min-h-screen"> */}
      <SideBar sidebar={sidebar} closeSidebar={closeSidebar}/>  {/*-->Send state value to SideBar.js as a props */}
      <AdminNav openSidebar={openSidebar}/> {/*Send to AdminNav.js as a props */}
      <section className="ml-0 sm:ml-36 bg-navyblue min-h-screen pt-11 px-4">  {/* Section in which Add category button etc */}
        <div className= "bg-white text-red-600 px-4 py-6">
          {children}  {/*-->using props we get data from inside Wrapper tag */}
        </div>
      </section>
      {/* </div> */}
    </>
  );
};

export default Wrapper;
