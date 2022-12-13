import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import {reqToken} from "./requestToken";
import {useCookies} from "react-cookie";

function User() {
    const token = useSelector(state => state.Authorization);
    const userId = useSelector(state => state.UserId);
    const [user, setUser] = useState({});
    const [cookie, setCookie] = useCookies(["refreshToken"]);
    const dispatch = useDispatch();

    useEffect(() => {
        reqUser();
    }, [token]);

    const reqUser = async () => {
        try {
            const res = await axios.post('http://localhost:8080/userInfo', null, {
                headers: {Authorization: token},
                params: {
                    id: userId
                }
            });
            setUser(res.data);
        } catch (error) {
            if (error.request.status === 401) {
                const rescode = error.response.data.rescode;
                // console.log(error);
                // console.log(token + "," + cookie.refreshToken)
                if (rescode == 100) {
                    console.log(error);
                    reqToken(token, dispatch, cookie, setCookie);
                }
            }
        }

    }
    return (
        <table style={{margin: '0 auto'}} border='1'>
            <tbody>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Nickname</th>
                <th>Email</th>
            </tr>
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.nickname}</td>
                <td>{user.email}</td>
            </tr>
            </tbody>
        </table>
    );
}

export default User;