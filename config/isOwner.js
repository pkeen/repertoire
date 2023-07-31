const isOwner = (userId, doc) => {
    return doc.user.toString() === userId.toString();
}

module.exports = isOwner;