const User = require("../models/User");
const mongoose = require("mongoose");

exports.getUsersByUsername = async (req, res) => {
    try {
        const users = await User.find({ username: req.params.username }).select("-password");
        if (users.length < 1) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Algo deu errado!" });
    }
}

exports.sendFriendRequest = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        if (!userId || !friendId) {
            return res.status(400).json({ message: "User ID and Friend ID are required" });
        }

        // Verifique se os IDs são válidos
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ message: "Invalid User ID or Friend ID" });
        }

        // Encontre os usuários
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!friend) {
            return res.status(404).json({ message: "Friend not found" });
        }

        // Verifique se a solicitação já foi enviada
        if (friend.friendRequests.includes(userId)) {
            return res.status(400).json({ message: "Friend request already sent" });
        }

        // Adicione a solicitação de amizade
        friend.friendRequests.push(userId);
        await friend.save();

        return res.status(200).json({ message: "Friend request sent successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Algo deu errado!" });
    }
};

exports.acceptFriendRequest = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        if (!userId || !friendId) {
            return res.status(400).json({ message: "User ID and Friend ID are required" });
        }

        // Verifique se os IDs são válidos
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ message: "Invalid User ID or Friend ID" });
        }

        // Encontre os usuários
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!friend) {
            return res.status(404).json({ message: "Friend not found" });
        }

        // Verifique se há uma solicitação de amizade
        if (!user.friendRequests.includes(friendId)) {
            return res.status(400).json({ message: "No friend request found" });
        }

        // Remova a solicitação de amizade
        user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId);
        await user.save();

        // Adicione os usuários às listas de amigos um do outro
        user.friends.push(friendId);
        friend.friends.push(userId);

        await user.save();
        await friend.save();

        return res.status(200).json({ message: "Friend request accepted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Algo deu errado!" });
    }
};