import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import MainPage from "./pages/MainPage.jsx";
import Layout from "./pages/Layout.jsx";
import AccountPage from "./pages/AccountPage";
import NotFoundPage from "./pages/NotFound";
import ReviewPage from "./pages/ReviewPage";
import CreateReviewPage from "./pages/CreateReviewPage.jsx";

function App() {
  const { user, loading, error } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route
          path="my-page"
          element={user ? <AccountPage /> : <Navigate to={"/"} />}
        />
        <Route path="review/:id" element={<ReviewPage />} />
        <Route path="/:tag" element={<MainPage />} />
        <Route path="c/:category" element={<MainPage />}>
          <Route path="t/:tag" element={<MainPage />} />
        </Route>
        <Route
          path="create"
          element={user ? <CreateReviewPage /> : <Navigate to={"/"} />}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
