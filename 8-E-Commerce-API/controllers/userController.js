const getAllUsers = async (req, res)=>{
    res.send('get all users routs');
}

const getSingleUser = async (req, res)=>{
    res.send('get single users');
}

const showCurrentUser = async (req, res)=>{
    res.send('show current user');
}

const updateUser = async (req, res)=>{
    res.send('update users');
}

const updateUserPassword = async (req, res)=>{
    res.send('update user password');
}



module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}