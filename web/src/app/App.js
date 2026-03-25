import SignUp from "@/pages/sign-up";
import {Route, Routes} from "react-router-dom";
import SignIn from "@/pages/sign-in";
import Home from "@/pages/home";
import MainPage from "@/pages/main-page";
import AuthProvider from "@/entities/session/model/AuthContext";
import TemplateProvider from "@/features/template-editor/model/TemplateContext";
import SelectedTemplate from '@/pages/selected-template';
import LayoutWithHeader from "@/widgets/layout-with-header";
import HistoryProvider from "@/features/history-navigation/model/HistoryContext";
import AllTemplatesBlock from "@/pages/all-templates-block";


function App() {
  return (
      <AuthProvider>
          <Routes>
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/signIn" element={<SignIn />} />

              <Route
                  path="*"
                  element={
                      <TemplateProvider>
                          <HistoryProvider>
                              <Routes>
                                  <Route
                                      path="/"
                                      element={
                                          <LayoutWithHeader>
                                              <MainPage />
                                          </LayoutWithHeader>
                                      }
                                  />
                                  <Route
                                      path="/templates"
                                      element={
                                          <LayoutWithHeader>
                                              <AllTemplatesBlock/>
                                          </LayoutWithHeader>
                                      }
                                  />
                                  <Route
                                      path="/templates/:id"
                                      element={
                                          <LayoutWithHeader>
                                              <SelectedTemplate/>
                                          </LayoutWithHeader>
                                      }
                                  />
                                  <Route
                                      path="/home"
                                      element={
                                          <LayoutWithHeader>
                                              <Home />
                                          </LayoutWithHeader>
                                      }
                                  />
                              </Routes>
                          </HistoryProvider>
                      </TemplateProvider>
                  }
              />
          </Routes>
      </AuthProvider>

  );
}

export default App;
