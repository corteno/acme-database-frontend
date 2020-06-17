import jwt from 'jsonwebtoken';


function login(user) {
    /*return new Promise((resolve, reject) => {
        axios.post(`${API_ROOT_URL}/login`, user)
            .then(() => {
                const userDetails = {
                    username: user.username
                };

                localStorage.setItem('user', createToken(userDetails));
                refreshPage();
                resolve("Everything worked!");
                return true;
            })
            .catch(() => {
                reject("Invalid credentials");
                return false;
            });
    })*/
    const userDetails = {
        username: user.username,
        isAdmin: user.isAdmin
    };

    localStorage.setItem('user', createToken(userDetails));
    //refreshPage();
}


const logout = () => {
    destroyToken('user');
    refreshPage();
};

function isLoggedIn() {
    let token = localStorage.getItem('user');
    try {
        let decoded = jwt.verify(token, 'secret');
        return !!decoded;
    } catch (e) {
        destroyToken(token);
        return false;
    }

    /*if (localStorage.getItem('user')) {
        let token = localStorage.getItem('user');
        let decoded = '';
        try{
            jwt.verify(token, 'secret');
        } catch (e) {
            console.log('error' + e.type);
        }
        
        return !!decoded;
        //console.log(decoded)

        
    } else {
        return false
    }*/
}

function isAdmin() {
    let token = localStorage.getItem('user');
    try {
        let decoded = jwt.verify(token, 'secret');
        return !!decoded.data.isAdmin;
    } catch (e) {
        //Token expired
        destroyToken(token);
        return false;
    }


    /*if (localStorage.getItem('user')) {
        let token = localStorage.getItem('user');
        let decoded = jwt.verify(token, 'secret');
        console.log(decoded);
        return !!decoded;
        //console.log(decoded)

        /*jwt.verify(token, 'secret', function(err){
            if(err) {
                return false;
            } else {
                return true;
            }
        });
    } else {
        return false
    }*/
}

const getUserDetails = () => {
    let token = jwt.decode(localStorage.getItem('user'));
    if (token) {
        return token.data;
    } else {
        return 'No user data';
    }

};

const destroyToken = (token) => {
    localStorage.removeItem(token);
};

const refreshPage = () => {
    window.location.reload();
};

const createToken = (data) => {
    let token = jwt.sign({
        data
    }, 'secret', {expiresIn: '1h'});

    return token;

};

export {
    login,
    logout,
    isLoggedIn,
    isAdmin,
    getUserDetails
};