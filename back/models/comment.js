module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', { // MySQL에서는 users 테이블 생성
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
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User); // belongsTo가 UserId 컬럼을 생성해준다.
        db.Comment.belongsTo(db.Post); // belongsTo가 PostId 컬럼을 생성해준다.
    };
    return Comment;
}
