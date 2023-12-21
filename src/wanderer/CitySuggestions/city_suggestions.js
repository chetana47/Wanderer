import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import "./index.css";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import cities from "./cities.json";
import HomeComponentProject from "../HomeComponent/HomeComponentProject";
const CitySuggestion = ({
                            citySuggest = {
                                _id: 123,
                                placeID: "ChIJOwg_06VPwokRYv534QaPC8g",
                                imageURL:
                                    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nationalgeographic.com%2Ftravel%2Fdestination%2Fnew-york-city&psig=AOvVaw2jVwCcgs8fM54vzW5XtpMo&ust=1702343076844000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIiT7KyYhoMDFQAAAAAdAAAAABAD",
                                cityName: "New York",
                            },
                        }) => {
    const handleClick = () => {

    };
    return (
        <div className="div-realtive">
            {/*<Link*/}
            {/*    to={"/tuiter/experiencedetail/" + citySuggest._id}*/}
            {/*    style={{ textDecoration: "none" }}*/}
            {/*>*/}
                <img
                    height={250}
                    width={250}
                    alt={"avatarIcon"}
                    src={`${citySuggest.imageURL}`}
                    onClick={handleClick()}
                />
            {/*</Link>*/}
            <h1 className="text-position">{citySuggest.cityName}</h1>
        </div>
    );
};
export default CitySuggestion;
