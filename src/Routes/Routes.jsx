import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layouts/Dashboard";
import AddArts from "../Pages/Dashboard/AddArts/AddArts";
import AllArtWorks from "../Pages/AllArtWorks/AllArtWorks";
import AllPaintings from "../Pages/AllPaintings/AllPaintings";
import AllDesigns from "../Pages/AllDesigns/AllDesigns";
import AllHandiCrafts from "../Pages/AllHandiCrafts/AllHandiCrafts";
import AllPhotography from "../Pages/AllPhotography/AllPhotography";
import AllSculpture from "../Pages/AllSculptures/AllSculpture";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Register></Register>,
      },
      {
        path: "/allArtWorks",
        element: <AllArtWorks></AllArtWorks>,
      },
      {
        path: "/allPaintings",
        element: <AllPaintings></AllPaintings>,
      },
      {
        path: "/allDesigns",
        element: <AllDesigns></AllDesigns>,
      },
      {
        path: "/allHandiCrafts",
        element: <AllHandiCrafts></AllHandiCrafts>,
      },
      {
        path: "/allPhotography",
        element: <AllPhotography></AllPhotography>,
      },
      {
        path: "/allSculpture",
        element: <AllSculpture></AllSculpture>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "addArts",
        element: <AddArts></AddArts>,
      },
    ],
  },
]);
