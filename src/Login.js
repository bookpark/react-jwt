import {useRef} from "react";
import {useCookies} from "react-cookie";
import {useDispatch} from "react-redux";
import axios from "axios";

function Login() {
    const formRef = useRef();
    const [cookie, setCookie] = useCookies(['refreshToken'])
    const dispatch = useDispatch();
    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/login', null,
            {
                params: {
                    id: formRef.current.id.value,
                    password: formRef.current.password.value
                }
            })
            .then(res => {
                //accessToken redux에 저장
                dispatch({type: "NEWTOKEN", data: res.data.accessToken});
                dispatch({type: "USERID", data: res.data.userId});

                //refreshToken cookie에 저장
                const expires = new Date();
                expires.setDate(expires.getDate() + 1);
                setCookie('refreshToken', res.data.refreshToken, {
                    url: '/', expires
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        // onSubmit은 form태그의 것
        <form ref={formRef} onSubmit={login}>
            <input type='text' name='id' id='id' required/>
            <input type='password' name='password' id='password' required/>
            <input type='submit'/>
        </form>
    )
}

export default Login;