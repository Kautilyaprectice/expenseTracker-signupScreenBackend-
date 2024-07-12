const User = require('../modles/user');

exports.createUser = async (req, res, next) => {
    
    const { name, email, password } = req.body;
    try{
        const existingUser = await User.findOne({ where: { email: email }});
        if(existingUser){
            // console.log('User already exists');
            return res.status(403).json({ error: "User already exists "});
        }

        const newUser = await User.create({ name, email, password });
        res.status(201).json({ newUser });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

