const { User } = require("../../models");
const bcrypt = require("bcryptjs");

// CREATE USER
const createUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            studentClass,
            semester,
            course
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "student",
            class: studentClass || req.body.class,
            semester,
            course
        });

        const userData = user.toJSON();
        delete userData.password;

        res.status(201).json({
            message: "User created successfully",
            user: userData
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
};
// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check email and password
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user by email
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare entered password with hashed password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Don't send password to frontend
        const userData = user.toJSON();
        delete userData.password;

        res.status(200).json({
            message: "Login successful",
            user: userData
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] }
        });

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
};


// GET USER BY ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ["password"] }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message
        });
    }
};


// UPDATE USER
const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const {
            name,
            email,
            password,
            role,
            studentClass,
            semester,
            course
        } = req.body;

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.class = studentClass || user.class;
        user.semester = semester || user.semester;
        user.course = course || user.course;

        // Change password only if provided
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.status(200).json({
            message: "User updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
};


// DELETE USER
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.destroy();

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
};


module.exports = {
    createUser:createUser,
    loginUser:loginUser,
    getAllUsers:getAllUsers,
    getUserById:getUserById,
    updateUser:updateUser,
    deleteUser:deleteUser
};