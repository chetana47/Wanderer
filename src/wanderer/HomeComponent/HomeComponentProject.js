import React, {useEffect} from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CitySuggest from "../CitySuggestions";
import "./index.css";
import UserReaction from "../UserReactions/user-reaction"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import axios from "axios";
import {
    addBucketList,
    getCityDetailsByPlaceId,
    getUpcomingTrip
} from "../../services/wanderer-service";
import {useSelector} from "react-redux";
const HomeComponentProject = () => {
// useEffect(() => {
//     getData(placeId);
// }, []);
    const [address, setAddress] = React.useState("");
    const [photos, setPhotos] = React.useState(null);
    const [placeId, setPlaceId] = React.useState("");
    const [user_id, setUserId] = React.useState("");
    const [city_id, setCityId] = React.useState("");

    const [coordinates, setCoordinates] = React.useState({
                                                             lat: null,
                                                             lng: null
                                                         });

    async function getData(placeId) {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/tuits/getPhotos/${placeId}`);
            const json = await response
            console.log(json);
            setPhotos(json.data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        console.log(latLng);
        console.log(results[0].place_id);
        setAddress(value);
        setCoordinates(latLng);
        setPlaceId(results[0].place_id);
        await getData(results[0].place_id);
    };

    const { currentUser } = useSelector((state) => state.user);

    async function handleBookmarks() {
        console.log("place ID",placeId);
        const response = await getCityDetailsByPlaceId(placeId);
        setCityId(response.data._id);
        if(currentUser) {
            setUserId(currentUser.message._id);}
        const responsed = await addBucketList({city_id,user_id});
        console.log("city",responsed);
    };

    return(
        <>

            <div className="position-relative mb-2" style={{"height": "500px",
                "overflow-x": "auto",
                "overflow-y": "auto"}}>
                <div id="demo2" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active" ></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                    </div>
                    <div className="carousel-inner">
                        {
                           photos == null ? <div className="carousel-item active">
                               <img src="../../Images/Boston2.jpeg" alt="boston1" className="w-100"/>
                           </div> : photos.map((photo) => <div className="carousel-item active">
                                <img src={photo} alt="boston1" className="w-100"/>
                            </div>)
                        }
                        <PlacesAutocomplete
                            value={address}
                            onChange={setAddress}
                            searchOptions={{ types: ['locality', 'country'] }}
                            onSelect={handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <div className="row">
                                        <div className="col-12 position-relative mb-1">

                                            <input {...getInputProps({ placeholder: "Type address" })}
                                                   className="form-control rounded-pill ps-5" style={{"position":"relative"}}/>
                                            <i className="bi bi-search position-absolute
                       wd-nudge-up"></i>
                                        </div>
                                    </div>
                                    <br/>
                                    <div>
                                        {loading ? <div>...loading</div> : null}

                                        {suggestions.map(suggestion => {
                                            const style = {
                                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                                "position":"relative",
                                                "z-index": "50",
                                                "margin": "0px",
                                                "opacity": "10"
                                            };

                                            return (
                                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#demo2" data-bs-slide="prev" >
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#demo2" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>
            {/*<UserReaction/>*/}
            <div className="container">
                <div className="row" style={{width:"1000px"}}>
                    <div className="row col-lg-4">
                        <div className="col-md-1 col-sm-6">
                            <i className="fa-regular fa-bookmark "
                            onClick= {() => handleBookmarks()}></i></div>
                        <div className="col-md-8 col-sm-6">
                            <h6>Add to BucketList</h6></div>
                    </div>
                    <div className="row col-lg-4">
                        <div className="col-md-1 col-sm-6">
                            <i className="fa-sharp fa-regular fa-thumbs-up"></i></div>
                        <div className="col-md-8 col-sm-6">
                            <h6>Like</h6>
                        </div>
                    </div>
                    <div className="row col-lg-4">
                        <div className="col-md-1 col-sm-6">
                            <i className="fa-regular fa-pen-to-square"></i></div>
                        <div className="col-md-8 col-sm-6">
                            <h6>Write a review</h6></div>
                    </div>
                </div>
                <hr/>
            </div>
            <CitySuggest/>
            {/*<PostSummaryList/>*/}
        </>
    );
};
export default HomeComponentProject;
