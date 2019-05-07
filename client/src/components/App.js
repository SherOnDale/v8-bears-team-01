import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { PrivateRoute } from "../helpers/PrivateRoute";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import SearchPage from "./SearchPage";
import LandingPage from "./LandingPage";
import NewProject from "./projects/NewProject";
import ProjectPage from "./ProjectPage";
import PrivacyPage from "./PrivacyPage";
import Dashboard from "./Dashboard/Dashboard";
import Auth from "./Auth";
import Profile from "./profile/Profile";
import EditProject from "./projects/EditProject";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="page-wrapper">
                    <Navbar />
                    <div className="page-content">
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/search" component={SearchPage} />
                        <Route exact path="/privacy" component={PrivacyPage} />
                        <Route
                            exact
                            path="/:username/project/:id"
                            component={ProjectPage}
                        />
                        <Route path="/profile/:username" component={Profile} />
                        <Route exact path="/auth" component={Auth} />
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                        />
                        <PrivateRoute
                            exact
                            path="/newproject"
                            component={NewProject}
                        />
                        <PrivateRoute
                            exact
                            path="/:username/project/:id/editProject"
                            component={EditProject}
                        />
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
