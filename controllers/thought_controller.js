const { Thought, User } = require('../models');


const thoughtController = {

    // Get all thoughts & sort in descending order
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
        },

    // Get a single thought by _id

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    // Create a new thought
    createThought({ params, body }, res) {
            Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'This username does not exist'});
                    return;
                }     
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
        
    // Update a thought 
    updateThought( {params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }       
        )
    .then(updatedThought => {
        if (!updatedThought) {
            return res.status(404).json({ message: 'This id does not exist!'});
        }
        res.json(updatedThought);
        })
        .catch(err => res.json(err));
    },
    
    // Delete a thought
    deleteThought ({ params, body }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json ({message: 'This id does not exit'});
            }
            res.json(deletedThought);
        })
        .catch(err => res.json(err));
    },

    // ***** Reactions *****
    // Add a reaction
    addReaction ({ params, body },  res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true}
    )
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'This id does not exit'});
            return;
        }
        res.json(dbThoughtData)
    })
    .catch(err => res.json(err));
},

// Delete a reaction
deleteReaction( { params }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: {reactions: { reactionId: params.reactionId}}},
        { new: true}
    )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController