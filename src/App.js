import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import Header from "./Header";
import Login from "./Login";
import User from "./User";
import {persistStore} from "redux-persist";
import {store} from "./persist-store";
import {PersistGate} from "redux-persist/integration/react";

// const store = createStore(reducer
let persistor = persistStore(store)

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <BrowserRouter>
                        <Header/>
                        <Routes>
                            <Route exact path="/" element={<Login/>}/>
                            <Route exact path="/user" element={<User/>}/>
                        </Routes>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </div>
    );
}

export default App;
