
import NavigationSidebar from "./NavigationSidebar";
import {Routes, Route} from "react-router";
import React from "react";
import experienceReducer from "./Experiences/experience-reducer";
import experienceDetail from "./Experience-Detail/experience_detail_reducer";
import HomeProjectReducer from "./HomeComponent/HomeProject-reducer";
import CitySuggestionReducer from "./CitySuggestions/city_suggestion_reducer";
import { configureStore }
    from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import profileReducer from "./Profile/profile-reducer";
import HomeExp from "./Experiences/index";
import DetailExp from "./Experience-Detail";
import GlobalCities from "./HomeComponent";
import CitySuggest from "./CitySuggestions";
import NavBarTop from "./NavBarTop";
import HomeComponentProject from "./HomeComponent/HomeComponentProject";
import ProfileComponent from "./Profile";
import EditProfileComponent from "./EditProfile";
import DetailExpOfUser from "./MyExperiences/my_experiences";
import LoginComponent from "./Login/index.js";
import RegisterComponent from "./Register/index.js";
import UserExperienceComponent from "./UserExperience/index.js";
import UpcomingTripsComponent from "./AddUpcomingTrip";
import userDetailsReducer from "../redux/user-details-reducer";
import BookATrip from "./BookATrip";
import MyBookings from "./MyBookings";

const store = configureStore({
                                 reducer: {profile: profileReducer, experience: experienceReducer, experiencedetail: experienceDetail,
                                     Cities: HomeProjectReducer, CitySuggestions: CitySuggestionReducer,user: userDetailsReducer}
                             });

function Wanderer() {
    return (
        <Provider store={store}>
            <div style={{"position": "fixed",
                "top": 0,
                "width":"100%",
                "z-index": "20"}}><NavBarTop/></div>

            <div className="row" style={{"margin-top":"80px"}}>
                <div className="col-2">
                    <NavigationSidebar active="explore"/>
                </div>
                <div className="col-7"
                     style={{"position": "relative"}}>
                    <Routes>
                        <Route path="/" element={<HomeComponentProject/>}/>
                        {/*//<Route path="wanderer" element={<HomeComponentProject/>}/>*/}
                        <Route path="/explore/:id" element={<GlobalCities/>}/>
                        <Route path="/profile" element={<ProfileComponent/>}/>
                        <Route path="/profile/:id" element={<ProfileComponent/>}/>
                        <Route path="/edit-profile" element={<EditProfileComponent/>}/>
                        <Route path="/experiencedetail/:id" element={<DetailExp/>}/>
                        <Route path="/cities" element={<CitySuggest/>}/>
                        <Route path="/experience" element={<DetailExpOfUser/>}/>
                        <Route path="/login" element={<LoginComponent/>}/>
                        <Route path="/register" element={<RegisterComponent/>}/>
                        <Route path="/wanderer/reviews" element={<UserExperienceComponent/>}/>
                        <Route path="/wanderer/bookatrip" element={<BookATrip/>}/>
                        <Route path="/wanderer/upcomingTrips" element={<UpcomingTripsComponent/>}/>
                        <Route path="/wanderer/bookings" element={<MyBookings/>}/>
                    </Routes>
                </div>
                <div className="col-3" style={{"height": "780px",
                    "overflow-x": "auto",
                    "overflow-y": "auto"}}>
                    <HomeExp/>
                </div>
            </div>
        </Provider>
    )
}
export default Wanderer;