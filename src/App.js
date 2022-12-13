import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import Header from "./Header";
import Login from "./Login";
import User from "./User";

function reducer(currentState, action) {
    if (currentState === undefined) {
        return ({
            Authorization: '',
            UserId: ''
        })
    }
    const newState = {...currentState};
    switch (action.type) {
        case "NEWTOKEN":
            newState.Authorization = action.data;
            break;
        case "USERID":
            newState.UserId = action.data;
    }
    return newState;
}

const store = createStore(reducer)

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route exact path="/" element={<Login/>}/>
                        <Route exact path="/user" element={<User/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
