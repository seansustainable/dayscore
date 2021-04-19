module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { // MySQL에서는 users 테이블 생성
        // id를 기본적으로 넣어준다.
        content: {
            type: DataTypes.STRING(140),
            allowNull: false,
        },
    }, {
        // 한글 저장(기존 MySQL에서는 한글을 넣으면 한글이 깨짐) + mb4(이모티콘)
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    })
    Post.associate = (db) => {
        db.Post.belongsTo(db.User); // belongsTo가 UserId 컬럼을 생성해준다.
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image); // post.addImages, post.removeImages, post.getImages
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'});
        db.Post.belongsToMany(db.User, { // post.addLikers, post.removeLikers, post.getLikers
            through: 'Like', // through로 중간 테이블명을 설정해줄 수 있다.
            as: 'Likers', // 별칭
        })
        db.Post.belongsTo(db.Post, { as: 'Retweet' }) // belongsTo가 RetweetId 컬럼을 생성해준다. post.addRetweet
    };
    return Post;
}
