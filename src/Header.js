import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function Header() {
    const token = useSelector(state => state.Authorization);
    const userId = useSelector(state => state.UserId);
    const logout = () => {
        document.location.href = '/';
    }
    return (
        <div style={{backgroundColor: 'white', width: '100%'}}>
            <ul className='nav-items'>
                <li className='nav-item'>
                    {token === '' && <Link to={'/'}>로그인</Link>}
                    {userId}{userId !== '' && <Link onClick={logout}>로그아웃</Link>}
                </li>
                {userId !== '' && (
                    <li className='nav-item'>
                        <Link to={'/user'}>회원조회</Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Header;