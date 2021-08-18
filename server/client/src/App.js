import "./app.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useContext, useEffect, useState } from "react";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import AuthContext from "./components/store/auth-context";
import dotenv from "dotenv";
import mapboxgl from "mapbox-gl";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass =require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

dotenv.config();

function App() {
  const authContext = useContext(AuthContext);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [star, setStar] = useState(1);
  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const onFocusErrorRemove = () => {
    setErrorMsg(null);
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || desc.trim() === "") {
      setErrorMsg("Please fill all details.");
      return;
    }

    setErrorMsg(null);
    const newPin = {
      username: authContext.currentUsername,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }

    setTitle("");
    setDesc("");
    setStar(1);
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <div style={{ height: "92.5vh", width: "100%" }}>
      {authContext.currentUserId && (
        <div className="instruct">
          <span>
            <Room />
          </span>
          Double click to add a new pin
        </div>
      )}
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle="mapbox://styles/manavnaharwal/cksgkimbe6t2018rh5f7rx66q"
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={authContext.currentUserId && handleAddClick}
      >
        {pins.map((p) => (
          <React.Fragment key={p._id}>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color:
                    authContext.currentUsername === p.username
                      ? "tomato"
                      : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="bottom"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating)
                      .fill(<Star className="star" />)
                      .map((star, index) => (
                        <Star className="star" key={index} />
                      ))}
                  </div>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </React.Fragment>
        ))}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="bottom"
            >
              <div className="input-form">
                <div style={{ color: "red", textAlign: "center" }}>
                  {errorMsg}
                </div>
                <form onSubmit={handleSubmit} onFocus={onFocusErrorRemove}>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                    rows="5"
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}

        {authContext.showRegister && <Register />}
        {authContext.showLogin && <Login />}
      </ReactMapGL>
    </div>
  );
}
export default App;
