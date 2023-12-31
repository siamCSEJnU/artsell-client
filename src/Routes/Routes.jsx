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
import AllArtists from "../Pages/AllArtists/AllArtists";
import SingleArtWork from "../Pages/SingleArtWork/SingleArtWork";
import PrivateRoute from "./PrivateRoute";
import ArtistRoute from "./ArtistRoute";
import ClientRoute from "./ClientRoute";
import AdminRoute from "./AdminRoute";
import MyArts from "../Pages/Dashboard/MyArts/MyArts";
import ManageArts from "../Pages/Dashboard/ManageArts/MangeArts";
import ManageUsers from "../Pages/Dashboard/ManageUsers/MangeUsers";
import BiddedArts from "../Pages/Dashboard/BiddedArts/BiddedArts";
import SingleArtist from "../Pages/SingleArtist/SingleArtist";

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
      {
        path: "/allArtists",
        element: <AllArtists></AllArtists>,
      },
      {
        path: "/allArtWorks/:id",
        element: (
          <PrivateRoute>
            <SingleArtWork></SingleArtWork>
          </PrivateRoute>
        ),
      },
      {
        path: "/allArtists/:id",
        element: (
          <PrivateRoute>
            <SingleArtist></SingleArtist>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "addArts",
        element: (
          <ArtistRoute>
            <AddArts></AddArts>
          </ArtistRoute>
        ),
      },
      {
        path: "myArts",
        element: (
          <ArtistRoute>
            <MyArts></MyArts>
          </ArtistRoute>
        ),
      },
      {
        path: "manageArts",
        element: (
          <AdminRoute>
            <ManageArts></ManageArts>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "biddedArts",
        element: (
          <ClientRoute>
            <BiddedArts></BiddedArts>
          </ClientRoute>
        ),
      },
    ],
  },
]);
