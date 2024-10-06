import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'
import DashboardHome from './pages/DashboardHome'
import Classes from './pages/Classes'
import Result from './pages/Result'
import Students from './pages/Students'
import Subjects from './pages/Subjects'
import Teachers from './pages/Teachers'
import Home from './pages/Home'
import AddClass from './pages/AddClass'
import AddStudent from './pages/AddStudent'
import AddSubjects from './pages/AddSubjects'
import AddTeacher from './pages/AddTeacher'
import ViewTeacher from './pages/ViewTeacher'
// import DashHome from './pages/DashHome'

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <Home />,
    children: [
      {
        index: true,
        element: <DashboardHome />
      },
      {
        path: "classes",
        children: [
          {
            path: "add",
            element: <AddClass />
          },
          {
            path: "view",
            element: <Classes />
          }
        ]
      },
      {
        path: "results",
        element: <Result />,
      },
      {
        path: "students",
        children: [
          {
            path: "add",
            element: <AddStudent />
          },
          {
            path: "view",
            element: <Students />
          }
        ]
      },
      {
        path: "subjects",
        children: [
          {
            path: "add",
            element: <AddSubjects />
          },
          {
            path: "view",
            element: <Subjects />
          }
        ]
      },
      {
        path: "teachers",
        children: [
          {
            path: "add",
            element: <AddTeacher />
          },
          {
            path: "view",
            element: <Teachers />
          },
          {
            path: "/dashboard/teachers/:id",
            element: <ViewTeacher />
          }

        ]

      }
    ]
  }
])



function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
