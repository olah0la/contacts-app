import {createBrowserRouter} from "react-router-dom";
import WelcomePage from './Pages/WelcomePage';
import AddContacts from './Pages/AddContacts';
import ListContacts from './Pages/ListContacts';
import ViewContacts from './Pages/ViewContacts';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  }, {
    path: "/form",
    element: <AddContacts />
  }, {
    path: "/list",
    element: <ListContacts />
  },
  {
    path: "/view/:contactId",
    element: <ViewContacts />
  }
])
