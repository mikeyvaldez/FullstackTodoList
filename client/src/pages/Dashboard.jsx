import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar"
import DashProfile from "../components/DashProfile"
// import DashboardProfile from "../components/DashboardProfile";
// import DashboardPosts from "../components/DashboardPosts";
// import DashboardUsers from "../components/DashboardUsers";
// import DashboardComments from "../components/DashboardComments";
// import DashComp from "../components/DashComp";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");


  // this use effect hook to read what is being typed in the browser search 
  // ex: localhhost:port/dashboard?tab=posts
  // it takes the information and is able to render different components 
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab")
    if(tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile */}
      {tab === "profile" && <DashProfile />}      
      {/* users */}
      {/* {tab === "users" && <DashboardUsers />} */}
      {/* todos */}
      {/* {tab === "todos" && <DashTodoList />} */}
      {/* dashboard component */}
      {/* {tab === "dash" && <DashComp />} */}
    </div>
  )
}
